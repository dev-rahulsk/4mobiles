import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

const rawFrames = import.meta.glob(
  '../assets/frames_no_bg/*.png',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const FRAME_SRCS: string[] = Object.keys(rawFrames).sort().map(k => rawFrames[k])
const FRAME_COUNT = FRAME_SRCS.length

const ease = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const mapRange = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

interface MobileHeroProps { accent?: string }

export function MobileHero({ accent: _accent }: MobileHeroProps) {
  const { t } = useTranslation()
  const wrapRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const loadedImages = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null))

  const [progress, setProgress] = useState(0)
  const [stickyCtaVisible, setStickyCtaVisible] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const progressRef = useRef(0)
  const [announcementVisible, setAnnouncementVisible] = useState(() => {
    try { return !sessionStorage.getItem('ann-v1') } catch { return true }
  })

  const dynamicWords = t('mhero.dynamicWords', { returnObjects: true }) as string[]

  useEffect(() => {
    FRAME_SRCS.forEach((src, i) => {
      const img = new Image()
      img.src = src
      img.onload = () => { loadedImages.current[i] = img }
    })
  }, [])

  useEffect(() => {
    if (prefersReducedMotion() || dynamicWords.length <= 1) return
    const id = setInterval(() => {
      setWordIndex(i => (i + 1) % dynamicWords.length)
    }, 2400)
    return () => clearInterval(id)
  }, [dynamicWords.length])

  useEffect(() => {
    let rafId: number | null = null
    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const el = wrapRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const total = el.offsetHeight - window.innerHeight
        const scrolled = Math.min(Math.max(-rect.top, 0), total)
        const p = total > 0 ? scrolled / total : 0
        progressRef.current = p
        setProgress(p)
        setStickyCtaVisible(rect.bottom <= 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  const smoothFrame = useRef(0)

  useEffect(() => {
    let animId: number
    const render = () => {
      const canvas = canvasRef.current
      if (canvas) {
        const repair = ease(mapRange(progressRef.current, 0.25, 0.80))
        const targetFrame = repair * (FRAME_COUNT - 1)

        smoothFrame.current += (targetFrame - smoothFrame.current) * 0.04

        const frameIndex = Math.min(Math.round(smoothFrame.current), FRAME_COUNT - 1)
        const img = loadedImages.current[frameIndex]
        if (img) {
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          }
        }
      }
      animId = requestAnimationFrame(render)
    }
    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [])

  const textFade = 1 - ease(mapRange(progress, 0.05, 0.55))
  const phoneScale = 1 + ease(mapRange(progress, 0.10, 0.85)) * 0.40
  const phoneY = -ease(mapRange(progress, 0.10, 0.85)) * 70
  const phoneRot = (ease(mapRange(progress, 0.10, 0.85)) - 0.5) * 8

  const repairBadgesOpacity = 1 - ease(mapRange(progress, 0.42, 0.54))
  const doneProgress = ease(mapRange(progress, 0.60, 0.78))

  const dismissAnnouncement = () => {
    try { sessionStorage.setItem('ann-v1', '1') } catch { /* ignore */ }
    setAnnouncementVisible(false)
  }

  const repairBadges = [
    { icon: Icon.Crack, label: t('mhero.repairBadgeAccident') },
    { icon: Icon.Drop, label: t('mhero.repairBadgeWater') },
    { icon: Icon.Battery, label: t('mhero.repairBadgeBattery') },
  ]

  return (
    <>
      <section ref={wrapRef} className="mhero" style={{ height: '200vh' }}>
        <div className="mhero-sticky">
          <div className="mhero-inner">

            <div className="mhero-text">
              {announcementVisible && (
                <div
                  className="mhero-announcement"
                  role="banner"
                  style={{ opacity: textFade, transform: `translateY(${(1 - textFade) * -16}px)` }}
                >
                  <span className="mhero-announcement-text">{t('ann.text')}</span>
                  <button className="mhero-announcement-close" onClick={dismissAnnouncement} aria-label={t('ann.dismiss')}>
                    <Icon.X width="16" height="16" />
                  </button>
                </div>
              )}

              <div className={`mhero-title-stack${!announcementVisible ? ' mhero-title-stack--no-announcement' : ''}`}>
                <h1 className="mhero-title mhero-title-dynamic-heading" style={{ opacity: 1 - doneProgress }}>
                  <span className="mhero-word-cycle">
                    {dynamicWords.map((word, i) => (
                      <span key={word} className={`mhero-word${i === wordIndex ? ' active' : ''}`}>
                        {word}
                      </span>
                    ))}
                  </span>{' '}
                  {t('mhero.titleSuffix')}
                </h1>
                <h1
                  className="mhero-title mhero-title-done"
                  style={{ opacity: doneProgress, transform: `translateY(${(1 - doneProgress) * 12}px)` }}
                  aria-hidden={doneProgress < 0.5}
                >
                  {t('mhero.doneTitle')}
                </h1>
              </div>

              <div className="mhero-secondary-stack">
                <div className="mhero-fade-block" style={{ opacity: textFade, transform: `translateY(${(1 - textFade) * -10}px)` }}>
                  <p className="mhero-title-secondary">
                    {t('mhero.title2')} <span className="mhero-accent">{t('mhero.titleAccent')}</span> {t('mhero.title3')}
                  </p>
                  <p className="mhero-sub">
                    {t('mhero.sub1')}<br />
                    {t('mhero.sub2')}<br />
                    {t('mhero.sub3')}
                  </p>
                </div>

                <div
                  className="mhero-done-badges"
                  style={{ opacity: doneProgress, transform: `translateY(${(1 - doneProgress) * 16}px)` }}
                  aria-hidden={doneProgress < 0.5}
                >
                  <span className="mhero-glass-pill mhero-done-badge">
                    <Icon.Check width="14" height="14" />
                    {t('mhero.doneBadge1')}
                  </span>
                  <span className="mhero-glass-pill mhero-done-badge">
                    <span className="mhero-done-badge-stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Icon.Star key={i} width="12" height="12" style={{ color: '#fbbf24' }} />
                      ))}
                    </span>
                    {t('mhero.doneBadge2')}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="mhero-visual"
              style={{ transform: `translateY(${phoneY}px) scale(${phoneScale}) rotate(${phoneRot}deg)` }}
            >
              <canvas ref={canvasRef} width={1440} height={960} />

              <div className="mhero-repair-badges" style={{ opacity: repairBadgesOpacity }}>
                {repairBadges.map((b, i) => (
                  <span key={i} className="mhero-glass-pill mhero-repair-badge">
                    <b.icon width="12" height="12" />
                    {b.label}
                  </span>
                ))}
              </div>

            </div>

            <div ref={ctaRef} className="mhero-cta-wrap">
              <button className="mhero-cta">
                <Icon.Calendar width="22" height="22" />
                <span>{t('mhero.cta')}</span>
                <Icon.ArrowRight width="20" height="20" />
              </button>
              <div className="mhero-pills">
                <span><Icon.Check width="14" height="14" /> {t('mhero.pill1')}</span>
                <span><Icon.Check width="14" height="14" /> {t('mhero.pill2')}</span>
                <span><Icon.Check width="14" height="14" /> {t('mhero.pill3')}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="mhero-features">
        <div className="mhero-feature">
          <div className="mf-icon"><Icon.Clock width="22" height="22" /></div>
          <div className="mf-title">
            {t('mhero.feat1Title').split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </div>
          <div className="mf-sub">{t('mhero.feat1Sub')}</div>
        </div>
        <div className="mhero-feature">
          <div className="mf-icon"><Icon.Shield width="22" height="22" /></div>
          <div className="mf-title">
            {t('mhero.feat2Title').split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </div>
          <div className="mf-sub">{t('mhero.feat2Sub')}</div>
        </div>
        <div className="mhero-feature">
          <div className="mf-icon"><Icon.Euro width="22" height="22" /></div>
          <div className="mf-title">
            {t('mhero.feat3Title').split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </div>
          <div className="mf-sub">{t('mhero.feat3Sub')}</div>
        </div>
      </section>

      <div className={`mhero-sticky-cta${stickyCtaVisible ? ' visible' : ''}`}>
        <button className="mhero-cta" aria-label={t('mhero.stickyAriaLabel')}>
          <Icon.Calendar width="20" height="20" />
          <span>{t('mhero.cta')}</span>
          <Icon.ArrowRight width="18" height="18" />
        </button>
      </div>
    </>
  )
}

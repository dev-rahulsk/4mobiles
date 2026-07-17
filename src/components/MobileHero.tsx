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

interface MobileHeroProps { accent: string }

export function MobileHero({ accent }: MobileHeroProps) {
  const { t } = useTranslation()
  const wrapRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const loadedImages = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null))

  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)
  const [announcementVisible, setAnnouncementVisible] = useState(() => {
    try { return !sessionStorage.getItem('ann-v1') } catch { return true }
  })

  useEffect(() => {
    FRAME_SRCS.forEach((src, i) => {
      const img = new Image()
      img.src = src
      img.onload = () => { loadedImages.current[i] = img }
    })
  }, [])

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

        // Lerp toward target — limits max advance per tick so fast scrolling
        // doesn't blast through all frames at once.
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

  const textFade   = 1 - ease(mapRange(progress, 0.05, 0.55))
  const phoneScale = 1 + ease(mapRange(progress, 0.10, 0.85)) * 0.55
  const phoneY     = -ease(mapRange(progress, 0.10, 0.95)) * 140
  const phoneRot   = (ease(mapRange(progress, 0.10, 0.95)) - 0.5) * 8

  const label1 = ease(mapRange(progress, 0.02, 0.18))
  const label2 = ease(mapRange(progress, 0.08, 0.24))
  const label3 = ease(mapRange(progress, 0.14, 0.30))
  const labelsFade = 1 - ease(mapRange(progress, 0.42, 0.54))
  const labelsOpacity = Math.min(label1, labelsFade)

  const badge1 = ease(mapRange(progress, 0.56, 0.70))
  const badge2 = ease(mapRange(progress, 0.62, 0.76))

  const dismissAnnouncement = () => {
    try { sessionStorage.setItem('ann-v1', '1') } catch { /* ignore */ }
    setAnnouncementVisible(false)
  }

  return (
    <>
      <section ref={wrapRef} className="mhero" style={{ height: '200vh' }}>
        <div className="mhero-sticky">
          <div className="mhero-inner">

            <div
              className="mhero-text"
              style={{ opacity: textFade, transform: `translateY(${(1 - textFade) * -16}px)` }}
            >
              {announcementVisible && (
                <div className="mhero-announcement" role="banner">
                  <span className="mhero-announcement-text">{t('ann.text')}</span>
                  <button className="mhero-announcement-close" onClick={dismissAnnouncement} aria-label={t('ann.dismiss')}>
                    <Icon.X width="16" height="16" />
                  </button>
                </div>
              )}
              <h1 className="mhero-title">
                {t('mhero.title1')}<br />
                {t('mhero.title2')} <span className="mhero-accent">{t('mhero.titleAccent')}</span><br />
                {t('mhero.title3')}
              </h1>
              <p className="mhero-sub">
                {t('mhero.sub1')}<br />
                {t('mhero.sub2')}<br />
                {t('mhero.sub3')}
              </p>
            </div>

            <div
              className="mhero-visual"
              style={{ transform: `translateY(${phoneY}px) scale(${phoneScale}) rotate(${phoneRot}deg)` }}
            >
              <canvas ref={canvasRef} width={1440} height={960} />

              {label1 > 0.01 && (
                <div className="mhero-labels" style={{ opacity: labelsOpacity }}>
                  <div className="mhero-label mhero-label-1" style={{ opacity: label1, transform: `translateY(${(1 - label1) * 20}px)` }}>
                    {t('mhero.label1')}
                  </div>
                  <div className="mhero-label mhero-label-2" style={{ opacity: label2, transform: `translateY(${(1 - label2) * 20}px)` }}>
                    {t('mhero.label2')}
                  </div>
                  <div className="mhero-label mhero-label-3" style={{ opacity: label3, transform: `translateY(${(1 - label3) * 20}px)` }}>
                    {t('mhero.label3')}
                  </div>
                </div>
              )}

              {badge1 > 0.01 && (
                <div className="mhero-badges">
                  <div
                    className="mhero-badge mhero-badge-stars"
                    style={{ opacity: badge1, transform: `translateY(${(1 - badge1) * 16}px) scale(${0.9 + badge1 * 0.1})` }}
                  >
                    <Icon.Star width="16" height="16" style={{ color: '#fbbf24' }} />
                    <span><b>4.8</b> {t('mhero.badge1', { count: '/ 5' })}</span>
                  </div>
                  <div
                    className="mhero-badge mhero-badge-count"
                    style={{ opacity: badge2, transform: `translateY(${(1 - badge2) * 16}px) scale(${0.9 + badge2 * 0.1})` }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="8" r="3.5" /><circle cx="17" cy="9" r="2.5" />
                      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5M15 18c0-2 1.5-4 4-4s3 1.5 3 3.5" />
                    </svg>
                    <span><b>10.000+</b> {t('mhero.badge2', { count: '' }).replace('+ ', '')}</span>
                  </div>
                </div>
              )}
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
              <div className="mhero-reviews">
                <div className="mhero-review">
                  <Icon.Star width="18" height="18" style={{ color: '#fbbf24' }} />
                  <span>{t('mhero.review1', { rating: '4.8', count: 200 })}</span>
                </div>
                <div className="mhero-divider" />
                <div className="mhero-review">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="8" r="3.5" /><circle cx="17" cy="9" r="2.5" />
                    <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5M15 18c0-2 1.5-4 4-4s3 1.5 3 3.5" />
                  </svg>
                  <span>{t('mhero.review2', { count: '10.000' })}</span>
                </div>
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
    </>
  )
}

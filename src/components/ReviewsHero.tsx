import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'
import heroDesktop from '../assets/reviews-hero-desktop.png'
import heroMobile from '../assets/reviews-hero-mobile.png'

const ease = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useCountUp(target: number, isVisible: boolean, from = 8) {
  const [count, setCount] = useState(from)
  const started = useRef(false)
  useEffect(() => {
    if (!isVisible || started.current) return
    started.current = true
    if (prefersReducedMotion()) { setCount(target); return }
    const startTime = performance.now()
    const duration = 1400
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setCount(Math.round(from + eased * (target - from)))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isVisible, target, from])
  return count
}

export function ReviewsHero() {
  const { t, i18n } = useTranslation()
  const wrapRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 769px)').matches
  )
  const targetProgress = useRef(0)
  const currentProgress = useRef(0)
  const rafId = useRef<number | null>(null)
  const reduced = useRef(prefersReducedMotion())

  const locale = i18n.language === 'nl' ? 'nl-NL' : 'en-US'
  const count = useCountUp(10000, visible)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)')
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced.current) return

    const handleScroll = () => {
      const el = wrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      targetProgress.current = clamp01((vh - rect.top) / total)
    }

    const loop = () => {
      const diff = targetProgress.current - currentProgress.current
      currentProgress.current += diff * (Math.abs(diff) > 0.0008 ? 0.12 : 1)
      setProgress(currentProgress.current)
      rafId.current = requestAnimationFrame(loop)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    rafId.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const centered = ease(progress) - 0.5
  const imageRange = isDesktop ? -84 : -90
  const contentRange = isDesktop ? -64 : -110
  const imageScale = reduced.current || isDesktop ? 1 : 1 + Math.abs(centered) * 0.14
  const imageStyle = reduced.current ? undefined : {
    transform: `translate3d(0, ${centered * imageRange}px, 0) scale(${imageScale})`,
  }
  const contentStyle = reduced.current ? undefined : {
    transform: `translate3d(0, ${centered * contentRange}px, 0)`,
  }

  return (
    <section ref={wrapRef} className="rvh-wrap">
      <div className="rvh-sticky">
        <picture>
          <source media="(min-width: 769px)" srcSet={heroDesktop} />
          <img
            className="rvh-image"
            src={heroMobile}
            alt={t('reviewsHero.imageAlt')}
            style={imageStyle}
            loading="lazy"
            decoding="async"
          />
        </picture>

        <div className="rvh-mask" aria-hidden="true" />

        <div className={`rvh-content${visible ? ' rvh-visible' : ''}`} style={contentStyle}>
          <div className="rvh-inner container">
            <div className="rvh-quote" aria-hidden="true">
              <Icon.Quote width="22" height="22" />
            </div>
            <h2 className="rvh-headline">
              <span className="rvh-count">{count.toLocaleString(locale)}</span>{' '}
              {t('reviews.title')}
            </h2>
            <div className="rvh-badge">
              <Icon.Google width="18" height="18" />
              <span className="rvh-badge-stars">
                {[0, 1, 2, 3, 4].map(i => <Icon.Star key={i} width="14" height="14" />)}
              </span>
              <span className="rvh-badge-rating"><b>4.8/5</b></span>
              <span className="rvh-badge-sep">·</span>
              <span className="rvh-badge-count">{t('reviews.ratingCount')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

const REVIEW_META = [
  { name: 'Daan V.',      initial: 'D', city: 'Naaldwijk',  color: '#4285f4' },
  { name: 'Lisa M.',      initial: 'L', city: 'Wateringen', color: '#e91e63' },
  { name: 'Mark J.',      initial: 'M', city: 'Naaldwijk',  color: '#ff9800' },
  { name: 'Zuhal A.',     initial: 'Z', city: 'Den Haag',   color: '#9c27b0' },
  { name: 'Jochem K.',    initial: 'J', city: 'Delft',      color: '#3b82f6' },
  { name: 'Merel de J.',  initial: 'M', city: 'Monster',    color: '#ef4444' },
  { name: 'P. Bakker',    initial: 'P', city: 'Naaldwijk',  color: '#8b5cf6' },
  { name: 'Sara K.',      initial: 'S', city: 'Poeldijk',   color: '#10b981' },
  { name: 'Thomas B.',    initial: 'T', city: 'Kwintsheul', color: '#f59e0b' },
  { name: 'Anita de V.',  initial: 'A', city: 'Maasdijk',   color: '#06b6d4' },
]

function useCountUp(target: number, isVisible: boolean) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!isVisible || started.current) return
    started.current = true
    const start = performance.now()
    const duration = 1800
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setCount(Math.round(eased * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isVisible, target])
  return count
}

export function Reviews() {
  const { t, i18n } = useTranslation()
  const [slide, setSlide] = useState(0)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const startX = useRef(0)
  const count = useCountUp(10000, visible)

  const locale = i18n.language === 'nl' ? 'nl-NL' : 'en-US'

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const prev = () => setSlide(s => Math.max(0, s - 1))
  const next = () => setSlide(s => Math.min(REVIEW_META.length - 1, s + 1))

  const onPointerDown = (e: React.PointerEvent) => { startX.current = e.clientX }
  const onPointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - startX.current
    if (dx > 40) prev()
    else if (dx < -40) next()
  }

  return (
    <section className="section reviews-new" ref={sectionRef}>
      <div className="container">
        <div className="rv-header">
          <div className="rv-quote-icon"><Icon.Quote width="24" height="24" /></div>
          <h2 className="rv-title">
            <span className="rv-count">{count.toLocaleString(locale)}</span>
            {' '}{t('reviews.title')}
          </h2>
          <p className="rv-sub">{t('reviews.sub')}</p>
          <div className="rv-rating-badge">
            <span className="g-mark">G</span>
            <div className="rv-stars">
              {[0,1,2,3,4].map(i => <Icon.Star key={i} width="16" height="16" />)}
            </div>
            <span className="rv-rating-text"><b>4.8/5</b></span>
            <span className="rv-rating-sep">·</span>
            <span className="rv-rating-count">{t('reviews.ratingCount')}</span>
          </div>
        </div>

        <div
          className="rv-slider"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div
            className="rv-track"
            style={{ transform: `translateX(calc(-${slide * 100}% - ${slide * 16}px))` }}
          >
            {REVIEW_META.map((r, i) => (
              <article key={i} className="rv-card">
                <div className="rv-card-stars">
                  {[0,1,2,3,4].map(j => <Icon.Star key={j} width="14" height="14" />)}
                </div>
                <p className="rv-card-text">{t(`reviews.items.${i}.text`)}</p>
                <div className="rv-card-foot">
                  <div className="rv-avatar" style={{ background: r.color }}>{r.initial}</div>
                  <div>
                    <div className="rv-name">{r.name}</div>
                    <div className="rv-city">{r.city}</div>
                  </div>
                  <div className="rv-verified">
                    <span className="g-mark sm">G</span>
                    <span>{t('reviews.verified')}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rv-dots">
          {REVIEW_META.map((_, i) => (
            <button
              key={i}
              className={`rv-dot${i === slide ? ' rv-dot-active' : ''}`}
              onClick={() => setSlide(i)}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>

        <div className="rv-cta-row">
          <a href="/reviews" className="btn btn-outline">
            <span className="g-mark">G</span>
            {t('reviews.viewAll')}
            <Icon.ArrowRight width="14" height="14" />
          </a>
        </div>
      </div>
    </section>
  )
}

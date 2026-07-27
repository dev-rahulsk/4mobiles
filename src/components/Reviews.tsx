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

  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const isHorizontalSwipe = useRef<boolean | null>(null)

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

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    startY.current = e.touches[0].clientY
    isHorizontalSwipe.current = null
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const dx = e.touches[0].clientX - startX.current
    const dy = e.touches[0].clientY - startY.current

    if (isHorizontalSwipe.current === null) {
      isHorizontalSwipe.current = Math.abs(dx) > Math.abs(dy)
    }

    if (isHorizontalSwipe.current) {
      setDragOffset(dx)
    }
  }

  const handleTouchEnd = () => {
    if (isDragging && isHorizontalSwipe.current) {
      if (dragOffset < -40) {
        next()
      } else if (dragOffset > 40) {
        prev()
      }
    }
    setDragOffset(0)
    setIsDragging(false)
    isHorizontalSwipe.current = null
  }

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - startX.current
    setDragOffset(dx)
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) < 5) {
      // Direct click on left/right side of review
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      if (clickX < rect.width * 0.45) {
        prev()
      } else {
        next()
      }
    } else if (dx < -40) {
      next()
    } else if (dx > 40) {
      prev()
    }
    setDragOffset(0)
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      if (dragOffset < -40) next()
      else if (dragOffset > 40) prev()
    }
    setDragOffset(0)
    setIsDragging(false)
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
            <Icon.Google width="18" height="18" />
            <div className="rv-stars">
              {[0,1,2,3,4].map(i => <Icon.Star key={i} width="16" height="16" />)}
            </div>
            <span className="rv-rating-text"><b>4.8/5</b></span>
            <span className="rv-rating-sep">·</span>
            <span className="rv-rating-count">{t('reviews.ratingCount')}</span>
          </div>
        </div>

        <div className="rv-slider-wrapper">
          <button
            className="rv-nav-btn rv-nav-prev"
            onClick={prev}
            disabled={slide === 0}
            aria-label="Previous review"
          >
            <Icon.ChevronLeft width="20" height="20" />
          </button>

          <div
            className="rv-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="rv-track"
              style={{
                transform: `translateX(calc(-${slide} * (100% + var(--slide-gap)) + ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
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
                      <Icon.Google width="14" height="14" />
                      <span>{t('reviews.verified')}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            className="rv-nav-btn rv-nav-next"
            onClick={next}
            disabled={slide === REVIEW_META.length - 1}
            aria-label="Next review"
          >
            <Icon.ChevronRight width="20" height="20" />
          </button>
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
            <Icon.Google width="18" height="18" />
            {t('reviews.viewAll')}
            <Icon.ArrowRight width="14" height="14" />
          </a>
        </div>
      </div>
    </section>
  )
}

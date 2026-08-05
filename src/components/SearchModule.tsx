import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'
import { getOpenStatus } from '../lib/openStatus'

const OPEN_STATUS = getOpenStatus()

const ease = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function SearchModule() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const sectionRef = useRef<HTMLElement>(null)
  const [lift, setLift] = useState(10)
  const days = t('contact.days', { returnObjects: true }) as string[]
  const openLabel = t(`contact.${OPEN_STATUS.type}`, {
    hour: OPEN_STATUS.hour,
    mins: OPEN_STATUS.mins,
    day: OPEN_STATUS.dayIndex !== undefined ? days[OPEN_STATUS.dayIndex] : undefined,
  })

  useEffect(() => {
    let rafId: number | null = null
    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const el = sectionRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const raw = (vh - rect.top) / (vh * 0.6)
        const p = clamp01(raw)
        setLift(prefersReducedMotion() ? 0 : (1 - ease(p)) * 10)
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

  return (
    <section ref={sectionRef} className="search-section" style={{ transform: `translateY(${lift}px)` }}>
      <div className="container">
        <div className="border-beam-container repair-search-card">
          <div className="border-beam" />
          <div className="border-beam-inner search-card repair-search-card__surface">
            <div className="repair-search-card__content">
              <h2 className="search-title">{t('search.title')}</h2>
              <div className="search-underline" />
              <form
                className="search-form"
                onSubmit={e => {
                  e.preventDefault()
                  if (query.trim()) alert(`${t('search.button')}: ${query}`)
                }}
              >
                <div className="search-input-wrap">
                  <Icon.Search width="18" height="18" className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder={t('search.placeholder')}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                </div>
                <button type="submit" className="search-btn">
                  {t('search.button')}
                </button>
              </form>
              <a
                href="/contact"
                className={`search-hours-chip${OPEN_STATUS.open ? ' search-hours-chip--open' : ' search-hours-chip--closed'}`}
              >
                <span className="search-hours-dot" />
                <Icon.Store width="16" height="16" />
                {openLabel}
                <Icon.ChevronRight width="14" height="14" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

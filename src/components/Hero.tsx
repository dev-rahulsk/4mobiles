import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'
import { PhoneAnimation } from './PhoneAnimation'
import { getOpenStatus } from '../lib/openStatus'

const OPEN_STATUS = getOpenStatus()

interface HeroProps {
  accent: string
  title?: string
  titleAccent?: string
  sub?: ReactNode
}

export function Hero({ accent: _accent, title, titleAccent, sub }: HeroProps) {
  const { t } = useTranslation()
  const heroTitle = title ?? t('hero.title')
  const heroTitleAccent = titleAccent ?? t('hero.titleAccent')
  const heroSub = sub ?? t('hero.sub')
  const [query, setQuery] = useState('')
  const [announcementVisible, setAnnouncementVisible] = useState(() => {
    try {
      return sessionStorage.getItem('ann-v1') !== '1'
    } catch {
      return true
    }
  })

  const days = t('contact.days', { returnObjects: true }) as string[]
  const openLabel = t(`contact.${OPEN_STATUS.type}`, {
    hour: OPEN_STATUS.hour,
    mins: OPEN_STATUS.mins,
    day: OPEN_STATUS.dayIndex !== undefined ? days[OPEN_STATUS.dayIndex] : undefined,
  })

  const trust = [
    { icon: Icon.Shield, label: t('hero.trust.warranty') },
    { icon: Icon.Clock,  label: t('hero.trust.ready') },
    { icon: Icon.Euro,   label: t('hero.trust.nocure') },
  ]

  const dismissAnnouncement = () => {
    try {
      sessionStorage.setItem('ann-v1', '1')
    } catch {
      // Storage may be unavailable in private browsing contexts.
    }
    setAnnouncementVisible(false)
  }

  return (
    <section className="hero">
      <div className="hero-rays" aria-hidden="true" />

      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
      </div>

      <div className="container hero-inner">
        {announcementVisible && (
          <div className="hero-announcement" role="banner">
            <span className="hero-announcement-text">{t('ann.text')}</span>
            <button
              className="hero-announcement-close"
              type="button"
              aria-label={t('ann.dismiss')}
              onClick={dismissAnnouncement}
            >
              <Icon.X width="18" height="18" />
            </button>
          </div>
        )}

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="dot" /> {t('hero.eyebrow')}
          </div>

          <h1 className="hero-title">
            {heroTitle}<br />
            <span className="hero-title-accent">{heroTitleAccent}</span>
          </h1>

          <p className="hero-sub">{heroSub}</p>

          <div className="border-beam-container hero-finder-beam">
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
                      placeholder={t('hero.searchPlaceholder')}
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

          <div className="hero-trust">
            {trust.map((tr, i) => (
              <div key={i} className="trust-pill">
                <tr.icon width="16" height="16" />
                <span>{tr.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-phone-wrap">
            <PhoneAnimation />

            <div className="float-badge float-badge-1">
              <Icon.Crack width="18" height="18" />
              <div>
                <div className="fb-title">{t('hero.badges.screenTitle')}</div>
                <div className="fb-sub">{t('hero.badges.screenFrom')}</div>
              </div>
            </div>
            <div className="float-badge float-badge-2">
              <Icon.Battery width="18" height="18" />
              <div>
                <div className="fb-title">{t('hero.badges.batteryTitle')}</div>
                <div className="fb-sub">{t('hero.badges.batteryFrom')}</div>
              </div>
            </div>
            <div className="float-badge float-badge-3">
              <Icon.Drop width="18" height="18" />
              <div>
                <div className="fb-title">{t('hero.badges.waterTitle')}</div>
                <div className="fb-sub">{t('hero.badges.waterSub')}</div>
              </div>
            </div>

            <div className="hero-stat">
              <div className="hero-stat-num">{t('hero.statNum')}</div>
              <div className="hero-stat-label">{t('hero.stat')}</div>
              <div className="hero-stat-stars" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon.Star key={i} width="11" height="11" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="brand-strip">
        <div className="container brand-strip-inner">
          <span className="brand-strip-label">{t('hero.brandStrip')}</span>
          <div className="brand-strip-list">
            {['Apple', 'Samsung', 'Xiaomi', 'OnePlus', 'Oppo', 'Motorola', 'Sony', 'Huawei', 'Google', 'Nokia'].map(b => (
              <span key={b} className="brand-name">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

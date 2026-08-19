import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'
import { PhoneAnimation } from './PhoneAnimation'

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
  const [device, setDevice] = useState('iPhone')
  const [announcementVisible, setAnnouncementVisible] = useState(() => {
    try {
      return sessionStorage.getItem('ann-v1') !== '1'
    } catch {
      return true
    }
  })
  const devices = ['iPhone', 'Samsung', 'iPad', 'OnePlus', 'Xiaomi', t('hero.deviceOther')]

  const trust = [
    { icon: Icon.Shield, label: t('hero.trust.warranty') },
    { icon: Icon.Clock,  label: t('hero.trust.ready') },
    { icon: Icon.Euro,   label: t('hero.trust.nocure') },
    { icon: Icon.Park,   label: t('hero.trust.parking') },
  ]

  const placeholder =
    device === 'Samsung'
      ? 'Galaxy S23'
      : device === 'iPad'
      ? 'iPad Air 5'
      : 'iPhone 15 Pro'

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

          <div className="repair-finder">
            <div className="finder-label">
              <span className="finder-step">1</span>
              {t('hero.step1')}
            </div>
            <div className="finder-chips">
              {devices.map(d => (
                <button
                  key={d}
                  className={`chip${device === d ? ' chip-active' : ''}`}
                  onClick={() => setDevice(d)}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="finder-search">
              <span className="finder-step">2</span>
              <div className="finder-input">
                <Icon.Search width="18" height="18" />
                <input placeholder={t('hero.searchPlaceholder', { device, placeholder })} />
              </div>
              <button className="btn btn-primary btn-lg">
                {t('hero.viewPrice')}
                <Icon.ArrowRight width="16" height="16" />
              </button>
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
              <div className="hero-stat-num">7.500+</div>
              <div className="hero-stat-label">{t('hero.stat')}</div>
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

import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4)
      setCount(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function StatsSection() {
  const { t, i18n } = useTranslation()
  const { ref, visible } = useInView()
  const years = useCountUp(15, visible, 1600)
  const clients = useCountUp(10000, visible, 2000)
  const locale = i18n.language === 'nl' ? 'nl-NL' : 'en-US'

  return (
    <section className="aou-stats" ref={ref}>
      <div className="container">
        <div className="aou-stats-grid">
          <div className="aou-stat">
            <span className="aou-stat-num">{years}+</span>
            <span className="aou-stat-label">{t('aboutUs.statYears')}</span>
          </div>
          <div className="aou-stat">
            <span className="aou-stat-num">{clients >= 10000 ? '10.000' : clients.toLocaleString(locale)}+</span>
            <span className="aou-stat-label">{t('aboutUs.statClients')}</span>
          </div>
          <div className="aou-stat">
            <span className="aou-stat-num">100%</span>
            <span className="aou-stat-label">{t('aboutUs.statDeadline')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutUs() {
  const { t } = useTranslation()
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const pillars = t('aboutUs.pillars', { returnObjects: true }) as { title: string; desc: string }[]
  const services = t('aboutUs.services', { returnObjects: true }) as { title: string; body: string }[]
  const reasons = t('aboutUs.reasons', { returnObjects: true }) as string[]

  const PILLAR_ICONS = [Icon.Star, Icon.Shield, Icon.Wrench]

  return (
    <Layout>
      {/* Hero */}
      <section className="aou-hero">
        <div className="aou-hero-inner container">
          <div className="aou-hero-content">
            <span className="aou-eyebrow">{t('aboutUs.heroEyebrow')}</span>
            <h1 className="aou-hero-title">{t('aboutUs.heroTitle')}</h1>
            <p className="aou-hero-sub">{t('aboutUs.heroSub')}</p>
            <div className="aou-hero-ctas">
              <a href="https://wa.me/31612345678" className="btn-accent aou-btn" target="_blank" rel="noopener noreferrer">
                <Icon.WhatsApp width="18" height="18" />
                {t('aboutUs.heroWa')}
              </a>
              <a href="tel:+31174123456" className="btn-outline-light aou-btn">
                <Icon.Phone width="18" height="18" />
                {t('aboutUs.heroCall')}
              </a>
            </div>
            <div className="aou-hero-trust">
              <span className="aou-trust-item"><Icon.Star width="14" height="14" />{t('aboutUs.heroTrust1')}</span>
              <span className="aou-trust-sep">·</span>
              <span className="aou-trust-item">{t('aboutUs.heroTrust2')}</span>
              <span className="aou-trust-sep">·</span>
              <span className="aou-trust-item"><Icon.Clock width="14" height="14" />{t('aboutUs.heroTrust3')}</span>
            </div>
          </div>
          <div className="aou-hero-img">
            <div className="aou-hero-img-placeholder">
              <Icon.Wrench width="48" height="48" />
              <span>{t('aboutUs.heroImgPlaceholder')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="aou-pillars">
        <div className="container">
          <div className="aou-pillars-grid">
            {pillars.map((p, i) => {
              const Ic = PILLAR_ICONS[i]
              return (
                <div key={i} className="aou-pillar">
                  <div className="aou-pillar-icon"><Ic width="28" height="28" /></div>
                  <h3 className="aou-pillar-title">{p.title}</h3>
                  <p className="aou-pillar-desc">{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="aou-story">
        <div className="container">
          <div className="aou-story-grid">
            <div className="aou-story-content">
              <span className="aou-eyebrow">{t('aboutUs.storyEyebrow')}</span>
              <h2 className="aou-story-title">{t('aboutUs.storyTitle')}</h2>
              <p className="aou-story-body">{t('aboutUs.storyBody1')}</p>
              <p className="aou-story-body">{t('aboutUs.storyBody2')}</p>
            </div>
            <div className="aou-story-img">
              <div className="aou-story-img-placeholder">
                <Icon.Camera width="40" height="40" />
                <span>{t('aboutUs.storyImgPlaceholder')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Services + Reasons */}
      <section className="aou-services">
        <div className="container">
          <div className="aou-services-grid">
            <div className="aou-services-left">
              <span className="aou-eyebrow">{t('aboutUs.servicesEyebrow')}</span>
              <h2 className="aou-services-title">{t('aboutUs.servicesTitle')}</h2>
              <div className="aou-acc">
                {services.map((s, i) => (
                  <div key={i} className={`aou-acc-item${openIdx === i ? ' open' : ''}`}>
                    <button className="aou-acc-trigger" onClick={() => setOpenIdx(openIdx === i ? null : i)} aria-expanded={openIdx === i}>
                      <span>{s.title}</span>
                      <span className="aou-acc-icon"><Icon.Plus width="18" height="18" /></span>
                    </button>
                    <div className="aou-acc-body" style={{ maxHeight: openIdx === i ? '200px' : '0' }}>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="aou-reasons-card">
              <span className="aou-reasons-eyebrow">{t('aboutUs.reasonsEyebrow')}</span>
              <ul className="aou-reasons-list">
                {reasons.map((r, i) => {
                  const REASON_ICONS = [Icon.Clock, Icon.Shield, Icon.Euro, Icon.Star]
                  const Ic = REASON_ICONS[i]
                  return (
                    <li key={i} className="aou-reason">
                      <span className="aou-reason-icon"><Ic width="20" height="20" /></span>
                      <span>{r}</span>
                    </li>
                  )
                })}
              </ul>
              <div className="aou-reasons-ctas">
                <a href="tel:+31174123456" className="btn-accent aou-btn aou-btn-full">
                  <Icon.Phone width="16" height="16" />{t('aboutUs.callDirect')}
                </a>
                <a href="https://wa.me/31612345678" className="aou-btn-outline-dark aou-btn aou-btn-full" target="_blank" rel="noopener noreferrer">
                  <Icon.WhatsApp width="16" height="16" />{t('aboutUs.whatsappUs')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location CTA */}
      <section className="aou-location">
        <div className="container">
          <div className="aou-location-grid">
            <div className="aou-location-content">
              <span className="aou-eyebrow">{t('aboutUs.locationEyebrow')}</span>
              <h2 className="aou-location-title">{t('aboutUs.locationTitle')}</h2>
              <p className="aou-location-sub">{t('aboutUs.locationSub')}</p>
              <div className="aou-location-details">
                <div className="aou-loc-row">
                  <Icon.Pin width="18" height="18" />
                  <span>Molenstraat 2, 2671 BE Naaldwijk</span>
                </div>
                <div className="aou-loc-row">
                  <Icon.Clock width="18" height="18" />
                  <div className="aou-hours">
                    <span>{t('aboutUs.locationHours1')}</span>
                    <span>{t('aboutUs.locationHours2')}</span>
                    <span>{t('aboutUs.locationHours3')}</span>
                  </div>
                </div>
              </div>
              <div className="aou-location-ctas">
                <a href="https://maps.google.com/?q=Molenstraat+2+Naaldwijk" className="btn-accent aou-btn" target="_blank" rel="noopener noreferrer">
                  <Icon.MapLink width="18" height="18" />{t('aboutUs.getDirections')}
                </a>
                <a href="https://wa.me/31612345678" className="aou-btn-outline-dark aou-btn" target="_blank" rel="noopener noreferrer">
                  <Icon.WhatsApp width="18" height="18" />{t('aboutUs.whatsappUs')}
                </a>
              </div>
            </div>
            <div className="aou-location-img">
              <div className="aou-location-img-placeholder">
                <Icon.Pin width="40" height="40" />
                <span>{t('aboutUs.locationImgPlaceholder')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

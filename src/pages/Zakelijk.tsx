import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

const STAT_ICONS = [Icon.Star, Icon.Calendar, Icon.Wrench, Icon.Truck]
const SERVICE_ICONS = [Icon.Wrench, Icon.Shield, Icon.Cart, Icon.Phone, Icon.Pin, Icon.Chat]
const TRUST_ICONS = [Icon.Pin, Icon.Shield, Icon.Check, Icon.Clock]

function Stars({ n }: { n: number }) {
  return (
    <span className="zk-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon.Star key={i} width="13" height="13" style={{ color: i < n ? '#f59e0b' : '#d1d5db' }} />
      ))}
    </span>
  )
}

const PARTNERS = ['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5']

export function Zakelijk() {
  const { t } = useTranslation()
  const [openService, setOpenService] = useState<number | null>(null)

  const statsBase = t('zakelijk.stats', { returnObjects: true }) as { num: string; label: string }[]
  const stats = [...statsBase, { num: '✓', label: t('zakelijk.statOnSite') }]
  const trustRow = t('zakelijk.trustRow', { returnObjects: true }) as { label: string }[]
  const testimonials = t('zakelijk.testimonials', { returnObjects: true }) as { initial: string; name: string; role: string; stars: number; text: string }[]
  const services = t('zakelijk.services', { returnObjects: true }) as { title: string; desc: string }[]
  const preventBullets = t('zakelijk.preventBullets', { returnObjects: true }) as string[]
  const reasons = t('zakelijk.reasons', { returnObjects: true }) as string[]

  return (
    <Layout>
      {/* Hero */}
      <section className="zk-hero">
        <div className="container">
          <div className="zk-hero-grid">
            <div className="zk-hero-content">
              <span className="zk-eyebrow">{t('zakelijk.eyebrow')}</span>
              <h1 className="zk-hero-title">
                {t('zakelijk.heroTitle1')}<br />
                <span className="zk-green">{t('zakelijk.heroTitle2')}</span> {t('zakelijk.heroTitle3')}
              </h1>
              <p className="zk-hero-sub">{t('zakelijk.heroSub')}</p>
              <div className="zk-hero-ctas">
                <a href="/contact" className="btn-accent zk-btn">{t('zakelijk.contactUs')}</a>
                <a href="#diensten" className="zk-btn zk-btn-outline">{t('zakelijk.viewOptions')}</a>
              </div>
              <div className="zk-trust-row">
                {trustRow.map((item, i) => {
                  const Ic = TRUST_ICONS[i]
                  return (
                    <span key={i} className="zk-trust-item">
                      <Ic width="18" height="18" />{item.label}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="zk-hero-img">
              <div className="zk-hero-img-placeholder">
                <Icon.Wrench width="48" height="48" />
                <span>{t('zakelijk.heroImgPlaceholder')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="zk-stats">
        <div className="container">
          <div className="zk-stats-grid">
            {stats.map((s, i) => {
              const Ic = STAT_ICONS[i]
              return (
                <div key={i} className="zk-stat">
                  <span className="zk-stat-icon"><Ic width="24" height="24" /></span>
                  <span className="zk-stat-num">{s.num}</span>
                  <span className="zk-stat-label">{s.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partner logos */}
      <section className="zk-partners">
        <div className="container">
          <p className="zk-partners-label">{t('zakelijk.partnersLabel')}</p>
          <div className="zk-partners-row">
            {PARTNERS.map(p => (
              <div key={p} className="zk-partner-logo">
                <Icon.Shield width="24" height="24" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="zk-testimonials">
        <div className="container">
          <h2 className="zk-section-title">{t('zakelijk.testimonialsTitle')}</h2>
          <div className="zk-test-grid">
            {testimonials.map((item, i) => (
              <div key={i} className="zk-test-card">
                <Stars n={item.stars} />
                <p className="zk-test-text">{item.text}</p>
                <div className="zk-test-author">
                  <span className="zk-avatar">{item.initial}</span>
                  <div>
                    <p className="zk-author-name">{item.name}</p>
                    <p className="zk-author-role">{item.role}</p>
                  </div>
                  <a href="https://g.page/4mobiles" target="_blank" rel="noopener noreferrer" className="zk-g-badge" aria-label="Google review">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="zk-services" id="diensten">
        <div className="container">
          <span className="zk-eyebrow">{t('zakelijk.servicesEyebrow')}</span>
          <h2 className="zk-section-title">{t('zakelijk.servicesTitle')}</h2>
          <div className="zk-services-grid">
            {services.map((s, i) => {
              const Ic = SERVICE_ICONS[i]
              return (
                <div key={i} className={`zk-service-card${openService === i ? ' active' : ''}`} onClick={() => setOpenService(openService === i ? null : i)}>
                  <span className="zk-service-icon"><Ic width="22" height="22" /></span>
                  <div>
                    <h3 className="zk-service-title">{s.title}</h3>
                    <p className="zk-service-desc">{s.desc}</p>
                  </div>
                  <Icon.ArrowRight width="16" height="16" className="zk-service-arrow" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Prevent dark section */}
      <section className="zk-prevent">
        <div className="container">
          <div className="zk-prevent-grid">
            <div className="zk-prevent-content">
              <h2 className="zk-prevent-title">
                {t('zakelijk.preventTitle1')} <span className="zk-green">{t('zakelijk.preventTitle2')}</span> {t('zakelijk.preventTitle3')}
              </h2>
              <p className="zk-prevent-sub">{t('zakelijk.preventSub')}</p>
              <ul className="zk-prevent-list">
                {preventBullets.map((b, i) => (
                  <li key={i}><Icon.Check width="16" height="16" />{b}</li>
                ))}
              </ul>
              <a href="/contact" className="btn-accent zk-btn zk-prevent-cta">
                <Icon.WhatsApp width="16" height="16" />{t('zakelijk.preventCta')}
              </a>
            </div>
            <div className="zk-prevent-img">
              <div className="zk-prevent-img-placeholder">
                <Icon.Shield width="48" height="48" />
                <span>{t('zakelijk.preventImgPlaceholder')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="zk-reasons">
        <div className="container">
          <h2 className="zk-section-title">
            {t('zakelijk.reasonsTitle1')} <span className="zk-green">{t('zakelijk.reasonsTitle2')}</span>
          </h2>
          <div className="zk-reasons-grid">
            {reasons.map((r, i) => (
              <div key={i} className="zk-reason">
                <span className="zk-reason-check"><Icon.Check width="16" height="16" /></span>
                <span>{r}</span>
              </div>
            ))}
          </div>
          <div className="zk-reasons-ctas">
            <a href="/contact" className="btn-accent zk-btn">
              <Icon.Calendar width="16" height="16" />{t('zakelijk.makeAppointment')}
            </a>
            <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="zk-btn zk-btn-wa">
              <Icon.WhatsApp width="16" height="16" />{t('zakelijk.whatsappUs')}
            </a>
            <a href="tel:+31174123456" className="zk-btn zk-btn-outline-dark">
              <Icon.Phone width="16" height="16" />{t('zakelijk.callDirect')}
            </a>
          </div>
        </div>
      </section>
      {/* Bottom contact section */}
      <section className="zk-contact-section">
        <div className="container">
          <div className="zk-contact-inner">
            <div className="zk-contact-text">
              <span className="zk-eyebrow">{t('zakelijk.contactEyebrow')}</span>
              <h2 className="zk-contact-title">{t('zakelijk.contactTitle')}</h2>
              <p className="zk-contact-sub">{t('zakelijk.contactSub')}</p>
              <ul className="zk-contact-list">
                <li><Icon.Check width="15" height="15" /> {t('zakelijk.contactBullet1')}</li>
                <li><Icon.Check width="15" height="15" /> {t('zakelijk.contactBullet2')}</li>
                <li><Icon.Check width="15" height="15" /> {t('zakelijk.contactBullet3')}</li>
                <li><Icon.Check width="15" height="15" /> {t('zakelijk.contactBullet4')}</li>
              </ul>
            </div>
            <div className="zk-contact-ctas">
              <a href="mailto:zakelijk@4mobiles.nl" className="btn-accent zk-btn zk-contact-email-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {t('zakelijk.contactEmailCta')}
              </a>
              <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="zk-btn zk-btn-wa">
                <Icon.WhatsApp width="16" height="16" /> {t('zakelijk.whatsappUs')}
              </a>
              <a href="tel:+31174123456" className="zk-btn zk-btn-outline-dark">
                <Icon.Phone width="16" height="16" /> {t('zakelijk.contactPhone')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

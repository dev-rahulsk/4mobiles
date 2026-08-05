import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'
import { FaqAccordion } from '../components/FaqAccordion'
import { getOpenStatus } from '../lib/openStatus'

const TODAY = new Date().getDay()
const OPEN_STATUS = getOpenStatus()

export function Contact() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const openStatus = OPEN_STATUS

  const days = t('contact.days', { returnObjects: true }) as string[]
  const openLabel = t(`contact.${openStatus.type}`, {
    hour: openStatus.hour,
    mins: openStatus.mins,
    day: openStatus.dayIndex !== undefined ? days[openStatus.dayIndex] : undefined,
  })

  const HOURS = [
    '13:00 – 17:30',
    '09:30 – 17:30',
    '09:30 – 17:30',
    '09:30 – 17:30',
    '09:30 – 20:00',
    '09:30 – 17:00',
    t('contact.closed'),
  ]

  const CONTACT_METHODS = [
    {
      icon: <Icon.WhatsApp width="22" height="22" />,
      label: 'WhatsApp',
      value: '+31 6 12 34 56 78',
      href: 'https://wa.me/31612345678',
    },
    {
      icon: <Icon.Phone width="22" height="22" />,
      label: t('contact.callUs'),
      value: '+31 174 123 456',
      href: 'tel:+31174123456',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: t('contact.email'),
      value: 'info@4mobiles.nl',
      href: 'mailto:info@4mobiles.nl',
    },
  ]

  const visitPills = t('contact.visitPills', { returnObjects: true }) as string[]
  const visitFaqItems = t('contact.visitFaqItems', { returnObjects: true }) as { q: string; a: string }[]

  function copyAddress() {
    navigator.clipboard.writeText('Molenstraat 2, 2671 BE Naaldwijk').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="ct-hero">
        <div className="ct-hero-bg" aria-hidden="true" />
        <div className="container ct-hero-inner">
          <span className="ct-eyebrow">CONTACT</span>
          <h1 className="ct-hero-title">4Mobiles</h1>
          <p className="ct-hero-subtext">{t('contact.heroSubtext')}</p>
          <div className="ct-hero-chips">
            <span className={`ct-open-badge${openStatus.open ? ' ct-open-badge--open' : ' ct-open-badge--closed'}`}>
              <span className="ct-open-dot" />
              {openLabel}
            </span>
          </div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="ct-methods-section">
        <div className="container">
          <h2 className="ct-section-title">{t('contact.methodsTitle')}</h2>
          <div className="ct-methods-stack">
            {CONTACT_METHODS.map(m => (
              <a key={m.label} href={m.href} className="ct-method-card" target={m.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                <div className="ct-method-icon-box">
                  {m.icon}
                </div>
                <div className="ct-method-info">
                  <span className="ct-method-label">{m.label}</span>
                  <span className="ct-method-value">{m.value}</span>
                </div>
                <Icon.ChevronRight width="20" height="20" className="ct-chevron" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hours + Map */}
      <section className="ct-info-section">
        <div className="container">
          <div className="ct-info-grid">
            {/* Hours Card */}
            <div className="ct-hours-card">
              <div className="ct-card-header">
                <Icon.Clock width="20" height="20" />
                <h3>{t('contact.hoursTitle')}</h3>
              </div>
              <ul className="ct-hours-list">
                {days.map((day, i) => {
                  const dayIndex = i === 6 ? 0 : i + 1
                  const isToday = dayIndex === TODAY
                  const time = HOURS[i]
                  return (
                    <li key={i} className={`ct-hour-row${isToday ? ' ct-today' : ''}`}>
                      <span className="ct-day">
                        {day}
                      </span>
                      <div className="ct-time-box">
                        {isToday && <span className="ct-today-tag">{t('contact.today')}</span>}
                        <span className={`ct-time${time === t('contact.closed') ? ' ct-closed' : ''}`}>{time}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <p className="ct-hours-note">{t('contact.lastSunday')}</p>

              {/* Parking Card (Light Blue Styling) */}
              <div className="ct-parking-card">
                <span className="ct-parking-icon">
                  <Icon.Park width="20" height="20" />
                </span>
                <div>
                  <p className="ct-parking-title">{t('contact.parkingTitle')}</p>
                  <p className="ct-parking-sub">{t('contact.parkingSub')}</p>
                </div>
              </div>
            </div>

            {/* Location / Map Card */}
            <div className="ct-map-card">
              <div className="ct-card-header">
                <Icon.Pin width="20" height="20" />
                <h3>{t('contact.mapTitle')}</h3>
              </div>
              <div className="ct-address-row">
                <div>
                  <p className="ct-address">Molenstraat 2<br />2671 BE Naaldwijk</p>
                </div>
                <button className="ct-copy-btn" onClick={copyAddress} title="Adres kopiëren">
                  {copied ? <Icon.Check width="16" height="16" /> : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                    </svg>
                  )}
                  {copied ? t('contact.copied') : t('contact.copyAddress')}
                </button>
              </div>

              <div className="ct-map-embed">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2458.0!2d4.2!3d51.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b1!2sMolenstraat%202%2C%20Naaldwijk!5e0!3m2!1snl!2snl!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('contact.mapIframeTitle')}
                />
              </div>

              <div className="ct-map-ctas">
                <a href="https://maps.google.com/?q=Molenstraat+2+Naaldwijk" target="_blank" rel="noopener noreferrer" className="ct-btn-primary">
                  <Icon.MapLink width="18" height="18" /> {t('contact.getDirections')}
                </a>
                <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="ct-btn-dark">
                  <Icon.WhatsApp width="18" height="18" /> {t('contact.whatsappUs')}
                </a>
              </div>
              <p className="ct-map-note">{t('contact.noAppointment')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accessories + FAQ — balanced 50/50 section */}
      <section className="ct-visit-section">
        <div className="container ct-visit-grid">
          <div className="ct-visit-acc">
            <div className="section-eyebrow">{t('contact.visitEyebrow')}</div>
            <h2 className="section-title">{t('contact.visitHeading')}</h2>
            <p className="section-sub">{t('contact.visitBody')}</p>
            <div className="locations-tags ct-visit-pills">
              {visitPills.map(p => <span key={p} className="location-tag">{p}</span>)}
            </div>
          </div>

          <div className="ct-visit-faq">
            <div className="section-eyebrow">{t('contact.faqEyebrow')}</div>
            <h2 className="section-title">{t('contact.faqTitle')}</h2>
            <FaqAccordion items={visitFaqItems} moreLink={{ href: '/#faq', label: t('contact.visitFaqMore') }} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

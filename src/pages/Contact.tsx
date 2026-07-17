import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

const NOW    = new Date()
const TODAY  = NOW.getDay()
const HOUR   = NOW.getHours() + NOW.getMinutes() / 60

function getOpenStatus(): { open: boolean; type: string; hour?: number; mins?: number } {
  if (TODAY === 0) return { open: false, type: 'opensTomorrow' }
  const closeHour = TODAY === 6 ? 17 : 18
  if (HOUR >= 9 && HOUR < closeHour) {
    const remaining = closeHour - HOUR
    const hrs = Math.floor(remaining)
    const mins = Math.round((remaining - hrs) * 60)
    if (hrs > 0) return { open: true, type: 'openLabel', hour: closeHour }
    return { open: true, type: 'openSoon', mins }
  }
  if (HOUR < 9) return { open: false, type: 'opensAt' }
  return { open: false, type: 'opensTomorrow' }
}

const OPEN_STATUS = getOpenStatus()

export function Contact() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const openStatus = OPEN_STATUS
  const openLabel = t(`contact.${openStatus.type}`, { hour: openStatus.hour, mins: openStatus.mins })

  const days = t('contact.days', { returnObjects: true }) as string[]

  const HOURS = [
    '09:00 – 18:00',
    '09:00 – 18:00',
    '09:00 – 18:00',
    '09:00 – 18:00',
    '09:00 – 18:00',
    '09:00 – 17:00',
    t('contact.closed'),
  ]

  const CONTACT_METHODS = [
    {
      icon: <Icon.WhatsApp width="24" height="24" />,
      label: 'WhatsApp',
      value: '+31 6 12 34 56 78',
      href: 'https://wa.me/31612345678',
      color: '#25D366',
    },
    {
      icon: <Icon.Phone width="24" height="24" />,
      label: t('contact.callUs'),
      value: '+31 174 123 456',
      href: 'tel:+31174123456',
      color: 'var(--accent)',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: t('contact.email'),
      value: 'info@4mobiles.nl',
      href: 'mailto:info@4mobiles.nl',
      color: 'var(--accent)',
    },
  ]

  const ACCESSORIES = [
    { icon: <Icon.Shield width="16" height="16" />, label: t('contact.accItem1') },
    { icon: <Icon.Phone width="16" height="16" />, label: t('contact.accItem2') },
    { icon: <Icon.Battery width="16" height="16" />, label: t('contact.accItem3') },
    { icon: <Icon.Euro width="16" height="16" />, label: t('contact.accItem4') },
    { icon: <Icon.Battery width="16" height="16" />, label: t('contact.accItem5') },
    { icon: <Icon.Park width="16" height="16" />, label: t('contact.accItem6') },
  ]

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
        <div className="ct-hero-media" aria-hidden="true" />
        <div className="container ct-hero-inner">
          <span className="ct-eyebrow">{t('contact.eyebrow')}</span>
          <h1 className="ct-hero-title">{t('contact.title')} <span className="ct-green">4MOBILES</span></h1>
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
          <div className="ct-methods">
            {CONTACT_METHODS.map(m => (
              <a key={m.label} href={m.href} className="ct-method" target={m.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                <span className="ct-method-icon" style={{ color: m.color }}>{m.icon}</span>
                <div className="ct-method-info">
                  <span className="ct-method-label">{m.label}</span>
                  <span className="ct-method-value">{m.value}</span>
                </div>
                <svg className="ct-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hours + Map */}
      <section className="ct-info-section">
        <div className="container">
          <div className="ct-info-grid">
            {/* Hours */}
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
                        {isToday && <span className="ct-today-tag">{t('contact.today')}</span>}
                      </span>
                      <span className={`ct-time${time === t('contact.closed') ? ' ct-closed' : ''}`}>{time}</span>
                    </li>
                  )
                })}
              </ul>

              <p className="ct-hours-note">{t('contact.lastSunday')}</p>

              {/* Parking card */}
              <div className="ct-parking-card">
                <span className="ct-parking-icon"><Icon.Park width="20" height="20" /></span>
                <div>
                  <p className="ct-parking-title">{t('contact.parkingTitle')}</p>
                  <p className="ct-parking-sub">{t('contact.parkingSub')}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="ct-map-card">
              <div className="ct-card-header">
                <Icon.Pin width="20" height="20" />
                <h3>{t('contact.mapTitle')}</h3>
              </div>
              <div className="ct-address-row">
                <p className="ct-address">Molenstraat 2<br />2671 BE Naaldwijk</p>
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
                <a href="https://maps.google.com/?q=Molenstraat+2+Naaldwijk" target="_blank" rel="noopener noreferrer" className="btn-accent ct-btn">
                  <Icon.MapLink width="16" height="16" />{t('contact.getDirections')}
                </a>
                <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="ct-btn ct-btn-wa">
                  <Icon.WhatsApp width="16" height="16" />{t('contact.whatsappUs')}
                </a>
              </div>
              <p className="ct-map-note">{t('contact.noAppointment')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accessories / shop CTA */}
      <section className="ct-accessories">
        <div className="container">
          <div className="ct-acc-inner">
            <div className="ct-acc-text">
              <h2 className="ct-acc-title">{t('contact.accTitle')}</h2>
              <p className="ct-acc-sub">{t('contact.accSub')}</p>
              <div className="ct-acc-items">
                {ACCESSORIES.map(item => (
                  <span key={item.label}>{item.icon} {item.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

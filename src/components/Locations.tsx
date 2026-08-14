import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

const CITIES = [
  'Naaldwijk', "'s-Gravenzande", 'De Lier', 'Monster', 'Poeldijk', 'Wateringen',
  'Hoek van Holland', 'Honselersdijk', 'Den Hoorn', 'Kwintsheul', 'Maasdijk',
  'Delft', 'Rijswijk', 'Den Haag',
]

const TODAY = new Date().getDay()

const WEEK_HOURS = [
  '13:00 – 17:30',
  '09:30 – 17:30',
  '09:30 – 17:30',
  '09:30 – 17:30',
  '09:30 – 20:00',
  '09:30 – 17:00',
]

interface LocationsProps {
  regionalNote?: ReactNode
}

export function Locations({ regionalNote }: LocationsProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const days = t('contact.days', { returnObjects: true }) as string[]

  function copyAddress() {
    navigator.clipboard.writeText('Molenstraat 2, 2671 EX Naaldwijk').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section className="section locations">
      <div className="container locations-inner">
        <div className="locations-content">
          <div className="section-eyebrow">{t('locations.eyebrow')}</div>
          <h2 className="section-title">
            {t('locations.title').split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="section-sub">{t('locations.sub')}</p>
          <div className="locations-tags">
            {CITIES.map(c => <span key={c} className="section-pill location-tag">{c}</span>)}
          </div>
        </div>

        <div className="locations-map">
          <div className="map-card">
            <div className="map-pin loc-desktop-only"><Icon.Pin width="20" height="20" /></div>
            <div className="map-pulse loc-desktop-only" />
            <div className="map-info">
              <div className="ct-card-header">
                <Icon.Pin width="20" height="20" />
                <h3>4Mobiles</h3>
              </div>

              <div className="ct-address-row">
                <p className="ct-address">Molenstraat 2<br />2671 EX Naaldwijk</p>
                <button className="ct-copy-btn" onClick={copyAddress} type="button">
                  {copied ? <Icon.Check width="14" height="14" /> : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                  )}
                  {copied ? t('contact.copied') : t('contact.copyAddress')}
                </button>
              </div>

              {regionalNote && <p className="ct-address-note">{regionalNote}</p>}

              <div className="ct-map-ctas">
                <a
                  href="https://maps.google.com/?q=Molenstraat+2+2671+EX+Naaldwijk"
                  target="_blank"
                  rel="noopener"
                  className="ct-btn-primary"
                >
                  <Icon.MapLink width="16" height="16" /> {t('contact.getDirections')}
                </a>
                <a
                  href="https://wa.me/31174237022"
                  target="_blank"
                  rel="noopener"
                  className="ct-btn-dark"
                >
                  <Icon.WhatsApp width="16" height="16" /> {t('contact.whatsappUs')}
                </a>
              </div>

              <ul className="ct-hours-list">
                {days.map((day, i) => {
                  const dayIndex = i === 6 ? 0 : i + 1
                  const isToday = dayIndex === TODAY
                  const time = i === 6 ? t('contact.closed') : WEEK_HOURS[i]
                  return (
                    <li key={i} className={`ct-hour-row${isToday ? ' ct-today' : ''}`}>
                      <span className="ct-day">{day}</span>
                      <div className="ct-time-box">
                        {isToday && <span className="ct-today-tag">{t('contact.today')}</span>}
                        <span className={`ct-time${time === t('contact.closed') ? ' ct-closed' : ''}`}>{time}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

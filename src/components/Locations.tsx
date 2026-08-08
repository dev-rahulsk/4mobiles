import { useState } from 'react'
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

export function Locations() {
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
            {CITIES.map(c => <span key={c} className="location-tag">{c}</span>)}
          </div>
        </div>

        <div className="locations-map">
          <div className="map-card">
            <div className="map-pin loc-desktop-only"><Icon.Pin width="20" height="20" /></div>
            <div className="map-pulse loc-desktop-only" />
            <div className="map-info">
              <div className="ct-card-header loc-mobile-only">
                <Icon.Pin width="20" height="20" />
                <h3>4Mobiles</h3>
              </div>

              <div className="map-title loc-desktop-only">4Mobiles</div>

              <div className="ct-address-row loc-mobile-only">
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
              <div className="map-addr loc-desktop-only">Molenstraat 2<br />2671 EX Naaldwijk</div>

              <a
                href="https://maps.google.com/?q=Molenstraat+2+2671+EX+Naaldwijk"
                target="_blank"
                rel="noopener"
                className="btn btn-primary btn-sm map-nav-btn loc-desktop-only"
                style={{ marginBottom: 14 }}
              >
                <Icon.MapLink width="14" height="14" />
                {t('locations.directions')}
              </a>

              <div className="ct-map-ctas loc-mobile-only">
                <a
                  href="https://maps.google.com/?q=Molenstraat+2+2671+EX+Naaldwijk"
                  target="_blank"
                  rel="noopener"
                  className="ct-btn-primary"
                >
                  <Icon.MapLink width="16" height="16" /> {t('contact.getDirections')}
                </a>
                <a
                  href="https://wa.me/31612345678"
                  target="_blank"
                  rel="noopener"
                  className="ct-btn-dark"
                >
                  <Icon.WhatsApp width="16" height="16" /> {t('contact.whatsappUs')}
                </a>
              </div>

              <div className="map-hours loc-desktop-only">
                <div><b>{t('locations.hours.mon')}</b> 13:00 – 17:30</div>
                <div><b>{t('locations.hours.tueThu')}</b> 09:30 – 17:30</div>
                <div><b>{t('locations.hours.fri')}</b> 09:30 – 20:00</div>
                <div><b>{t('locations.hours.sat')}</b> 09:30 – 17:00</div>
              </div>

              <ul className="ct-hours-list loc-mobile-only">
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
          <svg className="map-bg" viewBox="0 0 400 400" preserveAspectRatio="none">
            <defs>
              <pattern id="mapDots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#mapDots)" />
            <path d="M0 200 Q100 150 200 220 T400 180" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
            <path d="M0 250 Q120 320 240 270 T400 300" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15" />
            <path d="M50 50 L70 60 L90 55 L120 70" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
          </svg>
        </div>
      </div>
    </section>
  )
}

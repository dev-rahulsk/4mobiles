import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

const CITIES = [
  'Naaldwijk', "'s-Gravenzande", 'De Lier', 'Monster', 'Poeldijk', 'Wateringen',
  'Hoek van Holland', 'Honselersdijk', 'Den Hoorn', 'Kwintsheul', 'Maasdijk',
  'Delft', 'Rijswijk', 'Den Haag',
]

export function Locations() {
  const { t } = useTranslation()

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
            <div className="map-pin"><Icon.Pin width="20" height="20" /></div>
            <div className="map-pulse" />
            <div className="map-info">
              <div className="map-title">4Mobiles</div>
              <div className="map-addr">Molenstraat 2<br />2671 EX Naaldwijk</div>
              <a
                href="https://maps.google.com/?q=Molenstraat+2+2671+EX+Naaldwijk"
                target="_blank"
                rel="noopener"
                className="btn btn-primary btn-sm map-nav-btn"
                style={{ marginBottom: 14, display: 'inline-flex' }}
              >
                <Icon.MapLink width="14" height="14" />
                {t('locations.directions')}
              </a>
              <div className="map-hours">
                <div><b>{t('locations.hours.mon')}</b> 13:00 – 17:30</div>
                <div><b>{t('locations.hours.tueThu')}</b> 09:30 – 17:30</div>
                <div><b>{t('locations.hours.fri')}</b> 09:30 – 20:00</div>
                <div><b>{t('locations.hours.sat')}</b> 09:30 – 17:00</div>
              </div>
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

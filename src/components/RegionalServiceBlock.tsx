import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

interface RegionalServiceBlockProps {
  city: string
  minutes: number
}

export function RegionalServiceBlock({ city, minutes }: RegionalServiceBlockProps) {
  const { t } = useTranslation()

  const rows = [
    { icon: Icon.Car, title: t('regioCity.serviceBlock.row1Title', { minutes }), sub: t('regioCity.serviceBlock.row1Sub', { city }) },
    { icon: Icon.Park, title: t('regioCity.serviceBlock.row2Title'), sub: t('regioCity.serviceBlock.row2Sub') },
    { icon: Icon.Bag, title: t('regioCity.serviceBlock.row3Title'), sub: t('regioCity.serviceBlock.row3Sub') },
    { icon: Icon.Clock, title: t('regioCity.serviceBlock.row4Title'), sub: t('regioCity.serviceBlock.row4Sub') },
  ]

  return (
    <section className="rsb">
      <div className="container">
        <div className="rsb-card">
          <div className="rsb-card-intro">
            <div className="rsb-eyebrow-row">
              <Icon.Pin width="16" height="16" />
              <span className="rsb-eyebrow">{t('regioCity.serviceBlock.eyebrow', { city })}</span>
            </div>

            <h2 className="rsb-heading">{t('regioCity.serviceBlock.heading')}</h2>
            <p className="rsb-body">{t('regioCity.serviceBlock.body')}</p>

            <figure className="rsb-photo-placeholder">
              <Icon.Store width="32" height="32" />
              <figcaption>{t('regioCity.serviceBlock.photoCaption')}</figcaption>
            </figure>
          </div>

          <div className="rsb-card-details">
            <div className="rsb-rows">
              {rows.map((row, i) => (
                <div key={i} className="rsb-row">
                  <span className="rsb-row-icon"><row.icon width="20" height="20" /></span>
                  <div className="rsb-row-info">
                    <p className="rsb-row-title">{row.title}</p>
                    <p className="rsb-row-sub">{row.sub}</p>
                  </div>
                  <span className="rsb-row-chevron"><Icon.ChevronRight width="18" height="18" /></span>
                </div>
              ))}
            </div>

            <div className="rsb-card-actions">
              <a
                href="https://maps.google.com/?q=Molenstraat+2+2671+EX+Naaldwijk"
                target="_blank"
                rel="noopener"
                className="rsb-cta"
              >
                {t('regioCity.serviceBlock.ctaRoute')}
                <Icon.ArrowRight width="18" height="18" />
              </a>

              <a href="/veelgestelde-vragen" className="rsb-secondary-link">
                {t('regioCity.serviceBlock.ctaShipping')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

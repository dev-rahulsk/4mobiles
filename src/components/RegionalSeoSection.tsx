import { useTranslation } from 'react-i18next'
import { useLocalizedPath } from '../lib/seo/constants'

interface RegionalSeoSectionProps {
  city: string
  minutes: number
  slug: string
}

export function RegionalSeoSection({ city, minutes, slug }: RegionalSeoSectionProps) {
  const { t } = useTranslation()
  const toLocale = useLocalizedPath()
  const localFact = t(`regioCity.uniqueFacts.${slug}`, { defaultValue: '' })

  return (
    <section className="regio-seo-section">
      <div className="container">
        <h2 className="regio-seo-h2">{t('regioCity.seo.h2', { city })}</h2>

        <p className="regio-seo-text">
          {t('regioCity.seo.p1Pre', { city, minutes })}
          <a href={toLocale('/reparatie/iphone')}>{t('regioCity.seo.p1LinkIphone')}</a>
          {t('regioCity.seo.p1Mid')}
          <a href={toLocale('/reparatie/samsung')}>{t('regioCity.seo.p1LinkSamsung')}</a>
          {t('regioCity.seo.p1Post')}
        </p>

        <p className="regio-seo-text">
          {t('regioCity.seo.p2Pre')}
          <a href={toLocale('/blog/iphone-scherm-stuk')}>{t('regioCity.seo.p2LinkScreen')}</a>
          {t('regioCity.seo.p2Mid1')}
          <a href={toLocale('/blog/batterij-leeg')}>{t('regioCity.seo.p2LinkBattery')}</a>
          {t('regioCity.seo.p2Mid2')}
          <a href={toLocale('/blog/batterij-leeg')}>{t('regioCity.seo.p2LinkCharging')}</a>
          {t('regioCity.seo.p2Post')}
        </p>

        <p className="regio-seo-text">
          {t('regioCity.seo.p3Pre')}
          <a href={toLocale('/reparatie/iphone')}>{t('regioCity.seo.p3LinkIphoneRepair')}</a>
          {t('regioCity.seo.p3Post', { city })}
        </p>

        <h3 className="regio-seo-h3">{t('regioCity.seo.h3Route', { city })}</h3>

        {localFact && <p className="regio-seo-text">{localFact}</p>}
        <p className="regio-seo-text">{t('regioCity.seo.p4', { city, minutes })}</p>
        <p className="regio-seo-text">{t('regioCity.seo.p5', { city })}</p>

        <h3 className="regio-seo-h3">{t('regioCity.seo.h3Shipping')}</h3>

        <p className="regio-seo-text">
          {t('regioCity.seo.p6Pre')}
          <a href={toLocale('/veelgestelde-vragen')}>{t('regioCity.seo.p6LinkShipping')}</a>
          {t('regioCity.seo.p6Post', { city })}
        </p>
      </div>
    </section>
  )
}

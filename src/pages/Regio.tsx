import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'
import { Seo } from '../lib/seo/Seo'
import { JsonLd } from '../lib/seo/JsonLd'
import { breadcrumbSchema } from '../lib/seo/schema'

const STEP_ICONS = [Icon.Star, Icon.Shield, Icon.Clock, Icon.Check]

interface RegioCity {
  name: string
  minutes: number
  slug: string
  isHome?: boolean
}

export function Regio() {
  const { t } = useTranslation()

  const steps = t('regio.steps', { returnObjects: true }) as { title: string; sub: string }[]
  const cities = t('regio.cities', { returnObjects: true }) as RegioCity[]

  return (
    <Layout>
      <Seo title={t('seo.regio.title')} description={t('seo.regio.description')} path="/regio" />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: t('regio.eyebrow'), path: '/regio' }])} />
      {/* Hero */}
      <section className="rg-hero">
        <div className="container">
          <span className="rg-eyebrow">{t('regio.eyebrow')}</span>
          <h1 className="rg-hero-title">{t('regio.defaultHeroTitle')}</h1>
          <p className="rg-hero-sub">{t('regio.defaultHeroSub')}</p>
        </div>
      </section>

      {/* Cities + trust row */}
      <section className="rg-cities" id="gebieden">
        <div className="container">
          <h2 className="rg-cities-title">{t('regio.citiesTitle')}</h2>

          <div className="rg-cities-grid">
            {cities.map(c => (
              <a key={c.slug} href={`/regio/${c.slug}`} className="rg-city-card">
                <span className="rg-city-pin"><Icon.Pin width="20" height="20" /></span>
                <div className="rg-city-info">
                  <h3 className="rg-city-name">{c.name}</h3>
                  {c.isHome ? (
                    <p className="rg-city-home-label">{t('regio.homeCity')}</p>
                  ) : (
                    <p className="rg-city-drivetime">
                      <Icon.Car width="14" height="14" />{t('regio.driveTime', { min: c.minutes })}
                    </p>
                  )}
                </div>
                <span className="rg-city-arrow"><Icon.ArrowRight width="18" height="18" /></span>
              </a>
            ))}
          </div>

          <div className="rg-trust-card">
            {steps.map((s, i) => {
              const Ic = STEP_ICONS[i]
              return (
                <div key={i} className="rg-trust-item">
                  <span className="rg-trust-icon"><Ic width="22" height="22" /></span>
                  <div>
                    <p className="rg-trust-title">{s.title}</p>
                    <p className="rg-trust-sub">{s.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </Layout>
  )
}

import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

const STEP_ICONS = [Icon.Star, Icon.Shield, Icon.Clock, Icon.Check]

export function Regio() {
  const { t } = useTranslation()
  const { city } = useParams<{ city?: string }>()

  const steps = t('regio.steps', { returnObjects: true }) as { title: string; sub: string }[]
  const cities = t('regio.cities', { returnObjects: true }) as { name: string; sub: string; slug: string }[]
  const cityDataMap = t('regio.cityData', { returnObjects: true }) as Record<string, { name: string; region: string; desc: string }>
  const cityData = city ? cityDataMap[city] : null

  return (
    <Layout>
      {/* Hero */}
      <section className="rg-hero">
        <div className="container">
          <div className="rg-hero-grid">
            <div className="rg-hero-content">
              {cityData ? (
                <>
                  <nav className="rg-breadcrumb">
                    <a href="/">{t('regio.breadcrumbHome')}</a>
                    <span>/</span>
                    <a href="/regio">{t('regio.breadcrumbRegion')}</a>
                    <span>/</span>
                    <span>{cityData.name}</span>
                  </nav>
                  <h1 className="rg-hero-title">{t('regio.cityHeroTitle')}<br />{cityData.name}</h1>
                  <p className="rg-hero-sub">{cityData.desc}</p>
                  <div className="rg-hero-ctas">
                    <a href="/#reparatie" className="btn-accent rg-btn">
                      <Icon.Wrench width="16" height="16" />{t('regio.planRepair')}
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <nav className="rg-breadcrumb">
                    <a href="/">{t('regio.breadcrumbHome')}</a>
                    <span>/</span>
                    <span>{t('regio.breadcrumbRegion')}</span>
                  </nav>
                  <h1 className="rg-hero-title">{t('regio.defaultHeroTitle')}</h1>
                  <p className="rg-hero-sub">{t('regio.defaultHeroSub')}</p>
                  <div className="rg-hero-ctas">
                    <a href="/#reparatie" className="btn-accent rg-btn">
                      <Icon.Wrench width="16" height="16" />{t('regio.planRepair')}
                    </a>
                  </div>
                </>
              )}
            </div>
            <div className="rg-hero-map">
              <div className="rg-map-visual">
                <Icon.MapLink width="64" height="64" />
                <span>{cityData ? cityData.region : t('regio.defaultMapLabel')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="rg-steps">
        <div className="container">
          <div className="rg-steps-grid">
            {steps.map((s, i) => {
              const Ic = STEP_ICONS[i]
              return (
                <div key={i} className="rg-step">
                  <span className="rg-step-icon"><Ic width="24" height="24" /></span>
                  <div>
                    <p className="rg-step-title">{s.title}</p>
                    <p className="rg-step-sub">{s.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="rg-cities" id="gebieden">
        <div className="container">
          <span className="rg-eyebrow">{t('regio.citiesEyebrow')}</span>
          <h2 className="rg-cities-title">{t('regio.citiesTitle')}</h2>
          <div className="rg-cities-grid">
            {cities.map(c => (
              <a key={c.slug} href={`/regio/${c.slug}`} className="rg-city-card">
                <span className="rg-city-pin"><Icon.Pin width="20" height="20" /></span>
                <div className="rg-city-info">
                  <h3 className="rg-city-name">{c.name}</h3>
                  <p className="rg-city-sub">{c.sub}</p>
                </div>
                <span className="rg-city-arrow"><Icon.ArrowRight width="18" height="18" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  )
}

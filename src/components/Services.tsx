import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

interface ServicesProps {
  accent: string
}

export function Services({ accent: _accent }: ServicesProps) {
  const { t } = useTranslation()

  const services = [
    { icon: Icon.Crack,   title: t('services.screen.title'),  desc: t('services.screen.desc'),  price: t('services.screen.price'),  tag: t('services.screen.tag') },
    { icon: Icon.Battery, title: t('services.battery.title'), desc: t('services.battery.desc'), price: t('services.battery.price') },
    { icon: Icon.Drop,    title: t('services.water.title'),   desc: t('services.water.desc'),   price: t('services.water.price') },
    { icon: Icon.Speaker, title: t('services.speaker.title'), desc: t('services.speaker.desc'), price: t('services.speaker.price') },
    { icon: Icon.Camera,  title: t('services.camera.title'),  desc: t('services.camera.desc'),  price: t('services.camera.price') },
    { icon: Icon.Wrench,  title: t('services.software.title'),desc: t('services.software.desc'),price: t('services.software.price') },
  ] as const

  return (
    <section className="section services">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">{t('services.eyebrow')}</div>
            <h2 className="section-title">{t('services.title')}</h2>
          </div>
          <a href="#" className="link-arrow">
            {t('services.viewAll')} <Icon.ArrowRight width="16" height="16" />
          </a>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <article key={i} className="service-card">
              <div className="service-icon">
                <s.icon width="28" height="28" />
              </div>
              <div className="service-body">
                <div className="service-head">
                  <h3>{s.title}</h3>
                  {'tag' in s && s.tag && <span className="service-tag">{s.tag}</span>}
                </div>
                <p>{s.desc}</p>
              </div>
              <div className="service-foot">
                <span className="service-price">{s.price}</span>
                <span className="service-arrow">
                  <Icon.ArrowRight width="16" height="16" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

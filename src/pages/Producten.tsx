import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

const BRANDS = ['XS5/VE', 'Spigen', 'OtterBox', 'Belkin', 'Samsung', 'Apple', 'Xiaomi', 'Hama']

const BRAND_CATS: Record<string, string[]> = {
  Apple:   ['Hoesjes', 'Screenprotectors', 'Kabels & Opladers'],
  Samsung: ['Hoesjes', 'Screenprotectors', 'Draadloos opladen'],
  Spigen:  ['Hoesjes', 'Screenprotectors'],
  OtterBox:['Hoesjes'],
  Belkin:  ['Kabels & Opladers', 'Draadloos opladen'],
  Xiaomi:  ['Hoesjes', 'Kabels & Opladers'],
  Hama:    ['Kabels & Opladers', 'Accessoires'],
  'XS5/VE':['Screenprotectors', 'Accessoires'],
}

const USP_ICONS = [Icon.Truck, Icon.Chat, Icon.Cart, Icon.Check]
const CAT_HREF = '/contact'

const CITY_PILLS = [
  'Naaldwijk', 'Wateringen', 'De Lier', 'Monster', "'s-Gravenzande",
  'Maasdijk', 'Poeldijk', 'Kwintsheul', 'Den Haag', 'Delft',
]


function ParallaxHero() {
  const { t } = useTranslation()
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="pd-hero">
      <div className="pd-hero-bg" ref={bgRef} />
      <div className="pd-hero-overlay" />
      <div className="container pd-hero-inner">
        <div className="pd-hero-content">
          <span className="pd-eyebrow">{t('producten.heroEyebrow')}</span>
          <h1 className="pd-hero-title">{t('producten.heroTitle')}</h1>
          <p className="pd-hero-sub">{t('producten.heroSub')}</p>
          <div className="pd-hero-ctas">
            <a href="#categorieen" className="btn-accent pd-btn">{t('producten.viewAssortment')}</a>
            <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-outline">
              <Icon.WhatsApp width="16" height="16" />
              {t('producten.askProduct')}
            </a>
          </div>
          <div className="pd-hero-trust">
            <span className="pd-trust-chip">
              <Icon.Star width="13" height="13" />
              {t('producten.heroTrust1')}
            </span>
            <span className="pd-trust-chip">
              <Icon.Cart width="13" height="13" />
              {t('producten.heroTrust2')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Producten() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState(t('producten.filterAll'))
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const uspPillars = t('producten.uspPillars', { returnObjects: true }) as { title: string; sub: string }[]
  const categories = t('producten.categories', { returnObjects: true }) as { title: string; bullets: string[]; cta: string }[]
  const faqItems = t('producten.faq', { returnObjects: true }) as { q: string; a: string }[]

  const visibleCats = categories.filter(c => {
    if (activeFilter === t('producten.filterAll')) return true
    const allowed = BRAND_CATS[activeFilter] ?? []
    return allowed.includes(c.title)
  })

  return (
    <Layout>
      <ParallaxHero />

      {/* USP pillars */}
      <section className="pd-usps">
        <div className="container">
          <div className="pd-usp-grid">
            {uspPillars.map((p, i) => {
              const Ic = USP_ICONS[i]
              return (
                <div key={i} className="pd-usp">
                  <span className="pd-usp-icon"><Ic width="26" height="26" /></span>
                  <div>
                    <p className="pd-usp-title">{p.title}</p>
                    <p className="pd-usp-sub">{p.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Accessoires intro */}
      <section className="pd-acc">
        <div className="container">
          <span className="pd-eyebrow">{t('producten.assortmentEyebrow')}</span>
          <h2 className="pd-acc-title">{t('producten.assortmentTitle')}</h2>
          <p className="pd-acc-sub">{t('producten.assortmentSub')}</p>

          {/* Brand filter */}
          <div className="pd-brands">
            {[t('producten.filterAll'), ...BRANDS].map(b => (
              <button
                key={b}
                className={`pd-brand-btn${activeFilter === b ? ' active' : ''}`}
                onClick={() => setActiveFilter(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pd-cats" id="categorieen">
        <div className="container">
          <span className="pd-eyebrow">{t('producten.catsEyebrow')}</span>
          <h2 className="pd-cats-title">{t('producten.catsTitle')}</h2>

          {visibleCats.length === 0 ? (
            <div className="pd-no-results">
              <Icon.Search width="32" height="32" />
              <p>{t('producten.noResults')} <strong>{activeFilter}</strong>.</p>
              <button className="pd-brand-btn active" onClick={() => setActiveFilter(t('producten.filterAll'))}>
                {t('producten.showAll')}
              </button>
            </div>
          ) : (
            <div className="pd-cats-grid">
              {visibleCats.map(c => (
                <div key={c.title} className="pd-cat-card">
                  <div className="pd-cat-img">
                    <Icon.Cart width="36" height="36" />
                  </div>
                  <div className="pd-cat-body">
                    <h3 className="pd-cat-title">{c.title}</h3>
                    <ul className="pd-cat-bullets">
                      {c.bullets.map(b => (
                        <li key={b}>
                          <Icon.Check width="14" height="14" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <a href={CAT_HREF} className="pd-cat-cta">{c.cta}</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Nieuw toestel upsell */}
      <section className="pd-upsell">
        <div className="container">
          <div className="pd-upsell-inner">
            <div className="pd-upsell-text">
              <span className="pd-eyebrow">{t('producten.upsellEyebrow')}</span>
              <h2 className="pd-upsell-title">{t('producten.upsellTitle')}</h2>
              <p className="pd-upsell-sub">{t('producten.upsellSub')}</p>
              <ul className="pd-upsell-bullets">
                <li><Icon.Check width="14" height="14" /> {t('producten.upsellBullet1')}</li>
                <li><Icon.Check width="14" height="14" /> {t('producten.upsellBullet2')}</li>
                <li><Icon.Check width="14" height="14" /> {t('producten.upsellBullet3')}</li>
              </ul>
            </div>
            <div className="pd-upsell-ctas">
              <a href="/contact" className="btn-accent pd-btn">
                <Icon.Pin width="16" height="16" /> {t('producten.upsellCta1')}
              </a>
              <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-wa">
                <Icon.WhatsApp width="16" height="16" /> {t('producten.upsellCta2')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Brands strip */}
      <section className="pd-brands-strip">
        <div className="container">
          <p className="pd-brands-label">{t('producten.brandsLabel')}</p>
          <div className="pd-brands-row">
            {BRANDS.map(b => (
              <span key={b} className="pd-brand-chip">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* City pills */}
      <section className="pd-cities">
        <div className="container">
          <p className="pd-cities-label">{t('producten.citiesLabel')}</p>
          <div className="pd-cities-row">
            {CITY_PILLS.map(c => (
              <a key={c} href={`/regio/${c.toLowerCase().replace(/['\s]/g, '-')}`} className="pd-city-pill">
                <Icon.Pin width="12" height="12" /> {c}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pd-faq">
        <div className="container">
          <span className="pd-eyebrow">{t('producten.faqEyebrow')}</span>
          <h2 className="pd-faq-title">{t('producten.faqTitle')}</h2>
          <div className="pd-faq-list">
            {faqItems.map((item, i) => (
              <div key={i} className={`pd-faq-item${openFaq === i ? ' pd-faq-item--open' : ''}`}>
                <button className="pd-faq-header" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="pd-faq-chevron">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <p className="pd-faq-body">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pd-cta">
        <div className="container pd-cta-inner">
          <div>
            <h2 className="pd-cta-title">{t('producten.ctaTitle')}</h2>
            <p className="pd-cta-sub">{t('producten.ctaSub')}</p>
          </div>
          <div className="pd-cta-btns">
            <a href="/contact" className="btn-accent pd-btn">
              <Icon.Pin width="16" height="16" />
              {t('producten.visitShop')}
            </a>
            <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-wa">
              <Icon.WhatsApp width="16" height="16" />
              {t('producten.askUs')}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

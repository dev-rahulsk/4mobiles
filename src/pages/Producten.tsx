import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

import casesImg from '../assets/cases.png'
import screenprotectorsImg from '../assets/screenprotectos.png'
import chargersImg from '../assets/chargers.png'
import carholdersImg from '../assets/carholders.png'
import storeMobileHeroImg from '../assets/ChatGPT_Image_10_jul_2026_11_20_55.png'
import newPhoneMobileImg from '../assets/ChatGPT_Image_10_jul_2026_12_13_54.png'
import desktopNewPhoneApprovedImg from '../assets/ChatGPT_Image_9_jul_2026%2C_19_57_39.png'

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

const CATEGORY_IMAGES = [casesImg, screenprotectorsImg, chargersImg, carholdersImg]

const CAT_IMAGE_MAP: Record<string, string> = {
  'Hoesjes': casesImg,
  'Screenprotectors': screenprotectorsImg,
  'Opladers & kabels': chargersImg,
  'Kabels & Opladers': chargersImg,
  'Draadloos opladen': chargersImg,
  'Autohouders': carholdersImg,
  'Accessoires': carholdersImg,
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
          <a href="/contact" className="pd-hero-link">
            stuur ons een bericht →
          </a>
        </div>
      </div>
    </section>
  )
}

function MobileHero() {
  return (
    <section className="pd-mobile-hero">
      {/* Background Image filling entire mobile hero */}
      <img src={storeMobileHeroImg} alt="Accessoires in de winkel" className="pd-mobile-hero-bg-img" />

      <div className="pd-mobile-hero-inner">
        {/* Top Text Content overlaid on top left wall */}
        <div className="pd-mobile-hero-top">
          <span className="pd-mobile-hero-eyebrow">ACCESSOIRES</span>
          <h1 className="pd-mobile-hero-title">
            Alles voor je telefoon en tablet, gewoon bij ons in de winkel
          </h1>
          <p className="pd-mobile-hero-sub">
            Van stevige hoesjes en screenprotectors tot opladers en autohouders. Wij hebben een ruim aanbod accessoires op voorraad en helpen je direct met de juiste keuze voor jouw toestel.
          </p>
        </div>

        {/* Bottom Content overlaid on lower gradient area */}
        <div className="pd-mobile-hero-bottom">
          <div className="pd-mobile-hero-ctas">
            <a href="/contact" className="btn-accent pd-mobile-btn-primary">
              <div className="pd-mobile-btn-left">
                <Icon.Pin width="18" height="18" />
                <span>Kom langs in de winkel</span>
              </div>
              <span className="pd-btn-arrow">→</span>
            </a>
            <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="pd-mobile-btn-secondary">
              <Icon.WhatsApp width="18" height="18" />
              <span>Vraag naar product</span>
            </a>
          </div>

          <div className="pd-mobile-trust-grid">
            <div className="pd-mobile-trust-card">
              <Icon.Google width="24" height="24" />
              <div>
                <div className="pd-mobile-trust-head">
                  <span className="pd-mobile-trust-rating">4.8/5</span>
                  <span className="pd-mobile-trust-label">op Google</span>
                </div>
                <div className="pd-mobile-trust-stars">★★★★★</div>
              </div>
            </div>
            <div className="pd-mobile-trust-card">
              <div className="pd-mobile-box-icon">
                <Icon.Cart width="20" height="20" />
              </div>
              <div>
                <div className="pd-mobile-trust-val">1000den</div>
                <div className="pd-mobile-trust-sub">artikelen op voorraad</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MobileNewPhoneSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return
      const currentScroll = -rect.top
      const p = Math.min(Math.max(currentScroll / scrollableDistance, 0), 1)
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scale = 1 + progress * 0.08
  const translateY = (1 - progress) * 80

  return (
    <section ref={sectionRef} className="pd-mobile-newphone-section">
      <div className="pd-mobile-newphone-sticky">
        <img
          src={newPhoneMobileImg}
          alt="Nieuw toestel"
          className="pd-mobile-newphone-bg"
          style={{ transform: `scale(${scale})` }}
        />
        <div
          className="pd-mobile-newphone-glass-card"
          style={{ transform: `translateY(${translateY}%)` }}
        >
          <span className="pd-eyebrow">{t('producten.upsellEyebrow')}</span>
          <h2 className="pd-upsell-title">{t('producten.upsellTitle')}</h2>
          <p className="pd-upsell-sub">{t('producten.upsellSub')}</p>
          <ul className="pd-upsell-bullets">
            <li><Icon.Check width="14" height="14" /> {t('producten.upsellBullet1')}</li>
            <li><Icon.Check width="14" height="14" /> {t('producten.upsellBullet2')}</li>
            <li><Icon.Check width="14" height="14" /> {t('producten.upsellBullet3')}</li>
          </ul>
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
  )
}

function DesktopNewPhoneSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return
      const currentScroll = -rect.top
      const p = Math.min(Math.max(currentScroll / scrollableDistance, 0), 1)
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scale = 1 + progress * 0.04
  const translateY = (1 - progress) * 36

  return (
    <section ref={sectionRef} className="pd-desktop-newphone-section">
      <div className="pd-desktop-newphone-sticky">
        <img
          src={desktopNewPhoneApprovedImg}
          alt="Nieuw toestel bescherming"
          className="pd-desktop-newphone-bg"
          style={{ transform: `scale(${scale})` }}
        />
        <div className="pd-desktop-newphone-gradient-overlay" />

        <div className="container pd-desktop-newphone-container">
          <div
            className="pd-desktop-newphone-text-card"
            style={{ transform: `translateY(${translateY}px)` }}
          >
            <span className="pd-eyebrow">{t('producten.upsellEyebrow')}</span>
            <h2 className="pd-desktop-newphone-title">{t('producten.upsellTitle')}</h2>
            <p className="pd-desktop-newphone-sub">{t('producten.upsellSub')}</p>

            <ul className="pd-desktop-newphone-bullets">
              <li><Icon.Check width="16" height="16" /> {t('producten.upsellBullet1')}</li>
              <li><Icon.Check width="16" height="16" /> {t('producten.upsellBullet2')}</li>
              <li><Icon.Check width="16" height="16" /> {t('producten.upsellBullet3')}</li>
              <li><Icon.Check width="16" height="16" /> Applicatie service in de winkel</li>
            </ul>

            <div className="pd-desktop-newphone-ctas">
              <a href="/contact" className="btn-accent pd-btn">
                <Icon.Pin width="16" height="16" /> {t('producten.upsellCta1')}
              </a>
              <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-wa">
                <Icon.WhatsApp width="16" height="16" /> {t('producten.upsellCta2')}
              </a>
            </div>
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
  const catsGridRef = useRef<HTMLDivElement>(null)

  const uspPillars = t('producten.uspPillars', { returnObjects: true }) as { title: string; sub: string }[]
  const categories = t('producten.categories', { returnObjects: true }) as { title: string; bullets: string[]; cta: string }[]
  const faqItems = t('producten.faq', { returnObjects: true }) as { q: string; a: string }[]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.15 }
    )

    if (catsGridRef.current) {
      observer.observe(catsGridRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const visibleCats = categories.filter(c => {
    if (activeFilter === t('producten.filterAll')) return true
    const allowed = BRAND_CATS[activeFilter] ?? []
    return allowed.includes(c.title)
  })

  return (
    <Layout>
      {/* DESKTOP HERO */}
      <div className="pd-desktop-only">
        <ParallaxHero />
      </div>

      {/* MOBILE HERO */}
      <div className="pd-mobile-only">
        <MobileHero />
      </div>

      {/* USP pillars (Desktop only) */}
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
            <div className="pd-cats-grid" ref={catsGridRef}>
              {visibleCats.map((c, index) => {
                const imgAsset = CAT_IMAGE_MAP[c.title] || (
                  c.title.toLowerCase().includes('screen') ? screenprotectorsImg :
                  c.title.toLowerCase().includes('laad') || c.title.toLowerCase().includes('kabel') || c.title.toLowerCase().includes('oplad') ? chargersImg :
                  c.title.toLowerCase().includes('auto') || c.title.toLowerCase().includes('houder') ? carholdersImg :
                  CATEGORY_IMAGES[index % CATEGORY_IMAGES.length]
                )
                return (
                  <div key={c.title} className="pd-cat-card">
                    <div className="pd-cat-img-box">
                      <img src={imgAsset} alt={c.title} className="pd-cat-img-el" />
                      {/* Mobile glassmorphism title overlay */}
                      <div className="pd-cat-glass-title-mobile">
                        <span>{c.title}</span>
                      </div>
                    </div>
                    <div className="pd-cat-body">
                      {/* Desktop title inside body */}
                      <h3 className="pd-cat-title pd-desktop-only">{c.title}</h3>
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
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Nieuw toestel upsell — Desktop Version */}
      <div className="pd-desktop-only">
        <DesktopNewPhoneSection />
      </div>

      {/* Nieuw toestel upsell — Mobile Parallax & Sticky Version */}
      <div className="pd-mobile-only">
        <MobileNewPhoneSection />
      </div>

      {/* Brands strip */}
      <section className="pd-brands-strip">
        <div className="container">
          <p className="pd-brands-label">{t('producten.brandsLabel')}</p>

          {/* Desktop static row */}
          <div className="pd-brands-row pd-desktop-only">
            {BRANDS.map(b => (
              <span key={b} className="pd-brand-chip">{b}</span>
            ))}
          </div>

          {/* Mobile infinite marquee */}
          <div className="pd-brands-marquee-wrap pd-mobile-only">
            <div className="pd-brands-marquee-track">
              {BRANDS.concat(BRANDS).concat(BRANDS).map((b, i) => (
                <span key={`${b}-${i}`} className="pd-brand-chip">{b}</span>
              ))}
            </div>
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

      {/* FAQ — Homepage style consistency */}
      <section className="section faq">
        <div className="container faq-inner">
          <div className="faq-side">
            <div className="section-eyebrow">{t('producten.faqEyebrow')}</div>
            <h2 className="section-title">{t('producten.faqTitle')}</h2>
            <p className="section-sub">Heb je nog een vraag over een lader, hoesje of screenprotector? Bekijk de antwoorden of neem contact op.</p>
            <div className="faq-cta">
              <a href="/contact" className="btn btn-primary">
                <Icon.Chat width="16" height="16" /> Stuur ons een bericht
              </a>
              <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Icon.WhatsApp width="16" height="16" /> WhatsApp met ons
              </a>
            </div>
          </div>

          <div className="faq-list">
            {faqItems.map((item, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' faq-open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-icon"><Icon.Plus width="18" height="18" /></span>
                </button>
                {openFaq === i && <div className="faq-a">{item.a}</div>}
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

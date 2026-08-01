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
import storeInteriorWideImg from '../assets/ChatGPT_Image_30_jul_2026_20_05_04.png'

const BRANDS = ['XS5/VE', 'Spigen', 'OtterBox', 'Belkin', 'Samsung', 'Apple', 'Xiaomi', 'Hama']

const BRAND_CATS: Record<string, string[]> = {
  Apple: ['cases', 'screenprotectors', 'chargers'],
  Samsung: ['cases', 'screenprotectors', 'chargers'],
  Spigen: ['cases', 'screenprotectors'],
  OtterBox: ['cases'],
  Belkin: ['chargers'],
  Xiaomi: ['cases', 'chargers'],
  Hama: ['chargers', 'carholders'],
  'XS5/VE': ['screenprotectors'],
}

const CAT_IMAGE_MAP: Record<string, string> = {
  cases: casesImg,
  screenprotectors: screenprotectorsImg,
  chargers: chargersImg,
  carholders: carholdersImg,
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
            {t('producten.heroLink')}
          </a>
        </div>
      </div>
    </section>
  )
}

function MobileHero() {
  const { t } = useTranslation()
  return (
    <section className="pd-mobile-hero">
      {/* Background Image filling entire mobile hero */}
      <img src={storeMobileHeroImg} alt={t('producten.heroBgAlt')} className="pd-mobile-hero-bg-img" />
      <div className="pd-mobile-hero-scrim" />

      <div className="pd-mobile-hero-inner">
        {/* Top Text Content overlaid on top left wall */}
        <div className="pd-mobile-hero-top">
          <span className="pd-mobile-hero-eyebrow">{t('producten.heroEyebrow')}</span>
          <h1 className="pd-mobile-hero-title">
            {t('producten.heroTitle')}
          </h1>
        </div>

        {/* Bottom Content overlaid on lower gradient area */}
        <div className="pd-mobile-hero-bottom">
          <div className="pd-mobile-hero-ctas">
            <a href="/contact" className="btn-accent pd-mobile-btn-primary">
              <div className="pd-mobile-btn-left">
                <Icon.Pin width="18" height="18" />
                <span>{t('producten.heroMobileCta')}</span>
              </div>
              <span className="pd-btn-arrow">→</span>
            </a>
          </div>

          <div className="pd-mobile-trust-grid">
            <div className="pd-mobile-trust-card">
              <Icon.Google width="24" height="24" />
              <div>
                <div className="pd-mobile-trust-head">
                  <span className="pd-mobile-trust-rating">4.8/5</span>
                  <span className="pd-mobile-trust-label">{t('producten.heroTrustGoogleLabel')}</span>
                </div>
                <div className="pd-mobile-trust-stars">★★★★★</div>
              </div>
            </div>
            <div className="pd-mobile-trust-card">
              <div className="pd-mobile-box-icon">
                <Icon.Cart width="20" height="20" />
              </div>
              <div>
                <div className="pd-mobile-trust-val">{t('producten.heroTrustCount')}</div>
                <div className="pd-mobile-trust-sub">{t('producten.heroTrustCountSub')}</div>
              </div>
            </div>
          </div>

          <div className="pd-mobile-hero-brands">
            <div className="pd-brands-marquee-wrap">
              <div className="pd-brands-marquee-track">
                {BRANDS.concat(BRANDS).concat(BRANDS).map((b, i) => (
                  <span key={`hero-brand-${b}-${i}`} className="pd-brand-chip">{b}</span>
                ))}
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
  const bgRef = useRef<HTMLImageElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      if (!sectionRef.current || !bgRef.current || !cardRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return
      const currentScroll = -rect.top
      const p = Math.min(Math.max(currentScroll / scrollableDistance, 0), 1)

      const parallaxY = (p - 0.5) * 20
      const reveal = Math.min(Math.max((p - 0.6) / 0.4, 0), 1)
      const cardTranslateY = (1 - reveal) * 32

      bgRef.current.style.transform = `translateY(${parallaxY}px)`
      cardRef.current.style.transform = `translateY(${cardTranslateY}px)`
      cardRef.current.style.opacity = `${reveal}`
    }
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="pd-mobile-newphone-section">
      <div className="pd-mobile-newphone-sticky">
        <img
          ref={bgRef}
          src={newPhoneMobileImg}
          alt={t('producten.newPhoneAlt')}
          className="pd-mobile-newphone-bg"
        />
        <div className="pd-mobile-newphone-scrim" />
        <div className="pd-mobile-newphone-hero-text">
          <span className="pd-eyebrow">{t('producten.upsellEyebrow')}</span>
          <h2 className="pd-upsell-title">{t('producten.upsellTitle')}</h2>
        </div>
        <div ref={cardRef} className="pd-mobile-newphone-glass-card-lite">
          <p>{t('producten.upsellMobileCardText')}</p>
        </div>
      </div>
    </section>
  )
}

function DesktopNewPhoneSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLImageElement>(null)
  const textCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      if (!sectionRef.current || !bgRef.current || !textCardRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return
      const currentScroll = -rect.top
      const p = Math.min(Math.max(currentScroll / scrollableDistance, 0), 1)

      const scale = 1 + p * 0.04
      const translateY = (1 - p) * 36

      bgRef.current.style.transform = `scale(${scale})`
      textCardRef.current.style.transform = `translateY(${translateY}px)`
    }
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="pd-desktop-newphone-section">
      <div className="pd-desktop-newphone-sticky">
        <img
          ref={bgRef}
          src={desktopNewPhoneApprovedImg}
          alt={t('producten.newPhoneProtectionAlt')}
          className="pd-desktop-newphone-bg"
        />
        <div className="pd-desktop-newphone-gradient-overlay" />

        <div className="container pd-desktop-newphone-container">
          <div ref={textCardRef} className="pd-desktop-newphone-text-card">
            <span className="pd-eyebrow">{t('producten.upsellEyebrow')}</span>
            <h2 className="pd-desktop-newphone-title">{t('producten.upsellTitle')}</h2>
            <p className="pd-desktop-newphone-sub">{t('producten.upsellSub')}</p>

            <ul className="pd-desktop-newphone-bullets">
              <li><Icon.Check width="16" height="16" /> {t('producten.upsellBullet1')}</li>
              <li><Icon.Check width="16" height="16" /> {t('producten.upsellBullet2')}</li>
              <li><Icon.Check width="16" height="16" /> {t('producten.upsellBullet3')}</li>
              <li><Icon.Check width="16" height="16" /> {t('producten.upsellBullet4')}</li>
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
  const [addressCopied, setAddressCopied] = useState(false)
  const catsGridRef = useRef<HTMLDivElement>(null)
  const catImgWrapRefs = useRef<(HTMLDivElement | null)[]>([])

  const uspPillars = t('producten.uspPillars', { returnObjects: true }) as { title: string; sub: string }[]
  const categories = t('producten.categories', { returnObjects: true }) as { id: string; title: string; price?: string; bullets: string[]; cta: string }[]
  const faqItems = t('producten.faq', { returnObjects: true }) as { q: string; a: string }[]
  const faqMobileExtraItems = t('producten.faqMobileExtra', { returnObjects: true }) as { q: string; a: string }[]
  const mobileFaqItems = [...faqItems, ...faqMobileExtraItems]

  const copyAddress = () => {
    navigator.clipboard.writeText('Molenstraat 2, 2671 EX Naaldwijk')
    setAddressCopied(true)
    setTimeout(() => setAddressCopied(false), 2000)
  }

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

  useEffect(() => {
    let ticking = false
    const updateParallax = () => {
      ticking = false
      const vh = window.innerHeight
      catImgWrapRefs.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1)
        const y = (progress - 0.5) * 16
        el.style.transform = `translateY(${y}px)`
      })
    }
    const onScrollOrResize = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(updateParallax)
    }
    updateParallax()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  const visibleCats = categories.filter(c => {
    if (activeFilter === t('producten.filterAll')) return true
    const allowed = BRAND_CATS[activeFilter] ?? []
    return allowed.includes(c.id)
  })

  return (
    <Layout>
      <div className="pd-desktop-only">
        <ParallaxHero />
      </div>

      <div className="pd-mobile-only">
        <MobileHero />
      </div>

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

      <section className="pd-acc">
        <div className="container">
          <span className="pd-eyebrow">{t('producten.assortmentEyebrow')}</span>
          <h2 className="pd-acc-title">{t('producten.assortmentTitle')}</h2>
          <p className="pd-acc-sub pd-desktop-only">{t('producten.assortmentSub')}</p>
          <p className="pd-acc-sub pd-mobile-only">{t('producten.assortmentSubMobile')}</p>

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
                const imgAsset = CAT_IMAGE_MAP[c.id]
                return (
                  <div key={c.id} className="pd-cat-card">
                    <div className="pd-cat-img-box">
                      <div
                        className="pd-cat-img-parallax"
                        ref={(el) => { catImgWrapRefs.current[index] = el }}
                      >
                        <img src={imgAsset} alt={c.title} className="pd-cat-img-el" />
                      </div>
                      <div className="pd-cat-glass-title-mobile">
                        <span>{c.title}</span>
                      </div>
                    </div>
                    <div className="pd-cat-body">
                      <h3 className="pd-cat-title pd-desktop-only">{c.title}</h3>
                      {c.price && <p className="pd-cat-price">{c.price}</p>}
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

      <div className="pd-desktop-only">
        <DesktopNewPhoneSection />
      </div>

      <div className="pd-mobile-only">
        <MobileNewPhoneSection />
      </div>

      <section className="pd-mobile-only pd-store-faq-section">
        <div className="container">
          <span className="pd-eyebrow">{t('producten.faqEyebrow')}</span>
          <h2 className="section-title">{t('producten.faqTitle')}</h2>
          <p className="section-sub">{t('producten.faqSub')}</p>

          <div className="pd-cities-row pd-store-faq-cities">
            {CITY_PILLS.map(c => (
              <a key={c} href={`/regio/${c.toLowerCase().replace(/['\s]/g, '-')}`} className="pd-city-pill">
                <Icon.Pin width="12" height="12" /> {c}
              </a>
            ))}
          </div>

          <div className="faq-list pd-store-faq-list">
            {mobileFaqItems.map((item, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' faq-open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-icon"><Icon.Plus width="18" height="18" /></span>
                </button>
                {openFaq === i && <div className="faq-a">{item.a}</div>}
              </div>
            ))}
          </div>

          <div className="pd-store-promo-card">
            <img src={storeInteriorWideImg} alt={t('producten.storeInteriorAlt')} className="pd-store-promo-bg" />
            <div className="pd-store-promo-overlay" />
            <div className="pd-store-promo-content">
              <h3>{t('producten.promoTitle')}</h3>
              <ul>
                <li><Icon.Check width="14" height="14" /> {t('producten.promoBullet1')}</li>
                <li><Icon.Check width="14" height="14" /> {t('producten.promoBullet2')}</li>
                <li><Icon.Check width="14" height="14" /> {t('producten.promoBullet3')}</li>
                <li><Icon.Check width="14" height="14" /> {t('producten.promoBullet4')}</li>
              </ul>
            </div>
          </div>

          <div className="pd-store-visit-card">
            <div className="map-pin"><Icon.Pin width="20" height="20" /></div>
            <div className="map-pulse" />
            <div className="map-info">
              <div className="pd-store-visit-head">
                <div className="map-title">{t('producten.storeVisitTitle')}</div>
                <button className="pd-store-copy-btn" onClick={copyAddress}>
                  {addressCopied ? '✓' : t('producten.storeVisitCopyBtn')}
                </button>
              </div>
              <div className="map-addr">Molenstraat 2<br />2671 EX Naaldwijk</div>
              <div className="pd-store-visit-btns">
                <a
                  href="https://maps.google.com/?q=Molenstraat+2+2671+EX+Naaldwijk"
                  target="_blank"
                  rel="noopener"
                  className="btn-accent pd-btn"
                >
                  <Icon.MapLink width="16" height="16" /> {t('producten.storeVisitRoute')}
                </a>
                <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-wa">
                  <Icon.WhatsApp width="16" height="16" /> {t('producten.storeVisitWhatsapp')}
                </a>
              </div>
              <p className="pd-store-visit-noappt">{t('producten.storeVisitNoAppt')}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="pd-desktop-only">
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

        <section className="section faq">
          <div className="container faq-inner">
            <div className="faq-side">
              <div className="section-eyebrow">{t('producten.faqEyebrow')}</div>
              <h2 className="section-title">{t('producten.faqTitle')}</h2>
              <p className="section-sub">{t('producten.faqSub')}</p>
              <div className="faq-cta">
                <a href="/contact" className="btn btn-primary">
                  <Icon.Chat width="16" height="16" /> {t('producten.faqCtaChat')}
                </a>
                <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <Icon.WhatsApp width="16" height="16" /> {t('producten.faqCtaWhatsapp')}
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

        <section className="pd-desktop-visit-section">
          <div className="container pd-desktop-visit-grid">
            <div className="pd-desktop-visit-promo">
              <img src={storeInteriorWideImg} alt={t('producten.storeInteriorWideAlt')} className="pd-desktop-visit-promo-bg" />
              <div className="pd-desktop-visit-promo-overlay" />
              <div className="pd-desktop-visit-promo-content">
                <h3>{t('producten.promoTitle')}</h3>
                <ul>
                  <li><Icon.Check width="16" height="16" /> {t('producten.promoBullet1')}</li>
                  <li><Icon.Check width="16" height="16" /> {t('producten.promoBullet2')}</li>
                  <li><Icon.Check width="16" height="16" /> {t('producten.promoBullet3')}</li>
                  <li><Icon.Check width="16" height="16" /> {t('producten.promoBullet4')}</li>
                </ul>
              </div>
            </div>

            <div className="pd-desktop-visit-card">
              <div className="pd-store-visit-head">
                <div className="pd-desktop-visit-title"><Icon.Pin width="20" height="20" /> {t('producten.storeVisitTitle')}</div>
                <button className="pd-store-copy-btn" onClick={copyAddress}>
                  {addressCopied ? '✓' : t('producten.storeVisitCopyBtn')}
                </button>
              </div>
              <p className="pd-desktop-visit-addr">Molenstraat 2<br />2671 EX Naaldwijk</p>

              <div className="pd-desktop-visit-map">
                <a
                  href="https://maps.google.com/?q=Molenstraat+2+2671+EX+Naaldwijk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-desktop-visit-maplink"
                >
                  <Icon.MapLink width="14" height="14" /> {t('producten.openInMaps')}
                </a>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2458.0!2d4.2!3d51.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b1!2sMolenstraat%202%2C%20Naaldwijk!5e0!3m2!1snl!2snl!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('producten.storeVisitTitle')}
                />
              </div>

              <div className="pd-desktop-visit-btns">
                <a
                  href="https://maps.google.com/?q=Molenstraat+2+2671+EX+Naaldwijk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent pd-btn"
                >
                  <Icon.MapLink width="16" height="16" /> {t('producten.storeVisitRoute')}
                </a>
                <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-dark">
                  <Icon.WhatsApp width="16" height="16" /> {t('producten.storeVisitWhatsapp')}
                </a>
              </div>
              <p className="pd-store-visit-noappt">{t('producten.storeVisitNoAppt')}</p>
            </div>
          </div>
        </section>
      </div>

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

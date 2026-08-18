import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'
import { Pill, MobileHero, GlassBadge, CtaButton, DesktopHero } from '../components/global'
import { Seo } from '../lib/seo/Seo'
import { JsonLd } from '../lib/seo/JsonLd'
import { breadcrumbSchema, faqPageSchema } from '../lib/seo/schema'
import desktopBusinessHeroImg from '../assets/new_desktop_hero.png'
import mobileHeroImg from '../assets/business_mobile_hero.png'
import section4Img from '../assets/section_4_image.png'
import section4MobileImg from '../assets/ChatGPT_Image_10_aug_2026_19_39_28.png'
import sec5DesktopImg from '../assets/section_5_image1.png'
import sec5MobileImg from '../assets/section_5_mobilei_image.png'

const MOBILE_STAT_ICONS = [Icon.Star, Icon.Calendar, Icon.Wrench, Icon.Users]
const SERVICE_ICONS = [Icon.Wrench, Icon.Shield, Icon.Accessory, Icon.Devices, Icon.Pin, Icon.Headset]

const ZAKELIJK_HERO_GRADIENT = 'linear-gradient(180deg, #050804 0%, #050804 36%, #366b18 44%, #1e3311 62%, #0d1409 82%, #030503 100%)'

const SEC5_SCALE_STOPS = [1.02, 1.04, 1.01, 1.0, 0.99]

function sampleSec5Scale(p: number) {
  const segs = SEC5_SCALE_STOPS.length - 1
  const seg = Math.min(segs - 1, Math.floor(p * segs))
  const segStart = seg / segs
  const segP = (p - segStart) * segs
  return SEC5_SCALE_STOPS[seg] + (SEC5_SCALE_STOPS[seg + 1] - SEC5_SCALE_STOPS[seg]) * segP
}

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t))
  return c * c * (3 - 2 * c)
}

function rangeProgress(p: number, start: number, end: number) {
  return smoothstep((p - start) / (end - start))
}

function Stars({ n }: { n: number }) {
  return (
    <span className="zk-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon.Star key={i} width="13" height="13" style={{ color: i < n ? '#f59e0b' : '#d1d5db' }} />
      ))}
    </span>
  )
}


export function Zakelijk() {
  const { t } = useTranslation()
  const [openFaq, setOpenFaq] = useState(0)
  const [sec5BulletsVisible, setSec5BulletsVisible] = useState(false)
  const [sec5GlassCardVisible, setSec5GlassCardVisible] = useState(false)
  const [servicesProgress, setServicesProgress] = useState(0)
  const [servicesGridRevealed, setServicesGridRevealed] = useState(false)

  const sec5ContainerRef = useRef<HTMLDivElement>(null)
  const sec5BgRef = useRef<HTMLImageElement>(null)
  const sec5VignetteRef = useRef<HTMLDivElement>(null)
  const sec5ListRef = useRef<HTMLUListElement>(null)
  const sec5GlassCardRef = useRef<HTMLDivElement>(null)
  const servicesPinRef = useRef<HTMLDivElement>(null)
  const servicesGridRef = useRef<HTMLDivElement>(null)

  const stats = t('zakelijk.stats', { returnObjects: true }) as { num: string; label: string }[]
  const testimonials = t('zakelijk.testimonials', { returnObjects: true }) as { initial: string; name: string; role: string; stars: number; text: string }[]
  const services = t('zakelijk.services', { returnObjects: true }) as { title: string; desc: string }[]
  const preventBullets = t('zakelijk.preventBullets', { returnObjects: true }) as string[]
  const orgPills = t('zakelijk.orgPills', { returnObjects: true }) as string[]
  const businessFaqs = t('zakelijk.faq', { returnObjects: true }) as { q: string; a: string }[]
  const seoParagraphs = t('zakelijk.seoParagraphs', { returnObjects: true }) as string[]

  useEffect(() => {
    let ticking = false

    function apply() {
      ticking = false
      const bg = sec5BgRef.current
      const vignette = sec5VignetteRef.current
      const container = sec5ContainerRef.current
      if (!bg || !vignette || !container) return
      if (window.innerWidth < 992) return
      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight
      const total = vh + rect.height
      const raw = total > 0 ? (vh - rect.top) / total : 0
      const progress = Math.max(0, Math.min(1, raw))

      bg.style.transform = `scale(${sampleSec5Scale(progress).toFixed(4)}) translateX(${(-40 * progress).toFixed(2)}px)`
      vignette.style.opacity = (0.45 + 0.15 * progress).toFixed(3)
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(apply)
      }
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const el = sec5ListRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSec5BulletsVisible(true) }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = servicesGridRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setServicesGridRevealed(true) }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = sec5GlassCardRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSec5GlassCardVisible(true) }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    let ticking = false

    function apply() {
      ticking = false
      const el = servicesPinRef.current
      if (!el) return
      if (window.innerWidth <= 900) {
        setServicesProgress(1)
        return
      }
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh
      const raw = total > 0 ? -rect.top / total : 1
      setServicesProgress(Math.max(0, Math.min(1, raw)))
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(apply)
      }
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const servicesHeaderStyle = (start: number) => {
    const p = rangeProgress(servicesProgress, start, start + 0.12)
    return { opacity: p, transform: `translateY(${((1 - p) * 24).toFixed(1)}px)` }
  }

  const serviceCardStyle = (i: number) => {
    if (window.innerWidth <= 900) return {}
    const start = i < 3 ? 0.35 + i * 0.03 : 0.55 + (i - 3) * 0.03
    const end = i < 3 ? 0.60 : 0.80
    const p = rangeProgress(servicesProgress, start, end)
    return { opacity: p, transform: `translateY(${((1 - p) * 32).toFixed(1)}px)` }
  }

  return (
    <Layout>
      <Seo title={t('seo.zakelijk.title')} description={t('seo.zakelijk.description')} path="/zakelijk" />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: t('nav.business'), path: '/zakelijk' }])} />
      <JsonLd data={faqPageSchema(businessFaqs)} />
      {/* Business Page Hero Section */}
      <section className="zk-hero-section">
        {/* DESKTOP HERO VIEW — shared global DesktopHero component */}
        <div className="g-desktop-only">
          <DesktopHero
            eyebrow={t('zakelijk.eyebrow')}
            title={
              <>
                {t('zakelijk.heroTitle1')}{' '}
                <span className="accent">{t('zakelijk.heroTitleAccent')}</span>
              </>
            }
            description={t('zakelijk.heroSubShort')}
            cta={{ label: t('zakelijk.contactUs'), href: '/contact' }}
            image={{ src: desktopBusinessHeroImg, alt: t('zakelijk.heroImgPlaceholder') }}
            imagePosition="center 38%"
            badges={stats.map((s, i) => ({
              icon: i === 0 ? Icon.Google : MOBILE_STAT_ICONS[i] || Icon.Star,
              value: s.num,
              title: s.label,
              rating: i === 0 ? 5 : undefined,
            }))}
          />
        </div>

        {/* MOBILE HERO VIEW — shared global MobileHero component */}
        <div className="g-mobile-only">
          <MobileHero
            className="zk-mobile-hero"
            image={{ src: mobileHeroImg, alt: t('zakelijk.heroImgMobileAlt') }}
            imagePositionY="38%"
            bgGradient={ZAKELIJK_HERO_GRADIENT}
            eyebrow={t('zakelijk.eyebrow')}
            title={
              <>
                {t('zakelijk.heroTitle1')}{' '}
                <span style={{ color: 'var(--accent)' }}>{t('zakelijk.heroTitleAccent')}</span>
              </>
            }
            subtext={t('zakelijk.heroSub')}
            cta={
              <CtaButton variant="light" href="/contact">
                <Icon.Phone width="18" height="18" />
                <span>{t('zakelijk.contactUs')}</span>
                <Icon.ArrowRight width="16" height="16" />
              </CtaButton>
            }
            badges={stats.map((s, i) => {
              const Ic = MOBILE_STAT_ICONS[i] || Icon.Star
              return (
                <GlassBadge
                  key={i}
                  icon={Ic}
                  value={s.num}
                  title={s.label}
                  text={i === 0 ? '★★★★★' : undefined}
                />
              )
            })}
          />
        </div>
      </section>

      {/* Testimonials — What clients say */}
      <section className="zk-testimonials">
        <div className="container">
          <div className="zk-test-header">
            <span className="zk-eyebrow">{t('zakelijk.reviewsEyebrow')}</span>
            <h2 className="zk-section-title">{t('zakelijk.reviewsTitle')}</h2>
            <p className="zk-test-subtitle">{t('zakelijk.reviewsSub')}</p>
          </div>
          <div className="zk-test-grid">
            {testimonials.map((item, i) => (
              <div key={i} className="zk-test-card">
                <div className="zk-test-quote-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M9.333 21.333C7.493 21.333 6 19.84 6 18V14.667C6 10.985 8.985 8 12.667 8h.666v2.667h-.666c-2.206 0-4 1.794-4 4v.666h4v6zm13.334 0C20.827 21.333 19.333 19.84 19.333 18V14.667c0-3.682 2.985-6.667 6.667-6.667H26.667v2.667H26c-2.206 0-4 1.794-4 4v.666h4v6z" fill="#16a34a" opacity="0.3" />
                  </svg>
                </div>
                <Stars n={item.stars} />
                <p className="zk-test-text">{item.text}</p>
                <div className="zk-test-author">
                  <div className="zk-photo-avatar" style={{ background: i === 0 ? 'linear-gradient(135deg, #1e3a2f 0%, #16a34a 100%)' : 'linear-gradient(135deg, #1e2e3a 0%, #2563eb 100%)' }}>
                    <span className="zk-avatar-initial">{item.initial}</span>
                  </div>
                  <div className="zk-author-info">
                    <p className="zk-author-name">{item.name}</p>
                    <p className="zk-author-role">{item.role}</p>
                  </div>
                  <a href="https://g.page/4mobiles" target="_blank" rel="noopener noreferrer" className="zk-g-badge" aria-label="Google review">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid — Section 4 — pinned reveal on desktop */}
      <div className="zk-services-pin-wrapper" ref={servicesPinRef}>
        <div className="zk-services-pin-inner">
          <section className="zk-services" id="diensten">
            {/* Desktop Container Background Image */}
            <div className="zk-services-bg-wrap">
              <img src={section4Img} alt="" className="zk-services-bg-img" />
            </div>

            <div className="container zk-services-relative-container">
              {/* Desktop Top-Right Absolute Floating Glass Card */}
              <div className="zk-services-floating-badge">
                <div className="zk-badge-check-icon">
                  <Icon.Check width="16" height="16" />
                </div>
                <div className="zk-badge-content">
                  <p className="zk-badge-title">{t('zakelijk.badgeTitle')}</p>
                  <p className="zk-badge-sub">
                    {t('zakelijk.badgeSub').split('\n').map((line, i, arr) => (
                      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="zk-services-mobile-hero">
                <div className="zk-services-header-top">
                  <span className="zk-eyebrow-tag" style={servicesHeaderStyle(0.20)}>{t('zakelijk.servicesEyebrow')}</span>
                  <h2 className="zk-services-h2" style={servicesHeaderStyle(0.22)}>
                    {t('zakelijk.servicesTitle1')}<br />
                    <span className="zk-green-text">{t('zakelijk.servicesTitle2')}</span>
                  </h2>
                </div>

                <div className="zk-services-mobile-img-wrap">
                  <img src={section4MobileImg} alt={t('zakelijk.servicesImgAlt')} className="zk-services-mobile-img" />
                </div>
              </div>

              <div className="zk-services-header-bottom">
                <p className="zk-services-sub" style={servicesHeaderStyle(0.24)}>{t('zakelijk.servicesSub')}</p>
                <div className="zk-org-pills" style={servicesHeaderStyle(0.26)}>
                  {orgPills.map((pill, i) => (
                    <Pill key={i} className="section-pill">{pill}</Pill>
                  ))}
                </div>
              </div>

              <div className={`zk-services-grid${servicesGridRevealed ? ' in-view' : ''}`} ref={servicesGridRef}>
                {services.map((s, i) => {
                  const Ic = SERVICE_ICONS[i] || Icon.Wrench
                  return (
                    <div key={i} className="zk-service-card" style={serviceCardStyle(i)}>
                      <div className="zk-service-icon-tile">
                        <Ic width="26" height="26" />
                      </div>
                      <div className="zk-service-content">
                        <h3 className="zk-service-title">{s.title}</h3>
                        <p className="zk-service-desc">{s.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Section 5 — Bescherming & Preventie */}
      <section className="zk-sec5">
        {/* DESKTOP VIEW */}
        <div className="zk-sec5-desktop-wrapper">
          <div className="zk-sec5-desktop-container" ref={sec5ContainerRef}>
            <img src={sec5DesktopImg} alt={t('zakelijk.sec5ImgAlt')} className="zk-sec5-desktop-bg" ref={sec5BgRef} />
            <div className="zk-sec5-vignette" ref={sec5VignetteRef} />
            <div className="container zk-sec5-desktop-content-wrap">
              <div className="zk-sec5-content">
                <span className="zk-sec5-eyebrow">{t('zakelijk.sec5Eyebrow')}</span>
                <h2 className="zk-sec5-h2">
                  {t('zakelijk.sec5Title1')}<br />
                  <span className="zk-green-text">{t('zakelijk.sec5TitleAccent')}</span> {t('zakelijk.sec5Title2')}
                </h2>
                <p className="zk-sec5-sub">
                  {t('zakelijk.sec5Sub')}
                </p>
                <ul className={`zk-sec5-list${sec5BulletsVisible ? ' zk-sec5-revealed' : ''}`} ref={sec5ListRef}>
                  {preventBullets.map((bullet, i) => (
                    <li key={i} className="zk-sec5-item" style={{ transitionDelay: `${i * 70}ms` }}>
                      <div className="zk-sec5-check-circle">
                        <Icon.Check width="13" height="13" />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="zk-sec5-mobile-wrapper">
          <div className="zk-sec5-mobile-container">
            <img src={sec5MobileImg} alt={t('zakelijk.sec5ImgMobileAlt')} className="zk-sec5-mobile-bg-img" />

            {/* Mobile Top Text Header */}
            <div className="zk-sec5-mobile-header">
              <span className="zk-sec5-eyebrow">{t('zakelijk.sec5Eyebrow')}</span>
              <h2 className="zk-sec5-mobile-h2">
                {t('zakelijk.sec5Title1')}<br />
                <span className="zk-green-text">{t('zakelijk.sec5TitleAccent')}</span> {t('zakelijk.sec5Title2')}
              </h2>
              <p className="zk-sec5-mobile-sub">
                {t('zakelijk.sec5Sub')}
              </p>
            </div>

            {/* Glassmorphism Floating Card Overlay */}
            <div className="zk-sec5-mobile-card-wrap">
              <div
                ref={sec5GlassCardRef}
                className={`zk-sec5-glass-card${sec5GlassCardVisible ? ' zk-sec5-glass-revealed' : ''}`}
              >
                <ul className="zk-sec5-glass-list">
                  {preventBullets.map((bullet, i) => (
                    <li key={i} className="zk-sec5-glass-item">
                      <div className="zk-sec5-glass-check-circle">
                        <Icon.Check width="13" height="13" />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Bottom contact section */}
      <section className="zk-contact-section">
        <div className="container">
          <div className="zk-contact-inner">
            <div className="zk-contact-left">
              <div className="zk-contact-card">
                <span className="zk-eyebrow">{t('zakelijk.contactEyebrow')}</span>
                <h2 className="zk-contact-title">{t('zakelijk.contactTitle')}</h2>
                <p className="zk-contact-sub">{t('zakelijk.contactSub')}</p>
                <ul className="zk-contact-list">
                  <li>
                    <span className="zk-contact-list-check"><Icon.Check width="13" height="13" /></span>
                    {t('zakelijk.contactBullet1')}
                  </li>
                  <li>
                    <span className="zk-contact-list-check"><Icon.Check width="13" height="13" /></span>
                    {t('zakelijk.contactBullet2')}
                  </li>
                  <li>
                    <span className="zk-contact-list-check"><Icon.Check width="13" height="13" /></span>
                    {t('zakelijk.contactBullet3')}
                  </li>
                  <li>
                    <span className="zk-contact-list-check"><Icon.Check width="13" height="13" /></span>
                    {t('zakelijk.contactBullet4')}
                  </li>
                </ul>
                <div className="zk-contact-ctas">
                  <a href="mailto:zakelijk@4mobiles.nl" className="zk-btn zk-btn-primary zk-contact-email-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {t('zakelijk.contactEmailCta')}
                  </a>
                  <div className="zk-contact-ctas-secondary">
                    <a href="https://wa.me/31174237022" target="_blank" rel="noopener noreferrer" className="zk-btn zk-btn-wa">
                      <Icon.WhatsApp width="16" height="16" /> {t('zakelijk.whatsappUs')}
                    </a>
                    <a href="tel:+31174237022" className="zk-btn zk-btn-outline">
                      <Icon.Phone width="16" height="16" /> {t('zakelijk.contactPhone')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="zk-contact-faq">
              <span className="zk-eyebrow">{t('zakelijk.faqEyebrow')}</span>
              <h3 className="zk-contact-faq-title">{t('zakelijk.faqTitle')}</h3>
              <div className="zk-faq-list">
                {businessFaqs.map((f, i) => (
                  <div key={i} className={`zk-faq-item${openFaq === i ? ' zk-faq-open' : ''}`}>
                    <button className="zk-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                      <span>{f.q}</span>
                      <span className="zk-faq-icon"><Icon.Plus width="16" height="16" /></span>
                    </button>
                    <div className="zk-faq-a" hidden={openFaq !== i}>{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO content section */}
      <section className="zk-seo-section">
        <div className="container">
          <h2 className="zk-seo-title">{t('zakelijk.seoTitle')}</h2>
          {seoParagraphs.map((p, i) => (
            <p key={i} className="zk-seo-text">{p}</p>
          ))}
        </div>
      </section>
    </Layout>
  )
}

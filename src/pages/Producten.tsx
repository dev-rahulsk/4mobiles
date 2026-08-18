import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'
import { Pill, MobileHero, GlassBadge, CtaButton, DesktopHero } from '../components/global'
import { Seo } from '../lib/seo/Seo'
import { JsonLd } from '../lib/seo/JsonLd'
import { breadcrumbSchema, faqPageSchema } from '../lib/seo/schema'

import storeMobileHeroImg from '../assets/product_new_mobile_hero.png'
import storeDesktopHeroImg from '../assets/new_desktop_hero.png'
import desktopNewPhoneApprovedImg from '../assets/ChatGPT_Image_9_jul_2026%2C_19_57_39.png'
import storeInteriorWideImg from '../assets/ChatGPT_Image_30_jul_2026_20_05_04.png'
import newDeviceLayer1Img from '../assets/layer1.png'
import newDeviceLeftHandImg from '../assets/lefthand_dummyfile.png'
import cases2Img from '../assets/cases2.png'
import screenprotectors2Img from '../assets/screenprotectors2.png'
import chargers2Img from '../assets/chargers2.png'
import carholders2Img from '../assets/carholders2.png'
import catsMoreBgImg from '../assets/background.png'

const PRODUCTEN_HERO_GRADIENT = 'linear-gradient(180deg, #060804 0%, #060804 32%, #5e9020 44%, #3d6414 64%, #12190a 84%, #040503 100%)'

const BRANDS = ['XS5/VE', 'Spigen', 'OtterBox', 'Belkin', 'Samsung', 'Apple', 'Xiaomi', 'Hama']

const CAT_IMAGE_MAP: Record<string, string> = {
  cases: cases2Img,
  screenprotectors: screenprotectors2Img,
  chargers: chargers2Img,
  carholders: carholders2Img,
}

const CAT_PILL_ICONS = [
  Icon.Phone, Icon.ShieldCheck, Icon.Zap, Icon.Cable,
  Icon.Battery, Icon.Lanyard, Icon.Wand, Icon.Park,
  Icon.Wireless, Icon.Pin, Icon.Target, Icon.Headset,
  Icon.Tablet, Icon.Watch,
]

const USP_ICONS = [Icon.Truck, Icon.Chat, Icon.Cart, Icon.Check]
const CAT_HREF = '/contact'

type CategoryItem = { id: string; title: string; price?: string; bullets: string[]; cta: string }

const CITY_PILLS = [
  'Naaldwijk', 'Wateringen', 'De Lier', 'Monster', "'s-Gravenzande",
  'Maasdijk', 'Poeldijk', 'Kwintsheul', 'Den Haag', 'Delft',
]

function ParallaxHero() {
  const { t } = useTranslation()
  const uspPillars = t('producten.uspPillars', { returnObjects: true }) as { title: string; sub: string }[]

  return (
    <DesktopHero
      eyebrow={t('producten.heroEyebrow')}
      title={
        <>
          {t('producten.heroTitleMobileLine1')} {t('producten.heroTitleMobileLine2Pre')}
          <span className="accent">{t('producten.heroTitleMobileAccent')}</span>
          {t('producten.heroTitleMobileLine2Post')} {t('producten.heroTitleMobileLine3')}
        </>
      }
      description={t('producten.heroSubMobile')}
      cta={{ label: t('producten.heroMobileCta'), href: '/contact' }}
      image={{ src: storeDesktopHeroImg, alt: t('producten.heroBgAlt') }}
      imagePosition="center 38%"
      badges={[
        { icon: Icon.Google, value: '4.8/5', title: t('producten.heroTrustGoogleLabel') },
        { icon: Icon.Cart, value: t('producten.heroTrustCount'), title: t('producten.heroTrustCountSub') },
        { icon: Icon.Truck, value: uspPillars[0]?.title, title: uspPillars[0]?.sub },
        { icon: Icon.Chat, value: uspPillars[1]?.title, title: uspPillars[1]?.sub },
      ]}
    />
  )
}

function BrandsSlider() {
  return (
    <div className="pd-brands-marquee-wrap">
      <div className="pd-brands-marquee-track">
        {BRANDS.concat(BRANDS).concat(BRANDS).map((b, i) => (
          <span key={`brand-${b}-${i}`} className="pd-brand-chip">{b}</span>
        ))}
      </div>
    </div>
  )
}

function MobileNewPhoneSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLImageElement>(null)
  const handRef = useRef<HTMLImageElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const smoothstep = (edge0: number, edge1: number, x: number) => {
      const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
      return t * t * (3 - 2 * t)
    }

    const HAND_BASE_SCALE = 0.94
    const IMAGE_SHIFT_X = -24
    const HAND_BASE_X = -48 + IMAGE_SHIFT_X
    const HAND_BASE_Y = 34
    const HAND_ZOOM = 0.012

    const cur = { unbox: 0, lift: 0, reveal: 0 }
    let rafId = 0
    let active = false

    const getTargets = () => {
      if (!sectionRef.current) return { unbox: 0, lift: 0, reveal: 0 }
      const rect = sectionRef.current.getBoundingClientRect()
      const stickyEl = sectionRef.current.querySelector<HTMLElement>('.pd-mobile-newphone-sticky')
      const stickyPx = stickyEl ? stickyEl.offsetHeight : window.innerHeight
      const scrollableDistance = rect.height - stickyPx
      if (scrollableDistance <= 0) return { unbox: 0, lift: 0, reveal: 0 }
      const p = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)

      return {
        // checklist: animation must start at ~40% of the section being visible
        // unbox: smoothstep(0.32, 0.72, p),
        // lift: smoothstep(0.32, 1, p),
        // reveal: smoothstep(0.66, 1, p),
        unbox: smoothstep(0.4, 0.7, p),
        lift: smoothstep(0.4, 1, p),
        reveal: smoothstep(0.7, 1, p),
      }
    }

    const render = () => {
      if (!bgRef.current || !handRef.current || !cardRef.current) return
      const t = getTargets()
      cur.unbox += (t.unbox - cur.unbox) * 0.14
      cur.lift += (t.lift - cur.lift) * 0.1
      cur.reveal += (t.reveal - cur.reveal) * 0.16

      const bgScale = 1 + cur.lift * 0.03
      const handX = HAND_BASE_X - cur.unbox * 40
      const handY = HAND_BASE_Y + cur.unbox * 7
      const handRotate = -cur.unbox * 2.2
      const handScale = HAND_BASE_SCALE * (1 + cur.lift * HAND_ZOOM)
      const cardTranslateY = (1 - cur.reveal) * 56
      const cardScale = 0.96 + cur.reveal * 0.04

      bgRef.current.style.transform = `scale(${bgScale})`
      // handRef.current.style.transform = `translate3d(${handX}px, ${handY}px, 0) scale(${HAND_BASE_SCALE}) rotate(${handRotate}deg)`
      handRef.current.style.transform = `translate3d(${handX}px, ${handY}px, 0) scale(${handScale}) rotate(${handRotate}deg)`
      cardRef.current.style.transform = `translate3d(0, ${cardTranslateY}px, 0) scale(${cardScale})`
      cardRef.current.style.opacity = `${cur.reveal}`

      const settled =
        Math.abs(t.unbox - cur.unbox) < 0.001 &&
        Math.abs(t.lift - cur.lift) < 0.001 &&
        Math.abs(t.reveal - cur.reveal) < 0.001

      if (active || !settled) {
        rafId = requestAnimationFrame(render)
      } else {
        rafId = 0
      }
    }

    const kick = () => {
      if (rafId) return
      rafId = requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        active = entries[0]?.isIntersecting ?? false
        if (active) kick()
      },
      { rootMargin: '20% 0px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

    window.addEventListener('scroll', kick, { passive: true })
    kick()

    return () => {
      window.removeEventListener('scroll', kick)
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={sectionRef} className="pd-mobile-newphone-section">
      <div className="pd-mobile-newphone-sticky">
        <img
          ref={bgRef}
          src={newDeviceLayer1Img}
          alt={t('producten.newPhoneAlt')}
          className="pd-mobile-newphone-bg"
        />
        <img
          ref={handRef}
          src={newDeviceLeftHandImg}
          alt=""
          aria-hidden="true"
          className="pd-mobile-newphone-hand"
        />
        <div className="pd-mobile-newphone-scrim" />
        <div className="pd-mobile-newphone-hero-text">
          <span className="pd-eyebrow">{t('producten.newDeviceEyebrow')}</span>
          <h2 className="pd-upsell-title">{t('producten.newDeviceTitle')}</h2>
        </div>
        <div ref={cardRef} className="pd-mobile-newphone-glass-card-lite">
          <p className="pd-mobile-newphone-card-lead">{t('producten.newDeviceCardLead')}</p>
          <p>{t('producten.newDeviceCardBody')}</p>
          <ul className="pd-mobile-newphone-card-bullets">
            <li><Icon.Check width="15" height="15" /> {t('producten.newDeviceBullet1')}</li>
            <li><Icon.Check width="15" height="15" /> {t('producten.newDeviceBullet2')}</li>
          </ul>
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
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const smoothstep = (edge0: number, edge1: number, x: number) => {
      const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
      return t * t * (3 - 2 * t)
    }

    const cur = { zoom: 0, reveal: 0 }
    let rafId = 0
    let active = false

    const getTargets = () => {
      if (!sectionRef.current) return { zoom: 0, reveal: 0 }
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return { zoom: 0, reveal: 0 }
      const p = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)
      return { zoom: p, reveal: smoothstep(0, 0.55, p) }
    }

    const render = () => {
      if (!bgRef.current || !textCardRef.current) return
      const target = getTargets()
      cur.zoom += (target.zoom - cur.zoom) * 0.1
      cur.reveal += (target.reveal - cur.reveal) * 0.14

      const scale = 1 + cur.zoom * 0.04
      const translateY = (1 - cur.reveal) * 48

      bgRef.current.style.transform = `scale(${scale})`
      textCardRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`
      textCardRef.current.style.opacity = `${cur.reveal}`

      const settled =
        Math.abs(target.zoom - cur.zoom) < 0.001 &&
        Math.abs(target.reveal - cur.reveal) < 0.001

      if (active || !settled) {
        rafId = requestAnimationFrame(render)
      } else {
        rafId = 0
      }
    }

    const kick = () => {
      if (rafId) return
      rafId = requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        active = entries[0]?.isIntersecting ?? false
        if (active) kick()
      },
      { rootMargin: '20% 0px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

    window.addEventListener('scroll', kick, { passive: true })
    kick()

    return () => {
      window.removeEventListener('scroll', kick)
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
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
              <a href="https://wa.me/31174237022" target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-wa">
                <Icon.WhatsApp width="16" height="16" /> {t('producten.upsellCta2')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryCardContent({ c }: { c: CategoryItem }) {
  return (
    <>
      {c.price && <p className="cat-card-price">{c.price}</p>}
      <ul className="cat-card-bullets">
        {c.bullets.map(b => (
          <li key={b}><Icon.Check width="14" height="14" /> {b}</li>
        ))}
      </ul>
      <a href={CAT_HREF} className="cat-card-link">{c.cta}</a>
    </>
  )
}

function CategoryMobileShowcase({ categories }: { categories: CategoryItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mediaRefs = useRef<(HTMLImageElement | null)[]>([])
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const N = categories.length
    const lastIndex = Math.max(N - 1, 1)
    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)
    const smoothstep = (e0: number, e1: number, x: number) => {
      const t = clamp01((x - e0) / (e1 - e0))
      return t * t * (3 - 2 * t)
    }
    const zone = 0.55
    const cur = categories.map((_, i) => ({ vis: i === 0 ? 1 : 0 }))
    let rafId = 0
    let active = false

    const getTargets = () => {
      if (!sectionRef.current) return { activeIndex: 0, localT: 0, rawIndex: 0 }
      const rect = sectionRef.current.getBoundingClientRect()
      const stickyEl = sectionRef.current.querySelector<HTMLElement>('.cat-showcase-sticky')
      const stickyPx = stickyEl ? stickyEl.offsetHeight : window.innerHeight
      const scrollableDistance = rect.height - stickyPx
      if (scrollableDistance <= 0) return { activeIndex: 0, localT: 0, rawIndex: 0 }
      const p = clamp01(-rect.top / scrollableDistance)
      const rawIndex = p * lastIndex
      const activeIndex = Math.min(Math.floor(rawIndex), Math.max(N - 2, 0))
      const t = N > 1 ? rawIndex - activeIndex : 0
      const localT = t > 1 - zone ? smoothstep(1 - zone, 1, t) : 0
      return { activeIndex, localT, rawIndex }
    }

    const render = () => {
      rafId = 0
      const { activeIndex, localT, rawIndex } = getTargets()
      let settled = true

      for (let i = 0; i < N; i++) {
        const targetVis = i === activeIndex ? 1 - localT : i === activeIndex + 1 ? localT : 0
        const dir = i <= activeIndex ? -1 : 1

        const c = cur[i]
        c.vis += (targetVis - c.vis) * 0.1
        if (Math.abs(targetVis - c.vis) > 0.001) settled = false
        const hidden = 1 - c.vis

        const img = mediaRefs.current[i]
        if (img) {
          const crossfadeDrift = hidden * 10 * dir
          const parallax = Math.max(-1, Math.min(1, rawIndex - i)) * 12
          img.style.opacity = `${c.vis}`
          img.style.transform = `translate3d(0, ${crossfadeDrift + parallax}px, 0) scale(${0.985 + c.vis * 0.015})`
          img.style.zIndex = c.vis > 0.02 ? '2' : '1'
        }

        const title = titleRefs.current[i]
        if (title) {
          title.style.opacity = `${c.vis}`
          const ty = hidden * (dir < 0 ? 10 : 16) * dir
          title.style.transform = `translate3d(0, ${ty}px, 0)`
        }

        const content = contentRefs.current[i]
        if (content) {
          content.style.opacity = `${c.vis}`
          const ty = hidden * (dir < 0 ? 10 : 14) * dir
          content.style.transform = `translate3d(0, ${ty}px, 0)`
          content.style.pointerEvents = c.vis > 0.5 ? 'auto' : 'none'
        }

        const dot = dotRefs.current[i]
        if (dot) dot.classList.toggle('is-active', c.vis > 0.5)
      }

      if (active || !settled) {
        rafId = requestAnimationFrame(render)
      }
    }

    const kick = () => {
      if (rafId) return
      rafId = requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver((entries) => {
      active = entries[0]?.isIntersecting ?? false
      if (active) kick()
    }, { rootMargin: '15% 0px' })
    if (sectionRef.current) observer.observe(sectionRef.current)

    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    kick()

    return () => {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [categories, reduceMotion])

  if (reduceMotion) {
    return (
      <div className="cat-mobile-only cat-showcase-static">
        {categories.map((c) => (
          <div key={c.id} className="cat-showcase-static-item">
            <div className="cat-showcase-static-media">
              <img src={CAT_IMAGE_MAP[c.id]} alt={c.title} className="cat-showcase-img" />
              <div className="cat-showcase-scrim" />
              <h3 className="cat-showcase-title-el cat-showcase-title-static">{c.title}</h3>
            </div>
            <div className="cat-showcase-card cat-showcase-card-static">
              <div className="cat-showcase-card-content" style={{ opacity: 1 }}>
                <CategoryCardContent c={c} />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="cat-mobile-only cat-showcase">
      <div className="cat-showcase-sticky">
        {categories.map((c, i) => (
          <img
            key={c.id}
            ref={(el) => { mediaRefs.current[i] = el }}
            src={CAT_IMAGE_MAP[c.id]}
            alt={c.title}
            className="cat-showcase-img"
          />
        ))}
        <div className="cat-showcase-scrim" />

        <div className="cat-showcase-inner">
          <div className="cat-showcase-title">
            {categories.map((c, i) => (
              <h3
                key={c.id}
                ref={(el) => { titleRefs.current[i] = el }}
                className="cat-showcase-title-el"
              >
                {c.title}
              </h3>
            ))}
          </div>

          <div className="cat-showcase-card">
            {categories.map((c, i) => (
              <div
                key={c.id}
                ref={(el) => { contentRefs.current[i] = el }}
                className="cat-showcase-card-content"
              >
                <CategoryCardContent c={c} />
              </div>
            ))}
          </div>
        </div>

        <div className="cat-showcase-dots">
          {categories.map((c, i) => (
            <span key={c.id} ref={(el) => { dotRefs.current[i] = el }} className="cat-showcase-dot" />
          ))}
        </div>
      </div>

    </div>
  )
}

function CategoryGrid({ categories }: { categories: CategoryItem[] }) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view')
        })
      },
      { threshold: 0.2 }
    )
    if (gridRef.current) observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="cat-grid-wrap">
      <div className="cat-grid" ref={gridRef}>
        {categories.map((c, i) => (
          <article key={c.id} className="cat-grid-card" style={{ transitionDelay: `${i * 160}ms` }}>
            <div className="cat-grid-img-box">
              <img src={CAT_IMAGE_MAP[c.id]} alt={c.title} className="cat-grid-img" />
              <div className="cat-grid-img-scrim" />
              <h3 className="cat-grid-title">{c.title}</h3>
            </div>
            <div className="cat-grid-glass">
              <CategoryCardContent c={c} />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function CategoryMoreSection() {
  const { t } = useTranslation()
  const pills = t('producten.catsMorePills', { returnObjects: true }) as string[]

  return (
    <section className="cat-more">
      <div className="container pd-mobile-only">
        <span className="pd-eyebrow">{t('producten.catsMoreEyebrow')}</span>
        <h2 className="cat-more-title">{t('producten.catsMoreTitle')}</h2>
        <p className="cat-more-body">{t('producten.catsMoreBody')}</p>
        <div className="cat-more-pills-mobile">
          {pills.map((p, i) => (
            <Pill key={p} className="section-pill" selected={i === 0}>{p}</Pill>
          ))}
        </div>
      </div>

      <div className="pd-desktop-only cat-more-desktop">
        <div className="container cat-more-desktop-inner">
          <div className="cat-more-desktop-content">
            <span className="pd-eyebrow">{t('producten.catsMoreEyebrow')}</span>
            <h2 className="cat-more-title">{t('producten.catsMoreTitle')}</h2>
            <p className="cat-more-body">{t('producten.catsMoreBody')}</p>
            <div className="cat-more-pills-desktop">
              {pills.map((p, i) => {
                const Ic = CAT_PILL_ICONS[i] ?? Icon.Accessory
                return (
                  <span key={p} className={`section-pill cat-more-pill-desktop${i === 0 ? ' is-accent' : ''}`}>
                    <Ic width="16" height="16" /> {p}
                  </span>
                )
              })}
            </div>
          </div>
          <img src={catsMoreBgImg} alt="" aria-hidden="true" className="cat-more-desktop-bg" />
        </div>
      </div>
    </section>
  )
}

export function Producten() {
  const { t } = useTranslation()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [addressCopied, setAddressCopied] = useState(false)
  const storeImageRef = useRef<HTMLDivElement>(null)

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

    if (storeImageRef.current) {
      observer.observe(storeImageRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Layout>
      <Seo title={t('seo.producten.title')} description={t('seo.producten.description')} path="/producten" />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: t('nav.products'), path: '/producten' }])} />
      <JsonLd data={faqPageSchema(faqItems)} />
      <div className="pd-desktop-only">
        <ParallaxHero />
      </div>

      <div className="pd-mobile-only">
        <MobileHero
          className="pd-mobile-hero"
          tone="light"
          image={{ src: storeMobileHeroImg, alt: t('producten.heroBgAlt') }}
          imagePositionX="0%"
          imagePositionY="0%"
          imageZoom={1.45}
          bgGradient={PRODUCTEN_HERO_GRADIENT}
          eyebrow={t('producten.heroEyebrow')}
          title={
            <>
              {t('producten.heroTitleMobileLine1')}<br />
              {t('producten.heroTitleMobileLine2Pre')}
              <span style={{ color: 'var(--accent)' }}>{t('producten.heroTitleMobileAccent')}</span>
              {t('producten.heroTitleMobileLine2Post')}<br />
              {t('producten.heroTitleMobileLine3')}
            </>
          }
          subtext={t('producten.heroSubMobile')}
          cta={
            <CtaButton variant="primary" href="/contact">
              <Icon.Pin width="18" height="18" />
              <span>{t('producten.heroMobileCta')}</span>
              <Icon.ArrowRight width="16" height="16" />
            </CtaButton>
          }
          badges={[
            <GlassBadge
              key="google"
              icon={Icon.Google}
              value="4.8/5"
              title={t('producten.heroTrustGoogleLabel')}
              text="★★★★★"
            />,
            <GlassBadge
              key="stock"
              icon={Icon.Cart}
              value={t('producten.heroTrustCount')}
              title={t('producten.heroTrustCountSub')}
            />,
          ]}
        />
      </div>

      <section className="pd-mobile-only pd-brands-section">
        <div className="container">
          <h3 className="pd-brands-heading">{t('producten.brandsLabel')}</h3>
          <BrandsSlider />
        </div>
      </section>

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
        </div>
      </section>

      <section className="pd-cats" id="categorieen">
        <div className="container">
          <span className="pd-eyebrow">{t('producten.catsEyebrow')}</span>
          <h2 className="pd-cats-title">{t('producten.catsTitle')}</h2>
        </div>

        <CategoryMobileShowcase categories={categories} />
        <div className="container cat-grid-container">
          <CategoryGrid categories={categories} />
        </div>
      </section>

      <CategoryMoreSection />

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
              <Pill key={c} className="section-pill" href={`/regio/${c.toLowerCase().replace(/['\s]/g, '-')}`}>
                {c}
              </Pill>
            ))}
          </div>

          <div className="faq-list pd-store-faq-list">
            {mobileFaqItems.map((item, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' faq-open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-icon"><Icon.Plus width="18" height="18" /></span>
                </button>
                <div className="faq-a" hidden={openFaq !== i}>{item.a}</div>
              </div>
            ))}
          </div>

          <div className="pd-store-promo-card" ref={storeImageRef}>
            <img src={storeInteriorWideImg} alt={t('producten.storeInteriorAlt')} className="pd-store-promo-bg" />
            <div className="pd-store-promo-overlay" />
            <div className="pd-store-promo-content">
              <h3>{t('producten.storeImageHeadingMobile')}</h3>
              <ul>
                <li><Icon.Check width="14" height="14" /> {t('producten.promoBullet1')}</li>
                <li><Icon.Check width="14" height="14" /> {t('producten.promoBullet2')}</li>
                <li><Icon.Check width="14" height="14" /> {t('producten.promoBullet3')}</li>
                <li><Icon.Check width="14" height="14" /> {t('producten.promoBullet4')}</li>
              </ul>
            </div>
          </div>

          <div className="ct-map-card pd-store-visit-map-card">
            <div className="ct-card-header">
              <Icon.Pin width="20" height="20" />
              <h3>{t('producten.storeVisitTitle')}</h3>
            </div>
            <div className="ct-address-row">
              <p className="ct-address">Molenstraat 2<br />2671 EX Naaldwijk</p>
              <button className="ct-copy-btn" onClick={copyAddress}>
                {addressCopied ? <Icon.Check width="16" height="16" /> : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
                {addressCopied ? '✓' : t('producten.storeVisitCopyBtn')}
              </button>
            </div>

            <div className="ct-map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2458.0!2d4.2!3d51.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b1!2sMolenstraat%202%2C%20Naaldwijk!5e0!3m2!1snl!2snl!4v1"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('producten.storeVisitTitle')}
              />
            </div>

            <div className="ct-map-ctas">
              <a
                href="https://maps.google.com/?q=Molenstraat+2+2671+EX+Naaldwijk"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-btn-primary"
              >
                <Icon.MapLink width="18" height="18" /> {t('producten.storeVisitRoute')}
              </a>
              <a href="https://wa.me/31174237022" target="_blank" rel="noopener noreferrer" className="ct-btn-dark">
                <Icon.WhatsApp width="18" height="18" /> {t('producten.storeVisitWhatsapp')}
              </a>
            </div>
            <p className="ct-map-note">{t('producten.storeVisitNoAppt')}</p>
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
                <a key={c} href={`/regio/${c.toLowerCase().replace(/['\s]/g, '-')}`} className="section-pill pd-city-pill">
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
                <a href="https://wa.me/31174237022" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
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
                  <div className="faq-a" hidden={openFaq !== i}>{item.a}</div>
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
                <a href="https://wa.me/31174237022" target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-dark">
                  <Icon.WhatsApp width="16" height="16" /> {t('producten.storeVisitWhatsapp')}
                </a>
              </div>
              <p className="pd-store-visit-noappt">{t('producten.storeVisitNoAppt')}</p>
            </div>
          </div>
        </section>
      </div>

    </Layout>
  )
}

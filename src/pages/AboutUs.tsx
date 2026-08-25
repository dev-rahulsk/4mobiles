import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'
import { MobileHero, GlassBadge, DesktopHero } from '../components/global'
import { StickyBookCTA } from '../components/StickyBookCTA'
import { StoreVisitSection } from '../components/StoreVisitSection'
import aboutMobileHeroImg from '../assets/ChatGPT_Image_10_jul_2026_11_20_55.webp'
import aboutDesktopHeroImg from '../assets/new_desktop_hero.webp'
import { Seo } from '../lib/seo/Seo'
import { JsonLd } from '../lib/seo/JsonLd'
import { breadcrumbSchema } from '../lib/seo/schema'

const ABOUTUS_HERO_GRADIENT = 'linear-gradient(180deg, #050804 0%, #050804 36%, #2c6b18 44%, #1a3311 62%, #0c1409 82%, #030503 100%)'

// High quality studio portrait photos for the 4 team members
const TEAM_PHOTOS = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', // Riza
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80', // Jeroen
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', // Daniel
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80', // Erkan
]

const SERVICE_ICONS = [Icon.Chat, Icon.Phone, Icon.ShieldCheck, Icon.Wrench]

interface TeamMember {
  name: string
  role: string
  specialisms: string[]
}

interface ServiceItem {
  title: string
}

function smoothStep(p: number, start: number, end: number) {
  if (p <= start) return 0
  if (p >= end) return 1
  const t = (p - start) / (end - start)
  return t * t * (3 - 2 * t)
}

export function AboutUs() {
  const { t } = useTranslation()
  const teamMembers = t('aboutUs.team.members', { returnObjects: true }) as TeamMember[]
  const serviceItems = t('aboutUs.more.items', { returnObjects: true }) as ServiceItem[]

  // State & Refs for 60fps/120fps smooth lerped storytelling scroll (Sections 02 & 03)
  const pinWrapperRef = useRef<HTMLDivElement>(null)
  const sec04Ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  const targetProgress = useRef(0)
  const animFrameId = useRef<number | null>(null)

  // Mobile active team card state for tap interactions
  const [activeTeamIdx, setActiveTeamIdx] = useState<number | null>(null)
  const [teamParallaxY, setTeamParallaxY] = useState(0)

  // Section 05 entrance reveal (reuses Section 02's fade-up behaviour/timing over the SINDS 2011 watermark)
  const sec05Ref = useRef<HTMLElement>(null)
  const [sec05InView, setSec05InView] = useState(false)

  useEffect(() => {
    const el = sec05Ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSec05InView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Subtle parallax effect for Section 04 team photos during scroll
  useEffect(() => {
    const handleTeamParallax = () => {
      if (!sec04Ref.current) return
      const rect = sec04Ref.current.getBoundingClientRect()
      const winH = window.innerHeight
      if (rect.top < winH && rect.bottom > 0) {
        const centerRelative = (rect.top + rect.height / 2 - winH / 2) / winH
        setTeamParallaxY(centerRelative * -20)
      }
    }

    window.addEventListener('scroll', handleTeamParallax, { passive: true })
    handleTeamParallax()
    return () => window.removeEventListener('scroll', handleTeamParallax)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!pinWrapperRef.current) return
      const rect = pinWrapperRef.current.getBoundingClientRect()
      const totalScrollable = pinWrapperRef.current.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return

      const scrolled = -rect.top
      const p = Math.min(Math.max(scrolled / totalScrollable, 0), 1)
      targetProgress.current = p
    }

    let currentP = 0
    const updateLoop = () => {
      const diff = targetProgress.current - currentP
      if (Math.abs(diff) > 0.0001) {
        currentP += diff * 0.16
        setProgress(currentP)
      } else if (currentP !== targetProgress.current) {
        currentP = targetProgress.current
        setProgress(currentP)
      }
      animFrameId.current = requestAnimationFrame(updateLoop)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    animFrameId.current = requestAnimationFrame(updateLoop)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [])

  // Section 02 Step Animations
  const sec02Out = smoothStep(progress, 0.38, 0.48)
  const eyebrowFactor = smoothStep(progress, 0.0, 0.12)
  const line1Factor = smoothStep(progress, 0.08, 0.20)
  const line2Factor = smoothStep(progress, 0.18, 0.30)
  const subFactor = smoothStep(progress, 0.28, 0.38)

  // Section 03 Step Animations
  const sec03In = smoothStep(progress, 0.46, 0.54)
  const sec03EyebrowFactor = smoothStep(progress, 0.48, 0.58)
  const quoteFactor = smoothStep(progress, 0.54, 0.68)
  const bodyFactor = smoothStep(progress, 0.64, 0.82)

  return (
    <Layout>
      <Seo title={t('seo.aboutUs.title')} description={t('seo.aboutUs.description')} path="/over-ons" />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: t('nav.about'), path: '/over-ons' }])} />

      <div className="aou-page-redesign">

        {/* ─── SECTION 01: HERO ───────────────────────────────────────────── */}
        <div className="g-desktop-only">
          <DesktopHero
            eyebrow={t('aboutUs.hero.eyebrow')}
            title={
              <>
                {t('aboutUs.hero.titleLine1')}{' '}
                {t('aboutUs.hero.titleLine2Pre')}
                <span className="accent">{t('aboutUs.hero.titleAccent')}</span>
                {t('aboutUs.hero.titleLine2Post')}
              </>
            }
            description={t('aboutUs.hero.subMobile')}
            cta={{ label: t('aboutUs.hero.cta'), href: '/contact' }}
            image={{ src: aboutDesktopHeroImg, alt: t('aboutUs.hero.imageAlt') }}
            imagePosition="center 38%"
            badges={[
              { icon: Icon.Shield, value: t('aboutUs.hero.badge1Value'), title: t('aboutUs.hero.badge1Label') },
              { icon: Icon.Google, value: t('aboutUs.hero.badge2Value'), title: t('aboutUs.hero.badge2Label'), rating: 5 },
              { icon: Icon.Wrench, value: t('aboutUs.hero.badge3Value'), title: t('aboutUs.hero.badge3Label') },
              { icon: Icon.ShieldCheck, value: t('aboutUs.hero.badge4Value'), title: t('aboutUs.hero.badge4Label') },
            ]}
          />
        </div>

        <div className="g-mobile-only">
          <MobileHero
            className="au-mobile-hero"
            tone="dark"
            readabilityLayer
            image={{ src: aboutMobileHeroImg, alt: t('aboutUs.hero.imageAlt') }}
            imagePositionY="10%"
            bgGradient={ABOUTUS_HERO_GRADIENT}
            eyebrow={t('aboutUs.hero.eyebrow')}
            title={
              <>
                {t('aboutUs.hero.titleLine1')}<br />
                {t('aboutUs.hero.titleLine2Pre')}
                <span style={{ color: 'var(--accent)' }}>{t('aboutUs.hero.titleAccent')}</span>
                {t('aboutUs.hero.titleLine2Post')}
              </>
            }
            subtext={t('aboutUs.hero.subMobile')}
            badges={[
              <GlassBadge
                key="years"
                icon={Icon.Shield}
                value={t('aboutUs.hero.badge1Value')}
                title={t('aboutUs.hero.badge1Label')}
              />,
              <GlassBadge
                key="google"
                icon={Icon.Star}
                value={t('aboutUs.hero.badge2Value')}
                title={t('aboutUs.hero.badge2Label')}
                text="★★★★★"
              />,
              <GlassBadge
                key="repairs"
                icon={Icon.Wrench}
                value={t('aboutUs.hero.badge3Value')}
                title={t('aboutUs.hero.badge3Label')}
              />,
              <GlassBadge
                key="warranty"
                icon={Icon.ShieldCheck}
                value={t('aboutUs.hero.badge4Value')}
                title={t('aboutUs.hero.badge4Label')}
              />,
            ]}
          />
        </div>


        <div ref={pinWrapperRef} className="aou-storytelling-pin-wrapper" style={{ height: '240vh' }}>
          <div className="aou-storytelling-sticky">
            
            <div className="aou-watermark-bg">
              <span className="aou-watermark-since">SINDS</span>
              <span className="aou-watermark-year">2011</span>
            </div>

            <div className="aou-pinned-content-layer">
              
              <div
                className="aou-sec02-box"
                style={{
                  opacity: 1 - sec02Out,
                  transform: `translateY(${-sec02Out * 40}px)`,
                  pointerEvents: sec02Out >= 0.95 ? 'none' : 'auto',
                  display: sec02Out >= 0.99 ? 'none' : 'block',
                }}
              >
                <div
                  className="aou-eyebrow"
                  style={{
                    opacity: eyebrowFactor,
                    transform: `translateY(${(1 - eyebrowFactor) * 30}px)`,
                  }}
                >
                  <span className="aou-eyebrow-label">{t('aboutUs.way.tag')}</span>
                  <div className="aou-eyebrow-divider" />
                </div>

                <h2 className="aou-sec02-title-wrap">
                  <span
                    className="aou-sec02-line1"
                    style={{
                      opacity: line1Factor,
                      transform: `translateY(${(1 - line1Factor) * 30}px)`,
                    }}
                  >
                    Binnenlopen met<br />
                    een probleem.
                  </span>
                  <span
                    className="aou-sec02-line2"
                    style={{
                      opacity: line2Factor,
                      transform: `translateY(${(1 - line2Factor) * 30}px)`,
                    }}
                  >
                    Weggaan met<br />
                    <span className="accent">duidelijkheid.</span>
                  </span>
                </h2>

                <p
                  className="aou-sec02-sub"
                  style={{
                    opacity: subFactor,
                    transform: `translateY(${(1 - subFactor) * 30}px)`,
                  }}
                >
                  Eerst begrijpen. Dan adviseren. En pas<br className="g-desktop-only" />
                  repareren als het zin heeft.
                </p>
              </div>

              <div
                className="aou-sec03-grid"
                style={{
                  opacity: sec03In,
                  transform: `translateY(${(1 - sec03In) * 40}px)`,
                  pointerEvents: sec03In <= 0.05 ? 'none' : 'auto',
                  display: sec03In <= 0.01 ? 'none' : 'grid',
                }}
              >
                <div className="aou-sec03-quote-col">
                  <div
                    className="aou-eyebrow"
                    style={{
                      opacity: sec03EyebrowFactor,
                      transform: `translateY(${(1 - sec03EyebrowFactor) * 30}px)`,
                    }}
                  >
                    <span className="aou-eyebrow-label">{t('aboutUs.story.tag')}</span>
                    <div className="aou-eyebrow-divider" />
                  </div>

                  <h2
                    className="aou-sec03-quote"
                    style={{
                      opacity: quoteFactor,
                      transform: `translateY(${(1 - quoteFactor) * 30}px)`,
                    }}
                  >
                    <span className="quote-mark">“</span>
                    {t('aboutUs.story.quote')}
                    <span className="quote-mark">”</span>
                  </h2>
                </div>

                <div
                  className="aou-sec03-text-col"
                  style={{
                    opacity: bodyFactor,
                    transform: `translateY(${(1 - bodyFactor) * 30}px)`,
                  }}
                >
                  <p className="aou-sec03-text">{t('aboutUs.story.text1')}</p>
                  <p className="aou-sec03-text">{t('aboutUs.story.text2')}</p>
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* ─── SECTION 04: ONS TEAM ────────────────────────────────────────── */}
        <section ref={sec04Ref} className="aou-team-section-white">
          <div className="container">
            <div className="aou-team-header">
              <div className="aou-team-header-left">
                <div className="aou-team-eyebrow aou-team-eyebrow--stacked">
                  <span className="aou-team-eyebrow-label">{t('aboutUs.team.tag')}</span>
                  <div className="aou-team-eyebrow-divider" />
                </div>

                <h2 className="aou-team-title">
                  De gezichten achter 4Mobiles<span className="accent">.</span>
                </h2>
                <p className="aou-team-sub">{t('aboutUs.team.sub')}</p>
              </div>
            </div>

            <div className="aou-team-grid">
              {teamMembers.map((member, i) => {
                const isActive = activeTeamIdx === i
                return (
                  <div
                    key={member.name}
                    className={`aou-team-card${isActive ? ' is-active' : ''}`}
                  >
                    {/* Top-right Indicator / Toggle Button */}
                    <button
                      type="button"
                      className="aou-team-toggle-btn"
                      aria-label={isActive ? `Verberg details van ${member.name}` : `Toon details van ${member.name}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (typeof window !== 'undefined' && window.innerWidth <= 991) {
                          setActiveTeamIdx(isActive ? null : i)
                        }
                      }}
                    >
                      {isActive ? (
                        <span style={{ fontWeight: 900, fontSize: '16px', lineHeight: 1 }}>−</span>
                      ) : (
                        <Icon.Eye width="16" height="16" />
                      )}
                    </button>

                    {/* Base Photo & Scrim */}
                    <div className="aou-team-photo-wrap">
                      <img
                        src={TEAM_PHOTOS[i] ?? TEAM_PHOTOS[0]}
                        alt={`${member.name} - ${member.role}`}
                        className="aou-team-photo"
                        style={{ '--parallax-y': `${teamParallaxY}px` } as React.CSSProperties}
                        loading="lazy"
                      />
                      <div className="aou-team-photo-gradient" />
                    </div>

                    {/* Default Base Info (Visible when unhovered) */}
                    <div className="aou-team-base-info">
                      <h3 className="aou-team-name">{member.name}</h3>
                      <p className="aou-team-role">{member.role}</p>
                    </div>

                    {/* Translucent Animated Overlay */}
                    <div className="aou-team-overlay">
                      <div className="aou-team-overlay-content">
                        <span className="aou-team-overlay-heading">Specialisaties:</span>
                        <ul className="aou-team-spec-list">
                          {member.specialisms?.map((spec, sIdx) => (
                            <li key={sIdx} className="aou-team-spec-item">
                              <div className="aou-spec-icon-check">
                                <Icon.Check width="10" height="10" />
                              </div>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="aou-team-overlay-bottom">
                        <h3 className="aou-team-name">{member.name}</h3>
                        <p className="aou-team-role">{member.role}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>


        {/* ─── SECTION 05: MEER DAN REPARATIE ─────────────────────────────── */}
        <section ref={sec05Ref} className="aou-more-section">
          {/* Faint watermark "SINDS 2011" background */}
          <div className="aou-watermark-bg aou-watermark-bg--more">
            <span className="aou-watermark-since">SINDS</span>
            <span className="aou-watermark-year">2011</span>
          </div>

          <div className="container">
            <div className={`aou-team-header aou-more-header${sec05InView ? ' is-in-view' : ''}`}>
              <div className="aou-team-header-left">
                <div className="aou-team-eyebrow aou-team-eyebrow--stacked">
                  <span className="aou-team-eyebrow-label">{t('aboutUs.more.tag')}</span>
                  <div className="aou-team-eyebrow-divider" />
                </div>

                <h2 className="aou-team-title">
                  Niet alleen herstellen.<br />
                  Ook <span className="accent">helpen voorkomen.</span>
                </h2>
                <p className="aou-team-sub">{t('aboutUs.more.sub')}</p>
              </div>
            </div>

            {/* 4 Service Cards Grid (Inline icon + title) */}
            <div className="aou-service-cards-grid">
              {serviceItems.map((item, i) => {
                const ServiceIcon = SERVICE_ICONS[i] ?? Icon.Check
                return (
                  <div key={item.title} className="aou-service-card">
                    <ServiceIcon className="aou-service-card-icon-inline" width="28" height="28" />
                    <h3 className="aou-service-card-title">{item.title}</h3>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Full-Width Black Trust Banner Section */}
          <div className="aou-trust-banner-wrapper">
            <div className="container">
              <div className="aou-trust-banner-grid">
                
                <div className="aou-trust-banner-item">
                  <div className="aou-trust-banner-circled-icon">
                    <Icon.Users width="26" height="26" />
                  </div>
                  <div className="aou-trust-banner-text">
                    <h4>{t('aboutUs.more.trust1Title')}</h4>
                    <p>{t('aboutUs.more.trust1Sub')}</p>
                  </div>
                </div>

                <div className="aou-trust-banner-divider" />

                <div className="aou-trust-banner-item">
                  <div className="aou-trust-banner-circled-icon">
                    <Icon.ShieldCheck width="26" height="26" />
                  </div>
                  <div className="aou-trust-banner-text">
                    <h4>{t('aboutUs.more.trust2Title')}</h4>
                    <p>{t('aboutUs.more.trust2Sub')}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* ─── SECTION 06: BEZOEK ONS (STORE VISIT COMPONENT) ─────────────── */}
        <StoreVisitSection />

        {/* ─── CONDITIONAL STICKY CTA: TRIGGERS ONLY AFTER SECTION 04 ─────── */}
        <StickyBookCTA showAfterRef={sec04Ref} />

      </div>
    </Layout>
  )
}

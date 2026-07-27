import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

const FEATURED_INITIALS = ['H', 'S', 'D']
const ALL_INITIALS = ['J', 'L', 'R', 'E', 'T', 'M', 'K', 'A', 'P', 'V']

function Stars({ n }: { n: number }) {
  return (
    <span className="rv2-stars" aria-label={`${n} uit 5 sterren`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon.Star key={i} width="16" height="16" style={{ color: '#fbbc05' }} />
      ))}
    </span>
  )
}

const GoogleLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

export function Reviews() {
  const { t } = useTranslation()
  const [slide, setSlide] = useState(0)
  const [filter, setFilter] = useState(t('reviewsPage.filterAll'))
  const [visibleReviews, setVisibleReviews] = useState(4)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const filterAll = t('reviewsPage.filterAll')
  const filterRepairs = t('reviewsPage.filterRepairs')
  const filterAccessoires = t('reviewsPage.filterAccessoires')
  const FILTERS = [filterAll, filterRepairs, filterAccessoires]

  const featured = t('reviewsPage.featured', { returnObjects: true }) as { name: string; date: string; text: string }[]
  const allReviews = t('reviewsPage.allReviews', { returnObjects: true }) as { name: string; age: string; tag: string; text: string }[]

  const TRUST_ITEMS = [
    {
      icon: Icon.Shield,
      val: "12+",
      label: "jaar ervaring",
      sub: "Meer dan 150.000 klanten geholpen"
    },
    {
      icon: Icon.Wrench,
      val: "10.000+",
      label: "reparaties",
      sub: "Snel en vakkundig uitgevoerd"
    },
    {
      icon: Icon.Clock,
      val: "60",
      label: "minuten klaar",
      sub: "Vaak gerepareerd terwijl je wacht"
    },
    {
      icon: Icon.Star,
      val: "4.8/5",
      label: "Google reviews",
      sub: "Gebaseerd op 487 reviews"
    }
  ]

  const shown = filter === filterAll ? allReviews : allReviews.filter(r => r.tag === filter)
  const visibleShown = shown.slice(0, visibleReviews)

  const setActiveFilter = (nextFilter: string) => {
    setFilter(nextFilter)
    setVisibleReviews(4)
  }

  const prevFeatured = () => setSlide(s => (s === 0 ? featured.length - 1 : s - 1))
  const nextFeatured = () => setSlide(s => (s === featured.length - 1 ? 0 : s + 1))

  const onFeaturedTouchEnd = (clientX: number) => {
    if (touchStart === null) return
    const dx = clientX - touchStart
    if (dx > 36) prevFeatured()
    if (dx < -36) nextFeatured()
    setTouchStart(null)
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="rv2-hero">
        <div className="container">
          <div className="rv2-hero-grid">
            {/* Left Column: Eyebrow, Title, Subtitle, Dual Glass CTAs */}
            <div className="rv2-hero-left">
              <span className="rv2-eyebrow">GOOGLE REVIEWS</span>
              
              <h1 className="rv2-hero-title">
                Wat klanten <br />
                zeggen over <br />
                <span className="rv2-green">4Mobiles</span>
              </h1>
              
              <p className="rv2-hero-sub">
                Echte ervaringen van klanten die hun telefoon, tablet of accessoire bij ons hebben laten repareren of gekocht.
              </p>

              {/* Dual Glass CTAs */}
              <div className="rv2-hero-ctas">
                <a href="/reparatie" className="rv2-btn rv2-btn-primary">
                  <Icon.Calendar width="18" height="18" />
                  <span>Plan je reparatie</span>
                  <Icon.ArrowRight width="16" height="16" className="rv2-arrow-icon" />
                </a>
                <a 
                  href="https://g.page/4mobiles/review" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="rv2-btn rv2-btn-secondary"
                >
                  <Icon.Star width="18" height="18" />
                  <span>Schrijf review</span>
                  <Icon.ArrowRight width="16" height="16" className="rv2-arrow-icon" />
                </a>
              </div>
            </div>

            {/* Right Column: Stacked Glass Cards (Rating + Featured Review) */}
            <div className="rv2-hero-right">
              {/* Google Rating Glass Card */}
              <div className="rv2-glass-card rv2-rating-card-hero">
                <div className="rv2-rating-header">
                  <GoogleLogo size={36} />
                  <div className="rv2-rating-score-box">
                    <span className="rv2-big-score">4.8</span>
                    <span className="rv2-max-score">/5</span>
                  </div>
                </div>
                <div className="rv2-rating-stars-line">
                  <Stars n={5} />
                </div>
                <p className="rv2-rating-subtext">Gebaseerd op 487 reviews</p>
              </div>

              {/* Featured Quote Glass Card */}
              <div className="rv2-glass-card rv2-quote-card-hero">
                <div className="rv2-quote-mark">“</div>
                <p className="rv2-quote-text">
                  "Snel geholpen en mijn scherm was dezelfde dag nog gerepareerd."
                </p>
                <div className="rv2-quote-author">
                  <div className="rv2-quote-avatar">H</div>
                  <div>
                    <strong className="rv2-author-name">Hilde de Jong</strong>
                    <span className="rv2-author-sub">10 april 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Bottom Trust Cards Grid (Matching hero_render_1.png) */}
          <div className="rv2-hero-trust-row">
            {TRUST_ITEMS.map((item, index) => {
              const Ic = item.icon
              return (
                <div key={index} className="rv2-trust-glass-card">
                  <div className="rv2-trust-icon-circle">
                    <Ic width="20" height="20" />
                  </div>
                  <div className="rv2-trust-content">
                    <div className="rv2-trust-headline">
                      <strong className="rv2-trust-val">{item.val}</strong>
                      <span className="rv2-trust-label">{item.label}</span>
                    </div>
                    <p className="rv2-trust-subtext">{item.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Reviews Content */}
      <section className="rv2-body">
        <div className="container">
          <div className="rv2-body-grid">
            {/* Featured Review Carousel */}
            <div className="rv2-featured">
              <div className="rv2-featured-header">
                <h2 className="rv2-section-title">{t('reviewsPage.featuredTitle')}</h2>
              </div>
              <div
                className="rv2-featured-card"
                onPointerDown={e => setTouchStart(e.clientX)}
                onPointerUp={e => onFeaturedTouchEnd(e.clientX)}
                onTouchStart={e => setTouchStart(e.touches[0].clientX)}
                onTouchEnd={e => onFeaturedTouchEnd(e.changedTouches[0].clientX)}
              >
                <div className="rv2-card-head">
                  <Stars n={5} />
                  <GoogleLogo size={22} />
                </div>
                <p className="rv2-card-text">"{featured[slide]?.text}"</p>
                <div className="rv2-card-author">
                  <span className="rv2-avatar">{FEATURED_INITIALS[slide]}</span>
                  <div>
                    <p className="rv2-author-name">{featured[slide]?.name}</p>
                    <p className="rv2-author-date">{featured[slide]?.date}</p>
                  </div>
                </div>
              </div>
              <div className="rv2-dots">
                {featured.map((_, i) => (
                  <button 
                    key={i} 
                    className={`rv2-dot${i === slide ? ' active' : ''}`} 
                    onClick={() => setSlide(i)} 
                    aria-label={`Review slide ${i + 1}`} 
                  />
                ))}
              </div>
            </div>

            {/* Filterable All Reviews List */}
            <div className="rv2-all" id="alle">
              <div className="rv2-all-header">
                <h2 className="rv2-section-title">{t('reviewsPage.allTitle')}</h2>
                <div className="rv2-filters">
                  {FILTERS.map(f => (
                    <button 
                      key={f} 
                      className={`rv2-filter${filter === f ? ' active' : ''}`} 
                      onClick={() => setActiveFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rv2-all-list">
                {visibleShown.map((r, i) => (
                  <div key={i} className="rv2-review-row">
                    <div className="rv2-review-head">
                      <span className="rv2-avatar rv2-avatar-sm">{ALL_INITIALS[i % ALL_INITIALS.length]}</span>
                      <div className="rv2-review-meta">
                        <span className="rv2-review-name">{r.name}</span>
                        <span className="rv2-review-age">{r.age}</span>
                      </div>
                      <GoogleLogo size={20} />
                    </div>
                    <Stars n={5} />
                    <p className="rv2-review-text">{r.text}</p>
                  </div>
                ))}
              </div>

              {visibleReviews < shown.length && (
                <div className="rv2-more-wrap">
                  <button 
                    className="rv2-btn-more" 
                    onClick={() => setVisibleReviews(count => count + 4)}
                  >
                    <span>{t('reviewsPage.viewMoreLink')}</span>
                    <Icon.ChevronDown width="16" height="16" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Light-Green Conversion CTA Section */}
      <section className="rv2-cta-section">
        <div className="container">
          <div className="rv2-cta-card">
            <div className="rv2-cta-head">
              <h2 className="rv2-cta-title">{t('reviewsPage.ctaTitle')}</h2>
              <p className="rv2-cta-sub">{t('reviewsPage.ctaSub')}</p>
            </div>
            
            <div className="rv2-cta-action">
              <a href="/reparatie" className="rv2-btn rv2-btn-primary rv2-btn-lg">
                <Icon.Wrench width="18" height="18" />
                {t('reviewsPage.planRepair')}
              </a>
            </div>

            <div className="rv2-cta-trust-bar">
              <div className="rv2-cta-trust-item">
                <Icon.Clock width="16" height="16" />
                <span>Binnen 60 min klaar</span>
              </div>
              <div className="rv2-cta-trust-item">
                <Icon.Shield width="16" height="16" />
                <span>90 dagen garantie</span>
              </div>
              <div className="rv2-cta-trust-item">
                <Icon.Check width="16" height="16" />
                <span>Originele kwaliteit</span>
              </div>
              <div className="rv2-cta-trust-item">
                <Icon.Euro width="16" height="16" />
                <span>Persoonlijke service</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

const FEATURED_INITIALS = ['H', 'S']
const ALL_INITIALS = ['J', 'L', 'R', 'E', 'T', 'M', 'K', 'A', 'P', 'V']
const TRUST_ICONS = [Icon.Shield, Icon.Users, Icon.Wrench, Icon.User]

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
  const [filterKey, setFilterKey] = useState<'all' | 'repairs' | 'accessories'>('all')
  const [visibleReviews, setVisibleReviews] = useState(4)
  const [stickyCtaVisible, setStickyCtaVisible] = useState(false)

  const filterAll = t('reviewsPage.filterAll')
  const filterRepairs = t('reviewsPage.filterRepairs')
  const filterAccessoires = t('reviewsPage.filterAccessoires')
  const FILTERS: { key: 'all' | 'repairs' | 'accessories'; label: string }[] = [
    { key: 'all', label: filterAll },
    { key: 'repairs', label: filterRepairs },
    { key: 'accessories', label: filterAccessoires },
  ]

  const featured = t('reviewsPage.featured', { returnObjects: true }) as { name: string; date: string; text: string }[]
  const allReviews = t('reviewsPage.allReviews', { returnObjects: true }) as { name: string; age: string; tag: string; text: string }[]
  const trustItems = t('reviewsPage.trust', { returnObjects: true }) as { val: string; title: string; sub: string }[]
  const whyChooseSections = t('reviewsPage.whyChooseSections', { returnObjects: true }) as { h3: string; body: string }[]

  const activeTagLabel = filterKey === 'repairs' ? filterRepairs : filterKey === 'accessories' ? filterAccessoires : null
  const shown = activeTagLabel === null ? allReviews : allReviews.filter(r => r.tag === activeTagLabel)
  const visibleShown = shown.slice(0, visibleReviews)

  const setActiveFilter = (nextKey: 'all' | 'repairs' | 'accessories') => {
    setFilterKey(nextKey)
    setVisibleReviews(4)
  }

  useEffect(() => {
    function onScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0
      setStickyCtaVisible(progress > 0.3)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Layout>
      {/* Hero Section */}
      <section className="rv2-hero">
        <div className="container">
          <div className="rv2-hero-grid">
            {/* Left Column: Eyebrow, Title, Subtitle, Dual Glass CTAs */}
            <div className="rv2-hero-left">
              <span className="rv2-eyebrow">{t('reviewsPage.eyebrow')}</span>

              <h1 className="rv2-hero-title">
                {t('reviewsPage.heroTitle')} <br />
                <span className="rv2-green">{t('reviewsPage.heroTitleAccent')}</span>
              </h1>

              <p className="rv2-hero-sub">
                {t('reviewsPage.heroSub')}
              </p>

              {/* Dual Glass CTAs */}
              <div className="rv2-hero-ctas">
                <a href="/reparatie" className="rv2-btn rv2-btn-primary">
                  <Icon.Calendar width="18" height="18" />
                  <span>{t('reviewsPage.planRepair')}</span>
                  <Icon.ArrowRight width="16" height="16" className="rv2-arrow-icon" />
                </a>
                <a
                  href="https://g.page/4mobiles/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rv2-btn rv2-btn-secondary"
                >
                  <Icon.Star width="18" height="18" />
                  <span>{t('reviewsPage.writeReview')}</span>
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
                <p className="rv2-rating-subtext">{t('reviewsPage.heroRatingCount')}</p>
              </div>

              {/* Featured Quote Glass Card */}
              <div className="rv2-glass-card rv2-quote-card-hero">
                <div className="rv2-quote-mark">“</div>
                <p className="rv2-quote-text">
                  "{t('reviewsPage.heroQuoteText')}"
                </p>
                <div className="rv2-quote-author">
                  <div className="rv2-quote-avatar">H</div>
                  <div>
                    <strong className="rv2-author-name">Hilde de Jong</strong>
                    <span className="rv2-author-sub">{t('reviewsPage.heroQuoteDate')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Bottom Trust Cards Grid (Matching hero_render_1.png) */}
          <div className="rv2-hero-trust-row">
            {trustItems.map((item, index) => {
              const Ic = TRUST_ICONS[index] || Icon.Star
              return (
                <div key={index} className="rv2-trust-glass-card">
                  <div className="rv2-trust-icon-circle">
                    <Ic width="20" height="20" />
                  </div>
                  <div className="rv2-trust-content">
                    <div className="rv2-trust-headline">
                      {item.val && <strong className="rv2-trust-val">{item.val}</strong>}
                      <span className="rv2-trust-label">{item.title}</span>
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
            {/* Featured Reviews — static, highlighted set */}
            <div className="rv2-featured">
              <div className="rv2-featured-header">
                <h2 className="rv2-section-title">{t('reviewsPage.featuredTitle')}</h2>
              </div>
              <div className="rv2-featured-list">
                {featured.map((r, i) => (
                  <div key={i} className="rv2-featured-card">
                    <div className="rv2-card-head">
                      <Stars n={5} />
                      <GoogleLogo size={22} />
                    </div>
                    <p className="rv2-card-text">"{r.text}"</p>
                    <div className="rv2-card-author">
                      <span className="rv2-avatar">{FEATURED_INITIALS[i]}</span>
                      <div>
                        <p className="rv2-author-name">{r.name}</p>
                        <p className="rv2-author-date">{r.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filterable All Reviews List */}
            <div className="rv2-all" id="alle">
              <div className="rv2-all-header">
                <h2 className="rv2-section-title">{t('reviewsPage.allTitle')}</h2>
              </div>

              <div className="rv2-filters">
                {FILTERS.map(f => (
                  <button
                    key={f.key}
                    className={`rv2-filter${filterKey === f.key ? ' active' : ''}`}
                    onClick={() => setActiveFilter(f.key)}
                  >
                    {f.label}
                  </button>
                ))}
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

      {/* Why choose 4Mobiles — long-form SEO content */}
      <section className="rv2-why-section">
        <div className="container">
          <h2 className="rv2-why-title">{t('reviewsPage.whyChooseTitle')}</h2>
          <p className="rv2-why-intro">{t('reviewsPage.whyChooseIntro')}</p>

          {whyChooseSections.map((s, i) => (
            <div key={i} className="rv2-why-block">
              <h3 className="rv2-why-h3">{s.h3}</h3>
              <p className="rv2-why-body">{s.body}</p>
            </div>
          ))}

          <p className="rv2-why-closing">{t('reviewsPage.whyChooseClosing')}</p>
        </div>
      </section>

      {/* Mobile-only sticky repair CTA, shown after 30% page scroll */}
      <div className={`rv2-sticky-cta${stickyCtaVisible ? ' rv2-sticky-cta-visible' : ''}`}>
        <a href="/reparatie" className="rv2-sticky-cta-btn">
          <Icon.Wrench width="16" height="16" />
          {t('reviewsPage.stickyCtaButton')}
        </a>
        <span className="rv2-sticky-cta-sub">{t('reviewsPage.stickyCtaSub')}</span>
      </div>
    </Layout>
  )
}

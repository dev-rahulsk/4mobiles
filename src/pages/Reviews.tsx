import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

const FEATURED_INITIALS = ['H', 'S', 'D']
const ALL_INITIALS = ['J', 'L', 'R', 'E', 'T']

function Stars({ n }: { n: number }) {
  return (
    <span className="rv2-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon.Star key={i} width="13" height="13" style={{ color: i < n ? '#f59e0b' : '#d1d5db' }} />
      ))}
    </span>
  )
}

const GoogleLogo = ({ size = 36 }: { size?: number }) => (
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
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const filterAll = t('reviewsPage.filterAll')
  const filterRepairs = t('reviewsPage.filterRepairs')
  const filterAccessoires = t('reviewsPage.filterAccessoires')
  const FILTERS = [filterAll, filterRepairs, filterAccessoires]

  const featured = t('reviewsPage.featured', { returnObjects: true }) as { name: string; date: string; text: string }[]
  const allReviews = t('reviewsPage.allReviews', { returnObjects: true }) as { name: string; age: string; tag: string; text: string }[]
  const trust = t('reviewsPage.trust', { returnObjects: true }) as { title: string; sub: string }[]

  const TRUST_ICONS = [Icon.Clock, Icon.Shield, Icon.Euro, Icon.Chat]

  const shown = filter === filterAll ? allReviews : allReviews.filter(r => r.tag === filter)
  const visibleShown = shown.slice(0, visibleReviews)

  const setActiveFilter = (nextFilter: string) => {
    setFilter(nextFilter)
    setVisibleReviews(3)
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
      {/* Hero */}
      <section className="rv2-hero">
        <div className="container">
          <div className="rv2-hero-grid">
            <div className="rv2-hero-left">
              <span className="rv2-eyebrow">{t('reviewsPage.eyebrow')}</span>
              <h1 className="rv2-hero-title">
                {t('reviewsPage.heroTitle')} <span className="rv2-green">4Mobiles</span>
              </h1>
              <p className="rv2-hero-sub">{t('reviewsPage.heroSub')}</p>
              <div className="rv2-hero-ctas">
                <a href="/reparatie" className="btn-accent rv2-btn">
                  <Icon.Wrench width="16" height="16" />
                  {t('reviewsPage.planRepair')}
                </a>
                <a href="https://g.page/4mobiles/review" target="_blank" rel="noopener noreferrer" className="rv2-btn rv2-btn-outline">
                  <Icon.Star width="16" height="16" />
                  {t('reviewsPage.writeReview')}
                </a>
              </div>
            </div>
            <div className="rv2-hero-device" aria-hidden="true">
              <div className="rv2-device-phone">
                <span />
                <strong>4.8</strong>
                <small>Google reviews</small>
              </div>
            </div>
            <div className="rv2-rating-card">
              <div className="rv2-rating-top">
                <GoogleLogo size={36} />
                <div>
                  <div className="rv2-score">4.8<span>/5</span></div>
                  <Stars n={5} />
                </div>
              </div>
              <p className="rv2-rating-note">{t('reviewsPage.ratingNote')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust row */}
      <section className="rv2-trust-row">
        <div className="container">
          <div className="rv2-trust-grid">
            {trust.map((item, i) => {
              const Ic = TRUST_ICONS[i]
              return (
                <div key={i} className="rv2-trust-item">
                  <span className="rv2-trust-icon"><Ic width="22" height="22" /></span>
                  <div>
                    <p className="rv2-trust-title">{item.title}</p>
                    <p className="rv2-trust-sub">{item.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Reviews body */}
      <section className="rv2-body">
        <div className="container">
          <div className="rv2-body-grid">
            {/* Featured */}
            <div className="rv2-featured">
              <div className="rv2-featured-header">
                <h2 className="rv2-section-title">{t('reviewsPage.featuredTitle')}</h2>
                <a href="#alle" className="rv2-link">{t('reviewsPage.viewAllLink')}</a>
              </div>
              <div
                className="rv2-featured-card"
                onPointerDown={e => setTouchStart(e.clientX)}
                onPointerUp={e => onFeaturedTouchEnd(e.clientX)}
                onTouchStart={e => setTouchStart(e.touches[0].clientX)}
                onTouchEnd={e => onFeaturedTouchEnd(e.changedTouches[0].clientX)}
              >
                <Stars n={5} />
                <p className="rv2-card-text">"{featured[slide]?.text}"</p>
                <div className="rv2-card-author">
                  <span className="rv2-avatar">{FEATURED_INITIALS[slide]}</span>
                  <div>
                    <p className="rv2-author-name">{featured[slide]?.name}</p>
                    <p className="rv2-author-date">{featured[slide]?.date}</p>
                  </div>
                  <GoogleLogo size={20} />
                </div>
              </div>
              <div className="rv2-dots">
                {featured.map((_, i) => (
                  <button key={i} className={`rv2-dot${i === slide ? ' active' : ''}`} onClick={() => setSlide(i)} aria-label={`Review ${i + 1}`} />
                ))}
              </div>
            </div>

            {/* All reviews */}
            <div className="rv2-all" id="alle">
              <div className="rv2-all-header">
                <h2 className="rv2-section-title">{t('reviewsPage.allTitle')}</h2>
                <div className="rv2-filters">
                  {FILTERS.map(f => (
                    <button key={f} className={`rv2-filter${filter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
                  ))}
                </div>
              </div>
              <div className="rv2-all-list">
                {visibleShown.map((r, i) => (
                  <div key={i} className="rv2-review-row">
                    <div className="rv2-review-head">
                      <span className="rv2-avatar rv2-avatar-sm">{ALL_INITIALS[i] ?? r.name[0]}</span>
                      <div className="rv2-review-meta">
                        <span className="rv2-review-name">{r.name}</span>
                        <span className="rv2-review-age">{r.age}</span>
                      </div>
                      <GoogleLogo size={18} />
                    </div>
                    <Stars n={5} />
                    <p className="rv2-review-text">{r.text}</p>
                  </div>
                ))}
              </div>
              {visibleReviews < shown.length && (
                <button className="rv2-link rv2-link-more" onClick={() => setVisibleReviews(count => count + 3)}>
                  {t('reviewsPage.viewMoreLink')}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="rv2-cta-bar">
        <div className="container">
          <div className="rv2-cta-inner">
            <div>
              <h3 className="rv2-cta-title">{t('reviewsPage.ctaTitle')}</h3>
              <p className="rv2-cta-sub">{t('reviewsPage.ctaSub')}</p>
            </div>
            <div className="rv2-cta-btns">
              <a href="/#reparatie" className="btn-accent rv2-btn">
                <Icon.Wrench width="16" height="16" />{t('reviewsPage.planRepair')}
              </a>
            </div>
          </div>
          <div className="rv2-cta-trust">
            <span>{t('reviewsPage.trust1')}</span><span className="rv2-sep">·</span>
            <span>{t('reviewsPage.trust2')}</span><span className="rv2-sep">·</span>
            <span>{t('reviewsPage.trust3')}</span><span className="rv2-sep">·</span>
            <span>{t('reviewsPage.trust4')}</span>
          </div>
        </div>
      </section>
    </Layout>
  )
}

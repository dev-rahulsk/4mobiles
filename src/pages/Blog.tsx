import { useMemo, useState, type ComponentType, type SVGProps } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'
import { Pill } from '../components/global'

type CategoryKey = 'reparatie' | 'batterij' | 'scherm' | 'bescherming' | 'service' | 'tips'

const ARTICLE_DATES: Record<string, string> = {
  'iphone-scherm-stuk':       '14 juni 2026',
  'batterij-leeg':             '10 juni 2026',
  'iphone-kapot':              '6 juni 2026',
  'tablet-scherm-kapot':       '28 mei 2026',
  'samsung-scherm-reparatie':  '20 mei 2026',
  'waterschade-telefoon':      '12 mei 2026',
}

const CATEGORY_ICONS: Record<CategoryKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  reparatie: Icon.Wrench,
  batterij: Icon.Battery,
  scherm: Icon.Crack,
  bescherming: Icon.Accessory,
  service: Icon.Truck,
  tips: Icon.Wand,
}

interface BlogCategory {
  key: CategoryKey
  label: string
}

interface Article {
  slug: string
  title: string
  excerpt: string
  tag: string
  categoryKey: CategoryKey
  readTime: string
}

function ArticleCard({ a }: { a: Article }) {
  const { t } = useTranslation()
  const date = ARTICLE_DATES[a.slug]
  const CatIcon = CATEGORY_ICONS[a.categoryKey]
  return (
    <a href={`/blog/${a.slug}`} className="bl-card">
      <div className="bl-card-img">
        <Icon.Phone width="30" height="30" />
        <span className="bl-card-badge">
          <CatIcon width="12" height="12" />
          {a.tag}
        </span>
      </div>
      <div className="bl-card-body">
        <div className="bl-card-meta">
          <span className="bl-read-time">
            <Icon.Clock width="12" height="12" />
            {a.readTime}
          </span>
          {date && <span className="bl-date"><Icon.Calendar width="12" height="12" />{date}</span>}
        </div>
        <h3 className="bl-card-title">{a.title}</h3>
        <p className="bl-card-excerpt">{a.excerpt}</p>
        <span className="bl-card-cta">{t('blog.readMore')}</span>
      </div>
    </a>
  )
}

export function Blog() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null)
  const [query, setQuery] = useState('')

  const categories = t('blog.categories', { returnObjects: true }) as BlogCategory[]
  const articles = t('blog.articles', { returnObjects: true }) as Article[]
  const serviceLinks = t('blog.serviceLinks', { returnObjects: true }) as { label: string }[]

  const normalizedQuery = query.trim().toLowerCase()
  const showFeatured = !activeCategory && !normalizedQuery
  const featured = articles[0]

  const filtered = useMemo(() => {
    const pool = showFeatured ? articles.slice(1) : articles
    return pool.filter(a => {
      if (activeCategory && a.categoryKey !== activeCategory) return false
      if (!normalizedQuery) return true
      return a.title.toLowerCase().includes(normalizedQuery) || a.excerpt.toLowerCase().includes(normalizedQuery)
    })
  }, [articles, showFeatured, activeCategory, normalizedQuery])

  const resetFilters = () => {
    setActiveCategory(null)
    setQuery('')
  }

  return (
    <Layout>
      {/* Hero — gradient background reused from the Repair/Reviews pages, search-first and calm */}
      <section className="bl-hero">
        <div className="container bl-hero-inner">
          <span className="bl-eyebrow">{t('blog.eyebrow')}</span>
          <h1 className="bl-hero-title">
            {t('blog.heroTitle1')}<br />
            {t('blog.heroTitle2')}
          </h1>
          <p className="bl-hero-sub">{t('blog.heroSub')}</p>

          <div className="bl-search-wrap">
            <Icon.Search width="18" height="18" className="bl-search-icon" />
            <input
              type="text"
              className="bl-search-input"
              placeholder={t('blog.searchPlaceholder')}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="bl-body">
        <div className="container bl-body-grid">
          {/* Desktop — left-hand filter column, separate from the article feed */}
          <aside className="bl-sidebar g-desktop-only">
            <h3 className="bl-sidebar-heading">{t('blog.filtersHeading')}</h3>
            <div className="bl-sidebar-list">
              <button
                type="button"
                className={`bl-sidebar-item${activeCategory === null ? ' bl-sidebar-item--active' : ''}`}
                onClick={() => setActiveCategory(null)}
              >
                <span className="bl-sidebar-icon"><Icon.Devices width="18" height="18" /></span>
                <span>{t('blog.allLabel')}</span>
              </button>
              {categories.map(cat => {
                const CatIcon = CATEGORY_ICONS[cat.key]
                return (
                  <button
                    key={cat.key}
                    type="button"
                    className={`bl-sidebar-item${activeCategory === cat.key ? ' bl-sidebar-item--active' : ''}`}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    <span className="bl-sidebar-icon"><CatIcon width="18" height="18" /></span>
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Mobile — horizontal swipeable filter pill row */}
          <div className="bl-mobile-filters g-mobile-only">
            <Pill selected={activeCategory === null} onClick={() => setActiveCategory(null)}>
              {t('blog.allLabel')}
            </Pill>
            {categories.map(cat => (
              <Pill key={cat.key} selected={activeCategory === cat.key} onClick={() => setActiveCategory(cat.key)}>
                {cat.label}
              </Pill>
            ))}
          </div>

          <div className="bl-main">
            {showFeatured && featured && (
              <>
                <span className="bl-section-label">{t('blog.featuredLabel')}</span>
                <a href={`/blog/${featured.slug}`} className="bl-featured">
                  <div className="bl-featured-img">
                    <Icon.Crack width="40" height="40" />
                    <span className="bl-card-badge bl-featured-badge">{featured.tag}</span>
                  </div>
                  <div className="bl-featured-body">
                    <div className="bl-card-meta">
                      <span className="bl-read-time bl-featured-read-time">
                        <Icon.Clock width="12" height="12" />
                        {featured.readTime}
                      </span>
                    </div>
                    <h2 className="bl-featured-title">{featured.title}</h2>
                    <p className="bl-featured-sub">{featured.excerpt}</p>
                    <span className="bl-featured-cta">{t('blog.featuredCta')}</span>
                  </div>
                </a>
              </>
            )}

            <div className="bl-list-header">
              <h2 className="bl-list-heading">{t('blog.articlesHeading')}</h2>
              <span className="bl-list-count">{t('blog.articlesCount', { count: filtered.length })}</span>
            </div>

            {filtered.length > 0 ? (
              <div className="bl-articles-grid">
                {filtered.map(a => <ArticleCard key={a.slug} a={a} />)}
              </div>
            ) : (
              <div className="bl-empty">
                <p className="bl-empty-title">{t('blog.noResultsTitle')}</p>
                <p className="bl-empty-sub">{t('blog.noResultsSub')}</p>
                <button type="button" className="bl-empty-reset" onClick={resetFilters}>
                  {t('blog.clearFilters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section className="bl-services-strip">
        <div className="container">
          <p className="bl-services-strip-label">{t('blog.servicesStripLabel')}</p>
          <div className="bl-services-row">
            {serviceLinks.map(s => (
              <a key={s.label} href="/" className="bl-service-link">
                <Icon.ArrowRight width="14" height="14" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Vandaag nog geholpen? */}
      <section className="bl-help-today">
        <div className="container">
          <div className="bl-help-inner">
            <div className="bl-help-text">
              <span className="bl-help-eyebrow">
                <Icon.Star width="14" height="14" style={{ color: '#f59e0b' }} /> {t('blog.helpTodayEyebrow')}
              </span>
              <h2 className="bl-help-title">{t('blog.helpTodayTitle')}</h2>
              <p className="bl-help-sub">{t('blog.helpTodaySub')}</p>
              <div className="bl-help-ctas">
                <a href="/reparatie" className="btn-accent bl-btn">
                  <Icon.Calendar width="16" height="16" /> {t('blog.helpTodayCta1')}
                </a>
                <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="bl-btn bl-btn-wa">
                  <Icon.WhatsApp width="16" height="16" /> {t('blog.helpTodayCta2')}
                </a>
                <a href="tel:+31174123456" className="bl-btn bl-btn-outline-dark">
                  <Icon.Phone width="16" height="16" /> {t('blog.helpTodayCta3')}
                </a>
              </div>
            </div>
            <div className="bl-help-cards">
              <div className="bl-help-card">
                <span className="bl-help-card-icon"><Icon.Clock width="22" height="22" /></span>
                <p className="bl-help-card-title">{t('blog.helpCard1Title')}</p>
                <p className="bl-help-card-sub">{t('blog.helpCard1Sub')}</p>
              </div>
              <div className="bl-help-card">
                <span className="bl-help-card-icon"><Icon.Shield width="22" height="22" /></span>
                <p className="bl-help-card-title">{t('blog.helpCard2Title')}</p>
                <p className="bl-help-card-sub">{t('blog.helpCard2Sub')}</p>
              </div>
              <div className="bl-help-card">
                <span className="bl-help-card-icon"><Icon.Check width="22" height="22" /></span>
                <p className="bl-help-card-title">{t('blog.helpCard3Title')}</p>
                <p className="bl-help-card-sub">{t('blog.helpCard3Sub')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

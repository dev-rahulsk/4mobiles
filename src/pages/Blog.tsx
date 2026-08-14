import { useMemo, useState, type ComponentType, type SVGProps } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'
import { Seo } from '../lib/seo/Seo'
import { JsonLd } from '../lib/seo/JsonLd'
import { breadcrumbSchema } from '../lib/seo/schema'
import { PageBottomCta, Pill } from '../components/global'

type CategoryKey = 'reparatie' | 'batterij' | 'scherm' | 'bescherming' | 'service' | 'tips'

export const ARTICLE_DATES: Record<string, string> = {
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
    <Seo title={t('seo.blog.title')} description={t('seo.blog.description')} path="/blog" />
    <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: t('nav.blog'), path: '/blog' }])} />
    <div className="bl-page">
      {/* Hero — shared page-hero styling, kept in sync with the FAQ page header */}
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="page-hero-eyebrow">
            <span className="page-hero-eyebrow-brand">{t('blog.eyebrowBrand')}</span> {t('blog.eyebrowSuffix')}
          </span>
          <h1 className="page-hero-title">
            {t('blog.heroTitle1')}<br />
            {t('blog.heroTitle2')}
          </h1>
          <p className="page-hero-sub">{t('blog.heroSub')}</p>

          <div className="page-hero-search-wrap">
            <Icon.Search width="18" height="18" className="page-hero-search-icon" />
            <input
              type="text"
              className="page-hero-search-input"
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
          <div className="bl-mobile-filters-wrap g-mobile-only">
            <span className="bl-mobile-filters-label">{t('blog.filtersHeading')}</span>
            <div className="bl-mobile-filters">
              <Pill selected={activeCategory === null} onClick={() => setActiveCategory(null)}>
                {t('blog.allLabel')}
              </Pill>
              {categories.map(cat => (
                <Pill key={cat.key} selected={activeCategory === cat.key} onClick={() => setActiveCategory(cat.key)}>
                  {cat.label}
                </Pill>
              ))}
            </div>
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

      {/* Bottom CTA — shared component, kept in sync with the FAQ page */}
      <PageBottomCta
        title={t('blog.bottomTitle')}
        sub={t('blog.bottomSub')}
        whatsappLabel={t('blog.bottomCtaWhatsapp')}
        repairLabel={t('blog.bottomCtaRepair')}
      />
    </div>
    </Layout>
  )
}

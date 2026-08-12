import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

const CAT_ICONS = [Icon.Crack, Icon.Battery, Icon.Drop, Icon.Wrench, Icon.Phone, Icon.Tablet]

const ARTICLE_DATES: Record<string, string> = {
  'iphone-scherm-stuk':       '14 juni 2026',
  'batterij-leeg':             '10 juni 2026',
  'iphone-kapot':              '6 juni 2026',
  'tablet-scherm-kapot':       '28 mei 2026',
  'samsung-scherm-reparatie':  '20 mei 2026',
  'waterschade-telefoon':      '12 mei 2026',
}

const TOPIC_ICONS = [Icon.Crack, Icon.Battery, Icon.Drop, Icon.Phone, Icon.Tablet, Icon.Wrench]

interface Article {
  slug: string
  title: string
  excerpt: string
  tag: string
  readTime: string
}

function ArticleCard({ a }: { a: Article }) {
  const { t } = useTranslation()
  const date = ARTICLE_DATES[a.slug]
  return (
    <a href={`/blog/${a.slug}`} className="bl-card">
      <div className="bl-card-img">
        <Icon.Phone width="32" height="32" />
      </div>
      <div className="bl-card-body">
        <div className="bl-card-meta">
          <span className="bl-tag">{a.tag}</span>
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
  const [activeTag, setActiveTag] = useState(() => t('blog.filterDefaultTag'))
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = t('blog.categories', { returnObjects: true }) as { label: string }[]
  const tags = t('blog.tags', { returnObjects: true }) as string[]
  const articles = t('blog.articles', { returnObjects: true }) as Article[]
  const serviceLinks = t('blog.serviceLinks', { returnObjects: true }) as { label: string }[]
  const topics = t('blog.topics', { returnObjects: true }) as { label: string; href: string }[]

  const popular = articles.slice(0, 4)
  const filtered = activeTag === tags[0] && !activeCategory
    ? articles
    : articles.filter(a => a.tag === activeTag)

  return (
    <Layout>
      {/* Hero */}
      <section className="bl-hero">
        <div className="container">
          <div className="bl-hero-grid">
            <div className="bl-hero-content">
              <span className="bl-eyebrow">{t('blog.eyebrow')}</span>
              <h1 className="bl-hero-title">{t('blog.heroTitle')}</h1>
              <p className="bl-hero-sub">{t('blog.heroSub')}</p>
              <div className="bl-hero-ctas">
                <a href="tel:+31174123456" className="btn-accent bl-btn">
                  <Icon.Phone width="16" height="16" />
                  {t('blog.callDirect')}
                </a>
                <a href="/reparatie" className="bl-btn bl-btn-outline">{t('blog.planRepair')}</a>
                <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="bl-btn bl-btn-wa">
                  <Icon.WhatsApp width="16" height="16" />
                  {t('blog.whatsappLabel')}
                </a>
              </div>
              <div className="bl-hero-trust">
                <span className="bl-trust-chip">{t('blog.heroTrust1')}</span>
                <span className="bl-trust-chip">
                  <Icon.Clock width="12" height="12" />
                  {t('blog.heroTrust2')}
                </span>
              </div>
            </div>
            {/* Featured article */}
            <a href={`/blog/${articles[0]?.slug}`} className="bl-featured">
              <div className="bl-featured-img">
                <Icon.Crack width="40" height="40" />
              </div>
              <div className="bl-featured-body">
                <span className="bl-tag">{articles[0]?.tag}</span>
                <h2 className="bl-featured-title">{t('blog.featuredTitle')}</h2>
                <p className="bl-featured-sub">{t('blog.featuredSub')}</p>
                <span className="bl-featured-cta">{t('blog.featuredCta')}</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="bl-cats">
        <div className="container">
          <h2 className="bl-cats-title">{t('blog.catsTitle')}</h2>
          <div className="bl-cats-grid">
            {categories.map((c, i) => {
              const Ic = CAT_ICONS[i]
              return (
                <button
                  key={c.label}
                  className={`bl-cat-btn${activeCategory === c.label ? ' active' : ''}`}
                  onClick={() => setActiveCategory(activeCategory === c.label ? null : c.label)}
                >
                  <span className="bl-cat-icon"><Ic width="20" height="20" /></span>
                  <span>{c.label}</span>
                  <Icon.ChevronRight width="14" height="14" className="bl-cat-arrow" />
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular topics */}
      <section className="bl-topics">
        <div className="container">
          <h2 className="bl-topics-title">{t('blog.topicsTitle')}</h2>
          <div className="bl-topics-grid">
            {topics.map((topic, i) => {
              const Ic = TOPIC_ICONS[i]
              return (
                <a key={topic.label} href={topic.href} className="bl-topic-card">
                  <span className="bl-topic-icon"><Ic width="24" height="24" /></span>
                  <span className="bl-topic-label">{topic.label}</span>
                  <Icon.ChevronRight width="14" height="14" className="bl-topic-arrow" />
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tag filter row */}
      <section className="bl-tags-section">
        <div className="container">
          <div className="bl-tags-row">
            {tags.map(tag => (
              <button
                key={tag}
                className={`bl-tag-btn${activeTag === tag ? ' active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
            <a href="#" className="bl-tags-more">{t('blog.viewMoreCats')}</a>
          </div>
        </div>
      </section>

      {/* Articles + sidebar */}
      <section className="bl-body">
        <div className="container">
          <div className="bl-body-grid">
            <div className="bl-main">
              <div className="bl-articles-grid">
                {filtered.map(a => <ArticleCard key={a.slug} a={a} />)}
              </div>
              <a href="#" className="bl-more-link">{t('blog.viewMore')}</a>
            </div>

            <aside className="bl-sidebar">
              <div className="bl-sidebar-popular">
                <h3 className="bl-sidebar-title">{t('blog.popularTitle')}</h3>
                <div className="bl-popular-list">
                  {popular.map((a, i) => (
                    <a key={a.slug} href={`/blog/${a.slug}`} className="bl-popular-item">
                      <span className="bl-popular-num">{i + 1}</span>
                      <div>
                        <span className="bl-tag bl-tag-sm">{a.tag}</span>
                        <p className="bl-popular-title">{a.title}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bl-sidebar-cta">
                <h3 className="bl-sidebar-cta-title">{t('blog.sidebarCtaTitle')}</h3>
                <p className="bl-sidebar-cta-sub">{t('blog.sidebarCtaSub')}</p>
                <a href="/reparatie" className="btn-accent bl-btn bl-btn-full">{t('blog.planRepair')}</a>
                <a href="tel:+31174123456" className="bl-btn bl-btn-outline-dark bl-btn-full">
                  <Icon.Phone width="14" height="14" />
                  {t('blog.callDirect')}
                </a>
              </div>
            </aside>
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

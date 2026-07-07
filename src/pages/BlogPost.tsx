import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

interface Article {
  slug: string
  title: string
  tag: string
  readTime: string
  excerpt: string
  body: string[]
}

interface PopularArticle {
  slug: string
  title: string
  tag: string
}

function RelatedCard({ article }: { article: { slug: string; title: string; excerpt: string; tag: string; readTime: string } }) {
  const { t } = useTranslation()
  return (
    <Link to={`/blog/${article.slug}`} className="bp-related-card">
      <div className="bp-related-img">
        <Icon.Phone width="28" height="28" />
      </div>
      <div className="bp-related-body">
        <div className="bp-related-meta">
          <span className="bl-tag">{article.tag}</span>
          <span className="bl-read-time">
            <Icon.Clock width="12" height="12" />
            {article.readTime}
          </span>
        </div>
        <h3 className="bp-related-title">{article.title}</h3>
        <p className="bp-related-excerpt">{article.excerpt}</p>
        <span className="bp-related-cta">{t('blog.readMore')}</span>
      </div>
    </Link>
  )
}

export function BlogPost() {
  const { t, i18n } = useTranslation()
  const { slug } = useParams<{ slug: string }>()

  const articlesMap = t('blogPost.articles', { returnObjects: true }) as Record<string, Article>
  const article = slug ? articlesMap[slug] : undefined

  if (!article) {
    return (
      <Layout>
        <div className="bp-not-found">
          <div className="container">
            <h1 className="bp-not-found-title">{t('blogPost.notFoundTitle')}</h1>
            <p className="bp-not-found-sub">{t('blogPost.notFoundSub')}</p>
            <Link to="/blog" className="bp-back-link">{t('blogPost.backToBlog')}</Link>
          </div>
        </div>
      </Layout>
    )
  }

  const blogArticles = t('blog.articles', { returnObjects: true }) as { slug: string; title: string; tag: string; readTime: string; excerpt: string }[]

  const popularArticles: PopularArticle[] = blogArticles.slice(0, 3).map(a => ({ slug: a.slug, title: a.title, tag: a.tag }))
  const relatedFiltered = blogArticles.filter(r => r.slug !== article.slug).slice(0, 3)
  const related = relatedFiltered.length < 3
    ? [
        ...relatedFiltered,
        ...blogArticles.filter(r => r.slug !== article.slug && !relatedFiltered.find(f => f.slug === r.slug)),
      ].slice(0, 3)
    : relatedFiltered

  const locale = i18n.language === 'nl' ? 'nl-NL' : 'en-US'
  const today = new Date().toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="bp-breadcrumb" aria-label="Breadcrumb">
        <div className="container">
          <ol className="bp-breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li aria-hidden="true" className="bp-breadcrumb-sep">›</li>
            <li><Link to="/blog">Blog</Link></li>
            <li aria-hidden="true" className="bp-breadcrumb-sep">›</li>
            <li aria-current="page" className="bp-breadcrumb-current">{article.title}</li>
          </ol>
        </div>
      </nav>

      {/* Main content + sidebar */}
      <section className="bp-section">
        <div className="container">
          <div className="bp-layout">
            <article className="bp-article">
              <header className="bp-article-header">
                <span className="bl-tag bp-tag">{article.tag}</span>
                <h1 className="bp-title">{article.title}</h1>
                <div className="bp-meta">
                  <span className="bp-meta-author">
                    <Icon.Check width="14" height="14" />
                    4Mobiles Team
                  </span>
                  <span className="bp-meta-sep">·</span>
                  <span className="bp-meta-date">{today}</span>
                  <span className="bp-meta-sep">·</span>
                  <span className="bp-meta-read">
                    <Icon.Clock width="14" height="14" />
                    {article.readTime} {t('blogPost.readTime')}
                  </span>
                </div>
              </header>

              <div className="bp-hero-img" role="img" aria-label={`${article.title}`}>
                <Icon.Phone width="48" height="48" />
              </div>

              <div className="bp-body">
                {article.body.map((paragraph, i) => (
                  <p key={i} className="bp-paragraph">{paragraph}</p>
                ))}
              </div>
            </article>

            <aside className="bp-sidebar">
              <div className="bp-sidebar-block">
                <h3 className="bp-sidebar-title">{t('blogPost.popularTitle')}</h3>
                <ul className="bp-popular-list">
                  {popularArticles.map((a, i) => (
                    <li key={a.slug}>
                      <Link to={`/blog/${a.slug}`} className="bp-popular-item">
                        <span className="bp-popular-num">{i + 1}</span>
                        <div className="bp-popular-info">
                          <span className="bl-tag bl-tag-sm">{a.tag}</span>
                          <p className="bp-popular-title">{a.title}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bp-sidebar-cta">
                <h3 className="bp-sidebar-cta-title">{t('blogPost.sidebarCtaTitle')}</h3>
                <p className="bp-sidebar-cta-sub">{t('blogPost.sidebarCtaSub')}</p>
                <Link to="/#reparatie" className="bl-btn btn-accent bp-sidebar-cta-btn">{t('blogPost.planRepair')}</Link>
                <a href="tel:+31174123456" className="bl-btn bl-btn-outline-dark bp-sidebar-cta-btn">
                  <Icon.Phone width="14" height="14" />
                  {t('blogPost.callDirect')}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related articles */}
      <section className="bp-related">
        <div className="container">
          <h2 className="bp-related-heading">{t('blogPost.relatedTitle')}</h2>
          <div className="bp-related-grid">
            {related.map(r => <RelatedCard key={r.slug} article={r} />)}
          </div>
        </div>
      </section>

      {/* Bottom CTA bar */}
      <section className="bp-bottom-cta">
        <div className="container">
          <div className="bp-bottom-cta-inner">
            <div className="bp-bottom-cta-text">
              <h2 className="bp-bottom-cta-title">{t('blogPost.ctaTitle')}</h2>
              <p className="bp-bottom-cta-sub">{t('blogPost.ctaSub')}</p>
            </div>
            <div className="bp-bottom-cta-actions">
              <Link to="/#reparatie" className="bl-btn btn-accent">{t('blogPost.planRepair')}</Link>
              <a href="tel:+31174123456" className="bl-btn bl-btn-outline">
                <Icon.Phone width="15" height="15" />
                {t('blogPost.callDirect')}
              </a>
              <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="bl-btn bp-whatsapp-btn">
                <Icon.WhatsApp width="16" height="16" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

import { useMemo, useState, type ComponentType, type SVGProps } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'
import { FaqAccordion, type FaqAccordionItem } from '../components/FaqAccordion'
import { PageBottomCta, Pill } from '../components/global'

type CategoryKey = 'reparatie' | 'batterij' | 'opsturen' | 'garantie' | 'gegevens' | 'winkel'

interface FaqCategory {
  key: CategoryKey
  label: string
}

interface FaqItem extends FaqAccordionItem {
  category: CategoryKey
}

const CATEGORY_ICONS: Record<CategoryKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  reparatie: Icon.Wrench,
  batterij: Icon.Battery,
  opsturen: Icon.Truck,
  garantie: Icon.ShieldCheck,
  gegevens: Icon.Shield,
  winkel: Icon.Store,
}

export function Faq() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null)
  const [query, setQuery] = useState('')

  const categories = t('faqPage.categories', { returnObjects: true }) as FaqCategory[]
  const items = t('faqPage.items', { returnObjects: true }) as FaqItem[]

  const normalizedQuery = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    return items.filter(item => {
      if (activeCategory && item.category !== activeCategory) return false
      if (!normalizedQuery) return true
      return item.q.toLowerCase().includes(normalizedQuery) || item.a.toLowerCase().includes(normalizedQuery)
    })
  }, [items, activeCategory, normalizedQuery])

  const resetFilters = () => {
    setActiveCategory(null)
    setQuery('')
  }

  return (
    <Layout>
    <div className="fq-page">
      {/* Header — shared page-hero styling, kept in sync with the Blog page header.
          fq-hero adds a mobile-only nav-clearance offset on top of the shared class. */}
      <section className="page-hero fq-hero">
        <div className="container page-hero-inner">
          <span className="page-hero-eyebrow">{t('faqPage.eyebrow')}</span>
          <h1 className="page-hero-title">{t('faqPage.title')}</h1>
          <p className="page-hero-sub">{t('faqPage.sub')}</p>

          <div className="page-hero-search-wrap">
            <Icon.Search width="18" height="18" className="page-hero-search-icon" />
            <input
              type="text"
              className="page-hero-search-input"
              placeholder={t('faqPage.searchPlaceholder')}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="fq-body">
        <div className="container fq-body-grid">
          {/* Desktop — left-hand filter column */}
          <aside className="fq-sidebar g-desktop-only">
            <h3 className="fq-sidebar-heading">{t('faqPage.filtersHeading')}</h3>
            <div className="fq-sidebar-list">
              <button
                type="button"
                className={`fq-sidebar-item${activeCategory === null ? ' fq-sidebar-item--active' : ''}`}
                onClick={() => setActiveCategory(null)}
              >
                <span className="fq-sidebar-icon"><Icon.Devices width="18" height="18" /></span>
                <span>{t('faqPage.allLabel')}</span>
              </button>
              {categories.map(cat => {
                const CatIcon = CATEGORY_ICONS[cat.key]
                return (
                  <button
                    key={cat.key}
                    type="button"
                    className={`fq-sidebar-item${activeCategory === cat.key ? ' fq-sidebar-item--active' : ''}`}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    <span className="fq-sidebar-icon"><CatIcon width="18" height="18" /></span>
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Mobile — familiar horizontal filter pill row above the list */}
          <div className="fq-mobile-filters-wrap g-mobile-only">
            <span className="fq-mobile-filters-label">{t('faqPage.filtersHeading')}</span>
            <div className="fq-mobile-filters">
              <Pill selected={activeCategory === null} onClick={() => setActiveCategory(null)}>
                {t('faqPage.allLabel')}
              </Pill>
              {categories.map(cat => (
                <Pill key={cat.key} selected={activeCategory === cat.key} onClick={() => setActiveCategory(cat.key)}>
                  {cat.label}
                </Pill>
              ))}
            </div>
          </div>

          <div className="fq-list-col">
            <div className="fq-list-header">
              <h2 className="fq-list-heading">{t('faqPage.eyebrow')}</h2>
              <span className="fq-list-count">{t('faqPage.questionsCount', { count: filtered.length })}</span>
            </div>

            {filtered.length > 0 ? (
              <FaqAccordion key={`${activeCategory ?? 'all'}-${normalizedQuery}`} items={filtered} />
            ) : (
              <div className="fq-empty">
                <p className="fq-empty-title">{t('faqPage.noResultsTitle')}</p>
                <p className="fq-empty-sub">{t('faqPage.noResultsSub')}</p>
                <button type="button" className="fq-empty-reset" onClick={resetFilters}>
                  {t('faqPage.clearFilters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA — shared component, kept in sync with the Blog page */}
      <PageBottomCta
        title={t('faqPage.bottomTitle')}
        sub={t('faqPage.bottomSub')}
        whatsappLabel={t('faqPage.bottomCtaWhatsapp')}
        repairLabel={t('faqPage.bottomCtaRepair')}
      />
    </div>
    </Layout>
  )
}

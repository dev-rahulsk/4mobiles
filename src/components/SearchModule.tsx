import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'
import { getOpenStatus } from '../lib/openStatus'

const OPEN_STATUS = getOpenStatus()

export function SearchModule() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const days = t('contact.days', { returnObjects: true }) as string[]
  const openLabel = t(`contact.${OPEN_STATUS.type}`, {
    hour: OPEN_STATUS.hour,
    mins: OPEN_STATUS.mins,
    day: OPEN_STATUS.dayIndex !== undefined ? days[OPEN_STATUS.dayIndex] : undefined,
  })

  return (
    <section className="search-section">
      <div className="container">
        <div className="border-beam-container repair-search-card">
          <div className="border-beam" />
          <div className="border-beam-inner search-card repair-search-card__surface">
            <div className="repair-search-card__content">
              <h2 className="search-title">{t('search.title')}</h2>
              <div className="search-underline" />
              <form
                className="search-form"
                onSubmit={e => {
                  e.preventDefault()
                  if (query.trim()) alert(`${t('search.button')}: ${query}`)
                }}
              >
                <div className="search-input-wrap">
                  <Icon.Search width="18" height="18" className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder={t('search.placeholder')}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                </div>
                <button type="submit" className="search-btn">
                  {t('search.button')}
                </button>
              </form>
              <a
                href="/contact"
                className={`search-hours-chip${OPEN_STATUS.open ? ' search-hours-chip--open' : ' search-hours-chip--closed'}`}
              >
                <span className="search-hours-dot" />
                <Icon.Store width="16" height="16" />
                {openLabel}
                <Icon.ChevronRight width="14" height="14" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

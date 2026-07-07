import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

export function SearchModule() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  return (
    <section className="search-section">
      <div className="container">
        <div className="search-card">
          <h2 className="search-title">{t('search.title')}</h2>
          <div className="search-underline" />
          <form
            className="search-form"
            onSubmit={e => { e.preventDefault(); if (query.trim()) alert(`${t('search.button')}: ${query}`) }}
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
          <div className="search-hints">
            {['iPhone 15 Pro', 'Samsung S24', 'iPad Air', 'OnePlus 12'].map(h => (
              <button key={h} className="search-hint" onClick={() => setQuery(h)}>{h}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

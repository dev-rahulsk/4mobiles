import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

export function FAQ() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(0)

  const faqs = [0, 1, 2, 3, 4, 5].map(i => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }))

  return (
    <section className="section faq">
      <div className="container faq-inner">
        <div className="faq-side">
          <div className="section-eyebrow">{t('faq.eyebrow')}</div>
          <h2 className="section-title">{t('faq.title')}</h2>
          <p className="section-sub">{t('faq.sub')}</p>
          <div className="faq-cta">
            <button className="btn btn-primary">
              <Icon.Chat width="16" height="16" /> {t('faq.ctaChat')}
            </button>
            <button className="btn btn-outline">
              <Icon.Phone width="16" height="16" /> {t('faq.ctaPhone')}
            </button>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item${open === i ? ' faq-open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq-icon"><Icon.Plus width="18" height="18" /></span>
              </button>
              {open === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

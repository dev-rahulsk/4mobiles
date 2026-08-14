import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'
import { FaqAccordion } from './FaqAccordion'

interface FaqItem {
  q: string
  a: string
}

interface FAQProps {
  items?: FaqItem[]
}

export function FAQ({ items }: FAQProps) {
  const { t } = useTranslation()

  const defaultFaqs = [0, 1, 2, 3, 4, 5].map(i => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }))
  const faqs = items ?? defaultFaqs

  return (
    <section className="section faq" id="faq">
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

        <FaqAccordion items={faqs} />
      </div>
    </section>
  )
}

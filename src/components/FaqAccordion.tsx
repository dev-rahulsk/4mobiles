import { useState } from 'react'
import { Icon } from './Icons'

export interface FaqAccordionItem {
  q: string
  a: string
}

interface FaqAccordionProps {
  items: FaqAccordionItem[]
  defaultOpen?: number
  moreLink?: { href: string; label: string }
}

export function FaqAccordion({ items, defaultOpen = 0, moreLink }: FaqAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div key={i} className={`faq-item${open === i ? ' faq-open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{item.q}</span>
            <span className="faq-icon"><Icon.Plus width="18" height="18" /></span>
          </button>
          {open === i && <div className="faq-a">{item.a}</div>}
        </div>
      ))}
      {moreLink && (
        <a href={moreLink.href} className="faq-more-link">
          {moreLink.label}
        </a>
      )}
    </div>
  )
}

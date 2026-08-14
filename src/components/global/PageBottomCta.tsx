import type { ReactNode } from 'react'
import { Icon } from '../Icons'
import { CtaButton } from './CtaButton'

interface PageBottomCtaProps {
  title: ReactNode
  sub: ReactNode
  whatsappLabel: ReactNode
  repairLabel: ReactNode
  whatsappHref?: string
  repairHref?: string
  className?: string
}

export function PageBottomCta({
  title,
  sub,
  whatsappLabel,
  repairLabel,
  whatsappHref = 'https://wa.me/31174237022',
  repairHref = '/reparatie',
  className = '',
}: PageBottomCtaProps) {
  const classes = ['page-bottom-cta', className].filter(Boolean).join(' ')

  return (
    <section className={classes}>
      <div className="container">
        <div className="page-bottom-cta-card">
          <div className="page-bottom-cta-icon">
            <Icon.Chat width="22" height="22" />
          </div>
          <div className="page-bottom-cta-text">
            <h2 className="page-bottom-cta-title">{title}</h2>
            <p className="page-bottom-cta-sub">{sub}</p>
          </div>
          <div className="page-bottom-cta-ctas">
            <CtaButton
              variant="outline"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="page-bottom-cta-btn"
            >
              <Icon.WhatsApp width="18" height="18" />
              <span>{whatsappLabel}</span>
            </CtaButton>
            <CtaButton variant="primary" href={repairHref} className="page-bottom-cta-btn">
              <Icon.Calendar width="18" height="18" />
              <span>{repairLabel}</span>
              <Icon.ArrowRight width="16" height="16" />
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  )
}

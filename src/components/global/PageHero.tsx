import type { ReactNode } from 'react'

export interface PageHeroImage {
  src: string
  alt: string
}

interface PageHeroProps {
  tone?: 'light' | 'dark'
  badgeCount?: 2 | 4
  image: PageHeroImage
  eyebrow: ReactNode
  title: ReactNode
  subtext?: ReactNode
  cta?: ReactNode
  aside?: ReactNode
  badges?: ReactNode
  visual?: ReactNode
  className?: string
}

export function PageHero({
  tone = 'light',
  badgeCount = 2,
  image,
  eyebrow,
  title,
  subtext,
  cta,
  aside,
  badges,
  visual,
  className = '',
}: PageHeroProps) {
  const classes = [
    'g-hero',
    `g-hero--${tone}`,
    badgeCount === 4 ? 'g-hero--four-badges' : 'g-hero--two-badges',
    className,
  ].filter(Boolean).join(' ')

  return (
    <section className={classes}>
      <div className="g-hero__card">
        <div className="g-hero__media" aria-hidden="true">
          <img src={image.src} alt={image.alt} />
        </div>
        <div className="g-hero__scrim" aria-hidden="true" />
        <div className="g-hero__photo-glow" aria-hidden="true" />
        {visual && <div className="g-hero__visual" aria-hidden="true">{visual}</div>}
        <div className="g-hero__curve" aria-hidden="true" />

        <div className="g-container g-hero__content">
          <div className={aside ? 'g-hero__grid' : undefined}>
            <div className="g-hero__text">
              <p className="g-eyebrow">{eyebrow}</p>
              <h1 className="g-title">{title}</h1>
              {subtext && <p className="g-body">{subtext}</p>}
              {cta && <div className="g-hero__cta">{cta}</div>}
            </div>
            {aside && <div className="g-hero__aside">{aside}</div>}
          </div>
        </div>
      </div>

      {badges && <div className="g-container g-hero__badges">{badges}</div>}
    </section>
  )
}

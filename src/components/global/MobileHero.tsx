import { type CSSProperties, type ReactNode } from 'react'

export interface MobileHeroImage {
  src: string
  alt: string
}

interface MobileHeroProps {
  image: MobileHeroImage
  imagePositionX?: string
  imagePositionY?: string
  imageZoom?: number
  /** Shifts the (zoomed) image up/down after scaling, e.g. '-40px' to reveal lower content. */
  imageOffsetY?: string
  eyebrow?: ReactNode
  title: ReactNode
  subtext?: ReactNode
  cta?: ReactNode
  badges: ReactNode[]
  tone?: 'light' | 'dark'
  gradientStrength?: number
  glowStrength?: number
  readabilityLayer?: boolean
  className?: string
}

export function MobileHero({
  image,
  imagePositionX = '50%',
  imagePositionY = '50%',
  imageZoom = 1,
  imageOffsetY = '0px',
  eyebrow,
  title,
  subtext,
  cta,
  badges,
  tone = 'dark',
  gradientStrength = 1,
  glowStrength = 1,
  readabilityLayer = false,
  className = '',
}: MobileHeroProps) {
  const badgeCount = badges.length === 4 ? 4 : 2

  if (import.meta.env.DEV && badges.length !== 2 && badges.length !== 4) {
    console.warn(`MobileHero: expected 2 or 4 badges, got ${badges.length}. Layout is only defined for those two counts.`)
  }

  const classes = [
    'mobile-hero',
    `mobile-hero--${badgeCount}-badges`,
    `mobile-hero--${tone}`,
    readabilityLayer ? 'mobile-hero--readable' : '',
    className,
  ].filter(Boolean).join(' ')

  const style = {
    '--hero-image-x': imagePositionX,
    '--hero-image-y': imagePositionY,
    '--hero-image-zoom': imageZoom,
    '--hero-image-offset-y': imageOffsetY,
    '--hero-gradient-strength': gradientStrength,
    '--hero-glow-strength': glowStrength,
  } as CSSProperties

  return (
    <section className={classes} style={style}>
      <div className="mobile-hero__photo-zone">
        {/* The image sits inside one oversized circle; its clipped lower edge
            creates the curve, and the circle's own shadow creates the glow. */}
        <div className="mobile-hero__media" aria-hidden="true">
          <img src={image.src} alt={image.alt} loading="eager" />
        </div>

        <div className="mobile-hero__content">
          {eyebrow && <span className="mobile-hero__eyebrow">{eyebrow}</span>}
          <h1 className="mobile-hero__title">{title}</h1>
          {subtext && <p className="mobile-hero__text">{subtext}</p>}
          {cta && <div className="mobile-hero__cta">{cta}</div>}
        </div>
      </div>

      <div className="mobile-hero__badges">
        {badges}
      </div>
    </section>
  )
}

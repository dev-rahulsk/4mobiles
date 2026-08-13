import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'

export interface MobileHeroImage {
  src: string
  alt: string
}

interface MobileHeroProps {
  image: MobileHeroImage
  imagePositionX?: string
  imagePositionY?: string
  imageZoom?: number
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
  bgGradient?: string
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
  bgGradient,
  className = '',
}: MobileHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const update = () => {
      el.style.setProperty('--hero-vh', `${el.getBoundingClientRect().height}px`)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.visualViewport?.addEventListener('resize', update)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.visualViewport?.removeEventListener('resize', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const badgeCount = badges.length === 4 ? 4 : badges.length === 3 ? 3 : 2

  if (import.meta.env.DEV && badges.length !== 2 && badges.length !== 3 && badges.length !== 4) {
    console.warn(`MobileHero: expected 2, 3 or 4 badges, got ${badges.length}. Layout is only defined for those counts.`)
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
    ...(bgGradient ? { '--hero-bg-gradient': bgGradient } : {}),
  } as CSSProperties

  return (
    <section className={classes} style={style} ref={sectionRef}>
      <div className="mobile-hero__photo-zone">
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

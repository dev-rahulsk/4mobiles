import { useId, type ComponentType, type CSSProperties, type ReactNode, type SVGProps } from 'react'
import { Icon } from '../Icons'

const GLOW_CURVE_MAIN = 'M 760 0 C 620 80, 586 208, 575 318 C 559 455, 524 520, 436 625'
const GLOW_CURVE_SECONDARY = 'M 100 750 C 150 680, 170 630, 220 580 C 300 500, 320 490, 384 459'

export interface DesktopHeroImage {
  src: string
  alt: string
}

export interface DesktopHeroBadge {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  value: ReactNode
  title: ReactNode
  rating?: number
}

export interface DesktopHeroCta {
  label: ReactNode
  href: string
  target?: string
  rel?: string
}

interface DesktopHeroProps {
  eyebrow: ReactNode
  title: ReactNode
  description?: ReactNode
  cta?: DesktopHeroCta
  image: DesktopHeroImage
  imagePosition?: string
  badges: DesktopHeroBadge[]
  className?: string
}

export function DesktopHero({
  eyebrow,
  title,
  description,
  cta,
  image,
  imagePosition = 'center',
  badges,
  className = '',
}: DesktopHeroProps) {
  const glowFilterId = useId()

  const style = {
    '--hero-image-position': imagePosition,
  } as CSSProperties

  return (
    <section className={`desktop-hero${className ? ` ${className}` : ''}`} style={style}>
      <div className="desktop-hero__photo">
        <img src={image.src} alt={image.alt} loading="eager" />
      </div>

      <svg
        className="desktop-hero__image-fade"
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={`${glowFilterId}-dark-clip`} clipPathUnits="objectBoundingBox">
            <path d="M 0.5493 0 C 0.4521 0.1143, 0.4285 0.2971, 0.4208 0.4543 C 0.4097 0.65, 0.3854 0.7429, 0.3243 0.8929 L -0.2562 1.0429 L -0.2562 -0.0714 Z" />
            <path d="M 0.1292 1.0714 C 0.1639 0.9714, 0.1778 0.9, 0.2125 0.8286 C 0.2681 0.7143, 0.2819 0.7, 0.3264 0.6557 L -0.2181 0.6557 L -0.2181 1.0714 Z" />
          </clipPath>
          <filter id={`${glowFilterId}-fill-blur`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <g transform="translate(80, 0)" style={{ filter: `url(#${glowFilterId}-fill-blur)` }}>
          <g transform="translate(6, 0)">
            <g transform="translate(-55, 0)">
              <path d={`${GLOW_CURVE_MAIN} L -400 730 L -400 -50 Z`} />
            </g>
            <path d={`${GLOW_CURVE_SECONDARY} L -400 459 L -400 750 Z`} />
          </g>
        </g>
      </svg>

      <svg
        className="desktop-hero__bg-lines"
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id={`${glowFilterId}-lines`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>
        <path
          className="hero-bg-band"
          d="M -20 -5 C 180 130, 420 -25, 610 0 L 570 2 C 400 20, 170 200, -20 280 Z"
        />
        <path
          className="hero-bg-line"
          style={{ filter: `url(#${glowFilterId}-lines)` }}
          d="M -20 -5 C 180 130, 420 -25, 610 0"
        />
        <path
          className="hero-bg-line"
          style={{ filter: `url(#${glowFilterId}-lines)` }}
          d="M -20 280 C 170 200, 400 20, 570 2"
        />
      </svg>

      <div
        className="desktop-hero__copy-scrim"
        style={{ clipPath: `url(#${glowFilterId}-dark-clip)` }}
        aria-hidden="true"
      />
      <div className="desktop-hero__top-fade" aria-hidden="true" />
      <div className="desktop-hero__bottom-fade" aria-hidden="true" />
      <div className="desktop-hero__ambient-glow" aria-hidden="true" />

      <svg
        className="desktop-hero__glow-curve"
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id={`${glowFilterId}-blur`} x="-80%" y="-40%" width="260%" height="180%">
            <feGaussianBlur stdDeviation="20" />
          </filter>
          <linearGradient
            id={`${glowFilterId}-mask-fade`}
            gradientUnits="userSpaceOnUse"
            x1="740"
            y1="0"
            x2="436"
            y2="625"
          >
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="8%" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="26%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#fff" stopOpacity="1" />
            <stop offset="64%" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="84%" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id={`${glowFilterId}-core-fade`}
            gradientUnits="userSpaceOnUse"
            x1="740"
            y1="0"
            x2="436"
            y2="625"
          >
            <stop offset="0%" stopColor="#8cf24a" stopOpacity="0" />
            <stop offset="8%" stopColor="#8cf24a" stopOpacity="0.35" />
            <stop offset="26%" stopColor="#9dff5e" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#a9ff6b" stopOpacity="1" />
            <stop offset="64%" stopColor="#8cf24a" stopOpacity="0.75" />
            <stop offset="84%" stopColor="#8cf24a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8cf24a" stopOpacity="0" />
          </linearGradient>
          <mask id={`${glowFilterId}-outside`} maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="700">
            <path
              d={`${GLOW_CURVE_MAIN} L 1650 700 L 1650 -50 Z`}
              fill={`url(#${glowFilterId}-mask-fade)`}
            />
          </mask>
          <linearGradient
            id={`${glowFilterId}-blur-fade-2`}
            gradientUnits="userSpaceOnUse"
            x1="100"
            y1="750"
            x2="384"
            y2="459"
          >
            <stop offset="0%" stopColor="#8cf24a" stopOpacity="0" />
            <stop offset="20%" stopColor="#8cf24a" stopOpacity="0.25" />
            <stop offset="45%" stopColor="#8cf24a" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#8cf24a" stopOpacity="0.3" />
            <stop offset="90%" stopColor="#8cf24a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8cf24a" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id={`${glowFilterId}-core-fade-2`}
            gradientUnits="userSpaceOnUse"
            x1="100"
            y1="750"
            x2="384"
            y2="459"
          >
            <stop offset="0%" stopColor="#8cf24a" stopOpacity="0" />
            <stop offset="20%" stopColor="#9dff5e" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#9dff5e" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#8cf24a" stopOpacity="0.35" />
            <stop offset="90%" stopColor="#8cf24a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#8cf24a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g transform="translate(80, 0)">
          <g transform="translate(-50, 0)">
            <path
              className="hero-glow-path hero-glow-path--blur"
              style={{ filter: `url(#${glowFilterId}-blur)` }}
              mask={`url(#${glowFilterId}-outside)`}
              d={GLOW_CURVE_MAIN}
            />
            <path
              className="hero-glow-path hero-glow-path--core"
              style={{ stroke: `url(#${glowFilterId}-core-fade)` }}
              d={GLOW_CURVE_MAIN}
            />
          </g>
          <path
            className="hero-glow-path hero-glow-path--blur hero-glow-path--blur-2"
            style={{ filter: `url(#${glowFilterId}-blur)`, stroke: `url(#${glowFilterId}-blur-fade-2)` }}
            d={GLOW_CURVE_SECONDARY}
          />
          <path
            className="hero-glow-path hero-glow-path--core hero-glow-path--core-2"
            style={{ stroke: `url(#${glowFilterId}-core-fade-2)` }}
            d={GLOW_CURVE_SECONDARY}
          />
        </g>
      </svg>

      <div className="desktop-container desktop-hero__inner">
        <div className="desktop-hero__copy">
          <p className="desktop-hero__eyebrow">{eyebrow}</p>
          <h1 className="desktop-hero__title">{title}</h1>
          {description && <p className="desktop-hero__description">{description}</p>}
          {cta && (
            <a className="desktop-hero__cta" href={cta.href} target={cta.target} rel={cta.rel}>
              {cta.label}
            </a>
          )}
        </div>
      </div>

      <div className="desktop-container desktop-hero__badges">
        {badges.map((badge, i) => (
          <div className="desktop-hero-badge" key={i}>
            <div className="desktop-hero-badge__icon">
              <badge.icon width="22" height="22" />
            </div>
            <div className="desktop-hero-badge__text">
              <p className="desktop-hero-badge__value">{badge.value}</p>
              {badge.rating && (
                <span className="desktop-hero-badge__stars" aria-hidden="true">
                  {Array.from({ length: badge.rating }, (_, s) => (
                    <Icon.Star key={s} width="10" height="10" />
                  ))}
                </span>
              )}
              <p className="desktop-hero-badge__title">{badge.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

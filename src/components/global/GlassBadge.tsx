import type { ComponentType, ReactNode, SVGProps } from 'react'

interface GlassBadgeProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  value: ReactNode
  title: ReactNode
  text?: ReactNode
  className?: string
}

export function GlassBadge({ icon: Icon, value, title, text, className = '' }: GlassBadgeProps) {
  return (
    <div className={`g-glass-badge${className ? ` ${className}` : ''}`}>
      <div className="g-glass-badge__icon">
        <Icon width="22" height="22" />
      </div>
      <div className="g-glass-badge__text">
        <p className="g-glass-badge__value">{value}</p>
        <p className="g-glass-badge__title">{title}</p>
        {text && <p className="g-glass-badge__label">{text}</p>}
      </div>
    </div>
  )
}

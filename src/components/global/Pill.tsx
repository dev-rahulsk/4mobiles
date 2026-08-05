import type { ReactNode } from 'react'

interface PillProps {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  className?: string
}

export function Pill({ children, selected = false, onClick, href, target, rel, className = '' }: PillProps) {
  const classes = `g-pill${selected ? ' g-pill--selected' : ''}${className ? ` ${className}` : ''}`

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel}>
        {children}
      </a>
    )
  }

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick} aria-pressed={selected}>
        {children}
      </button>
    )
  }

  return <span className={classes}>{children}</span>
}

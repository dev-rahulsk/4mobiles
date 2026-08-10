import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

export type CtaButtonVariant = 'primary' | 'dark' | 'outline' | 'light'

interface CtaButtonSharedProps {
  variant?: CtaButtonVariant
  children: ReactNode
  className?: string
}

type CtaButtonLinkProps = CtaButtonSharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type CtaButtonButtonProps = CtaButtonSharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export type CtaButtonProps = CtaButtonLinkProps | CtaButtonButtonProps

export function CtaButton(props: CtaButtonProps) {
  const { variant = 'primary', children, className = '', ...rest } = props
  const classes = `g-button g-button--${variant}${className ? ` ${className}` : ''}`

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    return (
      <a className={classes} href={href} {...anchorRest}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  )
}

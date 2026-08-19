import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Icon } from './Icons'
import logoIcon from '../assets/logo/logo-icon.png'
import BRAND_DISPLAY_NAMES from '../lib/seo/reparatie-brands.json'

const DARK_HERO_PATHS = new Set(['/producten', '/over-ons', '/zakelijk', '/reviews', '/contact'])

const REPAIR_BRANDS = Object.entries(BRAND_DISPLAY_NAMES as Record<string, string>)

export function TopBar() {
  const { t } = useTranslation()
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <a href="https://maps.google.com/?q=Molenstraat+2+Naaldwijk" target="_blank" rel="noopener noreferrer" className="topbar-item">
          <Icon.Pin width="14" height="14" />
          <span>{t('topbar.address')}</span>
        </a>
        <a href="/reviews" className="topbar-item topbar-rating">
          <Icon.Google width="18" height="18" />
          <span className="stars">
            {[0, 1, 2, 3, 4].map(i => <Icon.Star key={i} width="11" height="11" />)}
          </span>
          <span><b>4.9</b> · {t('topbar.reviews', { count: '200+' })}</span>
        </a>
        <a href="tel:0174237022" className="topbar-item">
          <Icon.Phone width="14" height="14" />
          <span>{t('topbar.phone')}</span>
        </a>
      </div>
    </div>
  )
}

function Logo() {
  const { t } = useTranslation()
  return (
    <a href="/" className="logo">
      <span className="logo-mark">
        <img src={logoIcon} alt="4Mobiles" />
      </span>
      <span className="logo-text">
        <span className="logo-name">4Mobiles</span>
        <span className="logo-tag">{t('logo.tag')}</span>
      </span>
    </a>
  )
}

function LangToggle() {
  const { t, i18n } = useTranslation()
  const current = i18n.language === 'en' ? 'en' : 'nl'
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const select = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="lang-dropdown" ref={rootRef}>
      <button
        type="button"
        className="lang-dropdown-trigger"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
      >
        <span>{current.toUpperCase()}</span>
        <Icon.ChevronDown width="12" height="12" className={`lang-dropdown-caret${open ? ' lang-dropdown-caret-open' : ''}`} />
      </button>
      {open && (
        <div className="lang-dropdown-menu" role="listbox">
          <button
            type="button"
            role="option"
            aria-selected={current === 'nl'}
            className={`lang-dropdown-item${current === 'nl' ? ' lang-dropdown-item-active' : ''}`}
            onClick={() => select('nl')}
          >
            {t('nav.dutch')}
          </button>
          <button
            type="button"
            role="option"
            aria-selected={current === 'en'}
            className={`lang-dropdown-item${current === 'en' ? ' lang-dropdown-item-active' : ''}`}
            onClick={() => select('en')}
          >
            {t('nav.english')}
          </button>
        </div>
      )}
    </div>
  )
}

export function Nav() {
  const { t } = useTranslation()
  const location = useLocation()
  const [open, setOpen] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [repairsOpen, setRepairsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const isDarkHeroPage = DARK_HERO_PATHS.has(location.pathname)

  useLayoutEffect(() => {
    const el = navRef.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      document.documentElement.style.setProperty('--nav-fixed-bottom', `${rect.bottom}px`)
      document.documentElement.style.setProperty('--nav-h', `${rect.height}px`)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setRepairsOpen(false)
  }, [location.pathname])

  const repairSub = [
    ...REPAIR_BRANDS.map(([slug, name]) => ({ label: name, href: `/reparatie/${slug}` })),
    { label: t('nav.allRepairs'), href: '/reparatie' },
  ]

  const allNavItems = [
    { key: 'repairs', label: t('nav.repairs'), href: '/reparatie', sub: repairSub, desktop: true },
    { key: 'products', label: t('nav.products'), href: '/producten', desktop: true },
    { key: 'business', label: t('nav.business'), href: '/zakelijk', desktop: true },
    { key: 'about', label: t('nav.about'), href: '/over-ons', desktop: false },
    { key: 'reviews', label: t('nav.reviews'), href: '/reviews', desktop: true },
    { key: 'blog', label: t('nav.tipsAdvies'), href: '/blog', desktop: false },
    { key: 'contact', label: t('nav.contact'), href: '/contact', desktop: true },
  ]
  const desktopNavItems = allNavItems.filter(i => i.desktop)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navClassName = [
    'nav',
    scrolled ? 'nav-scrolled' : '',
    !scrolled && isDarkHeroPage ? 'nav-on-dark' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <nav className={navClassName} ref={navRef}>
        <div className="container nav-inner">
          {/* Mobile: hamburger left */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label={t('nav.openMenu')}
          >
            <Icon.Menu width="22" height="22" />
          </button>

          <Logo />

          {/* Desktop links */}
          <ul className="nav-links">
            {desktopNavItems.map((l, i) => (
              <li
                key={l.key}
                className="nav-link"
                onMouseEnter={() => setOpen(i)}
                onMouseLeave={() => setOpen(null)}
              >
                <a href={l.href ?? '#'}>
                  {l.label}
                  {l.sub && <span className="nav-caret">›</span>}
                </a>
                {l.sub && open === i && (
                  <div className="nav-dropdown">
                    {l.sub.map((s, j) => (
                      <a key={j} href={s.href ?? '#'}>
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile: WA + Phone right */}
          <div className="nav-mobile-actions">
            <a href="https://wa.me/31174237022" className="nav-icon-btn nav-icon-wa" aria-label="WhatsApp">
              <Icon.WhatsApp width="20" height="20" />
            </a>
            <a href="tel:0174237022" className="nav-icon-btn nav-icon-phone" aria-label={t('topbar.phone')}>
              <Icon.Phone width="18" height="18" />
            </a>
          </div>

          {/* Desktop CTA + language toggle */}
          <div className="nav-cta">
            <LangToggle />
            <a href="/reparatie" className="nav-repair-pill">
              {t('nav.findRepair')}
            </a>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <div className={`nav-overlay${menuOpen ? ' nav-overlay-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="nav-overlay-header">
          <Logo />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <LangToggle />
            <button
              className="nav-overlay-close"
              onClick={() => setMenuOpen(false)}
              aria-label={t('nav.closeMenu')}
            >
              <Icon.X width="22" height="22" />
            </button>
          </div>
        </div>

        <nav className="nav-overlay-links">
          {allNavItems.map((item) => {
            if (item.sub) {
              return (
                <div className="nav-overlay-accordion" key={item.key}>
                  <button
                    type="button"
                    className="nav-overlay-item nav-overlay-accordion-trigger"
                    onClick={() => setRepairsOpen(o => !o)}
                    aria-expanded={repairsOpen}
                  >
                    <span>{item.label}</span>
                    <Icon.ChevronDown
                      width="18"
                      height="18"
                      className={`nav-overlay-accordion-chevron${repairsOpen ? ' nav-overlay-accordion-chevron-open' : ''}`}
                    />
                  </button>
                  {repairsOpen && (
                    <div className="nav-overlay-accordion-panel">
                      {item.sub.map((s, j) => (
                        <a
                          key={j}
                          href={s.href ?? '#'}
                          className="nav-overlay-subitem"
                          onClick={() => setMenuOpen(false)}
                        >
                          <span>{s.label}</span>
                          <Icon.ArrowRight width="16" height="16" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <a key={item.key} href={item.href ?? '#'} className="nav-overlay-item" onClick={() => setMenuOpen(false)}>
                <span>{item.label}</span>
                <Icon.ArrowRight width="18" height="18" />
              </a>
            )
          })}
        </nav>

        <div className="nav-overlay-bottom">
          <a href="/reparatie" className="nav-overlay-contact" onClick={() => setMenuOpen(false)}>
            <span className="nav-overlay-contact-label">
              <Icon.Wrench width="20" height="20" />
              {t('nav.findRepair')}
            </span>
            <Icon.ArrowRight width="16" height="16" />
          </a>
          <a href="https://wa.me/31174237022" className="nav-overlay-contact">
            <span className="nav-overlay-contact-label">
              <Icon.WhatsApp width="20" height="20" />
              {t('nav.whatsappUs')}
            </span>
            <Icon.ArrowRight width="16" height="16" />
          </a>
          <div className="nav-overlay-rating">
            <Icon.Google width="18" height="18" />
            <div className="stars" style={{ display: 'inline-flex', gap: 2, color: '#fbbf24' }}>
              {[0, 1, 2, 3, 4].map(i => <Icon.Star key={i} width="13" height="13" />)}
            </div>
            <span>4.8 · {t('topbar.reviews', { count: '200+' })}</span>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-overlay-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}

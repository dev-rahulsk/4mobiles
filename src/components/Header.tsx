import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

export function TopBar() {
  const { t } = useTranslation()
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <a href="#" className="topbar-item">
          <Icon.Pin width="14" height="14" />
          <span>{t('topbar.address')}</span>
        </a>
        <a href="#" className="topbar-item topbar-rating">
          <span className="g-mark">G</span>
          <span className="stars">
            {[0,1,2,3,4].map(i => <Icon.Star key={i} width="11" height="11" />)}
          </span>
          <span><b>4.9</b> · {t('topbar.reviews', { count: 487 })}</span>
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
      <span className="logo-mark" aria-hidden="true">
        <span className="logo-mark-inner">4M</span>
      </span>
      <span className="logo-text">
        <span className="logo-name">4Mobiles</span>
        <span className="logo-tag">{t('logo.tag')}</span>
      </span>
    </a>
  )
}

function LangToggle() {
  const { i18n } = useTranslation()
  const current = i18n.language

  const toggle = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  }

  return (
    <div className="lang-toggle">
      <button
        className={`lang-btn${current === 'nl' ? ' lang-btn-active' : ''}`}
        onClick={() => toggle('nl')}
        aria-label="Nederlands"
        title="Nederlands"
      >
        🇳🇱
      </button>
      <button
        className={`lang-btn${current === 'en' ? ' lang-btn-active' : ''}`}
        onClick={() => toggle('en')}
        aria-label="English"
        title="English"
      >
        🇬🇧
      </button>
    </div>
  )
}

export function Nav() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    {
      label: t('nav.repairs'),
      href: '/',
      sub: [
        { label: 'iPhone', icon: '📱', href: '/' },
        { label: 'Samsung', icon: '📱', href: '/' },
        { label: 'iPad', icon: '📟', href: '/' },
        { label: 'OnePlus', icon: '📱', href: '/' },
        { label: 'Xiaomi', icon: '📱', href: '/' },
        { label: t('nav.otherBrands'), icon: '🔧', href: '/' },
      ],
    },
    { label: t('nav.products'), href: '/producten' },
    { label: t('nav.business'), href: '/zakelijk' },
    { label: t('nav.about'), href: '/over-ons' },
    { label: t('nav.reviews'), href: '/reviews' },
    { label: t('nav.blog'), href: '/blog' },
    { label: t('nav.contact'), href: '/contact' },
  ]

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className="nav">
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
            {navItems.map((l, i) => (
              <li
                key={i}
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
                        {s.icon && <span className="nav-dd-icon">{s.icon}</span>}
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
            <a href="/reparatie" className="btn btn-ghost btn-sm">
              <Icon.Search width="16" height="16" />
              {t('nav.findRepair')}
            </a>
            <a href="/reparatie" className="btn btn-primary btn-sm">
              {t('nav.makeAppointment')}
              <Icon.ArrowRight width="14" height="14" />
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
          {navItems.map((item, i) => (
            <a key={i} href={item.href ?? '#'} className="nav-overlay-item" onClick={() => setMenuOpen(false)}>
              <span>{item.label}</span>
              <Icon.ArrowRight width="18" height="18" />
            </a>
          ))}
        </nav>

        <div className="nav-overlay-bottom">
          <a href="https://wa.me/31174237022" className="nav-overlay-contact">
            <Icon.WhatsApp width="20" height="20" />
            {t('nav.whatsappUs')}
          </a>
          <a href="tel:0174237022" className="nav-overlay-contact">
            <Icon.Phone width="20" height="20" />
            {t('topbar.phone')}
          </a>
          <div className="nav-overlay-rating">
            <span className="g-mark">G</span>
            <div className="stars" style={{ display: 'inline-flex', gap: 2, color: '#fbbf24' }}>
              {[0,1,2,3,4].map(i => <Icon.Star key={i} width="13" height="13" />)}
            </div>
            <span>4.9 · {t('topbar.reviews', { count: 487 })}</span>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-overlay-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}

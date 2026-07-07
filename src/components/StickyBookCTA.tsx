import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

export function StickyBookCTA() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down')
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrollDir(y < lastY.current ? 'up' : 'down')
      lastY.current = y
      setVisible(y > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`sticky-book${visible ? ' sticky-book-visible' : ''}${scrollDir === 'up' ? ' sticky-book-up' : ''}`}
      role="region"
      aria-label={t('sticky.ariaLabel')}
    >
      <div className="sticky-book-left">
        <Icon.Clock width="18" height="18" />
        <div>
          <div className="sticky-book-title">{t('sticky.title')}</div>
          <div className="sticky-book-sub">{t('sticky.sub')}</div>
        </div>
      </div>
      <button className="sticky-book-btn">
        {t('sticky.button')}
        <Icon.ArrowRight width="16" height="16" />
      </button>
    </div>
  )
}

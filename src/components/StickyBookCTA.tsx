import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

interface StickyBookCTAProps {
  showAfterRef?: React.RefObject<HTMLElement | null>
}

export function StickyBookCTA({ showAfterRef }: StickyBookCTAProps) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY

      if (showAfterRef?.current) {
        const rect = showAfterRef.current.getBoundingClientRect()
        // Trigger visibility after passing the bottom of the team section
        setVisible(rect.bottom <= window.innerHeight * 0.4)
      } else {
        setVisible(y > window.innerHeight * 0.8)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [showAfterRef])

  return (
    <div className={`mhero-sticky-cta${visible ? ' visible' : ''}`}>
      <button className="mhero-cta" aria-label={t('mhero.stickyAriaLabel')}>
        <Icon.Calendar width="20" height="20" />
        <span>{t('mhero.cta')}</span>
        <Icon.ArrowRight width="18" height="18" />
      </button>
    </div>
  )
}

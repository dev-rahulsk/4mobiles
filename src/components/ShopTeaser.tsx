import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

const ITEM_ICONS = [Icon.Phone, Icon.Shield, Icon.Battery, Icon.Pin]

interface ShopItemProps {
  item: {
    name: string
    count: string
    icon: any
    color: string
  }
}

function ShopCardItem({ item }: ShopItemProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      ref={cardRef}
      href="/producten"
      className={`shop-card shop-card-reveal ${isRevealed ? 'is-revealed' : ''}`}
    >
      <div className="shop-icon" style={{ background: item.color }}>
        <item.icon width="32" height="32" />
      </div>
      <div className="shop-body">
        <h3>{item.name}</h3>
        <p>{item.count}</p>
      </div>
      <div className="shop-arrow">
        <Icon.ArrowRight width="18" height="18" />
      </div>
    </a>
  )
}

export function ShopTeaser() {
  const { t } = useTranslation()

  const items = [0, 1, 2, 3].map((i) => ({
    name:  t(`shop.items.${i}.name`),
    count: t(`shop.items.${i}.count`),
    icon:  ITEM_ICONS[i],
    color: ['#fbbf24', '#60a5fa', '#34d399', '#f472b6'][i],
  }))

  return (
    <section className="section shop">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">{t('shop.eyebrow')}</div>
            <h2 className="section-title">{t('shop.title')}</h2>
          </div>
          <a href="/producten" className="link-arrow">
            {t('shop.viewShop')} <Icon.ArrowRight width="16" height="16" />
          </a>
        </div>
        <div className="shop-grid">
          {items.map((it, i) => (
            <ShopCardItem key={i} item={it} />
          ))}
        </div>
        <div className="shop-cta-row">
          <a href="/producten" className="btn btn-outline">
            {t('shop.viewMore')} <Icon.ArrowRight width="14" height="14" />
          </a>
        </div>
      </div>
    </section>
  )
}

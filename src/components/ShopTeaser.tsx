import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

const ITEM_ICONS = [Icon.Phone, Icon.Shield, Icon.Battery, Icon.Pin]

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
          <a href="/onze-producten" className="link-arrow">
            {t('shop.viewShop')} <Icon.ArrowRight width="16" height="16" />
          </a>
        </div>
        <div className="shop-grid">
          {items.map((it, i) => (
            <a key={i} href="#" className="shop-card">
              <div className="shop-icon" style={{ background: it.color }}>
                <it.icon width="32" height="32" />
              </div>
              <div className="shop-body">
                <h3>{it.name}</h3>
                <p>{it.count}</p>
              </div>
              <div className="shop-arrow"><Icon.ArrowRight width="18" height="18" /></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

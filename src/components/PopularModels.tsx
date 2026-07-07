import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

const MODELS = [
  { name: 'iPhone 15 Pro', screen: '€149', battery: '€119', bg: '#1d1d1f', slug: 'iphone-15-pro' },
  { name: 'iPhone 14',     screen: '€149', battery: '€69',  bg: '#5e5ce6', slug: 'iphone-14' },
  { name: 'iPhone 13',     screen: '€129', battery: '€55',  bg: '#cf2235', slug: 'iphone-13' },
  { name: 'iPhone 12',     screen: '€109', battery: '€49',  bg: '#0a84ff', slug: 'iphone-12' },
  { name: 'iPhone 11',     screen: '€89',  battery: '€45',  bg: '#34c759', slug: 'iphone-11' },
  { name: 'Galaxy S24',    screen: '€169', battery: '€65',  bg: '#7d4f9a', slug: 'galaxy-s24' },
  { name: 'Galaxy A52',    screen: '€99',  battery: '€45',  bg: '#222',    slug: 'galaxy-a52' },
  { name: 'iPad Air',      screen: '€179', battery: '€69',  bg: '#0ea5e9', slug: 'ipad-air' },
]

export function PopularModels() {
  const { t } = useTranslation()
  const [slide, setSlide] = useState(0)
  const startX = useRef(0)
  const perPage = 2
  const maxSlide = MODELS.length - perPage

  const prev = () => setSlide(s => Math.max(0, s - 1))
  const next = () => setSlide(s => Math.min(maxSlide, s + 1))

  const onPointerDown = (e: React.PointerEvent) => { startX.current = e.clientX }
  const onPointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - startX.current
    if (dx > 40) prev()
    else if (dx < -40) next()
  }

  return (
    <section className="section popular-new">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">{t('popular.eyebrow')}</div>
            <h2 className="section-title">
              <span style={{ color: 'var(--accent)' }}>{t('popular.titleAccent')}</span>{' '}{t('popular.title')}
            </h2>
            <p className="section-sub">{t('popular.sub')}</p>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="popular-grid">
          {MODELS.slice(0, 6).map((m, i) => (
            <a key={i} href={`/reparatie/${m.slug}`} className="popular-bar">
              <div className="popular-bar-visual" style={{ background: `linear-gradient(140deg, ${m.bg}, ${m.bg}cc)` }}>
                <div className="popular-bar-phone">
                  <div className="popular-bar-screen" />
                  <div className="popular-bar-notch" />
                </div>
              </div>
              <div className="popular-bar-name">{m.name}</div>
              <div className="popular-bar-prices">
                <div className="popular-price">
                  <span className="popular-price-label">{t('popular.screen')}</span>
                  <span className="popular-price-val">{m.screen}</span>
                </div>
                <div className="popular-price-divider" />
                <div className="popular-price">
                  <span className="popular-price-label">{t('popular.battery')}</span>
                  <span className="popular-price-val">{m.battery}</span>
                </div>
              </div>
              <span className="popular-bar-link">
                {t('popular.viewRepair')} <Icon.ArrowRight width="14" height="14" />
              </span>
            </a>
          ))}
        </div>

        {/* Mobile slider — 2 visible at once */}
        <div
          className="popular-slider"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div
            className="popular-track"
            style={{ transform: `translateX(calc(-${slide * 50}% - ${slide * 8}px))` }}
          >
            {MODELS.map((m, i) => (
              <a key={i} href={`/reparatie/${m.slug}`} className="popular-slide-card">
                <div className="popular-bar-visual" style={{ background: `linear-gradient(140deg, ${m.bg}, ${m.bg}cc)` }}>
                  <div className="popular-bar-phone">
                    <div className="popular-bar-screen" />
                    <div className="popular-bar-notch" />
                  </div>
                </div>
                <div className="popular-slide-body">
                  <div className="popular-bar-name">{m.name}</div>
                  <div className="popular-bar-prices">
                    <div className="popular-price">
                      <span className="popular-price-label">{t('popular.screen')}</span>
                      <span className="popular-price-val">{m.screen}</span>
                    </div>
                    <div className="popular-price-divider" />
                    <div className="popular-price">
                      <span className="popular-price-label">{t('popular.battery')}</span>
                      <span className="popular-price-val">{m.battery}</span>
                    </div>
                  </div>
                  <span className="popular-bar-link">
                    {t('popular.viewRepair')} <Icon.ArrowRight width="13" height="13" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="popular-slider-dots">
          {Array.from({ length: maxSlide + 1 }).map((_, i) => (
            <button
              key={i}
              className={`rv-dot${i === slide ? ' rv-dot-active' : ''}`}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="popular-cta-row">
          <a href="/reparatie" className="btn btn-outline">
            <Icon.Phone width="16" height="16" />
            {t('popular.viewAll')}
            <Icon.ArrowRight width="14" height="14" />
          </a>
        </div>
      </div>
    </section>
  )
}

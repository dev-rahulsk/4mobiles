import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

function useCountUp(target: number, isVisible: boolean) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!isVisible || started.current) return
    started.current = true
    const start = performance.now()
    const duration = 2000
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setCount(Math.round(eased * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isVisible, target])
  return count
}

export function Business() {
  const { t, i18n } = useTranslation()
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const locale = i18n.language === 'nl' ? 'nl-NL' : 'en-US'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const repairs = useCountUp(150, visible)

  const features = [
    { icon: Icon.Wrench, title: t('business.features.0.title'), sub: t('business.features.0.sub') },
    { icon: Icon.Clock,  title: t('business.features.1.title'), sub: t('business.features.1.sub') },
    { icon: Icon.Euro,   title: t('business.features.2.title'), sub: t('business.features.2.sub') },
    { icon: Icon.Shield, title: t('business.features.3.title'), sub: t('business.features.3.sub') },
  ]

  const bullets = [
    t('business.bullets.0'),
    t('business.bullets.1'),
    t('business.bullets.2'),
  ]

  return (
    <section className="section business-new" ref={ref}>
      <div className="container">
        <div className="biz-new-inner">
          <div className="biz-new-content">
            <div className="section-eyebrow light">{t('business.eyebrow')}</div>
            <h2 className="section-title light">
              {t('business.title')}<br />
              {t('business.titleMid')} <span className="biz-accent">{t('business.titleAccent')}</span>
            </h2>
            <p className="biz-new-sub">{t('business.sub')}</p>

            <ul className="biz-new-list">
              {bullets.map((p, i) => (
                <li key={i}><Icon.Check width="16" height="16" /> {p}</li>
              ))}
            </ul>

            <div className="biz-new-ctas">
              <button className="btn btn-accent">
                <Icon.Wrench width="16" height="16" />
                {t('business.ctaPrimary')}
                <Icon.ArrowRight width="14" height="14" />
              </button>
              <button className="btn btn-outline-dark">
                <Icon.Phone width="16" height="16" />
                {t('business.ctaSecondary')}
                <Icon.ArrowRight width="14" height="14" />
              </button>
            </div>

            <div className="biz-new-features">
              {features.map((f, i) => (
                <div key={i} className="biz-new-feature">
                  <div className="biz-new-feature-icon">
                    <f.icon width="18" height="18" />
                  </div>
                  <div>
                    <div className="biz-new-feature-title">{f.title}</div>
                    <div className="biz-new-feature-sub">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="biz-counter-row">
              <div className="biz-counter">
                <div className="biz-counter-icon">
                  <Icon.Wrench width="22" height="22" />
                </div>
                <div>
                  <div className="biz-counter-num">
                    {repairs >= 150 ? '150+' : repairs.toLocaleString(locale)}
                  </div>
                  <div className="biz-counter-label">{t('business.counterLabel')}</div>
                  <div className="biz-counter-sub">{t('business.counterSub')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

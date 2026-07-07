import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

const STEP_META = [
  { num: '01', color: '#22c55e', bgColor: '#dcfce7', icon: Icon.Calendar },
  { num: '02', color: '#3b82f6', bgColor: '#dbeafe', icon: Icon.Search },
  { num: '03', color: '#f59e0b', bgColor: '#fef3c7', icon: Icon.Wrench },
  { num: '04', color: '#a855f7', bgColor: '#f3e8ff', icon: Icon.Shield },
]

export function Process() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)

  const steps = STEP_META.map((meta, i) => ({
    ...meta,
    title:  t(`process.steps.${i}.title`),
    desc:   t(`process.steps.${i}.desc`),
    detail: t(`process.steps.${i}.detail`),
  }))

  return (
    <section className="section process-new">
      <div className="container">
        <div className="process-head">
          <div className="section-eyebrow">
            {t('process.eyebrow')}
          </div>
          <h2 className="section-title">
            {t('process.title')} <span style={{ color: 'var(--accent)' }}>{t('process.titleAccent')}</span>
          </h2>
          <p className="section-sub">{t('process.sub')}</p>
        </div>

        <div className="process-stack">
          {[...steps].reverse().map((step, ri) => {
            const i = steps.length - 1 - ri
            const isActive = i === active
            return (
              <div
                key={step.num}
                className={`stack-card${isActive ? ' stack-card-active' : ''}`}
                style={{
                  '--card-color': step.color,
                  '--card-bg': step.bgColor,
                } as React.CSSProperties}
                onClick={() => setActive(i)}
              >
                <div className="stack-card-header">
                  <div className="stack-badge" style={{ background: step.color }}>
                    {step.num}
                  </div>
                  <div className="stack-icon" style={{ color: step.color, background: step.bgColor }}>
                    <step.icon width="18" height="18" />
                  </div>
                  <div className="stack-title">{step.title}</div>
                  <div className="stack-arrow">
                    <Icon.ArrowRight width="16" height="16" />
                  </div>
                </div>

                {isActive && (
                  <div className="stack-card-body">
                    <div className="stack-divider" style={{ background: step.color }} />
                    <div className="stack-content">
                      <div className="stack-text">
                        <p className="stack-desc">{step.desc}</p>
                        <div className="stack-detail">
                          <Icon.Check width="14" height="14" style={{ color: step.color }} />
                          {step.detail}
                        </div>
                      </div>
                      <div
                        className="stack-image"
                        style={{ background: `linear-gradient(135deg, ${step.bgColor}, ${step.color}33)` }}
                      >
                        <div className="stack-image-placeholder">
                          <step.icon width="40" height="40" style={{ color: step.color, opacity: 0.5 }} />
                          <span style={{ color: step.color, fontSize: 12, opacity: 0.7, marginTop: 8 }}>
                            4MOBILES
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

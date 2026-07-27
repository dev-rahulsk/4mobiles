import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import card1 from '../assets/card 1.png'
import card2 from '../assets/card 2.png'
import card3 from '../assets/card 3.png'
import card4 from '../assets/card 4.png'

const CARDS = [
  { id: 1, img: card1, alt: 'Step 1: Afspraak', cls: 'peel-card-item--card1' },
  { id: 2, img: card2, alt: 'Step 2: Diagnose', cls: '' },
  { id: 3, img: card3, alt: 'Step 3: Reparatie', cls: 'peel-card-item--card3' },
  { id: 4, img: card4, alt: 'Step 4: Resultaat', cls: '' },
]

export function Process() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const targetProgress = useRef(0)
  const currentProgress = useRef(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScroll = rect.height - windowHeight

      if (totalScroll <= 0) return

      const current = -rect.top
      const raw = current / totalScroll
      targetProgress.current = Math.max(0, Math.min(1, raw))
    }

    const updateLoop = () => {
      const diff = targetProgress.current - currentProgress.current
      if (Math.abs(diff) > 0.0001) {
        currentProgress.current += diff * 0.08
        setProgress(currentProgress.current)
      } else if (currentProgress.current !== targetProgress.current) {
        currentProgress.current = targetProgress.current
        setProgress(targetProgress.current)
      }
      rafId.current = requestAnimationFrame(updateLoop)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    rafId.current = requestAnimationFrame(updateLoop)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const numCards = CARDS.length
  const totalSegments = numCards - 1 // 3 peel segments

  // Calculate active segment and segment progress
  const activeSegment = Math.min(totalSegments - 1, Math.floor(progress * totalSegments))
  const segmentStart = activeSegment / totalSegments
  const segmentEnd = (activeSegment + 1) / totalSegments
  const segmentProgress = Math.max(0, Math.min(1, (progress - segmentStart) / (segmentEnd - segmentStart)))

  return (
    <section ref={sectionRef} className="process-peel-section">
      <div className="process-sticky-container">
        <div className="container">
          <div className="process-head">
            <div className="section-eyebrow">{t('process.eyebrow')}</div>
            <h2 className="section-title">
              {t('process.title')} <span style={{ color: 'var(--accent)' }}>{t('process.titleAccent')}</span>
            </h2>
            <p className="section-sub">{t('process.sub')}</p>
          </div>

          <div className="peel-stack-wrapper">
            {CARDS.map((card, idx) => {
              // Strict Z-Index: Card 0 is 100, Card 1 is 90, Card 2 is 80, Card 3 is 70
              const zIndex = 100 - idx * 10
              const isPeeled = idx < activeSegment
              const isActive = idx === activeSegment

              if (isPeeled) {
                // Completely peeled off -> hidden above stack
                return (
                  <div
                    key={card.id}
                    className={`peel-card-item ${card.cls}`}
                    style={{
                      zIndex,
                      opacity: 0,
                      visibility: 'hidden',
                      pointerEvents: 'none',
                    }}
                  >
                    <img src={card.img} alt={card.alt} className="peel-card-img" />
                  </div>
                )
              }

              if (isActive) {
                // Active card peeling off upwards
                const p = segmentProgress
                const ease = p * p * (3 - 2 * p)
                const translateY = -ease * 125
                const rotateDeg = -ease * 3
                const scale = 1 - ease * 0.04
                const opacity = Math.max(0, 1 - ease * 1.15)

                return (
                  <div
                    key={card.id}
                    className={`peel-card-item ${card.cls}`}
                    style={{
                      zIndex,
                      opacity,
                      visibility: opacity <= 0.01 ? 'hidden' : 'visible',
                      transform: `translate3d(0, ${translateY.toFixed(2)}%, 0) rotate(${rotateDeg.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
                    }}
                  >
                    <img src={card.img} alt={card.alt} className="peel-card-img" />
                  </div>
                )
              }

              // Waiting cards in stack below
              const stackIndex = idx - activeSegment
              const effectivePos = stackIndex - segmentProgress
              const translateY = effectivePos * 20
              const scale = 1 - effectivePos * 0.025

              return (
                <div
                  key={card.id}
                  className={`peel-card-item ${card.cls}`}
                  style={{
                    zIndex,
                    opacity: 1,
                    visibility: 'visible',
                    transform: `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`,
                  }}
                >
                  <img src={card.img} alt={card.alt} className="peel-card-img" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

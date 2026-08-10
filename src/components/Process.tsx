import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

import newcard1 from '../assets/newcard1.png'
import newcard2 from '../assets/newcard2.png'
import newcard3 from '../assets/newcard3.png'
import newcard4 from '../assets/newcard4.png'

const CARDS = [
  { id: 1, img: newcard1, colorKey: 'c1', StepIcon: Icon.Calendar, FooterIcon: Icon.Pin },
  { id: 2, img: newcard2, colorKey: 'c2', StepIcon: Icon.Search, FooterIcon: Icon.ClipboardCheck },
  { id: 3, img: newcard3, colorKey: 'c3', StepIcon: Icon.Wrench, FooterIcon: Icon.Clock },
  { id: 4, img: newcard4, colorKey: 'c4', StepIcon: Icon.Rocket, FooterIcon: Icon.ShieldCheck },
]

const REVEAL_DELAY_STEP = 120
const REVEAL_DURATION = 560
const REVEAL_TRAVEL_DESKTOP = 22
const REVEAL_TRAVEL_MOBILE = 20
const REVEAL_TILT_DESKTOP = 0
const REVEAL_TILT_MOBILE = 0

function makeCubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const A = (a1: number, a2: number) => 1 - 3 * a2 + 3 * a1
  const B = (a1: number, a2: number) => 3 * a2 - 6 * a1
  const C = (a1: number) => 3 * a1

  const calcBezier = (t: number, a1: number, a2: number) => ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t
  const getSlope = (t: number, a1: number, a2: number) => 3 * A(a1, a2) * t * t + 2 * B(a1, a2) * t + C(a1)

  function getTForX(x: number) {
    let t = x
    for (let i = 0; i < 8; i++) {
      const slope = getSlope(t, x1, x2)
      if (slope === 0) break
      t -= (calcBezier(t, x1, x2) - x) / slope
    }
    return t
  }

  return (x: number) => calcBezier(getTForX(x), y1, y2)
}

const easeOutPremium = makeCubicBezier(0.22, 1, 0.36, 1)

function ProcessPeelStack({ variant }: { variant: 'desktop' | 'mobile' }) {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [revealMs, setRevealMs] = useState<number | null>(null)

  const targetProgress = useRef(0)
  const currentProgress = useRef(0)
  const rafId = useRef<number | null>(null)
  const revealStart = useRef<number | null>(null)
  const revealRafId = useRef<number | null>(null)
  const hasRevealed = useRef(false)

  const steps = t('process.steps', { returnObjects: true }) as { title: string; desc: string; detail: string }[]
  const revealTravel = variant === 'desktop' ? REVEAL_TRAVEL_DESKTOP : REVEAL_TRAVEL_MOBILE
  const revealTilt = variant === 'desktop' ? REVEAL_TILT_DESKTOP : REVEAL_TILT_MOBILE

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const pinnedHeight = stickyRef.current?.offsetHeight ?? window.innerHeight
      const totalScroll = rect.height - pinnedHeight

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

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRevealed.current) {
          hasRevealed.current = true
          revealStart.current = performance.now()

          const tick = (now: number) => {
            const elapsed = now - (revealStart.current ?? now)
            setRevealMs(elapsed)
            const totalDuration = REVEAL_DELAY_STEP * (CARDS.length - 1) + REVEAL_DURATION
            if (elapsed < totalDuration) {
              revealRafId.current = requestAnimationFrame(tick)
            }
          }
          revealRafId.current = requestAnimationFrame(tick)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    io.observe(el)
    return () => {
      io.disconnect()
      if (revealRafId.current) cancelAnimationFrame(revealRafId.current)
    }
  }, [])

  const numCards = CARDS.length
  const totalSegments = numCards - 1

  const activeSegment = Math.min(totalSegments - 1, Math.floor(progress * totalSegments))
  const segmentStart = activeSegment / totalSegments
  const segmentEnd = (activeSegment + 1) / totalSegments
  const segmentProgress = Math.max(0, Math.min(1, (progress - segmentStart) / (segmentEnd - segmentStart)))

  return (
    <section
      ref={sectionRef}
      className={`process-peel-section ${variant === 'desktop' ? 'process-desktop-only' : 'process-mobile-only'}`}
    >
      <div className="process-sticky-container" ref={stickyRef}>
        <div className="container">
          <div className="process-head">
            <div className="section-eyebrow">{t('process.eyebrow')}</div>
            <h2 className="section-title">
              {t('process.title')} <span style={{ color: 'var(--accent)' }}>{t('process.titleAccent')}</span>
            </h2>
            <p className="section-sub">{t('process.sub')}</p>
          </div>

          <div className="peel-stack-wrapper" ref={wrapperRef}>
            {CARDS.map((card, idx) => {
              const step = steps[idx]
              const [detailStrong, detailRest] = (step?.detail || '').split(' · ')

              let revealEase = 0
              if (revealMs !== null) {
                const delay = idx * REVEAL_DELAY_STEP
                const local = Math.max(0, Math.min(REVEAL_DURATION, revealMs - delay))
                revealEase = easeOutPremium(local / REVEAL_DURATION)
              }
              const revealTranslate = (1 - revealEase) * revealTravel
              // Right side lifts more than left as the card settles in
              const revealRotate = -(1 - revealEase) * revealTilt

              const zIndex = 100 - idx * 10
              const isPeeled = idx < activeSegment
              const isActive = idx === activeSegment

              const cardContent = (
                <>
                  <img src={card.img} alt={step?.title} className="peel-card-photo" />
                  <div className="peel-card-overlay" />
                  <div className="peel-card-content">
                    <div className="peel-card-badges">
                      <div className="peel-card-num">{String(card.id).padStart(2, '0')}</div>
                      <div className="peel-card-icon">
                        <card.StepIcon />
                      </div>
                    </div>
                    <h3 className="peel-card-title">{step?.title}</h3>
                    <div className="peel-card-divider" />
                    <p className="peel-card-desc">{step?.desc}</p>
                    <div className="peel-card-footer">
                      <card.FooterIcon className="peel-card-footer-icon" />
                      <span className="peel-card-footer-text">
                        <strong>{detailStrong}</strong>
                        {detailRest ? <> · {detailRest}</> : null}
                      </span>
                    </div>
                  </div>
                </>
              )

              if (isPeeled) {
                return (
                  <div
                    key={card.id}
                    className={`peel-card-item peel-card-item--${card.colorKey} is-peeled`}
                    style={{
                      zIndex,
                      opacity: 0,
                      visibility: 'hidden',
                      pointerEvents: 'none',
                    }}
                  >
                    {cardContent}
                  </div>
                )
              }

              if (isActive) {
                const p = segmentProgress
                const ease = p * p * (3 - 2 * p)
                const translateYPct = -ease * 137.5
                const rotateDeg = -ease * 10 + revealRotate
                const scale = 1 - ease * 0.044
                const opacity = Math.max(0, 1 - ease * 1.15) * revealEase

                return (
                  <div
                    key={card.id}
                    className={`peel-card-item peel-card-item--${card.colorKey} is-active`}
                    style={{
                      zIndex,
                      opacity,
                      // Hidden well before opacity hits 0 so the fading outgoing card
                      // doesn't linger semi-transparent and blend/muddy with the card
                      // underneath — the transform/opacity trajectory itself is unchanged.
                      visibility: opacity <= 0.4 ? 'hidden' : 'visible',
                      transform: `translate3d(0, calc(${translateYPct.toFixed(2)}% + ${revealTranslate.toFixed(2)}px), 0) rotate(${rotateDeg.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
                    }}
                  >
                    {cardContent}
                  </div>
                )
              }

              const stackIndex = idx - activeSegment
              const effectivePos = stackIndex - segmentProgress
              const translateY = effectivePos * 22 + revealTranslate
              const scale = 1 - effectivePos * 0.0275

              return (
                <div
                  key={card.id}
                  className={`peel-card-item peel-card-item--${card.colorKey} is-waiting`}
                  style={{
                    zIndex,
                    opacity: revealEase,
                    visibility: 'visible',
                    transform: `translate3d(0, ${translateY.toFixed(2)}px, 0) rotate(${revealRotate.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
                  }}
                >
                  {cardContent}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <>
      <ProcessPeelStack variant="desktop" />
      <ProcessPeelStack variant="mobile" />
    </>
  )
}

import { useEffect, useRef } from 'react'

const rawFrames = import.meta.glob(
  '../assets/frames_no_bg/*.png',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const FRAME_SRCS: string[] = Object.keys(rawFrames).sort().map(k => rawFrames[k])
const FRAME_COUNT = FRAME_SRCS.length
const FPS = 24
const FRAME_INTERVAL = 1000 / FPS

// Source frame dimensions
const SRC_W = 1440
const SRC_H = 960

export function PhoneAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const images = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null))
  const frameIdx = useRef(0)
  const lastTime = useRef(0)
  const loadedCount = useRef(0)

  // Preload all frames
  useEffect(() => {
    FRAME_SRCS.forEach((src, i) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        images.current[i] = img
        loadedCount.current++
      }
    })
  }, [])

  // Animation loop
  useEffect(() => {
    let animId: number

    const render = (ts: number) => {
      animId = requestAnimationFrame(render)
      if (ts - lastTime.current < FRAME_INTERVAL) return
      lastTime.current = ts

      const canvas = canvasRef.current
      if (!canvas) return

      const img = images.current[frameIdx.current]
      if (!img) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Keep canvas pixel buffer in sync with its CSS display size
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      if (w === 0 || h === 0) return

      ctx.clearRect(0, 0, w, h)

      // Draw frame "contain"-style: centered, aspect-ratio preserved
      const scale = Math.min(w / SRC_W, h / SRC_H)
      const dx = (w - SRC_W * scale) / 2
      const dy = (h - SRC_H * scale) / 2
      ctx.drawImage(img, dx, dy, SRC_W * scale, SRC_H * scale)

      frameIdx.current = (frameIdx.current + 1) % FRAME_COUNT
    }

    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}

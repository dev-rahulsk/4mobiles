import { useEffect } from 'react'
import { AnnouncementBar } from './AnnouncementBar'
import { TopBar, Nav } from './Header'
import { Footer } from './Footer'
import { StickyBookCTA } from './StickyBookCTA'

const ACCENT = '#7AB827'
const ACCENT_DARK = '#5e9020'

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const r = document.documentElement.style
    r.setProperty('--accent', ACCENT)
    r.setProperty('--accent-dark', ACCENT_DARK)
    const hex = ACCENT.replace('#', '')
    const rr = parseInt(hex.substring(0, 2), 16)
    const gg = parseInt(hex.substring(2, 4), 16)
    const bb = parseInt(hex.substring(4, 6), 16)
    r.setProperty('--accent-soft', `rgba(${rr},${gg},${bb},0.12)`)
    r.setProperty('--accent-glow', `rgba(${rr},${gg},${bb},0.20)`)
  }, [])

  return (
    <>
      <AnnouncementBar />
      <TopBar />
      <Nav />
      <main>{children}</main>
      <Footer />
      <StickyBookCTA />
    </>
  )
}

export { ACCENT, ACCENT_DARK }

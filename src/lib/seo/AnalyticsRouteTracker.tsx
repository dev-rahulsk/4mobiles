import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { initGtm, pushPageview } from './analytics'

export function AnalyticsRouteTracker() {
  const location = useLocation()
  const started = useRef(false)

  useEffect(() => {
    if (!started.current) {
      initGtm()
      started.current = true
    }
    const id = window.setTimeout(() => {
      pushPageview(location.pathname + location.search, document.title)
    }, 0)
    return () => window.clearTimeout(id)
  }, [location.pathname, location.search])

  return null
}

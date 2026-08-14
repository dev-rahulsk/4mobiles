// GTM/GA4 wiring for the SPA. Disabled (all no-ops) until VITE_GTM_ID is set, so nothing
// fake ships in code. Configure the actual GA4 tag inside the GTM container itself —
// this file only handles container loading + SPA page_view events.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

const GTM_ID = import.meta.env.VITE_GTM_ID

let injected = false

export function initGtm() {
  if (!GTM_ID || injected) return
  injected = true

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)

  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.cssText = 'display:none;visibility:hidden'
  const noscript = document.createElement('noscript')
  noscript.appendChild(iframe)
  document.body.insertBefore(noscript, document.body.firstChild)
}

/**
 * Fire on the initial route AND every SPA navigation. The GTM container must use this
 * custom `page_view` dataLayer event (not the built-in "All Pages" trigger) as the
 * trigger for the GA4 Configuration/page_view tag — otherwise the first load double-fires.
 */
export function pushPageview(path: string, title: string) {
  if (!GTM_ID) return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({
    event: 'page_view',
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  })
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!GTM_ID) return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event: name, ...params })
}

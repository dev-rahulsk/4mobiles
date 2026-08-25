import { useTranslation } from 'react-i18next'
import siteConfig from './site.config.json'

export const SITE_URL = siteConfig.siteUrl

export const SITE_NAME = siteConfig.siteName

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`

export const BUSINESS = {
  ...siteConfig.business,
  geo: undefined as { latitude: number; longitude: number } | undefined,
}

export const fullAddress = `${BUSINESS.streetAddress}, ${BUSINESS.postalCode} ${BUSINESS.addressLocality}`

export function isEnglishPath(pathname: string = typeof window !== 'undefined' ? window.location.pathname : '/'): boolean {
  return /^\/en(\/|$)/.test(pathname)
}

function withEnglishPrefix(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return normalized === '/' ? '/en' : `/en${normalized}`
}

export function absoluteUrl(path: string): string {
  const localized = isEnglishPath() ? withEnglishPrefix(path) : (path.startsWith('/') ? path : `/${path}`)
  return `${SITE_URL}${localized}`
}

export function hreflangUrls(path: string): { nl: string; en: string } {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return {
    nl: `${SITE_URL}${normalized}`,
    en: `${SITE_URL}${withEnglishPrefix(normalized)}`,
  }
}

export function localizePath(path: string, lang: string): string {
  return lang === 'en' ? withEnglishPrefix(path) : path
}

export function useLocalizedPath() {
  const { i18n } = useTranslation()
  return (path: string) => localizePath(path, i18n.language)
}

import siteConfig from './site.config.json'

export const SITE_URL = siteConfig.siteUrl

export const SITE_NAME = siteConfig.siteName

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`

export const BUSINESS = {
  ...siteConfig.business,
  geo: undefined as { latitude: number; longitude: number } | undefined,
}

export const fullAddress = `${BUSINESS.streetAddress}, ${BUSINESS.postalCode} ${BUSINESS.addressLocality}`

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

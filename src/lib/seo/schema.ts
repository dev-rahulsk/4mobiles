import { absoluteUrl, BUSINESS, SITE_NAME, SITE_URL } from './constants'

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.addressLocality,
      addressCountry: BUSINESS.addressCountry,
    },
    ...(BUSINESS.geo ? { geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo } } : {}),
    openingHoursSpecification: BUSINESS.openingHours.map(h => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: { '@type': 'AdministrativeArea', name: 'Westland, Zuid-Holland, Nederland' },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#business` },
  }
}

export interface BreadcrumbEntry {
  name: string
  path: string
}

export function breadcrumbSchema(items: BreadcrumbEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export interface FaqEntry {
  q: string
  a: string
}

/** Only pass genuine, visible Q&A content — never invented or off-topic questions. */
export function faqPageSchema(items: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export interface BlogPostingInput {
  title: string
  description: string
  path: string
  datePublished?: string
}

export function blogPostingSchema({ title, description, path, datePublished }: BlogPostingInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: absoluteUrl(path),
    ...(datePublished ? { datePublished } : {}),
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@id': `${SITE_URL}/#business` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
  }
}

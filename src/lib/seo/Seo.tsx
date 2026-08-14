import { Helmet } from 'react-helmet-async'
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from './constants'

interface SeoProps {
  title: string
  description: string
  /** Path only, e.g. "/regio/den-haag" — turned into an absolute canonical URL. */
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  children?: React.ReactNode
}

export function Seo({ title, description, path, image = DEFAULT_OG_IMAGE, type = 'website', noindex = false, children }: SeoProps) {
  const url = absoluteUrl(path)

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {children}
    </Helmet>
  )
}

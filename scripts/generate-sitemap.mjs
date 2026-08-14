import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const siteConfig = JSON.parse(readFileSync(path.join(root, 'src/lib/seo/site.config.json'), 'utf-8'))
const nl = JSON.parse(readFileSync(path.join(root, 'src/i18n/nl.json'), 'utf-8'))
const brandSlugs = Object.keys(JSON.parse(readFileSync(path.join(root, 'src/lib/seo/reparatie-brands.json'), 'utf-8')))

const SITE_URL = siteConfig.siteUrl

const STATIC_ROUTES = [
  ['/', 'weekly'],
  ['/over-ons', 'monthly'],
  ['/reviews', 'weekly'],
  ['/contact', 'monthly'],
  ['/regio', 'monthly'],
  ['/producten', 'weekly'],
  ['/zakelijk', 'monthly'],
  ['/blog', 'weekly'],
  ['/reparatie', 'monthly'],
  ['/veelgestelde-vragen', 'monthly'],
]

const cityRoutes = (nl.regio?.cities ?? [])
  .filter(c => !c.isHome)
  .map(c => [`/regio/${c.slug}`, 'monthly'])

const blogRoutes = (nl.blog?.articles ?? [])
  .map(a => [`/blog/${a.slug}`, 'yearly'])

const brandRoutes = brandSlugs.map(slug => [`/reparatie/${slug}`, 'monthly'])

const urls = [...STATIC_ROUTES, ...cityRoutes, ...blogRoutes, ...brandRoutes]

const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([p, freq]) => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
  </url>`).join('\n')}
</urlset>
`

writeFileSync(path.join(root, 'public/sitemap.xml'), xml)

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

writeFileSync(path.join(root, 'public/robots.txt'), robots)

console.log(`Generated sitemap.xml with ${urls.length} URLs and robots.txt.`)

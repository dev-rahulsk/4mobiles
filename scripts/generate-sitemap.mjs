import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const siteConfig = JSON.parse(readFileSync(path.join(root, 'src/lib/seo/site.config.json'), 'utf-8'))
const nl = JSON.parse(readFileSync(path.join(root, 'src/i18n/nl.json'), 'utf-8'))
const brandSlugs = Object.keys(JSON.parse(readFileSync(path.join(root, 'src/lib/seo/reparatie-brands.json'), 'utf-8')))
const repairCatalog = JSON.parse(readFileSync(path.join(root, 'src/lib/seo/repair-catalog.json'), 'utf-8'))

const SITE_URL = siteConfig.siteUrl

const PAGE_ROUTES = [
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

const modelSlugs = Object.values(repairCatalog.models).flat().map(m => `${m.id}-reparatie`)
const MODEL_ROUTES = [...brandSlugs, ...modelSlugs].map(slug => [`/reparatie/${slug}`, 'monthly'])

const REGION_ROUTES = (nl.regio?.cities ?? [])
  .filter(c => !c.isHome)
  .map(c => [`/regio/${c.slug}`, 'monthly'])

const KNOWLEDGE_ROUTES = (nl.blog?.articles ?? [])
  .map(a => [`/blog/${a.slug}`, 'yearly'])

const today = new Date().toISOString().slice(0, 10)

function withEnglishMirror(routes) {
  return [...routes, ...routes.map(([p, freq]) => [`/en${p === '/' ? '' : p}`, freq])]
}

function urlsetXml(routes) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(([p, freq]) => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
  </url>`).join('\n')}
</urlset>
`
}

const sitemaps = {
  'sitemap-pages.xml': withEnglishMirror(PAGE_ROUTES),
  'sitemap-models.xml': withEnglishMirror(MODEL_ROUTES),
  'sitemap-regions.xml': withEnglishMirror(REGION_ROUTES),
  'sitemap-knowledge.xml': withEnglishMirror(KNOWLEDGE_ROUTES),
}

let totalUrls = 0
for (const [filename, routes] of Object.entries(sitemaps)) {
  writeFileSync(path.join(root, 'public', filename), urlsetXml(routes))
  totalUrls += routes.length
}

const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(sitemaps).map(filename => `  <sitemap>
    <loc>${SITE_URL}/${filename}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>
`
writeFileSync(path.join(root, 'public/sitemap-index.xml'), sitemapIndexXml)

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
`
writeFileSync(path.join(root, 'public/robots.txt'), robots)

console.log(`Generated sitemap-index.xml + 4 child sitemaps (${totalUrls} URLs total) and robots.txt.`)
console.log(Object.entries(sitemaps).map(([f, r]) => `  ${f}: ${r.length} URLs`).join('\n'))

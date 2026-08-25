const STATIC_ROUTES = new Set([
  '/', '/over-ons', '/reviews', '/contact', '/regio', '/producten', '/zakelijk',
  '/blog', '/reparatie', '/veelgestelde-vragen', '/login', '/mijn-reparatie',
  '/disclaimer', '/privacy', '/privacybeleid', '/algemene-voorwaarden', '/terms',
])

const DYNAMIC_PREFIXES = ['/regio/', '/reparatie/', '/blog/']

function isKnownAppRoute(pathname) {
  let path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  if (path === '/en') path = '/'
  else if (path.startsWith('/en/')) path = path.slice('/en'.length)
  if (STATIC_ROUTES.has(path)) return true
  return DYNAMIC_PREFIXES.some(prefix => path.startsWith(prefix) && path.length > prefix.length)
}

const PRODUCTION_HOSTNAMES = new Set(['www.4mobiles.nl', '4mobiles.nl'])

const STAGING_ROBOTS_TXT = 'User-agent: *\nDisallow: /\n'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const isProduction = PRODUCTION_HOSTNAMES.has(url.hostname)

    if (!isProduction && url.pathname === '/robots.txt') {
      return new Response(STAGING_ROBOTS_TXT, {
        headers: { 'content-type': 'text/plain', 'x-robots-tag': 'noindex, nofollow' },
      })
    }

    const assetResponse = await env.ASSETS.fetch(request)

    let response
    if (assetResponse.status !== 404) {
      response = assetResponse
    } else {
      const status = isKnownAppRoute(url.pathname) ? 200 : 404

      const shell = await env.ASSETS.fetch(new Request(new URL('/', request.url), request))
      const headers = new Headers(shell.headers)
      headers.delete('location')
      response = new Response(shell.body, {
        status,
        statusText: status === 404 ? 'Not Found' : 'OK',
        headers,
      })
    }

    if (!isProduction) {
      const headers = new Headers(response.headers)
      headers.set('x-robots-tag', 'noindex, nofollow')
      response = new Response(response.body, { status: response.status, statusText: response.statusText, headers })
    }

    return response
  },
}

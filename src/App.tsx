import { useEffect, lazy, Suspense } from 'react'
import type { ComponentType } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { JsonLd } from './lib/seo/JsonLd'
import { localBusinessSchema, websiteSchema } from './lib/seo/schema'
import { AnalyticsRouteTracker } from './lib/seo/AnalyticsRouteTracker'

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })))
const AboutUs = lazy(() => import('./pages/AboutUs').then(m => ({ default: m.AboutUs })))
const Reviews = lazy(() => import('./pages/Reviews').then(m => ({ default: m.Reviews })))
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })))
const Regio = lazy(() => import('./pages/Regio').then(m => ({ default: m.Regio })))
const RegioCity = lazy(() => import('./pages/RegioCity').then(m => ({ default: m.RegioCity })))
const Producten = lazy(() => import('./pages/Producten').then(m => ({ default: m.Producten })))
const Zakelijk = lazy(() => import('./pages/Zakelijk').then(m => ({ default: m.Zakelijk })))
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })))
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })))
const Reparatie = lazy(() => import('./pages/Reparatie').then(m => ({ default: m.Reparatie })))
const Faq = lazy(() => import('./pages/Faq').then(m => ({ default: m.Faq })))
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })))
const Disclaimer = lazy(() => import('./pages/Disclaimer').then(m => ({ default: m.Disclaimer })))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions').then(m => ({ default: m.TermsAndConditions })))
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))

function RouteLoading() {
  return <div className="route-loading" aria-hidden="true" />
}

interface RouteDef {
  index?: true
  path?: string
  Component: ComponentType
}

const ROUTE_DEFS: RouteDef[] = [
  { index: true, Component: Home },
  { path: 'over-ons', Component: AboutUs },
  { path: 'reviews', Component: Reviews },
  { path: 'contact', Component: Contact },
  { path: 'regio', Component: Regio },
  { path: 'regio/:city', Component: RegioCity },
  { path: 'producten', Component: Producten },
  { path: 'zakelijk', Component: Zakelijk },
  { path: 'blog', Component: Blog },
  { path: 'blog/:slug', Component: BlogPost },
  { path: 'reparatie', Component: Reparatie },
  { path: 'reparatie/:slug', Component: Reparatie },
  { path: 'veelgestelde-vragen', Component: Faq },
  { path: 'login', Component: Login },
  { path: 'mijn-reparatie', Component: Login },
  { path: 'disclaimer', Component: Disclaimer },
  { path: 'privacy', Component: PrivacyPolicy },
  { path: 'privacybeleid', Component: PrivacyPolicy },
  { path: 'algemene-voorwaarden', Component: TermsAndConditions },
  { path: 'terms', Component: TermsAndConditions },
]

function renderRouteDefs() {
  return ROUTE_DEFS.map(r => (
    <Route key={r.path ?? 'index'} index={r.index} path={r.path} element={<r.Component />} />
  ))
}

function LocaleLayout({ lang }: { lang: 'nl' | 'en' }) {
  const { i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang)
  }, [lang, i18n])

  return <Outlet />
}

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
    return () => clearTimeout(timer)
  }, [location.pathname, location.hash])

  return null
}

function HtmlLangSync() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <HtmlLangSync />
      <ScrollToHash />
      <AnalyticsRouteTracker />
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={websiteSchema()} />
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route element={<LocaleLayout lang="nl" />}>
            {renderRouteDefs()}
          </Route>
          <Route path="/en" element={<LocaleLayout lang="en" />}>
            {renderRouteDefs()}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

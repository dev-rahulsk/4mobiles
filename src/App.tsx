import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home } from './pages/Home'
import { AboutUs } from './pages/AboutUs'
import { Reviews } from './pages/Reviews'
import { Contact } from './pages/Contact'
import { Regio } from './pages/Regio'
import { RegioCity } from './pages/RegioCity'
import { Producten } from './pages/Producten'
import { Zakelijk } from './pages/Zakelijk'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { Reparatie } from './pages/Reparatie'
import { Faq } from './pages/Faq'
import { Login } from './pages/Login'
import { Disclaimer } from './pages/Disclaimer'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsAndConditions } from './pages/TermsAndConditions'
import { NotFound } from './pages/NotFound'
import { JsonLd } from './lib/seo/JsonLd'
import { localBusinessSchema, websiteSchema } from './lib/seo/schema'
import { AnalyticsRouteTracker } from './lib/seo/AnalyticsRouteTracker'

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/over-ons" element={<AboutUs />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/regio" element={<Regio />} />
        <Route path="/regio/:city" element={<RegioCity />} />
        <Route path="/producten" element={<Producten />} />
        <Route path="/zakelijk" element={<Zakelijk />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/reparatie" element={<Reparatie />} />
        <Route path="/reparatie/:slug" element={<Reparatie />} />
        <Route path="/veelgestelde-vragen" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mijn-reparatie" element={<Login />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/privacybeleid" element={<PrivacyPolicy />} />
        <Route path="/algemene-voorwaarden" element={<TermsAndConditions />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

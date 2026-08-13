import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import { AboutUs } from './pages/AboutUs'
import { Reviews } from './pages/Reviews'
import { Contact } from './pages/Contact'
import { Regio } from './pages/Regio'
import { Producten } from './pages/Producten'
import { Zakelijk } from './pages/Zakelijk'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { Reparatie } from './pages/Reparatie'
import { Faq } from './pages/Faq'

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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/over-ons" element={<AboutUs />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/regio" element={<Regio />} />
        <Route path="/regio/:city" element={<Regio />} />
        <Route path="/producten" element={<Producten />} />
        <Route path="/zakelijk" element={<Zakelijk />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/reparatie" element={<Reparatie />} />
        <Route path="/reparatie/:slug" element={<Reparatie />} />
        <Route path="/veelgestelde-vragen" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  )
}

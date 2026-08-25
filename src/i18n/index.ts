import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import nl from './nl.json'
import en from './en.json'

const initialLang = typeof window !== 'undefined' && /^\/en(\/|$)/.test(window.location.pathname)
  ? 'en'
  : 'nl'

i18n.use(initReactI18next).init({
  resources: {
    nl: { translation: nl },
    en: { translation: en },
  },
  lng: initialLang,
  fallbackLng: 'nl',
  interpolation: { escapeValue: false },
})

export default i18n

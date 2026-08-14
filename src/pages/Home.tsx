import { useTranslation } from 'react-i18next'
import { Layout, ACCENT } from '../components/Layout'
import { Hero } from '../components/Hero'
import { MobileHero } from '../components/MobileHero'
import { SearchModule } from '../components/SearchModule'
import { PopularModels } from '../components/PopularModels'
import { Process } from '../components/Process'
import { ReviewsHero } from '../components/ReviewsHero'
import { Reviews } from '../components/Reviews'
import { Business } from '../components/Business'
import { ShopTeaser } from '../components/ShopTeaser'
import { FAQ } from '../components/FAQ'
import { Locations } from '../components/Locations'
import { Seo } from '../lib/seo/Seo'
import { JsonLd } from '../lib/seo/JsonLd'
import { faqPageSchema, type FaqEntry } from '../lib/seo/schema'

export function Home() {
  const { t } = useTranslation()
  const faqItems = t('faq.items', { returnObjects: true }) as FaqEntry[]

  return (
    <Layout>
      <Seo title={t('seo.home.title')} description={t('seo.home.description')} path="/" />
      <JsonLd data={faqPageSchema(faqItems)} />
      <Hero accent={ACCENT} />
      <MobileHero accent={ACCENT} />
      <SearchModule />
      <PopularModels />
      <Process />
      <ReviewsHero />
      <Reviews />
      <ShopTeaser />
      <Business />
      <FAQ />
      <Locations />
    </Layout>
  )
}

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

export function Home() {
  return (
    <Layout>
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

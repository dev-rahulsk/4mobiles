import { Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout, ACCENT } from '../components/Layout'
import { Hero } from '../components/Hero'
import { MobileHero } from '../components/MobileHero'
import { RegionalServiceBlock } from '../components/RegionalServiceBlock'
import { SearchModule } from '../components/SearchModule'
import { PopularModels } from '../components/PopularModels'
import { Process } from '../components/Process'
import { ReviewsHero } from '../components/ReviewsHero'
import { Reviews } from '../components/Reviews'
import { RegionalSeoSection } from '../components/RegionalSeoSection'
import { FAQ } from '../components/FAQ'
import { Locations } from '../components/Locations'

interface RegioCityEntry {
  name: string
  minutes: number
  slug: string
  isHome?: boolean
}

const REUSED_FAQ_INDEXES = [1, 4, 3]

export function RegioCity() {
  const { t } = useTranslation()
  const { city: slug } = useParams<{ city: string }>()

  const cities = t('regio.cities', { returnObjects: true }) as RegioCityEntry[]
  const city = cities.find(c => c.slug === slug)

  if (!city || city.isHome) {
    return <Navigate to={city?.isHome ? '/' : '/regio'} replace />
  }

  const { name, minutes } = city

  const heroSub = (
    <>
      {t('regioCity.hero.subPrefix', { city: name })}{' '}
      <strong>{t('regioCity.hero.subBold', { minutes })}</strong>{' '}
      {t('regioCity.hero.subSuffix')}
    </>
  )

  const mobileHeroSub1 = (
    <>
      {t('regioCity.mhero.sub1Prefix', { city: name })}{' '}
      <strong>{t('regioCity.hero.subBold', { minutes })}</strong>{' '}
      {t('regioCity.mhero.sub1Suffix')}
    </>
  )

  const faqItems = [
    { q: t('regioCity.faq.distanceQ', { city: name }), a: t('regioCity.faq.distanceA', { city: name, minutes }) },
    { q: t('regioCity.faq.shippingQ', { city: name }), a: t('regioCity.faq.shippingA') },
    ...REUSED_FAQ_INDEXES.map(i => ({ q: t(`faq.items.${i}.q`), a: t(`faq.items.${i}.a`) })),
  ]

  const locationsNote = t('regioCity.locations.note', { city: name, minutes })

  return (
    <Layout>
      <Hero
        accent={ACCENT}
        title={t('regioCity.hero.title')}
        titleAccent={t('regioCity.hero.titleAccent', { city: name })}
        sub={heroSub}
      />
      <MobileHero
        accent={ACCENT}
        titleSuffix={t('regioCity.mhero.titleSuffix', { city: name })}
        sub1={mobileHeroSub1}
      />
      <RegionalServiceBlock city={name} minutes={minutes} />
      <SearchModule />
      <PopularModels />
      <Process />
      <ReviewsHero />
      <Reviews />
      <FAQ items={faqItems} />
      <Locations regionalNote={locationsNote} />
      <RegionalSeoSection city={name} minutes={minutes} />
    </Layout>
  )
}

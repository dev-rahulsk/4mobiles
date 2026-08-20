import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Seo } from '../lib/seo/Seo'

export function TermsAndConditions() {
  const { t } = useTranslation()

  const sections = [
    { title: t('termsPage.sec1Title'), items: t('termsPage.sec1Items', { returnObjects: true }) as string[] },
    { title: t('termsPage.sec2Title'), items: t('termsPage.sec2Items', { returnObjects: true }) as string[] },
    { title: t('termsPage.sec3Title'), items: t('termsPage.sec3Items', { returnObjects: true }) as string[] },
    { title: t('termsPage.sec4Title'), items: t('termsPage.sec4Items', { returnObjects: true }) as string[] },
    { title: t('termsPage.sec5Title'), items: t('termsPage.sec5Items', { returnObjects: true }) as string[] },
    { title: t('termsPage.sec6Title'), items: t('termsPage.sec6Items', { returnObjects: true }) as string[] },
    { title: t('termsPage.sec7Title'), items: t('termsPage.sec7Items', { returnObjects: true }) as string[] },
    { title: t('termsPage.sec8Title'), items: t('termsPage.sec8Items', { returnObjects: true }) as string[] },
  ]

  return (
    <Layout>
      <Seo
        title={`${t('termsPage.title')} | 4Mobiles`}
        description="Algemene voorwaarden van 4Mobiles V.O.F."
        path="/algemene-voorwaarden"
      />
      <div className="subtle-gradient-bg legal-page-wrap">
        <div className="container legal-container">
          <header className="legal-header">
            <span className="legal-eyebrow">{t('termsPage.eyebrow')}</span>
            <h1 className="legal-title">{t('termsPage.title')}</h1>
            <p className="legal-meta">{t('termsPage.lastUpdated')}</p>
          </header>

          <div className="legal-card">
            {sections.map((sec, idx) => (
              <section key={idx} className="legal-section">
                <h2>{sec.title}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {Array.isArray(sec.items) && sec.items.map((item, iIdx) => (
                    <p key={iIdx}>{item}</p>
                  ))}
                </div>
              </section>
            ))}

            <footer style={{ paddingTop: '20px', borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>
              {t('termsPage.lastUpdated')}
            </footer>
          </div>
        </div>
      </div>
    </Layout>
  )
}

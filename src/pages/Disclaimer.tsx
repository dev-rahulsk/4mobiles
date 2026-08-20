import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Seo } from '../lib/seo/Seo'

export function Disclaimer() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo
        title={`${t('disclaimerPage.title')} | 4Mobiles`}
        description={t('disclaimerPage.p1')}
        path="/disclaimer"
      />
      <div className="subtle-gradient-bg legal-page-wrap">
        <div className="container legal-container">
          <header className="legal-header">
            <span className="legal-eyebrow">{t('disclaimerPage.eyebrow')}</span>
            <h1 className="legal-title">{t('disclaimerPage.title')}</h1>
            <p className="legal-meta">{t('disclaimerPage.lastUpdated')}</p>
          </header>

          <div className="legal-card">
            <p className="legal-intro">{t('disclaimerPage.p1')}</p>

            <section className="legal-section">
              <p>{t('disclaimerPage.p2')}</p>
            </section>

            <section className="legal-section">
              <p>{t('disclaimerPage.p3')}</p>
            </section>

            <section className="legal-section">
              <p>{t('disclaimerPage.p4')}</p>
            </section>

            <section className="legal-section">
              <p>{t('disclaimerPage.p5')}</p>
            </section>

            <section className="legal-section">
              <p>{t('disclaimerPage.p6')}</p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}

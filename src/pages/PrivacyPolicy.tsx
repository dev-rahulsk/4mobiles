import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Seo } from '../lib/seo/Seo'

export function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo
        title={`${t('privacyPage.title')} | 4Mobiles`}
        description={t('privacyPage.sec1P1')}
        path="/privacybeleid"
      />
      <div className="subtle-gradient-bg legal-page-wrap">
        <div className="container legal-container">
          <header className="legal-header">
            <span className="legal-eyebrow">{t('privacyPage.eyebrow')}</span>
            <h1 className="legal-title">{t('privacyPage.title')}</h1>
            <p className="legal-meta">{t('privacyPage.lastUpdated')}</p>
          </header>

          <div className="legal-card">
            {/* 1. Inleidende bepalingen */}
            <section className="legal-section">
              <h2>{t('privacyPage.sec1Title')}</h2>
              <p>{t('privacyPage.sec1P1')}</p>
              <p style={{ marginTop: '12px' }}>{t('privacyPage.sec1P2')}</p>
              <p style={{ marginTop: '12px' }}>{t('privacyPage.sec1P3')}</p>
            </section>

            {/* 2. Rechtsgrond */}
            <section className="legal-section">
              <h2>{t('privacyPage.sec2Title')}</h2>
              <p>{t('privacyPage.sec2P1')}</p>
            </section>

            {/* 3. Soorten, doelen... */}
            <section className="legal-section">
              <h2>{t('privacyPage.sec3Title')}</h2>
              <p>{t('privacyPage.sec3P1')}</p>
              <p style={{ marginTop: '12px' }}>{t('privacyPage.sec3P2')}</p>
            </section>

            {/* 4. Cookies */}
            <section className="legal-section">
              <h2>{t('privacyPage.sec4Title')}</h2>
              <p>{t('privacyPage.sec4P1')}</p>
            </section>

            {/* 5. Verwijzing naar andere websites */}
            <section className="legal-section">
              <h2>{t('privacyPage.sec5Title')}</h2>
              <p>{t('privacyPage.sec5P1')}</p>
            </section>

            {/* 6. Doorgifte aan verwerkers */}
            <section className="legal-section">
              <h2>{t('privacyPage.sec6Title')}</h2>
              <p>{t('privacyPage.sec6P1')}</p>
              <p style={{ marginTop: '12px' }}>{t('privacyPage.sec6P2')}</p>
            </section>

            {/* 7. Beveiliging */}
            <section className="legal-section">
              <h2>{t('privacyPage.sec7Title')}</h2>
              <p>{t('privacyPage.sec7P1')}</p>
            </section>

            {/* 8. Privacy */}
            <section className="legal-section">
              <h2>{t('privacyPage.sec8Title')}</h2>
              <p>{t('privacyPage.sec8P1')}</p>
            </section>

            {/* 9. Klachten */}
            <section className="legal-section">
              <h2>{t('privacyPage.sec9Title')}</h2>
              <p>{t('privacyPage.sec9P1')}</p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}

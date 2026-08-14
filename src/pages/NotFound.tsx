import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Seo } from '../lib/seo/Seo'

export function NotFound() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo
        title={`404 — ${t('notFound.title')} | 4Mobiles`}
        description={t('notFound.sub')}
        path="/404"
        noindex
      />
      <section className="section" style={{ textAlign: 'center', padding: '96px 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: 12 }}>404 — {t('notFound.title')}</h1>
          <p className="section-sub" style={{ maxWidth: 480, margin: '0 auto 28px' }}>{t('notFound.sub')}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/" className="btn btn-primary">{t('notFound.cta')}</a>
            <a href="/reparatie" className="btn btn-outline">{t('notFound.ctaRepair')}</a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

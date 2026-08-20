import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'
import { Seo } from '../lib/seo/Seo'

export function Login() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError(t('login.enterValidEmail'))
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <Layout>
      <Seo
        title={`${t('login.title')} | 4Mobiles`}
        description={t('login.subtitle')}
        path="/login"
      />
      <div className="subtle-gradient-bg repair-login-page">
        <div className="repair-login-container">
          <div className="repair-login-card">
            {/* Top phone check icon badge */}
            <div className="repair-login-icon-box" aria-hidden="true">
              <Icon.PhoneCheck width="32" height="32" />
            </div>

            {/* Title & Subtitle */}
            <h1 className="repair-login-title">{t('login.title')}</h1>
            <p className="repair-login-sub">{t('login.subtitle')}</p>

            {!submitted ? (
              /* Form */
              <form onSubmit={handleSubmit} className="repair-login-form" noValidate>
                <div className="repair-login-field">
                  <label htmlFor="repair-email" className="repair-login-label">
                    {t('login.emailLabel')}
                  </label>
                  <div className="repair-login-input-wrap">
                    <Icon.Mail width="18" height="18" className="repair-login-input-icon" />
                    <input
                      id="repair-email"
                      type="email"
                      className={`repair-login-input${error ? ' repair-login-input--error' : ''}`}
                      placeholder={t('login.emailPlaceholder')}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError('')
                      }}
                      autoComplete="email"
                      required
                    />
                  </div>
                  {error && <span className="repair-login-error-text">{error}</span>}
                </div>

                {/* Primary green action button */}
                <button
                  type="submit"
                  className="repair-login-btn"
                  disabled={loading}
                >
                  <span>{loading ? '...' : t('login.submitBtn')}</span>
                  <Icon.ArrowRight width="18" height="18" />
                </button>

                {/* Contact / Help button */}
                <a href="/contact" className="repair-login-help">
                  <Icon.Headset width="18" height="18" />
                  <span>{t('login.helpBtn')}</span>
                </a>
              </form>
            ) : (
              /* Simulated status result view */
              <div className="repair-status-result">
                <div className="repair-status-header">
                  <span className="repair-status-badge">{t('login.statusInProcess')}</span>
                  <span className="repair-status-num">{t('login.repairNumber')}</span>
                </div>

                <div className="repair-status-device-box">
                  <Icon.Phone width="22" height="22" className="repair-status-phone-icon" />
                  <div>
                    <h3 className="repair-status-device-title">{t('login.deviceSample')}</h3>
                    <p className="repair-status-location">{t('login.storeLocation')}</p>
                  </div>
                </div>

                {/* Status Stepper */}
                <div className="repair-stepper">
                  <div className="repair-step repair-step--completed">
                    <div className="repair-step-dot"><Icon.Check width="12" height="12" /></div>
                    <span className="repair-step-label">{t('login.statusStep1')}</span>
                  </div>
                  <div className="repair-step-line repair-step-line--active" />
                  <div className="repair-step repair-step--active">
                    <div className="repair-step-dot" />
                    <span className="repair-step-label">{t('login.statusStep2')}</span>
                  </div>
                  <div className="repair-step-line" />
                  <div className="repair-step">
                    <div className="repair-step-dot" />
                    <span className="repair-step-label">{t('login.statusStep3')}</span>
                  </div>
                </div>

                <p className="repair-status-eta">
                  <Icon.Clock width="14" height="14" />
                  {t('login.estimatedReady')}
                </p>

                <button
                  type="button"
                  className="repair-login-btn-outline"
                  onClick={() => setSubmitted(false)}
                >
                  ← Zoek opnieuw
                </button>
              </div>
            )}
          </div>

          {/* Security footnote below card */}
          <div className="repair-login-security">
            <Icon.Lock width="14" height="14" />
            <span>{t('login.securityNote')}</span>
          </div>
        </div>
      </div>
    </Layout>
  )
}

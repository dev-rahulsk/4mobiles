import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'
import logoIcon from '../assets/logo/logo-icon.png'

function Logo() {
  const { t } = useTranslation()
  return (
    <a href="/" className="logo">
      <span className="logo-mark">
        <img src={logoIcon} alt="4Mobiles" />
      </span>
      <span className="logo-text">
        <span className="logo-name">4Mobiles</span>
        <span className="logo-tag">{t('logo.tag')}</span>
      </span>
    </a>
  )
}

const COL3_HREFS = ['/over-ons', undefined, '/zakelijk', '/blog', '/veelgestelde-vragen', '/regio']

export function Footer() {
  const { t } = useTranslation()

  const col1Items: string[] = t('footer.col1Items', { returnObjects: true }) as string[]
  const col2Items: string[] = t('footer.col2Items', { returnObjects: true }) as string[]
  const col3Items: string[] = t('footer.col3Items', { returnObjects: true }) as string[]

  return (
    <footer className="footer-new">
      <div className="container">
        <div className="footer-new-logo">
          <Logo />
          <p className="footer-new-tag">{t('footer.logoTag')}</p>
          <div className="footer-new-rating">
            <Icon.Google width="18" height="18" />
            <div className="footer-stars">
              {[0, 1, 2, 3, 4].map(i => <Icon.Star key={i} width="12" height="12" />)}
            </div>
            <span className="footer-meta"><b>4.9</b> · {t('topbar.reviews', { count: '200+' })}</span>
          </div>
        </div>

        <div className="footer-new-cols">
          <div className="footer-new-block">
            <div className="footer-new-col">
              <h4>{t('footer.col1Title')}</h4>
              <ul>
                {col1Items.map(it => <li key={it}><a href="#">{it}</a></li>)}
              </ul>
            </div>
            <div className="footer-new-col">
              <h4>{t('footer.col2Title')}</h4>
              <ul>
                {col2Items.map(it => <li key={it}><a href="#">{it}</a></li>)}
              </ul>
            </div>
          </div>

          <div className="footer-new-block">
            <div className="footer-new-col">
              <h4>{t('footer.col3Title')}</h4>
              <ul>
                {col3Items.map((it, i) => <li key={it}><a href={COL3_HREFS[i] ?? '#'}>{it}</a></li>)}
              </ul>
            </div>
            <div className="footer-new-col">
              <h4>{t('footer.col4Title')}</h4>
              <ul>
                <li>
                  <a href="https://maps.google.com/?q=Molenstraat+2+Naaldwijk" target="_blank" rel="noopener" className="footer-contact-item">
                    <Icon.Pin width="14" height="14" /> Molenstraat 2, 2671 EX Naaldwijk
                  </a>
                </li>
                <li>
                  <a href="tel:0174237022" className="footer-contact-item">
                    <Icon.Phone width="14" height="14" /> 0174 23 70 22
                  </a>
                </li>
                <li>
                  <a href="mailto:info@4mobiles.nl" className="footer-contact-item">
                    <Icon.Chat width="14" height="14" /> info@4mobiles.nl
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/31174237022" className="footer-contact-item">
                    <Icon.WhatsApp width="14" height="14" /> {t('footer.whatsapp')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-new-bottom">
          <div className="footer-new-social">
            <a href="#" aria-label="WhatsApp"><Icon.WhatsApp width="18" height="18" /></a>
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
          <div className="footer-new-copy">{t('footer.copyright')}</div>
          <div className="footer-new-links">
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.terms')}</a>
            <a href="#">{t('footer.disclaimer')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

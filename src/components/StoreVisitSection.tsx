import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'
import storeInteriorWideImg from '../assets/ChatGPT_Image_30_jul_2026_20_05_04.webp'

export interface StoreVisitSectionProps {
  className?: string
  showSectionNum?: boolean
}

export function StoreVisitSection({ className = '', showSectionNum = false }: StoreVisitSectionProps) {
  const { t } = useTranslation()
  const [addressCopied, setAddressCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText('Molenstraat 2, 2671 EX Naaldwijk')
    setAddressCopied(true)
    setTimeout(() => setAddressCopied(false), 2000)
  }

  return (
    <section className={`pd-desktop-visit-section ${className}`}>
      <div className="container pd-desktop-visit-grid">
        {/* Left block - Store visit promo with image & checklist */}
        <div className="pd-desktop-visit-promo">
          <img
            src={storeInteriorWideImg}
            alt={t('producten.storeInteriorWideAlt')}
            className="pd-desktop-visit-promo-bg"
          />
          <div className="pd-desktop-visit-promo-overlay" />
          <div className="pd-desktop-visit-promo-content">
            {showSectionNum && (
              <div className="aou-team-eyebrow" style={{ marginBottom: '12px' }}>
                <div className="aou-team-eyebrow-num-box">
                  <span className="aou-team-eyebrow-num">06</span>
                  <div className="aou-team-eyebrow-divider" />
                </div>
                <span className="aou-team-eyebrow-label">{t('aboutUs.visit.tag')}</span>
              </div>
            )}
            <h3>{t('producten.promoTitle')}</h3>
            <ul>
              <li>
                <Icon.Check width="16" height="16" /> {t('producten.promoBullet1')}
              </li>
              <li>
                <Icon.Check width="16" height="16" /> {t('producten.promoBullet2')}
              </li>
              <li>
                <Icon.Check width="16" height="16" /> {t('producten.promoBullet3')}
              </li>
              <li>
                <Icon.Check width="16" height="16" /> {t('producten.promoBullet4')}
              </li>
            </ul>
          </div>
        </div>

        {/* Right block - Store visit info, Google maps, route & contact */}
        <div className="pd-desktop-visit-card">
          <div className="pd-store-visit-head">
            <div className="pd-desktop-visit-title">
              <Icon.Pin width="20" height="20" /> {t('producten.storeVisitTitle')}
            </div>
            <button className="pd-store-copy-btn" onClick={copyAddress}>
              {addressCopied ? '✓' : t('producten.storeVisitCopyBtn')}
            </button>
          </div>
          <p className="pd-desktop-visit-addr">
            Molenstraat 2<br />
            2671 EX Naaldwijk
          </p>

          <div className="pd-desktop-visit-map">
            <a
              href="https://maps.google.com/?q=Molenstraat+2+2671+EX+Naaldwijk"
              target="_blank"
              rel="noopener noreferrer"
              className="pd-desktop-visit-maplink"
            >
              <Icon.MapLink width="14" height="14" /> {t('producten.openInMaps')}
            </a>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2458.0!2d4.2!3d51.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b1!2sMolenstraat%202%2C%20Naaldwijk!5e0!3m2!1snl!2snl!4v1"
              width="100%"
              height="220"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('producten.storeVisitTitle')}
            />
          </div>

          <div className="pd-desktop-visit-btns">
            <a
              href="https://maps.google.com/?q=Molenstraat+2+2671+EX+Naaldwijk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent pd-btn"
            >
              <Icon.MapLink width="16" height="16" /> {t('producten.storeVisitRoute')}
            </a>
            <a
              href="https://wa.me/31174237022"
              target="_blank"
              rel="noopener noreferrer"
              className="pd-btn pd-btn-dark"
            >
              <Icon.WhatsApp width="16" height="16" /> {t('producten.storeVisitWhatsapp')}
            </a>
          </div>
          <p className="pd-store-visit-noappt">{t('producten.storeVisitNoAppt')}</p>
        </div>
      </div>
    </section>
  )
}

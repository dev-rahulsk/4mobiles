import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icons'

const ANN_KEY = 'ann-v1'
const TYPE_CLASS = {
  urgent: 'ann-urgent',
  notice: 'ann-notice',
  promotion: 'ann-promotion',
} as const

const TYPE: keyof typeof TYPE_CLASS = 'notice'

export function AnnouncementBar() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(() => {
    try { return !sessionStorage.getItem(ANN_KEY) } catch { return true }
  })

  if (!visible) return null

  const dismiss = () => {
    try { sessionStorage.setItem(ANN_KEY, '1') } catch { /* ignore */ }
    setVisible(false)
  }

  return (
    <div className={`ann-bar ${TYPE_CLASS[TYPE]}`} role="banner">
      <div className="container ann-inner">
        <span className="ann-text">{t('ann.text')}</span>
        <button className="ann-close" onClick={dismiss} aria-label={t('ann.dismiss')}>
          <Icon.X width="14" height="14" />
        </button>
      </div>
    </div>
  )
}

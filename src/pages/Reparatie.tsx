import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface Brand { id: string; name: string; wordmark: string; bg: string; fg: string }
interface DeviceColor { id: string; name: string; hex: string }
interface DeviceModel { id: string; name: string; code: string; imgColor: string; colors: DeviceColor[] }
interface RepairOption {
  id: string; name: string; badge?: string; desc: string
  price: number; stock: 'Op voorraad' | 'Beperkt op voorraad'; repairTime: string
}
interface RepairCategory { id: string; name: string; fromPrice: number; options: RepairOption[] }

// ─── Brands Data ─────────────────────────────────────────────────────────────

const BRANDS: Brand[] = [
  { id: 'apple',    name: 'Apple',    wordmark: 'Apple',    bg: '#111',    fg: '#fff' },
  { id: 'samsung',  name: 'Samsung',  wordmark: 'SAMSUNG',  bg: '#1428A0', fg: '#fff' },
  { id: 'motorola', name: 'Motorola', wordmark: 'motorola', bg: '#E1172F', fg: '#fff' },
  { id: 'xiaomi',   name: 'Xiaomi',   wordmark: 'xiaomi',   bg: '#FF6900', fg: '#fff' },
  { id: 'oppo',     name: 'Oppo',     wordmark: 'OPPO',     bg: '#1D8348', fg: '#fff' },
  { id: 'huawei',   name: 'Huawei',   wordmark: 'HUAWEI',   bg: '#CF0A2C', fg: '#fff' },
  { id: 'oneplus',  name: 'OnePlus',  wordmark: '1+',       bg: '#EB0029', fg: '#fff' },
  { id: 'sony',     name: 'Sony',     wordmark: 'SONY',     bg: '#000',    fg: '#fff' },
  { id: 'google',   name: 'Google',   wordmark: 'Google',   bg: '#4285F4', fg: '#fff' },
]

// ─── Models Data ─────────────────────────────────────────────────────────────

const MODELS: Record<string, DeviceModel[]> = {
  apple: [
    { id: 'iphone-16-pro',  name: 'iPhone 16 Pro',   code: 'A3106', imgColor: '#4a4a45',
      colors: [{ id: 'natural', name: 'Natural Titanium', hex: '#c0b99e' }, { id: 'white', name: 'White Titanium', hex: '#e8e3d8' }, { id: 'black', name: 'Black Titanium', hex: '#3d3b37' }, { id: 'desert', name: 'Desert Titanium', hex: '#c9a97d' }] },
    { id: 'iphone-16',      name: 'iPhone 16',        code: 'A3287', imgColor: '#5d7d9e',
      colors: [{ id: 'black', name: 'Zwart', hex: '#1c1c1e' }, { id: 'white', name: 'Wit', hex: '#f5f5f0' }, { id: 'pink', name: 'Roze', hex: '#f1a7b4' }, { id: 'teal', name: 'Teal', hex: '#4a9d8e' }, { id: 'ultra', name: 'Ultramarine', hex: '#3d5fa0' }] },
    { id: 'iphone-15-pro',  name: 'iPhone 15 Pro',   code: 'A2848', imgColor: '#6e6e6e',
      colors: [{ id: 'natural', name: 'Natural Titanium', hex: '#c0b99e' }, { id: 'blue', name: 'Blue Titanium', hex: '#4a6b8a' }, { id: 'white', name: 'White Titanium', hex: '#e8e3d8' }, { id: 'black', name: 'Black Titanium', hex: '#3d3b37' }] },
    { id: 'iphone-15',      name: 'iPhone 15',        code: 'A2846', imgColor: '#4a7f9e',
      colors: [{ id: 'black', name: 'Zwart', hex: '#1c1c1e' }, { id: 'blue', name: 'Blauw', hex: '#3d6b9e' }, { id: 'green', name: 'Groen', hex: '#4a8a5e' }, { id: 'yellow', name: 'Geel', hex: '#e8d44d' }, { id: 'pink', name: 'Roze', hex: '#f1a7b4' }] },
    { id: 'iphone-14-pro',  name: 'iPhone 14 Pro',   code: 'A2890', imgColor: '#5a5a52',
      colors: [{ id: 'graphite', name: 'Grafiet', hex: '#4a4a45' }, { id: 'silver', name: 'Zilver', hex: '#c0bdb5' }, { id: 'gold', name: 'Goud', hex: '#c9a97d' }, { id: 'sierra', name: 'Sierra Blue', hex: '#8aadcc' }, { id: 'alpine', name: 'Alpine Green', hex: '#4a6b55' }] },
    { id: 'iphone-14',      name: 'iPhone 14',        code: 'A2882', imgColor: '#6a8ca0',
      colors: [{ id: 'midnight', name: 'Midnight', hex: '#1c1c1e' }, { id: 'starlight', name: 'Starlight', hex: '#e8e3d8' }, { id: 'blue', name: 'Blauw', hex: '#3d6b9e' }, { id: 'purple', name: 'Paars', hex: '#7a5a8a' }, { id: 'yellow', name: 'Geel', hex: '#fcd34d' }, { id: 'red', name: 'Rood', hex: '#e02020' }] },
    { id: 'iphone-13-pro',  name: 'iPhone 13 Pro',   code: 'A2638', imgColor: '#5a6e7a',
      colors: [{ id: 'graphite', name: 'Grafiet', hex: '#4a4a45' }, { id: 'gold', name: 'Goud', hex: '#c9a97d' }, { id: 'silver', name: 'Zilver', hex: '#c0bdb5' }, { id: 'sierra', name: 'Sierra Blue', hex: '#8aadcc' }, { id: 'alpine', name: 'Alpine Green', hex: '#4a6b55' }] },
    { id: 'iphone-13',      name: 'iPhone 13',        code: 'A2633', imgColor: '#6a7a8a',
      colors: [{ id: 'midnight', name: 'Midnight', hex: '#1c1c1e' }, { id: 'starlight', name: 'Starlight', hex: '#e8e3d8' }, { id: 'blue', name: 'Blauw', hex: '#3d6b9e' }, { id: 'pink', name: 'Roze', hex: '#f1a7b4' }, { id: 'red', name: 'Rood', hex: '#e02020' }, { id: 'green', name: 'Groen', hex: '#4a8a5e' }] },
    { id: 'iphone-12',      name: 'iPhone 12',        code: 'A2403', imgColor: '#7a8a9a',
      colors: [{ id: 'black', name: 'Zwart', hex: '#1c1c1e' }, { id: 'white', name: 'Wit', hex: '#f5f5f0' }, { id: 'red', name: 'Rood', hex: '#e02020' }, { id: 'blue', name: 'Blauw', hex: '#3d6b9e' }, { id: 'green', name: 'Groen', hex: '#4a8a5e' }, { id: 'purple', name: 'Paars', hex: '#7a5a8a' }] },
    { id: 'iphone-se-2022', name: 'iPhone SE (2022)', code: 'A2783', imgColor: '#8a8a8a',
      colors: [{ id: 'midnight', name: 'Midnight', hex: '#1c1c1e' }, { id: 'starlight', name: 'Starlight', hex: '#e8e3d8' }, { id: 'red', name: 'Rood', hex: '#e02020' }] },
  ],
  samsung: [
    { id: 's24-ultra', name: 'Galaxy S24 Ultra', code: 'SM-S928B', imgColor: '#2d2d2d',
      colors: [{ id: 'black', name: 'Titanium Black', hex: '#2d2d2d' }, { id: 'gray', name: 'Titanium Gray', hex: '#8a8a8a' }, { id: 'violet', name: 'Titanium Violet', hex: '#6a4a8a' }, { id: 'yellow', name: 'Titanium Yellow', hex: '#e8c84d' }] },
    { id: 's24-plus',  name: 'Galaxy S24+',      code: 'SM-S926B', imgColor: '#1a3a5e',
      colors: [{ id: 'black', name: 'Onyx Black', hex: '#1c1c1e' }, { id: 'gray', name: 'Marble Gray', hex: '#8a8a8a' }, { id: 'violet', name: 'Cobalt Violet', hex: '#4a3a7a' }] },
    { id: 's24',       name: 'Galaxy S24',        code: 'SM-S921B', imgColor: '#2a4a6a',
      colors: [{ id: 'black', name: 'Onyx Black', hex: '#1c1c1e' }, { id: 'gray', name: 'Marble Gray', hex: '#8a8a8a' }, { id: 'violet', name: 'Cobalt Violet', hex: '#4a3a7a' }] },
    { id: 's23',       name: 'Galaxy S23',        code: 'SM-S911B', imgColor: '#3a3a3a',
      colors: [{ id: 'black', name: 'Phantom Black', hex: '#1a1a1a' }, { id: 'cream', name: 'Cream', hex: '#f0ebe0' }, { id: 'green', name: 'Green', hex: '#4a8a6a' }, { id: 'lavender', name: 'Lavender', hex: '#c4b8d0' }] },
    { id: 'a55', name: 'Galaxy A55', code: 'SM-A556B', imgColor: '#4a6a8a',
      colors: [{ id: 'black', name: 'Awesome Black', hex: '#1c1c1e' }, { id: 'blue', name: 'Awesome Iceblue', hex: '#7ab3d0' }, { id: 'lilac', name: 'Awesome Lilac', hex: '#b8a0d0' }] },
    { id: 'a35', name: 'Galaxy A35', code: 'SM-A356B', imgColor: '#5a7a9a',
      colors: [{ id: 'black', name: 'Awesome Black', hex: '#1c1c1e' }, { id: 'blue', name: 'Awesome Iceblue', hex: '#7ab3d0' }] },
  ],
  motorola: [
    { id: 'edge-50-pro', name: 'Edge 50 Pro',  code: 'XT2403-2', imgColor: '#4a2a6a', colors: [{ id: 'black', name: 'Black Beauty', hex: '#1c1c1e' }, { id: 'purple', name: 'Luxe Lavender', hex: '#8a6aa0' }] },
    { id: 'edge-40',     name: 'Edge 40',       code: 'XT2303-2', imgColor: '#3a4a5a', colors: [{ id: 'black', name: 'Eclipse Black', hex: '#1c1c1e' }, { id: 'green', name: 'Nebula Green', hex: '#3a7a5a' }] },
    { id: 'moto-g84',   name: 'Moto G84',      code: 'XT2343-1', imgColor: '#2a3a4a', colors: [{ id: 'blue', name: 'Midnight Blue', hex: '#1c2a3e' }, { id: 'magenta', name: 'Viva Magenta', hex: '#c03060' }] },
  ],
  xiaomi: [
    { id: 'xiaomi-14',     name: 'Xiaomi 14',      code: '23127PN0CG', imgColor: '#1a1a1a', colors: [{ id: 'black', name: 'Zwart', hex: '#1c1c1e' }, { id: 'white', name: 'Wit', hex: '#f5f5f0' }] },
    { id: 'xiaomi-13t',    name: 'Xiaomi 13T',     code: '2306EPN60G', imgColor: '#2a3a4a', colors: [{ id: 'black', name: 'Black', hex: '#1c1c1e' }, { id: 'blue', name: 'Alpine Blue', hex: '#4a6a9a' }] },
    { id: 'redmi-note-13', name: 'Redmi Note 13',  code: '23129RAA4G', imgColor: '#4a6a9a', colors: [{ id: 'black', name: 'Graphite Black', hex: '#2a2a2a' }] },
  ],
  oppo: [
    { id: 'reno11', name: 'Reno11', code: 'CPH2599', imgColor: '#4a6a8a', colors: [{ id: 'black', name: 'Dark Matter', hex: '#1c1c1e' }] },
    { id: 'reno10', name: 'Reno10', code: 'CPH2531', imgColor: '#5a7a9a', colors: [{ id: 'purple', name: 'Glossy Purple', hex: '#7a5a9a' }] },
  ],
  huawei: [
    { id: 'p60-pro', name: 'P60 Pro',  code: 'MNA-LX9', imgColor: '#2a4a6a', colors: [{ id: 'black', name: 'Black', hex: '#1c1c1e' }] },
  ],
  oneplus: [
    { id: 'op12',   name: 'OnePlus 12', code: 'CPH2581', imgColor: '#1a1a1a', colors: [{ id: 'black', name: 'Silky Black', hex: '#1c1c1e' }] },
  ],
  sony: [
    { id: 'xperia-1-vi', name: 'Xperia 1 VI', code: 'XQ-EC54', imgColor: '#1a2a3a', colors: [{ id: 'black', name: 'Black', hex: '#1c1c1e' }] },
  ],
  google: [
    { id: 'pixel-9-pro', name: 'Pixel 9 Pro', code: 'G4SKM', imgColor: '#2a2a2a', colors: [{ id: 'obsidian', name: 'Obsidian', hex: '#1c1c1e' }] },
    { id: 'pixel-9',     name: 'Pixel 9',     code: 'GUR23', imgColor: '#3a3a3a', colors: [{ id: 'obsidian', name: 'Obsidian', hex: '#1c1c1e' }] },
  ],
}

// ─── Repair Categories ───────────────────────────────────────────────────────

const REPAIR_CATS: RepairCategory[] = [
  {
    id: 'screen', name: 'Beeldscherm en glas', fromPrice: 69,
    options: [
      { id: 'screen-original', name: 'Display / scherm module (Origineel)', badge: 'Meest gekozen', desc: 'Het beeldscherm/glas van jouw toestel is gebroken of jouw touchscreen reageert niet meer. Originele fabrieksmodule.', price: 89.95, stock: 'Op voorraad', repairTime: '90 minuten' },
      { id: 'screen-refurbished', name: 'Display / scherm module (Refurbished Origineel)', desc: 'Origineel gereviseerd OLED scherm met nieuw glas voor betrouwbaar herstel.', price: 139.95, stock: 'Op voorraad', repairTime: '120 minuten' },
      { id: 'screen-compatible', name: 'Display / scherm module (Compatible A-Kwaliteit)', desc: 'Voordelige High-Copy schermmodule voor functioneel schermherstel.', price: 99.95, stock: 'Op voorraad', repairTime: '120 minuten' },
    ],
  },
  {
    id: 'battery', name: 'Batterij en opladen', fromPrice: 49,
    options: [
      { id: 'battery-replace', name: 'Batterij vervangen (Originele capaciteit)', badge: 'Meest gekozen', desc: 'Jouw batterij laadt niet meer goed op, de telefoon gaat snel leeg of hij valt zomaar uit.', price: 59.95, stock: 'Op voorraad', repairTime: '45 minuten' },
      { id: 'charging-port', name: 'Laadpoort / connector vervangen', desc: 'De laadpoort is beschadigd of jouw toestel laadt niet meer op.', price: 49.95, stock: 'Op voorraad', repairTime: '60 minuten' },
    ],
  },
  {
    id: 'housing', name: 'Behuizing & frame', fromPrice: 89,
    options: [
      { id: 'back-cover', name: 'Achterkant (Glass Back) vervangen', desc: 'De glazen achterkant van jouw toestel is gebarsten of beschadigd.', price: 89.95, stock: 'Op voorraad', repairTime: '90 minuten' },
      { id: 'frame', name: 'Frame & behuizing herstel', desc: 'Het frame is gebogen of beschadigd en zorgt voor problemen.', price: 119.95, stock: 'Beperkt op voorraad', repairTime: '120 minuten' },
    ],
  },
  {
    id: 'camera', name: 'Camera & speaker', fromPrice: 49,
    options: [
      { id: 'camera-replace', name: 'Achtercamera / Selfie camera vervangen', desc: 'De camera maakt onscherpe foto\'s of geeft een zwart beeld.', price: 69.95, stock: 'Op voorraad', repairTime: '60 minuten' },
      { id: 'speaker-replace', name: 'Oorluidspreker / Speaker vervangen', desc: 'Het geluid van jouw toestel is krakerig of niet meer hoorbaar.', price: 49.95, stock: 'Op voorraad', repairTime: '45 minuten' },
    ],
  },
  {
    id: 'water', name: 'Waterschade', fromPrice: 79,
    options: [
      { id: 'water-treatment', name: 'Ultrasone Waterschade Behandeling', desc: 'Grondige chemische & ultrasone reiniging om vocht en corrosie te verwijderen.', price: 79.95, stock: 'Op voorraad', repairTime: '60 minuten' },
    ],
  },
  {
    id: 'other', name: 'Onderzoek & overige', fromPrice: 29,
    options: [
      { id: 'diagnosis', name: 'Diagnose & onderzoek op locatie', desc: 'Wij onderzoeken jouw toestel en geven vooraf een transparante prijsopgave.', price: 29.95, stock: 'Op voorraad', repairTime: '30 minuten' },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TIME_SLOTS = ['09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30']

function getNext7Days(dayShort: string[], monthShort: string[]) {
  const result: { dayShort: string; dateNum: number; monthShort: string; value: string }[] = []
  const today = new Date()
  for (let i = 1; i <= 14 && result.length < 7; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i)
    if (d.getDay() === 0) continue
    result.push({ dayShort: dayShort[d.getDay()], dateNum: d.getDate(), monthShort: monthShort[d.getMonth()], value: d.toISOString().split('T')[0] })
  }
  return result
}

function formatLongDate(iso: string, dayLong: string[], monthLong: string[]) {
  if (!iso) return ''
  const [y, m, day] = iso.split('-').map(Number)
  const d = new Date(y, m - 1, day)
  return `${dayLong[d.getDay()]} ${d.getDate()} ${monthLong[d.getMonth()]} ${d.getFullYear()}`
}

// ─── Form State ──────────────────────────────────────────────────────────────

interface FormState {
  brandId: string; modelId: string; colorId: string
  repairCatId: string; repairOptId: string
  naam: string; telefoon: string; email: string; agree: boolean
  serviceMethod: 'store' | 'post'
  straat: string; huisnummer: string; postcode: string; plaats: string
  shippingOption: 'standard' | 'registered'
  datum: string; tijd: string
}

const INITIAL: FormState = {
  brandId: '', modelId: '', colorId: '', repairCatId: '', repairOptId: '',
  naam: '', telefoon: '', email: '', agree: false,
  serviceMethod: 'store',
  straat: '', huisnummer: '', postcode: '', plaats: '',
  shippingOption: 'standard',
  datum: '', tijd: '',
}

// ─── Step Indicator ──────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const { t } = useTranslation()
  const STEP_LABELS = [t('reparatie.stepMerk'), t('reparatie.stepModel'), t('reparatie.stepReparatie'), t('reparatie.stepGegevens')]
  return (
    <div className="rp-steps">
      {STEP_LABELS.map((label, idx) => {
        const num = idx + 1; const done = num < step; const active = num === step
        return (
          <div key={label} className="rp-step-item">
            <div className={`rp-step-circle${done ? ' rp-step-circle--done' : active ? ' rp-step-circle--active' : ''}`}>
              {done ? <Icon.Check width={14} height={14} /> : <span>{num}</span>}
            </div>
            <span className={`rp-step-label${active ? ' rp-step-label--active' : ''}`}>{label}</span>
            {idx < STEP_LABELS.length - 1 && <div className={`rp-step-line${done ? ' rp-step-line--done' : ''}`} />}
          </div>
        )
      })}
    </div>
  )
}

// ─── Step 1: Brand Selection ─────────────────────────────────────────────────

function Step1({ form, onChange, onNext }: { form: FormState; onChange: (p: Partial<FormState>) => void; onNext: () => void }) {
  const { t } = useTranslation()
  return (
    <div className="rp-step-content">
      {/* 1. Top Section Background: Homepage Notification Bar Style */}
      <div className="rp-top-banner-dark">
        <div className="rp-top-banner-inner">
          <span className="rp-top-banner-chip">
            <Icon.Zap width={13} height={13} /> Snel & Professioneel
          </span>
          <h2 className="rp-top-banner-title">{t('reparatie.s1Title')}</h2>
          <p className="rp-top-banner-sub">{t('reparatie.s1Sub')}</p>
        </div>
      </div>

      {/* 2. Brand Selection Area: Soft Light-Blue Background */}
      <div className="rp-brands-light-blue-box">
        <p className="rp-brand-selection-hint">{t('reparatie.s1Hint')}</p>

        <div className="rp-brands-grid">
          {BRANDS.map(b => (
            <button
              key={b.id}
              className={`rp-brand-tile${form.brandId === b.id ? ' rp-brand-tile--selected' : ''}`}
              onClick={() => { onChange({ brandId: b.id, modelId: '', colorId: '', repairCatId: '', repairOptId: '' }); onNext() }}
            >
              {form.brandId === b.id && <span className="rp-brand-check"><Icon.Check width={12} height={12} /></span>}
              <span className="rp-brand-logo" style={{ background: b.bg, color: b.fg }}>{b.wordmark}</span>
              <span className="rp-brand-name">{b.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Alignment of Three Items (Contact Help Banner) */}
      <div className="rp-help-centered-group">
        <div className="rp-not-found-card">
          <div className="rp-not-found-icon"><Icon.Chat width={24} height={24} /></div>
          <div className="rp-not-found-info">
            <p className="rp-not-found-title">{t('reparatie.notFoundTitle')}</p>
            <p className="rp-not-found-sub">{t('reparatie.notFoundSub')}</p>
          </div>
          <a href="/contact" className="rp-not-found-cta">{t('reparatie.notFoundCta')}</a>
        </div>
      </div>

      {/* 4. Trust Badges: Glassmorphism Badges */}
      <div className="rp-glass-trust-badges">
        <div className="rp-glass-badge">
          <div className="rp-glass-badge-icon"><Icon.Shield width={20} height={20} /></div>
          <div>
            <p className="rp-glass-badge-title">{t('reparatie.trustSecureTitle')}</p>
            <p className="rp-glass-badge-sub">{t('reparatie.trustSecureSub')}</p>
          </div>
        </div>

        <div className="rp-glass-badge">
          <div className="rp-glass-badge-icon"><Icon.Check width={20} height={20} /></div>
          <div>
            <p className="rp-glass-badge-title">{t('reparatie.trustExpertTitle')}</p>
            <p className="rp-glass-badge-sub">{t('reparatie.trustExpertSub')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Find My Model Modal ──────────────────────────────────────────────────────

function FindMyModelModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'ios' | 'android'>('ios')

  return (
    <div className="rp-modal-overlay" onClick={onClose}>
      <div className="rp-modal rp-modal--wide" onClick={e => e.stopPropagation()}>
        <button className="rp-modal-close" onClick={onClose}>✕</button>

        <div className="rp-fmm-header">
          <div className="rp-fmm-icon"><Icon.HelpCircle width={24} height={24} /></div>
          <div>
            <h3 className="rp-fmm-title">Help mij mijn model te vinden</h3>
            <p className="rp-fmm-sub">Weet je niet precies welke smartphone je hebt? Volg de onderstaande stappen.</p>
          </div>
        </div>

        <div className="rp-fmm-tabs">
          <button className={`rp-fmm-tab${tab === 'ios' ? ' active' : ''}`} onClick={() => setTab('ios')}>
            <Icon.Apple width={16} height={16} /> Apple iOS (iPhone)
          </button>
          <button className={`rp-fmm-tab${tab === 'android' ? ' active' : ''}`} onClick={() => setTab('android')}>
            <Icon.Phone width={16} height={16} /> Android (Samsung, Xiaomi, Oppo etc.)
          </button>
        </div>

        <div className="rp-fmm-body">
          {tab === 'ios' ? (
            <div className="rp-fmm-steps">
              <div className="rp-fmm-step">
                <span className="rp-fmm-num">1</span>
                <div>
                  <strong>Open Instellingen</strong>
                  <p>Tik op de 'Instellingen' app op je iPhone startscherm.</p>
                </div>
              </div>
              <div className="rp-fmm-step">
                <span className="rp-fmm-num">2</span>
                <div>
                  <strong>Ga naar Algemeen</strong>
                  <p>Scrol een klein stukje naar beneden en kies 'Algemeen'.</p>
                </div>
              </div>
              <div className="rp-fmm-step">
                <span className="rp-fmm-num">3</span>
                <div>
                  <strong>Tik op Info</strong>
                  <p>Bovenaan het scherm zie je de optie 'Info'.</p>
                </div>
              </div>
              <div className="rp-fmm-step">
                <span className="rp-fmm-num">4</span>
                <div>
                  <strong>Zie Modelnaam & Modelnummer</strong>
                  <p>Hier staat exact jouw iPhone type (bijv. iPhone 14 Pro, Model A2890).</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rp-fmm-steps">
              <div className="rp-fmm-step">
                <span className="rp-fmm-num">1</span>
                <div>
                  <strong>Open Instellingen</strong>
                  <p>Open de 'Instellingen' app in je telefoonmenu.</p>
                </div>
              </div>
              <div className="rp-fmm-step">
                <span className="rp-fmm-num">2</span>
                <div>
                  <strong>Scrol naar 'Over de telefoon'</strong>
                  <p>Helemaal onderaan vind je 'Over de telefoon' of 'Toestel-info'.</p>
                </div>
              </div>
              <div className="rp-fmm-step">
                <span className="rp-fmm-num">3</span>
                <div>
                  <strong>Bekijk Modelnaam & Modelnummer</strong>
                  <p>Je ziet direct de naam (bijv. Galaxy S24) en het modelnummer (bijv. SM-S928B).</p>
                </div>
              </div>
              <div className="rp-fmm-step">
                <span className="rp-fmm-num">4</span>
                <div>
                  <strong>Alternatief: Achterkant of Verpakking</strong>
                  <p>Veel telefoons hebben het modelnummer ook klein op de achterkant of de originele doos geprint.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="rp-btn rp-btn--primary rp-fmm-close-btn" onClick={onClose}>
          Begrepen, terug naar modelleren
        </button>
      </div>
    </div>
  )
}

// ─── Step 2: Choose Model ────────────────────────────────────────────────────

function Step2({ form, onChange, onNext, onBack }: { form: FormState; onChange: (p: Partial<FormState>) => void; onNext: () => void; onBack: () => void }) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [showFindModal, setShowFindModal] = useState(false)
  const brand = BRANDS.find(b => b.id === form.brandId)
  const models = MODELS[form.brandId] ?? []
  const filtered = useMemo(() =>
    search.trim() ? models.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.code.toLowerCase().includes(search.toLowerCase())) : models
  , [search, models])

  return (
    <div className="rp-step-content">
      {/* Aligned Header Group */}
      <div className="rp-step2-header-group">
        <h2 className="rp-step2-title">Kies je model</h2>
        <p className="rp-step2-sub">Uw {brand?.name ?? 'telefoon'} model</p>
      </div>

      {/* Light-Blue Contact Bar */}
      <div className="rp-step2-contact-bar">
        <Icon.Phone width={20} height={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <span>Kies hieronder het juiste type. Twijfel je over jouw model? Wij helpen je direct.</span>
      </div>

      <div className="rp-model-search-wrap">
        <Icon.Search width={16} height={16} />
        <input
          className="rp-model-search"
          placeholder={t('reparatie.s2SearchPlaceholder', { brand: brand?.name })}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* 5-Column Grid with Helper Card as Card 1 */}
      <div className="rp-models-grid-5">
        {/* Helper Card */}
        <button className="rp-model-tile rp-model-tile--helper" onClick={() => setShowFindModal(true)}>
          <div className="rp-model-helper-icon">
            <Icon.HelpCircle width={28} height={28} />
          </div>
          <span className="rp-model-name">Weet je je model niet?</span>
          <span className="rp-model-code-text">Help mij mijn model te vinden</span>
        </button>

        {filtered.map(m => (
          <button
            key={m.id}
            className={`rp-model-tile${form.modelId === m.id ? ' rp-model-tile--selected' : ''}`}
            onClick={() => { onChange({ modelId: m.id, colorId: m.colors[0]?.id ?? '', repairCatId: '', repairOptId: '' }); onNext() }}
          >
            {form.modelId === m.id && <span className="rp-model-check"><Icon.Check width={12} height={12} /></span>}
            <div className="rp-model-img" style={{ background: `linear-gradient(150deg, ${m.imgColor}dd 0%, ${m.imgColor}66 100%)` }}>
              <Icon.Phone width={28} height={28} style={{ color: '#fff', opacity: 0.9 }} />
            </div>
            <span className="rp-model-name">{m.name}</span>
            <span className="rp-model-code-text">{m.code}</span>
          </button>
        ))}
      </div>

      <div className="rp-not-found-card">
        <div className="rp-not-found-icon"><Icon.Chat width={24} height={24} /></div>
        <div className="rp-not-found-info">
          <p className="rp-not-found-title">{t('reparatie.notFoundModelTitle')}</p>
          <p className="rp-not-found-sub">{t('reparatie.notFoundSub')}</p>
        </div>
        <a href="/contact" className="rp-not-found-cta">{t('reparatie.notFoundCta')}</a>
      </div>

      <div className="rp-actions">
        <button className="rp-btn rp-btn--ghost" onClick={onBack}>{t('reparatie.back')}</button>
      </div>

      {showFindModal && <FindMyModelModal onClose={() => setShowFindModal(false)} />}
    </div>
  )
}

// ─── Screen Quality Modal ────────────────────────────────────────────────────

function ScreenQualityModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="rp-modal-overlay" onClick={onClose}>
      <div className="rp-modal rp-modal--wide" onClick={e => e.stopPropagation()}>
        <button className="rp-modal-close" onClick={onClose}>✕</button>

        <div className="rp-fmm-header">
          <div className="rp-fmm-icon" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>
            <Icon.Info width={24} height={24} />
          </div>
          <div>
            <h3 className="rp-fmm-title">Schermkwaliteiten & Verschillen</h3>
            <p className="rp-fmm-sub">Bij 4Mobiles kun je kiezen uit verschillende soorten beeldschermen. Hieronder leggen we de verschillen uit.</p>
          </div>
        </div>

        <div className="rp-sq-list">
          <div className="rp-sq-item">
            <div className="rp-sq-badge rp-sq-badge--orig">Origineel (Fabriekskwaliteit)</div>
            <p className="rp-sq-title">Origineel Scherm</p>
            <p className="rp-sq-desc">Exact hetzelfde beeldscherm als waarmee jouw telefoon uit de fabriek kwam. Maximale helderheid, perfecte kleurweergave, True Tone en de meest duurzame touchgevoeligheid.</p>
          </div>

          <div className="rp-sq-item">
            <div className="rp-sq-badge rp-sq-badge--refurb">Refurbished Origineel</div>
            <p className="rp-sq-title">Refurbished Origineel Scherm</p>
            <p className="rp-sq-desc">Een origineel Apple of Samsung OLED panel waarvan het gebroken topglas vakkundig is vervangen door nieuw gehard glas. 100% originele beeldkwaliteit voor een scherpere prijs.</p>
          </div>

          <div className="rp-sq-item">
            <div className="rp-sq-badge rp-sq-badge--comp">Compatible (A-Kwaliteit)</div>
            <p className="rp-sq-title">Compatible / High-Copy Scherm</p>
            <p className="rp-sq-desc">Een voordelig alternatief beeldscherm van hoge A-kwaliteit. Zeer geschikt als budgetvriendelijke oplossing voor functioneel herstel van een ouder toestel.</p>
          </div>
        </div>

        <button className="rp-btn rp-btn--primary rp-fmm-close-btn" onClick={onClose}>
          Begrepen
        </button>
      </div>
    </div>
  )
}

// ─── Step 3: Choose Repair ───────────────────────────────────────────────────

const CAT_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  screen: Icon.Crack, battery: Icon.Battery, housing: Icon.Phone,
  camera: Icon.Camera, water: Icon.Drop, other: Icon.Search,
}

function Step3({ form, onChange, onNext, onBack }: { form: FormState; onChange: (p: Partial<FormState>) => void; onNext: () => void; onBack: () => void }) {
  const { t } = useTranslation()
  // All repair categories collapsed by default
  const [openCat, setOpenCat] = useState<string>('')
  const [showQualityModal, setShowQualityModal] = useState(false)

  const model = MODELS[form.brandId]?.find(m => m.id === form.modelId)
  const selectedOpt = REPAIR_CATS.flatMap(c => c.options).find(o => o.id === form.repairOptId)
  const isLight = (hex: string) => ['#f5f5f0','#e8e3d8','#e8e0d0','#e8e8e8','#f0ebe0','#c0bdb5','#c0b99e','#e8d44d','#e8c84d'].includes(hex)
  const catNames = t('reparatie.repairCats', { returnObjects: true }) as { id: string; name: string }[]
  const getCatName = (id: string) => catNames.find(c => c.id === id)?.name ?? id

  return (
    <div className="rp-step-content">
      {model && (
        <div className="rp-device-header-clean">
          {/* 2x Phone Image without card/border */}
          <div className="rp-device-large-img" style={{ background: `linear-gradient(150deg, ${model.imgColor}dd, ${model.imgColor}55)` }}>
            <Icon.Phone width={48} height={48} style={{ color: '#fff', opacity: 0.95 }} />
          </div>
          <div className="rp-device-clean-info">
            <h3 className="rp-device-large-title">{model.name}</h3>
            <p className="rp-device-code-sub">{model.code}</p>

            {/* Desktop Only Badges */}
            <div className="rp-device-header-badges rp-desktop-only">
              <span><Icon.Shield width={12} height={12} /> {t('reparatie.badge6mnd')}</span>
              <span><Icon.Check width={12} height={12} /> {t('reparatie.badgeTransparent')}</span>
              <span><Icon.Clock width={12} height={12} /> {t('reparatie.badgeFast')}</span>
            </div>
          </div>
        </div>
      )}

      {model && (
        <div className="rp-color-section">
          <p className="rp-section-title">{t('reparatie.s3ColorTitle')}</p>
          <div className="rp-color-row">
            {model.colors.map(c => (
              <button
                key={c.id}
                className={`rp-color-swatch${form.colorId === c.id ? ' rp-color-swatch--selected' : ''}`}
                style={{ background: c.hex }}
                title={c.name}
                onClick={() => onChange({ colorId: c.id })}
              >
                {form.colorId === c.id && (
                  <Icon.Check width={10} height={10} style={{ color: isLight(c.hex) ? '#333' : '#fff' }} />
                )}
              </button>
            ))}
            <span className="rp-color-label">{model.colors.find(c => c.id === form.colorId)?.name}</span>
          </div>
        </div>
      )}

      {/* Repair Accordion — Collapsed by default */}
      <div className="rp-repair-section">
        <p className="rp-section-title">{t('reparatie.s3RepairTitle')}</p>
        <div className="rp-repair-cats">
          {REPAIR_CATS.map(cat => {
            const CatIcon = CAT_ICONS[cat.id] ?? Icon.Wrench
            return (
              <div key={cat.id} className={`rp-cat${openCat === cat.id ? ' rp-cat--open' : ''}`}>
                <button className="rp-cat-header" onClick={() => setOpenCat(openCat === cat.id ? '' : cat.id)}>
                  {/* Large Icon without surrounding frame */}
                  <span className="rp-cat-icon-frameless"><CatIcon width={26} height={26} /></span>
                  <span className="rp-cat-name">{getCatName(cat.id)}</span>
                  {/* Lowercase vanaf */}
                  <span className="rp-cat-from">vanaf €{cat.fromPrice.toFixed(2).replace('.', ',')}</span>
                  <span className="rp-cat-chevron">›</span>
                </button>
                {openCat === cat.id && (
                  <div className="rp-cat-options">
                    {cat.options.map(opt => (
                      <label key={opt.id} className={`rp-option${form.repairOptId === opt.id ? ' rp-option--selected' : ''}`}>
                        <input
                          type="radio"
                          name="repair"
                          value={opt.id}
                          checked={form.repairOptId === opt.id}
                          onChange={() => onChange({ repairCatId: cat.id, repairOptId: opt.id })}
                          className="rp-option-radio"
                        />
                        <div className="rp-option-body">
                          <div className="rp-option-top">
                            <span className="rp-option-name">
                              {opt.name}
                              {/* Blue "Meest gekozen" Badge */}
                              {opt.badge && <span className="rp-option-badge-blue">Meest gekozen</span>}
                            </span>
                            {/* Accessible Darker Green Price */}
                            <span className="rp-option-price-dark">€{opt.price.toFixed(2).replace('.', ',')}</span>
                          </div>
                          <p className="rp-option-desc">{opt.desc}</p>
                          <div className="rp-option-meta">
                            <span className={`rp-option-stock${opt.stock === 'Op voorraad' ? ' rp-option-stock--ok' : ' rp-option-stock--low'}`}>
                              <span className="rp-stock-dot" /> {opt.stock === 'Op voorraad' ? t('reparatie.inStock') : t('reparatie.lowStock')}
                            </span>
                            <span className="rp-option-time">
                              <Icon.Clock width={12} height={12} /> {opt.repairTime}
                              {/* Blue Info Icon for Screen Quality Modal */}
                              {cat.id === 'screen' && (
                                <button
                                  type="button"
                                  className="rp-info-btn-blue"
                                  onClick={(e) => { e.stopPropagation(); setShowQualityModal(true) }}
                                  title="Bekijk schermkwaliteiten"
                                >
                                  <Icon.Info width={15} height={15} />
                                </button>
                              )}
                            </span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Back Button */}
      <div className="rp-actions">
        <button className="rp-btn rp-btn--ghost" onClick={onBack}>{t('reparatie.back')}</button>
      </div>

      {/* Single Sticky CTA Bar: "Laatste stap" */}
      <div className="rp-sticky-bar-wrap">
        <div className={`rp-sticky-bar${selectedOpt ? ' active' : ''}`}>
          <div className="rp-sticky-bar-info">
            <span className="rp-sticky-bar-repair">{selectedOpt ? selectedOpt.name : 'Selecteer een reparatie...'}</span>
            <span className="rp-sticky-bar-price">{selectedOpt ? `€${selectedOpt.price.toFixed(2).replace('.', ',')}` : ''}</span>
          </div>
          <button className="rp-btn rp-btn--primary" onClick={onNext} disabled={!selectedOpt}>
            Laatste stap <Icon.ArrowRight width={16} height={16} />
          </button>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="rp-seo-section">
        <h3 className="rp-seo-title">Telefoon Reparatie bij 4Mobiles in het Westland</h3>
        <p className="rp-seo-text">
          Is het beeldscherm van jouw smartphone gebroken, laadt de batterij niet meer goed op of heeft je telefoon waterschade opgelopen? Bij <strong>4Mobiles</strong> in Naaldwijk staan onze professionele monteurs klaar om jouw telefoon snel, vakkundig en transparant te herstellen. Wij werken uitsluitend met hoogwaardige onderdelen en bieden standaard garantie op al onze reparaties.
        </p>
        <div className="rp-seo-grid">
          <div>
            <strong>Schermvervanging</strong>
            <p>Van iPhone en Samsung tot Xiaomi en Oppo: wij vervangen je gebroken scherm binnen 30-60 minuten met behoud van True Tone en touchkwaliteit.</p>
          </div>
          <div>
            <strong>Batterij & Opladen</strong>
            <p>Loopt je accu snel leeg of laadt het toestel niet meer op? Wij vervangen je batterij en laadpoort direct uit voorraad.</p>
          </div>
        </div>
        <p className="rp-seo-links">
          Heb je vragen of specifieke verzoeken? <a href="/contact" className="rp-link">Neem contact met ons op</a> of bekijk onze <a href="/regio" className="rp-link">regionale vestigingsinformatie</a>.
        </p>
      </div>

      {showQualityModal && <ScreenQualityModal onClose={() => setShowQualityModal(false)} />}
    </div>
  )
}

// ─── Step 4: Complete Appointment ───────────────────────────────────────────

function Step4({ form, onChange, onConfirm, onBack }: {
  form: FormState; onChange: (p: Partial<FormState>) => void; onConfirm: () => void; onBack: () => void
}) {
  const { t } = useTranslation()
  const dayShortArr = t('reparatie.days', { returnObjects: true }) as string[]
  const monthShortArr = t('reparatie.months', { returnObjects: true }) as string[]
  const dayLongArr = t('reparatie.longDays', { returnObjects: true }) as string[]
  const monthLongArr = t('reparatie.longMonths', { returnObjects: true }) as string[]
  const days = useMemo(() => getNext7Days(dayShortArr, monthShortArr), [])
  const model = MODELS[form.brandId]?.find(m => m.id === form.modelId)
  const selectedOpt = REPAIR_CATS.flatMap(c => c.options).find(o => o.id === form.repairOptId)
  const color = model?.colors.find(c => c.id === form.colorId)

  // Validation: Enabled only when required fields completed
  const isPost = form.serviceMethod === 'post'
  const canSubmit = form.naam.trim() && form.telefoon.trim() && form.email.trim() && form.agree && form.datum && form.tijd &&
    (!isPost || (form.straat.trim() && form.huisnummer.trim() && form.postcode.trim() && form.plaats.trim()))

  return (
    <div className="rp-booking-wrap">
      <div className="rp-booking-form">
        {/* Contact Details */}
        <div className="rp-booking-section">
          <div className="rp-booking-section-header">
            <Icon.Shield width={20} height={20} />
            <h3 className="rp-booking-section-title">{t('reparatie.s4DetailsTitle')}</h3>
          </div>
          <div className="rp-form-grid">
            <div className="rp-field rp-field--full">
              <label className="rp-label" htmlFor="rp-naam">{t('reparatie.labelName')} <span className="rp-required">*</span></label>
              <input id="rp-naam" className="rp-input" type="text" placeholder={t('reparatie.placeholderName')} value={form.naam} onChange={e => onChange({ naam: e.target.value })} />
            </div>
            <div className="rp-field">
              <label className="rp-label" htmlFor="rp-tel">{t('reparatie.labelPhone')} <span className="rp-required">*</span></label>
              <input id="rp-tel" className="rp-input" type="tel" placeholder={t('reparatie.placeholderPhone')} value={form.telefoon} onChange={e => onChange({ telefoon: e.target.value })} />
            </div>
            <div className="rp-field">
              <label className="rp-label" htmlFor="rp-email">{t('reparatie.labelEmail')} <span className="rp-required">*</span></label>
              <input id="rp-email" className="rp-input" type="email" placeholder={t('reparatie.placeholderEmail')} value={form.email} onChange={e => onChange({ email: e.target.value })} />
            </div>
          </div>
          <label className="rp-agree-row">
            <input type="checkbox" checked={form.agree} onChange={e => onChange({ agree: e.target.checked })} />
            <span>{t('reparatie.agreeText')} <a href="/algemene-voorwaarden" className="rp-link">{t('reparatie.termsLabel')}</a> {t('reparatie.andLabel')} <a href="/privacybeleid" className="rp-link">{t('reparatie.privacyLabel')}</a>.</span>
          </label>
        </div>

        {/* Service Method Section */}
        <div className="rp-booking-section">
          <div className="rp-booking-section-header">
            <Icon.Cart width={20} height={20} />
            <h3 className="rp-booking-section-title">{t('reparatie.s4ServiceTitle')}</h3>
          </div>

          <div className="rp-service-methods">
            <label className={`rp-service-card${form.serviceMethod === 'store' ? ' rp-service-card--selected' : ''}`}>
              <input type="radio" name="service" value="store" checked={form.serviceMethod === 'store'} onChange={() => onChange({ serviceMethod: 'store' })} />
              <div className="rp-service-card-inner">
                <div className="rp-service-card-row">
                  <Icon.Cart width={18} height={18} />
                  <div>
                    <p className="rp-service-title">Langskomen in de winkel (Walk-in)</p>
                    <p className="rp-service-sub">Loop zonder afspraak of op tijdstip binnen bij onze winkel.</p>
                  </div>
                </div>
                <p className="rp-service-address">
                  <Icon.Pin width={13} height={13} /> 4Mobiles Winkel
                </p>
              </div>
            </label>

            <label className={`rp-service-card${form.serviceMethod === 'post' ? ' rp-service-card--selected' : ''}`}>
              <input type="radio" name="service" value="post" checked={form.serviceMethod === 'post'} onChange={() => onChange({ serviceMethod: 'post' })} />
              <div className="rp-service-card-inner">
                <div className="rp-service-card-row">
                  <Icon.Truck width={18} height={18} />
                  <div>
                    <p className="rp-service-title">Versturen per post</p>
                    <p className="rp-service-sub">Stuur je toestel gratis & verzekerd naar 4Mobiles.</p>
                  </div>
                </div>
              </div>
            </label>
          </div>

          {/* Postal Dropdown Form Container */}
          {form.serviceMethod === 'post' && (
            <div className="rp-post-dropdown-container">
              <h4 className="rp-post-dropdown-title">Adresgegevens voor retourzending</h4>
              <div className="rp-form-grid">
                <div className="rp-field">
                  <label className="rp-label">Straatnaam <span className="rp-required">*</span></label>
                  <input className="rp-input" type="text" placeholder="bijv. Molenstraat" value={form.straat} onChange={e => onChange({ straat: e.target.value })} />
                </div>
                <div className="rp-field">
                  <label className="rp-label">Huisnummer & Toevoeging <span className="rp-required">*</span></label>
                  <input className="rp-input" type="text" placeholder="bijv. 12B" value={form.huisnummer} onChange={e => onChange({ huisnummer: e.target.value })} />
                </div>
                <div className="rp-field">
                  <label className="rp-label">Postcode <span className="rp-required">*</span></label>
                  <input className="rp-input" type="text" placeholder="bijv. 2671 BW" value={form.postcode} onChange={e => onChange({ postcode: e.target.value })} />
                </div>
                <div className="rp-field">
                  <label className="rp-label">Plaats <span className="rp-required">*</span></label>
                  <input className="rp-input" type="text" placeholder="bijv. Naaldwijk" value={form.plaats} onChange={e => onChange({ plaats: e.target.value })} />
                </div>
              </div>

              <div className="rp-post-instructions">
                <p className="rp-post-inst-title"><Icon.Info width={15} height={15} /> Opstuurinstructies:</p>
                <ul>
                  <li>Pak je toestel stevig in met bubbeltjesplastic.</li>
                  <li>Stuur je telefoon op zonder SIM-kaart, hoesje of accessoires.</li>
                  <li>Na bevestiging ontvang je direct een gratis verzendlabel per e-mail.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Appointment Date & Time Section */}
        <div className="rp-booking-section">
          <div className="rp-booking-section-header">
            <Icon.Calendar width={20} height={20} />
            <h3 className="rp-booking-section-title">{t('reparatie.s4DateTitle')}</h3>
          </div>
          <p className="rp-booking-section-label">{t('reparatie.s4DateLabel')}</p>
          <div className="rp-week-grid">
            {days.map(d => (
              <button key={d.value} className={`rp-week-btn${form.datum === d.value ? ' rp-week-btn--selected' : ''}`} onClick={() => onChange({ datum: d.value })}>
                <span className="rp-week-day">{d.dayShort}</span>
                <span className="rp-week-date">{d.dateNum}</span>
                <span className="rp-week-month">{d.monthShort}</span>
              </button>
            ))}
          </div>
          <p className="rp-booking-section-label" style={{ marginTop: 16 }}>
            {t('reparatie.s4TimeLabel')} <span className="rp-popular-badge">{t('reparatie.popularBadge')}</span>
          </p>
          <div className="rp-time-full-grid">
            {TIME_SLOTS.map(slot => (
              <button key={slot} className={`rp-time-btn${form.tijd === slot ? ' rp-time-btn--selected' : ''}`} onClick={() => onChange({ tijd: slot })}>{slot}</button>
            ))}
          </div>
        </div>

        <div className="rp-actions rp-actions--spread">
          <button className="rp-btn rp-btn--ghost" onClick={onBack}>{t('reparatie.back')}</button>
        </div>
      </div>

      {/* Appointment Summary Sidebar */}
      <aside className="rp-booking-sidebar">
        <div className="rp-sidebar-card">
          {model && (
            <div className="rp-sidebar-device-frameless">
              {/* Larger device image without frame */}
              <div className="rp-sidebar-large-img" style={{ background: `linear-gradient(150deg, ${model.imgColor}dd, ${model.imgColor}55)` }}>
                <Icon.Phone width={36} height={36} style={{ color: '#fff', opacity: 0.95 }} />
              </div>
              <div>
                <p className="rp-sidebar-device-name">{model.name}</p>
                <p className="rp-sidebar-device-code">{model.code}</p>
                {color && (
                  <p className="rp-sidebar-device-color">
                    <span className="rp-sidebar-color-dot" style={{ background: color.hex }} />{color.name}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="rp-sidebar-rows">
            {selectedOpt && (
              <>
                <div className="rp-sidebar-row">
                  <Icon.Wrench width={14} height={14} />
                  <span className="rp-sidebar-label">Reparatie</span>
                  <span className="rp-sidebar-value">{selectedOpt.name}</span>
                </div>
                <div className="rp-sidebar-row">
                  <Icon.Clock width={14} height={14} />
                  <span className="rp-sidebar-label">Duur</span>
                  <span className="rp-sidebar-value">{selectedOpt.repairTime}</span>
                </div>
              </>
            )}
            <div className="rp-sidebar-row">
              <Icon.Cart width={14} height={14} />
              <span className="rp-sidebar-label">Service</span>
              <span className="rp-sidebar-value">
                {form.serviceMethod === 'store' ? 'Walk-in' : 'Versturen per post'}
              </span>
            </div>
            {form.serviceMethod === 'store' && (
              <div className="rp-sidebar-row">
                <Icon.Pin width={14} height={14} />
                <span className="rp-sidebar-label">Locatie</span>
                <span className="rp-sidebar-value">4Mobiles</span>
              </div>
            )}
            {form.datum && (
              <div className="rp-sidebar-row">
                <Icon.Calendar width={14} height={14} />
                <span className="rp-sidebar-label">Tijdstip</span>
                <span className="rp-sidebar-value">{formatLongDate(form.datum, dayLongArr, monthLongArr)}{form.tijd && `, ${form.tijd} uur`}</span>
              </div>
            )}
          </div>

          {selectedOpt && (
            <div className="rp-sidebar-total">
              <span>Totaal (incl. BTW)</span>
              <span className="rp-sidebar-total-price">€{selectedOpt.price.toFixed(2).replace('.', ',')}</span>
            </div>
          )}

          {/* CTA: Bevestig afspraak */}
          <button className="rp-btn rp-btn--primary rp-sidebar-btn" onClick={onConfirm} disabled={!canSubmit}>
            Bevestig afspraak <Icon.ArrowRight width={16} height={16} />
          </button>
          <p className="rp-sidebar-pay-note">Betaling pas achteraf in de winkel of na herstel.</p>
        </div>
      </aside>
    </div>
  )
}

// ─── Confirmation Modal ──────────────────────────────────────────────────────

function ConfirmationModal({ form, onClose }: { form: FormState; onClose: () => void }) {
  const { t } = useTranslation()
  const dayLongArr = t('reparatie.longDays', { returnObjects: true }) as string[]
  const monthLongArr = t('reparatie.longMonths', { returnObjects: true }) as string[]
  const model = MODELS[form.brandId]?.find(m => m.id === form.modelId)
  const selectedOpt = REPAIR_CATS.flatMap(c => c.options).find(o => o.id === form.repairOptId)

  return (
    <div className="rp-modal-overlay" onClick={onClose}>
      <div className="rp-modal" onClick={e => e.stopPropagation()}>
        <button className="rp-modal-close" onClick={onClose}>✕</button>
        <div className="rp-modal-check"><Icon.Check width={30} height={30} /></div>
        <h2 className="rp-modal-title">Afspraak Bevestigd!</h2>
        <p className="rp-modal-sub">Bedankt voor je aanvraag bij 4Mobiles. Wij gaan direct voor je aan de slag.</p>

        <div className="rp-modal-summary">
          <h3 className="rp-modal-summary-title">Afspraakoverzicht</h3>
          {model && (
            <div className="rp-modal-row">
              <Icon.Phone width={15} height={15} /><span className="rp-modal-label">Toestel:</span><span className="rp-modal-value">{model.name} ({model.code})</span>
            </div>
          )}
          {selectedOpt && (
            <div className="rp-modal-row">
              <Icon.Wrench width={15} height={15} /><span className="rp-modal-label">Reparatie:</span><span className="rp-modal-value">{selectedOpt.name}</span>
            </div>
          )}
          {form.datum && (
            <div className="rp-modal-row">
              <Icon.Calendar width={15} height={15} /><span className="rp-modal-label">Tijdstip:</span><span className="rp-modal-value">{formatLongDate(form.datum, dayLongArr, monthLongArr)}{form.tijd && `, ${form.tijd} uur`}</span>
            </div>
          )}
          <div className="rp-modal-row">
            <Icon.Cart width={15} height={15} /><span className="rp-modal-label">Service:</span><span className="rp-modal-value">{form.serviceMethod === 'store' ? 'Walk-in' : 'Versturen per post'}</span>
          </div>
        </div>

        <a href="/" className="rp-btn rp-btn--primary rp-modal-home-btn">
          <Icon.Check width={16} height={16} /> Terug naar home
        </a>
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

const BRAND_FROM_SLUG: Record<string, string> = {
  iphone: 'apple', ipad: 'apple', galaxy: 'samsung', samsung: 'samsung',
  motorola: 'motorola', xiaomi: 'xiaomi', redmi: 'xiaomi',
  oppo: 'oppo', huawei: 'huawei', oneplus: 'oneplus',
  sony: 'sony', xperia: 'sony', pixel: 'google', google: 'google',
}

export function Reparatie() {
  const { slug } = useParams<{ slug?: string }>()
  const presetBrand = slug
    ? (Object.entries(BRAND_FROM_SLUG).find(([k]) => slug.toLowerCase().startsWith(k))?.[1] ?? '')
    : ''
  const [step, setStep] = useState(presetBrand ? 2 : 1)
  const [form, setForm] = useState<FormState>({ ...INITIAL, brandId: presetBrand })
  const [confirmed, setConfirmed] = useState(false)

  function patch(updates: Partial<FormState>) { setForm(prev => ({ ...prev, ...updates })) }
  function next() { setStep(s => Math.min(s + 1, 4)); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  function back() { setStep(s => Math.max(s - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <Layout>
      <section className="rp-page">
        <div className="rp-container">
          <div className="rp-card">
            <StepIndicator step={step} />
            <div className="rp-card-body">
              {step === 1 && <Step1 form={form} onChange={patch} onNext={next} />}
              {step === 2 && <Step2 form={form} onChange={patch} onNext={next} onBack={back} />}
              {step === 3 && <Step3 form={form} onChange={patch} onNext={next} onBack={back} />}
              {step === 4 && <Step4 form={form} onChange={patch} onConfirm={() => setConfirmed(true)} onBack={back} />}
            </div>
          </div>
        </div>
      </section>
      {confirmed && <ConfirmationModal form={form} onClose={() => { setConfirmed(false); window.location.href = '/' }} />}
    </Layout>
  )
}

import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Icon } from '../components/Icons'

// ─── Types ──────────────────────────────────────────────────────────────────

interface Brand { id: string; name: string; wordmark: string; bg: string; fg: string }
interface DeviceColor { id: string; name: string; hex: string }
interface DeviceModel { id: string; name: string; imgColor: string; colors: DeviceColor[] }
interface RepairOption {
  id: string; name: string; badge?: string; desc: string
  price: number; stock: 'Op voorraad' | 'Beperkt op voorraad'; repairTime: string
}
interface RepairCategory { id: string; name: string; fromPrice: number; options: RepairOption[] }

// ─── Brands ─────────────────────────────────────────────────────────────────

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

// ─── Models ─────────────────────────────────────────────────────────────────

const MODELS: Record<string, DeviceModel[]> = {
  apple: [
    { id: 'iphone-16-pro',  name: 'iPhone 16 Pro',   imgColor: '#4a4a45',
      colors: [{ id: 'natural', name: 'Natural Titanium', hex: '#c0b99e' }, { id: 'white', name: 'White Titanium', hex: '#e8e3d8' }, { id: 'black', name: 'Black Titanium', hex: '#3d3b37' }, { id: 'desert', name: 'Desert Titanium', hex: '#c9a97d' }] },
    { id: 'iphone-16',      name: 'iPhone 16',        imgColor: '#5d7d9e',
      colors: [{ id: 'black', name: 'Zwart', hex: '#1c1c1e' }, { id: 'white', name: 'Wit', hex: '#f5f5f0' }, { id: 'pink', name: 'Roze', hex: '#f1a7b4' }, { id: 'teal', name: 'Teal', hex: '#4a9d8e' }, { id: 'ultra', name: 'Ultramarine', hex: '#3d5fa0' }] },
    { id: 'iphone-15-pro',  name: 'iPhone 15 Pro',   imgColor: '#6e6e6e',
      colors: [{ id: 'natural', name: 'Natural Titanium', hex: '#c0b99e' }, { id: 'blue', name: 'Blue Titanium', hex: '#4a6b8a' }, { id: 'white', name: 'White Titanium', hex: '#e8e3d8' }, { id: 'black', name: 'Black Titanium', hex: '#3d3b37' }] },
    { id: 'iphone-15',      name: 'iPhone 15',        imgColor: '#4a7f9e',
      colors: [{ id: 'black', name: 'Zwart', hex: '#1c1c1e' }, { id: 'blue', name: 'Blauw', hex: '#3d6b9e' }, { id: 'green', name: 'Groen', hex: '#4a8a5e' }, { id: 'yellow', name: 'Geel', hex: '#e8d44d' }, { id: 'pink', name: 'Roze', hex: '#f1a7b4' }] },
    { id: 'iphone-14-pro',  name: 'iPhone 14 Pro',   imgColor: '#5a5a52',
      colors: [{ id: 'graphite', name: 'Grafiet', hex: '#4a4a45' }, { id: 'silver', name: 'Zilver', hex: '#c0bdb5' }, { id: 'gold', name: 'Goud', hex: '#c9a97d' }, { id: 'sierra', name: 'Sierra Blue', hex: '#8aadcc' }, { id: 'alpine', name: 'Alpine Green', hex: '#4a6b55' }] },
    { id: 'iphone-14',      name: 'iPhone 14',        imgColor: '#6a8ca0',
      colors: [{ id: 'midnight', name: 'Midnight', hex: '#1c1c1e' }, { id: 'starlight', name: 'Starlight', hex: '#e8e3d8' }, { id: 'blue', name: 'Blauw', hex: '#3d6b9e' }, { id: 'purple', name: 'Paars', hex: '#7a5a8a' }, { id: 'yellow', name: 'Geel', hex: '#fcd34d' }, { id: 'red', name: 'Rood', hex: '#e02020' }] },
    { id: 'iphone-13-pro',  name: 'iPhone 13 Pro',   imgColor: '#5a6e7a',
      colors: [{ id: 'graphite', name: 'Grafiet', hex: '#4a4a45' }, { id: 'gold', name: 'Goud', hex: '#c9a97d' }, { id: 'silver', name: 'Zilver', hex: '#c0bdb5' }, { id: 'sierra', name: 'Sierra Blue', hex: '#8aadcc' }, { id: 'alpine', name: 'Alpine Green', hex: '#4a6b55' }] },
    { id: 'iphone-13',      name: 'iPhone 13',        imgColor: '#6a7a8a',
      colors: [{ id: 'midnight', name: 'Midnight', hex: '#1c1c1e' }, { id: 'starlight', name: 'Starlight', hex: '#e8e3d8' }, { id: 'blue', name: 'Blauw', hex: '#3d6b9e' }, { id: 'pink', name: 'Roze', hex: '#f1a7b4' }, { id: 'red', name: 'Rood', hex: '#e02020' }, { id: 'green', name: 'Groen', hex: '#4a8a5e' }] },
    { id: 'iphone-12',      name: 'iPhone 12',        imgColor: '#7a8a9a',
      colors: [{ id: 'black', name: 'Zwart', hex: '#1c1c1e' }, { id: 'white', name: 'Wit', hex: '#f5f5f0' }, { id: 'red', name: 'Rood', hex: '#e02020' }, { id: 'blue', name: 'Blauw', hex: '#3d6b9e' }, { id: 'green', name: 'Groen', hex: '#4a8a5e' }, { id: 'purple', name: 'Paars', hex: '#7a5a8a' }] },
    { id: 'iphone-se-2022', name: 'iPhone SE (2022)', imgColor: '#8a8a8a',
      colors: [{ id: 'midnight', name: 'Midnight', hex: '#1c1c1e' }, { id: 'starlight', name: 'Starlight', hex: '#e8e3d8' }, { id: 'red', name: 'Rood', hex: '#e02020' }] },
  ],
  samsung: [
    { id: 's24-ultra', name: 'Galaxy S24 Ultra', imgColor: '#2d2d2d',
      colors: [{ id: 'black', name: 'Titanium Black', hex: '#2d2d2d' }, { id: 'gray', name: 'Titanium Gray', hex: '#8a8a8a' }, { id: 'violet', name: 'Titanium Violet', hex: '#6a4a8a' }, { id: 'yellow', name: 'Titanium Yellow', hex: '#e8c84d' }] },
    { id: 's24-plus',  name: 'Galaxy S24+',      imgColor: '#1a3a5e',
      colors: [{ id: 'black', name: 'Onyx Black', hex: '#1c1c1e' }, { id: 'gray', name: 'Marble Gray', hex: '#8a8a8a' }, { id: 'violet', name: 'Cobalt Violet', hex: '#4a3a7a' }] },
    { id: 's24',       name: 'Galaxy S24',        imgColor: '#2a4a6a',
      colors: [{ id: 'black', name: 'Onyx Black', hex: '#1c1c1e' }, { id: 'gray', name: 'Marble Gray', hex: '#8a8a8a' }, { id: 'violet', name: 'Cobalt Violet', hex: '#4a3a7a' }] },
    { id: 's23',       name: 'Galaxy S23',        imgColor: '#3a3a3a',
      colors: [{ id: 'black', name: 'Phantom Black', hex: '#1a1a1a' }, { id: 'cream', name: 'Cream', hex: '#f0ebe0' }, { id: 'green', name: 'Green', hex: '#4a8a6a' }, { id: 'lavender', name: 'Lavender', hex: '#c4b8d0' }] },
    { id: 'a55', name: 'Galaxy A55', imgColor: '#4a6a8a',
      colors: [{ id: 'black', name: 'Awesome Black', hex: '#1c1c1e' }, { id: 'blue', name: 'Awesome Iceblue', hex: '#7ab3d0' }, { id: 'lilac', name: 'Awesome Lilac', hex: '#b8a0d0' }] },
    { id: 'a35', name: 'Galaxy A35', imgColor: '#5a7a9a',
      colors: [{ id: 'black', name: 'Awesome Black', hex: '#1c1c1e' }, { id: 'blue', name: 'Awesome Iceblue', hex: '#7ab3d0' }] },
  ],
  motorola: [
    { id: 'edge-50-pro', name: 'Edge 50 Pro',  imgColor: '#4a2a6a', colors: [{ id: 'black', name: 'Black Beauty', hex: '#1c1c1e' }, { id: 'purple', name: 'Luxe Lavender', hex: '#8a6aa0' }] },
    { id: 'edge-40',     name: 'Edge 40',       imgColor: '#3a4a5a', colors: [{ id: 'black', name: 'Eclipse Black', hex: '#1c1c1e' }, { id: 'green', name: 'Nebula Green', hex: '#3a7a5a' }] },
    { id: 'moto-g84',   name: 'Moto G84',      imgColor: '#2a3a4a', colors: [{ id: 'blue', name: 'Midnight Blue', hex: '#1c2a3e' }, { id: 'magenta', name: 'Viva Magenta', hex: '#c03060' }] },
    { id: 'moto-g54',   name: 'Moto G54',      imgColor: '#3a5a7a', colors: [{ id: 'blue', name: 'Pearl Blue', hex: '#6a9ab8' }, { id: 'green', name: 'Mint Green', hex: '#6ab890' }] },
  ],
  xiaomi: [
    { id: 'xiaomi-14',     name: 'Xiaomi 14',      imgColor: '#1a1a1a', colors: [{ id: 'black', name: 'Zwart', hex: '#1c1c1e' }, { id: 'white', name: 'Wit', hex: '#f5f5f0' }, { id: 'green', name: 'Jade Green', hex: '#4a8a7a' }] },
    { id: 'xiaomi-13t',    name: 'Xiaomi 13T',     imgColor: '#2a3a4a', colors: [{ id: 'black', name: 'Black', hex: '#1c1c1e' }, { id: 'blue', name: 'Alpine Blue', hex: '#4a6a9a' }, { id: 'meadow', name: 'Meadow Green', hex: '#5a8a6a' }] },
    { id: 'redmi-note-13', name: 'Redmi Note 13',  imgColor: '#4a6a9a', colors: [{ id: 'black', name: 'Graphite Black', hex: '#2a2a2a' }, { id: 'blue', name: 'Ice Blue', hex: '#8ab8d0' }] },
    { id: 'redmi-note-12', name: 'Redmi Note 12',  imgColor: '#5a7a9a', colors: [{ id: 'black', name: 'Onyx Gray', hex: '#3a3a3a' }, { id: 'blue', name: 'Ice Blue', hex: '#8ab8d0' }] },
  ],
  oppo: [
    { id: 'reno11', name: 'Reno11', imgColor: '#4a6a8a', colors: [{ id: 'black', name: 'Dark Matter', hex: '#1c1c1e' }, { id: 'blue', name: 'Sky Blue', hex: '#7ab0c8' }] },
    { id: 'reno10', name: 'Reno10', imgColor: '#5a7a9a', colors: [{ id: 'purple', name: 'Glossy Purple', hex: '#7a5a9a' }, { id: 'blue', name: 'Ice Blue', hex: '#8ab8d0' }] },
    { id: 'a98',    name: 'A98',    imgColor: '#3a5a7a', colors: [{ id: 'black', name: 'Cool Black', hex: '#2a2a2a' }, { id: 'blue', name: 'Dreamy Blue', hex: '#7ab0c8' }] },
  ],
  huawei: [
    { id: 'p60-pro', name: 'P60 Pro',  imgColor: '#2a4a6a', colors: [{ id: 'black', name: 'Black', hex: '#1c1c1e' }, { id: 'white', name: 'Rococo Pearl', hex: '#e8e3d8' }] },
    { id: 'nova-11', name: 'Nova 11',  imgColor: '#4a5a6a', colors: [{ id: 'black', name: 'Black', hex: '#1c1c1e' }, { id: 'silver', name: 'Silver', hex: '#c0bdb5' }] },
    { id: 'mate-50', name: 'Mate 50',  imgColor: '#2a3a4a', colors: [{ id: 'black', name: 'Black', hex: '#1c1c1e' }, { id: 'orange', name: 'Orange', hex: '#e87a30' }] },
  ],
  oneplus: [
    { id: 'op12',   name: 'OnePlus 12', imgColor: '#1a1a1a', colors: [{ id: 'black', name: 'Silky Black', hex: '#1c1c1e' }, { id: 'green', name: 'Flowy Emerald', hex: '#3a7a6a' }] },
    { id: 'op11',   name: 'OnePlus 11', imgColor: '#2a2a2a', colors: [{ id: 'black', name: 'Titan Black', hex: '#1c1c1e' }, { id: 'green', name: 'Eternal Green', hex: '#3a6a5a' }] },
    { id: 'nord-4', name: 'Nord 4',     imgColor: '#4a6a8a', colors: [{ id: 'silver', name: 'Mercurial Silver', hex: '#c0bdb5' }, { id: 'green', name: 'Oasis Green', hex: '#5a9a8a' }] },
  ],
  sony: [
    { id: 'xperia-1-vi', name: 'Xperia 1 VI',   imgColor: '#1a2a3a', colors: [{ id: 'black', name: 'Black', hex: '#1c1c1e' }, { id: 'platinum', name: 'Platinum Silver', hex: '#c0bdb5' }, { id: 'khaki', name: 'Khaki Green', hex: '#7a8a6a' }] },
    { id: 'xperia-5-v',  name: 'Xperia 5 V',    imgColor: '#2a3a4a', colors: [{ id: 'black', name: 'Black', hex: '#1c1c1e' }, { id: 'platinum', name: 'Platinum Silver', hex: '#c0bdb5' }] },
    { id: 'xperia-10-vi', name: 'Xperia 10 VI', imgColor: '#3a4a5a', colors: [{ id: 'black', name: 'Black', hex: '#1c1c1e' }, { id: 'white', name: 'White', hex: '#f5f5f0' }, { id: 'lavender', name: 'Lavender', hex: '#c4b8d0' }] },
  ],
  google: [
    { id: 'pixel-9-pro', name: 'Pixel 9 Pro', imgColor: '#2a2a2a', colors: [{ id: 'obsidian', name: 'Obsidian', hex: '#1c1c1e' }, { id: 'porcelain', name: 'Porcelain', hex: '#e8e0d0' }, { id: 'hazel', name: 'Hazel', hex: '#6a7a6a' }, { id: 'rose', name: 'Rose Quartz', hex: '#d8b0b8' }] },
    { id: 'pixel-9',     name: 'Pixel 9',     imgColor: '#3a3a3a', colors: [{ id: 'obsidian', name: 'Obsidian', hex: '#1c1c1e' }, { id: 'porcelain', name: 'Porcelain', hex: '#e8e0d0' }, { id: 'wintergreen', name: 'Wintergreen', hex: '#6a9a8a' }, { id: 'peony', name: 'Peony', hex: '#e0a0b0' }] },
    { id: 'pixel-8',     name: 'Pixel 8',     imgColor: '#4a4a4a', colors: [{ id: 'obsidian', name: 'Obsidian', hex: '#1c1c1e' }, { id: 'hazel', name: 'Hazel', hex: '#6a7a6a' }, { id: 'rose', name: 'Rose', hex: '#d8a0a8' }] },
    { id: 'pixel-7a',    name: 'Pixel 7a',    imgColor: '#5a5a5a', colors: [{ id: 'charcoal', name: 'Charcoal', hex: '#3a3a3a' }, { id: 'snow', name: 'Snow', hex: '#e8e8e8' }, { id: 'sea', name: 'Sea', hex: '#5a9aaa' }, { id: 'coral', name: 'Coral', hex: '#e87a6a' }] },
  ],
}

// ─── Repair categories ───────────────────────────────────────────────────────

const REPAIR_CATS: RepairCategory[] = [
  {
    id: 'screen', name: 'Beeldscherm en glas', fromPrice: 69,
    options: [
      { id: 'screen-original', name: 'Display / scherm module vervangen', badge: 'Meest gekozen', desc: 'Het beeldscherm/glas van jouw toestel is gebroken, gebarsten of beschadigd of jouw touchscreen reageert (deels) niet meer.', price: 89.95, stock: 'Op voorraad', repairTime: '90 minuten' },
      { id: 'screen-refurbished', name: 'Display / scherm module vervangen refurbished', desc: 'Origineel gereviseerd scherm voor volledig en betrouwbaar herstel van jouw toestel.', price: 139.95, stock: 'Op voorraad', repairTime: '120 minuten' },
      { id: 'screen-compatible', name: 'Display / scherm module vervangen compatible', desc: 'Voordelige schermmodule voor functioneel scherm.', price: 99.95, stock: 'Op voorraad', repairTime: '120 minuten' },
    ],
  },
  {
    id: 'battery', name: 'Batterij en opladen', fromPrice: 49,
    options: [
      { id: 'battery-replace', name: 'Batterij vervangen', badge: 'Meest gekozen', desc: 'Jouw batterij laadt niet meer goed op, de telefoon gaat snel leeg of hij gaat onverwachts uit.', price: 59.95, stock: 'Op voorraad', repairTime: '45 minuten' },
      { id: 'charging-port', name: 'Laadpoort vervangen', desc: 'De laadpoort is beschadigd of jouw toestel laadt niet meer op.', price: 49.95, stock: 'Op voorraad', repairTime: '60 minuten' },
    ],
  },
  {
    id: 'housing', name: 'Behuizing & frame', fromPrice: 89,
    options: [
      { id: 'back-cover', name: 'Achterkant vervangen', desc: 'De achterkant van jouw toestel is gebarsten of beschadigd.', price: 89.95, stock: 'Op voorraad', repairTime: '90 minuten' },
      { id: 'frame', name: 'Frame vervangen', desc: 'Het frame is gebogen of beschadigd en zorgt voor problemen.', price: 119.95, stock: 'Beperkt op voorraad', repairTime: '120 minuten' },
    ],
  },
  {
    id: 'camera', name: 'Camera & speaker', fromPrice: 49,
    options: [
      { id: 'camera-replace', name: 'Camera vervangen', desc: 'De camera maakt onscherpe foto\'s of werkt niet meer.', price: 69.95, stock: 'Op voorraad', repairTime: '60 minuten' },
      { id: 'speaker-replace', name: 'Speaker vervangen', desc: 'Het geluid van jouw toestel is vervormd of niet meer hoorbaar.', price: 49.95, stock: 'Op voorraad', repairTime: '45 minuten' },
    ],
  },
  {
    id: 'water', name: 'Waterschade', fromPrice: 79,
    options: [
      { id: 'water-treatment', name: 'Waterschade behandeling', desc: 'Jouw toestel is in contact geweest met water of een andere vloeistof.', price: 79.95, stock: 'Op voorraad', repairTime: '60 minuten' },
    ],
  },
  {
    id: 'other', name: 'Onderzoek & overige', fromPrice: 29,
    options: [
      { id: 'diagnosis', name: 'Diagnose & onderzoek', desc: 'Wij onderzoeken jouw toestel en geven advies over de beste oplossing.', price: 29.95, stock: 'Op voorraad', repairTime: '30 minuten' },
    ],
  },
]

// ─── Date/time helpers ───────────────────────────────────────────────────────

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

// ─── Form state ──────────────────────────────────────────────────────────────

interface FormState {
  brandId: string; modelId: string; colorId: string
  repairCatId: string; repairOptId: string
  naam: string; telefoon: string; email: string; agree: boolean
  serviceMethod: 'store' | 'post'; datum: string; tijd: string
}
const INITIAL: FormState = {
  brandId: '', modelId: '', colorId: '', repairCatId: '', repairOptId: '',
  naam: '', telefoon: '', email: '', agree: false,
  serviceMethod: 'store', datum: '', tijd: '',
}

// ─── Step indicator ──────────────────────────────────────────────────────────

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

// ─── Step 1: Brand ───────────────────────────────────────────────────────────

function Step1({ form, onChange, onNext }: { form: FormState; onChange: (p: Partial<FormState>) => void; onNext: () => void }) {
  const { t } = useTranslation()
  return (
    <div className="rp-step-content">
      <div className="rp-step-banner">
        <div className="rp-step-banner-left">
          <div className="rp-step-banner-icon"><Icon.Phone width={28} height={28} /></div>
          <div>
            <h2 className="rp-step-banner-title">{t('reparatie.s1Title')}</h2>
            <p className="rp-step-banner-sub">{t('reparatie.s1Sub')}</p>
            <div className="rp-step-banner-trust">
              <span><Icon.Star width={13} height={13} /> {t('reparatie.s1Trust1')}</span>
              <span><Icon.Shield width={13} height={13} /> {t('reparatie.s1Trust2')}</span>
            </div>
          </div>
        </div>
        <div className="rp-step-banner-chips">
          <span className="rp-trust-chip-sm"><Icon.Check width={12} height={12} /> {t('reparatie.s1Chip1')}</span>
          <span className="rp-trust-chip-sm"><Icon.Clock width={12} height={12} /> {t('reparatie.s1Chip2')}</span>
          <span className="rp-trust-chip-sm"><Icon.Shield width={12} height={12} /> {t('reparatie.s1Chip3')}</span>
        </div>
      </div>

      <p className="rp-step-hint">{t('reparatie.s1Hint')}</p>

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

      <div className="rp-not-found">
        <Icon.Chat width={22} height={22} />
        <div>
          <p className="rp-not-found-title">{t('reparatie.notFoundTitle')}</p>
          <p className="rp-not-found-sub">{t('reparatie.notFoundSub')}</p>
        </div>
        <a href="/contact" className="rp-not-found-cta">{t('reparatie.notFoundCta')}</a>
      </div>

      <div className="rp-bottom-trust">
        <div className="rp-btrust-item">
          <Icon.Shield width={16} height={16} />
          <div><p className="rp-btrust-title">{t('reparatie.trustSecureTitle')}</p><p className="rp-btrust-sub">{t('reparatie.trustSecureSub')}</p></div>
        </div>
        <div className="rp-btrust-item">
          <Icon.Check width={16} height={16} />
          <div><p className="rp-btrust-title">{t('reparatie.trustExpertTitle')}</p><p className="rp-btrust-sub">{t('reparatie.trustExpertSub')}</p></div>
        </div>
      </div>
    </div>
  )
}

// ─── Step 2: Model ───────────────────────────────────────────────────────────

function Step2({ form, onChange, onNext, onBack }: { form: FormState; onChange: (p: Partial<FormState>) => void; onNext: () => void; onBack: () => void }) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const brand = BRANDS.find(b => b.id === form.brandId)
  const models = MODELS[form.brandId] ?? []
  const filtered = useMemo(() =>
    search.trim() ? models.filter(m => m.name.toLowerCase().includes(search.toLowerCase())) : models
  , [search, models])

  return (
    <div className="rp-step-content">
      <div className="rp-step-banner rp-step-banner--compact">
        <Icon.Phone width={22} height={22} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <div>
          <h2 className="rp-step-banner-title">{t('reparatie.s2Title', { brand: brand?.name })}</h2>
          <p className="rp-step-banner-sub">{t('reparatie.s2Sub')}</p>
        </div>
      </div>

      <div className="rp-model-search-wrap">
        <Icon.Search width={15} height={15} />
        <input className="rp-model-search" placeholder={t('reparatie.s2SearchPlaceholder', { brand: brand?.name })} value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <p className="rp-step-hint">{t('reparatie.s2Hint', { brand: brand?.name })}</p>

      <div className="rp-models-grid">
        {filtered.map(m => (
          <button
            key={m.id}
            className={`rp-model-tile${form.modelId === m.id ? ' rp-model-tile--selected' : ''}`}
            onClick={() => { onChange({ modelId: m.id, colorId: m.colors[0]?.id ?? '', repairCatId: '', repairOptId: '' }); onNext() }}
          >
            {form.modelId === m.id && <span className="rp-model-check"><Icon.Check width={12} height={12} /></span>}
            <div className="rp-model-img" style={{ background: `linear-gradient(150deg, ${m.imgColor}dd 0%, ${m.imgColor}66 100%)` }}>
              <Icon.Phone width={26} height={26} style={{ color: '#fff', opacity: 0.85 }} />
            </div>
            <span className="rp-model-name">{m.name}</span>
          </button>
        ))}
      </div>

      <div className="rp-not-found">
        <Icon.Chat width={22} height={22} />
        <div>
          <p className="rp-not-found-title">{t('reparatie.notFoundModelTitle')}</p>
          <p className="rp-not-found-sub">{t('reparatie.notFoundSub')}</p>
        </div>
        <a href="/contact" className="rp-not-found-cta">{t('reparatie.notFoundCta')}</a>
      </div>

      <div className="rp-actions">
        <button className="rp-btn rp-btn--ghost" onClick={onBack}>{t('reparatie.back')}</button>
      </div>
    </div>
  )
}

// ─── Step 3: Repair ──────────────────────────────────────────────────────────

const CAT_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  screen: Icon.Crack, battery: Icon.Battery, housing: Icon.Phone,
  camera: Icon.Camera, water: Icon.Drop, other: Icon.Search,
}

function Step3({ form, onChange, onNext, onBack }: { form: FormState; onChange: (p: Partial<FormState>) => void; onNext: () => void; onBack: () => void }) {
  const { t } = useTranslation()
  const [openCat, setOpenCat] = useState<string>('screen')
  const model = MODELS[form.brandId]?.find(m => m.id === form.modelId)
  const selectedOpt = REPAIR_CATS.flatMap(c => c.options).find(o => o.id === form.repairOptId)
  const isLight = (hex: string) => ['#f5f5f0','#e8e3d8','#e8e0d0','#e8e8e8','#f0ebe0','#c0bdb5','#c0b99e','#e8d44d','#e8c84d'].includes(hex)
  const catNames = t('reparatie.repairCats', { returnObjects: true }) as { id: string; name: string }[]
  const getCatName = (id: string) => catNames.find(c => c.id === id)?.name ?? id

  return (
    <div className="rp-step-content">
      {model && (
        <div className="rp-device-header">
          <div className="rp-device-header-img" style={{ background: `linear-gradient(150deg, ${model.imgColor}cc, ${model.imgColor}44)` }}>
            <Icon.Phone width={22} height={22} style={{ color: '#fff', opacity: 0.9 }} />
          </div>
          <div className="rp-device-header-info">
            <h3 className="rp-device-header-name">{model.name}</h3>
            <div className="rp-device-header-badges">
              <span><Icon.Shield width={11} height={11} /> {t('reparatie.badge6mnd')}</span>
              <span><Icon.Check width={11} height={11} /> {t('reparatie.badgeTransparent')}</span>
              <span><Icon.Clock width={11} height={11} /> {t('reparatie.badgeFast')}</span>
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

      <div className="rp-repair-section">
        <p className="rp-section-title">{t('reparatie.s3RepairTitle')}</p>
        <div className="rp-repair-cats">
          {REPAIR_CATS.map(cat => {
            const CatIcon = CAT_ICONS[cat.id] ?? Icon.Wrench
            return (
              <div key={cat.id} className={`rp-cat${openCat === cat.id ? ' rp-cat--open' : ''}`}>
                <button className="rp-cat-header" onClick={() => setOpenCat(openCat === cat.id ? '' : cat.id)}>
                  <span className="rp-cat-icon-wrap"><CatIcon width={18} height={18} /></span>
                  <span className="rp-cat-name">{getCatName(cat.id)}</span>
                  <span className="rp-cat-from">Vanaf €{cat.fromPrice.toFixed(2).replace('.', ',')}</span>
                  <span className="rp-cat-chevron">›</span>
                </button>
                {openCat === cat.id && (
                  <div className="rp-cat-options">
                    {cat.options.map(opt => (
                      <label key={opt.id} className={`rp-option${form.repairOptId === opt.id ? ' rp-option--selected' : ''}`}>
                        <input type="radio" name="repair" value={opt.id} checked={form.repairOptId === opt.id}
                          onChange={() => onChange({ repairCatId: cat.id, repairOptId: opt.id })} className="rp-option-radio" />
                        <div className="rp-option-body">
                          <div className="rp-option-top">
                            <span className="rp-option-name">
                              {opt.name}
                              {opt.badge && <span className="rp-option-badge">{t('reparatie.mostChosen')}</span>}
                            </span>
                            <span className="rp-option-price">€{opt.price.toFixed(2).replace('.', ',')}</span>
                          </div>
                          <p className="rp-option-desc">{opt.desc}</p>
                          <div className="rp-option-meta">
                            <span className={`rp-option-stock${opt.stock === 'Op voorraad' ? ' rp-option-stock--ok' : ' rp-option-stock--low'}`}>
                              <span className="rp-stock-dot" /> {opt.stock === 'Op voorraad' ? t('reparatie.inStock') : t('reparatie.lowStock')}
                            </span>
                            <span className="rp-option-time"><Icon.Clock width={11} height={11} /> {opt.repairTime}</span>
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

      <div className="rp-actions rp-actions--spread">
        <button className="rp-btn rp-btn--ghost" onClick={onBack}>{t('reparatie.back')}</button>
        <button className="rp-btn rp-btn--primary" onClick={onNext} disabled={!form.repairOptId}>
          {t('reparatie.nextStep')} <Icon.ArrowRight width={18} height={18} />
        </button>
      </div>

      {selectedOpt && (
        <div className="rp-sticky-bar">
          <div className="rp-sticky-bar-info">
            <span className="rp-sticky-bar-repair">{selectedOpt.name}</span>
            <span className="rp-sticky-bar-price">€{selectedOpt.price.toFixed(2).replace('.', ',')}</span>
          </div>
          <button className="rp-btn rp-btn--primary" onClick={onNext}>
            {t('reparatie.planRepair')} <Icon.ArrowRight width={16} height={16} />
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Step 4: Booking ─────────────────────────────────────────────────────────

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
  const canSubmit = form.naam.trim() && form.telefoon.trim() && form.email.trim() && form.agree && form.datum && form.tijd

  return (
    <div className="rp-booking-wrap">
      <div className="rp-booking-form">
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
                    <p className="rp-service-title">{t('reparatie.storeMethodTitle')}</p>
                    <p className="rp-service-sub">{t('reparatie.storeMethodSub')}</p>
                  </div>
                </div>
                <p className="rp-service-address">
                  <Icon.Pin width={13} height={13} /> {t('reparatie.storeAddress')}
                </p>
              </div>
            </label>
            <label className={`rp-service-card${form.serviceMethod === 'post' ? ' rp-service-card--selected' : ''}`}>
              <input type="radio" name="service" value="post" checked={form.serviceMethod === 'post'} onChange={() => onChange({ serviceMethod: 'post' })} />
              <div className="rp-service-card-inner">
                <Icon.Truck width={18} height={18} />
                <div>
                  <p className="rp-service-title">{t('reparatie.postMethodTitle')}</p>
                  <p className="rp-service-sub">{t('reparatie.postMethodSub')}</p>
                </div>
              </div>
            </label>
          </div>
        </div>

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
          <p className="rp-booking-note">
            <Icon.Check width={13} height={13} /> {t('reparatie.bookingNote')}
          </p>
        </div>

        <div className="rp-booking-trust-strip">
          <span><Icon.Shield width={14} height={14} /> {t('reparatie.trust6mnd')}</span>
          <span><Icon.Clock width={14} height={14} /> {t('reparatie.trustTime')}</span>
          <span><Icon.Check width={14} height={14} /> {t('reparatie.trustNoCost')}</span>
        </div>

        <div className="rp-actions rp-actions--spread">
          <button className="rp-btn rp-btn--ghost" onClick={onBack}>{t('reparatie.back')}</button>
        </div>
      </div>

      <aside className="rp-booking-sidebar">
        <div className="rp-sidebar-card">
          {model && (
            <div className="rp-sidebar-device">
              <div className="rp-sidebar-device-img" style={{ background: `linear-gradient(150deg, ${model.imgColor}cc, ${model.imgColor}44)` }}>
                <Icon.Phone width={20} height={20} style={{ color: '#fff', opacity: 0.9 }} />
              </div>
              <div>
                <p className="rp-sidebar-device-name">{model.name}</p>
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
                  <Icon.Wrench width={13} height={13} />
                  <span className="rp-sidebar-label">{t('reparatie.sidebarRepairLabel')}</span>
                  <span className="rp-sidebar-value">{selectedOpt.name}</span>
                </div>
                <div className="rp-sidebar-row">
                  <Icon.Clock width={13} height={13} />
                  <span className="rp-sidebar-label">{t('reparatie.sidebarDurationLabel')}</span>
                  <span className="rp-sidebar-value">{selectedOpt.repairTime}</span>
                </div>
              </>
            )}
            <div className="rp-sidebar-row">
              <Icon.Cart width={13} height={13} />
              <span className="rp-sidebar-label">{t('reparatie.sidebarServiceLabel')}</span>
              <span className="rp-sidebar-value">{form.serviceMethod === 'store' ? t('reparatie.storeMethodValue') : t('reparatie.postMethodValue')}</span>
            </div>
            {form.serviceMethod === 'store' && (
              <div className="rp-sidebar-row">
                <Icon.Pin width={13} height={13} />
                <span className="rp-sidebar-label">{t('reparatie.sidebarShopLabel')}</span>
                <span className="rp-sidebar-value">{t('reparatie.shopName')}</span>
              </div>
            )}
            {form.datum && (
              <div className="rp-sidebar-row">
                <Icon.Calendar width={13} height={13} />
                <span className="rp-sidebar-label">{t('reparatie.sidebarAppointmentLabel')}</span>
                <span className="rp-sidebar-value">{formatLongDate(form.datum, dayLongArr, monthLongArr)}{form.tijd && `, ${form.tijd} uur`}</span>
              </div>
            )}
          </div>
          {selectedOpt && (
            <div className="rp-sidebar-total">
              <span>{t('reparatie.totalInclVat')}</span>
              <span className="rp-sidebar-total-price">€{selectedOpt.price.toFixed(2).replace('.', ',')}</span>
            </div>
          )}
          <button className="rp-btn rp-btn--primary rp-sidebar-btn" onClick={onConfirm} disabled={!canSubmit}>
            {t('reparatie.submitBtn')} <Icon.ArrowRight width={16} height={16} />
          </button>
          <p className="rp-sidebar-pay-note">{t('reparatie.payAfter')}</p>
          <div className="rp-sidebar-google">
            <svg width={16} height={16} viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span><b>4,8/5</b> {t('reparatie.googleReviews')}</span>
          </div>
        </div>
        <p className="rp-sidebar-safe"><Icon.Shield width={13} height={13} /> {t('reparatie.sidebarSafe')}</p>
      </aside>
    </div>
  )
}

// ─── Confirmation modal ──────────────────────────────────────────────────────

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
        <h2 className="rp-modal-title">{t('reparatie.confirmTitle')}</h2>
        <p className="rp-modal-sub">{t('reparatie.confirmSub')}</p>

        <div className="rp-modal-mail-note">
          <Icon.Shield width={16} height={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <div>
            <p className="rp-modal-mail-title">{t('reparatie.confirmMailTitle')}</p>
            <p className="rp-modal-mail-sub">{t('reparatie.confirmMailSub')}</p>
          </div>
          <Icon.Check width={16} height={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        </div>

        <div className="rp-modal-summary">
          <h3 className="rp-modal-summary-title">{t('reparatie.confirmSummaryTitle')}</h3>
          {model && (
            <div className="rp-modal-row">
              <Icon.Phone width={15} height={15} /><span className="rp-modal-label">{t('reparatie.confirmDeviceLabel')}</span><span className="rp-modal-value">{model.name}</span>
            </div>
          )}
          {selectedOpt && (
            <div className="rp-modal-row">
              <Icon.Wrench width={15} height={15} /><span className="rp-modal-label">{t('reparatie.confirmRepairLabel')}</span><span className="rp-modal-value">{selectedOpt.name}</span>
            </div>
          )}
          {form.datum && (
            <div className="rp-modal-row">
              <Icon.Calendar width={15} height={15} /><span className="rp-modal-label">{t('reparatie.confirmDateLabel')}</span><span className="rp-modal-value">{formatLongDate(form.datum, dayLongArr, monthLongArr)}, {form.tijd} uur</span>
            </div>
          )}
          <div className="rp-modal-row">
            <Icon.Cart width={15} height={15} /><span className="rp-modal-label">{t('reparatie.confirmServiceLabel')}</span><span className="rp-modal-value">{form.serviceMethod === 'store' ? t('reparatie.storeMethodValue') : t('reparatie.postMethodValue')}</span>
          </div>
          {form.serviceMethod === 'store' && (
            <div className="rp-modal-row">
              <Icon.Pin width={15} height={15} /><span className="rp-modal-label">{t('reparatie.confirmLocationLabel')}</span><span className="rp-modal-value">{t('reparatie.shopName')}</span>
            </div>
          )}
        </div>

        <div className="rp-modal-trust">
          <span><Icon.Shield width={13} height={13} /> {t('reparatie.confirmTrust1')}</span>
          <span><Icon.Star width={13} height={13} style={{ color: '#f59e0b' }} /> {t('reparatie.confirmTrust2')}</span>
        </div>

        <a href="/" className="rp-btn rp-btn--primary rp-modal-home-btn">
          <Icon.Check width={16} height={16} /> {t('reparatie.confirmHomeBtn')}
        </a>
        <p className="rp-modal-contact-note">{t('reparatie.confirmContactNote')} <a href="/contact" className="rp-link">{t('reparatie.confirmContactLink')}</a>.</p>
      </div>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

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

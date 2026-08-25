import sharp from 'sharp'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const assetsDir = path.join(root, 'src/assets')
const framesDir = path.join(assetsDir, 'frames_no_bg')

const QUALITY = 82

const UI_IMAGES = [
  'background.png', 'business_mobile_hero.png', 'carholders2.png', 'cases2.png',
  'chargers2.png', 'ChatGPT_Image_10_aug_2026_19_39_28.png', 'ChatGPT_Image_10_jul_2026_11_20_55.png',
  'ChatGPT_Image_30_jul_2026_20_05_04.png', 'chatgpt_store_hero.png', 'layer1.png',
  'lefthand_dummyfile.png', 'new_desktop_hero.png', 'new_device_bg.png', 'newcard1.png',
  'newcard2.png', 'newcard3.png', 'newcard4.png', 'product_new_mobile_hero.png',
  'reviews-hero-desktop.png', 'reviews-hero-mobile.png', 'screenprotectors2.png',
  'section_4_image.png', 'section_5_image1.png', 'section_5_mobilei_image.png', 'store_hero_bg.png',
]

function fmtKb(bytes) { return `${(bytes / 1024).toFixed(0)}KB` }

async function convertUiImages() {
  let beforeTotal = 0
  let afterTotal = 0
  for (const name of UI_IMAGES) {
    const src = path.join(assetsDir, name)
    const before = statSync(src).size
    const out = src.replace(/\.png$/, '.webp')
    await sharp(src).webp({ quality: QUALITY }).toFile(out)
    const after = statSync(out).size
    beforeTotal += before
    afterTotal += after
    console.log(`${name.padEnd(45)} ${fmtKb(before).padStart(7)} -> ${fmtKb(after).padStart(7)}`)
  }
  console.log(`\nUI images total: ${fmtKb(beforeTotal)} -> ${fmtKb(afterTotal)} (${(100 - (afterTotal / beforeTotal) * 100).toFixed(0)}% smaller)`)
}

async function convertFrames() {
  const files = readdirSync(framesDir).filter(f => f.endsWith('.png')).sort()
  const kept = files.filter((_, i) => i % 2 === 0)

  let beforeTotal = 0
  let afterTotal = 0
  for (const name of kept) {
    const src = path.join(framesDir, name)
    const before = statSync(src).size
    const out = src.replace(/\.png$/, '.webp')
    await sharp(src).webp({ quality: QUALITY }).toFile(out)
    afterTotal += statSync(out).size
    beforeTotal += before
  }
  let allPngBefore = 0
  for (const name of files) allPngBefore += statSync(path.join(framesDir, name)).size

  console.log(`\nFrames: ${files.length} PNG frames (${fmtKb(allPngBefore)}) -> ${kept.length} WebP frames (${fmtKb(afterTotal)}) — ${(100 - (afterTotal / allPngBefore) * 100).toFixed(0)}% smaller`)

  for (const name of files) {
    const { unlinkSync } = await import('node:fs')
    unlinkSync(path.join(framesDir, name))
  }
}

await convertUiImages()
await convertFrames()
console.log('\nDone. Update each import site from .png to .webp, then delete the old UI-image PNGs.')

// Screenshots of chosen routes for visual review.
//   node scripts/shots.ts <outDir> <width>x<height> <route> [route...]
import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const [outDir, size = '1440x900', ...routes] = process.argv.slice(2)
const [width, height] = size.split('x').map(Number)
const base = process.env.BASE ?? 'http://localhost:5173'
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome'].find(p => fs.existsSync(p))
const browser = await chromium.launch({ executablePath: exe })
const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: 'dark' })
const page = await ctx.newPage()
fs.mkdirSync(outDir, { recursive: true })
for (const r of routes) {
  await page.goto(base + r)
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(400)
  const file = path.join(outDir, `${width}${r.replace(/[/?=&]+/g, '_')}.png`)
  await page.screenshot({ path: file })
  console.log(file)
}
await browser.close()

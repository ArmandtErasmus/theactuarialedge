// End-to-end smoke test against a running dev/preview server, using the system Chrome/Edge.
//   node scripts/e2e.ts [baseUrl] [--shots dir] [--only crawl|flows|runtimes]
// Exits 1 if any page logs an error or a flow assertion fails.
import fs from 'node:fs'
import path from 'node:path'
import { chromium, type Page } from 'playwright-core'

const args = process.argv.slice(2)
const base = (args.find(a => a.startsWith('http')) ?? 'http://localhost:5173').replace(/\/$/, '')
const shotsDir = args.includes('--shots') ? args[args.indexOf('--shots') + 1] : null
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null
const browserPath = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find(p => fs.existsSync(p))

const failures: string[] = []
const fail = (msg: string) => {
  failures.push(msg)
  console.log('  FAIL ' + msg)
}
const ok = (msg: string) => console.log('  ok   ' + msg)

const browser = await chromium.launch({ executablePath: browserPath, headless: true })

async function newPage(opts: { width: number; height: number; mobile?: boolean }) {
  const ctx = await browser.newContext({ viewport: { width: opts.width, height: opts.height }, isMobile: opts.mobile, hasTouch: opts.mobile, colorScheme: 'dark' })
  const page = await ctx.newPage()
  const errors: string[] = []
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`))
  page.on('console', m => {
    if (m.type() !== 'error' || /favicon|Download the React DevTools/.test(m.text())) return
    // GitHub Pages answers deep links with 404.html (status 404); the app still boots. Only the
    // document itself may 404; a 404 for any asset is a real error.
    const src = m.location().url.split('?')[0]
    if (/status of 404/.test(m.text()) && src === page.url().split('?')[0]) return
    errors.push(`console: ${m.text().slice(0, 300)}`)
  })
  return { page, errors, ctx }
}

async function shot(page: Page, name: string) {
  if (!shotsDir) return
  fs.mkdirSync(shotsDir, { recursive: true })
  await page.screenshot({ path: path.join(shotsDir, `${name}.png`), fullPage: false })
}

async function settle(page: Page) {
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {})
  await page.waitForFunction(() => !document.querySelector('[role="status"]')?.textContent?.includes('Loading…'), null, { timeout: 15000 }).catch(() => {})
}

// ---------- 1. crawl every route ----------
const ROUTES = [
  '/',
  '/problems',
  '/problems?track=code',
  '/problems?subject=cm1&difficulty=medium',
  '/problems/cm1-23',
  '/problems/cs2-25',
  '/problems/finance-1',
  '/problems/python-1',
  '/problems/sql-3',
  '/exams',
  '/exams?society=ASSA',
  '/exams/ifoa-cm1',
  '/exams/assa-a311',
  '/session?exam=ifoa-cs1&mode=practice',
  '/session?exam=ifoa-cm2&mode=mock',
  '/session?mode=review',
  '/code',
  '/code?lang=sql',
  '/projects',
  '/projects/bfreserving',
  '/careers',
  '/careers/graduate-cv',
  '/careers/cv-builder',
  '/past-papers',
  '/progress',
  '/settings',
  '/does-not-exist',
]

if (!only || only === 'crawl') {
  console.log(`crawl (${base})`)
  for (const vp of [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844, mobile: true },
  ]) {
    const { page, errors, ctx } = await newPage(vp)
    for (const route of ROUTES) {
      errors.length = 0
      await page.goto(base + route, { waitUntil: 'domcontentloaded' })
      await settle(page)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      // Content cut off by an overflow-hidden parent doesn't widen the page, so check text directly:
      // visible text, links and buttons must end inside the viewport unless they sit in a scroller.
      const clipped = await page.evaluate(() => {
        const scrolls = (el: Element | null): boolean => {
          for (let e = el?.parentElement; e && e !== document.body; e = e.parentElement) {
            const ox = getComputedStyle(e).overflowX
            if (ox === 'auto' || ox === 'scroll') return true
          }
          return false
        }
        return [...document.querySelectorAll('main h1, main h2, main h3, main p, main a, main button, main li, main label')]
          .filter(e => {
            const r = e.getBoundingClientRect()
            return r.width > 0 && r.height > 0 && r.right > window.innerWidth + 1 && !scrolls(e) && !e.closest('[aria-hidden="true"], .sr-only, pre, table')
          })
          .slice(0, 3)
          .map(e => `<${e.tagName.toLowerCase()}> "${(e.textContent ?? '').trim().slice(0, 40)}" ends at ${Math.round(e.getBoundingClientRect().right)}px`)
      })
      const crashed = await page.locator('text=/Unexpected Application Error|Something went wrong/').count()
      const label = `${vp.name} ${route}`
      if (crashed) fail(`${label}: error screen shown`)
      else if (errors.length) fail(`${label}: ${errors.join(' | ')}`)
      else if (overflow > 1) fail(`${label}: horizontal overflow ${overflow}px`)
      else if (clipped.length) fail(`${label}: content cut off at the right edge: ${clipped.join('; ')}`)
      else ok(label)
      await shot(page, `${vp.name}${route.replace(/[/?=&]+/g, '_') || '_home'}`)
    }
    await ctx.close()
  }
}

// ---------- 2. user flows ----------
if (!only || only === 'flows') {
  console.log('flows')
  const { page, errors, ctx } = await newPage({ width: 1366, height: 860 })

  // MCQ: answer wrong then right, progress is recorded and the solution unlocks.
  await page.goto(`${base}/problems/cs2-2`)
  await settle(page)
  const q = await page.evaluate(async () => (await (await fetch('/data/q/cs2.json')).json()).find((x: { id: string }) => x.id === 'cs2-2'))
  const wrongIdx = q.answerIndex === 0 ? 1 : 0
  await page.getByRole('radio').nth(wrongIdx).click()
  await page.getByRole('button', { name: 'Submit', exact: true }).click()
  ;(await page.getByText('Not quite').count()) ? ok('mcq: wrong answer flagged') : fail('mcq: no wrong-answer feedback')
  await page.getByRole('radio').nth(q.answerIndex).click()
  await page.getByRole('button', { name: 'Submit', exact: true }).click()
  ;(await page.getByText('Correct', { exact: true }).count()) ? ok('mcq: correct answer accepted') : fail('mcq: correct answer not accepted')
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('ae:progress:v1') ?? '{}').problems?.['cs2-2'])
  stored?.status === 'solved' && stored.attempts === 2 ? ok('progress: recorded 2 attempts, solved') : fail(`progress: unexpected ${JSON.stringify(stored)}`)
  await page.getByRole('tab', { name: 'solution' }).click()
  ;(await page.getByText('Answer', { exact: true }).count()) ? ok('solution tab unlocked after answering') : fail('solution not shown')

  // Keyboard: press 1..4 + Enter on another MCQ.
  await page.goto(`${base}/problems/cs1-1`)
  await settle(page)
  await page.keyboard.press('2')
  ;(await page.locator('[role="radio"][aria-checked="true"]').count()) === 1 ? ok('mcq: keyboard selection') : fail('mcq: keyboard selection failed')

  // Numeric: enter the stated answer in a different format.
  const numeric = await page.evaluate(async () => (await (await fetch('/data/q/cm1.json')).json()).find((x: { type: string }) => x.type === 'numeric'))
  await page.goto(`${base}/problems/${numeric.id}`)
  await settle(page)
  await page.getByLabel('Your answer').fill(String(numeric.answer).replace(/,/g, ''))
  await page.getByRole('button', { name: 'Submit', exact: true }).click()
  ;(await page.getByText('Correct', { exact: true }).count()) ? ok(`numeric: ${numeric.id} accepts ${numeric.answer}`) : fail(`numeric: ${numeric.id} rejected its own answer`)

  // Problem list filters + list context navigation.
  await page.goto(`${base}/problems?subject=cm2&difficulty=hard`)
  await settle(page)
  const rows = await page.locator('tbody tr').count()
  const expectedRows = await page.evaluate(async () => (await (await fetch('/data/manifest.json')).json()).problems.filter((p: { subject: string; difficulty: string }) => p.subject === 'cm2' && p.difficulty === 'hard').length)
  rows === Math.min(50, expectedRows) ? ok(`filters: cm2 hard shows ${rows} rows`) : fail(`filters: expected ${expectedRows} rows, got ${rows}`)
  await page.locator('tbody tr a').first().click()
  await settle(page)
  ;/\/problems\/cm2-\d+/.test(page.url()) ? ok('list: row opens workspace') : fail(`list: navigated to ${page.url()}`)

  // Mock exam: answer one, finish, see the summary.
  await page.goto(`${base}/session?exam=ifoa-cs1&mode=mock`)
  await settle(page)
  await page.getByRole('radio').first().click()
  ;(await page.locator('[role="radio"][aria-checked="true"]').count()) === 1 ? ok('mock: choosing an option saves it') : fail('mock: option not saved')
  ;(await page.getByText('1 of 20 answered').count()) ? ok('mock: navigator counts the answer') : fail('mock: navigator did not update')
  page.once('dialog', d => d.accept())
  await page.getByRole('button', { name: 'Finish exam' }).last().click()
  ;(await page.getByText('Score').count()) ? ok('mock: summary shown') : fail('mock: no summary after finishing')

  // Revealing a solution puts the question in today's review queue.
  await page.goto(`${base}/problems/cb2-5`)
  await settle(page)
  await page.getByRole('tab', { name: 'solution' }).click()
  await page.getByRole('button', { name: 'Reveal solution' }).click()
  await page.goto(`${base}/session?mode=review`)
  await settle(page)
  const reviewTitle = await page.evaluate(async () => (await (await fetch('/data/manifest.json')).json()).problems.find((p: { id: string }) => p.id === 'cb2-5').title)
  ;(await page.getByText('Nothing to review right now').count()) === 0 && (await page.locator('main').textContent())?.includes('Review')
    ? ok(`review: revealed "${reviewTitle}" is due today`)
    : fail('review: revealed question is not in the queue')

  // Homepage code demo: types a real solution and reaches "Accepted"; reduced motion shows it at once.
  await page.goto(`${base}/`)
  await page.locator('figure').getByText('Accepted', { exact: true }).first().waitFor({ timeout: 25000 }).catch(() => {})
  ;(await page.locator('figure').getByText(/test cases passed/).count()) ? ok('home demo: plays through to Accepted') : fail('home demo: never reached Accepted')
  {
    const rm = await browser.newPage({ reducedMotion: 'reduce' })
    await rm.goto(`${base}/`)
    await rm.waitForSelector('figure')
    const code = (await rm.locator('figure pre').textContent()) ?? ''
    code.includes('return worst') ? ok('home demo: reduced motion shows the finished solution') : fail('home demo: reduced motion did not show the solution')
    await rm.close()
  }

  // CV builder: typing fills the preview, and the download is a real PDF named after the user.
  {
    const cvCtx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1366, height: 900 } })
    const cv = await cvCtx.newPage()
    cv.on('dialog', d => d.accept())
    await cv.goto(`${base}/careers/cv-builder`)
    await settle(cv)
    await cv.getByLabel('Full name').fill('Thandi Mokoena')
    await cv.getByLabel('Organisation').first().fill('Momentum')
    await cv.getByLabel('What you did').first().fill('Built a **lapse model** in R.')
    const preview = (await cv.locator('[aria-label="CV preview"]').innerText()) ?? ''
    preview.includes('Thandi Mokoena') && preview.includes('lapse model') ? ok('cv builder: preview fills in as you type') : fail('cv builder: preview did not update')
    const dl = cv.waitForEvent('download', { timeout: 60000 })
    await cv.getByRole('button', { name: 'Download PDF' }).click()
    const file = await dl.catch(() => null)
    const bytes = file ? fs.readFileSync((await file.path())!) : Buffer.alloc(0)
    file?.suggestedFilename() === 'Thandi_Mokoena_CV.pdf' && bytes.subarray(0, 5).toString() === '%PDF-'
      ? ok(`cv builder: downloads ${file.suggestedFilename()} (${Math.round(bytes.length / 1024)} KB)`)
      : fail(`cv builder: download failed (${file?.suggestedFilename() ?? 'no file'})`)
    await cv.reload()
    ;(await cv.getByLabel('Full name').inputValue()) === 'Thandi Mokoena' ? ok('cv builder: entries survive a reload') : fail('cv builder: entries lost on reload')
    await cvCtx.close()
  }

  // The site has no accounts: account pages don't exist.
  for (const gone of ['/login', '/leaderboard', '/auth/callback']) {
    await page.goto(base + gone)
    await settle(page)
    ;(await page.getByRole('heading', { name: 'Page not found' }).count()) ? ok(`no accounts: ${gone} is a 404`) : fail(`no accounts: ${gone} still renders a page`)
  }
  ;(await page.getByRole('link', { name: 'Sign in' }).count()) === 0 ? ok('no accounts: no sign-in link in the header') : fail('no accounts: a sign-in link is still shown')

  // Links to the old site's .html pages land on their new homes.
  for (const [from, to] of [
    ['/exams/assa-a211.html', '/exams/assa-a211'],
    ['/resumes/graduate.html', '/careers/graduate-cv'],
    ['/projects.html', '/projects'],
  ]) {
    await page.goto(base + from)
    await settle(page)
    new URL(page.url()).pathname === to ? ok(`legacy: ${from} -> ${to}`) : fail(`legacy: ${from} went to ${page.url()}`)
  }

  // Support popup: GitHub star or a coffee, closes on Escape.
  await page.goto(`${base}/`)
  await settle(page)
  await page.getByRole('button', { name: 'Support the project' }).click()
  const support = page.getByRole('dialog', { name: 'Keep Actuarial Edge free' })
  const star = await support.getByRole('link', { name: 'Star on GitHub' }).getAttribute('href')
  const coffee = await support.getByRole('link', { name: 'Buy me a coffee' }).getAttribute('href')
  await page.keyboard.press('Escape')
  const stillOpen = await support.isVisible()
  star?.includes('github.com/ArmandtErasmus') && coffee?.includes('buymeacoffee.com') && !stillOpen
    ? ok('support: popup links to GitHub and coffee, closes on Escape')
    : fail(`support: star ${star}, coffee ${coffee}, open after Escape ${stillOpen}`)

  // Profile: a name and an avatar, saved locally and shown in the header and on Progress.
  await page.goto(`${base}/settings`)
  await settle(page)
  await page.getByLabel('Display name').fill('Thandi')
  await page.getByRole('tab', { name: 'Female' }).click()
  await page.getByRole('tab', { name: 'Hair' }).click()
  const femaleHair = (await page.getByRole('button', { name: 'Bob', exact: true }).count()) === 1 && (await page.getByRole('region', { name: 'Facial hair' }).count()) === 0
  await page.getByRole('button', { name: 'Bob', exact: true }).click()
  await page.getByRole('button', { name: 'Randomise' }).click()
  await page.reload()
  await settle(page)
  const stillFemale = (await page.getByRole('tab', { name: 'Female' }).getAttribute('aria-selected')) === 'true'
  femaleHair && stillFemale ? ok('profile: Female offers matching hairstyles, no facial hair, and is remembered') : fail(`profile: female hair ${femaleHair}, remembered ${stillFemale}`)
  const headerAvatar = await page.getByRole('link', { name: /Thandi: profile and settings/ }).locator('img').getAttribute('src')
  await page.goto(`${base}/progress`)
  await settle(page)
  const progressTitle = (await page.getByRole('heading', { level: 1 }).textContent()) ?? ''
  headerAvatar?.startsWith('data:image/svg+xml') && progressTitle.includes('Thandi’s progress')
    ? ok('profile: name and avatar saved, shown in the header and on Progress')
    : fail(`profile: header avatar ${headerAvatar?.slice(0, 30)}, progress title "${progressTitle}"`)

  // Shop: solved problems earn Actuary Bucks, which buy (and put on) avatar items.
  await page.evaluate(async () => {
    const m = await (await fetch('/data/manifest.json')).json()
    const key = 'ae:progress:v1'
    const p = JSON.parse(localStorage.getItem(key) ?? '{"version":1,"problems":{},"activity":{},"bookmarks":[]}')
    for (const q of m.problems.filter((x: { difficulty: string }) => x.difficulty === 'hard').slice(0, 10))
      p.problems[q.id] = { status: 'solved', attempts: 1, correct: 1, wrong: 0, box: 4, due: '2099-01-01', lastAt: new Date().toISOString() }
    localStorage.setItem(key, JSON.stringify(p))
  })
  await page.goto(`${base}/settings`)
  await settle(page)
  const bucksChip = page.getByRole('button', { name: /^Avatar shop: \d+ Actuary Bucks/ })
  await bucksChip.waitFor()
  const before = Number(/(\d+)/.exec((await bucksChip.getAttribute('aria-label')) ?? '')?.[1])
  await bucksChip.click()
  const shop = page.getByRole('dialog', { name: 'Avatar shop' })
  await shop.getByRole('tab', { name: 'Eyewear' }).click()
  const card = shop.locator('li', { has: page.getByRole('heading', { name: 'Sunglasses' }) })
  await card.getByRole('button', { name: 'Buy for 120' }).click()
  const wearingNow = await card.getByRole('button', { name: 'Wearing' }).isVisible()
  await page.keyboard.press('Escape')
  const after = Number(/(\d+)/.exec((await bucksChip.getAttribute('aria-label')) ?? '')?.[1])
  await page.getByRole('tab', { name: 'Extras' }).click()
  const lockedPatch = await page.getByRole('button', { name: 'Eyepatch: 500 Actuary Bucks in the shop' }).count()
  const sunglassesOn = await page.getByRole('button', { name: 'Sunglasses', exact: true }).getAttribute('aria-pressed')
  before >= 400 && after === before - 120 && wearingNow && lockedPatch === 1 && sunglassesOn === 'true'
    ? ok(`shop: ${before} bucks earned, sunglasses bought for 120 and worn, unbought items locked in Settings`)
    : fail(`shop: before ${before}, after ${after}, wearing ${wearingNow}, eyepatch locked ${lockedPatch}, sunglasses pressed ${sunglassesOn}`)

  // Dark-only arcade theme: no theme switcher, display font loaded.
  await page.goto(`${base}/settings`)
  await settle(page)
  const lightTab = await page.getByRole('tab', { name: 'Light' }).count()
  const display = await page.evaluate(async () => (await document.fonts.ready, [...document.fonts].some(f => f.family.includes('Bungee') && f.status === 'loaded')))
  !lightTab && display ? ok('theme: dark-only, Bungee display font loaded') : fail(`theme: light tab ${lightTab}, Bungee ${display}`)

  if (errors.length) fail(`flows logged errors: ${errors.join(' | ')}`)
  await ctx.close()
}

// ---------- 3. code runtimes (real Pyodide / webR / sql.js) ----------
if (!only || only === 'runtimes') {
  console.log('runtimes')
  const { page, errors, ctx } = await newPage({ width: 1366, height: 860 })
  // The self-test page only exists in dev builds.
  await page.goto(`${base}/dev/selftest`)
  await settle(page)
  const hasSelfTest = (await page.getByRole('button', { name: 'Test sql' }).count()) > 0
  for (const lang of hasSelfTest ? ['sql', 'python', 'r'] : []) {
    await page.goto(`${base}/dev/selftest`)
    await settle(page)
    // The first click can land before the lazy page is interactive, so retry once if nothing starts.
    const started = () =>
      page.waitForFunction(() => /running|done/.test(document.querySelector('[data-testid="summary"]')?.textContent ?? ''), null, { timeout: 5000 }).then(() => true, () => false)
    await page.getByRole('button', { name: `Test ${lang}` }).click()
    if (!(await started())) await page.getByRole('button', { name: `Test ${lang}` }).click()
    await page.waitForFunction(() => document.querySelector('[data-testid="summary"]')?.textContent?.includes('done'), null, { timeout: 300000 }).catch(() => {})
    const summary = (await page.getByTestId('summary').textContent()) ?? ''
    const fails = await page.locator('li:has-text("FAIL")').allTextContents()
    ;/· 0 fail/.test(summary) && /done/.test(summary) ? ok(`${lang}: ${summary}`) : fail(`${lang}: ${summary}\n      ${fails.slice(0, 8).join('\n      ')}`)
  }

  // Through the real editor UI: wrong code fails, the reference passes.
  await page.goto(`${base}/problems/python-1`)
  await settle(page)
  await page.getByRole('button', { name: /^Submit/ }).click()
  await page.getByText(/Wrong answer|Error/).first().waitFor({ timeout: 120000 }).catch(() => {})
  ;(await page.getByText(/Wrong answer|Error/).count()) ? ok('editor: starter code is rejected') : fail('editor: starter code was not rejected')
  const solution = await page.evaluate(async () => (await (await fetch('/data/code/python.json')).json())[0].solution)
  await page.locator('.cm-content').click()
  await page.keyboard.press('Control+a')
  await page.keyboard.press('Delete')
  await page.evaluate(code => navigator.clipboard?.writeText?.(code), solution).catch(() => {})
  await page.locator('.cm-content').fill(solution)
  await page.getByRole('button', { name: /^Submit/ }).click()
  await page.getByText('Accepted').waitFor({ timeout: 60000 }).catch(() => {})
  ;(await page.getByText('Accepted').count()) ? ok('editor: reference solution accepted') : fail('editor: reference solution not accepted')
  // An infinite loop hits the time limit, the runtime restarts, and the next run works.
  await page.locator('.cm-content').fill('def present_value(fv, i, n):\n    while True:\n        pass')
  await page.getByRole('button', { name: /^Run/ }).click()
  await page.getByText(/Time limit exceeded/).waitFor({ timeout: 30000 }).catch(() => {})
  ;(await page.getByText(/Time limit exceeded/).count()) ? ok('python: infinite loop stopped by the time limit') : fail('python: infinite loop not stopped')
  await page.locator('.cm-content').fill(solution)
  await page.getByRole('button', { name: /^Run/ }).click()
  await page.getByText('Accepted').waitFor({ timeout: 90000 }).catch(() => {})
  ;(await page.getByText('Accepted').count()) ? ok('python: runtime recovers after a timeout') : fail('python: runtime did not recover')

  // Each runtime, through the real editor: the reference solution is accepted.
  // A DataFrame problem: pandas is downloaded on first run and inputs are built as DataFrames.
  const pandasId: string = await page.evaluate(async () =>
    (await (await fetch('/data/code/python.json')).json()).find((p: { tests: unknown }) => JSON.stringify(p.tests).includes('__df__')).id,
  )
  for (const [lang, id] of [
    ['sql', 'sql-12'],
    ['r', 'r-48'],
    ['python', pandasId],
  ] as const) {
    const ref = await page.evaluate(async ([l, i]) => (await (await fetch(`/data/code/${l}.json`)).json()).find((p: { id: string }) => p.id === i).solution, [lang, id])
    await page.goto(`${base}/problems/${id}`)
    await settle(page)
    await page.locator('.cm-content').fill(ref)
    await page.getByRole('button', { name: /^Submit/ }).click()
    await page.getByText('Accepted').waitFor({ timeout: 180000 }).catch(() => {})
    ;(await page.getByText('Accepted').count()) ? ok(`editor: ${id} reference accepted`) : fail(`editor: ${id} reference not accepted`)
  }

  // SQL errors are reported, not thrown.
  await page.goto(`${base}/problems/sql-1`)
  await settle(page)
  await page.locator('.cm-content').fill('SELEC * FRM policies')
  await page.getByRole('button', { name: /^Run/ }).click()
  await page.getByText(/syntax error/i).first().waitFor({ timeout: 30000 }).catch(() => {})
  ;(await page.getByText(/syntax error/i).count()) ? ok('sql: syntax error reported') : fail('sql: syntax error not shown')

  if (errors.filter(e => !/Time limit/.test(e)).length) fail(`runtimes logged errors: ${errors.join(' | ')}`)
  await ctx.close()
}

await browser.close()
console.log(failures.length ? `\n${failures.length} failure(s)` : '\nall passed')
process.exit(failures.length ? 1 : 0)

# Developing The Actuarial Edge

The project overview is in the [README](../README.md). This guide covers running, testing and changing the site.

LeetCode-style practice for actuarial students: exam questions mapped to IFoA and ASSA subjects, code challenges in Python, R and SQL, portfolio projects, and CV and career guides. It's a static site hosted free on GitHub Pages. There are no accounts: progress is saved in each visitor's browser.

## What's inside

| Area | What it does |
|---|---|
| **Problems** | 1,236 questions and 327 code problems in one filterable list (track, difficulty, status, subject, topic, search, random), with progress, a streak calendar and a question of the day |
| **Workspace** | A split-pane problem page. Multiple choice, numeric (tolerant grading), true/false and self-assessed questions, worked solutions, bookmarks, a timer, and previous/next within the list you came from |
| **Code** | 162 Python (finance, maths and pandas), 50 R and 115 SQL problems. Python (Pyodide, pandas loaded on demand), R (webR) and SQL (sql.js) run in the browser with automatic test cases, an 8-second time limit and drafts saved locally |
| **Exams** | IFoA and ASSA subjects by stage. Each exam has practice sets, timed 20-question mock exams and per-topic progress. Subjects without checked questions show as "coming soon" |
| **Review** | Spaced repetition: missed or revealed questions return the same day, then after 1, 3, 7, 21 and 60 days |
| **Progress** | Solved by difficulty, accuracy, streaks, a year heatmap, per-subject bars and recent activity, all stored in the browser |
| **Profile & shop** | A display name, gender and avatar built in Settings (Avataaars art by Pablo Stanley via DiceBear), shown in the header and on Progress. Solving problems earns Actuary Bucks (10 / 20 / 40 by difficulty) to spend in the avatar shop on clothes, prints, eyewear and hats; looks, hair, eye colour, prescription glasses and colours are free. Catalogue and prices: `src/lib/shop.ts` |
| **Projects / Careers** | 6 project write-ups with PDF briefs, 2 CV templates and 8 guides. Past papers link to the official IFoA and ASSA pages |
| **CV builder** | `/careers/cv-builder`: fill in the CV template in a form with a live preview, then download a text-based (ATS-readable) PDF generated in the browser. Entries are saved only in that browser |

A dark "arcade" design in emerald and gold: Bungee display type, Geist Sans and Geist Mono, chunky lifted buttons and cards, and the mascots in `public/assets/mascots/` (source art in `Assets/`). Tokens and components live in `src/index.css`. Keyboard support throughout: <kbd>1</kbd>–<kbd>4</kbd> and <kbd>Enter</kbd> to answer, <kbd>Alt</kbd>+<kbd>←/→</kbd> for previous/next, and <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to run code.

## Run it locally

Requires Node 22+ (Node 24 is recommended). Python 3 is only needed for `npm run check`.

```bash
npm install
npm run dev
```

Then open http://localhost:5173. In dev builds, `/dev/selftest` runs every reference solution through the real runtimes.

```bash
npm run build                      # type-check + production build into dist/
node scripts/serve-pages.ts 4173   # serve dist/ exactly like GitHub Pages (404.html fallback)
```

## Tests

```bash
npm run check                                         # content QA + SQL/Python reference solutions + unit tests
node scripts/e2e.ts http://localhost:5173             # browser tests: every route x 2 viewports, user flows, all 327 code problems in real runtimes
node scripts/e2e.ts http://localhost:5173 --only crawl --shots ./shots   # also save screenshots
```

The end-to-end script uses your installed Chrome or Edge through `playwright-core`; it downloads no browser of its own.

## Adding or editing content

All content is plain JSON and Markdown in `content/`. Each build compiles it into `public/data/`, so never edit `public/data/`.

- **Questions:** `content/questions/<subject>.json`. Each question needs `id`, `subject`, `n`, `title`, `difficulty` (`easy|medium|hard`), `topics` (from that subject's list in `content/catalog.json`), `exams`, `type` (`mcq|numeric|truefalse|open`), `prompt` and `solution`, plus `options` + `answerIndex` (MCQ) or `answer`. Write maths as `$...$` or `$$...$$` (KaTeX) and a literal dollar sign as `\$`. Put the correct MCQ option anywhere: options are shuffled deterministically at build time, with "All/None of the above" kept last.
- **New subject or exam code:** add it to `content/catalog.json`. An exam with no questions shows as "coming soon".
- **Code problems:** `content/coding/{python,r,sql}.json`. Python and R problems have `entry` and `tests` (`args` → `expected`). SQL problems have `tables`, and the reference `solution` is the answer key. Python and SQL problems after number 50 are generated from the specs in `scripts/problems/specs/`: edit the spec and rebuild, never the JSON (see [`scripts/problems/README.md`](../scripts/problems/README.md)).
- **Projects / guides:** `content/projects/*.md` and `content/guides/*.md`, each with a simple `key: value` frontmatter block. Assets go in `public/assets/`.

Run `npm run check` before pushing. It fails on malformed questions, unknown topics, TeX that doesn't compile, or reference solutions that fail their own tests. `content/REVIEW_LOG.md` lists every correction made when the old question bank was migrated.

## Deploying

See [SETUP.md](../SETUP.md) for GitHub Pages and the custom domain. Every push to `main` runs [`deploy.yml`](../.github/workflows/deploy.yml): content checks, unit tests, the build and browser tests, then publishes to GitHub Pages (Settings → Pages → Source must be **GitHub Actions**).

## Project layout

```text
content/            source content (questions, coding problems, projects, guides, catalog)
public/             static files (logos, CV templates, project briefs, CNAME, favicon)
scripts/            build-data, content checks, e2e tests, GitHub Pages preview server
  legacy/           one-off migration from the old site (historical; don't re-run)
src/
  pages/            routes
  components/       UI kit, workspace, editor, tables, layout
  lib/              grading, code runners, markdown + maths, R bridge
  workers/          Pyodide and sql.js Web Workers
  state/            progress (localStorage), code drafts
  cv/               CV builder: data model, live preview and PDF document (@react-pdf/renderer, loaded on demand)
```

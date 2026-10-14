import { Suspense, lazy, useEffect, useState, type ReactNode } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { BookOpenCheck, Briefcase, Code2, Coins, FileText, Flame, FolderGit2, House, ListChecks, Menu, Newspaper, Settings, TrendingUp, X } from 'lucide-react'
import clsx from 'clsx'
import { Logo, LogoMark } from './Logo'
import { PageSpinner } from './ui'
import { currentStreak, useProgress } from '../state/progress'
import { ErrorBoundary } from './ErrorBoundary'
import { SupportButton } from './Support'
import { DEFAULT_AVATAR_IMAGE, openShop, useBucks, useProfile, useShop } from '../state/profile'

// The shop pulls in the avatar renderer, so it only loads when first opened.
const ShopDialog = lazy(() => import('./ShopDialog'))
import { legacyRedirect } from '../lib/legacy'
import { topIfCurrent } from '../lib/scrollTop'

// Careers stays highlighted on its guides but not on the CV builder, which has its own tab.
const NAV = [
  { to: '/', label: 'Home', icon: House, match: (p: string) => p === '/' },
  { to: '/problems', label: 'Problems', icon: ListChecks, match: (p: string) => p.startsWith('/problems') },
  { to: '/exams', label: 'Exams', icon: BookOpenCheck, match: (p: string) => p.startsWith('/exams') },
  { to: '/code', label: 'Code', icon: Code2, match: (p: string) => p.startsWith('/code') },
  { to: '/projects', label: 'Projects', icon: FolderGit2, match: (p: string) => p.startsWith('/projects') },
  { to: '/careers', label: 'Careers', icon: Briefcase, match: (p: string) => p.startsWith('/careers') && !p.startsWith('/careers/cv-builder') },
  { to: '/careers/cv-builder', label: 'CV builder', icon: FileText, match: (p: string) => p.startsWith('/careers/cv-builder') },
]

const MOBILE_EXTRA = [
  { to: '/past-papers', label: 'Past papers', icon: Newspaper, match: (p: string) => p.startsWith('/past-papers') },
  { to: '/progress', label: 'My progress', icon: TrendingUp, match: (p: string) => p.startsWith('/progress') },
  { to: '/settings', label: 'Settings', icon: Settings, match: (p: string) => p.startsWith('/settings') },
]

const pillBase =
  'relative inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[0.85rem] border-2 px-3.5 text-sm font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,color,border-color] duration-150 ease-out-expo'
const pillIdle = 'border-transparent text-gm-ink-soft hover:bg-gm-deep hover:text-gm-ink'
const pillActive = 'border-gm-grape-edge bg-gm-grape text-gm-ink shadow-[0_4px_0_var(--gm-grape-edge)]'

/** Gold-rimmed streak chip (like the coins chip), links to progress. */
/** Actuary Bucks balance; opens the avatar shop. */
function BucksChip() {
  const bucks = useBucks()
  const balance = bucks ? bucks.balance : '…'
  return (
    <button
      type="button"
      onClick={() => openShop()}
      aria-label={`Avatar shop: ${balance} Actuary Bucks`}
      title="Actuary Bucks: open the shop"
      className="flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border-2 border-gm-gold-edge bg-gm-night px-3 text-sm font-bold text-gm-gold tabular transition-colors duration-150 hover:border-gm-gold hover:bg-gm-deep"
    >
      <Coins className="size-4" aria-hidden="true" />
      {balance}
    </button>
  )
}

function StreakChip() {
  const progress = useProgress()
  const streak = currentStreak(progress.activity)
  return (
    <Link
      to="/progress"
      className="flex h-10 shrink-0 items-center gap-1 rounded-full border-2 border-gm-gold-edge bg-gm-night px-3 text-sm font-bold text-gm-gold tabular transition-colors duration-150 hover:border-gm-gold hover:bg-gm-deep"
      aria-label={`${streak}-day streak. View progress`}
      title="Streak (days)"
    >
      <Flame className="size-4" aria-hidden="true" />
      {streak}
    </Link>
  )
}

/** The visitor's avatar, linking to Settings where they design it. */
function ProfileButton() {
  const profile = useProfile()
  const label = profile.name ? `${profile.name}: profile and settings` : 'Profile and settings'
  return (
    <Link
      to="/settings"
      aria-label={label}
      title={label}
      className="inline-flex size-10 shrink-0 overflow-hidden rounded-full border-2 border-gm-line bg-gm-night transition-colors duration-150 hover:border-gm-lime"
    >
      <img src={profile.image ?? DEFAULT_AVATAR_IMAGE} alt="" className="size-full" />
    </Link>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-30 border-b-2 border-gm-line bg-gm-void">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <Logo className="xl:justify-self-start" />
        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {NAV.map(n => (
            <Link key={n.to} to={n.to} onClick={topIfCurrent(n.to)} aria-current={n.match(pathname) ? 'page' : undefined} className={clsx(pillBase, n.match(pathname) ? pillActive : pillIdle)}>
              <n.icon className="size-4" aria-hidden="true" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 xl:ml-0 xl:justify-self-end">
          <StreakChip />
          <BucksChip />
          <ProfileButton />
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(o => !o)}
            className="inline-flex size-10 items-center justify-center rounded-[0.85rem] border-2 border-gm-line bg-gm-night text-gm-ink xl:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav aria-label="Mobile" className="border-t-2 border-gm-line bg-gm-void px-4 py-4 xl:hidden">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[...NAV, ...MOBILE_EXTRA].map(n => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => {
                  setMobileOpen(false)
                  topIfCurrent(n.to)()
                }}
                aria-current={n.match(pathname) ? 'page' : undefined}
                className={clsx(pillBase, 'justify-start', n.match(pathname) ? pillActive : 'border-gm-line bg-gm-night text-gm-ink-soft')}
              >
                <n.icon className="size-4" aria-hidden="true" />
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

function FooterLink({ to, icon, children }: { to: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2.5 rounded-lg text-sm font-semibold text-gm-ink-soft transition-colors hover:text-gm-ink">
      <span className="text-gm-ink-dim [&>svg]:size-4">{icon}</span>
      {children}
    </Link>
  )
}

function Footer() {
  return (
    <footer className="mt-auto bg-gm-void">
      <div className="border-t-2 border-gm-line">
        <div className="container mx-auto grid gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="max-w-sm">
            <Link to="/" onClick={topIfCurrent('/')} className="group inline-flex items-center gap-2 rounded-lg">
              <LogoMark />
              <span className="font-display text-lg text-gm-ink">Actuarial Edge</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gm-ink-dim">Free practice for actuarial students: exam questions, real code challenges, portfolio projects and career guides.</p>
          </div>
          <ul className="space-y-3">
            <li><FooterLink to="/" icon={<House />}>Home</FooterLink></li>
            <li><FooterLink to="/problems" icon={<ListChecks />}>Problems</FooterLink></li>
            <li><FooterLink to="/exams" icon={<BookOpenCheck />}>Exams</FooterLink></li>
            <li><FooterLink to="/code" icon={<Code2 />}>Code</FooterLink></li>
            <li><FooterLink to="/session?mode=review" icon={<TrendingUp />}>Review queue</FooterLink></li>
          </ul>
          <ul className="space-y-3">
            <li><FooterLink to="/projects" icon={<FolderGit2 />}>Projects</FooterLink></li>
            <li><FooterLink to="/careers/cv-builder" icon={<FileText />}>CV builder</FooterLink></li>
            <li><FooterLink to="/careers" icon={<Briefcase />}>Career guides</FooterLink></li>
            <li><FooterLink to="/past-papers" icon={<Newspaper />}>Past papers</FooterLink></li>
            <li><SupportButton className="text-sm">Support the site</SupportButton></li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-gm-line">
        <p className="container mx-auto px-4 py-5 text-center text-xs text-gm-ink-dim">
          The Actuarial Edge - Built by{' '}
          <a href="https://github.com/ArmandtErasmus" target="_blank" rel="noopener noreferrer" className="font-semibold text-gm-ink-soft transition-colors hover:text-gm-lime">
            Armandt Erasmus
          </a>
        </p>
      </div>
    </footer>
  )
}

function SkipLink() {
  return (
    <a href="#main" className="sr-only z-[200] rounded-lg bg-gm-lime px-4 py-2 font-semibold text-gm-void focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
      Skip to content
    </a>
  )
}

/** Page chrome: sticky header, content, footer. */
/** Mounts the shop the first time it's opened, then keeps it for later visits. */
function Shop() {
  const { open } = useShop()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (open) setLoaded(true)
  }, [open])
  return open || loaded ? (
    <Suspense fallback={null}>
      <ShopDialog />
    </Suspense>
  ) : null
}

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  // Old-site URLs (/exams/assa-a211.html) can match real routes, so redirect before routing.
  const legacy = legacyRedirect(pathname)
  if (legacy) return <Navigate to={legacy} replace />
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-gm-void text-gm-ink">
      <SkipLink />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-grow outline-none">
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<PageSpinner />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <Shop />
    </div>
  )
}

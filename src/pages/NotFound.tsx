import { ButtonLink, Container } from '../components/ui'
import { usePageTitle } from '../lib/usePageTitle'

// Old-site .html links are redirected in Layout before routing.
export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <Container className="flex flex-col items-center py-28 text-center">
      <div className="-rotate-3 rounded-2xl border-2 border-gm-lime-edge bg-gm-lime px-6 py-2 font-display text-6xl text-gm-void shadow-[0_8px_0_var(--gm-lime-edge)]">404</div>
      <h1 className="mt-10 font-display text-3xl uppercase sm:text-4xl">Page not found</h1>
      <p className="mt-4 text-gm-ink-soft">The link may be out of date. Try the problem list instead.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/problems" variant="primary">
          Browse problems
        </ButtonLink>
        <ButtonLink to="/" variant="accent">
          Home
        </ButtonLink>
      </div>
    </Container>
  )
}

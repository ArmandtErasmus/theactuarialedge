/** Smoothly back to the top, unless the visitor prefers reduced motion. */
export function scrollToTop() {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

/** For links: clicking a link to the page you're already on scrolls back to the top. */
export const topIfCurrent = (to: string) => () => {
  if (window.location.pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ''), '') === to) scrollToTop()
}

import { Component, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center" role="alert">
        <span className="mb-6 flex size-16 -rotate-6 items-center justify-center rounded-2xl border-2 border-gm-coral-edge bg-gm-coral text-gm-void shadow-[0_6px_0_var(--gm-coral-edge)]" aria-hidden="true">
          <AlertTriangle className="size-8" />
        </span>
        <h1 className="font-display text-2xl uppercase">Something went wrong</h1>
        <p className="mt-3 text-sm text-gm-ink-soft">{this.state.error.message}</p>
        <button
          type="button"
          onClick={() => location.reload()}
          className="btn-arcade btn-arcade-sm btn-arcade-lime mt-8"
        >
          Reload
        </button>
      </div>
    )
  }
}

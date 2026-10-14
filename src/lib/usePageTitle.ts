import { useEffect } from 'react'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · The Actuarial Edge` : 'The Actuarial Edge: practice for actuarial exams and interviews'
  }, [title])
}

'use client'

import { ErrorState } from '@/components/ui/ErrorState'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorState
      title="Dashboard error"
      message="An unexpected runtime error occurred while loading the app."
      onRetry={reset}
    />
  )
}

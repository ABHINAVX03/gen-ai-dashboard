'use client'

import { ErrorState } from '@/components/ui/ErrorState'

export default function AnalyticsError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorState
      title="Could not load analytics"
      message="Analytics failed to render. Retry after checking the student and course data."
      onRetry={reset}
    />
  )
}

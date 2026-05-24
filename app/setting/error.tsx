'use client'

import { ErrorState } from '@/components/ui/ErrorState'

export default function SettingError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorState
      title="Could not load settings"
      message="Settings failed to load. Retry after checking the student profile data."
      onRetry={reset}
    />
  )
}

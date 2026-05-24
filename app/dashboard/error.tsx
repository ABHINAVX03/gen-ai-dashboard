'use client'

import { ErrorState } from '@/components/ui/ErrorState'

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorState
      title="Could not load dashboard"
      message="The dashboard hit a runtime error. Check your Supabase setup, then retry."
      onRetry={reset}
    />
  )
}

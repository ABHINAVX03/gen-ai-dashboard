'use client'

import { ErrorState } from '@/components/ui/ErrorState'

export default function CoursesError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorState
      title="Could not load courses"
      message="Course data failed to load. Retry after checking the courses table and environment variables."
      onRetry={reset}
    />
  )
}

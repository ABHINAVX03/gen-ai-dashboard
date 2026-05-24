'use client'

import { AlertCircle, RotateCcw } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'The dashboard could not finish loading. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <section className="min-h-screen bg-bg-base p-4 md:p-6 lg:p-8">
      <article
        className="relative overflow-hidden rounded-2xl border border-red-500/20 p-6 noise max-w-[720px]"
        style={{
          background:
            'radial-gradient(120% 100% at 80% 0%, rgba(239, 68, 68, 0.08) 0%, transparent 58%), #161b22',
        }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
            <AlertCircle size={18} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            <p className="text-sm text-[#8b949e] mt-1">{message}</p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-bg-base px-3 py-2 text-sm font-medium text-white hover:bg-bg-hover transition-colors"
              >
                <RotateCcw size={15} />
                Try again
              </button>
            )}
          </div>
        </div>
      </article>
    </section>
  )
}

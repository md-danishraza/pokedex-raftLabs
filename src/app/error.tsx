'use client' 

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service (e.g., Sentry)
    console.error(error)
  }, [error])

  return (
    <main className="container flex min-h-[60vh] flex-col items-center justify-center text-center py-20">
      <div className="space-y-6 max-w-md">
        {/* Icon / Illustration */}
        <div className="text-6xl mb-4">
          ⚡
        </div>

        <h2 className="text-3xl font-bold text-[var(--text-primary)] font-heading">
          Something went wrong!
        </h2>

        <p className="text-[var(--text-secondary)]">
          We encountered an error while loading this data. It might be a temporary API issue or a network glitch.
        </p>

        <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 font-mono break-all">
          Error: {error.message || "Unknown error occurred"}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          {/* Recovery Button: Attempts to re-render the segment */}
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-[var(--brand)] text-white font-medium hover:brightness-110 transition-all shadow-md active:scale-95"
          >
            Try Again
          </button>

          {/* Fallback Button: Go to safe homepage */}
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-white border border-[var(--border)] text-[var(--text-secondary)] font-medium hover:bg-slate-50 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  )
}
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="text-xs uppercase tracking-widest2 text-signal">404</p>
      <h1 className="mt-4 text-3xl font-medium text-mist-100">Page not found</h1>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-mist-200 underline decoration-ink-600 decoration-1 underline-offset-8 hover:text-signal hover:decoration-signal"
      >
        Back home
      </Link>
    </div>
  )
}

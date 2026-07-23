import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from '@/components/portal/LoginForm'

export const metadata: Metadata = {
  title: 'Client Sign In',
  description: 'Sign in to the Lotusmirk Aerospace client portal to review your project deliverables.',
}

export default function PortalLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6 pt-24">
      <div className="w-full max-w-sm">
        <p className="text-xs uppercase tracking-widest2 text-signal">Client Portal</p>
        <h1 className="mt-3 text-2xl font-medium text-mist-100">Sign in</h1>
        <p className="mt-2 text-sm text-mist-400">
          Access is by invitation. Contact your Lotusmirk representative if you need an
          account.
        </p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { signInWithPassword } from '@/app/actions/auth'

const inputClass =
  'w-full rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-400 outline-none transition-colors focus:border-signal'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await signInWithPassword({
        email: String(data.get('email') || ''),
        password: String(data.get('password') || ''),
      })

      if (result.success) {
        setError(null)
        const next = searchParams.get('next') || '/portal/dashboard'
        router.push(next)
        router.refresh()
      } else {
        setError(result.error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input name="email" type="email" placeholder="Email" required autoComplete="email" className={inputClass} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        autoComplete="current-password"
        className={inputClass}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-mist-100 px-7 py-3 text-sm font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.01] disabled:opacity-50"
      >
        {isPending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}

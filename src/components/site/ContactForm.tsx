'use client'

import { useState, useTransition } from 'react'
import { submitContactForm } from '@/app/actions/contact'

const inputClass =
  'w-full rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-400 outline-none transition-colors focus:border-signal'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const result = await submitContactForm({
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        company: String(data.get('company') || ''),
        message: String(data.get('message') || ''),
        honeypot: String(data.get('website') || ''),
      })

      if (result.success) {
        setStatus('success')
        setError(null)
        form.reset()
      } else {
        setStatus('error')
        setError(result.error ?? 'Something went wrong.')
      }
    })
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-signal-dim bg-ink-900 p-8 text-center">
        <p className="text-mist-100">Message received. We&rsquo;ll be in touch shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users via CSS, left in the tab order so
          screen-reader/keyboard users never encounter it as an obstacle,
          but bots that blanket-fill forms will trip it. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input name="name" placeholder="Full name" required className={inputClass} />
        <input name="email" type="email" placeholder="Email" required className={inputClass} />
      </div>
      <input name="company" placeholder="Company (optional)" className={inputClass} />
      <textarea
        name="message"
        placeholder="Tell us about the project"
        required
        rows={5}
        className={inputClass}
      />

      {status === 'error' && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-mist-100 px-7 py-3 text-sm font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03] disabled:opacity-50"
      >
        {isPending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

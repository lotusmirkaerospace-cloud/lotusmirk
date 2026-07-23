'use server'

import { createClient } from '@/lib/supabase/server'

export type ContactFormState = {
  success: boolean
  error?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Handles the public contact form. Runs server-side only — no service_role
 * key involved, the insert succeeds purely because of the
 * contact_submissions_insert_public RLS policy (anon INSERT, no SELECT).
 * That means even a compromised client can only ever write new rows here,
 * never read existing submissions.
 */
export async function submitContactForm(input: {
  name: string
  email: string
  company?: string
  message: string
  honeypot?: string
}): Promise<ContactFormState> {
  // Honeypot: a hidden field real visitors never fill in. Bots that
  // autofill every field trip it — reject silently-ish, no error detail.
  if (input.honeypot) {
    return { success: true }
  }

  const name = input.name?.trim().slice(0, 200)
  const email = input.email?.trim().slice(0, 254)
  const company = input.company?.trim().slice(0, 200) || null
  const message = input.message?.trim().slice(0, 5000)

  if (!name || !email || !message) {
    return { success: false, error: 'Name, email, and message are required.' }
  }
  if (!EMAIL_RE.test(email)) {
    return { success: false, error: 'Enter a valid email address.' }
  }
  if (message.length < 10) {
    return { success: false, error: 'Message is too short.' }
  }

  const supabase = createClient()
  const { error } = await supabase
    .from('contact_submissions')
    .insert({ name, email, company, message })

  if (error) {
    return { success: false, error: 'Something went wrong submitting the form. Please try again.' }
  }

  return { success: true }
}

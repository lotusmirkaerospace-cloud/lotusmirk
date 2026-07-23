'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signInWithPassword(input: { email: string; password: string }) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  })

  if (error) {
    // Deliberately generic — do not reveal whether the email exists.
    return { success: false as const, error: 'Invalid email or password.' }
  }

  return { success: true as const }
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/portal/login')
}

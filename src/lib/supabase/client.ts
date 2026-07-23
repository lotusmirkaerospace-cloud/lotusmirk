'use client'

import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser-side Supabase client. Uses the publishable key only — this is safe
 * to ship to the client because every table it can touch is locked down by
 * Postgres row-level security (see supabase/migrations). Never import the
 * service_role key here or in any file under a 'use client' boundary.
 *
 * Deliberately untyped (no <Database> generic) — see the matching comment
 * in lib/supabase/server.ts for why.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}

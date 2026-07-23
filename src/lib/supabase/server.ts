import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Server-side Supabase client for use in Server Components, Server Actions,
 * and Route Handlers. Reads/writes the auth session via cookies. Still uses
 * only the publishable key — RLS is what actually enforces access, not this
 * client's privilege level. There is deliberately no service_role client in
 * this codebase; portal writes go through admin-only RLS policies instead.
 *
 * Deliberately untyped (no <Database> generic): parameterizing this with
 * the generated Database type causes @supabase/ssr's generic forwarding to
 * resolve row/insert types to `never` in this build environment (breaks
 * both .select() and .insert() call sites). RLS is the real access boundary
 * regardless of the client's TS type, so this doesn't trade away security —
 * only compile-time autocomplete on query results.
 */
export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // Called from a Server Component that can't set cookies — the
            // middleware refreshes the session on the next request instead.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // Same as above.
          }
        },
      },
    }
  )
}

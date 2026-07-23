import { createClient } from "@supabase/supabase-js";

/**
 * Anonymous Supabase client for public, unauthenticated pages (currently:
 * the marketing contact form). No Clerk session is bridged in — this
 * relies entirely on the `anon` role and the RLS policy in
 * supabase/migrations/0003_contact_submissions.sql that allows inserts
 * only, from anyone, into `contact_submissions`.
 *
 * Do not reuse this client for anything that should be scoped to an
 * organization — use lib/supabase/client.ts (browser) or
 * lib/supabase/server.ts (server) for that.
 */
export function getSupabasePublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

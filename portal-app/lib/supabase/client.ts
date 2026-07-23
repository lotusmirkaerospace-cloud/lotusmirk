"use client";

import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";

/**
 * Browser-side Supabase client, bridged to the signed-in Clerk session.
 *
 * Requires Supabase's native "Third-Party Auth" integration with Clerk to
 * be configured in the Supabase dashboard (Authentication > Third-Party
 * Auth) — no manual JWT template needed. See
 * https://supabase.com/docs/guides/auth/third-party/clerk
 *
 * Usage inside a client component:
 *   const supabase = useSupabaseClient();
 *   const { data } = await supabase.from("projects").select("*");
 */
export function useSupabaseClient() {
  const { session } = useSession();

  return useMemo(
    () =>
      createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
          accessToken: async () => session?.getToken() ?? null,
        },
      ),
    [session],
  );
}

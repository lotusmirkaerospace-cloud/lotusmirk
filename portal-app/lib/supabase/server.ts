import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for Server Components, Route Handlers, and
 * Server Actions — bridged to the signed-in Clerk session the same way as
 * the browser client. Create a fresh one per request; do not module-cache
 * this across requests since it closes over the current request's auth().
 *
 * Usage:
 *   const supabase = await getSupabaseServerClient();
 *   const { data } = await supabase.from("projects").select("*");
 */
export async function getSupabaseServerClient() {
  const { getToken } = await auth();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      accessToken: async () => getToken() ?? null,
    },
  );
}

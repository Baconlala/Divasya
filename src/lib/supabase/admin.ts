import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Uses the service role key, which bypasses Row Level Security entirely.
// Only ever use this for the auth.admin.* API (inviting/listing/removing
// admin logins) — never for regular table queries, which should keep going
// through the normal server/browser clients so RLS still applies.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

/**
 * The single Supabase client for the whole app (module-level singleton).
 * Only the public URL and anon key are used here. Never add a service_role key.
 * `null` when env vars are missing, so the public site still works without auth.
 */
export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          // PKCE keeps tokens out of URLs; the email link carries a one-time code instead.
          flowType: 'pkce',
          detectSessionInUrl: true,
        },
      })
    : null

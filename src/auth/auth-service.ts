import { authMessages, mapAuthError } from './auth-errors'
import { supabase } from '@/lib/supabase'

export type AuthResult =
  | { ok: true; needsEmailConfirmation?: boolean }
  | { ok: false; message: string }

const notConfigured: AuthResult = { ok: false, message: authMessages.notConfigured }

/** The only place (besides the provider's listener) that talks to Supabase Auth. */
export async function signInWithPassword(email: string, password: string): Promise<AuthResult> {
  if (!supabase) return notConfigured
  try {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    return error ? { ok: false, message: mapAuthError(error, 'signIn') } : { ok: true }
  } catch (e) {
    return { ok: false, message: mapAuthError(e, 'signIn') }
  }
}

export async function signUpWithPassword(email: string, password: string): Promise<AuthResult> {
  if (!supabase) return notConfigured
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      // Built from the current origin + Vite base path: works on localhost and GitHub Pages.
      // The resulting URL must be listed in Supabase → Auth → URL Configuration → Redirect URLs.
      options: { emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}login` },
    })
    if (error) return { ok: false, message: mapAuthError(error, 'signUp') }
    // With email confirmation on, no session is returned (also for already-registered emails).
    return { ok: true, needsEmailConfirmation: !data.session }
  } catch (e) {
    return { ok: false, message: mapAuthError(e, 'signUp') }
  }
}

export async function signOutCurrentSession(): Promise<AuthResult> {
  if (!supabase) return { ok: true }
  try {
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    return error ? { ok: false, message: authMessages.signOutFailed } : { ok: true }
  } catch {
    return { ok: false, message: authMessages.signOutFailed }
  }
}

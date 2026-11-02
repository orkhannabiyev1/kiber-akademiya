import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { AuthContext, type AuthContextValue, type AuthStatus } from './auth-context'
import { signInWithPassword, signOutCurrentSession, signUpWithPassword } from './auth-service'

interface AuthState { status: AuthStatus; session: Session | null; signedOutByUser: boolean }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    status: supabase ? 'loading' : 'unauthenticated',
    session: null,
    signedOutByUser: false,
  })

  useEffect(() => {
    if (!supabase) return
    // onAuthStateChange emits INITIAL_SESSION with the stored session on subscribe,
    // then every later change. One source of truth avoids getSession()/listener races.
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((prev) => ({
        status: session ? 'authenticated' : 'unauthenticated',
        session,
        signedOutByUser: session ? false : prev.signedOutByUser,
      }))
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const signOut = useCallback(async () => {
    // Mark intent first so the guard redirects to "/" (not "/login") once the session ends.
    setState((prev) => ({ ...prev, signedOutByUser: true }))
    const result = await signOutCurrentSession()
    if (!result.ok) setState((prev) => ({ ...prev, signedOutByUser: false }))
    return result
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      status: state.status,
      session: state.session,
      user: state.session?.user ?? null,
      signUp: signUpWithPassword,
      signIn: signInWithPassword,
      signedOutByUser: state.signedOutByUser,
      signOut,
    }),
    [state, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

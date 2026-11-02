import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import type { AuthResult } from './auth-service'

/** 'loading' means the stored session has not been resolved yet: never redirect in that state. */
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface AuthContextValue {
  status: AuthStatus
  user: User | null
  session: Session | null
  /** True after the user chose to sign out; lets route guards send them to `/` instead of `/login`. */
  signedOutByUser: boolean
  signUp: (email: string, password: string) => Promise<AuthResult>
  signIn: (email: string, password: string) => Promise<AuthResult>
  signOut: () => Promise<AuthResult>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

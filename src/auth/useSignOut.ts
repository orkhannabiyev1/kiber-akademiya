import { useCallback, useState } from 'react'
import { useAuth } from './useAuth'

/** Shared sign-out action with busy/error state. On success, ProtectedRoute redirects to "/". */
export function useSignOut() {
  const { signOut } = useAuth()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()

  const run = useCallback(async () => {
    if (busy) return
    setBusy(true)
    setError(undefined)
    const result = await signOut()
    if (!result.ok) { setError(result.message); setBusy(false) }
  }, [busy, signOut])

  return { signOut: run, busy, error }
}

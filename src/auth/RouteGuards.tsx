import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './useAuth'

function AuthLoading() {
  return (
    <div role="status" className="flex min-h-dvh items-center justify-center text-sm text-fg-muted">
      Yüklənir…
    </div>
  )
}

/** UX gate only. Real data protection must come from Supabase Row Level Security. */
export function ProtectedRoute() {
  const { status, signedOutByUser } = useAuth()
  if (status === 'loading') return <AuthLoading />
  if (status === 'authenticated') return <Outlet />
  return <Navigate to={signedOutByUser ? '/' : '/login'} replace />
}

/** Keeps signed-in users away from /login and /signup. Redirect target is fixed (no open redirect). */
export function GuestOnlyRoute() {
  const { status } = useAuth()
  if (status === 'loading') return <AuthLoading />
  return status === 'authenticated' ? <Navigate to="/dashboard" replace /> : <Outlet />
}

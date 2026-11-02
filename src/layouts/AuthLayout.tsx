import { Outlet } from 'react-router-dom'
import { Wordmark } from './Wordmark'

export function AuthLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden px-4 py-6 sm:px-6">
      <div aria-hidden="true" className="glow-top pointer-events-none absolute inset-0" />
      <div className="relative"><Wordmark /></div>
      <main className="relative flex flex-1 items-center justify-center py-12">
        <div className="w-full max-w-sm"><Outlet /></div>
      </main>
    </div>
  )
}

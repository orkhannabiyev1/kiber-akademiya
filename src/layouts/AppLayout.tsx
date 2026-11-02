import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/auth/useAuth'
import { useSignOut } from '@/auth/useSignOut'
import { MobileAccountMenu, SidebarAccount } from '@/components/app/AccountMenu'
import { FormMessage } from '@/components/auth/AuthFormShell'
import { dashboardNav, mobileNav, pathNav } from '@/data/navigation'
import { cx } from '@/lib/cx'
import { Wordmark } from './Wordmark'

// Active route reads like a console selection: teal bar, faint teal wash, teal text.
const sideLink = ({ isActive }: { isActive: boolean }) =>
  cx(
    'flex items-center gap-3 border-l-2 py-2 pl-3 pr-3 text-sm transition-colors duration-150',
    isActive ? 'border-accent bg-accent/10 text-accent shadow-[inset_12px_0_16px_-12px_rgb(var(--accent)/0.5)]' : 'border-transparent text-fg-muted hover:bg-surface-raised hover:text-fg',
  )

const tabLink = ({ isActive }: { isActive: boolean }) =>
  cx(
    'flex flex-1 items-center justify-center border-t-2 py-3 text-sm transition-colors duration-150',
    isActive ? 'border-accent bg-accent/10 text-accent' : 'border-transparent text-fg-muted hover:text-fg',
  )

export function AppLayout() {
  const { user } = useAuth()
  const { signOut, busy, error } = useSignOut()
  const email = user?.email ?? ''
  const { pathname } = useLocation()

  return (
    <div className="min-h-dvh md:pl-sidebar">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-surface-raised focus:px-3 focus:py-2 focus:text-sm">
        Məzmuna keç
      </a>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-sidebar flex-col border-r border-line bg-elevated md:flex">
        <div className="flex h-header shrink-0 items-center border-b border-line px-4"><Wordmark stacked /></div>
        <nav aria-label="Əsas naviqasiya" className="flex flex-col py-3">
          <NavLink to={dashboardNav.to} end className={sideLink}>
            {({ isActive }) => <><span className={cx('font-mono text-xs', isActive ? 'text-accent' : 'text-fg-subtle')}>01</span>{dashboardNav.label}</>}
          </NavLink>
          <p className="label mb-1 mt-5 px-4">TƏDRİS YOLU</p>
          <NavLink to={pathNav.to} className={sideLink}>
            {({ isActive }) => <><span className={cx('font-mono text-xs', isActive ? 'text-accent' : 'text-fg-subtle')}>02</span>{pathNav.label}</>}
          </NavLink>
        </nav>
        <SidebarAccount email={email} busy={busy} onSignOut={signOut} />
      </aside>
      {/* Mobile top bar */}
      <header className="flex h-header items-center justify-between gap-2 border-b border-line bg-elevated px-4 md:hidden">
        <Wordmark />
        <MobileAccountMenu email={email} busy={busy} onSignOut={signOut} />
      </header>
      <main id="main" tabIndex={-1} className="mx-auto max-w-page px-4 py-8 pb-24 focus:outline-none sm:px-6 md:pb-12 lg:px-10">
        {error && <div className="mb-6"><FormMessage tone="error">{error}</FormMessage></div>}
        {/* Keyed by path so each page enters with a short fade (disabled by prefers-reduced-motion). */}
        <div key={pathname} className="animate-page-in"><Outlet /></div>
      </main>
      {/* Mobile bottom navigation */}
      <nav aria-label="Mobil naviqasiya" className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-elevated md:hidden">
        {mobileNav.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === dashboardNav.to} className={tabLink}>{item.label}</NavLink>
        ))}
      </nav>
    </div>
  )
}

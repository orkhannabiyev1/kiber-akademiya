import { Link, NavLink, Outlet } from 'react-router-dom'
import { Container, buttonClasses } from '@/components/ui'
import { publicNav } from '@/data/navigation'
import { site } from '@/lib/site'
import { Wordmark } from './Wordmark'

export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-line">
        <Container as="div" className="flex h-header items-center justify-between gap-4">
          <Wordmark />
          <nav aria-label="Əsas naviqasiya" className="flex items-center gap-1">
            {publicNav.map((item) => (
              <NavLink key={item.to} to={item.to} className="hidden px-3 py-2 text-sm text-fg-muted hover:text-fg sm:block">
                {item.label}
              </NavLink>
            ))}
            <Link to="/login" className={buttonClasses('ghost', 'sm')}>Daxil ol</Link>
            <Link to="/signup" className={buttonClasses('primary', 'sm')}>Qeydiyyat</Link>
          </nav>
        </Container>
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t border-line py-6">
        <Container><p className="text-xs text-fg-subtle">© {new Date().getFullYear()} {site.name}</p></Container>
      </footer>
    </div>
  )
}

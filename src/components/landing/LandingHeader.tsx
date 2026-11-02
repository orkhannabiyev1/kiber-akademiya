import { Link } from 'react-router-dom'
import { Container, buttonClasses } from '@/components/ui'
import { landingNav } from '@/data/landing'
import { Wordmark } from '@/layouts/Wordmark'

export function LandingHeader() {
  return (
    <header className="border-b border-line">
      <Container className="flex h-header items-center justify-between gap-3">
        <Wordmark />
        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label="Əsas naviqasiya" className="mr-2 hidden gap-1 md:flex">
            {landingNav.map((l) => (
              <a key={l.href} href={l.href} className="rounded-sm px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg">
                {l.label}
              </a>
            ))}
          </nav>
          <Link to="/login" className={buttonClasses('ghost')}>Daxil ol</Link>
          <Link to="/signup" className={buttonClasses('primary')}>Başla</Link>
        </div>
      </Container>
    </header>
  )
}

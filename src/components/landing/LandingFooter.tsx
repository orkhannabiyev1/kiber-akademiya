import { Link } from 'react-router-dom'
import { Container } from '@/components/ui'
import { footer } from '@/data/landing'
import { site } from '@/lib/site'
import { Wordmark } from '@/layouts/Wordmark'

const linkClass = 'inline-flex min-h-10 items-center text-sm text-fg-muted transition-colors hover:text-fg'

export function LandingFooter() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-[40ch] text-sm text-fg-muted">{footer.description}</p>
        </div>
        <nav aria-label="Alt naviqasiya" className="flex flex-wrap gap-x-6 sm:justify-end">
          {footer.links.map((l) => <a key={l.href} href={l.href} className={linkClass}>{l.label}</a>)}
          <Link to="/login" className={linkClass}>Daxil ol</Link>
          <Link to="/signup" className={linkClass}>Qeydiyyat</Link>
        </nav>
      </Container>
      <Container className="mt-8"><p className="text-xs text-fg-subtle">© {new Date().getFullYear()} {site.name}</p></Container>
    </footer>
  )
}

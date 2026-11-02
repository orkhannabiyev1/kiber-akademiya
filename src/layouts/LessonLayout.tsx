import { Link, Outlet } from 'react-router-dom'
import { Container } from '@/components/ui'
import { routes } from '@/lib/routes'
import { Wordmark } from './Wordmark'

/** Reading shell: no sidebar, content dominates. Lesson-specific navigation lives in the lesson view. */
export function LessonLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-line">
        <Container className="flex h-header items-center justify-between gap-4">
          <Wordmark />
          <Link to={routes.dashboard} className="text-sm text-fg-muted hover:text-fg">Dashboard</Link>
        </Container>
      </header>
      <main id="main" className="flex-1 py-8"><Container><Outlet /></Container></main>
    </div>
  )
}

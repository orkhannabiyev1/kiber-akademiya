import { Link } from 'react-router-dom'
import { buttonClasses } from '@/components/ui'
import type { LessonNav } from '@/lib/lesson-navigation'

interface LessonNavigationProps { nav: LessonNav; page: number; total: number }

/** Sticky bottom bar. Previous/next are real links so back/forward and open-in-tab work. */
export function LessonNavigation({ nav, page, total }: LessonNavigationProps) {
  return (
    <nav aria-label="Dərs naviqasiyası" className="sticky bottom-0 mt-12 flex items-center justify-between gap-3 border-t border-line bg-bg py-3">
      <Link to={nav.previous.to} className={buttonClasses('secondary')}>{nav.previous.label}</Link>
      <p aria-label={`Səhifə ${page} / ${total}`} className="font-mono text-sm text-fg-muted">{page} / {total}</p>
      <Link to={nav.next.to} className={buttonClasses('primary')}>{nav.next.label}</Link>
    </nav>
  )
}

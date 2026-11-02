import { Link } from 'react-router-dom'
import { cx } from '@/lib/cx'
import type { Lesson } from '@/types'

interface LessonOutlineProps { lesson: Lesson; current: number; hrefFor: (page: number) => string }

/** Compact page list for wide screens. Navigation only; it shows no completion state. */
export function LessonOutline({ lesson, current, hrefFor }: LessonOutlineProps) {
  return (
    <nav aria-label="Dərs səhifələri" className="hidden lg:block">
      <ol className="sticky top-8 flex flex-col border-l border-line">
        {lesson.pages.map((page, i) => (
          <li key={page.id}>
            <Link
              to={hrefFor(i + 1)}
              aria-current={i + 1 === current ? 'page' : undefined}
              className={cx(
                '-ml-px flex gap-3 border-l py-1.5 pl-3 text-sm transition-colors',
                i + 1 === current ? 'border-accent text-fg' : 'border-transparent text-fg-muted hover:text-fg',
              )}
            >
              <span className="font-mono text-fg-subtle">{String(i + 1).padStart(2, '0')}</span>
              <span>{page.title ?? `Səhifə ${i + 1}`}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

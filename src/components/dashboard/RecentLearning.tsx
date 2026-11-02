import { Link } from 'react-router-dom'
import { StatusMark } from '@/components/ui'
import { routes } from '@/lib/routes'
import { upperAz } from '@/lib/text'
import { findContinueTarget, getRecentLessons, getResumePage, type ProgressState } from '@/progress'
import type { LearningPath } from '@/types'

/** Real activity only. Hidden entirely when there is nothing useful to show. */
export function RecentLearning({ path, progress }: { path: LearningPath; progress: ProgressState }) {
  if (progress.status !== 'ready') return null
  const current = findContinueTarget(path, progress.byLessonId)
  const items = getRecentLessons(path, progress.byLessonId, current?.lesson.id)
  if (items.length === 0) return null

  return (
    <section aria-labelledby="recent-heading">
      <h2 id="recent-heading" className="label mb-3">SON ÖYRƏNMƏ</h2>
      <ul className="border-t border-line">
        {items.map(({ module, lesson, progress: p }) => (
          <li key={lesson.id} className="border-b border-line">
            <Link
              to={routes.lesson(path.slug, module.slug, lesson.slug, p.completed ? undefined : getResumePage(lesson, p))}
              className="flex items-center justify-between gap-4 px-2 py-3 transition-colors duration-150 hover:bg-surface"
            >
              <span className="min-w-0">
                <span className="label block">{upperAz(module.title)}</span>
                <span className="block break-words font-medium">{lesson.title}</span>
              </span>
              {p.completed
                ? <StatusMark kind="completed" />
                : <StatusMark kind="in_progress" label={`DAVAM EDİR · SƏHİFƏ ${getResumePage(lesson, p) ?? 1}`} />}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

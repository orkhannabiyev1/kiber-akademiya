import { Link } from 'react-router-dom'
import { Skeleton, StatusMark } from '@/components/ui'
import { routes } from '@/lib/routes'
import { getLessonStatus, getResumePage, type ProgressState } from '@/progress'
import type { Lesson, LearningPath, Module } from '@/types'

interface LessonListProps { path: LearningPath; module: Module; lessons: Lesson[]; progress: ProgressState }

function LessonState({ lesson, progress }: { lesson: Lesson; progress: ProgressState }) {
  if (progress.status === 'loading') return <Skeleton className="h-4 w-24" />
  if (progress.status === 'error') return null
  const p = progress.byLessonId.get(lesson.id)
  const status = getLessonStatus(p)
  if (status === 'completed') return <StatusMark kind="completed" />
  if (status === 'in_progress') return <StatusMark kind="in_progress" label={`DAVAM EDİR · SƏHİFƏ ${getResumePage(lesson, p) ?? 1}`} />
  return <StatusMark kind="not_started" />
}

/** The module syllabus: ruled rows, number + title + description + metadata. */
export function LessonList({ path, module, lessons, progress }: LessonListProps) {
  return (
    <ol className="border-t border-line">
      {lessons.map((l) => {
        const p = progress.status === 'ready' ? progress.byLessonId.get(l.id) : undefined
        const canContinue = getLessonStatus(p) === 'in_progress'
        return (
          <li key={l.id} className="relative flex items-start gap-4 border-b border-l-2 border-b-line border-l-transparent px-3 py-5 transition-colors duration-150 focus-within:border-l-accent focus-within:bg-surface hover:border-l-accent hover:bg-surface">
            <span className="w-6 shrink-0 pt-0.5 font-mono text-sm text-fg-subtle">{String(l.order).padStart(2, '0')}</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg">
                <Link to={routes.lesson(path.slug, module.slug, l.slug)} className="after:absolute after:inset-0">{l.title}</Link>
              </h3>
              <p className="mt-1 max-w-[60ch] text-sm text-fg-muted">{l.description}</p>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-fg-muted">
                <span>{l.pages.length} səhifə</span>
                <LessonState lesson={l} progress={progress} />
              </p>
            </div>
            {canContinue && (
              <Link
                to={routes.lesson(path.slug, module.slug, l.slug, getResumePage(l, p) ?? 1)}
                className="relative z-10 shrink-0 border border-line-strong px-3 py-1.5 text-sm transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                Davam et
              </Link>
            )}
          </li>
        )
      })}
    </ol>
  )
}

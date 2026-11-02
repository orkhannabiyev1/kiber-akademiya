import { Link } from 'react-router-dom'
import { ProgressBar, ArrowRightIcon } from '@/components/ui'
import { getModulesForPath, getLessonsForModule } from '@/lib/curriculum'
import { routes } from '@/lib/routes'
import { getPathStats, type ProgressState } from '@/progress'
import type { LearningPath } from '@/types'

/** Concise, real progress numbers. No percentages, no invented metrics. */
export function ProgressSummary({ path, progress }: { path: LearningPath; progress: ProgressState }) {
  if (progress.status !== 'ready') return null
  const s = getPathStats(path, progress.byLessonId)
  return (
    <section aria-labelledby="progress-heading" className="border-t border-line-strong pt-4">
      <h2 id="progress-heading" className="label">İRƏLİLƏYİŞ</h2>
      <p className="mt-1 text-sm text-fg-muted">{path.title}</p>
      <dl className="mt-4 grid grid-cols-2 gap-4">
        <div><dt className="label">MODUL</dt><dd className="mt-1 font-mono text-lg">{s.modulesCompleted} / {s.modulesTotal}</dd></div>
        <div><dt className="label">DƏRS</dt><dd className="mt-1 font-mono text-lg">{s.lessonsCompleted} / {s.lessonsTotal}</dd></div>
      </dl>
      {s.lessonsTotal > 0 && <ProgressBar value={s.lessonsCompleted} max={s.lessonsTotal} label="Tamamlanan dərslər" className="mt-4" />}
    </section>
  )
}

/** Compact entry point only: the curriculum itself lives on the Learning Path page. */
export function PathEntry({ path }: { path: LearningPath }) {
  const modules = getModulesForPath(path)
  const lessons = modules.reduce((n, m) => n + getLessonsForModule(m).length, 0)
  return (
    <section aria-labelledby="path-entry-heading" className="border-t border-line-strong pt-4">
      <h2 id="path-entry-heading" className="label">TƏDRİS YOLU</h2>
      <p className="mt-1 text-lg font-semibold">{path.title}</p>
      <p className="mt-1 font-mono text-xs text-fg-muted">{modules.length} modul · {lessons} mövcud dərs</p>
      <Link to={routes.path(path.slug)} className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm text-accent hover:text-fg">
        Tədris yoluna bax <ArrowRightIcon />
      </Link>
    </section>
  )
}

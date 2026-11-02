import { Link } from 'react-router-dom'
import { Skeleton, StatusMark } from '@/components/ui'
import { getLessonsForModule } from '@/lib/curriculum'
import { routes } from '@/lib/routes'
import { summarizeModule, type ProgressState } from '@/progress'
import type { LearningPath, Module } from '@/types'

const pad = (n: number) => String(n).padStart(2, '0')

function ProgressLine({ module, progress }: { module: Module; progress: ProgressState }) {
  if (progress.status === 'error') return null
  if (progress.status === 'loading') return <Skeleton className="mt-3 h-4 w-40" />
  const { completed, total } = summarizeModule(module, progress.byLessonId)
  return (
    <p className="mt-3 font-mono text-xs text-fg-muted">
      {completed === total && '✓ '}{completed} / {total} dərs tamamlanıb
    </p>
  )
}

/** Lessons as a tree under their module: the curriculum map shows structure, not state. */
function LessonTree({ path, module, progress }: { path: LearningPath; module: Module; progress: ProgressState }) {
  const lessons = getLessonsForModule(module)
  return (
    <ul className="mt-4 max-w-md">
      {lessons.map((l) => {
        const done = progress.status === 'ready' && progress.byLessonId.get(l.id)?.completed
        return (
          <li
            key={l.id}
            className="relative py-1.5 pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-line-strong after:absolute after:left-0 after:top-[17px] after:h-px after:w-4 after:bg-line-strong last:before:h-[17px]"
          >
            <Link to={routes.lesson(path.slug, module.slug, l.slug)} className="flex items-baseline justify-between gap-4 text-sm transition-colors duration-150 hover:text-accent">
              <span className="min-w-0 break-words">{l.title}</span>
              <span className="shrink-0 font-mono text-xs text-fg-muted">
                {done && <span className="text-success"><span aria-hidden="true">✓ </span><span className="sr-only">Tamamlandı, </span></span>}
                {l.pages.length} səhifə
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

/** The curriculum as a vertical roadmap: rail + nodes, available modules open, planned modules inert. */
export function ModuleRoadmap({ path, modules, progress }: { path: LearningPath; modules: Module[]; progress: ProgressState }) {
  return (
    <ol>
      {modules.map((m) => {
        const available = m.status === 'available'
        return (
          <li
            key={m.id}
            id={`module-${m.slug}`}
            className="relative scroll-mt-6 border-b border-line py-7 pl-10 before:absolute before:bottom-0 before:left-3 before:top-0 before:w-px before:bg-line-strong first:pt-1 first:before:top-3 last:border-b-0 last:before:bottom-auto last:before:h-12"
          >
            <span
              aria-hidden="true"
              className={`absolute left-[7px] top-9 size-2.5 rounded-full border first:top-2 ${available ? 'node-live border-accent bg-accent' : 'border-line-strong bg-bg'}`}
            />
            <p className="label">MODUL {pad(m.order)}</p>
            <h3 className={`mt-1 text-xl ${available ? '' : 'text-fg-muted'}`}>
              {available ? <Link to={routes.module(path.slug, m.slug)} className="transition-colors duration-150 hover:text-accent">{m.title}</Link> : m.title}
            </h3>
            <p className={`mt-1 max-w-[60ch] text-sm ${available ? 'text-fg-muted' : 'text-fg-subtle'}`}>{m.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              <StatusMark kind={available ? 'available' : 'coming_soon'} />
              {available && <span className="font-mono text-xs text-fg-muted">{getLessonsForModule(m).length} dərs</span>}
            </div>
            {available && getLessonsForModule(m).length > 0 && (
              <>
                <LessonTree path={path} module={m} progress={progress} />
                <ProgressLine module={m} progress={progress} />
              </>
            )}
          </li>
        )
      })}
    </ol>
  )
}

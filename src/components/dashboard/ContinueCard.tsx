import { Link } from 'react-router-dom'
import { NetworkField } from '@/components/brand/NetworkField'
import { ProgressBar, Skeleton, ArrowRightIcon, buttonClasses } from '@/components/ui'
import { routes } from '@/lib/routes'
import { upperAz } from '@/lib/text'
import { findContinueTarget, getFirstLesson, getPathStats, type ProgressState } from '@/progress'
import type { LearningPath } from '@/types'

/** Console-style panel: header strip (label + context) over a body with the single next action. */
function Shell({ heading, context, accent = false, busy = false, children }: {
  heading: string; context?: string; accent?: boolean; busy?: boolean; children: React.ReactNode
}) {
  return (
    <section aria-labelledby="continue-heading" aria-busy={busy || undefined} className={`panel-hero hud ${accent ? 'glow' : ''} ${accent ? 'border-l-2 border-l-accent' : ''}`}>
      <div className="panel-bar">
        <h2 id="continue-heading" className="label text-accent">{heading}</h2>
        {context && <span className="label truncate">{context}</span>}
      </div>
      <div className="relative p-5 sm:p-8">
        <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-60" />
        <NetworkField className="pointer-events-none absolute -bottom-10 -right-6 hidden w-80 opacity-60 sm:block" />
        <div className="relative">{children}</div>
      </div>
    </section>
  )
}

/** The dashboard's primary focus: exactly one next action, chosen from real progress. */
export function ContinueCard({ path, progress }: { path: LearningPath; progress: ProgressState }) {
  if (progress.status === 'loading') {
    return (
      <Shell heading="DAVAM ET" busy>
        <Skeleton className="h-4 w-32" /><Skeleton className="mt-3 h-9 w-2/3" /><Skeleton className="mt-6 h-10 w-56" />
      </Shell>
    )
  }

  const map = progress.status === 'ready' ? progress.byLessonId : null
  const target = map ? findContinueTarget(path, map) : null

  if (target) {
    const total = target.lesson.pages.length
    return (
      <Shell heading="DAVAM ET" accent context={`${upperAz(target.module.title)} · DƏRS ${String(target.lesson.order).padStart(2, '0')}`}>
        <p className="break-words text-2xl font-semibold leading-tight sm:text-4xl">{target.lesson.title}</p>
        <div className="mt-6 flex max-w-md items-center gap-4">
          <ProgressBar value={target.page} max={total} label="Dərsdə mövqe" live className="flex-1" />
          <span className="shrink-0 font-mono text-xs text-fg-muted">Səhifə {target.page} / {total}</span>
        </div>
        <Link to={routes.lesson(path.slug, target.module.slug, target.lesson.slug, target.page)} className={`${buttonClasses('primary')} mt-7 w-full sm:w-auto`}>
          Son qaldığın yerdən davam et <ArrowRightIcon />
        </Link>
      </Shell>
    )
  }

  const stats = map ? getPathStats(path, map) : null
  const first = getFirstLesson(path)
  const allDone = stats !== null && stats.lessonsTotal > 0 && stats.lessonsCompleted === stats.lessonsTotal

  return (
    <Shell heading={allDone ? 'TAMAMLANDI' : 'HƏLƏ BAŞLANMAYIB'}>
      <p className="max-w-[48ch] text-lg">
        {allDone
          ? 'Bütün mövcud dərslər tamamlanıb. Yeni dərslər əlavə olunduqca burada görünəcək.'
          : progress.status === 'error'
            ? 'İrəliləyiş məlumatı hazırda yüklənə bilmir. Tədris yolundan dərsi açaraq davam edə bilərsən.'
            : 'İlk dərsi açaraq öyrənməyə başlaya bilərsən.'}
      </p>
      {allDone || !first || progress.status === 'error' ? (
        <Link to={routes.path(path.slug)} className={`${buttonClasses('primary')} mt-6 w-full sm:w-auto`}>Tədris yoluna bax <ArrowRightIcon /></Link>
      ) : (
        <Link to={routes.lesson(path.slug, first.module.slug, first.lesson.slug)} className={`${buttonClasses('primary')} mt-6 w-full sm:w-auto`}>İlk dərsə başla <ArrowRightIcon /></Link>
      )}
    </Shell>
  )
}

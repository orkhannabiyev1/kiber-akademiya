import { Link, useParams } from 'react-router-dom'
import { EmptyState, StatusMark, buttonClasses } from '@/components/ui'
import { Breadcrumbs } from '@/components/curriculum/Breadcrumbs'
import { CurriculumNotFound } from '@/components/curriculum/CurriculumNotFound'
import { LessonList } from '@/components/curriculum/LessonList'
import { getLessonsForModule, getModule, getPathBySlug } from '@/lib/curriculum'
import { ProgressUnavailable } from '@/components/curriculum/ProgressUnavailable'
import { routes } from '@/lib/routes'
import { upperAz } from '@/lib/text'
import { summarizeModule, useLessonsProgress } from '@/progress'

export function ModulePage() {
  const { pathSlug, moduleSlug } = useParams<{ pathSlug: string; moduleSlug: string }>()
  const path = getPathBySlug(pathSlug)
  const module = path ? getModule(path, moduleSlug) : undefined
  const lessons = module ? getLessonsForModule(module) : []
  const progress = useLessonsProgress(lessons.map((l) => l.id))
  if (!path || !module) return <CurriculumNotFound />
  const summary = progress.status === 'ready' && lessons.length > 0 ? summarizeModule(module, progress.byLessonId) : null

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: routes.dashboard },
          { label: path.title, to: routes.path(path.slug) },
          { label: module.title },
        ]}
      />
      <header className="panel-hero hud p-5 sm:p-7">
        <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative">
          <p className="label">MODUL {String(module.order).padStart(2, '0')} · {upperAz(path.title)}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h1 className="text-3xl">{module.title}</h1>
            <StatusMark kind={module.status === 'available' ? 'available' : 'coming_soon'} />
          </div>
          <p className="mt-3 max-w-prose text-fg-muted">{module.description}</p>
        </div>
      </header>
      {lessons.length > 0 ? (
        <section aria-labelledby="lessons-heading">
          <h2 id="lessons-heading" className="label mb-4">DƏRSLƏR</h2>
          {summary && <p className="mb-3 font-mono text-sm text-fg-muted">{summary.completed === summary.total && '✓ '}{summary.completed} / {summary.total} dərs tamamlanıb</p>}
          <ProgressUnavailable progress={progress} />
          <LessonList path={path} module={module} lessons={lessons} progress={progress} />
        </section>
      ) : (
        <EmptyState
          label="HAZIRLANIR"
          title="Bu modulun dərsləri hazırlanır"
          description="Məzmun əlavə olunduqda dərslər burada görünəcək."
          action={<Link to={routes.path(path.slug)} className={buttonClasses('secondary')}>Tədris yoluna qayıt</Link>}
        />
      )}
    </div>
  )
}

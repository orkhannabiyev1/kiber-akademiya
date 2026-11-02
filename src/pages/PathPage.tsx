import { useParams } from 'react-router-dom'
import { NetworkField } from '@/components/brand/NetworkField'
import { Breadcrumbs } from '@/components/curriculum/Breadcrumbs'
import { CurriculumNotFound } from '@/components/curriculum/CurriculumNotFound'
import { ModuleRoadmap } from '@/components/curriculum/ModuleRoadmap'
import { ProgressUnavailable } from '@/components/curriculum/ProgressUnavailable'
import { getModulesForPath, getPathBySlug } from '@/lib/curriculum'
import { routes } from '@/lib/routes'
import { upperAz } from '@/lib/text'
import { getLessonIdsForPath, useLessonsProgress } from '@/progress'

/** The curriculum map: what exists, in what order, what is available. Personal state lives on the Dashboard. */
export function PathPage() {
  const { pathSlug } = useParams<{ pathSlug: string }>()
  const path = getPathBySlug(pathSlug)
  const progress = useLessonsProgress(path ? getLessonIdsForPath(path) : [])
  if (!path) return <CurriculumNotFound />
  const modules = getModulesForPath(path)
  const lessonCount = getLessonIdsForPath(path).length

  return (
    <div className="flex flex-col gap-10">
      <Breadcrumbs items={[{ label: 'Dashboard', to: routes.dashboard }, { label: path.title }]} />
      <header className="panel-hero hud glow p-5 sm:p-8">
        <div aria-hidden="true" className="glow-top pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-70" />
        <NetworkField className="pointer-events-none absolute -right-6 top-0 hidden w-80 opacity-70 sm:block lg:w-96" />
        <div className="relative max-w-[52ch]">
          <p className="label">{upperAz(path.title)} · LEARNING PATH</p>
          <h1 className="mt-3 text-3xl sm:text-4xl">{path.title}</h1>
          <p className="mt-3 text-fg-muted">{path.description}</p>
          <p className="mt-5 font-mono text-xs text-fg-muted">{modules.length} modul · {lessonCount} mövcud dərs</p>
        </div>
        <nav aria-label="Modullara keçid" className="relative mt-6 flex flex-wrap gap-2">
          {modules.map((m) =>
            m.status === 'available' ? (
              <a key={m.id} href={`#module-${m.slug}`} className="rounded-sm border border-accent/50 px-2.5 py-1 font-mono text-xs text-accent transition-colors duration-150 hover:bg-accent/10">{m.title}</a>
            ) : (
              <span key={m.id} className="rounded-sm border border-line px-2.5 py-1 font-mono text-xs text-fg-subtle">{m.title}</span>
            ),
          )}
        </nav>
      </header>

      <section aria-labelledby="roadmap-heading">
        <h2 id="roadmap-heading" className="label mb-4">MODULLAR · {String(modules.length).padStart(2, '0')}</h2>
        <ProgressUnavailable progress={progress} />
        <ModuleRoadmap path={path} modules={modules} progress={progress} />
      </section>
    </div>
  )
}

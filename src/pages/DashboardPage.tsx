import { TopologyMotif } from '@/components/brand/TopologyMotif'
import { ContinueCard } from '@/components/dashboard/ContinueCard'
import { PathEntry, ProgressSummary } from '@/components/dashboard/DashboardAside'
import { RecentLearning } from '@/components/dashboard/RecentLearning'
import { ProgressUnavailable } from '@/components/curriculum/ProgressUnavailable'
import { defaultPath } from '@/lib/curriculum'
import { getLessonIdsForPath, useLessonsProgress } from '@/progress'

/** Personal state: where am I and what next. The curriculum itself lives on the Learning Path page. */
export function DashboardPage() {
  const path = defaultPath
  const progress = useLessonsProgress(getLessonIdsForPath(path))

  return (
    <div className="flex flex-col gap-8">
      <header className="relative">
        {/* Header field: faint technical grid + topology, fading out below the title. Decorative only. */}
        <div aria-hidden="true" className="glow-top pointer-events-none absolute -top-8 h-56 -inset-x-4 sm:-inset-x-6 lg:-inset-x-10" />
        <div aria-hidden="true" className="tech-grid pointer-events-none absolute -top-8 h-44 opacity-60 -inset-x-4 sm:-inset-x-6 lg:-inset-x-10" />
        <TopologyMotif className="pointer-events-none absolute -top-2 right-0 hidden w-56 opacity-50 sm:block" />
        <div className="relative">
          <p className="label">XOŞ GƏLMİSƏN</p>
          <h1 className="mt-2 text-2xl sm:text-3xl">Öyrənməyə davam et</h1>
        </div>
      </header>
      <ProgressUnavailable progress={progress} />
      {/* DOM order = mobile priority: continue → progress → path → recent. Desktop places them in two columns. */}
      {/* DOM order = mobile priority: continue → progress → path → recent. On desktop the aside spans both rows. */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start lg:gap-x-10">
        <div className="lg:col-start-1 lg:row-start-1"><ContinueCard path={path} progress={progress} /></div>
        <div className="flex flex-col gap-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ProgressSummary path={path} progress={progress} />
          <PathEntry path={path} />
        </div>
        <div className="lg:col-start-1 lg:row-start-2"><RecentLearning path={path} progress={progress} /></div>
      </div>
    </div>
  )
}

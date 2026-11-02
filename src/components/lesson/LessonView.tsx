import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '@/auth/useAuth'
import { Breadcrumbs } from '@/components/curriculum/Breadcrumbs'
import { Badge, Button, EmptyState, ProgressBar } from '@/components/ui'
import type { LessonContext } from '@/lib/curriculum'
import { getLessonNav, parsePageParam } from '@/lib/lesson-navigation'
import { routes } from '@/lib/routes'
import { upperAz } from '@/lib/text'
import { completeLesson, saveLessonPage } from '@/progress/progress-service'
import { getResumePage } from '@/progress/progress-utils'
import type { LessonProgress } from '@/progress/progress-types'
import { LessonNavigation } from './LessonNavigation'
import { LessonOutline } from './LessonOutline'
import { LessonPageRenderer } from './LessonPageRenderer'

interface LessonViewProps extends LessonContext {
  /** Snapshot loaded when the lesson opened (null: no saved progress or progress unavailable). */
  initialProgress: LessonProgress | null
}

/** Receives an already-resolved lesson and its progress snapshot; knows nothing about where either came from. */
export function LessonView({ initialProgress, ...ctx }: LessonViewProps) {
  const { path, module, lesson } = ctx
  const { status: authStatus } = useAuth()
  const [search] = useSearchParams()
  const total = lesson.pages.length

  // Page priority: explicit ?page=N (invalid → 1), else the saved page captured at open time, else 1.
  // The snapshot is frozen so browser back/forward behaves the same before and after we save.
  const [resumePage] = useState(() => getResumePage(lesson, initialProgress))
  const rawPage = search.get('page')
  const page = rawPage === null ? (resumePage ?? 1) : parsePageParam(rawPage, total)
  const current = lesson.pages[page - 1]

  const [completed, setCompleted] = useState(initialProgress?.completed ?? false)
  const [completing, setCompleting] = useState(false)
  const [completeError, setCompleteError] = useState(false)
  const [saveFailed, setSaveFailed] = useState(false)

  // Persist the page the learner is on: on open and on each page change. Skipped when it equals what is already saved.
  const lastSaved = useRef<number | null>(initialProgress?.lastPage ?? null)
  useEffect(() => {
    if (authStatus !== 'authenticated' || !current || lastSaved.current === page) return
    lastSaved.current = page
    void saveLessonPage(lesson.id, page).then((r) => setSaveFailed(!r.ok))
  }, [authStatus, current, lesson.id, page])

  const onComplete = async () => {
    if (completing) return
    setCompleting(true)
    setCompleteError(false)
    const result = await completeLesson(lesson.id, total)
    setCompleting(false)
    if (result.ok) { setCompleted(true); lastSaved.current = total } else setCompleteError(true)
  }

  // On page change (not first load) return to the top and move focus to the content.
  const region = useRef<HTMLElement>(null)
  const previousPage = useRef(page)
  useEffect(() => {
    if (previousPage.current === page) return
    previousPage.current = page
    window.scrollTo({ top: 0 })
    region.current?.focus()
  }, [page])

  const hrefFor = (n: number) => routes.lesson(path.slug, module.slug, lesson.slug, n)

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: path.title, to: routes.path(path.slug) },
          { label: module.title, to: routes.module(path.slug, module.slug) },
          { label: lesson.title },
        ]}
      />
      <header className="mt-6">
        <p className="label">{upperAz(module.title)} · DƏRS {String(lesson.order).padStart(2, '0')}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
          <h1 className="text-2xl sm:text-3xl">{lesson.title}</h1>
          {completed && <Badge tone="success">✓ Tamamlandı</Badge>}
        </div>
        {/* Reading position only (decorative: the exact page is announced in the navigation bar). */}
        <ProgressBar value={page} max={total} segments={total} className="mt-5 max-w-xs" />
      </header>

      {!current ? (
        <div className="mt-8"><EmptyState title="Bu dərsdə hələ səhifə yoxdur" /></div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
          <LessonOutline lesson={lesson} current={page} hrefFor={hrefFor} />
          <section ref={region} tabIndex={-1} aria-labelledby="page-title" className="min-w-0 border-t border-line pt-6 focus:outline-none lg:border-t-0 lg:pt-0">
            <p aria-hidden="true" className="label mb-2">SƏHİFƏ {String(page).padStart(2, '0')} / {String(total).padStart(2, '0')}</p>
            <h2 id="page-title" className="mb-6 text-xl sm:text-2xl">{current.title ?? `Səhifə ${page}`}</h2>
            <LessonPageRenderer key={current.id} page={current} />
            {page === total && (
              <div className="mt-10 border-t border-line pt-6">
                {completed ? (
                  <p role="status" className="font-medium text-success">✓ Tamamlandı</p>
                ) : (
                  <Button onClick={onComplete} disabled={completing}>{completing ? 'Yadda saxlanılır…' : 'Dərsi tamamla'}</Button>
                )}
                {completeError && <p role="alert" className="mt-3 text-sm text-danger">Xəta: Dərsi tamamlamaq mümkün olmadı. Yenidən cəhd edin.</p>}
              </div>
            )}
          </section>
        </div>
      )}

      {saveFailed && <p role="status" className="mt-6 text-sm text-fg-muted">İrəliləyiş yadda saxlanılmadı. Dərsi oxumağa davam edə bilərsiniz.</p>}
      <LessonNavigation nav={getLessonNav({ ...ctx, page })} page={page} total={total} />
    </div>
  )
}

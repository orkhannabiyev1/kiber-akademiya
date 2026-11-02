import { useParams } from 'react-router-dom'
import { CurriculumNotFound } from '@/components/curriculum/CurriculumNotFound'
import { LessonView } from '@/components/lesson/LessonView'
import { Skeleton } from '@/components/ui'
import { resolveLesson, type LessonContext } from '@/lib/curriculum'
import { useLessonsProgress } from '@/progress'

/** Loads the learner's saved progress once, then renders the lesson (no flash of the wrong page). */
function LessonScreen(ctx: LessonContext) {
  const progress = useLessonsProgress([ctx.lesson.id])
  if (progress.status === 'loading') {
    return (
      <div role="status" aria-busy="true">
        <span className="sr-only">Yüklənir…</span>
        <Skeleton className="h-4 w-56" />
        <Skeleton className="mt-6 h-9 w-2/3" />
        <Skeleton className="mt-8 h-6 w-1/2" />
        <Skeleton className="mt-4 h-24 w-full max-w-[68ch]" />
      </div>
    )
  }
  const initial = progress.status === 'ready' ? (progress.byLessonId.get(ctx.lesson.id) ?? null) : null
  return <LessonView {...ctx} initialProgress={initial} />
}

/** Resolves route params against known content only, then hands the lesson to the screen. */
export function LessonPage() {
  const { pathSlug, moduleSlug, lessonSlug } = useParams<{ pathSlug: string; moduleSlug: string; lessonSlug: string }>()
  const ctx = resolveLesson(pathSlug, moduleSlug, lessonSlug)
  return ctx ? <LessonScreen key={ctx.lesson.id} {...ctx} /> : <div className="py-8"><CurriculumNotFound /></div>
}

/** User progress for one lesson. Kept separate from Lesson (shared static content). */
export interface LessonProgress {
  lessonId: string
  lastPage: number
  completed: boolean
  completedAt: string | null
  createdAt: string
  updatedAt: string
}

export type LessonStatus = 'not_started' | 'in_progress' | 'completed'

/** What UI components receive: loading, failed (UI keeps working without progress), or ready. */
export type ProgressState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; byLessonId: ReadonlyMap<string, LessonProgress> }

export type ServiceResult<T> = { ok: true; data: T } | { ok: false }

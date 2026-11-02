import { supabase } from '@/lib/supabase'
import type { LessonProgress, ServiceResult } from './progress-types'

/**
 * The only module that talks to the lesson_progress table.
 * Ownership is enforced by Row Level Security (see supabase/migrations/0002); the client never sends user_id.
 * Errors are reduced to { ok: false } so raw backend details never reach the UI.
 */
const TABLE = 'lesson_progress'
const COLUMNS = 'lesson_id,last_page,completed,completed_at,created_at,updated_at'

interface ProgressRow {
  lesson_id: string; last_page: number; completed: boolean
  completed_at: string | null; created_at: string; updated_at: string
}

const isRow = (v: unknown): v is ProgressRow => {
  if (typeof v !== 'object' || v === null) return false
  const r = v as Record<string, unknown>
  return typeof r.lesson_id === 'string' && typeof r.last_page === 'number' && typeof r.completed === 'boolean'
    && (r.completed_at === null || typeof r.completed_at === 'string')
    && typeof r.created_at === 'string' && typeof r.updated_at === 'string'
}

const toProgress = (r: ProgressRow): LessonProgress => ({
  lessonId: r.lesson_id, lastPage: r.last_page, completed: r.completed,
  completedAt: r.completed_at, createdAt: r.created_at, updatedAt: r.updated_at,
})

const fail = (code?: string): { ok: false } => {
  console.warn('[progress] request failed', code ?? '')
  return { ok: false }
}

/** One query for any number of lessons (no N+1). Lesson ids come from the static registry, never from user input. */
export async function getProgressForLessons(lessonIds: readonly string[]): Promise<ServiceResult<LessonProgress[]>> {
  if (lessonIds.length === 0) return { ok: true, data: [] }
  if (!supabase) return fail('not_configured')
  try {
    const { data, error } = await supabase.from(TABLE).select(COLUMNS).in('lesson_id', [...lessonIds])
    if (error) return fail(error.code)
    const rows: unknown = data
    if (!Array.isArray(rows) || !rows.every(isRow)) return fail('bad_shape')
    return { ok: true, data: rows.map(toProgress) }
  } catch {
    return fail('exception')
  }
}

export async function getLessonProgress(lessonId: string): Promise<ServiceResult<LessonProgress | null>> {
  const result = await getProgressForLessons([lessonId])
  return result.ok ? { ok: true, data: result.data[0] ?? null } : result
}

// Writes run strictly one after another, so a slow older request can never overwrite a newer one.
let writeQueue: Promise<unknown> = Promise.resolve()
const enqueue = <T>(job: () => Promise<T>): Promise<T> => {
  const run = writeQueue.then(job, job)
  writeQueue = run.catch(() => undefined)
  return run
}

async function upsert(payload: { lesson_id: string; last_page: number; completed?: true }): Promise<ServiceResult<null>> {
  if (!supabase) return fail('not_configured')
  if (!Number.isInteger(payload.last_page) || payload.last_page < 1) return fail('invalid_page')
  const client = supabase
  return enqueue(async () => {
    try {
      // Merge upsert on (user_id, lesson_id). Omitted columns (e.g. `completed`) are left untouched.
      const { error } = await client.from(TABLE).upsert(payload, { onConflict: 'user_id,lesson_id' })
      return error ? fail(error.code) : { ok: true as const, data: null }
    } catch {
      return fail('exception')
    }
  })
}

/** Never sends `completed`, so changing pages can never un-complete a lesson. */
export const saveLessonPage = (lessonId: string, page: number) => upsert({ lesson_id: lessonId, last_page: page })

/** Explicit completion. Client-side only: not an entitlement (see README). */
export const completeLesson = (lessonId: string, lastPage: number) =>
  upsert({ lesson_id: lessonId, last_page: lastPage, completed: true })

import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/auth/useAuth'
import { getProgressForLessons } from './progress-service'
import type { LessonProgress, ProgressState } from './progress-types'

const EMPTY: ProgressState = { status: 'ready', byLessonId: new Map() }

/**
 * Loads the signed-in user's progress for the given lessons in one request.
 * Waits for auth to be resolved and never queries for guests or for empty id lists.
 */
export function useLessonsProgress(lessonIds: readonly string[]): ProgressState {
  const { status } = useAuth()
  const key = lessonIds.join('|')
  const ids = useMemo(() => (key ? key.split('|') : []), [key])
  const [result, setResult] = useState<{ key: string; state: ProgressState } | null>(null)

  useEffect(() => {
    if (status !== 'authenticated' || ids.length === 0) return
    let active = true
    void getProgressForLessons(ids).then((r) => {
      if (!active) return
      const state: ProgressState = r.ok
        ? { status: 'ready', byLessonId: new Map<string, LessonProgress>(r.data.map((p) => [p.lessonId, p])) }
        : { status: 'error' }
      setResult({ key, state })
    })
    return () => { active = false }
  }, [status, key, ids])

  if (ids.length === 0) return EMPTY
  return status === 'authenticated' && result?.key === key ? result.state : { status: 'loading' }
}

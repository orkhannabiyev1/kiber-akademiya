import { getLessonsForModule, getModulesForPath } from '@/lib/curriculum'
import type { Lesson, LearningPath, Module } from '@/types'
import type { LessonProgress, LessonStatus } from './progress-types'

export const getLessonStatus = (p: LessonProgress | undefined | null): LessonStatus =>
  !p ? 'not_started' : p.completed ? 'completed' : 'in_progress'

/** Saved page if it is valid for the current lesson content, otherwise undefined (stale content is ignored). */
export const getResumePage = (lesson: Lesson, p: LessonProgress | undefined | null): number | undefined =>
  p && Number.isInteger(p.lastPage) && p.lastPage >= 1 && p.lastPage <= lesson.pages.length ? p.lastPage : undefined

export const getLessonIdsForPath = (path: LearningPath): string[] =>
  getModulesForPath(path).flatMap((m) => getLessonsForModule(m).map((l) => l.id))

/** Derived, never stored: completed lessons out of lessons that exist. */
export function summarizeModule(module: Module, byLessonId: ReadonlyMap<string, LessonProgress>) {
  const lessons = getLessonsForModule(module)
  return { total: lessons.length, completed: lessons.filter((l) => byLessonId.get(l.id)?.completed).length }
}

export interface ContinueTarget { module: Module; lesson: Lesson; page: number }

/** Most recently touched lesson that is started but not completed. */
export function findContinueTarget(path: LearningPath, byLessonId: ReadonlyMap<string, LessonProgress>): ContinueTarget | null {
  let best: { target: ContinueTarget; at: string } | null = null
  for (const module of getModulesForPath(path)) {
    for (const lesson of getLessonsForModule(module)) {
      const p = byLessonId.get(lesson.id)
      if (!p || p.completed) continue
      if (!best || p.updatedAt > best.at) best = { target: { module, lesson, page: getResumePage(lesson, p) ?? 1 }, at: p.updatedAt }
    }
  }
  return best?.target ?? null
}

export function getPathStats(path: LearningPath, byLessonId: ReadonlyMap<string, LessonProgress>) {
  const modules = getModulesForPath(path)
  const summaries = modules.map((m) => summarizeModule(m, byLessonId))
  return {
    modulesTotal: modules.length,
    modulesCompleted: summaries.filter((s) => s.total > 0 && s.completed === s.total).length,
    lessonsTotal: summaries.reduce((n, s) => n + s.total, 0),
    lessonsCompleted: summaries.reduce((n, s) => n + s.completed, 0),
  }
}

export interface LessonEntry { module: Module; lesson: Lesson; progress: LessonProgress }

/** Lessons the user has actually touched, newest first. Nothing is invented for untouched lessons. */
export function getRecentLessons(path: LearningPath, byLessonId: ReadonlyMap<string, LessonProgress>, excludeLessonId?: string, limit = 3): LessonEntry[] {
  return getModulesForPath(path)
    .flatMap((module) => getLessonsForModule(module).map((lesson) => ({ module, lesson, progress: byLessonId.get(lesson.id) })))
    .filter((e): e is LessonEntry => e.progress !== undefined && e.lesson.id !== excludeLessonId)
    .sort((a, b) => b.progress.updatedAt.localeCompare(a.progress.updatedAt))
    .slice(0, limit)
}

export function getFirstLesson(path: LearningPath): { module: Module; lesson: Lesson } | null {
  for (const module of getModulesForPath(path)) {
    const lesson = getLessonsForModule(module)[0]
    if (lesson) return { module, lesson }
  }
  return null
}

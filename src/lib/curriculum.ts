import type { BadgeTone } from '@/components/ui'
import { learningPaths, modules } from '@/data/learning-path'
import { lessons } from '@/data/lessons'
import type { ContentStatus, Lesson, LearningPath, Module } from '@/types'

/** Route params are only ever used to look up known data; unknown values return undefined. */
export const getPathBySlug = (slug: string | undefined): LearningPath | undefined =>
  learningPaths.find((p) => p.slug === slug)

export const getModulesForPath = (path: LearningPath): Module[] =>
  path.moduleIds
    .map((id) => modules.find((m) => m.id === id))
    .filter((m): m is Module => m !== undefined)
    .sort((a, b) => a.order - b.order)

export const getModule = (path: LearningPath, moduleSlug: string | undefined): Module | undefined =>
  getModulesForPath(path).find((m) => m.slug === moduleSlug)

export const getLessonsForModule = (module: Module): Lesson[] =>
  module.lessonIds
    .map((id) => lessons.find((l) => l.id === id))
    .filter((l): l is Lesson => l !== undefined && l.moduleId === module.id)
    .sort((a, b) => a.order - b.order)

export interface LessonContext { path: LearningPath; module: Module; lesson: Lesson; moduleLessons: Lesson[] }

/** Resolves route params against known data only. Anything unknown returns undefined. */
export function resolveLesson(pathSlug?: string, moduleSlug?: string, lessonSlug?: string): LessonContext | undefined {
  const path = getPathBySlug(pathSlug)
  const module = path ? getModule(path, moduleSlug) : undefined
  if (!path || !module) return undefined
  const moduleLessons = getLessonsForModule(module)
  const lesson = moduleLessons.find((l) => l.slug === lessonSlug)
  return lesson ? { path, module, lesson, moduleLessons } : undefined
}

/** The only path today; used by navigation until there is a path picker. */
export const defaultPath: LearningPath = learningPaths[0] as LearningPath

export const statusDisplay: Record<ContentStatus, { label: string; tone: BadgeTone }> = {
  available: { label: 'Hazırdır', tone: 'accent' },
  coming_soon: { label: 'Hazırlanır', tone: 'warning' },
}

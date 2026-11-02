import type { Lesson, LearningPath, Module } from '@/types'
import { routes } from './routes'

/** Strict 1-based page parser: only plain positive integers within range; anything else falls back to 1. */
export function parsePageParam(raw: string | null, total: number): number {
  if (raw === null || !/^[1-9]\d{0,3}$/.test(raw)) return 1
  const n = Number(raw)
  return n <= total ? n : 1
}

export interface NavTarget { to: string; label: string }
export interface LessonNav { previous: NavTarget; next: NavTarget }

interface NavInput { path: LearningPath; module: Module; lesson: Lesson; moduleLessons: Lesson[]; page: number }

/** Previous/next across pages, then lessons in the module, then back to the module. Never a dead end. */
export function getLessonNav({ path, module, lesson, moduleLessons, page }: NavInput): LessonNav {
  const at = (l: Lesson, p?: number) => routes.lesson(path.slug, module.slug, l.slug, p)
  const index = moduleLessons.findIndex((l) => l.id === lesson.id)
  const prevLesson = moduleLessons[index - 1]
  const nextLesson = moduleLessons[index + 1]
  const moduleTarget = { to: routes.module(path.slug, module.slug), label: 'Modula qayıt' }

  const previous: NavTarget =
    page > 1 ? { to: at(lesson, page - 1), label: 'Əvvəlki' }
    : prevLesson ? { to: at(prevLesson, prevLesson.pages.length), label: 'Əvvəlki dərs' }
    : moduleTarget

  const next: NavTarget =
    page < lesson.pages.length ? { to: at(lesson, page + 1), label: 'Növbəti' }
    : nextLesson ? { to: at(nextLesson), label: 'Növbəti dərs' }
    : moduleTarget

  return { previous, next }
}

/** Single place for app URLs (paths are relative to the router basename, so GitHub Pages base paths keep working). */
export const routes = {
  dashboard: '/dashboard',
  path: (pathSlug: string) => `/path/${pathSlug}`,
  module: (pathSlug: string, moduleSlug: string) => `/path/${pathSlug}/module/${moduleSlug}`,
  lesson: (pathSlug: string, moduleSlug: string, lessonSlug: string, page?: number) =>
    `/path/${pathSlug}/module/${moduleSlug}/lesson/${lessonSlug}${page && page > 1 ? `?page=${page}` : ''}`,
} as const

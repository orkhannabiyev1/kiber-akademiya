import type { ProgressState } from '@/progress'

/** Progress is optional: if it cannot load, the curriculum stays fully usable. */
export function ProgressUnavailable({ progress }: { progress: ProgressState }) {
  if (progress.status !== 'error') return null
  return <p role="status" className="mb-3 text-sm text-fg-muted">İrəliləyiş məlumatı hazırda yüklənə bilmir.</p>
}

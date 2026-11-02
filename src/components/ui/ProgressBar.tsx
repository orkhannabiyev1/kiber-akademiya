import { cx } from '@/lib/cx'

interface ProgressBarProps {
  value: number
  max?: number
  /** Accessible name. Without it the bar is decorative (aria-hidden) and must sit next to a text equivalent. */
  label?: string
  /** Draw `segments` discrete steps instead of a continuous bar (e.g. one per lesson page). */
  segments?: number
  /** Adds a slow light sweep on the fill: use for the one bar that represents active work. */
  live?: boolean
  className?: string
}

export function ProgressBar({ value, max = 100, label, segments, live, className }: ProgressBarProps) {
  const clamped = Math.min(max, Math.max(0, value))
  const a11y = label
    ? { role: 'progressbar' as const, 'aria-label': label, 'aria-valuemin': 0, 'aria-valuemax': max, 'aria-valuenow': clamped }
    : { 'aria-hidden': true as const }

  if (segments && segments > 0) {
    const filled = Math.round((clamped / max) * segments)
    return (
      <div {...a11y} className={cx('flex w-full gap-1', className)}>
        {Array.from({ length: segments }, (_, i) => (
          <div key={i} className={cx('h-1.5 flex-1 rounded-[2px] transition-colors duration-200', i < filled ? 'bg-accent' : 'bg-line-strong')} />
        ))}
      </div>
    )
  }
  return (
    <div {...a11y} className={cx('h-1.5 w-full overflow-hidden rounded-[2px] bg-line-strong', className)}>
      <div className={cx('relative h-full overflow-hidden bg-accent transition-[width] duration-200', live && 'bar-shine')} style={{ width: `${max > 0 ? (clamped / max) * 100 : 0}%` }} />
    </div>
  )
}

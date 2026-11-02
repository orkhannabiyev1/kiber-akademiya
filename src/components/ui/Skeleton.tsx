import { cx } from '@/lib/cx'

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cx('animate-pulse rounded-sm bg-surface-raised', className)} />
}

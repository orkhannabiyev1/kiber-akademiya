import { cx } from '@/lib/cx'

/** `node` adds a small topology marker at the start of the line, for section breaks. */
export function Divider({ className, node = false }: { className?: string; node?: boolean }) {
  if (!node) return <hr className={cx('border-0 border-t border-line', className)} />
  return (
    <div role="separator" className={cx('flex items-center', className)}>
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full border border-line-strong" />
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  )
}

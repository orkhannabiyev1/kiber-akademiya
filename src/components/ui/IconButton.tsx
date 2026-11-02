import type { ComponentPropsWithRef } from 'react'
import { cx } from '@/lib/cx'

interface IconButtonProps extends ComponentPropsWithRef<'button'> {
  /** Required: icon-only controls need an accessible name. */
  label: string
}

export function IconButton({ label, className, children, type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cx(
        'inline-flex size-10 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

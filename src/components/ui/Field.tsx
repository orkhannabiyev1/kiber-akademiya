import type { ReactNode } from 'react'

interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
}

/** Shared label + hint + error wrapper for form controls. Ids: `${id}-hint`, `${id}-error`. */
export function Field({ id, label, hint, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-fg-muted">{hint}</p>}
      {error && <p id={`${id}-error`} className="text-xs text-danger">{error}</p>}
    </div>
  )
}

export const controlClasses =
  'w-full rounded-md border border-fg-subtle/70 bg-elevated px-3 text-sm text-fg placeholder:text-fg-subtle transition-colors duration-150 hover:border-fg-muted disabled:opacity-50'

export const describedBy = (id: string, hint?: string, error?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined

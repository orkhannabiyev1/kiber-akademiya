import type { ReactNode } from 'react'

interface EmptyStateProps { label?: string; title: string; description?: string; action?: ReactNode }

export function EmptyState({ label, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-2 panel border-l-2 border-l-accent/60 p-5 sm:p-6">
      {label && <p className="label text-warning">{label}</p>}
      <h2 className="text-lg">{title}</h2>
      {description && <p className="max-w-prose text-sm text-fg-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

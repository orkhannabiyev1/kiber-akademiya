import type { ReactNode } from 'react'

export function PagePlaceholder({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl sm:text-3xl">{title}</h1>
      {children && <div className="max-w-prose text-fg-muted">{children}</div>}
    </div>
  )
}

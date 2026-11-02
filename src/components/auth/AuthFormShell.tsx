import type { ReactNode } from 'react'

export const authLinkClass = 'text-accent underline underline-offset-4 hover:text-fg'

interface AuthFormShellProps { title: string; description?: string; children: ReactNode; footer: ReactNode }

export function AuthFormShell({ title, description, children, footer }: AuthFormShellProps) {
  return (
    <div>
      <h1 className="text-2xl">{title}</h1>
      {description && <p className="mt-2 text-sm text-fg-muted">{description}</p>}
      <div className="mt-8">{children}</div>
      <div className="mt-8 border-t border-line pt-6 text-sm text-fg-muted">{footer}</div>
    </div>
  )
}

/** Error or status text. Not color-only: it carries a text prefix and a border. */
export function FormMessage({ tone, children }: { tone: 'error' | 'success'; children: ReactNode }) {
  const isError = tone === 'error'
  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={`border-l-2 py-1 pl-3 text-sm ${isError ? 'border-danger' : 'border-success'}`}
    >
      <strong className={`font-medium ${isError ? 'text-danger' : 'text-success'}`}>{isError ? 'Xəta: ' : 'Hazırdır: '}</strong>
      {children}
    </div>
  )
}

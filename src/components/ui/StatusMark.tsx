import { cx } from '@/lib/cx'

export type MarkKind = 'available' | 'coming_soon' | 'not_started' | 'in_progress' | 'completed'

// Labels are written in capitals on purpose (see .label in index.css: CSS uppercase mishandles Azerbaijani i/İ).
const config: Record<MarkKind, { label: string; text: string; node: string }> = {
  available: { label: 'HAZIRDIR', text: 'text-accent', node: 'node-live bg-accent border-accent' },
  coming_soon: { label: 'HAZIRLANIR', text: 'text-warning', node: 'border-warning/70' },
  not_started: { label: 'BAŞLAMAYIB', text: 'text-fg-muted', node: 'border-fg-subtle' },
  in_progress: { label: 'DAVAM EDİR', text: 'text-accent', node: 'node-live border-accent bg-accent/40' },
  completed: { label: 'TAMAMLANDI', text: 'text-success', node: 'bg-success border-success' },
}

/** Node + text. Status is always written out, never conveyed by the node color alone. */
export function StatusMark({ kind, label }: { kind: MarkKind; label?: string }) {
  const c = config[kind]
  return (
    <span className={cx('inline-flex items-center gap-2 font-mono text-xs tracking-[0.08em]', c.text)}>
      <span aria-hidden="true" className={cx('size-2 shrink-0 rounded-full border', c.node)} />
      {kind === 'completed' && <span aria-hidden="true">✓</span>}
      {label ?? c.label}
    </span>
  )
}

import { Badge } from '@/components/ui'
import { statusDisplay } from '@/lib/curriculum'
import type { LabPage } from '@/types'
import { TextBlocks } from './TextBlocks'

/** Foundation only: no terminal, no execution. A real lab provider plugs in here later. */
export function LabPageRenderer({ page }: { page: LabPage }) {
  const status = statusDisplay[page.status]
  return (
    <div className="flex max-w-[68ch] flex-col gap-4">
      <div><Badge tone={status.tone}>{status.label}</Badge></div>
      <p className="leading-7">{page.description}</p>
      {page.instructions && <TextBlocks blocks={page.instructions} />}
      <p className="rounded-lg border border-dashed border-line-strong p-4 text-sm text-fg-muted">
        Bu praktiki lab sonrakı mərhələdə aktivləşdiriləcək.
      </p>
    </div>
  )
}

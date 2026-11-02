import { isSafeExternalUrl } from '@/lib/safe-url'
import type { Inline, InlineNode, TextBlock } from '@/types'

function InlineNodeView({ node }: { node: InlineNode }) {
  if (typeof node === 'string') return <>{node}</>
  switch (node.type) {
    case 'code':
      return <code className="rounded-sm border border-line bg-surface-raised px-1 py-0.5 font-mono text-[0.9em]">{node.text}</code>
    case 'em':
      return <em>{node.text}</em>
    case 'strong':
      return <strong className="font-semibold">{node.text}</strong>
    case 'link':
      // Unsafe URLs degrade to plain text instead of becoming links.
      return isSafeExternalUrl(node.href) ? (
        <a href={node.href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 hover:text-fg">
          {node.text}<span className="sr-only"> (yeni pəncərədə açılır)</span>
        </a>
      ) : (
        <>{node.text}</>
      )
  }
}

export function InlineContent({ content }: { content: Inline }) {
  return <>{content.map((node, i) => <InlineNodeView key={i} node={node} />)}</>
}

/** Renders structured text blocks. Content is React text nodes only: no HTML is ever parsed. */
export function TextBlocks({ blocks }: { blocks: TextBlock[] }) {
  return (
    <div className="flex max-w-[68ch] flex-col gap-4 text-base leading-7">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return <h3 key={i} className="mt-4 text-lg">{block.text}</h3>
          case 'paragraph':
            return <p key={i}><InlineContent content={block.content} /></p>
          case 'list': {
            const Tag = block.ordered ? 'ol' : 'ul'
            return (
              <Tag key={i} className={`flex flex-col gap-2 pl-6 ${block.ordered ? 'list-decimal' : 'list-disc'} marker:text-fg-subtle`}>
                {block.items.map((item, j) => <li key={j}><InlineContent content={item} /></li>)}
              </Tag>
            )
          }
          case 'note':
            return (
              <aside key={i} className="rounded-r-md border-l-2 border-accent bg-surface py-3 pl-4 pr-3 text-[0.95rem]">
                <p className="text-sm font-medium text-accent">{block.title ?? 'Qeyd'}</p>
                <p className="mt-1"><InlineContent content={block.content} /></p>
              </aside>
            )
        }
      })}
    </div>
  )
}

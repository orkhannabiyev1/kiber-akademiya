import { Container } from '@/components/ui'
import { Badge } from '@/components/ui'
import { pathPreview } from '@/data/landing'

export function LearningPathPreview() {
  return (
    <section id={pathPreview.id} aria-labelledby="path-title" className="border-t border-line py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="path-title" className="text-2xl sm:text-3xl">{pathPreview.title}</h2>
          <p className="mt-4 max-w-[52ch] text-fg-muted">{pathPreview.text}</p>
          <p className="mt-6 font-mono text-sm text-fg-subtle" aria-label={pathPreview.hierarchy.join(', ')}>
            {pathPreview.hierarchy.join(' → ')}
          </p>
        </div>
        <ul className="border-t border-line lg:col-span-7">
          {pathPreview.topics.map((t) => (
            <li key={t.id} className="flex items-start justify-between gap-4 border-b border-line py-5">
              <div>
                <h3 className="text-lg">{t.name}</h3>
                <p className="mt-1 max-w-[46ch] text-sm text-fg-muted">{t.description}</p>
              </div>
              <Badge tone={t.tone}>{t.status}</Badge>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

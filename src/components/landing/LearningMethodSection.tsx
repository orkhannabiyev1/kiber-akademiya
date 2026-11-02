import { Container } from '@/components/ui'
import { method } from '@/data/landing'

export function LearningMethodSection() {
  return (
    <section id={method.id} aria-labelledby="method-title" className="border-t border-line py-16 sm:py-24">
      <Container>
        <h2 id="method-title" className="text-2xl sm:text-3xl">{method.title}</h2>
        {/* Steps are a real sequence, so numbering carries meaning here. */}
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {method.steps.map((s, i) => (
            <li key={s.title} className="border-t border-line-strong pt-4">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 max-w-[38ch] text-fg-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

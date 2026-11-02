import { Link } from 'react-router-dom'
import { Container, buttonClasses } from '@/components/ui'
import { finalCta } from '@/data/landing'

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="border-t border-line py-16 sm:py-24">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="cta-title" className="max-w-[24ch] text-2xl sm:text-3xl">{finalCta.title}</h2>
          <p className="mt-3 text-fg-muted">{finalCta.text}</p>
        </div>
        <Link to="/signup" className={`${buttonClasses('primary')} w-full sm:w-auto`}>{finalCta.cta}</Link>
      </Container>
    </section>
  )
}

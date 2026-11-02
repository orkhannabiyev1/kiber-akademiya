import { Link } from 'react-router-dom'
import { Container, buttonClasses } from '@/components/ui'
import { hero } from '@/data/landing'
import { NetworkField } from '@/components/brand/NetworkField'
import { PathTree } from './PathTree'

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden py-12 sm:py-20 lg:py-28">
      <div aria-hidden="true" className="glow-top pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-50" />
      <NetworkField labels={false} className="pointer-events-none absolute -right-16 top-1/2 w-[32rem] -translate-y-1/2 opacity-25 sm:opacity-40 lg:right-0 lg:w-[46rem]" />
      <Container className="relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="animate-fade-in lg:col-span-7">
          <p className="label caret mb-5 text-accent">{hero.tag}</p>
          <h1 id="hero-title" className="break-words text-display">{hero.title}</h1>
          <p className="mt-5 max-w-[56ch] text-lg text-fg-muted">{hero.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/signup" className={`${buttonClasses('primary')} w-full sm:w-auto`}>{hero.primaryCta}</Link>
            <a href="#path" className={`${buttonClasses('secondary')} w-full sm:w-auto`}>{hero.secondaryCta}</a>
          </div>
        </div>
        <div className="lg:col-span-5"><PathTree /></div>
      </Container>
    </section>
  )
}

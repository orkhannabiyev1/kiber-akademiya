import { FinalCTA } from '@/components/landing/FinalCTA'
import { HeroSection } from '@/components/landing/HeroSection'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { LandingHeader } from '@/components/landing/LandingHeader'
import { LearningMethodSection } from '@/components/landing/LearningMethodSection'
import { LearningPathPreview } from '@/components/landing/LearningPathPreview'

export function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <LearningPathPreview />
        <LearningMethodSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  )
}

import { AnimatedGradient } from "@/components/animated-gradient"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero-section"
import { BrainSection } from "@/components/sections/brain-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { AvailabilitySection } from "@/components/sections/availability-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { CTASection } from "@/components/sections/cta-section"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedGradient />
      <Header />
      <HeroSection />
      <BrainSection />
      <FeaturesSection />
      <AvailabilitySection />
      <PricingSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </main>
  )
}

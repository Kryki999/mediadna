import { SiteNav } from "@/components/site-nav"
import { HeroEcosystem } from "@/components/sections/hero-ecosystem"
/* Previous hero: import { HeroLegacy } from "@/components/sections/hero" */
import { LetterPortalTransition } from "@/components/sections/letter-portal-transition"
import { ScrollingCards } from "@/components/sections/scrolling-cards"
import { LogoMarquee } from "@/components/sections/logo-marquee"
import { Ecosystem } from "@/components/sections/ecosystem"
import { Services } from "@/components/sections/services"
import { Reels } from "@/components/sections/reels"
import { PortfolioAlt } from "@/components/sections/portfolio-alt"
import { Authority } from "@/components/sections/authority"
import { BlogSection } from "@/components/sections/blog-section"
import { Testimonials } from "@/components/sections/testimonials"
import { Faq } from "@/components/sections/faq"
import { WebsiteShredder } from "@/components/sections/website-shredder"
import { FeatureMatrix } from "@/components/sections/feature-matrix"
import { BookingSection } from "@/components/sections/booking-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  const LETTER_PORTAL_ENABLED = false

  return (
    <main className="relative min-h-screen overflow-x-clip bg-black text-foreground">
      <SiteNav />
      <HeroEcosystem />
      <LetterPortalTransition enabled={LETTER_PORTAL_ENABLED} letter="E" />
      <LogoMarquee />
      <Ecosystem />
      <ScrollingCards />
      <Services />
      <PortfolioAlt />
      <Reels />
      <Authority />
      <BlogSection />
      <Testimonials />
      <WebsiteShredder />
      <FeatureMatrix />
      <Faq />
      <BookingSection />
      <SiteFooter />
    </main>
  )
}

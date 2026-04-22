import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/sections/hero"
import { LetterPortalTransition } from "@/components/sections/letter-portal-transition"
import { ScrollingCards } from "@/components/sections/scrolling-cards"
import { LogoMarquee } from "@/components/sections/logo-marquee"
import { Ecosystem } from "@/components/sections/ecosystem"
import { Services } from "@/components/sections/services"
import { Reels } from "@/components/sections/reels"
import { Impact } from "@/components/sections/impact"
import { Authority } from "@/components/sections/authority"
import { Testimonials } from "@/components/sections/testimonials"
import { Faq } from "@/components/sections/faq"
import { WebsiteShredder } from "@/components/sections/website-shredder"
import { FeatureMatrix } from "@/components/sections/feature-matrix"
import { BookingSection } from "@/components/sections/booking-section"
import { SiteFooter } from "@/components/site-footer"
import { StickyMobileCta } from "@/components/sticky-mobile-cta"

export default function Page() {
  const LETTER_PORTAL_ENABLED = false

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteNav />
      <Hero />
      <LetterPortalTransition enabled={LETTER_PORTAL_ENABLED} letter="E" />
      <ScrollingCards />
      <LogoMarquee />
      <Ecosystem />
      <Services />
      <Impact />
      <Reels />
      <Authority />
      <Testimonials />
      <WebsiteShredder />
      <FeatureMatrix />
      <Faq />
      <BookingSection />
      <SiteFooter />
      {/* <StickyMobileCta /> */}
    </main>
  )
}

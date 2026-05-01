import { ReelsCarousel } from "@/components/sections/reels-carousel"
import { HintCard } from "@/components/ui/HintCard"

export function Reels() {
  return (
    <section className="relative border-t border-border bg-background py-10 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-6 md:mb-14">
          <h2 className="text-display-fade max-w-4xl text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            Przejmujemy kontrolę nad <span className="italic text-brand-fade">algorytmami</span>.
          </h2>
        </div>

        <div data-component-slot="external-reels">
          <ReelsCarousel />
        </div>

        <div className="mt-6 flex justify-center md:mt-14">
          <HintCard
            title="WSKAZÓWKA"
            text="W krótkich filmach masz dokładnie 3 sekundy, żeby zatrzymać uwagę widza. Jeśli początek jest nudny, klient przewinie dalej. Zaczynamy mocno, bo to daje gigantyczne, darmowe zasięgi."
          />
        </div>
      </div>
    </section>
  )
}


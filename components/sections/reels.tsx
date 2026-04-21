import { ReelsCarousel } from "@/components/sections/reels-carousel"

export function Reels() {
  return (
    <section className="relative border-t border-border bg-background py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-10 md:mb-14">
          <h2 className="text-display-fade max-w-4xl text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            Przejmujemy kontrolę nad <span className="italic text-brand-fade">algorytmami</span>.
          </h2>
        </div>

        <div data-component-slot="external-reels">
          <ReelsCarousel />
        </div>
      </div>
    </section>
  )
}


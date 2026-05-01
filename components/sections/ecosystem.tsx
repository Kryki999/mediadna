"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

import { LeadMachine } from "@/components/sections/lead-machine"

export function Ecosystem() {
  const bars = [14, 18, 16, 22, 31, 27, 39, 35, 50, 46, 61, 57, 74, 82, 94, 100]
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isChartActive, setIsChartActive] = useState(false)

  useEffect(() => {
    const target = sectionRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsChartActive(entry.isIntersecting)
      },
      { threshold: 0.35 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      className="relative border-t border-border bg-background py-10 md:pt-8 md:pb-12"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-display-fade mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">Ty prowadzisz biznes.
            <span className="italic text-brand-fade"> System zajmuje się sprzedażą.</span>
          </h2>
        </div>

        <div className="mt-6 w-full overflow-hidden rounded-2xl border border-border/70 bg-card/40 px-3 py-4 md:mt-10 md:px-4 md:py-5">
          <div className="relative h-24 w-full md:h-28">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,85,255,0.28),transparent_60%)]" />
            <div className="absolute inset-0 flex items-end gap-1.5 md:gap-2">
              {bars.map((height, index) => (
                <div
                  key={`eco-bar-${index}`}
                  className={`eco-growth-bar flex-1 rounded-t-sm md:rounded-t-md ${isChartActive ? "is-active" : ""
                    }`}
                  style={
                    {
                      "--bar-height": `${height}%`,
                      "--bar-delay": `${index * 70}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-pretty text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
          Pozyskiwanie klientów nie powinno zależeć od szczęścia. Wykres, który widzisz wyżej, to efekt działania bezawaryjnej maszyny. Poniżej pokazujemy jej budowę. To zautomatyzowany proces, który każdego miesiąca napędza sprzedaż, dając Ci finansowy spokój.
        </p>

        <div className="-mx-5 mt-8 sm:-mx-6 md:mx-0 md:mt-14">
          <LeadMachine />
        </div>
      </div>

    </section>
  )
}


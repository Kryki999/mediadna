"use client"

import { Quote, Star } from "lucide-react"

const reviews = [
  {
    quote:
      "W 90 dni zmienili naszą markę z lokalnego warsztatu w aspiracyjny brand, do którego klienci piszą sami. ROAS na Meta wskoczył z 2.1 na 6.4 — i trzyma się do dziś.",
    author: "Marcin Kowalski",
    role: "Founder, BlackGloss Detailing",
    metric: "ROAS 6.4×",
  },
  {
    quote:
      "Najbardziej profesjonalny zespół, z jakim pracowałam. Strategia, produkcja, ads — wszystko w jednym miejscu, bez tłumaczenia tego samego pięć razy.",
    author: "Anna Lipińska",
    role: "CMO, Maison Noir",
    metric: "+212% sprzedaży online",
  },
  {
    quote:
      "Media DNA odpalili nam silnik leadów w niecałe 6 tygodni. Dziś 62% zapytań pochodzi z naszych własnych kanałów — a nie z drogich portali.",
    author: "Tomasz Grabowski",
    role: "CEO, Meridian Real Estate",
    metric: "62% leadów własnych",
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-x-hidden border-y border-border bg-background py-10 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Słowem klientów
          </span>
          <h2 className="text-display-fade mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            Opinie, które robią wynik.
          </h2>
          <p className="mt-4 text-balance text-base text-muted-foreground md:text-lg">
            Realne efekty, realne marki. Każda karta to konkretny wynik, który dowożą nasze działania.
          </p>
        </div>

        {/* Mobile: pełna szerokość viewportu (bez „pudła”); md+: jak wcześniej w boxie */}
        <div
          className="group relative mt-8 ml-[calc(50%-50vw)] w-screen max-w-[100vw] overflow-hidden rounded-none border-0 bg-transparent p-0 md:mt-14 md:ml-0 md:w-full md:max-w-none md:rounded-3xl md:border md:border-border/80 md:bg-card/30 md:p-4"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:w-14 md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:w-14 md:w-32" />

          <div className="flex w-max animate-marquee gap-4 [animation-duration:34s] group-hover:[animation-play-state:paused] md:gap-6">
            {[...reviews, ...reviews].map((r, idx) => (
              <article
                key={`${r.author}-${idx}`}
                className="relative w-[min(310px,calc(100vw-3rem))] shrink-0 rounded-2xl border border-border bg-card p-6 pt-14 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:w-[380px]"
              >
                <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/25" aria-hidden />

                <div
                  className="absolute left-6 top-5 flex items-center gap-1.5 text-primary"
                  aria-label="Ocena 5 na 5"
                >
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star key={starIdx} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="pr-8 text-sm leading-relaxed text-foreground/90 md:text-base">
                  “{r.quote}”
                </p>

                <footer className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-4">
                  <div>
                    <p className="font-semibold tracking-tight text-foreground">{r.author}</p>
                    <p className="text-xs font-medium text-muted-foreground md:text-sm">{r.role}</p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

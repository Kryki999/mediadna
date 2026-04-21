"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"

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
  const [i, setI] = useState(0)
  const r = reviews[i]

  const prev = () => setI((v) => (v - 1 + reviews.length) % reviews.length)
  const next = () => setI((v) => (v + 1) % reviews.length)

  return (
    <section
      id="testimonials"
      className="relative border-t border-border bg-background py-20 md:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-6 md:px-8 lg:px-10">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Słowem klientów
        </span>
        <h2 className="text-display-fade mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
          ROI w czystej postaci.
        </h2>

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-card p-8 text-left md:mt-16 md:p-14">
          <Quote
            className="absolute right-8 top-8 h-16 w-16 text-primary/20 md:h-24 md:w-24"
            aria-hidden
          />

          <blockquote className="relative">
            <p className="text-balance text-2xl font-semibold leading-[1.25] tracking-tight md:text-4xl">
              “{r.quote}”
            </p>

            <footer className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-border pt-6 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-lg font-extrabold tracking-tight">
                  {r.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold tracking-tight text-foreground">{r.author}</p>
                  <p className="text-sm font-medium text-muted-foreground">{r.role}</p>
                </div>
              </div>
              <div className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                {r.metric}
              </div>
            </footer>
          </blockquote>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Poprzednia opinia"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2" aria-hidden>
            {reviews.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Następna opinia"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

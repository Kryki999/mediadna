"use client"

import { useMemo, useState } from "react"
import { ArrowRight, Calendar as CalendarIcon, Clock, Sparkles, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

const SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"]

function buildDays(days = 7) {
  const result: { date: Date; label: string; weekday: string; day: string }[] = []
  const weekdays = ["ndz", "pon", "wt", "śr", "czw", "pt", "sob"]
  const now = new Date()
  for (let i = 0; i < days; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i + 1)
    result.push({
      date: d,
      label: d.toLocaleDateString("pl-PL", { day: "2-digit", month: "short" }),
      weekday: weekdays[d.getDay()],
      day: String(d.getDate()).padStart(2, "0"),
    })
  }
  return result
}

export function FinalCta() {
  const days = useMemo(() => buildDays(7), [])
  const [dayIdx, setDayIdx] = useState(1)
  const [slot, setSlot] = useState<string | null>(null)

  return (
    <section id="cta" className="relative border-t border-border bg-background py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Teaser banner */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-border bg-card md:mb-16">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
          />
          <div className="relative flex flex-col items-start gap-6 p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Wkrótce
                </p>
                <p className="mt-1 text-2xl font-black leading-tight tracking-tight md:text-3xl">
                  Darmowy <span className="italic text-brand-fade">Audyt AI</span> Twojej marki
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="rounded-full bg-transparent">
              <a href="#cta">
                Zapisz się na early access
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Booking card */}
        <div className="mx-auto w-full">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Konsultacja strategiczna
            </span>
            <h2 className="text-display-fade mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
              Zaplanujmy <span className="italic text-brand-fade">30 minut</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
              Bez prezentacji sprzedażowych. Przejrzymy Twoją markę, zidentyfikujemy 3 dźwignie
              wzrostu i pokażemy, jak mogłaby wyglądać współpraca.
            </p>
          </div>

          <div className="-mx-4 mt-10 overflow-hidden rounded-3xl border border-border bg-card md:mx-0 md:mt-14">
            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 border-b border-border bg-background/40 px-4 py-4 text-sm text-muted-foreground md:px-8">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                30 min
              </span>
              <span className="inline-flex items-center gap-2">
                <Video className="h-4 w-4" />
                Google Meet
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Strefa Warszawa (GMT+1)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Date picker */}
              <div className="border-b border-border p-4 md:border-b-0 md:border-r md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Wybierz dzień
                </p>
                <div className="mt-5 grid grid-cols-4 gap-2 md:grid-cols-4">
                  {days.map((d, idx) => {
                    const active = idx === dayIdx
                    return (
                      <button
                        key={d.label}
                        type="button"
                        onClick={() => {
                          setDayIdx(idx)
                          setSlot(null)
                        }}
                        className={`flex flex-col items-center gap-0.5 rounded-xl border px-2 py-3 text-center transition-colors ${
                          active
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-background/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        }`}
                      >
                        <span className="text-[0.65rem] uppercase tracking-widest">
                          {d.weekday}
                        </span>
                        <span className="text-2xl font-extrabold tracking-tight">{d.day}</span>
                      </button>
                    )
                  })}
                </div>
                <p className="mt-5 text-sm text-muted-foreground">
                  Wybrany termin:{" "}
                  <span className="text-foreground">
                    {days[dayIdx].label}
                    {slot ? `, ${slot}` : ""}
                  </span>
                </p>
              </div>

              {/* Time slots */}
              <div className="p-4 md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Dostępne godziny
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {SLOTS.map((t) => {
                    const active = slot === t
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSlot(t)}
                        className={`rounded-xl border px-2 py-3 text-sm transition-colors ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background/50 text-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>

                <Button
                  size="lg"
                  className="mt-6 w-full rounded-full"
                  disabled={!slot}
                  aria-disabled={!slot}
                >
                  {slot ? `Potwierdź ${days[dayIdx].label}, ${slot}` : "Wybierz godzinę"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Potwierdzenie i link do spotkania dostaniesz mailem w 60 sekund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


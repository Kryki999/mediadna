"use client"

import { useState } from "react"
import { Code2, Sparkles, Clapperboard, TrendingUp } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const services = [
  {
    id: "www",
    icon: Code2,
    title: "Strony WWW",
    subtitle: "Build",
    description:
      "Projektujemy i kodujemy strony premium, które ładują się błyskawicznie i konwertują jak maszyna. Next.js, headless CMS, animacje z charakterem.",
    bullets: [
      "Projekt + development od zera",
      "Optymalizacja Core Web Vitals",
      "Integracje z CRM i analityką",
    ],
    reel: {
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "/mockup-1.jpg",
      alt: "Animacja rolki dla uslugi Strony WWW",
    },
  },
  {
    id: "design",
    icon: Sparkles,
    title: "Design & Branding",
    subtitle: "Brand",
    description:
      "Tworzymy systemy wizualne, które budują zaufanie w mniej niż 3 sekundy. Logo, identyfikacja, UI kit i wytyczne gotowe do skalowania.",
    bullets: [
      "Strategia marki i positioning",
      "System designu i UI kit",
      "Key visuale i materiały drukowane",
    ],
    reel: {
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
      poster: "/mockup-2.jpg",
      alt: "Animacja rolki dla uslugi Design i Branding",
    },
  },
  {
    id: "wideo",
    icon: Clapperboard,
    title: "Wideo & Content",
    subtitle: "Operate",
    description:
      "Produkujemy content, który sam się dystrybuuje. Reels, shorts, podcasty i kampanie wizerunkowe — wszystko w jednym abonamencie.",
    bullets: [
      "Produkcja reelsów i shortów",
      "Scenariusze i post-produkcja",
      "Strategia kontentu 30 / 60 / 90 dni",
    ],
    reel: {
      src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
      poster: "/reel-1.jpg",
      alt: "Animacja rolki dla uslugi Wideo i Content",
    },
  },
  {
    id: "ads",
    icon: TrendingUp,
    title: "Marketing & Ads",
    subtitle: "Grow",
    description:
      "Skalujemy sprzedaż przez Meta Ads, Google Ads i TikTok. Pracujemy na KPI, nie na wyświetleniach — z raportowaniem co tydzień.",
    bullets: [
      "Performance marketing 360°",
      "Lejki sprzedażowe i automatyzacja",
      "Dashboard z KPI w czasie rzeczywistym",
    ],
    reel: {
      src: "https://media.w3.org/2010/05/bunny/movie.mp4",
      poster: "/reel-2.jpg",
      alt: "Animacja rolki dla uslugi Marketing i Ads",
    },
  },
]

export function Services() {
  const [active, setActive] = useState(services[0].id)
  const current = services.find((s) => s.id === active) ?? services[0]
  const Icon = current.icon

  return (
    <section id="services" className="relative border-t border-border bg-background py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:mb-20 md:flex-row md:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Build · Operate · Grow
            </span>
            <h2 className="text-display-fade mt-3 max-w-3xl text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
              Cztery filary, <span className="italic text-brand-fade">jeden zespół</span>.
            </h2>
          </div>
          <p className="max-w-sm text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
            Zamiast żonglować pięcioma freelancerami, dostajesz zgrany zespół, który odpowiada
            za cały lejek — od pierwszego kliknięcia po finalną sprzedaż.
          </p>
        </div>

        {/* Desktop: split view */}
        <div className="hidden items-stretch gap-8 md:grid md:grid-cols-[minmax(300px,1fr)_minmax(0,2fr)] lg:grid-cols-[minmax(340px,1fr)_minmax(0,2fr)]">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 md:p-6">
            <div
              aria-hidden
              className="absolute left-0 top-0 h-52 w-52 rounded-full bg-primary/10 blur-3xl"
            />
            <ul className="relative flex h-full flex-col gap-3" role="tablist" aria-label="Usługi">
              {services.map((s) => {
                const isActive = s.id === active
                const ItemIcon = s.icon
                return (
                  <li key={s.id} className="flex-1">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onMouseEnter={() => setActive(s.id)}
                      onFocus={() => setActive(s.id)}
                      onClick={() => setActive(s.id)}
                      className={`group flex h-full min-h-[106px] w-full items-center gap-4 rounded-2xl border px-5 py-5 text-left transition-all ${
                        isActive
                          ? "border-primary/40 bg-background/90 shadow-[0_0_28px_-18px_var(--primary)]"
                          : "border-border/80 bg-background/40 hover:border-primary/25 hover:bg-background/70"
                      }`}
                    >
                      <span
                        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          isActive
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border bg-background text-muted-foreground"
                        }`}
                      >
                        <ItemIcon className="h-4.5 w-4.5" />
                      </span>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {s.subtitle}
                        </p>
                        <p className="mt-0.5 text-2xl font-extrabold tracking-tight">{s.title}</p>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform ${
                          isActive ? "translate-x-1 text-primary" : ""
                        }`}
                        aria-hidden
                      >
                        →
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div role="tabpanel" className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10">
            {/* Soft background glow */}
            <div
              aria-hidden
              className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
            />

            <div className="relative grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_330px]">
              <div className="pr-2">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {current.subtitle}
                </p>
                <h3 className="text-display-fade mt-2 text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
                  {current.title}
                </h3>
                <p className="mt-5 max-w-xl text-pretty text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
                  {current.description}
                </p>

                <ul className="mt-8 grid gap-3 md:grid-cols-2">
                  {current.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 rounded-xl border border-border bg-background/50 px-4 py-3"
                    >
                      <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mx-auto w-full max-w-[330px]">
                <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-background p-2 shadow-[0_0_36px_-16px_var(--primary)]">
                  <div className="relative aspect-[9/16.6] overflow-hidden rounded-2xl bg-black">
                    <video
                      key={current.id}
                      src={current.reel.src}
                      poster={current.reel.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label={current.reel.alt}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/15 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden">
          <Accordion
            type="single"
            collapsible
            defaultValue={services[0].id}
            className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card"
          >
            {services.map((s) => {
              const ItemIcon = s.icon
              return (
                <AccordionItem
                  key={s.id}
                  value={s.id}
                  className="border-0 px-5 [&[data-state=open]]:bg-background/40"
                >
                  <AccordionTrigger className="py-5 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-primary">
                        <ItemIcon className="h-4 w-4" />
                      </span>
                      <span className="text-xl font-extrabold tracking-tight">{s.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm">
                          <span className="mt-2 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5">
                      <div className="relative mx-auto w-full max-w-[250px] overflow-hidden rounded-2xl border border-border/80 bg-background p-1.5 shadow-[0_0_30px_-14px_var(--primary)]">
                        <div className="relative aspect-[9/16.4] overflow-hidden rounded-xl bg-black">
                          <video
                            src={s.reel.src}
                            poster={s.reel.poster}
                            autoPlay
                            loop
                            muted
                            playsInline
                            aria-label={s.reel.alt}
                            className="h-full w-full object-cover"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </div>
    </section>
  )
}


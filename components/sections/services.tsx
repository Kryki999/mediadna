"use client"

import { Icon } from "@iconify/react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Iphone15Pro } from "@/components/magicui/iphone-15-pro"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { HintCard } from "@/components/ui/HintCard"

const services = [
  {
    id: "www",
    title: "Strony WWW",
    tabIcon: "fluent-emoji:laptop",
    subtitle: "Build",
    description:
      "Projektujemy i kodujemy strony premium, które ładują się błyskawicznie i konwertują jak maszyna. Next.js, headless CMS, animacje z charakterem.",
    lead: "Nowoczesne doświadczenia webowe, które spinają design, technologię i konwersję.",
    visual: "none",
    reel: {
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "/mockup-1.jpg",
      alt: "Animacja rolki dla uslugi Strony WWW",
    },
  },
  {
    id: "design",
    title: "Design & Branding",
    tabIcon: "fluent-emoji:artist-palette",
    subtitle: "Brand",
    description:
      "Tworzymy systemy wizualne, które budują zaufanie w mniej niż 3 sekundy. Logo, identyfikacja, UI kit i wytyczne gotowe do skalowania.",
    lead: "Spójna tożsamość marki oparta o ruch, typografię i premium detale.",
    visual: "none",
    reel: {
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
      poster: "/mockup-2.jpg",
      alt: "Animacja rolki dla uslugi Design i Branding",
    },
  },
  {
    id: "wideo",
    title: "Wideo & Content",
    tabIcon: "fluent-emoji:movie-camera",
    subtitle: "Operate",
    description:
      "Produkujemy content, który sam się dystrybuuje. Reels, shorts, podcasty i kampanie wizerunkowe — wszystko w jednym abonamencie.",
    lead: "Content engine zaprojektowany do regularnej publikacji i mocnego storytellingu.",
    visual: "none",
    reel: {
      src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
      poster: "/reel-1.jpg",
      alt: "Animacja rolki dla uslugi Wideo i Content",
    },
  },
  {
    id: "ads",
    title: "Marketing & Ads",
    tabIcon: "fluent-emoji:rocket",
    subtitle: "Grow",
    description:
      "Skalujemy sprzedaż przez Meta Ads, Google Ads i TikTok. Pracujemy na KPI, nie na wyświetleniach — z raportowaniem co tydzień.",
    lead: "Wyniki kampanii widoczne od pierwszych iteracji i stale poprawiane przez dane.",
    visual: "chart",
    chartData: [
      { month: "I", growth: 14 },
      { month: "II", growth: 28 },
      { month: "III", growth: 34 },
      { month: "IV", growth: 52 },
      { month: "V", growth: 69 },
      { month: "VI", growth: 88 },
    ],
    reel: {
      src: "https://media.w3.org/2010/05/bunny/movie.mp4",
      poster: "/reel-2.jpg",
      alt: "Animacja rolki dla uslugi Marketing i Ads",
    },
  },
]

type ServiceItem = (typeof services)[number]

const chartConfig = {
  growth: {
    label: "Growth",
    color: "#1D9BFF",
  },
} satisfies ChartConfig

function ServiceVisual({
  service,
  activeKey,
}: {
  service: ServiceItem
  activeKey: string
}) {
  if (service.visual !== "chart") {
    return null
  }

  return (
    <ChartContainer config={chartConfig} className="h-full w-full" key={`${service.id}-${activeKey}`}>
      <LineChart data={service.chartData} margin={{ top: 20, right: 6, left: -16, bottom: 10 }}>
        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} width={24} />
        <Line
          type="monotone"
          dataKey="growth"
          stroke="var(--color-growth)"
          strokeWidth={3}
          dot={false}
          isAnimationActive
          animationDuration={920}
          animationEasing="ease-in-out"
        />
      </LineChart>
    </ChartContainer>
  )
}

function PhonePreview({
  current,
  leaving,
  className,
}: {
  current: ServiceItem
  leaving: ServiceItem | null
  className?: string
}) {
  return (
    <Iphone15Pro className={className}>
      {leaving ? (
        <video
          src={leaving.reel.src}
          poster={leaving.reel.poster}
          autoPlay
          loop
          muted
          playsInline
          aria-label={leaving.reel.alt}
          className="animate-out fade-out-0 absolute inset-0 h-full w-full object-cover blur-sm duration-500 [animation-timing-function:cubic-bezier(0.2,0.8,0.2,1)]"
        />
      ) : null}
      <video
        src={current.reel.src}
        poster={current.reel.poster}
        autoPlay
        loop
        muted
        playsInline
        aria-label={current.reel.alt}
        className="animate-in fade-in-0 absolute inset-0 h-full w-full object-cover blur-0 duration-500 [animation-timing-function:cubic-bezier(0.2,0.8,0.2,1)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </Iphone15Pro>
  )
}

function MobileAccordionContent({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <AccordionPrimitive.Content
      className={`overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down data-[state=closed]:duration-200 data-[state=open]:duration-260 ${className ?? ""}`}
    >
      <div className="pt-0 pb-4">{children}</div>
    </AccordionPrimitive.Content>
  )
}

export function Services() {
  const [activeServiceId, setActiveServiceId] = useState(services[0].id)
  const [leavingPreviewId, setLeavingPreviewId] = useState<string | null>(null)
  const previousActiveRef = useRef(activeServiceId)
  const mobileItemRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (previousActiveRef.current === activeServiceId) return
    setLeavingPreviewId(previousActiveRef.current)
    previousActiveRef.current = activeServiceId
    const timeout = setTimeout(() => setLeavingPreviewId(null), 420)
    return () => clearTimeout(timeout)
  }, [activeServiceId])

  const current = services.find((s) => s.id === activeServiceId) ?? services[0]
  const leavingPreview = services.find((s) => s.id === leavingPreviewId) ?? null
  const scrollMobileItemIntoView = (id: string) => {
    const target = mobileItemRefs.current[id]
    if (!target) return
    const stickyNav =
      document.querySelector("[data-dynamic-island]") ??
      document.querySelector("[data-site-nav]") ??
      document.querySelector("header")
    const stickyOffset =
      stickyNav instanceof HTMLElement ? stickyNav.getBoundingClientRect().height + 16 : 100
    const top = target.getBoundingClientRect().top + window.scrollY - stickyOffset
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
  }

  const handleAccordionChange = (value: string) => {
    if (!value) return
    setActiveServiceId(value)
    if (window.innerWidth >= 768) return
    window.setTimeout(() => scrollMobileItemIntoView(value), 120)
  }

  return (
    <section id="services" className="relative border-t border-border bg-background py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:mb-20 md:flex-row md:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Build · Operate · Grow
            </span>
            <h2 className="text-display-fade mt-3 max-w-3xl text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
              Nasze <span className="italic text-brand-fade">usługi</span>
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
                const isActive = s.id === activeServiceId
                return (
                  <li key={s.id} className="flex-1">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveServiceId(s.id)}
                      onFocus={() => setActiveServiceId(s.id)}
                      onClick={() => setActiveServiceId(s.id)}
                      className={`group flex h-full min-h-[106px] w-full items-center gap-3 rounded-2xl border px-5 py-5 text-left transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${isActive
                        ? "border-primary/40 bg-background/90 shadow-[0_0_28px_-18px_var(--primary)]"
                        : "border-border/80 bg-background/40 hover:border-primary/25 hover:bg-background/70"
                        }`}
                    >
                      <Icon
                        icon={s.tabIcon}
                        className="size-9 shrink-0 md:size-10"
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {s.subtitle}
                        </p>
                        <p className="mt-0.5 text-2xl font-extrabold tracking-tight">{s.title}</p>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform ${isActive ? "translate-x-1 text-primary" : ""
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
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {current.subtitle}
                </p>
                <h3 className="text-display-fade mt-2 text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
                  {current.title}
                </h3>
                <p className="mt-5 max-w-xl text-pretty text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
                  {current.description}
                </p>
                <p className="mt-7 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground/90">
                  {current.lead}
                </p>
                {current.visual === "chart" ? (
                  <div className="mt-6 h-60 rounded-2xl border border-border/80 bg-background/55 p-3">
                    <ServiceVisual service={current} activeKey={activeServiceId} />
                  </div>
                ) : null}
              </div>

              <div className="mx-auto w-full max-w-[330px]">
                <PhonePreview current={current} leaving={leavingPreview} className="max-w-[330px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden">
          <Accordion
            type="single"
            value={activeServiceId}
            onValueChange={handleAccordionChange}
            className="-mx-5 divide-y divide-border overflow-hidden rounded-none border-y border-x-0 border-border bg-card sm:-mx-6"
          >
            {services.map((s) => {
              return (
                <AccordionItem
                  key={s.id}
                  value={s.id}
                  className="border-0 px-5 transition-colors duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [&[data-state=open]]:bg-background/40"
                >
                  <div
                    ref={(node) => {
                      mobileItemRefs.current[s.id] = node
                    }}
                  />
                  <AccordionTrigger className="items-center py-5 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:no-underline">
                    <span className="flex min-w-0 flex-1 items-center gap-3 text-left">
                      <Icon icon={s.tabIcon} className="size-9 shrink-0" aria-hidden />
                      <span className="text-xl font-extrabold tracking-tight">{s.title}</span>
                    </span>
                  </AccordionTrigger>
                  <MobileAccordionContent className="pb-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground/90">{s.lead}</p>
                    {s.visual === "chart" ? (
                      <div className="mt-5 h-52 rounded-2xl border border-border/80 bg-background/55 p-3">
                        <ServiceVisual service={s} activeKey={activeServiceId} />
                      </div>
                    ) : null}
                    <div className="mt-5">
                      <PhonePreview current={s} leaving={null} className="max-w-[250px]" />
                    </div>
                  </MobileAccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <HintCard
            title="WSKAZÓWKA"
            text="Prawie 9 na 10 Twoich klientów przegląda strony na telefonie. Dlatego nasze systemy projektujemy tak, aby to właśnie na małym ekranie działały najszybciej i wyglądały najlepiej."
          />
        </div>
      </div>
    </section>
  )
}


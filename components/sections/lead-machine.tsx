"use client"

import {
  type CSSProperties,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react"
import { useReducedMotion } from "motion/react"
import {
  CalendarCheck,
  Cpu,
  Instagram,
  MailCheck,
  Megaphone,
  PhoneCall,
  Receipt,
  Search,
  Sparkles,
  UserPlus,
  type LucideIcon,
} from "lucide-react"

import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { AnimatedList } from "@/components/magicui/animated-list"
import { cn } from "@/lib/utils"

type GeneratorConfig = {
  id: string
  label: string
  Icon: LucideIcon
}

type LootConfig = {
  id: string
  title: string
  source: string
  time: string
  Icon: LucideIcon
}

const GENERATORS: GeneratorConfig[] = [
  { id: "social", label: "Social", Icon: Instagram },
  { id: "search", label: "Search", Icon: Search },
  { id: "ads", label: "Ads", Icon: Megaphone },
]

const LOOT_POOL: LootConfig[] = [
  {
    id: "contact",
    title: "Nowy kontakt — Anna K.",
    source: "Formularz na stronie",
    time: "teraz",
    Icon: UserPlus,
  },
  {
    id: "invoice",
    title: "Opłacona faktura — 14 850 zł",
    source: "Stripe",
    time: "2s temu",
    Icon: Receipt,
  },
  {
    id: "call",
    title: "Rezerwacja konsultacji",
    source: "Cal.com",
    time: "7s temu",
    Icon: CalendarCheck,
  },
  {
    id: "lead-meta",
    title: "Lead z kampanii Meta",
    source: "Ads Manager",
    time: "12s temu",
    Icon: Sparkles,
  },
  {
    id: "dm",
    title: "Nowa wiadomość DM",
    source: "Instagram",
    time: "21s temu",
    Icon: MailCheck,
  },
  {
    id: "closed",
    title: "Zamknięta sprzedaż",
    source: "CRM",
    time: "34s temu",
    Icon: PhoneCall,
  },
]

const GeneratorTile = forwardRef<
  HTMLDivElement,
  { label: string; Icon: LucideIcon; delay: number }
>(function GeneratorTile({ label, Icon, delay }, ref) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "lead-tile relative flex h-16 w-16 items-center justify-center rounded-2xl md:h-[88px] md:w-[88px]",
          "animate-float",
        )}
        style={{ animationDelay: `${delay}s` } as CSSProperties}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(0,85,255)]/15 ring-1 ring-[rgb(0,85,255)]/30 md:h-12 md:w-12">
          <Icon className="h-5 w-5 text-[rgb(0,85,255)] md:h-6 md:w-6" strokeWidth={1.75} />
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
        {label}
      </span>
    </div>
  )
})

function LootCard({ title, source, time, Icon }: Omit<LootConfig, "id">) {
  return (
    <figure className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0c0d12]/95 p-3 shadow-[0_12px_36px_rgba(0,0,0,0.45)] backdrop-blur-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgb(0,85,255)]/15 ring-1 ring-[rgb(0,85,255)]/30">
        <Icon className="h-[18px] w-[18px] text-[rgb(0,85,255)]" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <figcaption className="truncate text-sm font-semibold text-white">
          {title}
        </figcaption>
        <p className="mt-0.5 truncate text-xs text-white/55">{source}</p>
      </div>
      <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.12em] text-[rgb(0,85,255)]">
        {time}
      </span>
    </figure>
  )
}

function buildLootCycles(pool: LootConfig[], cycles: number) {
  const items: Array<LootConfig & { key: string }> = []
  for (let c = 0; c < cycles; c++) {
    for (const item of pool) {
      items.push({ ...item, key: `${item.id}-${c}` })
    }
  }
  return items
}

const LOOT_STREAM = buildLootCycles(LOOT_POOL, 4)

export function LeadMachine() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const adsRef = useRef<HTMLDivElement>(null)
  const listAnchorRef = useRef<HTMLDivElement>(null)

  const generatorRefs = [socialRef, searchRef, adsRef] as const

  const prefersReduced = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const mq = window.matchMedia("(min-width: 768px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const beamsActive = isMounted && isInView
  const beamDuration = prefersReduced ? 0.0001 : 4.5
  const listDelay = prefersReduced ? 10_000_000 : 1800

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Wizualizacja: trzy źródła ruchu zasilają nasz system, który generuje powiadomienia o leadach."
      className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-black min-h-[620px] md:min-h-0 md:aspect-[21/9]"
    >
      <div className="lead-grid-bg pointer-events-none absolute inset-0" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,85,255,0.12),transparent_60%)]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(0,85,255)]/25 blur-[90px] lead-hub-halo md:h-80 md:w-80" />

      <div
        className={cn(
          "relative z-10 grid h-full w-full gap-6 p-5",
          "grid-cols-1 grid-rows-[auto_auto_1fr]",
          "md:grid-cols-[200px_minmax(0,1fr)_minmax(280px,340px)] md:grid-rows-1 md:items-center md:gap-10 md:p-10",
        )}
      >
        <div className="flex flex-row items-center justify-center gap-4 md:flex-col md:gap-7">
          {GENERATORS.map((g, i) => (
            <GeneratorTile
              key={g.id}
              label={g.label}
              Icon={g.Icon}
              delay={i * 1.2}
              ref={generatorRefs[i]}
            />
          ))}
        </div>

        <div className="flex items-center justify-center">
          <div
            ref={hubRef}
            className={cn(
              "lead-hub-glass relative flex flex-col items-center justify-center gap-2 rounded-3xl",
              "h-32 w-32 md:h-48 md:w-48",
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgb(0,85,255)]/15 ring-1 ring-[rgb(0,85,255)]/40 md:h-14 md:w-14">
              <Cpu className="h-6 w-6 text-[rgb(0,85,255)] md:h-7 md:w-7" strokeWidth={1.75} />
            </div>
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/95 md:text-xs">
                Nasz System
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.28em] text-white/45 md:text-[10px]">
                Digital DNA Engine
              </p>
            </div>
          </div>
        </div>

        <div
          ref={listAnchorRef}
          className="relative mx-auto w-full max-w-[340px] md:max-w-none"
        >
          <div className="relative max-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-md md:max-h-[400px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-black/90 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-black/90 to-transparent" />
            <AnimatedList delay={listDelay} className="gap-2.5">
              {LOOT_STREAM.map((item) => (
                <LootCard
                  key={item.key}
                  title={item.title}
                  source={item.source}
                  time={item.time}
                  Icon={item.Icon}
                />
              ))}
            </AnimatedList>
          </div>
        </div>
      </div>

      {beamsActive ? (
        <>
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={generatorRefs[0]}
            toRef={hubRef}
            curvature={isDesktop ? 32 : 0}
            duration={beamDuration}
            delay={0}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={generatorRefs[1]}
            toRef={hubRef}
            curvature={0}
            duration={beamDuration}
            delay={0.8}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={generatorRefs[2]}
            toRef={hubRef}
            curvature={isDesktop ? -32 : 0}
            duration={beamDuration}
            delay={1.6}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={hubRef}
            toRef={listAnchorRef}
            curvature={0}
            duration={prefersReduced ? 0.0001 : 5.5}
            delay={0.4}
            reverse
            gradientStartColor="#6aa5ff"
            gradientStopColor="rgb(0, 85, 255)"
          />
        </>
      ) : null}
    </div>
  )
}

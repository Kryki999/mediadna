"use client"

import {
  type CSSProperties,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react"
import { useReducedMotion } from "motion/react"
import { Icon } from "@iconify/react"

import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { AnimatedList } from "@/components/magicui/animated-list"
import { cn } from "@/lib/utils"

type GeneratorConfig = {
  id: string
  label: string
  icon: string
}

type LootConfig = {
  id: string
  title: string
  source: string
  icon: string
}

const GENERATORS: GeneratorConfig[] = [
  { id: "social", label: "Social", icon: "skill-icons:instagram" },
  { id: "search", label: "Google", icon: "logos:google-icon" },
  { id: "ads", label: "Ads", icon: "logos:meta-icon" },
]

const LOOT_POOL: LootConfig[] = [
  {
    id: "contact",
    title: "Nowy kontakt — Anna K.",
    source: "Formularz na stronie",
    icon: "fluent-emoji:inbox-tray",
  },
  {
    id: "invoice",
    title: "Opłacona faktura — 14 850 zł",
    source: "Stripe",
    icon: "logos:stripe",
  },
  {
    id: "call",
    title: "Rezerwacja konsultacji",
    source: "Cal.com",
    icon: "fluent-emoji:spiral-calendar",
  },
  {
    id: "lead-meta",
    title: "Lead z kampanii Meta",
    source: "Ads Manager",
    icon: "logos:meta-icon",
  },
  {
    id: "dm",
    title: "Nowa wiadomość DM",
    source: "Instagram",
    icon: "skill-icons:instagram",
  },
  {
    id: "closed",
    title: "Zamknięta sprzedaż",
    source: "CRM",
    icon: "fluent-emoji:money-with-wings",
  },
]

const GeneratorTile = forwardRef<
  HTMLDivElement,
  { label: string; icon: string; delay: number }
>(function GeneratorTile({ label, icon, delay }, ref) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "lead-tile relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl md:h-[88px] md:w-[88px]",
          "animate-float",
        )}
        style={{ animationDelay: `${delay}s` } as CSSProperties}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 md:h-12 md:w-12">
          <Icon icon={icon} className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-[0.18em] text-white/55 md:text-[11px]">
        {label}
      </span>
    </div>
  )
})

function LootCard({
  title,
  source,
  icon,
}: Pick<LootConfig, "title" | "source" | "icon">) {
  return (
    <figure
      className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0c0d12]/95 p-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-3"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/12 md:h-11 md:w-11 [&_svg]:block">
        <Icon
          icon={icon}
          width={26}
          height={26}
          className="h-[26px] w-[26px] shrink-0 md:h-7 md:w-7"
          aria-hidden
        />
      </div>
      <div className="min-w-0 flex-1">
        <figcaption className="line-clamp-1 text-sm font-semibold text-white">
          {title}
        </figcaption>
        <p className="mt-0.5 line-clamp-1 text-xs text-white/55">{source}</p>
      </div>
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
  const sourceBeamTimings = prefersReduced
    ? [
        { duration: 0.0001, delay: 0 },
        { duration: 0.0001, delay: 0 },
        { duration: 0.0001, delay: 0 },
      ]
    : [
        { duration: 5.2, delay: 0 },
        { duration: 6.0, delay: 1.1 },
        { duration: 6.8, delay: 2.0 },
      ]
  const hubBeamDuration = prefersReduced ? 0.0001 : 6.4
  const hubBeamDelay = 0.35
  const listDelay = prefersReduced
    ? 10_000_000
    : Math.round((hubBeamDuration + hubBeamDelay) * 1000 * 0.5)

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Wizualizacja: trzy źródła ruchu zasilają nasz system, który generuje powiadomienia o leadach."
      className={cn(
        "relative isolate overflow-hidden bg-black",
        "border-y border-x-0 md:border-x md:rounded-3xl md:border border-white/10",
        "min-h-[720px] md:min-h-0 md:aspect-[21/9]",
      )}
    >
      <div className="lead-grid-bg pointer-events-none absolute inset-0" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,85,255,0.1),transparent_65%)]" />

      <div
        className={cn(
          "relative z-10 grid h-full w-full",
          "grid-cols-1 grid-rows-[auto_auto_auto] gap-[4.5rem] px-4 py-10",
          "md:grid-cols-[200px_minmax(0,1fr)_minmax(280px,340px)] md:grid-rows-1 md:items-center md:gap-10 md:p-10",
        )}
      >
        <div className="flex flex-row items-center justify-center gap-5 md:flex-col md:gap-7">
          {GENERATORS.map((g, i) => (
            <GeneratorTile
              key={g.id}
              label={g.label}
              icon={g.icon}
              delay={i * 1.2}
              ref={generatorRefs[i]}
            />
          ))}
        </div>

        <div className="relative my-2 flex items-center justify-center md:my-0 md:translate-x-[60px]">
          <div className="relative">
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -inset-10 rounded-[2.4rem] md:-inset-14",
                "border border-[rgb(0,85,255)]/35",
                "bg-[radial-gradient(circle_at_center,rgba(0,85,255,0.42),rgba(0,85,255,0.18)_50%,rgba(0,85,255,0.06)_72%,transparent_88%)]",
                "blur-[14px] lead-hub-halo",
              )}
            />
            <div
              ref={hubRef}
              className={cn(
                "lead-hub-glass relative flex flex-col items-center justify-center gap-2 rounded-3xl",
                "h-36 w-36 md:h-48 md:w-48",
              )}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgb(0,85,255)]/15 ring-1 ring-[rgb(0,85,255)]/40 md:h-14 md:w-14">
                <Icon
                  icon="fluent-emoji:gear"
                  className="h-7 w-7 md:h-8 md:w-8"
                  aria-hidden
                />
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
        </div>

        <div ref={listAnchorRef} className="relative mx-auto mt-4 w-full md:mt-0">
          <div className="relative max-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-md md:max-h-[400px] md:p-3">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-t from-black/90 to-transparent" />
            <AnimatedList delay={listDelay} className="gap-2.5">
              {LOOT_STREAM.map((item) => (
                <LootCard
                  key={item.key}
                  title={item.title}
                  source={item.source}
                  icon={item.icon}
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
            curvature={isDesktop ? 34 : 0}
            duration={sourceBeamTimings[0].duration}
            delay={sourceBeamTimings[0].delay}
            pathWidth={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={generatorRefs[1]}
            toRef={hubRef}
            curvature={0}
            duration={sourceBeamTimings[1].duration}
            delay={sourceBeamTimings[1].delay}
            pathWidth={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={generatorRefs[2]}
            toRef={hubRef}
            curvature={isDesktop ? -34 : 0}
            duration={sourceBeamTimings[2].duration}
            delay={sourceBeamTimings[2].delay}
            pathWidth={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={hubRef}
            toRef={listAnchorRef}
            curvature={0}
            duration={hubBeamDuration}
            delay={hubBeamDelay}
            reverse
            pathWidth={3}
            gradientStartColor="#6aa5ff"
            gradientStopColor="rgb(0, 85, 255)"
          />
        </>
      ) : null}
    </div>
  )
}

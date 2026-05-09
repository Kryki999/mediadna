"use client"

import { Icon } from "@iconify/react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import type { ReactNode } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { FlipWords } from "@/components/ui/flip-words"
import { Button } from "@/components/ui/button"
import {
  CERTIFIED_PARTNER_ICONS,
  type CertifiedPartnerIcon,
} from "@/lib/certified-partner-icons"
import { cn } from "@/lib/utils"

/** Zewnętrzna orbita — surowe JPG/PNG z `/public`. ~−30% rozmiaru vs poprzednio (test). */
type OrbitPhotoSpec = {
  src: string
  alt: string
  orientation: "landscape" | "portrait"
}

const OUTER_ORBIT_ASSETS: OrbitPhotoSpec[] = [
  { src: "/desktop1.png", alt: "Realizacja — grafika pozioma", orientation: "landscape" },
  { src: "/phone2.jpg", alt: "Realizacja — grafika pionowa", orientation: "portrait" },
  { src: "/phone1.jpg", alt: "Realizacja — grafika pionowa", orientation: "portrait" },
  { src: "/desktop2.png", alt: "Realizacja — grafika pozioma", orientation: "landscape" },
  { src: "/phone3.jpg", alt: "Realizacja — grafika pionowa", orientation: "portrait" },
]

/**
 * Ikony orbity — kolejność jak przy certyfikacji (Google → Meta → Next …),
 * tylko zamiast Vercel: Instagram jak przy „1000+ / Silna społeczność” (`skill-icons:instagram`).
 */
const HERO_ORBIT_PARTNER_ICONS: CertifiedPartnerIcon[] = [
  CERTIFIED_PARTNER_ICONS[0]!,
  CERTIFIED_PARTNER_ICONS[1]!,
  CERTIFIED_PARTNER_ICONS[2]!,
  { name: "Instagram", icon: "skill-icons:instagram" },
  CERTIFIED_PARTNER_ICONS[4]!,
]

/** Mobile: wyłącznie 3 × telefon + ikona partnera (bez desktopów). phone2 → phone1 → phone3. */
const MOBILE_ORBIT_PAIR_INDICES = [1, 2, 4] as const

function buildOrbitItems(pairIndices: readonly number[], compact: boolean): ReactNode[] {
  return pairIndices.flatMap((i) => {
    const asset = OUTER_ORBIT_ASSETS[i]
    const partner = HERO_ORBIT_PARTNER_ICONS[i]
    if (!asset) return []
    const suffix = compact ? "m" : "d"
    const nodes: ReactNode[] = [
      <OrbitPhotoCard key={`orbit-photo-${asset.src}-${suffix}`} {...asset} compact={compact} />,
    ]
    if (partner) {
      nodes.push(
        <OrbitPartnerIcon
          key={`orbit-partner-${partner.name}-${suffix}`}
          icon={partner.icon}
          label={partner.name}
          compact={compact}
        />,
      )
    }
    return nodes
  })
}

function OrbitPhotoCard({
  src,
  alt,
  orientation,
  compact,
}: OrbitPhotoSpec & { compact?: boolean }) {
  const isPortrait = orientation === "portrait"

  return (
    <div
      className="pointer-events-none flex h-full min-h-0 w-full min-w-0 items-center justify-center overflow-visible p-0.5"
      style={{
        transform: "scale(calc(1 / var(--orbit-sx)), calc(1 / var(--orbit-sy)))",
      }}
      aria-hidden
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-2xl bg-zinc-950/90 shadow-[0_0_56px_-12px_rgba(56,189,248,0.55)] ring-2 ring-white/35",
          isPortrait
            ? compact
              ? "aspect-[9/16] h-[min(62vmin,620px)] w-auto md:h-[min(41vmin,448px)]"
              : "aspect-[9/16] h-[min(36vmin,392px)] w-auto md:h-[min(41vmin,448px)]"
            : compact
              ? "aspect-[16/10] w-[min(52vw,248px)] md:w-[min(55vmin,546px)]"
              : "aspect-[16/10] w-[min(66vw,434px)] md:w-[min(55vmin,546px)]",
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={isPortrait ? "(max-width: 768px) 40vw, 320px" : "(max-width: 768px) 70vw, 560px"}
          className="object-cover"
          draggable={false}
        />
      </div>
    </div>
  )
}

/** Ikona Iconify bez okrągłego tła — większy rozmiar + lekki glow. */
function OrbitPartnerIcon({
  icon,
  label,
  compact,
}: {
  icon: string
  label: string
  compact?: boolean
}) {
  return (
    <div
      className="pointer-events-none flex h-full w-full items-center justify-center overflow-visible"
      style={{
        transform: "scale(calc(1 / var(--orbit-sx)), calc(1 / var(--orbit-sy)))",
      }}
      aria-hidden
    >
      <Icon
        icon={icon}
        className={cn(
          "shrink-0 md:h-[min(15vmin,5.25rem)] md:w-[min(15vmin,5.25rem)]",
          compact
            ? "h-[min(27vmin,6.25rem)] w-[min(27vmin,6.25rem)]"
            : "h-[min(19vmin,4.75rem)] w-[min(19vmin,4.75rem)]",
        )}
        style={{
          filter: "drop-shadow(0 0 18px rgba(56,189,248,0.42))",
        }}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

/** Dolna linia — Stan 2 (jeden pełny cykl przed resetem do „Media DNA”). Stabilna referencja dla FlipWords. */
const HERO_FLIP_WORDS: string[] = [
  "strony internetowe",
  "aplikacje",
  "wizerunek w sieci",
  "cyfrowe DNA",
]

const LONGEST_FLIP_PHRASE = "strony internetowe"

/** Czas na jedno hasło — swobodne czytanie (skrócone przy reduced motion). */
const FLIP_WORD_MS = 4000
const DNA_HOLD_MS = 2800
const FADE_MS = 420
const EXPAND_FADE_OUT_MS = 520

export function HeroEcosystem() {
  const prefersReducedMotion = useReducedMotion()

  const [dnaVisible, setDnaVisible] = useState(true)
  const [expandMounted, setExpandMounted] = useState(false)
  const [expandVisible, setExpandVisible] = useState(false)
  const [flipRestartKey, setFlipRestartKey] = useState(0)
  const flipCycleResolveRef = useRef<(() => void) | null>(null)

  const fadeDuration = prefersReducedMotion ? 0.14 : FADE_MS / 1000
  const flipDurationMs = prefersReducedMotion ? 2200 : FLIP_WORD_MS
  const dnaHoldMs = prefersReducedMotion ? 1000 : DNA_HOLD_MS

  const onFlipCycleComplete = useCallback(() => {
    flipCycleResolveRef.current?.()
    flipCycleResolveRef.current = null
  }, [])

  useEffect(() => {
    let cancelled = false

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(() => {
          if (!cancelled) resolve()
        }, ms)
      })

    const run = async () => {
      while (!cancelled) {
        setExpandMounted(false)
        setExpandVisible(false)
        setDnaVisible(true)
        await wait(dnaHoldMs)
        if (cancelled) break

        setDnaVisible(false)
        await wait(prefersReducedMotion ? 140 : FADE_MS)
        if (cancelled) break

        await new Promise<void>((resolve) => {
          flipCycleResolveRef.current = resolve
          setFlipRestartKey((k) => k + 1)
          setExpandMounted(true)
          requestAnimationFrame(() => {
            if (!cancelled) setExpandVisible(true)
          })
        })
        if (cancelled) break

        setExpandVisible(false)
        await wait(prefersReducedMotion ? 160 : EXPAND_FADE_OUT_MS)
        if (cancelled) break

        setExpandMounted(false)
        await wait(80)
        if (cancelled) break
      }
    }

    void run()

    return () => {
      cancelled = true
      flipCycleResolveRef.current?.()
      flipCycleResolveRef.current = null
    }
  }, [dnaHoldMs, prefersReducedMotion])

  const orbitItems = useMemo(() => buildOrbitItems([0, 1, 2, 3, 4], false), [])

  const orbitItemsMobile = useMemo(() => buildOrbitItems(MOBILE_ORBIT_PAIR_INDICES, true), [])

  return (
    <section
      id="top"
      className={cn(
        "relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#010103] px-5 pb-10 pt-24 sm:px-6 md:px-8 md:pb-14 md:pt-28",
        "[--orbit-sx:1] [--orbit-sy:1] max-md:[--orbit-sx:0.92] max-md:[--orbit-sy:1.12] md:[--orbit-sx:1.16] md:[--orbit-sy:0.76]",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_80%,rgba(0,40,120,0.14)_0%,transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,transparent_40%,rgba(0,0,0,0.85)_100%)]"
      />

      {/* md+: elipsa pozioma (sx>sy). Mobile portrait: elipsa pionowa (sx<sy); landscape → globals.css. */}
      <div className="pointer-events-none absolute left-1/2 top-[50%] z-[5] h-[min(520vw,2400px)] w-[min(520vw,2400px)] max-md:h-[min(540vw,1620px)] max-md:w-[min(540vw,1620px)] -translate-x-1/2 -translate-y-1/2 md:h-[2100px] md:w-[2100px]">
        <div className="relative flex h-full w-full items-center justify-center">
          <div
            className="absolute inset-0 origin-center"
            style={{ transform: "scale(var(--orbit-sx), var(--orbit-sy))" }}
            aria-hidden
          >
            <span className="absolute inset-0 md:hidden">
              <OrbitingCircles
                radius={252}
                duration={prefersReducedMotion ? 999 : 95}
                reverse
                iconSize={392}
                speed={1}
                path={false}
                className="overflow-visible border-none bg-transparent"
              >
                {orbitItemsMobile}
              </OrbitingCircles>
            </span>
            <span className="absolute inset-0 hidden md:block">
              <OrbitingCircles
                radius={575}
                duration={prefersReducedMotion ? 999 : 44}
                reverse
                iconSize={700}
                speed={1}
                path={false}
                className="overflow-visible border-none bg-transparent"
              >
                {orbitItems}
              </OrbitingCircles>
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-30 mx-auto flex w-full max-w-5xl flex-col items-center overflow-visible px-3 text-center">
        <h1 className="sr-only">Media DNA — studio cyfrowe</h1>

        <div
          className="relative mx-auto w-full max-w-[min(100%,48rem)] overflow-visible px-4 sm:px-6"
          aria-live="polite"
        >
          {/* Sztywny rozmiar bloku: najdłuższe hasło + kicker — brak przeskoków layoutu. */}
          <div className="relative inline-grid w-full justify-items-center overflow-visible">
            <div
              className="invisible col-start-1 row-start-1 flex w-full flex-col items-center gap-0 leading-none"
              aria-hidden
            >
              <span
                className={cn(
                  "mb-[0.06em] font-semibold tracking-normal text-white/88",
                  "text-[clamp(1.56rem,5.6vw,2.38rem)] max-md:text-[clamp(1.22rem,4.35vw,1.85rem)] leading-none",
                )}
              >
                budujemy
              </span>
              <span
                className={cn(
                  "text-center font-black tracking-[-0.065em] text-white",
                  "text-[clamp(2.15rem,7.4vw,4.35rem)] max-md:text-[clamp(1.68rem,5.75vw,3.35rem)] leading-[0.92]",
                  "drop-shadow-[0_0_28px_rgba(56,189,248,0.38)]",
                )}
              >
                {LONGEST_FLIP_PHRASE}
              </span>
            </div>

            <motion.div
              className="col-start-1 row-start-1 flex w-full items-center justify-center overflow-visible"
              initial={false}
              animate={{ opacity: dnaVisible ? 1 : 0 }}
              transition={{ duration: fadeDuration, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: dnaVisible ? "auto" : "none" }}
            >
              {/* px-* bufor pod ujemny tracking + bg-clip-text (ostatnia litera nie może być obcięta). */}
              <span
                className={cn(
                  "inline-flex max-w-[calc(100vw-2.5rem)] flex-wrap items-baseline justify-center gap-x-[0.14em] px-[0.12em] text-center font-black tracking-[-0.07em] md:max-w-none md:px-[0.18em]",
                  "text-[clamp(2.65rem,9.2vw,5.55rem)] max-md:text-[clamp(2.05rem,7.35vw,4.35rem)] leading-[0.92]",
                )}
              >
                <span className="text-white drop-shadow-[0_0_26px_rgba(56,189,248,0.35)]">
                  Media
                </span>
                <span
                  className={cn(
                    "inline-block bg-gradient-to-r from-white via-[#7aacff] to-primary bg-clip-text pr-[0.08em] text-transparent",
                    "[background-size:120%_100%] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]",
                    "drop-shadow-[0_0_32px_rgba(0,85,255,0.55)]",
                  )}
                >
                  DNA
                </span>
              </span>
            </motion.div>

            <motion.div
              className="col-start-1 row-start-1 flex w-full flex-col items-center justify-center gap-0 leading-none"
              initial={false}
              animate={{ opacity: expandVisible ? 1 : 0 }}
              transition={{ duration: fadeDuration, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: expandVisible ? "auto" : "none" }}
            >
              {expandMounted ? (
                <>
                  <span
                    className={cn(
                      "mb-[0.06em] font-semibold tracking-normal text-white/88",
                      "text-[clamp(1.56rem,5.6vw,2.38rem)] max-md:text-[clamp(1.22rem,4.35vw,1.85rem)] leading-none",
                    )}
                  >
                    budujemy
                  </span>
                  <FlipWords
                    words={HERO_FLIP_WORDS}
                    duration={flipDurationMs}
                    phraseLayout="whole"
                    singleCycle
                    restartKey={flipRestartKey}
                    onCycleComplete={onFlipCycleComplete}
                    className={cn(
                      "!text-white",
                      "font-black tracking-[-0.065em]",
                      "text-[clamp(2.15rem,7.4vw,4.35rem)] max-md:text-[clamp(1.68rem,5.75vw,3.35rem)] leading-[0.92]",
                      "drop-shadow-[0_0_28px_rgba(56,189,248,0.38)]",
                    )}
                  />
                </>
              ) : null}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-9 flex w-full justify-center max-md:mt-8 sm:mt-14"
          whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.985, y: 0 }}
          transition={
            prefersReducedMotion ? undefined : { type: "spring", stiffness: 320, damping: 24 }
          }
        >
          <Button
            asChild
            size="hero"
            variant="default"
            className="w-full rounded-full border border-sky-400/50 bg-primary px-10 text-base font-bold text-white shadow-[0_0_26px_-8px_rgba(56,189,248,0.65)] hover:bg-primary/90 max-md:!h-8 max-md:min-h-0 max-md:w-auto max-md:max-w-[min(calc(50vw-1rem),9.5rem)] max-md:px-2.5 max-md:py-1 max-md:text-[0.6875rem] max-md:leading-none max-md:font-semibold sm:w-auto md:!h-14 md:py-0 md:text-base"
          >
            <a href="#cta" data-configurator-trigger="true">
              Skonfiguruj projekt
              <ArrowUpRight className="ml-1.5 h-4 w-4 shrink-0 max-md:ml-0.5 max-md:h-2.5 max-md:w-2.5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

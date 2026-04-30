"use client"

import { Icon } from "@iconify/react"
import { ArrowUpRight, Loader2 } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HintCardProps = {
  title: string
  text: string
  className?: string
  /** Tekst przycisku CTA pod wskazówką */
  ctaLabel?: string
  /** Docelowy anchor (domyślnie sekcja kalendarza) */
  ctaHref?: string
  /** Ukryj przycisk (np. gdy CTA jest już obok) */
  hideCta?: boolean
}

export function HintCard({
  title,
  text,
  className,
  ctaLabel = "Umów konsultację",
  ctaHref = "#cta",
  hideCta = false,
}: HintCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.aside
      initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 1.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative w-full max-w-4xl overflow-hidden rounded-xl border border-primary/35 bg-[#060913]/95 p-6 shadow-[0_0_36px_-24px_rgba(0,85,255,0.7)] md:p-7",
        className,
      )}
      aria-label="Wskazówka loading screen"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-primary/30 via-primary/12 to-transparent blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/2 h-40 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,85,255,0.26)_0%,rgba(0,85,255,0.12)_42%,rgba(0,85,255,0)_74%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(120,170,255,0.2)_0%,rgba(120,170,255,0.08)_28%,rgba(6,9,19,0)_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#060913]/75 via-[#060913]/35 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 shadow-[0_0_18px_rgba(0,85,255,0.32)]">
            <Icon
              icon="fluent-emoji:light-bulb"
              className="h-6 w-6"
              width={24}
              height={24}
              aria-hidden
            />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white [text-shadow:0_0_10px_rgba(255,255,255,0.28)]">
            {title}...
          </p>
        </div>

        <Loader2
          aria-hidden
          className="size-3.5 animate-spin text-primary/85 [animation-duration:2.8s] [filter:drop-shadow(0_0_6px_rgba(0,85,255,0.55))]"
        />
      </div>

      <p className="relative mt-4 pr-1 text-pretty text-base font-semibold leading-relaxed text-zinc-100/95 md:text-[1.06rem] md:leading-relaxed">
        {text}
      </p>

      {!hideCta ? (
        <div className="relative mt-5 flex w-full justify-end">
          <Button
            asChild
            size="default"
            variant="default"
            className="h-9 shrink-0 rounded-full border border-primary/80 bg-primary px-4 text-xs font-semibold text-white shadow-[0_10px_26px_rgba(0,85,255,0.32)] hover:bg-primary/90 sm:px-5 sm:text-sm"
          >
            <a href={ctaHref} data-configurator-trigger="true">
              {ctaLabel}
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      ) : null}
    </motion.aside>
  )
}

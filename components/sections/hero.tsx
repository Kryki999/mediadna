"use client"

import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import type { CSSProperties } from "react"
import { FloatingDock } from "@/components/magicui/floating-dock"
import { VideoText } from "@/components/magicui/video-text"
import { Button } from "@/components/ui/button"

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#020305] px-5 pt-24 sm:px-6 md:px-8 md:pt-32 lg:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-32%] top-[-16rem] -z-10 h-[40rem] bg-[radial-gradient(ellipse_at_top,rgba(0,85,255,0.78)_0%,rgba(0,85,255,0.36)_34%,rgba(2,3,5,0)_76%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-14%] top-[-8rem] -z-10 h-[24rem] bg-[radial-gradient(ellipse_at_top,rgba(120,170,255,0.36)_0%,rgba(0,85,255,0.14)_46%,rgba(2,3,5,0)_78%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,0.06)_0%,rgba(2,3,5,0)_34%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-40 bg-gradient-to-b from-transparent to-[#020305]"
      />
      <div className="ambient-dust" aria-hidden>
        {Array.from({ length: 72 }).map((_, idx) => {
          const left = (idx * 31) % 100
          const top = (idx * 17 + 9) % 100
          const size = 3 + ((idx * 7) % 10)
          const delay = `-${(idx * 1.25).toFixed(2)}s`
          const duration = `${8 + (idx % 7) * 1.8}s`

          return (
            <span
              key={`speck-${idx}`}
              className={`ambient-speck ${idx > 17 ? "hidden md:block" : ""}`}
              style={
                {
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: delay,
                  animationDuration: duration,
                  ["--drift-x" as string]: `${((idx % 7) - 3) * 2}px`,
                  ["--drift-y" as string]: `${((idx % 5) - 2) * 3}px`,
                } as CSSProperties
              }
            />
          )
        })}

        {Array.from({ length: 28 }).map((_, idx) => {
          const left = (idx * 23 + 11) % 100
          const top = (idx * 19 + 22) % 100
          const size = 14 + ((idx * 5) % 20)
          const delay = `-${(idx * 1.7).toFixed(2)}s`
          const duration = `${12 + (idx % 6) * 2.4}s`

          return (
            <span
              key={`mote-${idx}`}
              className={`ambient-mote ${idx > 7 ? "hidden md:block" : ""}`}
              style={
                {
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: delay,
                  animationDuration: duration,
                  ["--drift-x" as string]: `${((idx % 6) - 2.5) * 4}px`,
                  ["--drift-y" as string]: `${((idx % 4) - 1.5) * 5}px`,
                } as CSSProperties
              }
            />
          )
        })}

        {Array.from({ length: 20 }).map((_, idx) => {
          const left = (idx * 27 + 6) % 100
          const top = (idx * 21 + 14) % 100
          const size = 7 + ((idx * 3) % 6)
          const delay = `-${(idx * 0.9).toFixed(2)}s`
          const duration = `${7 + (idx % 5) * 1.2}s`

          return (
            <span
              key={`spark-${idx}`}
              className={`ambient-spark ${idx > 5 ? "hidden md:block" : ""}`}
              style={
                {
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: delay,
                  animationDuration: duration,
                  ["--drift-x" as string]: `${((idx % 5) - 2) * 2.5}px`,
                  ["--drift-y" as string]: `${((idx % 3) - 1) * 3.5}px`,
                } as CSSProperties
              }
            />
          )
        })}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center pt-6 text-center sm:pt-8 md:pt-10">
        <div className="flex flex-col items-center">
          <h1 className="text-balance text-center text-6xl font-black leading-[0.9] tracking-[-0.055em] text-white sm:text-7xl md:text-8xl">
            BUDUJMY
          </h1>
          <h2 className="text-display-fade mt-1 text-balance text-center text-6xl font-black leading-[0.9] tracking-[-0.055em] sm:text-7xl md:text-8xl">
            CYFROWE
          </h2>
          <div className="mt-2 w-full max-w-[99vw] sm:max-w-[96vw] md:max-w-[1120px]">
            <div className="md:hidden">
              <VideoText
                text="DNA"
                src="/dna-fluid.mp4"
                className="drop-shadow-[0_0_42px_rgba(0,85,255,0.3)]"
                textX={500}
                textY={188}
                textLength={1240}
                viewY={-18}
                viewHeight={420}
                overscanX={280}
                textClassName="text-[390px] sm:text-[430px]"
              />
            </div>

            <div className="hidden md:block">
              <VideoText
                text="DNA"
                src="/dna-fluid.mp4"
                className="drop-shadow-[0_0_42px_rgba(0,85,255,0.3)]"
                textX={500}
                textLength={1320}
                textClassName="text-[460px] lg:text-[500px]"
              />
            </div>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-pretty text-base font-medium leading-relaxed tracking-[-0.01em] text-neutral-300/90 sm:mt-4 sm:text-lg md:text-xl">
          Łączymy nowoczesne strony, aplikacje, angażujący content, wideo, precyzyjne reklamy i SEO w jeden zyskowny system. Tworzymy cyfrowe środowisko, które działa, sprzedaje i bez przerwy skaluje Twoją markę.
        </p>

        <div className="mt-10 flex w-full max-w-2xl flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4">
          <motion.div
            className="w-full sm:w-auto"
            whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.985, y: 0 }}
            transition={prefersReducedMotion ? undefined : { type: "spring", stiffness: 320, damping: 24 }}
          >
            <Button
              asChild
              size="hero"
              variant="default"
              className="w-full rounded-full border border-primary/80 bg-primary px-10 text-base font-bold text-white shadow-[0_14px_36px_rgba(0,85,255,0.42)] hover:bg-primary/90 sm:w-auto"
            >
              <a href="#cta" data-contact-trigger="true">
                Skontaktuj się
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="w-full sm:w-auto"
            whileHover={prefersReducedMotion ? undefined : { y: -1, scale: 1.006 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.988, y: 0 }}
            transition={prefersReducedMotion ? undefined : { type: "spring", stiffness: 300, damping: 22 }}
          >
            <Button
              asChild
              size="hero"
              variant="heroSecondary"
              className="w-full rounded-full border border-white/20 bg-black/80 px-10 text-base font-bold text-white hover:bg-black sm:w-auto"
            >
              <a href="#impact">
                Zobacz realizacje
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>

        <FloatingDock className="mt-8" />
      </div>

      <style jsx>{`
        .ambient-dust {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .ambient-speck {
          position: absolute;
          border-radius: 9999px;
          background: radial-gradient(
            circle at 42% 42%,
            rgba(210, 231, 255, 0.96) 0%,
            rgba(118, 177, 255, 0.62) 38%,
            rgba(32, 90, 196, 0) 74%
          );
          mix-blend-mode: screen;
          filter: none;
          animation-name: speckFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .ambient-mote {
          position: absolute;
          border-radius: 9999px;
          background: radial-gradient(
            circle at 40% 40%,
            rgba(162, 203, 255, 0.5) 0%,
            rgba(90, 150, 248, 0.34) 46%,
            rgba(14, 44, 108, 0) 80%
          );
          mix-blend-mode: screen;
          filter: none;
          animation-name: moteFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .ambient-spark {
          position: absolute;
          border-radius: 9999px;
          background: radial-gradient(
            circle at 46% 46%,
            rgba(236, 245, 255, 1) 0%,
            rgba(176, 212, 255, 0.78) 34%,
            rgba(92, 148, 255, 0) 68%
          );
          mix-blend-mode: screen;
          filter: none;
          animation-name: sparkFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes speckFloat {
          0%,
          100% {
            transform: translate3d(calc(var(--drift-x, 0px) * -0.2), calc(var(--drift-y, 0px) * -0.15), 0) scale(0.88);
            opacity: 0.22;
          }
          35% {
            transform: translate3d(calc(var(--drift-x, 0px) * 0.55), calc(var(--drift-y, 0px) * -1.2 - 9px), 0) scale(1.04);
            opacity: 0.62;
          }
          68% {
            transform: translate3d(calc(var(--drift-x, 0px) * -0.75), calc(var(--drift-y, 0px) * -0.5 - 4px), 0) scale(0.96);
            opacity: 0.4;
          }
        }

        @keyframes moteFloat {
          0%,
          100% {
            transform: translate3d(calc(var(--drift-x, 0px) * -0.35), calc(var(--drift-y, 0px) * -0.2), 0) scale(0.94);
            opacity: 0.14;
          }
          40% {
            transform: translate3d(calc(var(--drift-x, 0px) * 0.8), calc(var(--drift-y, 0px) * -1.1 - 12px), 0) scale(1.06);
            opacity: 0.34;
          }
          75% {
            transform: translate3d(calc(var(--drift-x, 0px) * -0.6), calc(var(--drift-y, 0px) * -0.45 - 6px), 0) scale(0.98);
            opacity: 0.2;
          }
        }

        @keyframes sparkFloat {
          0%,
          100% {
            transform: translate3d(calc(var(--drift-x, 0px) * -0.2), calc(var(--drift-y, 0px) * -0.2), 0) scale(0.94);
            opacity: 0.22;
          }
          28% {
            transform: translate3d(calc(var(--drift-x, 0px) * 0.5), calc(var(--drift-y, 0px) * -1.05 - 8px), 0) scale(1.06);
            opacity: 0.74;
          }
          62% {
            transform: translate3d(calc(var(--drift-x, 0px) * -0.65), calc(var(--drift-y, 0px) * -0.45 - 3px), 0) scale(0.98);
            opacity: 0.5;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ambient-speck,
          .ambient-mote,
          .ambient-spark {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}


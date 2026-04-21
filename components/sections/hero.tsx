 "use client"

import { ArrowRight } from "lucide-react"
import type { CSSProperties, MouseEvent } from "react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    event.currentTarget.style.setProperty("--mx", `${x}`)
    event.currentTarget.style.setProperty("--my", `${y}`)
  }

  const handlePointerLeave = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--mx", "0.72")
    event.currentTarget.style.setProperty("--my", "0.42")
  }

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden pt-20 md:pt-24"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={
        {
          "--mx": "0.72",
          "--my": "0.42",
        } as CSSProperties
      }
    >
      {/* Background video banner */}
      <div className="absolute inset-0 -z-30">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-dna.jpg"
        >
          <source src="/animatedna.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dynamic blur glow field */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="hero-glow hero-glow-blue-2" />
        <div className="hero-glow hero-glow-magenta" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[8] overflow-hidden">
        <div className="hero-glow-top-ray" />
      </div>

      {/* Contrast overlay for legibility over video */}
      <div className="absolute inset-0 -z-10 bg-background/18" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_18%,var(--background)_90%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background" />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-4xl text-left md:max-w-3xl lg:max-w-4xl">
          <h1 className="text-display-fade text-balance text-4xl font-black leading-[1.06] tracking-tight md:pr-20 md:text-5xl lg:pr-28 lg:text-6xl">
          Tworzymy cyfrowe rozwiązania,
          <br />
          <span className="italic text-brand-fade">które rozwijają Twój biznes</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-muted-foreground md:mt-8 md:text-xl">
            Łączymy design, development, e-commerce, marketing i techniczne wsparcie w jednej
            usłudze. Tworzymy rozwiązania, które działają, sprzedają i rosną razem z Twoją marką.
          </p>

          <div className="mt-8 md:mt-10">
            <Button asChild size="lg" className="dna-glow w-full rounded-full px-7 sm:w-auto">
              <a href="#cta" data-contact-trigger="true">
                Umów darmową strategię
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(95px);
          opacity: 0.45;
          transform: translate3d(
            calc((var(--mx, 0.72) - 0.5) * 38px),
            calc((var(--my, 0.42) - 0.5) * 38px),
            0
          );
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }

        .hero-glow-blue-2 {
          right: 18%;
          bottom: -14%;
          width: min(44vw, 620px);
          height: min(44vw, 620px);
          background: radial-gradient(circle at 50% 50%, rgba(0, 85, 255, 0.5) 0%, rgba(0, 85, 255, 0.18) 46%, rgba(0, 0, 0, 0) 72%);
          animation: heroGlowDriftB 16s ease-in-out infinite alternate, heroGlowPulse 8.4s ease-in-out infinite;
        }

        .hero-glow-magenta {
          right: 28%;
          top: 26%;
          width: min(30vw, 420px);
          height: min(30vw, 420px);
          opacity: 0.2;
          background: radial-gradient(circle at 35% 40%, rgba(132, 43, 255, 0.5) 0%, rgba(132, 43, 255, 0.14) 50%, rgba(0, 0, 0, 0) 74%);
          animation: heroGlowDriftC 18s ease-in-out infinite alternate, heroGlowPulse 9s ease-in-out infinite;
        }

        .hero-glow-top-ray {
          position: absolute;
          left: -24%;
          top: -34%;
          width: min(108vw, 1580px);
          height: min(48vh, 520px);
          opacity: 0.86;
          filter: blur(56px);
          border-radius: 9999px;
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
          transform: rotate(24deg)
            translate3d(
              calc((var(--mx, 0.72) - 0.5) * 40px),
              calc((var(--my, 0.42) - 0.5) * 34px),
              0
            );
          background: linear-gradient(
            62deg,
            rgba(0, 0, 0, 0) 2%,
            rgba(0, 85, 255, 0.46) 24%,
            rgba(0, 85, 255, 0.98) 50%,
            rgba(0, 85, 255, 0.56) 72%,
            rgba(0, 0, 0, 0) 98%
          );
          box-shadow: 0 0 120px rgba(0, 85, 255, 0.5);
          animation: heroTopRayDrift 14s ease-in-out infinite alternate, heroTopRayPulse 7.8s ease-in-out infinite;
        }

        @keyframes heroGlowPulse {
          0%,
          100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.52;
          }
        }

        @keyframes heroGlowDriftB {
          from {
            translate: 10px 8px;
          }
          to {
            translate: -10px -12px;
          }
        }

        @keyframes heroGlowDriftC {
          from {
            translate: -6px 9px;
          }
          to {
            translate: 9px -8px;
          }
        }

        @keyframes heroTopRayDrift {
          from {
            rotate: 20deg;
            translate: -8px -8px;
          }
          to {
            rotate: 25deg;
            translate: 10px 10px;
          }
        }

        @keyframes heroTopRayPulse {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.95;
          }
        }

        @media (max-width: 768px) {
          .hero-glow {
            filter: blur(76px);
            transform: translate3d(0, 0, 0);
            transition: none;
          }

          .hero-glow-blue-2 {
            right: -24%;
            bottom: -14%;
            width: 86vw;
            height: 86vw;
          }

          .hero-glow-magenta {
            right: 12%;
            top: 30%;
            width: 58vw;
            height: 58vw;
          }

          .hero-glow-top-ray {
            left: -30%;
            top: -28%;
            width: 140vw;
            height: 220px;
            opacity: 0.84;
          }
        }
      `}</style>
    </section>
  )
}


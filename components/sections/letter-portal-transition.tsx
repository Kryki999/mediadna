"use client"

import { useEffect, useRef, useState } from "react"

type LetterPortalTransitionProps = {
  enabled?: boolean
  letter?: string
}

export function LetterPortalTransition({
  enabled = true,
  letter = "E",
}: LetterPortalTransitionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!enabled) return

    const update = () => {
      const el = sectionRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh
      if (total <= 0) {
        setProgress(0)
        return
      }

      const current = Math.min(Math.max(-rect.top, 0), total)
      setProgress(current / total)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [enabled])

  if (!enabled) return null

  const easeInOut = 0.5 - Math.cos(progress * Math.PI) / 2
  const windowPhase = Math.min(Math.max((progress - 0.24) / 0.76, 0), 1)
  const windowEase = 0.5 - Math.cos(windowPhase * Math.PI) / 2
  const letterScale = 1 + windowEase * 34
  const outlineOpacity = 1 - Math.min(Math.max((progress - 0.34) / 0.4, 0), 1)
  const windowOpacity = Math.min(Math.max((progress - 0.18) / 0.25, 0), 1)
  const heroOpacity = Math.min(Math.max((progress - 0.5) / 0.5, 0), 1)
  const textOpacity = 1 - Math.max(0, (progress - 0.16) / 0.32)
  const darkOverlayOpacity = 0.72 - windowEase * 0.72

  return (
    <section ref={sectionRef} className="relative h-[220vh] border-t border-border bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-background" />

        <div
          className="absolute inset-0"
          style={{
            opacity: Math.max(heroOpacity, windowOpacity * 0.85),
            transform: `scale(${1 + windowEase * 0.12})`,
          }}
        >
          <div className="h-full w-full bg-[url('/hero-dna.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-background/35" />
        </div>

        <div
          className="absolute inset-0 bg-background"
          style={{
            opacity: darkOverlayOpacity,
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            aria-hidden
            className="font-serif leading-none text-transparent"
            style={{
              opacity: windowOpacity,
              transform: `scale(${letterScale})`,
              fontSize: "clamp(12rem, 32vw, 34rem)",
              backgroundImage: "url('/hero-dna.jpg')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              willChange: "transform, opacity",
            }}
          >
            {letter}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div
            style={{ opacity: textOpacity }}
            className="text-center text-xs uppercase tracking-[0.24em] text-muted-foreground"
          >
            Media DNA transition
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="font-serif leading-none text-foreground"
            style={{
              transform: `scale(${1 + easeInOut * 8})`,
              opacity: outlineOpacity,
              fontSize: "clamp(12rem, 32vw, 34rem)",
              textShadow: "0 0 40px color-mix(in oklab, var(--primary) 30%, transparent)",
              willChange: "transform, opacity",
            }}
          >
            {letter}
          </div>
        </div>
      </div>
    </section>
  )
}

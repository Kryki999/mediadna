"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const links = [
  { href: "#ecosystem", label: "Ekosystem" },
  { href: "#services", label: "Usługi" },
  { href: "#impact", label: "Case studies" },
  { href: "#testimonials", label: "Opinie" },
]

export function SiteNav() {
  const [compact, setCompact] = useState(false)
  const [hiddenOnDown, setHiddenOnDown] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const rafRef = useRef<number | null>(null)
  const compactRef = useRef(false)
  const hiddenRef = useRef(false)
  const openRef = useRef(false)

  useEffect(() => {
    openRef.current = open
  }, [open])

  useEffect(() => {
    const updateFromScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current

      const nextCompact = y > 90
      if (nextCompact !== compactRef.current) {
        compactRef.current = nextCompact
        setCompact(nextCompact)
      }

      let nextHidden = hiddenRef.current
      if (y < 90 || delta < -5) {
        nextHidden = false
      } else if (delta > 6 && y > 140 && !openRef.current) {
        nextHidden = true
      }

      if (nextHidden !== hiddenRef.current) {
        hiddenRef.current = nextHidden
        setHiddenOnDown(nextHidden)
      }

      lastY.current = y
      rafRef.current = null
    }

    const onScroll = () => {
      if (rafRef.current !== null) return
      rafRef.current = window.requestAnimationFrame(updateFromScroll)
    }

    updateFromScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
        hiddenOnDown && !open ? "-translate-y-[115%]" : "translate-y-0"
      }`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-3 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div
          className={`relative mx-auto flex w-full items-center justify-between gap-6 rounded-[24px] border transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
            compact || open
              ? "h-14 max-w-[980px] border-border/70 bg-background/80 px-4 shadow-[0_12px_40px_-26px_rgba(0,85,255,0.55)] backdrop-blur-2xl md:h-16 md:px-6"
              : "h-16 max-w-[1160px] border-transparent bg-background/15 px-4 md:h-20 md:px-8"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 text-lg font-extrabold tracking-tight md:text-xl">
            <span
              aria-hidden
              className="relative inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary"
            >
              <span className="absolute inset-0 animate-glow rounded-full bg-primary blur-[6px]" />
            </span>
            <span>
              Media <span className="italic text-muted-foreground">DNA</span> Studio
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Główna nawigacja">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild size="sm" className="rounded-full">
              <a href="#cta" data-contact-trigger="true">
                Umów strategię
              </a>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-foreground transition-all motion-reduce:transition-none md:hidden ${
              open
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border/70 bg-background/60 backdrop-blur-xl"
            }`}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-background/35 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          className={`relative mx-auto mt-20 w-[calc(100%-2rem)] max-w-md rounded-3xl border border-border/70 bg-card/80 p-4 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
            open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-[0.98] opacity-0"
          }`}
          aria-label="Mobilna nawigacja"
          aria-modal="true"
        >
          {links.map((l, index) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`mb-2 block rounded-2xl border border-border/60 bg-background/70 px-5 py-4 text-lg font-medium tracking-tight text-foreground transition-all duration-500 motion-reduce:transition-none ${
                open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${index * 80}ms` : "0ms" }}
            >
              {l.label}
            </a>
          ))}
          <div
            className={`pt-4 transition-all duration-500 motion-reduce:transition-none ${
              open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${links.length * 80}ms` : "0ms" }}
          >
            <Button asChild size="lg" className="w-full rounded-full">
              <a href="#cta" data-contact-trigger="true" onClick={() => setOpen(false)}>
                Umów strategię
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return (
    <>
      <div className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          className={`absolute inset-0 bg-black/45 backdrop-blur-[3px] transition-opacity duration-500 motion-reduce:transition-none ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
      </div>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
          hiddenOnDown && !open ? "-translate-y-[115%]" : "translate-y-0"
        }`}
      >
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-2.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div
          className={`relative mx-auto w-full overflow-hidden border transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
            open
              ? "max-w-[min(90vw,1120px)] rounded-[36px] border-white/10 bg-black/95 shadow-[0_34px_90px_-35px_rgba(0,0,0,0.88)]"
              : compact
                ? "max-w-[980px] rounded-[24px] border-white/20 bg-black/48 shadow-[0_12px_40px_-26px_rgba(0,85,255,0.55)] backdrop-blur-3xl"
                : "max-w-[1160px] rounded-[28px] border-white/12 bg-black/34 backdrop-blur-3xl"
          }`}
          role={open ? "dialog" : undefined}
          aria-modal={open}
          aria-label="Główna nawigacja"
        >
          <div
            className={`flex items-center justify-between gap-4 px-4 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none md:px-6 ${
              open ? "h-14 md:h-16 md:px-8" : "h-14 md:h-16"
            }`}
          >
            <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-2 text-lg font-extrabold tracking-tight md:text-xl">
              <span
                aria-hidden
                className={`relative inline-flex h-2.5 w-2.5 items-center justify-center rounded-full transition-colors duration-500 ${
                  open ? "bg-white" : "bg-primary"
                }`}
              >
                <span
                  className={`absolute inset-0 rounded-full blur-[6px] transition-colors duration-500 ${
                    open ? "bg-white/75" : "animate-glow bg-primary"
                  }`}
                />
              </span>
              <span>
                Media <span className={open ? "italic text-white/75" : "italic text-muted-foreground"}>DNA</span>{" "}
                Studio
              </span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 motion-reduce:transition-none ${
                open ? "border-white/20 bg-white/[0.06] text-white" : "border-border/70 bg-background/60 text-foreground"
              }`}
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={open}
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-5 origin-center rounded-full bg-current transition-all duration-500 ${
                    open ? "translate-y-[7px] rotate-45" : "translate-y-0 rotate-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition-all duration-400 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-[2px] w-5 origin-center rounded-full bg-current transition-all duration-500 ${
                    open ? "-translate-y-[7px] -rotate-45" : "translate-y-0 rotate-0"
                  }`}
                />
              </span>
            </button>
          </div>

          <div
            className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
            aria-hidden={!open}
          >
            <div className="overflow-hidden">
              <nav className="px-4 pb-4 pt-1 md:px-8 md:pb-8 md:pt-2" aria-label="Rozwinięta nawigacja">
                <div className="grid gap-3 md:grid-cols-2">
                  {links.map((l, index) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-lg font-medium tracking-tight text-white/92 transition-all duration-500 hover:bg-white/[0.08] ${
                        open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                      style={{ transitionDelay: open ? `${120 + index * 80}ms` : "0ms" }}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>

                <div
                  className={`pt-4 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: open ? `${160 + links.length * 80}ms` : "0ms" }}
                >
                  <Button asChild size="lg" className="w-full rounded-full bg-white text-black hover:bg-white/90">
                    <a href="#cta" data-contact-trigger="true" onClick={() => setOpen(false)}>
                      Umów strategię
                    </a>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      </header>
    </>
  )
}

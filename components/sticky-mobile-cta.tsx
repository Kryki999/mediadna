"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

export function StickyMobileCta() {
  const [show, setShow] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const updateFromScroll = () => {
      setShow(window.scrollY > 460)
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

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      } transition-transform duration-300 ease-out motion-reduce:transition-none`}
      aria-hidden={!show}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-background to-transparent" />
      <div className="pointer-events-auto border-t border-border bg-background/90 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur-xl">
        <a
          href="#cta"
          data-configurator-trigger="true"
          className="dna-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-10px_var(--primary)]"
        >
          Umów strategię
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type Iphone15ProProps = {
  children: ReactNode
  className?: string
  screenClassName?: string
}

export function Iphone15Pro({ children, className, screenClassName }: Iphone15ProProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/19.5] w-full max-w-[320px] rounded-[2.7rem] border border-white/15 bg-zinc-950 p-2.5 shadow-[0_40px_90px_-45px_rgba(8,119,255,0.7)]",
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center pt-2.5">
        <div className="h-6 w-28 rounded-full bg-black/90 ring-1 ring-white/10" />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_82%_88%,rgba(38,128,235,0.2),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[2.55rem] border border-white/10" />
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-[2.2rem] border border-white/10 bg-black",
          screenClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}

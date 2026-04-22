"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type OrbitItem = {
  icon: LucideIcon
  label: string
}

type OrbitingCirclesProps = {
  centerIcon: LucideIcon
  centerLabel: string
  items: OrbitItem[]
  className?: string
}

export function OrbitingCircles({
  centerIcon: CenterIcon,
  centerLabel,
  items,
  className,
}: OrbitingCirclesProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-2xl", className)}>
      <div className="absolute inset-6 rounded-full border border-white/10" />
      <div className="absolute inset-12 rounded-full border border-primary/20" />
      <div className="absolute inset-16 rounded-full border border-white/10" />

      <div className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 shadow-[0_0_30px_-12px_var(--primary)]">
        <CenterIcon className="h-7 w-7 text-primary" />
        <span className="sr-only">{centerLabel}</span>
      </div>

      {items.map((item, index) => {
        const Icon = item.icon
        const angle = (360 / Math.max(items.length, 1)) * index
        const radius = index % 2 === 0 ? 104 : 128
        const duration = index % 2 === 0 ? 16 : 23
        const reverse = index % 2 === 1
        return (
          <div
            key={item.label}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={
              {
                "--orbit-angle": `${angle}deg`,
                "--orbit-radius": `${radius}px`,
                animationDuration: `${duration}s`,
                animationDirection: reverse ? "reverse" : "normal",
              } as React.CSSProperties
            }
          >
            <div className="animate-orbit-drift">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-zinc-950/85 text-primary backdrop-blur">
                <Icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

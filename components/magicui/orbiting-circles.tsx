"use client"

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
      <div className="absolute inset-12 rounded-full border border-primary/25" />
      <div className="absolute inset-16 rounded-full border border-white/10" />

      <div className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 shadow-[0_0_30px_-12px_var(--primary)]">
        <CenterIcon className="h-7 w-7 text-primary" />
        <span className="sr-only">{centerLabel}</span>
      </div>

      <div className="absolute inset-0 animate-[spin_22s_linear_infinite]">
        {items.map((item, index) => {
          const Icon = item.icon
          const angle = (360 / Math.max(items.length, 1)) * index
          return (
            <div
              key={item.label}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-118px)`,
              }}
            >
              <div className="flex h-12 w-12 rotate-[-12deg] items-center justify-center rounded-xl border border-white/15 bg-zinc-950/85 text-primary backdrop-blur">
                <Icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

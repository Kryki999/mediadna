"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

type VideoTextProps = {
  text: string
  src: string
  className?: string
  textClassName?: string
}

export function VideoText({ text, src, className, textClassName }: VideoTextProps) {
  const maskId = useId().replace(/:/g, "")

  return (
    <div className={cn("relative w-full", className)}>
      <svg viewBox="0 0 1000 320" className="h-auto w-full" role="img" aria-label={text}>
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              className={cn(
                "fill-white font-black tracking-[-0.08em]",
                textClassName,
              )}
            >
              {text}
            </text>
          </mask>
        </defs>

        <foreignObject x="0" y="0" width="100%" height="100%" mask={`url(#${maskId})`}>
          <video
            className="h-full w-full object-cover"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </foreignObject>
      </svg>
    </div>
  )
}

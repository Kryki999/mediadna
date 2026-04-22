"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

type VideoTextProps = {
  text: string
  src: string
  className?: string
  textClassName?: string
  textX?: number
  textY?: number
  textLength?: number
}

export function VideoText({
  text,
  src,
  className,
  textClassName,
  textX = 500,
  textY = 160,
  textLength = 760,
}: VideoTextProps) {
  const maskId = useId().replace(/:/g, "")
  const viewX = -120
  const viewY = -10
  const viewWidth = 1240
  const viewHeight = 340
  const overscanX = 240

  return (
    <div className={cn("relative w-full overflow-visible", className)}>
      <svg
        viewBox={`${viewX} ${viewY} ${viewWidth} ${viewHeight}`}
        className="block h-auto w-full overflow-visible"
        role="img"
        aria-label={text}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask
            id={maskId}
            x={viewX - overscanX}
            y={viewY}
            width={viewWidth + overscanX * 2}
            height={viewHeight}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
          >
            <rect
              x={viewX - overscanX}
              y={viewY}
              width={viewWidth + overscanX * 2}
              height={viewHeight}
              fill="black"
            />
            <text
              x={textX}
              y={textY}
              textAnchor="middle"
              dominantBaseline="central"
              lengthAdjust="spacingAndGlyphs"
              textLength={textLength}
              className={cn(
                "fill-white font-black tracking-[-0.04em]",
                textClassName,
              )}
            >
              {text}
            </text>
          </mask>
        </defs>

        <foreignObject
          x={viewX - overscanX}
          y={viewY}
          width={viewWidth + overscanX * 2}
          height={viewHeight}
          mask={`url(#${maskId})`}
        >
          <video
            className="block h-full w-full object-cover [transform:translateZ(0)]"
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

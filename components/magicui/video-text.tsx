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
  viewX?: number
  viewY?: number
  viewWidth?: number
  viewHeight?: number
  overscanX?: number
}

export function VideoText({
  text,
  src,
  className,
  textClassName,
  textX = 500,
  textY = 160,
  textLength = 760,
  viewX = -120,
  viewY = -10,
  viewWidth = 1240,
  viewHeight = 340,
  overscanX = 240,
}: VideoTextProps) {
  const maskId = useId().replace(/:/g, "")

  return (
    <div
      className={cn(
        "relative w-full [overflow-x:visible] [overflow-y:clip] [transform:translateZ(0)]",
        className,
      )}
    >
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
          <clipPath id={`${maskId}clip`} clipPathUnits="userSpaceOnUse">
            <rect x={viewX - overscanX} y={viewY} width={viewWidth + overscanX * 2} height={viewHeight} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${maskId}clip)`}>
          <foreignObject
            x={viewX - overscanX}
            y={viewY}
            width={viewWidth + overscanX * 2}
            height={viewHeight}
            mask={`url(#${maskId})`}
          >
            <video
              className="block h-full w-full object-cover"
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                contain: "paint",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />
          </foreignObject>
        </g>
      </svg>
    </div>
  )
}

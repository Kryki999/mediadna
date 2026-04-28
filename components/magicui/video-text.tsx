"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type VideoTextProps = {
  text: string
  src: string
  /**
   * Tailwind classes that control text size, weight, family, letter-spacing.
   * The component renders a hidden <span> with these classes, measures it,
   * and draws the video clipped to the same exact text shape.
   * Examples: "text-[300px] font-black tracking-[-0.04em] leading-none"
   */
  className?: string
}

export function VideoText({ text, src, className }: VideoTextProps) {
  const measureRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const measure = measureRef.current
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!measure || !canvas || !video) return

    let rafId = 0
    let isVisible = false
    let fontsReady = false
    let loopActive = false

    const buildFont = (cs: CSSStyleDeclaration) =>
      `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`

    // Apply font + letter-spacing on a 2D context. Returns the CSS-pixel ascent
    // and descent of the *actual rendered glyphs* — not the line box. This is
    // what we use to size the canvas so there is no whitespace above or below.
    function applyFontAndMeasure(ctx: CanvasRenderingContext2D) {
      const cs = getComputedStyle(measure!)
      ctx.font = buildFont(cs)
      const ls = cs.letterSpacing
      if (ls && ls !== "normal") {
        try {
          // @ts-expect-error - letterSpacing exists at runtime on modern browsers
          ctx.letterSpacing = ls
        } catch {
          /* older browser fallback: no letter-spacing */
        }
      }
      const m = ctx.measureText(text)
      return {
        width: m.width,
        ascent: m.actualBoundingBoxAscent,
        descent: m.actualBoundingBoxDescent,
      }
    }

    function sync() {
      const ctx = canvas!.getContext("2d")
      if (!ctx) return
      const { width, ascent, descent } = applyFontAndMeasure(ctx)
      const visibleH = ascent + descent
      if (width === 0 || visibleH === 0) return
      const dpr = window.devicePixelRatio || 1
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${visibleH}px`
      canvas!.width = Math.max(1, Math.round(width * dpr))
      canvas!.height = Math.max(1, Math.round(visibleH * dpr))
    }

    function draw() {
      if (video!.readyState < 2) return
      const ctx = canvas!.getContext("2d")
      if (!ctx) return
      const W = canvas!.width
      const H = canvas!.height
      if (W === 0 || H === 0) return

      const dpr = window.devicePixelRatio || 1
      const cssW = W / dpr
      const cssH = H / dpr

      ctx.save()
      ctx.clearRect(0, 0, W, H)
      // After this scale, all drawing units are CSS pixels (DPR-aware).
      ctx.scale(dpr, dpr)

      // 1. Fill canvas with the current video frame
      ctx.drawImage(video!, 0, 0, cssW, cssH)

      // 2. destination-in keeps video pixels only where text glyphs land
      ctx.globalCompositeOperation = "destination-in"
      const { ascent } = applyFontAndMeasure(ctx)
      ctx.fillStyle = "#000"
      ctx.textAlign = "left"
      ctx.textBaseline = "alphabetic"
      // Glyph top-left sits at canvas (0, 0) when baseline is at y = ascent
      ctx.fillText(text, 0, ascent)

      ctx.restore()
    }

    function startLoop() {
      if (loopActive) return
      loopActive = true
      const tick = () => {
        if (!loopActive) return
        draw()
        rafId = requestAnimationFrame(tick)
      }
      rafId = requestAnimationFrame(tick)
    }

    function stopLoop() {
      loopActive = false
      cancelAnimationFrame(rafId)
    }

    function syncPlayback() {
      if (fontsReady && isVisible) {
        video!.play().catch(() => {})
        startLoop()
      } else {
        video!.pause()
        stopLoop()
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        syncPlayback()
      },
      { threshold: 0.05 },
    )

    const ro = new ResizeObserver(() => {
      sync()
    })

    io.observe(canvas)
    ro.observe(measure)
    sync()

    document.fonts.ready.then(() => {
      fontsReady = true
      sync()
      syncPlayback()
    })

    return () => {
      stopLoop()
      io.disconnect()
      ro.disconnect()
      video!.pause()
    }
  }, [text, src, className])

  return (
    <span className={cn("relative inline-block leading-none align-middle", className)}>
      {/*
        Hidden span — out of flow. Used only to read computed font properties
        via getComputedStyle (font-size, weight, family, letter-spacing).
        Its presence does NOT push layout: canvas alone dictates wrapper size,
        so there is no whitespace from font ascender/descender padding.
      */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute -z-10 select-none whitespace-nowrap"
      >
        {text}
      </span>
      {/* Canvas IS the visible element — sized to actual glyph bounds */}
      <canvas
        ref={canvasRef}
        className="block"
        aria-label={text}
        role="img"
      />
      {/* Hidden video source — canvas reads frames from this each rAF */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden"
      />
    </span>
  )
}

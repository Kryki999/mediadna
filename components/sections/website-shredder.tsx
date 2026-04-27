"use client"

import { useEffect } from "react"

export function WebsiteShredder() {
  useEffect(() => {
    const scannerScript = document.createElement("script")
    scannerScript.src = "/website-shredder-scanner.js"
    scannerScript.async = true
    document.body.appendChild(scannerScript)

    return () => {
      if (scannerScript.parentNode) scannerScript.parentNode.removeChild(scannerScript)
      ;(window as Window & { cardStream?: unknown }).cardStream = null
      ;(window as Window & { particleSystem?: { destroy?: () => void } }).particleSystem?.destroy?.()
      ;(window as Window & { particleScanner?: { destroy?: () => void } }).particleScanner?.destroy?.()
    }
  }, [])

  return (
    <section className="relative bg-black pb-2 pt-12 md:pb-4 md:pt-16">
      <div className="mx-auto w-full max-w-[1400px] px-5 text-center sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h2 className="mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-4xl font-black leading-[1.05] text-transparent sm:text-5xl md:mb-5 md:text-6xl lg:text-7xl">
          Nie przepalaj budżetu
          <br />
          <span className="bg-gradient-to-r from-primary via-[#4d85ff] to-primary bg-clip-text text-transparent">
            na stronę bez zwrotu
          </span>
        </h2>
        <p className="mx-auto max-w-3xl text-pretty text-base font-medium leading-relaxed text-gray-400 md:text-xl">
          Słaba strona to koszt, który nie wraca — tylko udaje inwestycję. Poniżej widać różnicę: gdzie giną pieniądze,
          a gdzie dostajesz system, który realnie dowozi leady i sprzedaż.
        </p>
      </div>

      <div className="relative mt-8 w-full overflow-hidden bg-black md:mt-10">
        <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden">
          <canvas
            id="particleCanvas"
            className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[250px] w-full -translate-y-1/2"
          />
          <canvas
            id="scannerCanvas"
            className="pointer-events-none absolute inset-x-0 top-1/2 z-[15] h-[300px] w-full -translate-y-1/2"
          />
          <div className="scanner animate-scanPulse absolute left-1/2 top-1/2 z-10 hidden h-[300px] w-1 -translate-x-1/2 -translate-y-1/2 rounded-[30px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(0,255,255,0.8),0_0_40px_rgba(0,255,255,0.4)]" />
          <div id="cardStream" className="card-stream absolute inset-x-0 flex h-[180px] w-full items-center overflow-visible">
            <div
              id="cardLine"
              className="card-line flex cursor-grab select-none items-center gap-[60px] whitespace-nowrap will-change-transform"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const logos = [
  "NORTHLINE",
  "OBSIDIAN",
  "MERIDIAN°",
  "ATLAS / CO",
  "VANTAGE",
  "KRONOS",
  "HELIOS",
  "NOVA·LAB",
]

export function LogoMarquee() {
  return (
    <section
      aria-label="Marki, które nam zaufały"
      className="relative border-y border-border bg-background py-5 md:py-14"
    >
      <div className="group relative overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent md:w-40" />

        <div className="flex w-max animate-marquee gap-14 md:gap-20">
          {[...logos, ...logos].map((l, i) => (
            <span
              key={`${l}-${i}`}
              className="shrink-0 text-2xl font-extrabold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground md:text-4xl"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

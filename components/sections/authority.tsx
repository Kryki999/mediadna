import { Award, Star } from "lucide-react"

type PartnerLogo = {
  name: string
  glyph: string
}

const partners: PartnerLogo[] = [
  { name: "Google", glyph: "G" },
  { name: "Meta", glyph: "M" },
  { name: "Next.js", glyph: "N" },
  { name: "Vercel", glyph: "V" },
  { name: "Claude", glyph: "C" },
  { name: "Figma", glyph: "F" },
]

export function Authority() {
  return (
    <section className="relative border-t border-border bg-background py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-12 max-w-3xl md:mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Nasz standard
          </span>
          <h2 className="text-display-fade mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            Certyfikaty i gwarancja jakości
          </h2>
        </div>

        {/* Bento grid — 3 cards, unequal */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {/* Card 1 — Certifications (wide) */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f18]/85 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/35 md:col-span-4 md:p-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <Award className="h-5 w-5" />
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Technologie
              </p>
            </div>

            <h3 className="text-display-fade mt-5 text-3xl font-black leading-[1.05] tracking-tight md:text-4xl">
              Certyfikowani partnerzy
            </h3>
            <p className="mt-4 max-w-4xl text-sm font-medium leading-relaxed text-[#aeb8cb] md:text-base">
              Nie uznajemy półśrodków. Pracujemy na licencjach Premium i Enterprise od największych graczy
              (Google, Meta, Vercel, Anthropic). Otrzymujesz system oparty na certyfikowanych i niezawodnych
              fundamentach.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {partners.map((p) => (
                <li
                  key={p.name}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                  aria-label={`${p.name} logo`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#d5dbe8]" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="9" strokeWidth="1.3" opacity="0.85" />
                      <path d="M7 15.5L12 8.5L17 15.5" strokeWidth="1.4" opacity="0.55" />
                      <text
                        x="12"
                        y="15.2"
                        textAnchor="middle"
                        fontSize="7.5"
                        fontWeight="700"
                        fill="currentColor"
                        stroke="none"
                      >
                        {p.glyph}
                      </text>
                    </svg>
                    <span className="text-sm font-medium text-[#d5dbe8]">{p.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 — Followers metric */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f18]/85 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/35 md:col-span-2 md:p-10">
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative">
              <div className="flex items-end gap-3">
                <p className="text-display-fade text-6xl font-black leading-none tracking-tight md:text-7xl">
                  1000+
                </p>
                <span className="mb-0.5 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#dce5f7] md:h-16 md:w-16">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.1" cy="6.9" r="1.2" fill="currentColor" stroke="none" />
                  </svg>
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight text-white md:text-3xl">
                Silna społeczność
              </h3>
              <p className="mt-3 max-w-[16rem] text-sm font-medium leading-relaxed text-[#aeb8cb]">
                Ponad tysiąc osób codziennie śledzi nasze realizacje i uczy się z nami skalowania biznesu.
              </p>
            </div>
          </div>

          {/* Card 3 — Rating */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f18]/85 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/35 md:col-span-3 md:p-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[#c7cfde]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path
                    d="M12 4a8 8 0 1 0 0 16c3.5 0 6.4-2.2 7.6-5.3H12v-3h8.4c.1.4.1.8.1 1.3A8.5 8.5 0 0 1 12 21a9 9 0 1 1 0-18c2.5 0 4.6.9 6.2 2.4l-2.4 2.3A5.8 5.8 0 0 0 12 6.2Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Opinie Google
              </p>
            </div>
            <div className="mt-8 flex items-end gap-3">
              <p className="text-display-fade text-6xl font-black leading-none tracking-tight md:text-7xl">4.9/5.0</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight text-white md:text-3xl">
              Zweryfikowana jakość
            </h3>
            <p className="mt-3 max-w-[22rem] text-sm font-medium leading-relaxed text-[#aeb8cb]">
              Zaufanie poparte twardymi ocenami naszych klientów. Dowozimy to, co obiecujemy.
            </p>
          </div>

          {/* Card 4 — Lighthouse performance */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f18]/85 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/35 md:col-span-3 md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Wydajność Lighthouse
            </p>
            <p className="mt-8 text-6xl font-black leading-none tracking-tight text-[#4ade80] md:text-7xl">98</p>
            <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight text-white md:text-3xl">
              Ekstremalna szybkość
            </h3>
            <p className="mt-3 max-w-xs text-sm font-medium leading-relaxed text-[#aeb8cb]">
              Średnio 98/100 pkt w testach wydajności. Piszemy czysty kod, który ładuje się w ułamku sekundy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


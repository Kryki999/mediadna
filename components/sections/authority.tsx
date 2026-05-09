import { Icon } from "@iconify/react"
import { Award, Star } from "lucide-react"

import { CERTIFIED_PARTNER_ICONS } from "@/lib/certified-partner-icons"

export function Authority() {
  return (
    <section className="relative border-t border-border bg-background py-10 md:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-8 max-w-3xl md:mb-16">
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
            <p className="mt-3 max-w-4xl text-sm font-medium leading-relaxed text-white md:text-base">
              Nie uznajemy półśrodków. Pracujemy na licencjach Premium i Enterprise od największych graczy
              (Google, Meta, Vercel, Anthropic). Otrzymujesz system oparty na certyfikowanych i niezawodnych
              fundamentach.
            </p>

            <ul className="mt-7 grid grid-cols-2 justify-items-center gap-x-5 gap-y-6 sm:grid-cols-3 md:mt-8 md:gap-x-8 md:gap-y-7">
              {CERTIFIED_PARTNER_ICONS.map((p) => (
                <li
                  key={p.name}
                  className="flex w-full max-w-[7.5rem] flex-col items-center text-center sm:max-w-[8.25rem]"
                  aria-label={`${p.name} logo`}
                >
                  <Icon
                    icon={p.icon}
                    className="h-9 w-9 shrink-0 sm:h-10 sm:w-10 md:h-11 md:w-11"
                    width={44}
                    height={44}
                    aria-hidden
                  />
                  <span className="mt-2 text-[11px] font-medium leading-snug text-white md:text-xs">
                    {p.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 — Followers metric */}
          <div className="relative flex min-h-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f18]/85 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/35 md:col-span-2 md:justify-center md:p-8 lg:p-10">
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative z-10 mx-auto flex w-full max-w-[18rem] flex-col items-center text-center md:max-w-[20rem]">
              <div className="flex items-end justify-center gap-3 md:gap-4">
                <p className="text-display-fade text-6xl font-black leading-none tracking-tight md:text-7xl">
                  1000+
                </p>
                <Icon
                  icon="skill-icons:instagram"
                  className="mb-0.5 h-11 w-11 shrink-0 drop-shadow-[0_6px_24px_rgba(225,48,108,0.35)] md:h-14 md:w-14"
                  width={56}
                  height={56}
                  aria-hidden
                />
              </div>

              <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight text-white md:text-3xl">
                Silna społeczność
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-white">
                Ponad tysiąc osób codziennie śledzi nasze realizacje i uczy się z nami skalowania biznesu.
              </p>
            </div>
          </div>

          {/* Card 3 — Rating */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f18]/85 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/35 md:col-span-3 md:p-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5">
                <Icon icon="logos:google-icon" className="h-5 w-5" width={20} height={20} aria-hidden />
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
            <p className="mt-3 max-w-[22rem] text-sm font-medium leading-relaxed text-white">
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
            <p className="mt-3 max-w-xs text-sm font-medium leading-relaxed text-white">
              Średnio 98/100 pkt w testach wydajności. Piszemy czysty kod, który ładuje się w ułamku sekundy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


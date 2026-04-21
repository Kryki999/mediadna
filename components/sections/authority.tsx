import { Award, Star, Users } from "lucide-react"

const partners = [
  "Google Partner",
  "Meta Business",
  "TikTok Creative",
  "Vercel Partner",
  "Shopify Plus",
  "HubSpot Certified",
]

export function Authority() {
  return (
    <section className="relative border-t border-border bg-background py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-12 max-w-3xl md:mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Autorytet i zaufanie
          </span>
          <h2 className="text-display-fade mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            Nie tylko mówimy — <span className="italic text-brand-fade">certyfikujemy</span>.
          </h2>
        </div>

        {/* Bento grid — 3 cards, unequal */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {/* Card 1 — Certifications (wide) */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:col-span-4 md:p-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <Award className="h-5 w-5" />
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Certyfikaty technologiczne
              </p>
            </div>

            <h3 className="text-display-fade mt-5 text-3xl font-black leading-[1.05] tracking-tight md:text-4xl">
              Oficjalni partnerzy platform, na których rosną Twoi klienci.
            </h3>

            <ul className="mt-8 flex flex-wrap gap-2">
              {partners.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 — Followers metric */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:col-span-2 md:p-10">
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </span>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Community
                </p>
              </div>
              <p className="text-display-fade mt-8 text-6xl font-black leading-none tracking-tight md:text-7xl">
                1000+
              </p>
              <p className="mt-3 max-w-[14rem] text-sm font-medium text-muted-foreground">
                Obserwujących i założycieli marek premium w naszym ekosystemie.
              </p>
            </div>
          </div>

          {/* Card 3 — Rating */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:col-span-3 md:p-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <Star className="h-5 w-5 fill-current" />
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Ocena klientów
              </p>
            </div>
            <div className="mt-8 flex items-end gap-3">
              <p className="text-display-fade text-6xl font-black leading-none tracking-tight md:text-7xl">
                4.9
              </p>
              <p className="pb-2 text-2xl font-semibold text-muted-foreground md:text-3xl">
                / 5.0
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                na podstawie 87 opinii Google
              </span>
            </div>
          </div>

          {/* Card 4 — NPS */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-background p-6 md:col-span-3 md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Net Promoter Score
            </p>
            <p className="text-display-fade mt-8 text-6xl font-black leading-none tracking-tight md:text-7xl">
              74<span className="text-primary">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm font-medium text-muted-foreground">
              Średni NPS od klientów po 6 miesiącach współpracy — kategoria „world class”.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


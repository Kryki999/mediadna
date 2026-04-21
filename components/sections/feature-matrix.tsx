import { Bolt, Check, Minus } from "lucide-react"

type MatrixRow = {
  feature: string
  mediaDna: string
  agencies: string
}

const rows: MatrixRow[] = [
  {
    feature: "Strategia i wdrożenie w jednym zespole",
    mediaDna: "Tak",
    agencies: "Nie",
  },
  {
    feature: "Velocity-first performance (sub-100ms mindset)",
    mediaDna: "Tak",
    agencies: "Rzadko",
  },
  {
    feature: "System sprzedażowy zamiast pojedynczej strony",
    mediaDna: "Tak",
    agencies: "Częściowo",
  },
  {
    feature: "Stała optymalizacja po starcie",
    mediaDna: "Tak",
    agencies: "Dodatkowo płatne",
  },
  {
    feature: "Automatyzacje leadów i follow-up",
    mediaDna: "Tak",
    agencies: "Nie",
  },
  {
    feature: "Partnerstwo pod skalowanie biznesu",
    mediaDna: "Tak",
    agencies: "Projektowo",
  },
]

export function FeatureMatrix() {
  return (
    <section className="relative bg-black py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7f8796]">My vs. Oni</span>
          <h2 className="mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight text-white md:text-6xl">
            Feature Matrix
          </h2>
          <p className="mt-4 text-pretty text-base font-medium text-[#9aa3b4] md:text-lg">
            Jasne porownanie tego, co realnie dostajesz w modelu Media DNA vs klasyczna agencja.
          </p>
        </div>

        <div className="hidden md:block">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/90 p-3 md:p-4">
            <div className="matrix-hero-mask pointer-events-none absolute bottom-3 left-[39%] top-3 z-0 w-[22%] rounded-2xl bg-[linear-gradient(180deg,rgba(25,56,118,0.42)_0%,rgba(10,20,44,0.36)_45%,rgba(7,10,16,0.2)_100%)] ring-1 ring-[#2f7cff]/35" />

            <div className="relative z-10 grid grid-cols-[1.2fr_0.8fr_0.8fr] items-end gap-6 px-4 pb-4 pt-2">
              <p className="text-left text-sm uppercase tracking-[0.16em] text-[#9ea7b8]">Cecha</p>
              <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-white">
                Media DNA
              </p>
              <p className="text-center text-sm uppercase tracking-[0.16em] text-[#5f6674]">
                Zwykle agencje
              </p>
            </div>

            <div className="relative z-10 divide-y divide-white/10">
              {rows.map((row) => (
                <div
                  key={row.feature}
                  className="group grid grid-cols-[1.2fr_0.8fr_0.8fr] items-center gap-6 px-4 py-5 transition-colors duration-200 hover:bg-white/[0.03]"
                >
                  <p className="text-left text-base font-medium text-[#c4c9d3]">{row.feature}</p>

                  <div className="mx-auto flex items-center justify-center gap-2 text-white">
                    <Bolt className="matrix-dna-icon h-4 w-4 text-[#2f7cff]" />
                    <span className="text-sm font-semibold">{row.mediaDna}</span>
                  </div>

                  <div className="mx-auto flex items-center justify-center gap-2 text-[#5f6674]">
                    {row.agencies === "Nie" ? (
                      <Minus className="h-4 w-4 text-[#5f6674]" />
                    ) : (
                      <Check className="h-4 w-4 text-[#636b79]" />
                    )}
                    <span className="text-sm">{row.agencies}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 md:hidden">
          {rows.map((row) => (
            <article key={`mobile-${row.feature}`} className="rounded-2xl border border-white/10 bg-[#05070c] p-4">
              <p className="text-sm font-medium text-[#c4c9d3]">{row.feature}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#2f7cff]/35 bg-[#0a1326] p-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Media DNA</p>
                  <div className="mt-2 flex items-center gap-1.5 text-white">
                    <Bolt className="h-4 w-4 text-[#2f7cff]" />
                    <span className="text-sm font-semibold">{row.mediaDna}</span>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#090a0d] p-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#646c79]">Zwykle agencje</p>
                  <div className="mt-2 flex items-center gap-1.5 text-[#5f6674]">
                    {row.agencies === "Nie" ? (
                      <Minus className="h-4 w-4 text-[#5f6674]" />
                    ) : (
                      <Check className="h-4 w-4 text-[#636b79]" />
                    )}
                    <span className="text-sm">{row.agencies}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

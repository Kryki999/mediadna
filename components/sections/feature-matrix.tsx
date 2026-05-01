import { Icon } from "@iconify/react"
import { Bolt } from "lucide-react"
import { HintCard } from "@/components/ui/HintCard"

type MatrixRow = {
  feature: string
  mediaDna: string
  agencies: string
  freelancer: string
}

const rows: MatrixRow[] = [
  {
    feature: "Strategia, design i wdrożenie w jednym ownership",
    mediaDna: "Jeden zespół seniorów od discovery do wyniku",
    agencies: "Często podzielone między kilka działów",
    freelancer: "Najczęściej 1 osoba bez zaplecza specjalistów",
  },
  {
    feature: "Tempo realizacji i decyzyjność",
    mediaDna: "Krótka ścieżka decyzji i szybkie iteracje",
    agencies: "Dłuższy obieg akceptacji i priorytetów",
    freelancer: "Zależne od dostępności i innych zleceń",
  },
  {
    feature: "Podejście do wyniku biznesowego",
    mediaDna: "System konwersji: UX + content + analityka + ads",
    agencies: "Zwykle projekt i wdrożenie bez pełnego ekosystemu",
    freelancer: "Przeważnie dowóz strony bez warstwy growth",
  },
  {
    feature: "Opieka i optymalizacja po starcie",
    mediaDna: "Stałe usprawnienia oparte o dane",
    agencies: "Najczęściej osobny, dodatkowo płatny etap",
    freelancer: "Doraźne poprawki, bez procesu optymalizacji",
  },
  {
    feature: "Pomiar i transparentność pracy",
    mediaDna: "Jasne KPI, dashboard i rekomendacje działań",
    agencies: "Raporty okresowe, mniejsza granularność danych",
    freelancer: "Pomiar bywa ograniczony lub niespójny",
  },
  {
    feature: "Partnerstwo długoterminowe",
    mediaDna: "Rozwój marki i lejka jako ciągły proces",
    agencies: "Relacja najczęściej zamyka się na projekcie",
    freelancer: "Współpraca reaktywna, bez roadmapy wzrostu",
  },
]

export function FeatureMatrix() {
  return (
    <section id="comparison" className="relative overflow-x-hidden bg-black pb-10 pt-2 md:pb-28 md:pt-4">
      {/* Most nagłówkowy jest w WebsiteShredder — tu tylko krótki most do tabeli */}
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <p className="mx-auto max-w-2xl pb-6 text-center text-sm font-medium leading-relaxed text-white md:pb-8 md:text-base">
          Twarde porównanie bez ściemy: ten sam rynek — trzy modele współpracy. Widać od razu, po co płacisz i kto
          odpowiada za wynik po starcie.
        </p>
      </div>

      {/* Desktop: tabela w kontenerze */}
      <div className="mx-auto hidden w-full max-w-[1400px] px-5 sm:px-6 md:block md:px-8 lg:px-10 xl:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/90 p-3 md:p-4">
          <div className="pointer-events-none absolute bottom-3 left-[26%] top-3 z-0 w-[24%] rounded-2xl bg-[linear-gradient(180deg,rgba(36,92,190,0.5)_0%,rgba(24,64,140,0.4)_45%,rgba(12,34,84,0.36)_100%)] ring-1 ring-[#2f7cff]/45 shadow-[0_0_42px_rgba(47,124,255,0.32)]" />

          <div className="relative z-10 grid grid-cols-[1fr_1fr_1fr_1fr] items-end gap-5 px-4 pb-4 pt-2">
            <p className="text-left text-sm font-bold uppercase tracking-[0.16em] text-[#c7cfde]">Kryterium</p>
            <p className="flex items-center justify-center gap-2 rounded-xl border border-[#2f7cff]/40 bg-[linear-gradient(180deg,rgba(41,102,210,0.38)_0%,rgba(16,36,86,0.36)_100%)] px-3 py-2 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_22px_rgba(47,124,255,0.25)]">
              <Bolt className="h-4 w-4 text-[#2f7cff]" />
              Media DNA
            </p>
            <p className="text-center text-sm uppercase tracking-[0.16em] text-white">Typowa agencja</p>
            <p className="text-center text-sm uppercase tracking-[0.16em] text-white">
              Freelancer
            </p>
          </div>

          <div className="relative z-10 divide-y divide-white/10">
            {rows.map((row) => (
              <div
                key={row.feature}
                className="group grid grid-cols-[1fr_1fr_1fr_1fr] items-start gap-5 px-4 py-5 transition-colors duration-200 hover:bg-white/[0.03]"
              >
                <p className="text-left text-base font-bold leading-snug text-[#e3e8f3]">{row.feature}</p>

                <div className="rounded-xl border border-[#2f7cff]/45 bg-[linear-gradient(180deg,rgba(42,105,220,0.34)_0%,rgba(15,34,82,0.38)_100%)] p-3 text-[#dce9ff] shadow-[0_0_24px_rgba(47,124,255,0.22)]">
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-bold-duotone"
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    <p className="text-sm leading-relaxed">{row.mediaDna}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0a0b0f] p-3 text-white">
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="solar:close-circle-bold-duotone"
                      className="mt-0.5 h-5 w-5 shrink-0 text-rose-400"
                      aria-hidden
                    />
                    <p className="text-sm leading-relaxed">{row.agencies}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#08090d] p-3 text-white">
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="solar:close-circle-bold-duotone"
                      className="mt-0.5 h-5 w-5 shrink-0 text-rose-400"
                      aria-hidden
                    />
                    <p className="text-sm leading-relaxed">{row.freelancer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: pełna szerokość ekranu — bez podwójnego marginesu wokół tabeli */}
      <div className="md:hidden">
        <div className="mx-auto mb-2 max-w-[1400px] px-5 sm:px-6">
          <div className="flex items-center justify-between text-[11px] text-white">
            <p className="uppercase tracking-[0.14em] text-white">Tabela</p>
            <p>Przesuń w bok, aby porównać</p>
          </div>
        </div>
        <div className="ml-[calc(50%-50vw)] w-screen max-w-[100vw] overflow-x-auto border-y border-white/10 bg-[#05070c] [-webkit-overflow-scrolling:touch]">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[170px_176px_176px_176px] border-b border-white/10">
              <div className="sticky left-0 z-20 border-r border-white/10 bg-[#070a12] p-3 text-xs font-bold uppercase tracking-[0.12em] text-[#c7cfde]">
                Kryterium
              </div>
              <div className="border-r border-[#2f7cff]/35 bg-[linear-gradient(180deg,rgba(40,98,205,0.35)_0%,rgba(12,29,73,0.35)_100%)] p-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-[inset_0_0_0_1px_rgba(47,124,255,0.18)]">
                Media DNA
              </div>
              <div className="border-r border-white/10 p-3 text-center text-xs uppercase tracking-[0.12em] text-white">
                Typowa agencja
              </div>
              <div className="p-3 text-center text-xs uppercase tracking-[0.12em] text-white">
                Freelancer
              </div>
            </div>
            {rows.map((row) => (
              <div
                key={`table-${row.feature}`}
                className="grid grid-cols-[170px_176px_176px_176px] border-b border-white/10 last:border-b-0"
              >
                <div className="sticky left-0 z-10 border-r border-white/10 bg-[#070a12] p-3 text-sm font-bold leading-snug text-[#dce3f0]">
                  {row.feature}
                </div>
                <div className="border-r border-[#2f7cff]/35 bg-[linear-gradient(180deg,rgba(42,105,220,0.26)_0%,rgba(14,32,78,0.32)_100%)] p-3 text-sm leading-snug text-[#dce9ff] shadow-[inset_0_0_0_1px_rgba(47,124,255,0.12)]">
                  <div className="flex items-start gap-1.5">
                    <Icon
                      icon="solar:check-circle-bold-duotone"
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    <span>{row.mediaDna}</span>
                  </div>
                </div>
                <div className="border-r border-white/10 p-3 text-sm leading-snug text-white">
                  <div className="flex items-start gap-1.5">
                    <Icon
                      icon="solar:close-circle-bold-duotone"
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-rose-400"
                      aria-hidden
                    />
                    <span>{row.agencies}</span>
                  </div>
                </div>
                <div className="p-3 text-sm leading-snug text-white">
                  <div className="flex items-start gap-1.5">
                    <Icon
                      icon="solar:close-circle-bold-duotone"
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-rose-400"
                      aria-hidden
                    />
                    <span>{row.freelancer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 w-full max-w-[1400px] px-5 sm:px-6 md:mt-14 md:px-8 lg:px-10 xl:px-12">
        <div className="flex justify-center">
          <HintCard
            title="WSKAZÓWKA"
            text="Nie traktuj profesjonalnej strony jako wydatku. Dobrze zaprogramowany system ma się szybko zwrócić, a przez kolejne lata pracować na Ciebie jak handlowiec, który nigdy nie śpi."
          />
        </div>
      </div>
    </section>
  )
}

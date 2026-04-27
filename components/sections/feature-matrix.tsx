import { Bolt, Check, Minus } from "lucide-react"
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
    <section id="comparison" className="relative overflow-x-hidden bg-black pb-16 pt-2 md:pb-28 md:pt-4">
      {/* Most nagłówkowy jest w WebsiteShredder — tu tylko krótki most do tabeli */}
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <p className="mx-auto max-w-2xl pb-6 text-center text-sm font-medium leading-relaxed text-[#9aa3b4] md:pb-8 md:text-base">
          Twarde porównanie bez ściemy: ten sam rynek — trzy modele współpracy. Widać od razu, po co płacisz i kto
          odpowiada za wynik po starcie.
        </p>
      </div>

      {/* Desktop: tabela w kontenerze */}
      <div className="mx-auto hidden w-full max-w-[1400px] px-5 sm:px-6 md:block md:px-8 lg:px-10 xl:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/90 p-3 md:p-4">
          <div className="pointer-events-none absolute bottom-3 left-[26%] top-3 z-0 w-[24%] rounded-2xl bg-[linear-gradient(180deg,rgba(30,72,150,0.42)_0%,rgba(10,20,44,0.3)_45%,rgba(7,10,16,0.18)_100%)] ring-1 ring-[#2f7cff]/35" />

          <div className="relative z-10 grid grid-cols-[1fr_1fr_1fr_1fr] items-end gap-5 px-4 pb-4 pt-2">
            <p className="text-left text-sm uppercase tracking-[0.16em] text-[#9ea7b8]">Kryterium</p>
            <p className="flex items-center justify-center gap-2 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white">
              <Bolt className="h-4 w-4 text-[#2f7cff]" />
              Media DNA
            </p>
            <p className="text-center text-sm uppercase tracking-[0.16em] text-[#7f8796]">Typowa agencja</p>
            <p className="text-center text-sm uppercase tracking-[0.16em] text-[#666d7a]">
              Freelancer
            </p>
          </div>

          <div className="relative z-10 divide-y divide-white/10">
            {rows.map((row) => (
              <div
                key={row.feature}
                className="group grid grid-cols-[1fr_1fr_1fr_1fr] items-start gap-5 px-4 py-5 transition-colors duration-200 hover:bg-white/[0.03]"
              >
                <p className="text-left text-base font-semibold leading-snug text-[#d2d8e5]">{row.feature}</p>

                <div className="rounded-xl border border-[#2f7cff]/35 bg-[#091328]/85 p-3 text-[#dce9ff]">
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7fb3ff]" />
                    <p className="text-sm leading-relaxed">{row.mediaDna}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0a0b0f] p-3 text-[#a2acbd]">
                  <div className="flex items-start gap-2">
                    <Minus className="mt-0.5 h-4 w-4 shrink-0 text-[#778093]" />
                    <p className="text-sm leading-relaxed">{row.agencies}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#08090d] p-3 text-[#8f97a8]">
                  <div className="flex items-start gap-2">
                    <Minus className="mt-0.5 h-4 w-4 shrink-0 text-[#6f7786]" />
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
          <div className="flex items-center justify-between text-[11px] text-[#a2acbd]">
            <p className="uppercase tracking-[0.14em] text-[#7f8796]">Tabela</p>
            <p>Przesuń w bok, aby porównać</p>
          </div>
        </div>
        <div className="ml-[calc(50%-50vw)] w-screen max-w-[100vw] overflow-x-auto border-y border-white/10 bg-[#05070c] [-webkit-overflow-scrolling:touch]">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[170px_176px_176px_176px] border-b border-white/10">
              <div className="sticky left-0 z-20 border-r border-white/10 bg-[#070a12] p-3 text-xs uppercase tracking-[0.12em] text-[#9ea7b8]">
                Kryterium
              </div>
              <div className="border-r border-white/10 p-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white">
                Media DNA
              </div>
              <div className="border-r border-white/10 p-3 text-center text-xs uppercase tracking-[0.12em] text-[#7f8796]">
                Typowa agencja
              </div>
              <div className="p-3 text-center text-xs uppercase tracking-[0.12em] text-[#6f7786]">
                Freelancer
              </div>
            </div>
            {rows.map((row) => (
              <div
                key={`table-${row.feature}`}
                className="grid grid-cols-[170px_176px_176px_176px] border-b border-white/10 last:border-b-0"
              >
                <div className="sticky left-0 z-10 border-r border-white/10 bg-[#070a12] p-3 text-sm font-medium leading-snug text-[#c4cde0]">
                  {row.feature}
                </div>
                <div className="border-r border-white/10 p-3 text-sm leading-snug text-[#dce9ff]">{row.mediaDna}</div>
                <div className="border-r border-white/10 p-3 text-sm leading-snug text-[#a2acbd]">{row.agencies}</div>
                <div className="p-3 text-sm leading-snug text-[#8f97a8]">{row.freelancer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[1400px] px-5 sm:px-6 md:mt-14 md:px-8 lg:px-10 xl:px-12">
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

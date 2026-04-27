import { ArrowUpRight, Bolt, Check, ChevronRight, Clock3, Minus, ShieldCheck, Sparkles } from "lucide-react"
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

const proofPoints = [
  {
    icon: Clock3,
    title: "Szybka komunikacja",
    value: "Odpowiedź zwykle do 24h",
  },
  {
    icon: ShieldCheck,
    title: "Pełna odpowiedzialność",
    value: "Od strategii po wynik po wdrożeniu",
  },
  {
    icon: Sparkles,
    title: "Premium execution",
    value: "Design, performance i konwersja w jednym standardzie",
  },
]

export function FeatureMatrix() {
  return (
    <section id="comparison" className="relative bg-black py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(0,85,255,0.2)_0%,rgba(0,0,0,0)_68%)]"
      />
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto mb-10 max-w-4xl text-center md:mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7f8796]">Dlaczego my</span>
          <h2 className="mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight text-white md:text-6xl">
            Nie kupujesz strony.
            <span className="text-display-fade"> Kupujesz system wzrostu.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-base font-medium text-[#9aa3b4] md:text-lg">
            Porownujemy nie tylko design, ale tempo decyzji, odpowiedzialnosc i to, czy projekt realnie dowozi
            leady oraz sprzedaz po starcie.
          </p>
        </div>

        <div className="hidden md:block">
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

        <div className="mt-6 md:hidden">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-xs uppercase tracking-[0.14em] text-[#7f8796]">Tryb tabeli</p>
            <p className="text-[11px] text-[#a2acbd]">Przesun w bok, aby porownac</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#05070c] [-webkit-overflow-scrolling:touch]">
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
                <div key={`table-${row.feature}`} className="grid grid-cols-[170px_176px_176px_176px] border-b border-white/10 last:border-b-0">
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

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {proofPoints.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-[#07090f] p-4">
              <div className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-5 w-5 text-[#7fb3ff]" />
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-[#9aa3b4]">{item.value}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <a
            href="#cta"
            data-contact-trigger="true"
            className="inline-flex items-center justify-center rounded-full border border-primary/80 bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(0,85,255,0.42)] transition hover:bg-primary/90"
          >
            Umow konsultacje
            <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </a>
          <a
            href="#impact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            Zobacz realizacje
            <ChevronRight className="ml-1.5 h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          <HintCard
            title="WSKAZÓWKA"
            text="Nie traktuj profesjonalnej strony jako wydatku. Dobrze zaprogramowany system ma się szybko zwrócić, a przez kolejne lata pracować na Ciebie jak handlowiec, który nigdy nie śpi."
          />
        </div>
      </div>
    </section>
  )
}

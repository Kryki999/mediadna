 "use client"

import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type CaseMetric = {
  value: string
  label: string
}

type PortfolioTile = {
  id: string
  title: string
  imageSrc?: string
  href?: string
  isFeatured?: boolean
}

type CaseStudyCard = {
  type: "case-study"
  id: string
  logo: string
  logoAlt: string
  videoSrc: string
  poster: string
  metrics: CaseMetric[]
  cta: string
}

type CtaPortfolioCard = {
  type: "cta-portfolio"
  id: string
  heading: string
  description: string
  supportingText: string
  cta: string
  tiles: PortfolioTile[]
}

type ImpactCard = CaseStudyCard | CtaPortfolioCard

const impactCards: ImpactCard[] = [
  {
    type: "case-study",
    id: "detailing-growth",
    logo: "/impact-1.jpg",
    logoAlt: "Case study Auto Detailing",
    videoSrc: "/impact-1.mp4",
    poster: "/impact-1.jpg",
    metrics: [
      { value: "+120%", label: "Zapytań o usługi premium (PPF/Ceramika)" },
      { value: "14 dni", label: "Stałe obłożenie kalendarza w przód" },
      { value: "Auto Detailing", label: "Branża:" },
    ],
    cta: "Przeczytaj case study",
  },
  {
    type: "case-study",
    id: "architecture-leads",
    logo: "/impact-2.jpg",
    logoAlt: "Case study Architektura",
    videoSrc: "/impact-2.mp4",
    poster: "/impact-2.jpg",
    metrics: [
      { value: "+45%", label: "Wyższa średnia wartość podpisywanej umowy" },
      { value: "8/10", label: "Zweryfikowanych zapytań z odpowiednim budżetem" },
      { value: "Architektura Wnętrz", label: "Branża:" },
    ],
    cta: "Przeczytaj case study",
  },
  {
    type: "case-study",
    id: "event-system",
    logo: "/impact-3.jpg",
    logoAlt: "Case study Eventy",
    videoSrc: "/impact-3.mp4",
    poster: "/impact-3.jpg",
    metrics: [
      { value: "20 MLN+", label: "Wyświetleń organicznych (Rolki i wideo)" },
      { value: "100%", label: "Wyprzedane pule biletów na eventy" },
      { value: "Kluby Nocne i Eventy", label: "Branża:" },
    ],
    cta: "Przeczytaj case study",
  },
  {
    type: "cta-portfolio",
    id: "your-project-next",
    heading: "Zbudujmy razem Twój biznes",
    description:
      "Nasze flagowe systemy pokazują kierunek, ale nie ograniczamy się tylko do tych branż.",
    supportingText:
      "Jeśli nie widzisz swojej niszy na kartach, to nadal jest idealny moment, żeby się zgłosić.",
    cta: "Skontaktuj się z nami",
    tiles: [
      { id: "your-project", title: "Tu będzie Twój projekt +", isFeatured: true },
      { id: "creotech-quantum", title: "Creotech Quantum", imageSrc: "/impact-2.jpg" },
      { id: "krakowski-kredens", title: "Krakowski Kredens", imageSrc: "/impact-3.jpg" },
      { id: "gradient-house", title: "Gradient House", imageSrc: "/impact-1.jpg" },
    ],
  },
]

function CaseStudyMetrics({ metrics }: { metrics: CaseMetric[] }) {
  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <div key={`${metric.label}-${metric.value}`} className="border-b border-[#252b36] pb-4 last:border-b-0 last:pb-0">
          <p className="text-4xl font-black tracking-tight md:text-5xl">{metric.value}</p>
          <p className="mt-1 text-sm text-[#a6afc2]">{metric.label}</p>
        </div>
      ))}
    </div>
  )
}

function PortfolioTeaserCard({ card }: { card: CtaPortfolioCard }) {
  const featuredId = card.tiles.find((tile) => tile.isFeatured)?.id ?? card.tiles[0]?.id
  const [activeTileId, setActiveTileId] = useState(featuredId)

  return (
    <article className="group rounded-[28px] border border-[#2b2f38] bg-[#0e1320] p-4 text-white md:p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <h3 className="text-balance text-3xl font-black leading-[1.05] tracking-tight text-white md:text-5xl">
            {card.heading}
          </h3>
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-[#b3bed1] md:text-base">
            {card.description}
          </p>
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-[#8d9ab3] md:text-base">
            {card.supportingText}
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-6 h-12 w-full rounded-xl border-[#3a4354] bg-white text-black transition-colors hover:bg-[#dce7ff] md:w-[320px]"
          >
            <a href="#cta" data-configurator-trigger="true">
              Skonfiguruj projekt
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="md:col-span-7 md:flex md:items-center">
          <div className="flex w-full gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-hidden">
            {card.tiles.map((tile) => (
              <a
                key={tile.id}
                href={tile.href ?? "#cta"}
                data-configurator-trigger={tile.href ? undefined : "true"}
                aria-label={tile.isFeatured ? "Tu będzie Twój projekt" : `Projekt referencyjny: ${tile.title}`}
                onMouseEnter={() => setActiveTileId(tile.id)}
                onFocus={() => setActiveTileId(tile.id)}
                className={`group/tile relative block h-44 overflow-hidden rounded-2xl border transition-[flex-grow,border-color,transform] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1320] md:h-52 md:min-w-0 md:w-auto ${
                  tile.isFeatured ? "w-[230px] flex-none" : "w-[82px] flex-none"
                } ${
                  activeTileId === tile.id ? "border-[#5f86ff]/75 md:flex-[2.15]" : "border-[#2b3344] md:flex-1"
                }`}
              >
                {tile.isFeatured ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#101a34] px-4 text-center">
                    <span className="text-sm font-semibold text-[#eaf1ff] md:text-base">{tile.title}</span>
                  </div>
                ) : (
                  <>
                    <img src={tile.imageSrc} alt={tile.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/10 to-[#2f7cff]/15" />
                  </>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project, index }: { project: CaseStudyCard; index: number }) {
  const isEven = index % 2 === 1

  return (
    <article className="group grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
      <div
        className={`order-1 md:col-span-8 ${isEven ? "md:order-2" : "md:order-1"}`}
        aria-hidden="true"
      >
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0f] ring-1 ring-white/5 transition-all duration-300 group-hover:border-[#2f7cff]/50 group-hover:shadow-[0_0_0_1px_rgba(47,124,255,0.45),0_0_36px_rgba(47,124,255,0.24)]">
          <div className="relative aspect-[16/9] w-full">
            <video
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={project.poster}
            >
              <source src={project.videoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-[#1f5eff]/10" />
          </div>
        </div>
      </div>

      <div className={`order-2 md:col-span-4 ${isEven ? "md:order-1" : "md:order-2"}`}>
        <div className="flex h-full min-h-[340px] flex-col rounded-[28px] border border-[#2b2f38] bg-[#0e1320] p-4 text-white md:min-h-[420px] md:p-6">
          <div>
            <CaseStudyMetrics metrics={project.metrics} />
          </div>

          <div className="mt-auto pt-7">
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-xl border-[#3a4354] bg-white text-black transition-colors hover:bg-[#dce7ff]"
            >
              <a href="#cta" data-configurator-trigger="true">
                Skonfiguruj projekt
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Impact() {
  return (
    <section
      id="impact"
      className="relative overflow-hidden border-t border-white/10 bg-[#060b17] py-20 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(47,124,255,0.1)_0%,rgba(47,124,255,0.05)_30%,rgba(47,124,255,0)_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_76%,rgba(38,86,190,0.09)_0%,rgba(38,86,190,0.045)_34%,rgba(38,86,190,0)_66%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,15,34,0.12)_0%,rgba(7,15,34,0.09)_50%,rgba(7,15,34,0.12)_100%)]"
      />
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-12 max-w-3xl md:mb-20">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7e889e]">
            Impact in action
          </span>
          <h2 className="mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight text-white md:text-6xl">
            Systemy, które <span className="italic text-[#2f7cff]">zarabiają</span> w tle.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base font-medium leading-relaxed text-[#a2a9b7] md:text-lg">
            Zamiast jednorazowych projektów, dostarczamy produktyzowane systemy wzrostu —
            dopasowane do konkretnych branż i powtarzalne w skali.
          </p>
        </div>

        <div className="-mx-4 flex flex-col gap-12 md:mx-0 md:gap-16">
          {impactCards.map((card, index) =>
            card.type === "case-study" ? (
              <ProjectCard key={card.id} project={card} index={index} />
            ) : (
              <PortfolioTeaserCard key={card.id} card={card} />
            ),
          )}
        </div>
      </div>
    </section>
  )
}


import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type CaseMetric = {
  value: string
  label: string
}

type CaseStudy = {
  id: string
  logo: string
  logoAlt: string
  industry: string
  videoSrc: string
  poster: string
  metrics: CaseMetric[]
  cta: string
}

const caseStudies: CaseStudy[] = [
  {
    id: "detailing-growth",
    logo: "/impact-1.jpg",
    logoAlt: "Case study Auto Detailing",
    industry: "Auto Detailing",
    videoSrc: "/impact-1.mp4",
    poster: "/impact-1.jpg",
    metrics: [
      { value: "+312%", label: "Wzrost liczby zapytań miesięcznie" },
      { value: "6.4x", label: "ROAS kampanii performance" },
      { value: "12 tyg.", label: "Zapełniony kalendarz premium" },
    ],
    cta: "Przeczytaj case study",
  },
  {
    id: "architecture-leads",
    logo: "/impact-2.jpg",
    logoAlt: "Case study Architektura",
    industry: "Architektura i Wnętrza",
    videoSrc: "/impact-2.mp4",
    poster: "/impact-2.jpg",
    metrics: [
      { value: "+189%", label: "Wzrost wartości zapytań ofertowych" },
      { value: "-37%", label: "Niższy koszt pozyskania leada" },
      { value: "24/7", label: "System pozyskania działa stale" },
    ],
    cta: "Przeczytaj case study",
  },
  {
    id: "event-system",
    logo: "/impact-3.jpg",
    logoAlt: "Case study Eventy",
    industry: "Rozrywka i Eventy",
    videoSrc: "/impact-3.mp4",
    poster: "/impact-3.jpg",
    metrics: [
      { value: "30M+", label: "Łączne wyświetlenia kampanii" },
      { value: "+61%", label: "Szybsze domykanie sprzedaży" },
      { value: "3x", label: "Więcej powtarzalnych wdrożeń" },
    ],
    cta: "Przeczytaj case study",
  },
]

function ProjectCard({ project, index }: { project: CaseStudy; index: number }) {
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
        <div className="flex h-full min-h-[340px] flex-col rounded-[28px] border border-[#2b2f38] bg-[#0e1320] p-6 text-white md:min-h-[420px]">
          <div>
            <div className="mb-7 flex items-center justify-between">
              <img
                src={project.logo}
                alt={project.logoAlt}
                className="h-8 w-auto rounded-md object-cover opacity-90"
              />
            </div>
            <div className="space-y-4">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="border-b border-[#252b36] pb-4 last:border-b-0 last:pb-0">
                  <p className="text-4xl font-black tracking-tight md:text-5xl">{metric.value}</p>
                  <p className="mt-1 text-sm text-[#a6afc2]">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-7">
            <p className="mb-4 text-sm text-[#95a0b7]">{project.industry}</p>
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-xl border-[#3a4354] bg-white text-black transition-colors hover:bg-[#dce7ff]"
            >
              <a href="#cta" data-contact-trigger="true">
                {project.cta}
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
    <section id="impact" className="relative border-t border-white/10 bg-[#050507] py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
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

        <div className="flex flex-col gap-12 md:gap-16">
          {caseStudies.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}


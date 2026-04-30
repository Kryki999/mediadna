"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Send,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

const diagnosisTiles = [
  { id: "premium-website", label: "Nowy, prestiżowy wizerunek (Strona WWW)", icon: "fluent-emoji:gem-stone" },
  { id: "lead-generation", label: "Pozyskiwanie leadów / Zwiększenie sprzedaży", icon: "fluent-emoji:bullseye" },
  { id: "ecommerce-sales", label: "Sprzedaż produktów online (E-commerce)", icon: "fluent-emoji:shopping-cart" },
  { id: "process-automation", label: "Automatyzacja procesów w firmie", icon: "fluent-emoji:gear" },
  { id: "website-modernization", label: "Modernizacja obecnej, niedziałającej strony", icon: "fluent-emoji:hammer-and-wrench" },
  { id: "need-consulting", label: "Nie jestem pewien / Potrzebuję doradztwa", icon: "fluent-emoji:person-raising-hand" },
]

const budgetRanges = [
  "Poniżej 5 000 zł",
  "5 000 - 15 000 zł",
  "Powyżej 15 000 zł",
  "Wolę omówić budżet podczas rozmowy",
]

const formSchema = z.object({
  source: z.enum(["direct_configurator", "calendar_configurator"]),
  meetingDate: z.string().optional(),
  meetingSlot: z.string().optional(),
  diagnosisNeeds: z.array(z.string()).min(1, "Wybierz minimum jeden obszar"),
  budgetRange: z.string().min(1, "Wybierz budżet orientacyjny"),
  currentLink: z.string().trim().optional(),
  projectContext: z.string().optional(),
  name: z.string().min(2, "Imię musi mieć minimum 2 znaki"),
  phone: z.string().regex(/^\d{9}$/, "Numer telefonu musi mieć dokładnie 9 cyfr"),
  email: z.string().email("Niepoprawny adres e-mail").optional().or(z.literal("")),
  fax: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

type MeetingPrefill = {
  date: string
  slot: string
}

export interface ProjectConfiguratorCoreProps {
  variant?: "inline" | "modal"
  initialSource?: "direct_configurator" | "calendar_configurator"
  initialMeeting?: MeetingPrefill | null
  onSuccess?: () => void
}

export function ProjectConfiguratorCore({
  variant = "inline",
  initialSource = "direct_configurator",
  initialMeeting = null,
  onSuccess,
}: ProjectConfiguratorCoreProps) {
  const [step, setStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [meetingPrefill, setMeetingPrefill] = React.useState<MeetingPrefill | null>(initialMeeting)
  const phoneInputRef = React.useRef<HTMLInputElement>(null)
  const emailInputRef = React.useRef<HTMLInputElement>(null)
  const formContainerRef = React.useRef<HTMLDivElement>(null)
  const initialMountRef = React.useRef(true)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: initialSource,
      meetingDate: initialMeeting?.date ?? "",
      meetingSlot: initialMeeting?.slot ?? "",
      diagnosisNeeds: [],
      budgetRange: "",
      currentLink: "",
      projectContext: "",
      name: "",
      phone: "",
      email: "",
      fax: "",
    },
  })

  React.useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false
      return
    }
    formContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [step])

  React.useEffect(() => {
    if (!initialMeeting) return
    setMeetingPrefill(initialMeeting)
    form.setValue("source", "calendar_configurator")
    form.setValue("meetingDate", initialMeeting.date)
    form.setValue("meetingSlot", initialMeeting.slot)
  }, [form, initialMeeting])

  React.useEffect(() => {
    const onMeetingSelected = (event: Event) => {
      const customEvent = event as CustomEvent<MeetingPrefill>
      if (!customEvent.detail) return
      const payload = customEvent.detail
      setMeetingPrefill(payload)
      form.setValue("source", "calendar_configurator")
      form.setValue("meetingDate", payload.date)
      form.setValue("meetingSlot", payload.slot)
      toast.message("Termin zapisany", {
        description: `${payload.date}, godz. ${payload.slot}. Dokończ konfigurację projektu.`,
      })
      formContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    window.addEventListener("lead:meeting-selected", onMeetingSelected)
    return () => window.removeEventListener("lead:meeting-selected", onMeetingSelected)
  }, [form])

  const totalSteps = 3
  const progressValue = (step / totalSteps) * 100

  const validateStep = async () => {
    if (step === 1) {
      return form.trigger(["diagnosisNeeds"])
    }
    if (step === 2) {
      return form.trigger(["budgetRange"])
    }
    return true
  }

  const handleNext = async () => {
    const valid = await validateStep()
    if (valid) setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1))

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error("Nie udało się wysłać formularza")

      form.reset({
        source: "direct_configurator",
        meetingDate: "",
        meetingSlot: "",
        diagnosisNeeds: [],
        budgetRange: "",
        currentLink: "",
        projectContext: "",
        name: "",
        phone: "",
        email: "",
        fax: "",
      })
      setMeetingPrefill(null)
      setStep(1)
      setIsSubmitted(true)
      toast.success("Dziękujemy! Odezwiemy się z planem działania.")
    } catch {
      toast.error("Nie udało się wysłać zapytania. Spróbuj ponownie.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-black tracking-tight">Konfigurator projektu wysłany</h3>
        <p className="max-w-xl text-muted-foreground">
          Dziękujemy za szczegóły. Wracamy do Ciebie z bezpłatną, spersonalizowaną wyceną.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false)
            onSuccess?.()
          }}
        >
          Wyślij kolejne zgłoszenie
        </Button>
      </div>
    )
  }

  return (
    <div ref={formContainerRef} className="space-y-4 scroll-mt-24">
      {step === 1 && (
        <div className="rounded-xl border border-green-500/25 bg-green-500/10 p-3">
          <div className="flex items-start gap-3">
            <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
            <p className="text-sm text-green-100">
              Skonfiguruj projekt. Wybierz parametry projektu, aby otrzymać <strong>precyzyjną wycenę</strong>.
            </p>
          </div>
        </div>
      )}
      {meetingPrefill ? (
        <div className="rounded-xl border border-primary/20 bg-primary/10 p-3 text-sm text-primary-foreground">
          <span>
            Wybrany termin spotkania: <strong>{meetingPrefill.date}</strong> o <strong>{meetingPrefill.slot}</strong>.
            Dokończ konfigurację, abyśmy mogli się przygotować.
          </span>
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{step === 1 ? "33%" : step === 2 ? "66%" : "100%"}</span>
          <span>{step === 1 ? "Diagnoza" : step === 2 ? "Kwalifikacja" : "Finalizacja"}</span>
        </div>
        <Progress value={progressValue} className="h-2" aria-label="Postęp formularza" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="diagnosisNeeds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Co jest teraz największym priorytetem? *</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {diagnosisTiles.map((item) => {
                          const active = field.value.includes(item.id)
                          const iconName = item.icon
                          return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              active
                                ? field.onChange(field.value.filter((value) => value !== item.id))
                                : field.onChange([...field.value, item.id])
                            }
                            className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                              active ? "border-primary bg-primary/10" : "border-border hover:border-primary/60"
                            }`}
                          >
                            <span className="flex items-start gap-3">
                              <Icon icon={iconName} className="mt-0.5 h-5 w-5 shrink-0" />
                              <span>{item.label}</span>
                            </span>
                          </button>
                          )
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="button" onClick={handleNext} className="h-12 w-full rounded-full">
                Dalej
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="budgetRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budżet projektu *</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {budgetRanges.map((budget) => (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => field.onChange(budget)}
                            className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                              field.value === budget ? "border-primary bg-primary/10" : "border-border hover:border-primary/60"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Icon icon="fluent-emoji:money-bag" className="h-5 w-5 shrink-0" />
                              <span>{budget}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link do obecnej strony lub Social Media (Do darmowego audytu)</FormLabel>
                    <FormControl>
                      <Input placeholder="Twoja strona / profil firmowy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dodatkowy kontekst (opcjonalnie)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Opisz krótko swój projekt. Podpowiedź: w jakiej branży działasz?"
                        className="min-h-28 resize-none"
                        enterKeyHint="done"
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault()
                            event.currentTarget.blur()
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="outline" className="h-12 flex-1" onClick={handleBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Wstecz
                </Button>
                <Button type="button" className="h-12 flex-1" onClick={handleNext}>
                  Dalej
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Np. Jan"
                        enterKeyHint="next"
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault()
                            phoneInputRef.current?.focus()
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456789"
                        maxLength={9}
                        enterKeyHint="next"
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault()
                            emailInputRef.current?.focus()
                          }
                        }}
                        {...field}
                        ref={(node) => {
                          field.ref(node)
                          phoneInputRef.current = node
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (opcjonalnie)</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="hello@twojafirma.pl"
                        enterKeyHint="send"
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault()
                            form.handleSubmit(onSubmit)()
                          }
                        }}
                        {...field}
                        ref={(node) => {
                          field.ref(node)
                          emailInputRef.current = node
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fax"
                render={({ field }) => (
                  <FormItem className="absolute -z-50 h-0 w-0 overflow-hidden opacity-0" aria-hidden tabIndex={-1}>
                    <FormControl>
                      <Input type="text" autoComplete="off" tabIndex={-1} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="outline" className="h-12 flex-1" onClick={handleBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Wstecz
                </Button>
                <Button type="submit" disabled={isSubmitting} className="h-12 flex-1">
                  {isSubmitting ? "Wysyłanie..." : "Wyślij do bezpłatnej wyceny"}
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
      {variant === "modal" ? null : null}
    </div>
  )
}

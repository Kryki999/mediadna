import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

export const dynamic = "force-dynamic"

const leadSchema = z.object({
  source: z.enum(["direct_configurator", "calendar_configurator"]),
  meetingDate: z.string().optional(),
  meetingSlot: z.string().optional(),
  diagnosisNeeds: z.array(z.string()).min(1),
  budgetRange: z.string().min(1),
  currentLink: z.string().optional(),
  projectContext: z.string().optional(),
  name: z.string().min(2),
  phone: z.string().regex(/^\d{9}$/),
  email: z.string().email().optional().or(z.literal("")),
  fax: z.string().optional(),
})

const diagnosisLabels: Record<string, string> = {
  "lead-generation": "Pozyskiwanie leadów / Zwiększenie sprzedaży",
  "premium-website": "Nowy, prestiżowy wizerunek (Strona WWW)",
  "ecommerce-sales": "Sprzedaż produktów online (E-commerce)",
  "process-automation": "Automatyzacja procesów w firmie",
  "website-modernization": "Modernizacja obecnej, niedziałającej strony",
  "need-consulting": "Nie jestem pewien / Potrzebuję doradztwa",
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = leadSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json({ error: "Niepoprawne dane formularza." }, { status: 400 })
    }

    const data = parsed.data

    // Honeypot: return success to avoid signaling bots.
    if (data.fax) {
      return NextResponse.json({ success: true })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return NextResponse.json({ error: "Brak konfiguracji RESEND_API_KEY." }, { status: 500 })
    }

    const resend = new Resend(resendApiKey)
    const toEmail = process.env.LEADS_TO_EMAIL ?? "hello@mediadna.studio"
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Media DNA Leads <onboarding@resend.dev>"

    const diagnosisList = data.diagnosisNeeds
      .map((item) => `<li>${diagnosisLabels[item] ?? item}</li>`)
      .join("")

    const meetingBlock =
      data.source === "calendar_configurator" && data.meetingDate && data.meetingSlot
        ? `<tr><th>Spotkanie</th><td>${data.meetingDate}, ${data.meetingSlot}</td></tr>`
        : `<tr><th>Spotkanie</th><td>Brak wybranego terminu</td></tr>`

    const html = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height:1.5; color:#111827;">
        <h2>Nowy lead - Media DNA</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tr><th align="left">Źródło</th><td>${data.source}</td></tr>
          ${meetingBlock}
          <tr><th align="left">Budżet</th><td>${data.budgetRange}</td></tr>
          <tr><th align="left">Link do audytu</th><td>${data.currentLink || "Nie podano"}</td></tr>
          <tr><th align="left">Imię</th><td>${data.name}</td></tr>
          <tr><th align="left">Telefon</th><td>${data.phone}</td></tr>
          <tr><th align="left">Email</th><td>${data.email || "Nie podano"}</td></tr>
        </table>
        <h3>Priorytety klienta (Diagnoza)</h3>
        <ul>${diagnosisList}</ul>
        <h3>Opis projektu / branża</h3>
        <p>${data.projectContext || "Brak"}</p>
      </body>
      </html>
    `

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email || undefined,
      subject: `Nowy lead: ${data.budgetRange} - ${data.name}`,
      html,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Nie udało się przetworzyć formularza." }, { status: 500 })
  }
}

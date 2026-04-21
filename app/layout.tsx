import type { Metadata } from "next"
import { Geist_Mono, Archivo, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ContactModalRoot } from "@/components/contact-modal-root"
import "./globals.css"

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Media DNA Studio — Pozyskuj klientów na autopilocie",
  description:
    "Budujemy systemy i marki, które nie dają o sobie zapomnieć. Strony WWW, design, wideo i reklamy dla marek premium.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pl"
      className={`${archivo.variable} ${geistMono.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        <ContactModalRoot />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export function BlogBackLink({
  href = "/blog",
  label = "Wróć do bloga",
  className,
}: {
  href?: string
  label?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      {label}
    </Link>
  )
}

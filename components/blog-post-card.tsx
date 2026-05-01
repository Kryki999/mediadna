import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { hrefBlogPost } from "@/lib/blog"

export type BlogCardPost = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  coverImage: string
}

export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString)
  const months = [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maja",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia",
  ]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export function BlogPostCard({
  post,
  className,
  featured = false,
  fromHome = false,
}: {
  post: BlogCardPost
  className?: string
  featured?: boolean
  /** Gdy true, URL ma ?from=home — wróć z artykułu na stronę główną (sekcja blog). */
  fromHome?: boolean
}) {
  return (
    <Link
      href={hrefBlogPost(post.slug, fromHome)}
      className={cn("post-card group", featured && "post-card--featured", className)}
    >
      <Image
        src={post.coverImage}
        alt={post.title}
        fill
        loading="lazy"
        quality={80}
        sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className="post-card__image"
      />
      <div className="post-card__gradient" aria-hidden />
      <div className="post-card__content">
        <div className="post-card__meta">
          <Calendar className="post-card__meta-icon" aria-hidden />
          {formatBlogDate(post.publishedAt)}
        </div>
        <h3 className={cn("post-card__title", featured && "post-card__title--featured")}>{post.title}</h3>
        {featured && post.excerpt ? <p className="post-card__excerpt">{post.excerpt}</p> : null}
        <div className="post-card__readmore">
          Czytaj więcej
          <ArrowRight className="post-card__readmore-icon" />
        </div>
      </div>
    </Link>
  )
}

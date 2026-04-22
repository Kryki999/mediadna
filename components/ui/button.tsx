import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        heroPrimary:
          'relative isolate overflow-hidden border border-[#4f6ea8] bg-[linear-gradient(180deg,#3a4f79_0%,#2d4166_52%,#243756_100%)] text-white shadow-[0_10px_30px_rgba(4,8,18,0.42)] before:pointer-events-none before:absolute before:inset-x-[2px] before:top-[2px] before:h-[44%] before:rounded-full before:bg-[linear-gradient(180deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.06)_55%,rgba(255,255,255,0)_100%)] hover:border-[#6f8fc9] hover:bg-[linear-gradient(180deg,#435b89_0%,#344b74_52%,#2a4062_100%)] hover:shadow-[0_16px_42px_rgba(4,8,18,0.58)] active:translate-y-px active:shadow-[0_8px_20px_rgba(4,8,18,0.38)]',
        heroSecondary:
          'border border-white/24 bg-white/[0.02] text-white backdrop-blur-[2px] hover:border-white/40 hover:bg-white/[0.07] hover:text-white hover:backdrop-blur-md active:translate-y-px',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        hero: 'h-12 rounded-full px-7 text-[0.95rem] font-medium tracking-[-0.01em] has-[>svg]:px-6',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

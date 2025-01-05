import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-violet-600 text-white shadow-lg shadow-violet-500/50 hover:bg-violet-700 hover:shadow-violet-600/50 hover:brightness-110",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glossy: "bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-lg shadow-violet-500/50 hover:from-violet-600 hover:to-violet-800 hover:shadow-violet-600/50 hover:brightness-110 relative overflow-hidden",
        "white-glossy": "bg-gradient-to-br from-white to-gray-200 text-gray-800 shadow-lg shadow-white/50 hover:from-gray-100 hover:to-white hover:shadow-gray-300/50 hover:brightness-120 relative overflow-hidden",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-14 rounded-md px-8 text-lg",
        icon: "h-12 w-12",
      },
      rounded: {
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "full",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {(variant === 'glossy' || variant === 'white-glossy') && (
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="absolute -inset-[100%] animate-[spin_5s_linear_infinite] bg-gradient-to-br from-transparent via-white/10 to-transparent blur-md"></span>
          </span>
        )}
        <span className="relative z-10">{props.children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }


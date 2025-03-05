import * as React from "react";

import { Icons } from "@/components/icons";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-normal rounded-md text-base ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-tight",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary hover:bg-primary/90 font-medium",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-transparent hover:bg-muted hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "bg-transparent hover:bg-muted/90 hover:text-accent-foreground text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        sideLink: "text-black rounded-none text-[.95rem] hover:bg-muted",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        disabled={loading}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}>
        {loading ? <Icons.loader className="mr-2" /> : null}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

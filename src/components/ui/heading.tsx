import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const headingVariants = cva("tracking-tight font-main text-foreground", {
  variants: {
    variant: {
      bold: "font-semibold",
      medium: "font-medium",
      base: "font-normal",
      light: "font-light",
      title: "leading-1",
      message: "text-center",
    },
    size: {
      huge: "text-6xl",
      big: "text-4xl",
      md: "text-3xl",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      xxl: "text-2xl",
      sm: "text-sm",
      title: "text-[1.8rem]",
    },
  },
  defaultVariants: {
    variant: "medium",
    size: "big",
  },
});

interface PageTitleProps
  extends React.ButtonHTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

export default function Heading({
  className,
  variant = "base",
  size = "base",
  ...props
}: PageTitleProps) {
  return (
    <h1
      className={cn(headingVariants({ variant, size, className }))}
      {...props}
    />
  );
}

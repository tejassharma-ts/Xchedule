import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const containerVariants = cva("w-full mx-auto px-8", {
  variants: {
    size: {
      default: "max-w-[1300px]",
      full: "max-w-full",
      lg: "max-w-6xl",
      md: "max-w-[800px]",
      sm: "max-w-2xl",
      main: "max-w-8xl"
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export default function Container({ className, size, ...props }) {
  return <div className={cn(containerVariants({ size, className }))} {...props} />;
}

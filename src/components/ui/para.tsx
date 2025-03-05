import { cn } from "@/lib/utils";

interface ParaProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export default function Para({ className, ...props }: ParaProps) {
  return <p className={cn("text-inherit font-light text-base", className)} {...props} />;
}

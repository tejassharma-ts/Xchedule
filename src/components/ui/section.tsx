import { cn } from "@/lib/utils";

export default function Section({
  children,
  alternate = false,
  border = false,
  className,
}) {
  return (
    <section
      className={cn(
        "py-10 sm:w-full px-0",
        {
          "bg-[#f3f3f3] border": alternate,
          "border-t-[3px] border-primary": border,
        },
        className,
      )}
    >
      {children}
    </section>
  );
}

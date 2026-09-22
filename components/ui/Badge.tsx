import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--border)] bg-white/80 px-3 py-1 text-sm font-medium text-[var(--brand-700)] shadow-sm backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}

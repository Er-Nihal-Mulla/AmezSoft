import type { ReactNode } from "react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  children,
  className
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty text-base leading-8 text-[var(--muted)] sm:text-lg">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}

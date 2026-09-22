import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "dark" | "ghost";

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-red-300";

const variants: Record<ButtonVariant, string> = {
  primary:
    "brand-gradient text-white shadow-[0_18px_38px_rgb(161_16_23/0.24)] hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgb(161_16_23/0.28)]",
  secondary:
    "border border-[var(--border)] bg-white text-[var(--foreground)] shadow-sm hover:-translate-y-0.5 hover:border-[var(--brand-300)] hover:text-[var(--brand-700)]",
  dark: "bg-[var(--foreground)] text-white shadow-[0_18px_38px_rgb(23_19_17/0.2)] hover:-translate-y-0.5 hover:bg-[var(--brand-900)]",
  ghost:
    "text-[var(--foreground)] hover:bg-[var(--surface-muted)] hover:text-[var(--brand-700)]"
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  showArrow?: boolean;
};

export function LinkButton({
  href,
  variant = "primary",
  children,
  className,
  showArrow = true,
  ...props
}: LinkButtonProps) {
  return (
    <Link href={href} className={cn(baseClasses, variants[variant], className)} {...props}>
      <span>{children}</span>
      {showArrow ? <ArrowRight aria-hidden="true" className="h-4 w-4" /> : null}
    </Link>
  );
}

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
  showArrow?: boolean;
};

export function ActionButton({
  variant = "primary",
  children,
  className,
  showArrow = false,
  type = "button",
  ...props
}: ActionButtonProps) {
  return (
    <button type={type} className={cn(baseClasses, variants[variant], className)} {...props}>
      <span>{children}</span>
      {showArrow ? <ArrowRight aria-hidden="true" className="h-4 w-4" /> : null}
    </button>
  );
}

import Image from "next/image";
import Link from "next/link";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "default" | "light";
  markOnly?: boolean;
  href?: string;
  className?: string;
};

function FallbackMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "brand-gradient inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black text-white shadow-[0_14px_28px_rgb(161_16_23/0.2)]",
        className
      )}
    >
      A
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  if (company.brandAssets.assetsPending) {
    return <FallbackMark className={className} />;
  }

  return (
    <Image
      src={company.brandAssets.logoMark}
      alt={`${company.name} mark`}
      width={44}
      height={44}
      className={cn("h-10 w-10 object-contain", className)}
      priority
    />
  );
}

export function LogoFull({ variant = "default", markOnly = false, className }: LogoProps) {
  if (!company.brandAssets.assetsPending && !markOnly) {
    return (
      <Image
        src={company.brandAssets.logoFull}
        alt={`${company.name} logo`}
        width={168}
        height={44}
        className={cn("h-11 w-auto object-contain", className)}
        priority
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark />
      {!markOnly ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-lg font-black",
              variant === "light" ? "text-white" : "text-[var(--foreground)]"
            )}
          >
            {company.name}
          </span>
          <span
            className={cn(
              "mt-1 text-xs font-semibold",
              variant === "light" ? "text-white/68" : "text-[var(--muted)]"
            )}
          >
            {company.supportingTagline}
          </span>
        </span>
      ) : null}
    </span>
  );
}

export function Logo({
  href = "/",
  variant = "default",
  markOnly = false,
  className
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center", className)}
      aria-label={`${company.name} home`}
    >
      <LogoFull variant={variant} markOnly={markOnly} />
    </Link>
  );
}

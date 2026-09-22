import { services } from "@/data/services";
import type { Service } from "@/types/site";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

type ServiceGridProps = {
  limit?: number;
  detailed?: boolean;
};

export function ServiceGrid({ limit, detailed = false }: ServiceGridProps) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visibleServices.map((service, index) => (
        <Reveal key={service.slug} delay={Math.min(index * 0.025, 0.18)}>
          <ServiceCard service={service} detailed={detailed} />
        </Reveal>
      ))}
    </div>
  );
}

function ServiceCard({ service, detailed }: { service: Service; detailed: boolean }) {
  return (
    <article
      id={service.slug}
      className="group h-full scroll-mt-28 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[var(--brand-300)] hover:shadow-[var(--shadow-tight)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--brand-700)] transition group-hover:bg-[var(--brand-500)] group-hover:text-white">
        <Icon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-bold text-[var(--foreground)]">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{service.summary}</p>
      <p className="mt-4 text-sm font-semibold leading-6 text-[var(--brand-700)]">
        {service.outcome}
      </p>

      {detailed ? (
        <details className="group/details mt-5">
          <summary className="cursor-pointer list-none text-sm font-bold text-[var(--foreground)] transition hover:text-[var(--brand-700)]">
            View details
          </summary>
          <div className="mt-4 grid gap-4">
            <ul className="grid gap-2 text-sm leading-6 text-[var(--muted)]">
              {service.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-500)]" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {service.capabilities.map((capability) => (
                <span
                  key={capability}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--muted)]"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        </details>
      ) : null}
    </article>
  );
}

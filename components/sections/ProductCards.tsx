import { ExternalLink } from "lucide-react";
import { products } from "@/data/products";
import { Icon } from "../ui/Icon";
import { LinkButton } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function ProductCards() {
  if (products.length === 0) {
    return (
      <Reveal>
        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase text-[var(--brand-700)]">Products</p>
          <h3 className="mt-4 text-balance text-3xl font-black text-[var(--foreground)]">
            We&apos;re building what comes next.
          </h3>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-8 text-[var(--muted)]">
            AmezSoft&apos;s product architecture is ready for future software products. When a
            product is approved for public release, it can be added through structured product
            data without redesigning this page.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {products.map((product, index) => (
        <Reveal key={product.name} delay={index * 0.05}>
          <article className="h-full rounded-3xl border border-[var(--border)] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[var(--brand-300)] hover:shadow-[var(--shadow-tight)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--brand-700)]">
                <Icon name={product.icon} className="h-7 w-7" />
              </div>
              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
                {product.status}
              </span>
            </div>
            <p className="mt-6 text-sm font-semibold text-[var(--brand-700)]">
              {product.category}
            </p>
            <h3 className="mt-2 text-2xl font-black text-[var(--foreground)]">
              {product.name}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              {product.shortDescription || product.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/products" variant="secondary">
                Learn More
              </LinkButton>
              {product.websiteUrl && !product.isPlaceholderUrl ? (
                <a
                  href={product.websiteUrl}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[var(--brand-700)] transition hover:bg-[var(--surface-muted)]"
                >
                  Website <ExternalLink aria-hidden="true" className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

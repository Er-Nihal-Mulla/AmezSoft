import { JsonLd } from "@/components/JsonLd";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { solutions } from "@/data/solutions";
import { breadcrumbJsonLd, createMetadata } from "@/features/seo/metadata";

export const metadata = createMetadata({
  title: "Solutions",
  description:
    "AmezSoft capabilities for startups, e-commerce, logistics, automation, marketplaces, enterprise systems, dashboards, and digital transformation.",
  path: "/solutions"
});

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" }
        ])}
      />
      <PageHero
        eyebrow="Solutions"
        title="Reusable solution patterns for real business workflows."
        description="These are AmezSoft capabilities, not claims about existing customers. They show the kinds of systems the company is structured to build."
      />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, index) => (
              <Reveal key={solution.title} delay={Math.min(index * 0.035, 0.18)}>
                <article className="h-full rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[var(--brand-300)] hover:shadow-[var(--shadow-tight)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--brand-700)]">
                    <Icon name={solution.icon} className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-xl font-bold text-[var(--foreground)]">
                    {solution.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {solution.summary}
                  </p>
                  <div className="mt-5 grid gap-2">
                    {solution.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="text-sm font-semibold text-[var(--brand-700)]"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaSection title="Turn a business workflow into a software system people can rely on." />
    </>
  );
}

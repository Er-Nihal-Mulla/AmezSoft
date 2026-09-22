import { technologyCategories } from "@/data/technologies";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function TechnologySection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Technology"
            title="A stack chosen by category, not a logo wall."
            description="The technology approach stays flexible. AmezSoft selects tools based on product needs, maintainability, and the realities of operating software after launch."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {technologyCategories.map((item, index) => (
            <Reveal key={item.category} delay={Math.min(index * 0.035, 0.18)}>
              <article className="h-full rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[var(--foreground)]">{item.category}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--muted)]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

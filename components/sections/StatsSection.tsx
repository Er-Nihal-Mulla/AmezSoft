import { stats } from "@/data/stats";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function StatsSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-4 rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-tight)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.04}>
              <div className="p-4">
                <p className="text-4xl font-black text-[var(--brand-700)]">{stat.value}</p>
                <h3 className="mt-2 text-sm font-bold uppercase text-[var(--foreground)]">
                  {stat.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{stat.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

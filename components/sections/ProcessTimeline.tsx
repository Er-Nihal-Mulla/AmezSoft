import { processSteps } from "@/data/process";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function ProcessTimeline() {
  return (
    <section className="bg-[var(--foreground)] py-20 text-white sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Development process"
            title="Discover, plan, design, build, test, launch, improve."
            description="The process keeps product decisions visible and technical work aligned with business value."
            className="[&_*]:text-white [&_p]:text-white/68"
          />
        </Reveal>
        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={Math.min(index * 0.035, 0.2)}>
              <li className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-[var(--brand-300)] hover:bg-white/[0.1]">
                <span className="text-sm font-black text-[var(--brand-300)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

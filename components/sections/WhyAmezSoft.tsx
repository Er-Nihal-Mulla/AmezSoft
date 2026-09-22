import { ShieldCheck, Target, Waypoints } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const reasons = [
  {
    title: "Outcome-first thinking",
    description: "Every build starts with the business change the software needs to create.",
    icon: Target
  },
  {
    title: "Engineering discipline",
    description:
      "The codebase is planned to stay understandable, secure, and ready for future teams.",
    icon: ShieldCheck
  },
  {
    title: "Transparent delivery",
    description:
      "Clear scopes, practical milestones, and honest communication keep decisions visible.",
    icon: Waypoints
  }
];

export function WhyAmezSoft() {
  return (
    <section className="bg-[var(--surface-muted)] py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why AmezSoft"
            title="Premium software work without inflated promises."
            description="AmezSoft is designed around credible product thinking, practical execution, and long-term maintainability."
            align="center"
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.05}>
              <article className="h-full border-l-4 border-[var(--brand-500)] bg-white p-7 shadow-sm">
                <reason.icon
                  aria-hidden="true"
                  className="h-7 w-7 text-[var(--brand-700)]"
                  strokeWidth={1.8}
                />
                <h3 className="mt-5 text-xl font-bold text-[var(--foreground)]">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {reason.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

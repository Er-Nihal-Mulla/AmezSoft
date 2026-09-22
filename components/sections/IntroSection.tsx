import { company } from "@/config/company";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function IntroSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <SectionHeading
            eyebrow="Company"
            title="Built for founders, operators, and teams who need software they can trust."
            description={company.shortDescription}
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid gap-5 text-pretty text-base leading-8 text-[var(--muted)] sm:text-lg">
            <p>
              AmezSoft exists to transform ideas into reliable software and help businesses use
              technology for sustainable growth. The focus is not just writing code; it is
              shaping the right product, engineering the right system, and keeping the
              foundation ready for what comes next.
            </p>
            <p>
              From websites and apps to SaaS platforms, AI-enabled workflows, cloud systems, and
              enterprise tools, AmezSoft works around clarity, quality, transparency, and
              long-term thinking.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

import { CtaSection } from "@/components/sections/CtaSection";
import { Hero } from "@/components/sections/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ProductCards } from "@/components/sections/ProductCards";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { StatsSection } from "@/components/sections/StatsSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { TestimonialsPlaceholder } from "@/components/sections/TestimonialsPlaceholder";
import { WhyAmezSoft } from "@/components/sections/WhyAmezSoft";
import { WorkCards } from "@/components/sections/WorkCards";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company, whatsappUrl } from "@/config/company";
import { solutions } from "@/data/solutions";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Core services"
                title="Software services shaped around business outcomes."
                description="AmezSoft covers the product lifecycle from planning and design to engineering, launch, and improvement."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <LinkButton href="/services" variant="secondary">
                View All Services
              </LinkButton>
            </Reveal>
          </div>
          <div className="mt-12">
            <ServiceGrid limit={6} />
          </div>
        </Container>
      </section>
      <WhyAmezSoft />
      <section className="bg-[var(--surface-muted)] py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Solutions"
                title="Capability patterns for startups, SMEs, enterprises, and growing teams."
                description="AmezSoft presents these as build capabilities, not unsupported claims about existing customers."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <LinkButton href="/solutions" variant="secondary">
                Explore Solutions
              </LinkButton>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.slice(0, 4).map((solution, index) => (
              <Reveal key={solution.title} delay={Math.min(index * 0.04, 0.16)}>
                <article className="h-full rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--brand-700)]">
                    <Icon name={solution.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[var(--foreground)]">
                    {solution.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {solution.summary}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <TechnologySection />
      <ProcessTimeline />
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Products"
              title="A reusable product ecosystem for future AmezSoft software."
              description="Product data is structured so new products can be added without rewriting the page design."
            />
          </Reveal>
          <div className="mt-12">
            <ProductCards />
          </div>
        </Container>
      </section>
      <section className="bg-[var(--surface-muted)] py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Work"
              title="Case-study structure ready for verified project proof."
              description="Real screenshots, outcomes, and links can be added when verified customer projects are approved for public use."
            />
          </Reveal>
          <div className="mt-12">
            <WorkCards />
          </div>
        </Container>
      </section>
      <StatsSection />
      <TestimonialsPlaceholder />
      <section className="py-20 sm:py-24">
        <Container className="grid gap-8 rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-tight)] lg:grid-cols-[1fr_0.9fr] lg:p-10">
          <Reveal>
            <SectionHeading
              eyebrow="Contact preview"
              title="Talk to AmezSoft about your next software project."
              description={`Reach AmezSoft from ${company.contact.location}. Business hours are ${company.contact.businessHours}.`}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-3 text-sm font-semibold text-[var(--muted)]">
              <p>Phone: {company.contact.phone}</p>
              <p>General: {company.contact.generalEmail}</p>
              <p>Sales: {company.contact.salesEmail}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <LinkButton href="/contact">Start a Project</LinkButton>
                <LinkButton href={whatsappUrl()} variant="secondary">
                  WhatsApp
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}

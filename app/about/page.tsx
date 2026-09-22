import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { breadcrumbJsonLd, createMetadata } from "@/features/seo/metadata";
import { JsonLd } from "@/components/JsonLd";

export const metadata = createMetadata({
  title: "About",
  description:
    "Learn how AmezSoft thinks about product strategy, engineering quality, customer success, and sustainable software growth.",
  path: "/about"
});

const values = [
  "Innovation",
  "Quality",
  "Transparency",
  "Ownership",
  "Continuous improvement",
  "Customer success",
  "Security",
  "Long-term thinking"
];

const storySections = [
  {
    title: "Our Story",
    body: "AmezSoft exists for the moment when an idea needs to become dependable software. The company is built around helping businesses move from scattered thoughts, manual workflows, and rough requirements into products that can be used, trusted, and improved."
  },
  {
    title: "Mission",
    body: "To transform business ideas into reliable software products and technology systems that support sustainable growth."
  },
  {
    title: "Vision",
    body: "To become a trusted software partner for teams that want technology to create real operating leverage, not temporary digital decoration."
  },
  {
    title: "How We Work",
    body: "AmezSoft works through discovery, planning, design, engineering, testing, launch, and improvement. Each stage keeps the business goal and the technical foundation connected."
  },
  {
    title: "Engineering Philosophy",
    body: "Software should be understandable, secure, maintainable, and ready for change. The best systems are not only impressive at launch; they remain practical after real users, new requirements, and business pressure arrive."
  },
  {
    title: "Why AmezSoft",
    body: "AmezSoft combines product thinking, clean execution, and transparent communication so businesses can build serious digital products without losing clarity along the way."
  }
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" }
        ])}
      />
      <PageHero
        eyebrow="About AmezSoft"
        title="Software should move the business forward and stay strong after launch."
        description="AmezSoft turns ideas into reliable digital products through thoughtful strategy, disciplined engineering, and long-term product ownership."
      />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {storySections.map((section, index) => (
              <Reveal key={section.title} delay={Math.min(index * 0.04, 0.18)}>
                <article className="h-full rounded-3xl border border-[var(--border)] bg-white p-7 shadow-sm">
                  <h2 className="text-2xl font-bold text-[var(--foreground)]">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-pretty text-sm leading-7 text-[var(--muted)]">
                    {section.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-[var(--surface-muted)] py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Values"
              title="The principles behind the work."
              description="These values guide product conversations, engineering decisions, and client collaboration."
            />
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value} delay={Math.min(index * 0.035, 0.18)}>
                <div className="rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-bold text-[var(--foreground)] shadow-sm">
                  {value}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaSection title="Build with a team that respects the idea and the system behind it." />
    </>
  );
}

import { CareerForm } from "@/components/forms/CareerForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { benefits, jobs } from "@/data/careers";
import { breadcrumbJsonLd, createMetadata } from "@/features/seo/metadata";

export const metadata = createMetadata({
  title: "Careers",
  description:
    "Explore future career opportunities at AmezSoft. No open positions are listed right now, but general applications are welcome.",
  path: "/careers"
});

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" }
        ])}
      />
      <PageHero
        eyebrow="Careers"
        title="Build serious software with ownership, clarity, and care."
        description="AmezSoft is preparing a careers foundation that can later connect to an admin dashboard or CMS-managed hiring system."
      />
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Culture"
                title="A place for people who care about craft and useful outcomes."
                description="The working culture is shaped around thoughtful engineering, direct communication, continuous improvement, and the belief that good software should make work easier."
              />
            </Reveal>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <Reveal key={benefit} delay={Math.min(index * 0.035, 0.18)}>
                  <div className="rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-bold text-[var(--foreground)] shadow-sm">
                    {benefit}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.08}>
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-muted)] p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Open positions</h2>
              {jobs.length > 0 ? (
                <div className="mt-6 grid gap-4">
                  {jobs.map((job) => (
                    <article key={job.title} className="rounded-2xl bg-white p-5 shadow-sm">
                      <h3 className="font-bold text-[var(--foreground)]">{job.title}</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {job.location} | {job.type}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                        {job.summary}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-5 rounded-2xl bg-white p-5 text-sm font-semibold leading-7 text-[var(--muted)] shadow-sm">
                  No open positions right now, but we are always interested in exceptional
                  people.
                </p>
              )}
            </div>
          </Reveal>
        </Container>
      </section>
      <section className="bg-[var(--surface-muted)] py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="General application"
              title="Introduce yourself for future opportunities."
              description="This form is validated and ready to connect to a real hiring workflow later."
            />
          </Reveal>
          <div className="mt-10 max-w-3xl">
            <CareerForm />
          </div>
        </Container>
      </section>
    </>
  );
}

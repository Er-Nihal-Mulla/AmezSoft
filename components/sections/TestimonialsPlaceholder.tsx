import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function TestimonialsPlaceholder() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-muted)] p-8 sm:p-10">
            <SectionHeading
              eyebrow="Testimonials"
              title="Client stories will be added only when they are real and approved."
              description="This section is ready for verified testimonials, names, roles, company links, and proof points. Until then, it avoids fake praise and placeholder quotes."
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

import { company } from "@/config/company";
import { LinkButton } from "../ui/Button";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

type CtaSectionProps = {
  title?: string;
  description?: string;
};

export function CtaSection({
  title = "Have an idea worth building?",
  description = "Start with a focused conversation about the product, the business problem, and the path to a reliable first version."
}: CtaSectionProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="brand-gradient relative overflow-hidden rounded-[2rem] p-8 text-white shadow-[var(--shadow-soft)] sm:p-12">
            <div
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl"
              aria-hidden="true"
            />
            <p className="text-sm font-bold uppercase text-white/70">{company.tagline}</p>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-black leading-tight sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-white/78 sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/contact"
                variant="dark"
                className="bg-white text-[var(--brand-800)] hover:bg-white/90"
              >
                Start a Project
              </LinkButton>
              <LinkButton
                href="/work"
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                View Work
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

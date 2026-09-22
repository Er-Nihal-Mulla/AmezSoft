import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Badge } from "../ui/Badge";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface-muted)] py-20 sm:py-24">
      <div className="absolute inset-0 bg-grid opacity-55" aria-hidden="true" />
      <Container className="relative">
        <Reveal>
          <div className="max-w-4xl">
            <Badge>{eyebrow}</Badge>
            <h1 className="mt-6 text-balance text-4xl font-black leading-tight text-[var(--foreground)] sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-[var(--muted)] sm:text-xl">
              {description}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

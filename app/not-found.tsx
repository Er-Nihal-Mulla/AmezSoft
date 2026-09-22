import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase text-[var(--brand-700)]">404</p>
          <h1 className="mt-4 text-4xl font-black text-[var(--foreground)] sm:text-6xl">
            Page not found
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-[var(--muted)]">
            The page you are looking for does not exist or has moved.
          </p>
          <div className="mt-8 flex justify-center">
            <LinkButton href="/">Back to Home</LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

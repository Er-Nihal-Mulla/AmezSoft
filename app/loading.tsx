import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto h-3 max-w-xl overflow-hidden rounded-full bg-[var(--surface-muted)]">
          <div className="brand-gradient h-full w-1/3 animate-pulse rounded-full" />
        </div>
      </Container>
    </section>
  );
}

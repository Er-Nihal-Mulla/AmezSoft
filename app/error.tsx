"use client";

import { useEffect } from "react";
import { ActionButton, LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase text-[var(--brand-700)]">
            Application error
          </p>
          <h1 className="mt-4 text-4xl font-black text-[var(--foreground)] sm:text-6xl">
            Something needs attention
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-[var(--muted)]">
            The page could not be rendered. You can retry or return to the homepage.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ActionButton onClick={reset}>Try Again</ActionButton>
            <LinkButton href="/" variant="secondary">
              Back to Home
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

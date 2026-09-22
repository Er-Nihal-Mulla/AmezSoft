import { company } from "@/config/company";
import { LinkButton } from "../ui/Button";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { LogoMark } from "../layout/Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--brand-400)]/18 blur-3xl sm:h-96 sm:w-96"
        aria-hidden="true"
      />
      <Container className="relative grid min-h-[calc(100vh-5rem)] items-center gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
        <Reveal>
          <div>
            <p className="inline-flex rounded-full border border-[var(--brand-300)]/40 bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--brand-700)] shadow-sm backdrop-blur">
              {company.supportingTagline}
            </p>
            <h1 className="mt-7 max-w-4xl text-balance text-5xl font-black leading-[1.03] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              {company.tagline}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-[var(--muted)] sm:text-xl">
              Turning ideas into software that moves businesses forward. AmezSoft transforms
              business goals into scalable digital products, platforms, and technology systems
              built for long-term growth.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/contact">Start Your Project</LinkButton>
              <LinkButton href="/services" variant="secondary">
                Explore Our Services
              </LinkButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-xl">
            <div
              className="absolute -inset-8 rounded-[2rem] bg-[var(--brand-500)]/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-5">
                <div className="flex items-center gap-3">
                  <LogoMark className="h-12 w-12 rounded-2xl" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      AmezSoft Studio
                    </p>
                    <p className="text-xs text-[var(--muted)]">Product build system</p>
                  </div>
                </div>
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-300)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {[
                  ["Idea", "Product strategy and roadmap"],
                  ["Build", "Design, engineering, and integrations"],
                  ["Launch", "Cloud-ready release and improvement"]
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-white p-4 transition hover:-translate-y-1 hover:border-[var(--brand-300)] hover:shadow-[var(--shadow-tight)]"
                  >
                    <span className="brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[var(--foreground)]">{label}</p>
                      <p className="text-sm text-[var(--muted)]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-[var(--foreground)] p-5 text-white">
                <p className="text-sm font-semibold text-white/68">Delivery signal</p>
                <p className="mt-2 text-2xl font-black">
                  Scalable products. Clear systems. Better tomorrow.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

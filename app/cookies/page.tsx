import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { breadcrumbJsonLd, createMetadata } from "@/features/seo/metadata";

export const metadata = createMetadata({
  title: "Cookie Policy",
  description:
    "AmezSoft cookie policy placeholder for current and future website tracking choices.",
  path: "/cookies"
});

export default function CookiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookies" }
        ])}
      />
      <PageHero
        eyebrow="Legal"
        title="Cookie Policy"
        description="The current site does not require marketing cookies. Add analytics and consent details here if tracking is introduced."
      />
      <section className="py-20 sm:py-24">
        <Container size="content">
          <div className="mx-auto grid max-w-3xl gap-6">
            {[
              [
                "Essential cookies",
                "The website may use essential browser storage or platform cookies needed for secure operation."
              ],
              [
                "Analytics cookies",
                "Analytics tools are not configured in this implementation. Add provider details before enabling them."
              ],
              [
                "Marketing cookies",
                "Marketing pixels are not configured in this implementation."
              ],
              [
                "Managing cookies",
                "Visitors can manage cookies through browser settings and any future consent controls."
              ]
            ].map(([title, body]) => (
              <article
                key={title}
                className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-[var(--foreground)]">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

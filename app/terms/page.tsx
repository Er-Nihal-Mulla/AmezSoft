import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { company } from "@/config/company";
import { breadcrumbJsonLd, createMetadata } from "@/features/seo/metadata";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  description: "AmezSoft terms and conditions placeholder pending formal legal review.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" }
        ])}
      />
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Final terms should be reviewed by a qualified professional before publishing as binding policy."
      />
      <section className="py-20 sm:py-24">
        <Container size="content">
          <div className="mx-auto grid max-w-3xl gap-6">
            {[
              [
                "Website use",
                "Visitors should use this website lawfully and avoid interfering with its operation."
              ],
              [
                "Service enquiries",
                "Submitting an enquiry does not create a contract or guarantee project acceptance."
              ],
              [
                "Intellectual property",
                "AmezSoft brand assets, site copy, and design should not be reused without permission."
              ],
              ["Liability", "Formal liability terms are pending legal review."],
              ["Company details", company.legalName]
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

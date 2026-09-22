import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { company } from "@/config/company";
import { breadcrumbJsonLd, createMetadata } from "@/features/seo/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "AmezSoft privacy policy placeholder pending formal legal review.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" }
        ])}
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="This page is structured for production use, but final legal language should be reviewed before launch."
      />
      <LegalContent
        items={[
          [
            "Information we collect",
            "Project enquiry and application forms may collect contact details and submitted messages."
          ],
          [
            "Project enquiries",
            "Contact forms and chatbot lead forms may collect name, email, mobile number, company name, service interest, project requirements, page URL, language, and submission timestamp."
          ],
          [
            "Chatbot and AI processing",
            "The chatbot may send recent visitor messages to a server-side AI service to generate a response. API keys are kept on the server. Full conversation history is not emailed with leads in this phase."
          ],
          [
            "Email communication",
            "Submitted enquiries may be delivered to AmezSoft email inboxes for general, sales, or support follow-up."
          ],
          [
            "How information is used",
            "Submissions are used to respond to enquiries, evaluate project fit, and manage requested communication."
          ],
          [
            "Data sharing",
            "AmezSoft should not sell personal information. Any future analytics, email, CRM, or AI providers should be documented here before launch."
          ],
          ["Retention", "Retention periods are pending formal policy decisions."],
          ["Contact", company.legal.privacyEmail ?? "Privacy contact email pending."]
        ]}
      />
    </>
  );
}

function LegalContent({ items }: { items: [string, string][] }) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto grid max-w-3xl gap-6">
          {items.map(([title, body]) => (
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
  );
}

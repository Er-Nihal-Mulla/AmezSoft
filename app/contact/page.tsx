import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company, whatsappUrl } from "@/config/company";
import { breadcrumbJsonLd, createMetadata } from "@/features/seo/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Start a project enquiry with AmezSoft for web apps, mobile apps, SaaS products, custom software, AI automation, cloud, and business systems.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" }
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="Tell AmezSoft what you want to build."
        description="Share the product idea, workflow, platform, or business problem. The form is designed to capture enough context for a focused first conversation."
      />
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="Project enquiry"
                title="Start with clarity."
                description="Tell us what you want to build. Submissions are validated server-side and routed through a replaceable email provider interface."
              />
              <div className="mt-8 grid gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--surface-muted)] p-6 text-sm leading-7 text-[var(--muted)]">
                <ContactItem label="Phone" value={company.contact.phone} />
                <ContactItem label="WhatsApp" value={company.contact.whatsapp} />
                <ContactItem label="General Email" value={company.contact.generalEmail} />
                <ContactItem label="Sales Email" value={company.contact.salesEmail} />
                <ContactItem label="Support Email" value={company.contact.supportEmail} />
                <ContactItem label="Location" value={company.contact.location} />
                <ContactItem label="Business Hours" value={company.contact.businessHours} />
                <div className="pt-2">
                  <LinkButton href={whatsappUrl()} variant="secondary">
                    Chat on WhatsApp
                  </LinkButton>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase text-[var(--brand-700)]">{label}</p>
      <p className="mt-1 font-semibold text-[var(--foreground)]">{value}</p>
    </div>
  );
}

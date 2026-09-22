import { JsonLd } from "@/components/JsonLd";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Container } from "@/components/ui/Container";
import { breadcrumbJsonLd, createMetadata, serviceJsonLd } from "@/features/seo/metadata";
import { services } from "@/data/services";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Explore AmezSoft services across web development, mobile apps, custom software, SaaS development, AI solutions, UI/UX, cloud and DevOps, and e-commerce.",
  path: "/services"
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" }
        ])}
      />
      {services.map((service) => (
        <JsonLd
          key={service.slug}
          data={serviceJsonLd(service.title, service.summary, `/services#${service.slug}`)}
        />
      ))}
      <PageHero
        eyebrow="Services"
        title="Technology services for products, platforms, and business systems."
        description="Each service is built around business outcomes first, then the architecture, interfaces, and delivery practices needed to support them."
      />
      <section className="py-20 sm:py-24">
        <Container>
          <ServiceGrid detailed />
        </Container>
      </section>
      <ProcessTimeline />
      <CtaSection title="Ready to shape the right service scope for your product?" />
    </>
  );
}

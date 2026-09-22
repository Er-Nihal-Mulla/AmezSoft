import { JsonLd } from "@/components/JsonLd";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCards } from "@/components/sections/ProductCards";
import { Container } from "@/components/ui/Container";
import { breadcrumbJsonLd, createMetadata } from "@/features/seo/metadata";

export const metadata = createMetadata({
  title: "Products",
  description:
    "Explore AmezSoft's future-ready product architecture. Public products will appear here only after they are explicitly configured and published.",
  path: "/products"
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" }
        ])}
      />
      <PageHero
        eyebrow="Products"
        title="A product page built to grow with the AmezSoft ecosystem."
        description="No public product list has been configured yet. This page is ready for approved products when AmezSoft chooses to publish them."
      />
      <section className="py-20 sm:py-24">
        <Container>
          <ProductCards />
        </Container>
      </section>
      <CtaSection title="Planning a product ecosystem or platform?" />
    </>
  );
}

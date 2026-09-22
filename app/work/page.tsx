import { JsonLd } from "@/components/JsonLd";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { WorkCards } from "@/components/sections/WorkCards";
import { Container } from "@/components/ui/Container";
import { breadcrumbJsonLd, createMetadata } from "@/features/seo/metadata";

export const metadata = createMetadata({
  title: "Work",
  description:
    "AmezSoft case-study structure for approved projects, including challenge, solution, technologies, screenshots, results, and links.",
  path: "/work"
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" }
        ])}
      />
      <PageHero
        eyebrow="Our Work"
        title="Case studies without fake numbers."
        description="The work system is ready for verified projects, screenshots, links, and outcomes. No fictional client case studies are presented."
      />
      <section className="py-20 sm:py-24">
        <Container>
          <WorkCards />
        </Container>
      </section>
      <CtaSection title="Have a project that should become the next real case study?" />
    </>
  );
}

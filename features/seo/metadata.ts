import type { Metadata } from "next";
import { company } from "@/config/company";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = []
}: MetadataInput): Metadata {
  const url = new URL(path, company.siteUrl);
  const fullTitle =
    path === "/" ? `${company.name} | ${company.tagline}` : `${title} | ${company.name}`;

  return {
    metadataBase: new URL(company.siteUrl),
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: url.pathname
    },
    openGraph: {
      title: fullTitle,
      description,
      url: url.toString(),
      siteName: company.name,
      locale: company.locale,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    url: company.siteUrl,
    slogan: company.tagline,
    description: company.description,
    sameAs: company.social.filter((item) => !item.isPlaceholder).map((item) => item.href)
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: company.siteUrl,
    description: company.shortDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${company.siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, company.siteUrl).toString()
    }))
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: company.name,
      url: company.siteUrl
    },
    url: new URL(path, company.siteUrl).toString()
  };
}

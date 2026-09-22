import { company } from "@/config/company";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";

const publishedProducts = products.filter((product) => product.published);

export function chatbotKnowledge() {
  return [
    `Brand: ${company.name}`,
    `Legal name proposal/configuration: ${company.legalName}. Do not claim incorporation, registration, certification, GST, CIN, trademark, awards, partnerships, customers, team size, or years of experience unless explicitly present in approved knowledge.`,
    `Tagline: ${company.tagline}`,
    `Secondary tagline: ${company.supportingTagline}`,
    `Description: ${company.description}`,
    `Service area: ${company.serviceArea}`,
    `Location: ${company.contact.location}`,
    `Business hours: ${company.contact.businessHours}`,
    `Phone: ${company.contact.phone}`,
    `WhatsApp: ${company.contact.whatsapp}`,
    `General email: ${company.contact.generalEmail}`,
    `Sales email: ${company.contact.salesEmail}`,
    `Support email: ${company.contact.supportEmail}`,
    `Website: ${company.siteUrl}`,
    `Public social profile: Instagram ${company.social[0]?.href ?? "not configured"}`,
    `Services: ${services.map((service) => `${service.title}: ${service.summary}`).join(" | ")}`,
    `Solutions/capabilities: ${solutions.map((solution) => solution.title).join(", ")}`,
    publishedProducts.length
      ? `Published products: ${publishedProducts.map((product) => `${product.name}: ${product.shortDescription}`).join(" | ")}`
      : "Published products: none configured yet."
  ].join("\n");
}

export const chatbotQuickActions = [
  "Our Services",
  "Start a Project",
  "Contact AmezSoft",
  "WhatsApp",
  "About AmezSoft"
] as const;

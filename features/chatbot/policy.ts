import { company, whatsappUrl } from "@/config/company";
import { services } from "@/data/services";

export type ChatPolicyResult = {
  handled: boolean;
  reply?: string;
  handoff?: boolean;
  intent?:
    "pricing" | "careers" | "nivad" | "human" | "services" | "contact" | "about" | "whatsapp";
};

const pricingTerms = [
  "price",
  "pricing",
  "cost",
  "budget",
  "charges",
  "quote",
  "quotation",
  "rate",
  "kitna",
  "paisa"
];
const careerTerms = [
  "career",
  "careers",
  "job",
  "jobs",
  "hiring",
  "internship",
  "resume",
  "vacancy"
];
const humanTerms = [
  "human",
  "person",
  "agent",
  "team",
  "call me",
  "talk to someone",
  "support"
];

export function evaluateChatPolicy(input: string): ChatPolicyResult {
  const normalized = input.toLowerCase();

  if (normalized.includes("nivad")) {
    return {
      handled: true,
      intent: "nivad",
      reply:
        "I can help with AmezSoft's public services, company information, contact options, and published products. For anything else, please contact the AmezSoft team directly."
    };
  }

  if (pricingTerms.some((term) => normalized.includes(term))) {
    return {
      handled: true,
      intent: "pricing",
      reply:
        "Every project is different, so AmezSoft provides pricing after understanding the requirements. I can help you start a project enquiry or connect you with the team."
    };
  }

  if (careerTerms.some((term) => normalized.includes(term))) {
    return {
      handled: true,
      intent: "careers",
      reply: `I do not have current career openings to share. For opportunities, please contact AmezSoft through ${company.contact.generalEmail} or the contact form.`
    };
  }

  if (humanTerms.some((term) => normalized.includes(term))) {
    return {
      handled: true,
      intent: "human",
      handoff: true,
      reply: `You can reach the AmezSoft team by email at ${company.contact.generalEmail}, sales at ${company.contact.salesEmail}, support at ${company.contact.supportEmail}, or through the contact form.`
    };
  }

  if (normalized.includes("service")) {
    return {
      handled: true,
      intent: "services",
      reply: `AmezSoft provides ${services.map((service) => service.title).join(", ")}. If you share what you want to build, I can guide you to the right service.`
    };
  }

  if (normalized.includes("whatsapp")) {
    return {
      handled: true,
      intent: "whatsapp",
      reply: `You can message AmezSoft on WhatsApp here: ${whatsappUrl()}`
    };
  }

  if (
    normalized.includes("contact") ||
    normalized.includes("email") ||
    normalized.includes("phone")
  ) {
    return {
      handled: true,
      intent: "contact",
      reply: `You can contact AmezSoft at ${company.contact.phone}, WhatsApp ${company.contact.whatsapp}, general email ${company.contact.generalEmail}, sales ${company.contact.salesEmail}, or support ${company.contact.supportEmail}. Location: ${company.contact.location}.`
    };
  }

  if (normalized.includes("about") || normalized.includes("amezsoft")) {
    return {
      handled: true,
      intent: "about",
      reply: `${company.name} builds modern digital products and software solutions that help businesses innovate, scale, and grow. The team serves businesses worldwide from ${company.contact.location}.`
    };
  }

  return { handled: false };
}

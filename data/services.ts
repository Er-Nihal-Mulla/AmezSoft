import type { Service } from "@/types/site";

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    summary:
      "Modern websites, portals, and web applications built for credibility, speed, and growth.",
    outcome:
      "Turn a business idea or workflow into a polished web experience customers can trust.",
    details: [
      "Corporate websites, landing systems, portals, dashboards, and product interfaces",
      "Architecture that can support content, integrations, analytics, and future backend systems",
      "Performance, accessibility, SEO, and maintainability built into delivery"
    ],
    capabilities: ["Next.js", "React", "TypeScript", "SEO", "Dashboards"],
    icon: "appWindow"
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    summary: "Mobile-first digital products for customers, teams, and business workflows.",
    outcome:
      "Reach users on the devices they already use with an experience designed for daily use.",
    details: [
      "iOS and Android product planning with reusable architecture",
      "Account flows, notifications, commerce, media, and operational workflows",
      "Mobile-friendly backend integration and release readiness"
    ],
    capabilities: ["React Native", "Mobile UX", "Push notifications", "Offline states"],
    icon: "smartphone"
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    summary: "Purpose-built systems for workflows that generic software cannot handle well.",
    outcome: "Replace scattered manual processes with software shaped around the business.",
    details: [
      "Discovery-led product definition before engineering begins",
      "Workflow automation, permission models, reporting, and integrations",
      "Maintainable systems that can evolve without becoming fragile"
    ],
    capabilities: ["Workflow design", "Integrations", "Reporting", "Internal tools"],
    icon: "code2"
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    summary: "Multi-tenant SaaS foundations for subscription products and digital platforms.",
    outcome: "Move from idea to scalable product with the right technical foundation early.",
    details: [
      "Tenant-aware data models, plans, permissions, and onboarding",
      "Product analytics, billing readiness, and admin operations",
      "Architecture designed for future teams, features, and markets"
    ],
    capabilities: ["Multi-tenancy", "Billing readiness", "Product analytics", "Admin tools"],
    icon: "layers3"
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    summary: "Applied AI features and automation designed around practical business outcomes.",
    outcome: "Use AI where it improves speed, insight, support, or internal efficiency.",
    details: [
      "AI-assisted workflows, knowledge assistants, search, summarization, and classification",
      "Automation for internal operations and customer-facing processes",
      "Guardrails, review flows, and human handoff patterns for safer AI experiences"
    ],
    capabilities: ["Chatbots", "Automation", "Search", "Knowledge workflows"],
    icon: "bot"
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    summary:
      "Clear, premium interfaces that make digital products easier to understand and use.",
    outcome: "Give users a product experience that feels credible, focused, and efficient.",
    details: [
      "Product flows, wireframes, high-fidelity interfaces, and design systems",
      "Information architecture for dashboards, portals, and commerce experiences",
      "Practical design decisions grounded in user goals and business outcomes"
    ],
    capabilities: ["Product strategy", "Design systems", "Prototyping", "Accessibility"],
    icon: "figma"
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    summary:
      "Deployment, automation, monitoring, and cloud foundations for dependable releases.",
    outcome:
      "Ship faster with infrastructure that is observable, repeatable, and easier to operate.",
    details: [
      "Cloud-ready deployment architecture and environment planning",
      "CI/CD, containerization, release workflows, and rollback readiness",
      "Monitoring, logging, reliability, and security-aware operations"
    ],
    capabilities: ["Cloud architecture", "Docker", "CI/CD", "Monitoring"],
    icon: "cloud"
  },
  {
    slug: "e-commerce-development",
    title: "E-commerce Development",
    summary: "Commerce platforms, storefronts, vendor flows, and operational tooling.",
    outcome:
      "Build commerce experiences that support buying, selling, fulfillment, and growth.",
    details: [
      "Product catalogs, checkout flows, orders, inventory, and customer accounts",
      "Marketplace and vendor-management patterns",
      "Integration-ready architecture for payments, shipping, and analytics"
    ],
    capabilities: ["Storefronts", "Marketplaces", "Checkout", "Catalogs", "Orders"],
    icon: "shoppingCart"
  }
];

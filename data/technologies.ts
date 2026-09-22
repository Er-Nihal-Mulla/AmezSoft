import type { TechnologyCategory } from "@/types/site";

export const technologyCategories: TechnologyCategory[] = [
  {
    category: "Frontend",
    description: "Interfaces that are fast, accessible, responsive, and maintainable.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    category: "Backend",
    description: "APIs, services, authentication, permissions, and business logic.",
    technologies: ["Node.js", "Express", "REST APIs", "Server Components"]
  },
  {
    category: "Mobile",
    description: "Mobile products and companion apps for customer and team workflows.",
    technologies: ["React Native", "Mobile UX", "Push notifications"]
  },
  {
    category: "Database",
    description: "Structured data foundations selected for the product's needs.",
    technologies: ["PostgreSQL", "MongoDB", "Redis", "Prisma-ready architecture"]
  },
  {
    category: "Cloud",
    description: "Cloud-ready deployments with reliability, observability, and scale in mind.",
    technologies: ["AWS", "Azure", "Vercel", "Object storage"]
  },
  {
    category: "DevOps",
    description: "Repeatable delivery workflows for releases, monitoring, and operations.",
    technologies: ["Docker", "CI/CD", "GitHub Actions", "Monitoring"]
  },
  {
    category: "AI",
    description:
      "Applied AI features that improve search, automation, insights, and workflows.",
    technologies: ["LLM workflows", "Automation", "Vector search", "AI guardrails"]
  }
];

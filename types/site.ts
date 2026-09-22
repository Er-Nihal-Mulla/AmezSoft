export type NavItem = {
  label: string;
  href: string;
};

export type IconName =
  | "appWindow"
  | "bot"
  | "briefcaseBusiness"
  | "chartNoAxesCombined"
  | "cloud"
  | "code2"
  | "database"
  | "figma"
  | "globe2"
  | "layers3"
  | "layoutDashboard"
  | "lightbulb"
  | "lockKeyhole"
  | "messagesSquare"
  | "rocket"
  | "serverCog"
  | "shoppingCart"
  | "smartphone"
  | "sparkles"
  | "workflow";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  details: string[];
  capabilities: string[];
  icon: IconName;
};

export type Solution = {
  title: string;
  summary: string;
  capabilities: string[];
  icon: IconName;
};

export type Product = {
  name: string;
  slug: string;
  logo?: string;
  shortDescription: string;
  description: string;
  longDescription?: string;
  status: string;
  category: string;
  websiteUrl?: string;
  isPlaceholderUrl?: boolean;
  screenshots?: string[];
  features?: string[];
  technologies?: string[];
  seo?: {
    title: string;
    description: string;
  };
  published: boolean;
  icon: IconName;
};

export type WorkSample = {
  name: string;
  industry: string;
  challenge: string;
  solution: string;
  technologies: string[];
  result: string;
  projectLink?: string;
  isSample: boolean;
};

export type TechnologyCategory = {
  category: string;
  description: string;
  technologies: string[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Job = {
  title: string;
  location: string;
  type: string;
  summary: string;
};

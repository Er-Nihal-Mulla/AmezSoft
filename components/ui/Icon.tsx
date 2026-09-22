import {
  AppWindow,
  Bot,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Cloud,
  Code2,
  Database,
  Globe2,
  Layers3,
  LayoutDashboard,
  Lightbulb,
  LockKeyhole,
  MessagesSquare,
  Rocket,
  ServerCog,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Workflow,
  type LucideIcon
} from "lucide-react";
import type { IconName } from "@/types/site";

const icons: Record<IconName, LucideIcon> = {
  appWindow: AppWindow,
  bot: Bot,
  briefcaseBusiness: BriefcaseBusiness,
  chartNoAxesCombined: ChartNoAxesCombined,
  cloud: Cloud,
  code2: Code2,
  database: Database,
  figma: Layers3,
  globe2: Globe2,
  layers3: Layers3,
  layoutDashboard: LayoutDashboard,
  lightbulb: Lightbulb,
  lockKeyhole: LockKeyhole,
  messagesSquare: MessagesSquare,
  rocket: Rocket,
  serverCog: ServerCog,
  shoppingCart: ShoppingCart,
  smartphone: Smartphone,
  sparkles: Sparkles,
  workflow: Workflow
};

type IconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

export function Icon({ name, className, strokeWidth = 1.8 }: IconProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}

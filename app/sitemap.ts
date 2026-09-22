import type { MetadataRoute } from "next";
import { company } from "@/config/company";

const routes = [
  "/",
  "/about",
  "/services",
  "/solutions",
  "/products",
  "/work",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, company.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}

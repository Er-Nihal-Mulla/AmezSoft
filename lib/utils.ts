import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function absoluteUrl(path = "/") {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amezsoft.com";
  return new URL(path, siteUrl).toString();
}

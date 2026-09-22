import type { ReactNode } from "react";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { AmezSoftChatbot } from "@/components/chatbot/AmezSoftChatbot";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/features/seo/metadata";

export const metadata = createMetadata({
  title: "AmezSoft",
  description:
    "AmezSoft builds software products, business applications, websites, mobile apps, SaaS platforms, AI-enabled solutions, cloud systems, and custom enterprise software.",
  path: "/"
});

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <AmezSoftChatbot />
      </body>
    </html>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { company, whatsappUrl } from "@/config/company";
import { legalNavigation, mainNavigation } from "@/data/navigation";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { containerClassName } from "../ui/Container";
import { Logo } from "./Logo";

const serviceLinks = services.slice(0, 6);
const solutionLinks = solutions.slice(0, 5);

export function Footer() {
  return (
    <footer className="bg-[var(--surface-strong)] text-white">
      <div className={containerClassName("wide", "py-16")}>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-md text-pretty text-sm leading-7 text-white/68">
              {company.shortDescription}
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/72">
              <p className="font-semibold text-white">Contact</p>
              <p className="mt-2">{company.contact.phone}</p>
              <p>{company.contact.generalEmail}</p>
              <p>{company.contact.location}</p>
              <p>{company.contact.businessHours}</p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FooterColumn title="Services">
              {serviceLinks.map((service) => (
                <Link key={service.slug} href="/services">
                  {service.title}
                </Link>
              ))}
            </FooterColumn>
            <FooterColumn title="Company">
              {mainNavigation
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
            </FooterColumn>
            <FooterColumn title="Solutions">
              {solutionLinks.map((solution) => (
                <Link key={solution.title} href="/solutions">
                  {solution.title}
                </Link>
              ))}
              <Link href="/work">Case studies</Link>
              <Link href="/products">Products</Link>
            </FooterColumn>
            <FooterColumn title="Resources">
              {legalNavigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              {company.social.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              ))}
              <a href={whatsappUrl()} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>{company.contact.location}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <div className="mt-4 grid gap-3 text-sm text-white/62 [&_a]:transition [&_a:hover]:text-white">
        {children}
      </div>
    </div>
  );
}

import type { CareerApplicationInput, ContactInput } from "@/lib/validation";
import type { MailProvider, MailResult } from "./types";

function redactEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!domain) {
    return "redacted";
  }

  return `${name.slice(0, 2)}***@${domain}`;
}

function safeLog(label: string, payload: Record<string, unknown>) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  console.info(label, payload);
}

export class DevelopmentMailProvider implements MailProvider {
  async sendProjectEnquiry(input: ContactInput): Promise<MailResult> {
    safeLog("AmezSoft project enquiry received", {
      name: input.name,
      email: redactEmail(input.email),
      company: input.companyName || "Not provided",
      service: input.service,
      preferredContact: input.preferredContact,
      requirementLength: input.requirement.length
    });

    return { ok: true, provider: "development-log" };
  }

  async sendCareerApplication(input: CareerApplicationInput): Promise<MailResult> {
    safeLog("AmezSoft career application received", {
      name: input.name,
      email: redactEmail(input.email),
      role: input.role,
      portfolioProvided: Boolean(input.portfolio),
      messageLength: input.message.length
    });

    return { ok: true, provider: "development-log" };
  }
}

export function getMailProvider(): MailProvider {
  return new DevelopmentMailProvider();
}

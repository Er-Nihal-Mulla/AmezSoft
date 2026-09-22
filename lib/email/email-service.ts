import { company } from "@/config/company";
import { safeLog } from "@/lib/security/redaction";
import type { EmailMessage, EmailProvider, EmailResult } from "./types";

class DevelopmentEmailProvider implements EmailProvider {
  async send(message: EmailMessage): Promise<EmailResult> {
    safeLog("AmezSoft email queued in development", {
      provider: "development-log",
      to: message.to,
      cc: message.cc,
      subject: message.subject,
      textLength: message.text.length
    });

    return { ok: true, provider: "development-log" };
  }
}

class ResendEmailProvider implements EmailProvider {
  async send(message: EmailMessage): Promise<EmailResult> {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;

    if (!apiKey || !from) {
      throw new Error("Resend email provider is not configured.");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: message.to,
        cc: message.cc,
        subject: message.subject,
        html: message.html,
        text: message.text,
        reply_to: message.replyTo
      })
    });

    if (!response.ok) {
      throw new Error("Resend email request failed.");
    }

    return { ok: true, provider: "resend" };
  }
}

export class EmailService {
  constructor(private readonly provider: EmailProvider = createEmailProvider()) {}

  async send(message: EmailMessage) {
    return this.provider.send(message);
  }
}

export function createEmailProvider(): EmailProvider {
  if (process.env.EMAIL_PROVIDER === "resend") {
    return new ResendEmailProvider();
  }

  return new DevelopmentEmailProvider();
}

export function emailDestinations() {
  return {
    general: process.env.CONTACT_EMAIL || company.contact.generalEmail,
    sales: process.env.SALES_EMAIL || company.contact.salesEmail,
    support: process.env.SUPPORT_EMAIL || company.contact.supportEmail
  };
}

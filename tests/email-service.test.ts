import { describe, expect, it } from "vitest";
import { EmailService } from "@/lib/email/email-service";
import type { EmailMessage, EmailProvider } from "@/lib/email/types";

class FakeEmailProvider implements EmailProvider {
  sent: EmailMessage[] = [];

  async send(message: EmailMessage) {
    this.sent.push(message);
    return { ok: true, provider: "development-log" as const };
  }
}

describe("EmailService", () => {
  it("delegates sending to the configured provider", async () => {
    const provider = new FakeEmailProvider();
    const service = new EmailService(provider);

    const result = await service.send({
      to: ["amezsoft1@gmail.com"],
      subject: "Test",
      html: "<p>Test</p>",
      text: "Test"
    });

    expect(result.ok).toBe(true);
    expect(provider.sent).toHaveLength(1);
    expect(provider.sent[0].to).toEqual(["amezsoft1@gmail.com"]);
  });
});

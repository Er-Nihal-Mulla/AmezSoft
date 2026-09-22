import { describe, expect, it } from "vitest";
import { chatRequestSchema, contactSchema, leadSchema } from "@/lib/validation";

describe("validation schemas", () => {
  it("accepts a contact enquiry without a budget field", () => {
    const result = contactSchema.safeParse({
      name: "Nihal Mulla",
      email: "nihal@example.com",
      mobile: "+91 9322719784",
      companyName: "Example",
      service: "Web Development",
      requirement: "I want to build a modern company website and project enquiry flow.",
      preferredContact: "WhatsApp",
      website: ""
    });

    expect(result.success).toBe(true);
  });

  it("requires consent for chatbot leads", () => {
    const result = leadSchema.safeParse({
      name: "Nihal Mulla",
      email: "nihal@example.com",
      mobile: "+91 9322719784",
      companyName: "Example",
      requirement: "I want to discuss a web and mobile product for my business.",
      consent: false,
      language: "English",
      website: ""
    });

    expect(result.success).toBe(false);
  });

  it("rejects oversized chatbot messages", () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ role: "user", content: "x".repeat(701) }]
    });

    expect(result.success).toBe(false);
  });
});

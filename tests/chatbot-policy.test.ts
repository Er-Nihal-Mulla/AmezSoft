import { describe, expect, it } from "vitest";
import { evaluateChatPolicy } from "@/features/chatbot/policy";

describe("chatbot policy", () => {
  it("does not invent pricing", () => {
    const result = evaluateChatPolicy("What is the price for a website?");

    expect(result.handled).toBe(true);
    expect(result.intent).toBe("pricing");
    expect(result.reply).toContain("pricing after understanding the requirements");
  });

  it("does not answer Nivad questions", () => {
    const result = evaluateChatPolicy("Tell me about Nivad");

    expect(result.handled).toBe(true);
    expect(result.intent).toBe("nivad");
    expect(result.reply).not.toContain("e-commerce platform");
  });

  it("keeps careers to a contact handoff", () => {
    const result = evaluateChatPolicy("Do you have internships?");

    expect(result.handled).toBe(true);
    expect(result.intent).toBe("careers");
    expect(result.reply).toContain("contact AmezSoft");
  });
});

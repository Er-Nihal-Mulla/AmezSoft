import { NextResponse } from "next/server";
import { askAmezSoftAssistant, ChatbotUnavailableError } from "@/lib/ai/amezsoft-assistant";
import { evaluateChatPolicy } from "@/features/chatbot/policy";
import { getClientIp, rateLimit, rateLimitHeaders } from "@/lib/security/rate-limit";
import { safeLog } from "@/lib/security/redaction";
import { chatRequestSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const limit = rateLimit({
    key: `chat:${getClientIp(request)}`,
    limit: 20,
    windowMs: 10 * 60 * 1000
  });

  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many chat messages. Please try again later.",
        reply:
          "I am receiving too many messages right now. Please try again later or contact AmezSoft directly."
      },
      { status: 429, headers: rateLimitHeaders(limit) }
    );
  }

  try {
    const payload: unknown = await request.json();
    const parsed = chatRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid chat request.",
          issues: parsed.error.flatten().fieldErrors
        },
        { status: 400, headers: rateLimitHeaders(limit) }
      );
    }

    const latestMessage = parsed.data.messages.at(-1)?.content ?? "";
    const policy = evaluateChatPolicy(latestMessage);

    if (policy.handled && policy.reply) {
      return NextResponse.json(
        {
          ok: true,
          reply: policy.reply,
          source: "policy",
          handoff: Boolean(policy.handoff)
        },
        {
          headers: {
            "Cache-Control": "no-store",
            ...rateLimitHeaders(limit)
          }
        }
      );
    }

    const reply = await askAmezSoftAssistant(parsed.data);

    safeLog("AmezSoft chatbot response generated", {
      messageCount: parsed.data.messages.length,
      outputLength: reply.length
    });

    return NextResponse.json(
      { ok: true, reply, source: "openai", handoff: false },
      {
        headers: {
          "Cache-Control": "no-store",
          ...rateLimitHeaders(limit)
        }
      }
    );
  } catch (error) {
    const offline = error instanceof ChatbotUnavailableError;

    return NextResponse.json(
      {
        ok: false,
        error: offline ? "Chatbot is not configured." : "Chatbot is temporarily unavailable.",
        reply:
          "I am having trouble connecting right now. You can still reach AmezSoft through the contact form, email, or WhatsApp."
      },
      { status: offline ? 503 : 502 }
    );
  }
}

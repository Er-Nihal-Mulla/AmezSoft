import { NextResponse } from "next/server";
import { LeadNotificationService } from "@/features/leads/lead-notification-service";
import { getClientIp, rateLimit, rateLimitHeaders } from "@/lib/security/rate-limit";
import { redactEmail, redactPhone, safeLog } from "@/lib/security/redaction";
import { sanitizeOptional, sanitizeText } from "@/lib/security/sanitize";
import { leadSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const limit = rateLimit({
    key: `lead:${getClientIp(request)}`,
    limit: 3,
    windowMs: 60 * 60 * 1000
  });

  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many lead submissions. Please try again later." },
      { status: 429, headers: rateLimitHeaders(limit) }
    );
  }

  try {
    const payload: unknown = await request.json();
    const parsed = leadSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid lead.", issues: parsed.error.flatten().fieldErrors },
        { status: 400, headers: rateLimitHeaders(limit) }
      );
    }

    const input = {
      ...parsed.data,
      name: sanitizeText(parsed.data.name, 80),
      mobile: sanitizeText(parsed.data.mobile, 20),
      companyName: sanitizeOptional(parsed.data.companyName, 120),
      requirement: sanitizeText(parsed.data.requirement, 3000),
      pageUrl: sanitizeOptional(parsed.data.pageUrl, 300)
    };

    const service = new LeadNotificationService();
    const result = await service.sendChatbotLead(input);

    safeLog("AmezSoft chatbot lead accepted", {
      name: input.name,
      email: redactEmail(input.email),
      mobile: redactPhone(input.mobile),
      language: input.language,
      requirementLength: input.requirement.length
    });

    return NextResponse.json(
      { ok: result.ok, provider: result.provider },
      {
        headers: {
          "Cache-Control": "no-store",
          ...rateLimitHeaders(limit)
        }
      }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to process lead." }, { status: 500 });
  }
}

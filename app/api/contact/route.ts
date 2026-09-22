import { NextResponse } from "next/server";
import { LeadNotificationService } from "@/features/leads/lead-notification-service";
import { getClientIp, rateLimit, rateLimitHeaders } from "@/lib/security/rate-limit";
import { redactEmail, redactPhone, safeLog } from "@/lib/security/redaction";
import { sanitizeOptional, sanitizeText } from "@/lib/security/sanitize";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const limit = rateLimit({
    key: `contact:${getClientIp(request)}`,
    limit: 5,
    windowMs: 60 * 60 * 1000
  });

  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries. Please try again later." },
      { status: 429, headers: rateLimitHeaders(limit) }
    );
  }

  try {
    const payload: unknown = await request.json();
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid enquiry.", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const input = {
      ...parsed.data,
      name: sanitizeText(parsed.data.name, 80),
      mobile: sanitizeText(parsed.data.mobile, 20),
      companyName: sanitizeOptional(parsed.data.companyName, 120),
      service: sanitizeText(parsed.data.service, 120),
      requirement: sanitizeText(parsed.data.requirement, 3000),
      preferredContact: sanitizeText(parsed.data.preferredContact, 40)
    };

    const service = new LeadNotificationService();
    const result = await service.sendContactEnquiry(input);

    safeLog("AmezSoft contact enquiry accepted", {
      name: input.name,
      email: redactEmail(input.email),
      mobile: redactPhone(input.mobile),
      service: input.service,
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
    return NextResponse.json(
      { ok: false, error: "Unable to process enquiry." },
      { status: 500 }
    );
  }
}

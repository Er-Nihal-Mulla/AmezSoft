import { NextResponse } from "next/server";
import { getMailProvider } from "@/features/mail/provider";
import { careerApplicationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const payload: unknown = await request.json();
    const parsed = careerApplicationSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid application.",
          issues: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const provider = getMailProvider();
    const result = await provider.sendCareerApplication(parsed.data);

    return NextResponse.json(
      { ok: result.ok, provider: result.provider },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-RateLimit-Policy": "ready-for-edge-or-database-rate-limit"
        }
      }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process application." },
      { status: 500 }
    );
  }
}

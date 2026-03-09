import { NextResponse } from "next/server";
import { getStoredGtmId, removeStoredGtmId, setStoredGtmId } from "@/lib/db";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = "vcd007";

function sanitizeGtmId(value: string) {
  const normalized = value.trim().toUpperCase();
  return /^GTM-[A-Z0-9]+$/.test(normalized) ? normalized : "";
}

export async function GET() {
  try {
    const gtmId = await getStoredGtmId();
    return NextResponse.json({ gtmId });
  } catch {
    return NextResponse.json({ gtmId: "" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string; gtmId?: string };

    if (body.password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const gtmId = sanitizeGtmId(body.gtmId || "");

    if (!gtmId) {
      return NextResponse.json({ error: "invalid_gtm_id" }, { status: 400 });
    }

    await setStoredGtmId(gtmId);
    return NextResponse.json({ gtmId });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };

    if (body.password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    await removeStoredGtmId();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

// Verifies the HMAC-SHA256 signature Sanity sends in the sanity-webhook-signature header.
// Format: v1=<hex>,t=<unix_timestamp>
function isValidSignature(body: string, signatureHeader: string, secret: string): boolean {
    const parts = Object.fromEntries(
        signatureHeader.split(",").map((p) => {
            const [k, v] = p.split("=", 2);
            return [k, v];
        })
    );
    if (!parts.v1 || !parts.t) return false;
    const expected = createHmac("sha256", secret)
        .update(`${parts.t}.${body}`)
        .digest("hex");
    try {
        return timingSafeEqual(Buffer.from(parts.v1), Buffer.from(expected));
    } catch {
        return false;
    }
}

// Sanity calls this endpoint whenever a project document changes.
// Setup: Sanity Dashboard → API → Webhooks → Secret = SANITY_WEBHOOK_SECRET
export async function POST(req: NextRequest) {
    if (!process.env.SANITY_WEBHOOK_SECRET) {
        return NextResponse.json(
            { message: "SANITY_WEBHOOK_SECRET is not configured" },
            { status: 500 }
        );
    }

    const body = await req.text();
    const signature = req.headers.get("sanity-webhook-signature") ?? "";

    if (!isValidSignature(body, signature, process.env.SANITY_WEBHOOK_SECRET)) {
        return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}

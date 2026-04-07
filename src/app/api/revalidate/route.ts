import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Sanity webhook calls this endpoint whenever a project document changes.
// Setup in Sanity: Dashboard → API → Webhooks → POST to /api/revalidate
// Add header: sanity-webhook-secret: <your secret>
export async function POST(req: NextRequest) {
    const secret = req.headers.get("sanity-webhook-secret");

    if (!process.env.SANITY_WEBHOOK_SECRET) {
        return NextResponse.json(
            { message: "SANITY_WEBHOOK_SECRET is not configured" },
            { status: 500 }
        );
    }

    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}

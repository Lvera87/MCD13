import { createClient, type SanityClient } from "next-sanity";

let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
    if (!_client) {
        _client = createClient({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
            apiVersion: "2025-01-01",
            useCdn: false, // false = always fresh data; true = faster but cached ~1min
        });
    }
    return _client;
}

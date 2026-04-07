import { getSanityClient } from "./sanity.client";
import type { Project } from "@/data/projects";

// GROQ query — resolves image asset URLs so the result matches
// the existing Project type exactly. No component changes needed.
const PROJECTS_QUERY = `
    *[_type == "project"] | order(orderRank asc) {
        "id": _id,
        name,
        category,
        date,
        description,
        "image": mainImage.asset->url,
        "images": images[].asset->url,
        video
    }
`;

export async function getProjects(): Promise<Project[]> {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        return [];
    }
    return getSanityClient().fetch<Project[]>(
        PROJECTS_QUERY,
        {},
        { next: { tags: ["projects"] } }
    );
}

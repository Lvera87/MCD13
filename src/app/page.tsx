import { getProjects } from "@/lib/queries";
import { projects as staticProjects } from "@/data/projects";
import PageClientWrapper from "@/components/PageClientWrapper";

// Always fetch fresh data; revalidation is triggered on-demand via /api/revalidate
export const revalidate = false;

export default async function Page() {
    const sanityProjects = await getProjects();
    const projects = sanityProjects.length > 0 ? sanityProjects : staticProjects;
    return <PageClientWrapper projects={projects} />;
}

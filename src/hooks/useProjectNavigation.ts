import { useState, useCallback } from "react";
import type { Project } from "@/data/projects";

export function useProjectNavigation(projects: Project[]) {
    const [activeProjectId, setActiveProjectId] = useState<string>("HOME");

    const activeProject = projects.find((p) => p.id === activeProjectId);

    const handleNext = useCallback(() => {
        if (activeProjectId === "HOME") {
            setActiveProjectId(projects[0].id);
            return;
        }
        const idx = projects.findIndex((p) => p.id === activeProjectId);
        setActiveProjectId(projects[(idx + 1) % projects.length].id);
    }, [activeProjectId, projects]);

    const handlePrev = useCallback(() => {
        if (activeProjectId === "HOME") {
            setActiveProjectId(projects[projects.length - 1].id);
            return;
        }
        const idx = projects.findIndex((p) => p.id === activeProjectId);
        if (idx === 0) {
            setActiveProjectId("HOME");
        } else {
            setActiveProjectId(projects[idx - 1].id);
        }
    }, [activeProjectId, projects]);

    return { activeProjectId, setActiveProjectId, activeProject, handleNext, handlePrev };
}

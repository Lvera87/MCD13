"use client";

import { useSyncExternalStore } from "react";
import PageClient from "@/components/PageClient";
import type { Project } from "@/data/projects";

const subscribe = () => () => {};

export default function PageClientWrapper({ projects }: { projects: Project[] }) {
    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    );

    if (!mounted) {
        return <div className="fixed inset-0 bg-zinc-950" />;
    }

    return <PageClient projects={projects} />;
}

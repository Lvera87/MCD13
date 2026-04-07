"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useRef } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import NavItem from "./NavItem";

interface ProjectSidebarProps {
    projects: Project[];
    activeProjectId: string;
    onProjectSelect: (projectId: string) => void;
}

export default function ProjectSidebar({ projects, activeProjectId, onProjectSelect }: ProjectSidebarProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>(".suspended-item");
        items.forEach((item, i) => {
            gsap.to(item, {
                y: "random(-4, 4)",
                x: "random(-2, 2)",
                rotate: "random(-1, 1)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.1,
            });
        });
    }, { scope: containerRef });

    return (
        <nav
            ref={containerRef}
            role="navigation"
            aria-label="Project list"
            className="flex flex-col gap-6 w-full h-full max-h-full py-4 overflow-hidden"
        >
            <div className="flex flex-col gap-3 items-start w-full h-full overflow-hidden">
                <button
                    onClick={() => onProjectSelect("HOME")}
                    aria-label="Go to home"
                    className="ml-4 mb-2 opacity-80 hover:opacity-100 transition-all hover:scale-105 active:scale-95 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2 rounded-sm"
                >
                    <Image
                        src="/LOGOMCD.svg"
                        alt="MCD Logo"
                        width={140}
                        height={140}
                        style={{ width: "140px", height: "auto" }}
                        className="dark:invert-0 invert"
                        priority
                    />
                </button>
                <p className="flex-none text-[9px] font-black tracking-[0.2em] uppercase text-white/20 mb-2 ml-4">
                    INDEX / PROJECTS
                </p>
                <div className="flex-1 w-full flex flex-col items-start gap-1 pb-10 overflow-y-auto no-scrollbar scroll-smooth pr-2">
                    <div className="suspended-item w-full flex-none">
                        <NavItem
                            id="00"
                            name="HOME / INDEX"
                            isActive={activeProjectId === "HOME"}
                            onClick={() => onProjectSelect("HOME")}
                            variant="sidebar"
                        />
                    </div>
                    {projects.map((project) => (
                        <div key={project.id} className="suspended-item w-full flex-none">
                            <NavItem
                                id={project.id}
                                name={project.name}
                                isActive={project.id === activeProjectId}
                                onClick={() => onProjectSelect(project.id)}
                                variant="sidebar"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
}

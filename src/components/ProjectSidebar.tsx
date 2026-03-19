"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useRef } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";

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
                delay: i * 0.1
            });
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            suppressHydrationWarning
            className="flex flex-col gap-6 w-full h-full max-h-full py-4 overflow-hidden"
        >
            <div suppressHydrationWarning className="flex flex-col gap-3 items-start w-full h-full overflow-hidden">
                <button 
                  onClick={() => onProjectSelect("HOME")}
                  className="ml-4 mb-2 opacity-80 hover:opacity-100 transition-all hover:scale-105 active:scale-95 cursor-pointer text-left"
                >
                    <Image
                        src="/LOGOMCD.svg"
                        alt="MCD Logo"
                        width={140}
                        height={140}
                        style={{ width: '140px', height: 'auto' }}
                        className="dark:invert-0 invert"
                        priority
                    />
                </button>
                <p className="flex-none text-[9px] font-black tracking-[0.2em] uppercase text-white/20 mb-2 ml-4">
                    INDEX / PROJECTS
                </p>
                <div suppressHydrationWarning className="flex-1 w-full flex flex-col items-start gap-1 pb-10 overflow-y-auto no-scrollbar scroll-smooth pr-2">
                    <div suppressHydrationWarning className="suspended-item w-full flex-none">
                        <button
                            onClick={() => onProjectSelect("HOME")}
                            className={`relative w-full flex items-center h-9 px-5 rounded-full border transition-all duration-300 group whitespace-nowrap backdrop-blur-sm ${activeProjectId === "HOME"
                                ? "border-white/20 bg-white/10 shadow-[0_4px_12px_rgba(255,255,255,0.03)]"
                                : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/5"
                                }`}
                        >
                        <span suppressHydrationWarning className="flex items-center gap-5 w-full">
                            <span className={`text-[10px] font-bold font-mono transition-colors duration-300 ${activeProjectId === "HOME" ? "text-white" : "text-white/20 group-hover:text-white/40"}`}>
                                00
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex-1 text-left ${activeProjectId === "HOME" ? "text-white" : "text-white/30 group-hover:text-white/70"}`}>
                                HOME / INDEX
                            </span>
                        </span>
                        </button>
                    </div>
                    {projects.map((project) => {
                        const isActive = project.id === activeProjectId;
                        return (
                            <div suppressHydrationWarning key={project.id} className="suspended-item w-full flex-none">
                                <button
                                    onClick={() => onProjectSelect(project.id)}
                                    className={`relative w-full flex items-center h-9 px-5 rounded-full border transition-all duration-300 group whitespace-nowrap backdrop-blur-sm ${isActive
                                        ? "border-white/20 bg-white/10 shadow-[0_4px_12px_rgba(255,255,255,0.03)]"
                                        : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/5"
                                        }`}
                                >
                                    {/* Active Pulse Point */}
                                    {isActive && (
                                        <div className="absolute left-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse"></div>
                                    )}

                                    <span suppressHydrationWarning className="flex items-center gap-5 w-full">
                                        <span className={`text-[10px] font-bold font-mono transition-colors duration-300 ${isActive ? "text-white" : "text-white/20 group-hover:text-white/40"}`}>
                                            {project.id}
                                        </span>
                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex-1 text-left ${isActive ? "text-white" : "text-white/30 group-hover:text-white/70"}`}>
                                            {project.name}
                                        </span>
                                        {isActive && (
                                            <span className="material-icons text-[12px] text-white/50">chevron_right</span>
                                        )}
                                    </span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

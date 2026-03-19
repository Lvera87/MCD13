"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface MobileNavBarProps {
    projects: Project[];
    activeProjectId: string;
    onProjectSelect: (projectId: string) => void;
}

export default function MobileNavBar({ projects, activeProjectId, onProjectSelect }: MobileNavBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const activeProject = projects.find((p) => p.id === activeProjectId);
    const activeIndex = projects.findIndex((p) => p.id === activeProjectId);
    const displayLabel = activeProjectId === "HOME" ? "HOME / INDEX" : activeProject?.name ?? "—";
    const displayNumber = activeProjectId === "HOME" ? "00" : activeProject?.id ?? "—";

    // Animate drawer open/close
    useEffect(() => {
        if (!drawerRef.current || !backdropRef.current) return;

        if (isOpen) {
            document.body.style.overflow = "hidden";
            gsap.set(drawerRef.current, { y: "100%" });
            gsap.to(drawerRef.current, { y: "0%", duration: 0.45, ease: "expo.out" });
            gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });

            // Stagger list items
            if (listRef.current) {
                const items = listRef.current.querySelectorAll(".nav-item");
                gsap.fromTo(items,
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "expo.out", delay: 0.15 }
                );
            }
        } else {
            document.body.style.overflow = "";
            gsap.to(drawerRef.current, { y: "100%", duration: 0.35, ease: "expo.in" });
            gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" });
        }
    }, [isOpen]);

    const handleSelect = (id: string) => {
        onProjectSelect(id);
        setIsOpen(false);
    };

    return (
        <>
            {/* ── Backdrop ── */}
            <div
                ref={backdropRef}
                suppressHydrationWarning
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm pointer-events-none opacity-0 lg:hidden"
                onClick={() => setIsOpen(false)}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
            />

            {/* ── Bottom Drawer ── */}
            <div
                ref={drawerRef}
                suppressHydrationWarning
                className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden translate-y-full"
                style={{ willChange: "transform" }}
            >
                <div suppressHydrationWarning className="relative bg-zinc-950/95 backdrop-blur-2xl border-t border-white/10 rounded-t-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.8)] max-h-[75svh] flex flex-col">
                    {/* Drag handle */}
                    <div suppressHydrationWarning className="flex justify-center pt-3 pb-1 flex-none">
                        <span className="block w-10 h-1 rounded-full bg-white/20" />
                    </div>

                    {/* Drawer Header */}
                    <div suppressHydrationWarning className="flex items-center justify-between px-6 py-3 border-b border-white/5 flex-none">
                        <button
                            onClick={() => handleSelect("HOME")}
                            className="opacity-70 hover:opacity-100 transition-opacity active:scale-95"
                        >
                            <Image
                            src="/LOGOMCD.svg"
                            alt="MCD Logo"
                            width={200}
                            height={60}
                            className="dark:invert-0 invert w-[100px] h-auto"
                            priority
                        />
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                        >
                            <span className="material-icons text-sm">close</span>
                        </button>
                    </div>

                    {/* Label */}
                    <p className="flex-none text-[9px] font-black tracking-[0.2em] uppercase text-white/20 px-6 pt-4 pb-2">
                        INDEX / PROJECTS
                    </p>

                    {/* Project List */}
                    <div suppressHydrationWarning ref={listRef} className="flex-1 overflow-y-auto no-scrollbar px-4 pb-6">
                        {/* Home Item */}
                        <div suppressHydrationWarning className="nav-item">
                            <button
                                onClick={() => handleSelect("HOME")}
                                className={`relative w-full flex items-center h-11 px-5 rounded-full border transition-all duration-300 group whitespace-nowrap mb-1 ${
                                    activeProjectId === "HOME"
                                        ? "border-white/20 bg-white/10 shadow-[0_4px_12px_rgba(255,255,255,0.03)]"
                                        : "border-transparent bg-transparent active:bg-white/5"
                                }`}
                            >
                                <span suppressHydrationWarning className="flex items-center gap-5 w-full">
                                    <span className={`text-[10px] font-bold font-mono ${activeProjectId === "HOME" ? "text-white" : "text-white/20"}`}>
                                        00
                                    </span>
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] flex-1 text-left ${activeProjectId === "HOME" ? "text-white" : "text-white/30"}`}>
                                        HOME / INDEX
                                    </span>
                                    {activeProjectId === "HOME" && (
                                        <span className="material-icons text-[12px] text-white/50">chevron_right</span>
                                    )}
                                </span>
                            </button>
                        </div>

                        {/* Project Items */}
                        {projects.map((project) => {
                            const isActive = project.id === activeProjectId;
                            return (
                                <div suppressHydrationWarning key={project.id} className="nav-item">
                                    <button
                                        onClick={() => handleSelect(project.id)}
                                        className={`relative w-full flex items-center h-11 px-5 rounded-full border transition-all duration-300 group whitespace-nowrap mb-1 ${
                                            isActive
                                                ? "border-white/20 bg-white/10 shadow-[0_4px_12px_rgba(255,255,255,0.03)]"
                                                : "border-transparent bg-transparent active:bg-white/5"
                                        }`}
                                    >
                                        {isActive && (
                                            <div className="absolute left-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse" />
                                        )}
                                        <span suppressHydrationWarning className="flex items-center gap-5 w-full">
                                            <span className={`text-[10px] font-bold font-mono ${isActive ? "text-white" : "text-white/20"}`}>
                                                {project.id}
                                            </span>
                                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] flex-1 text-left ${isActive ? "text-white" : "text-white/30"}`}>
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

            {/* ── Persistent Bottom Bar ── */}
            <div suppressHydrationWarning className="fixed bottom-0 left-0 right-0 z-50 lg:hidden safe-bottom">
                <div suppressHydrationWarning className="mx-4 mb-4">
                    <div suppressHydrationWarning className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
                        {/* Current Project Info */}
                        <div suppressHydrationWarning className="flex items-center gap-3 min-w-0">
                            <span className="text-[10px] font-bold font-mono text-white/30 flex-none">
                                {displayNumber}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white truncate">
                                {displayLabel}
                            </span>
                        </div>

                        {/* Right Controls */}
                        <div suppressHydrationWarning className="flex items-center gap-2 flex-none">
                            {/* Progress indicator — using span to avoid Bitdefender bis_skin_checked injection on div */}
                            <div suppressHydrationWarning className="flex items-center gap-1">
                                {projects.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`block rounded-full transition-all duration-300 ${
                                            i === activeIndex
                                                ? "w-3 h-1.5 bg-white"
                                                : "w-1 h-1 bg-white/20"
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Open Menu Button */}
                            <button
                                onClick={() => setIsOpen(true)}
                                className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90 ml-1"
                                aria-label="Open project navigation"
                            >
                                <span className="material-icons text-sm">grid_view</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

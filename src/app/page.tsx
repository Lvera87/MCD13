"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectSidebar from "@/components/ProjectSidebar";
import ProjectShowcase from "@/components/ProjectShowcase";
import HomeCover from "@/components/HomeCover";
import MobileNavBar from "@/components/MobileNavBar";

export default function Home() {
  const [activeProjectId, setActiveProjectId] = useState("HOME");

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const handleNext = () => {
    if (activeProjectId === "HOME") {
        setActiveProjectId(projects[0].id);
        return;
    }
    const currentIndex = projects.findIndex(p => p.id === activeProjectId);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveProjectId(projects[nextIndex].id);
  };

  const handlePrev = () => {
    if (activeProjectId === "HOME") {
        setActiveProjectId(projects[projects.length - 1].id);
        return;
    }
    const currentIndex = projects.findIndex(p => p.id === activeProjectId);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    if (currentIndex === 0) {
        setActiveProjectId("HOME");
    } else {
        setActiveProjectId(projects[prevIndex].id);
    }
  };

  return (
    <main suppressHydrationWarning className="dark relative h-[100svh] max-h-[100svh] w-full bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 overflow-hidden flex items-center justify-center p-4 pb-24 md:p-8 md:pb-8 lg:pb-8 select-none fixed inset-0">
      {/* Background Layer - Using semantic tags to dodge invasive extensions */}
      <section suppressHydrationWarning className="fixed inset-0 pointer-events-none z-0">
        <aside suppressHydrationWarning className="absolute inset-0 opacity-[0.4] dark:opacity-[0.1] bg-noise mix-blend-overlay"></aside>
        <aside suppressHydrationWarning className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full"></aside>
        <aside suppressHydrationWarning className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-lime-400/10 blur-[150px] rounded-full"></aside>
      </section>

      {/* Main Grid Layout */}
      <div suppressHydrationWarning className="relative z-10 w-full h-full max-w-[1500px] grid grid-cols-12 gap-4 md:gap-8 items-center justify-center">

        {/* Left/Center: Showcase — full-width on mobile, 9 cols on desktop */}
        <div suppressHydrationWarning className="col-span-12 lg:col-span-9 flex items-center justify-center h-full max-h-[85svh]">
          <div suppressHydrationWarning className="w-full h-full flex items-center justify-center">
            {activeProjectId === "HOME" ? (
                <HomeCover />
            ) : activeProject ? (
                <ProjectShowcase
                    key={activeProjectId}
                    project={activeProject}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            ) : null}
          </div>
        </div>

        {/* Right: Floating Sidebar — desktop only */}
        <div suppressHydrationWarning className="hidden lg:flex lg:col-span-3 flex-col h-full max-h-[85vh] justify-center">
          <ProjectSidebar
            projects={projects}
            activeProjectId={activeProjectId}
            onProjectSelect={setActiveProjectId}
          />
        </div>
      </div>

      {/* Mobile Navigation — hidden on desktop */}
      <MobileNavBar
        projects={projects}
        activeProjectId={activeProjectId}
        onProjectSelect={setActiveProjectId}
      />

      {/* Decorative */}
      <aside suppressHydrationWarning className="fixed -bottom-40 -left-40 w-96 h-96 rounded-full border border-dashed border-zinc-200 dark:border-zinc-800 opacity-20 animate-spin-slow pointer-events-none"></aside>
    </main>
  );
}

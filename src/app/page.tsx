"use client";

import { useState, useEffect } from "react";
import { projects } from "@/data/projects";
import ProjectSidebar from "@/components/ProjectSidebar";
import ProjectShowcase from "@/components/ProjectShowcase";

export default function Home() {
  const [activeProjectId, setActiveProjectId] = useState("01");
  const [mounted, setMounted] = useState(false);

  // Anti-Hydration Mismatch Shield (kills the "red screen" caused by your browser extensions)
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const handleNext = () => {
    const currentIndex = projects.findIndex(p => p.id === activeProjectId);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveProjectId(projects[nextIndex].id);
  };

  const handlePrev = () => {
    const currentIndex = projects.findIndex(p => p.id === activeProjectId);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setActiveProjectId(projects[prevIndex].id);
  };

  if (!mounted) return <div className="dark bg-zinc-950 min-h-screen w-full"></div>;

  return (
    <main className="dark relative h-screen max-h-screen w-full bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 overflow-hidden flex items-center justify-center p-4 md:p-8 select-none fixed inset-0">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.1] bg-noise mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-lime-400/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Main Grid Layout - Restored Sidebar Position */}
      <div className="relative z-10 w-full h-full max-w-[1500px] grid grid-cols-12 gap-8 items-center justify-center">

        {/* Left/Center: Showcase */}
        <div className="col-span-12 lg:col-span-9 flex items-center justify-center h-full max-h-[85vh]">
          <div className="w-full h-full flex items-center justify-center">
            <ProjectShowcase
              key={activeProjectId}
              project={activeProject}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        </div>

        {/* Right: Floating Sidebar */}
        <div className="hidden lg:flex lg:col-span-3 flex-col h-full max-h-[85vh] justify-center">
          <ProjectSidebar
            projects={projects}
            activeProjectId={activeProjectId}
            onProjectSelect={setActiveProjectId}
          />
        </div>
      </div>



      {/* Decorative */}
      <div className="fixed -bottom-40 -left-40 w-96 h-96 rounded-full border border-dashed border-zinc-200 dark:border-zinc-800 opacity-20 animate-spin-slow pointer-events-none"></div>
    </main>
  );
}

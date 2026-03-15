"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useRef, useState } from "react";
import type { Project } from "@/data/projects";

import StatusBar from "./StatusBar";

interface ProjectShowcaseProps {
    project: Project;
    onNext: () => void;
    onPrev: () => void;
}

export default function ProjectShowcase({ project, onNext, onPrev }: ProjectShowcaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textContentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const hasGallery = project.images && project.images.length > 1;
    const currentImage = hasGallery ? project.images![currentImageIndex] : (project.image || "");



    useGSAP(() => {
        if (containerRef.current) {
            gsap.from(containerRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(".info-item", {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out",
            });
        }
    }, { scope: containerRef });

    const nextImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (hasGallery) {
            gsap.to(imageRef.current, {
                opacity: 0,
                x: -20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
                    gsap.fromTo(imageRef.current,
                        { opacity: 0, x: 20 },
                        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
                    );
                }
            });
        }
    };

    const prevImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (hasGallery) {
            gsap.to(imageRef.current, {
                opacity: 0,
                x: 20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
                    gsap.fromTo(imageRef.current,
                        { opacity: 0, x: -20 },
                        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
                    );
                }
            });
        }
    };

    // Use keys to navigate (Satisfies unused props lint)
    useGSAP(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") prevImage();
            if (e.key === "ArrowDown") nextImage();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, { dependencies: [hasGallery, onNext, onPrev] });

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[65vh] md:h-[75vh] lg:h-[80vh] max-h-[800px] bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-10 group"
        >
            {/* Project Image Container */}
            <div className="relative w-full h-full overflow-hidden rounded-[2.5rem]">
                <div ref={imageRef} className="relative w-full h-full bg-zinc-950/50">
                    {currentImage ? (
                        <Image
                            src={currentImage}
                            alt={project.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 75vw"
                            className="object-contain object-right transition-transform duration-1000 group-hover:scale-105"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <span className="text-zinc-400 font-serif italic">Image Preview</span>
                        </div>
                    )}
                </div>

                {/* Dynamic Gradient Overlay - Balanced for top-left text and right image */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-950/40 to-transparent opacity-90 z-10"></div>
            </div>

            {/* Content Overlay */}
            <div
                ref={textContentRef}
                className="absolute top-10 left-10 right-10 z-20 flex flex-col items-start gap-1 pointer-events-none"
            >
                <h1 className="info-item font-sans text-[1.875rem] text-white font-[800] tracking-tight drop-shadow-md leading-none">
                    {project.name === "CAFECITO 5K" ? "Cafecito 5K" : project.name}
                </h1>

                <p className="info-item text-[12px] text-white/90 font-sans tracking-wide uppercase mt-1">
                    2022 - TODAY
                </p>

                {project.description && (
                    <div className="info-item mt-10 max-w-[280px] sm:max-w-[320px] md:max-w-[380px] text-[14px] md:text-[15.5px] leading-[1.6] text-white/80 font-sans pointer-events-auto">
                        {project.description.split('\n').map((paragraph, i) => {
                            if (!paragraph.trim()) return null;
                            // Inject bold styling specifically for "Cafecito 5K" string matches
                            const parts = paragraph.split("Cafecito 5K");
                            return (
                                <p key={i} className="mb-5 last:mb-0">
                                    {parts.map((part, idx) => (
                                        <span key={idx}>
                                            {part}
                                            {idx < parts.length - 1 && <strong className="text-white font-[800]">Cafecito 5K</strong>}
                                        </span>
                                    ))}
                                </p>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Vertical Gallery Controls & Dots (Requested change) */}
            <div className={`absolute top-1/2 -translate-y-1/2 -right-5 z-30 flex items-center gap-3 transition-opacity duration-500 ${hasGallery ? "opacity-100" : "opacity-20 pointer-events-none"}`}>

                {/* Vertical Dots */}
                <div className="flex flex-col gap-1.5 items-center">
                    {hasGallery && project.images?.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1 transition-all duration-300 rounded-full ${idx === currentImageIndex ? "h-6 bg-white" : "h-1 bg-white/20"}`}
                        />
                    ))}
                </div>

                {/* Vertical Arrows */}
                <div className="flex flex-col gap-0.5 p-0.5 rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-xl shadow-2xl pointer-events-auto">
                    <button
                        onClick={prevImage}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
                    >
                        <span className="material-icons text-sm">north</span>
                    </button>
                    <div className="w-3 h-[1px] bg-white/10 self-center"></div>
                    <button
                        onClick={nextImage}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
                    >
                        <span className="material-icons text-sm">south</span>
                    </button>
                </div>
            </div>

            {/* Status Bar integrated */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-40">
                <StatusBar socialLinks={project.socialLinks} />
            </div>
        </div>
    );
}

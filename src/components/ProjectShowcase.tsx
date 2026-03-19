"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useRef, useState, useEffect, useCallback } from "react";
import type { Project } from "@/data/projects";

import StatusBar from "./StatusBar";

interface ProjectShowcaseProps {
    project: Project;
    onNext: () => void;
    onPrev: () => void;
}

export default function ProjectShowcase({ project, onNext, onPrev }: ProjectShowcaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const isAnimating = useRef(false);
    
    // Swipe handling
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    const hasGallery = project.images && project.images.length > 0;
    const currentImage = (hasGallery ? project.images![currentImageIndex] : project.image) || "";

    useGSAP(() => {
        if (containerRef.current) {
            gsap.from(".info-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "expo.out",
                clearProps: "all"
            });
        }
    }, { scope: containerRef, dependencies: [project.id] });

    const toggleFullscreen = useCallback(() => {
        if (isAnimating.current) return;
        
        if (!isFullscreen) {
            const docEl = document.documentElement;
            if (docEl.requestFullscreen) {
                docEl.requestFullscreen().catch(() => {});
            }
            setIsFullscreen(true);
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            }
            setIsFullscreen(false);
        }
    }, [isFullscreen]);

    const nextImage = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
        if (e) e.stopPropagation();
        if (!hasGallery) return;

        // Kill any in-progress tween — avoids isAnimating getting stuck on mobile
        gsap.killTweensOf(imageRef.current);
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => { isAnimating.current = false; }
        });

        tl.to(imageRef.current, {
            opacity: 0,
            scale: 0.98,
            duration: 0.18,
            ease: "power2.inOut",
            onComplete: () => {
                setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
            }
        })
        .fromTo(imageRef.current, {
            opacity: 0,
            scale: 1.02
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.22,
            ease: "expo.out"
        });
    }, [hasGallery, project.images]);

    const prevImage = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
        if (e) e.stopPropagation();
        if (!hasGallery) return;

        // Kill any in-progress tween — avoids isAnimating getting stuck on mobile
        gsap.killTweensOf(imageRef.current);
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => { isAnimating.current = false; }
        });

        tl.to(imageRef.current, {
            opacity: 0,
            scale: 1.02,
            duration: 0.18,
            ease: "power2.inOut",
            onComplete: () => {
                setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
            }
        })
        .fromTo(imageRef.current, {
            opacity: 0,
            scale: 0.98
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.22,
            ease: "expo.out"
        });
    }, [hasGallery, project.images]);

    // Touch Handlers for Swiping
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        const deltaY = e.changedTouches[0].clientY - touchStartY.current;

        const isHorizontal = Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY);
        const isVertical   = Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX);

        if (isHorizontal) {
            // Prevent accidental fullscreen toggle on swipe
            e.preventDefault();
            if (deltaX > 0) onPrev();
            else onNext();
        }

        if (isVertical) {
            // Prevent accidental fullscreen toggle on swipe
            e.preventDefault();
            if (deltaY > 0) prevImage(e);
            else nextImage(e);
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isFullscreen) toggleFullscreen();
            if (e.key === "ArrowUp") prevImage();
            if (e.key === "ArrowDown") nextImage();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && isFullscreen) {
                setIsFullscreen(false);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [isFullscreen, toggleFullscreen, prevImage, nextImage, onPrev, onNext]);

    return (
        <div
            ref={containerRef}
            suppressHydrationWarning
            className="relative w-full h-[58svh] md:h-[75vh] lg:h-[80vh] max-h-[800px] bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-10 group"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Project Image Container */}
            <div 
                className="relative w-full h-full overflow-hidden rounded-[2.5rem] cursor-zoom-in group/image"
                onClick={toggleFullscreen}
            >
                <div
                    ref={imageRef}
                    className="relative w-full h-full bg-zinc-950/20"
                    style={{ willChange: "opacity, transform" }}
                >
                    {currentImage ? (
                        <Image
                            src={currentImage}
                            alt={project.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 75vw"
                            className="object-contain object-center"
                            priority
                            unoptimized={true}
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <span className="text-zinc-400 font-serif italic">Image Preview</span>
                        </div>
                    )}
                </div>

                {hasGallery && (
                    <div className="hidden pointer-events-none" aria-hidden="true">
                        <Image 
                            src={project.images![(currentImageIndex + 1) % project.images!.length]} 
                            alt="pre" width={1} height={1} 
                            unoptimized={true}
                        />
                        <Image 
                            src={project.images![(currentImageIndex - 1 + project.images!.length) % project.images!.length]} 
                            alt="pre" width={1} height={1} 
                            unoptimized={true}
                        />
                    </div>
                )}

                {/* Targeted Lighting System */}
                <div 
                    className={`absolute inset-0 z-10 transition-opacity duration-1000 pointer-events-none ${currentImageIndex === 0 ? "opacity-100" : "opacity-0"}`}
                >
                    <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                </div>
            </div>

            {/* Top Content Overlay - Shadow Lighting Technique */}
            <div
                className={`absolute top-6 left-6 md:top-10 md:left-10 z-20 flex flex-col items-start gap-1 pointer-events-none transition-all duration-700 ${currentImageIndex === 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
            >
                <h1 className="info-item font-sans text-[1.5rem] md:text-[2.5rem] text-white font-[900] tracking-tight leading-none drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
                    {project.name === "CAFECITO 5K" ? "Cafecito 5K" : project.name}
                </h1>

                <p className="info-item text-[10px] md:text-[12px] text-white/80 font-sans tracking-[0.2em] uppercase mt-1 md:mt-2 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                    {project.category} — 2022 - TODAY
                </p>
            </div>

            {/* Bottom Description Overlay - Shadow Lighting Technique (Position fixed as requested) */}
            {project.description && (
                <div className={`absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 w-full px-6 md:px-0 max-w-[95%] md:max-w-[750px] flex justify-center pointer-events-none transition-all duration-700 ${currentImageIndex === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <div className="info-item text-center pointer-events-auto">
                        {project.description.split('\n').map((paragraph, i) => {
                            if (!paragraph.trim()) return null;
                            const parts = paragraph.split("Cafecito 5K");
                            return (
                                <p key={i} className="text-[13px] md:text-[16px] leading-[1.6] md:leading-[1.7] text-white/90 font-sans mb-3 md:mb-4 last:mb-0 drop-shadow-[0_1px_12px_rgba(0,0,0,1)]">
                                    {parts.map((part, idx) => (
                                        <span key={idx}>
                                            {part}
                                            {idx < parts.length - 1 && <strong className="text-white font-[900] drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">Cafecito 5K</strong>}
                                        </span>
                                    ))}
                                </p>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Vertical Gallery Controls & Dots - Inside frame on mobile, outside on desktop */}
            <div className={`absolute top-1/2 -translate-y-1/2 right-2 md:-right-5 z-30 flex items-center gap-2 md:gap-3 transition-opacity duration-500 ${hasGallery ? "opacity-100" : "opacity-20 pointer-events-none"}`}>
                <div className="flex flex-col gap-1.5 items-center">
                    {hasGallery && project.images?.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1 transition-all duration-300 rounded-full ${idx === currentImageIndex ? "h-6 bg-white shadow-[0_0_8px_white]" : "h-1 bg-white/20"}`}
                        />
                    ))}
                </div>

                <div className="flex flex-col gap-0.5 p-0.5 rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-xl shadow-2xl pointer-events-auto">
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
                    >
                        <span className="material-icons text-sm">north</span>
                    </button>
                    <div className="w-3 h-[1px] bg-white/10 self-center"></div>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
                    >
                        <span className="material-icons text-sm">south</span>
                    </button>
                </div>
            </div>

            {/* Navigation Projects Arrows - Inside frame on mobile */}
            <div className="absolute top-1/2 left-2 md:-left-5 -translate-y-1/2 flex flex-col gap-2 z-30 transition-all">
                <button
                    onClick={onPrev}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/40 md:bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-90"
                >
                    <span className="material-icons text-lg md:text-xl">west</span>
                </button>
                <button
                    onClick={onNext}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/40 md:bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-90"
                >
                    <span className="material-icons text-lg md:text-xl">east</span>
                </button>
            </div>

            {/* Footer Bar */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-40">
                <StatusBar />
            </div>

            {/* IMMERSIVE FULLSCREEN LIGHTBOX MODE (TRUE FULL SCREEN - SENIOR SOLUTION) */}
            {isFullscreen && (
                <div 
                    className="fixed inset-0 z-[100] bg-black animate-in fade-in duration-700 overflow-hidden"
                    onClick={toggleFullscreen}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="absolute top-8 right-8 text-white/20 hover:text-white transition-opacity cursor-pointer z-[110]">
                        <span className="material-icons text-[2.5rem]">close</span>
                    </div>

                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={currentImage}
                            alt={project.name}
                            fill
                            className="object-contain"
                            unoptimized={true}
                            priority
                        />
                        
                        {hasGallery && (
                            <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-4 md:px-8">
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="hidden md:flex w-16 h-16 rounded-full bg-black/5 border border-white/5 items-center justify-center text-white/10 hover:text-white/50 hover:bg-black/20 transition-all pointer-events-auto active:scale-90"
                                >
                                    <span className="material-icons text-[3rem]">chevron_left</span>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="hidden md:flex w-16 h-16 rounded-full bg-black/5 border border-white/5 items-center justify-center text-white/10 hover:text-white/50 hover:bg-black/20 transition-all pointer-events-auto active:scale-90"
                                >
                                    <span className="material-icons text-[3rem]">chevron_right</span>
                                </button>
                            </div>
                        )}

                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/10 font-mono text-[8px] md:text-[9px] tracking-[.5em] md:tracking-[.6em] uppercase z-[110]">
                            {String(currentImageIndex + 1).padStart(2, '0')} — {String(project.images?.length || 1).padStart(2, '0')}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

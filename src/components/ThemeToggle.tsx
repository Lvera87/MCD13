"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

interface ThemeToggleProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export default function ThemeToggle({ isDarkMode, toggleDarkMode }: ThemeToggleProps) {
    const iconRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLButtonElement>(null);

    useGSAP(() => {
        if (iconRef.current) {
            gsap.to(iconRef.current, {
                rotation: isDarkMode ? 180 : 0,
                duration: 0.5,
                ease: "power2.inOut",
            });
        }
    }, [isDarkMode]);

    return (
        <button
            ref={containerRef}
            onClick={toggleDarkMode}
            className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full border border-card-border-light dark:border-card-border-dark bg-white/80 dark:bg-black/80 backdrop-blur-md hover:scale-110 active:scale-95 transition-transform duration-200 group overflow-hidden"
            aria-label="Toggle Theme"
        >
            <span
                ref={iconRef}
                className="material-symbols-outlined text-zinc-950 dark:text-white transition-colors"
            >
                {isDarkMode ? "dark_mode" : "light_mode"}
            </span>
            <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </button>
    );
}

"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useRef } from "react";

export default function HomeCover() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const faceRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Only keep the background fade in
        gsap.from(containerRef.current, {
            opacity: 0,
            duration: 1,
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[70vh] md:h-[80vh] bg-white dark:bg-[#2e2f3d] rounded-[2rem] border-none shadow-2xl z-10 overflow-hidden flex flex-col p-12 md:p-14"
        >
            {/* Main Content Wrapper to control flow */}
            <div className="flex flex-col h-full">
                {/* Header: Title and Portrait Group */}
                <div className="flex justify-between items-start w-full">
                    {/* Title Group - Focused and Clean */}
                    <div ref={textRef} className="flex flex-col">
                        <h1 className="cover-title font-sans text-[3.2rem] md:text-[4.2rem] leading-[0.85] text-zinc-100 dark:text-[#f0f0f5] font-[800] tracking-tighter">
                            Miguel
                        </h1>
                        <h1 className="cover-title font-sans text-[3.2rem] md:text-[4.2rem] leading-[0.85] text-zinc-100 dark:text-[#f0f0f5] font-[800] tracking-tighter">
                            Camacho
                        </h1>
                        <h1 className="cover-title font-sans text-[3.2rem] md:text-[4.2rem] leading-[0.85] text-zinc-400 dark:text-[#a0a1b0] font-[500] tracking-tighter">
                            Design
                        </h1>
                    </div>

                    {/* Right Side Branding */}
                    <div className="relative mt-4 mr-4 flex flex-col items-center">
                        {/* 13 Badge / Speech Bubble */}
                        <div className="w-16 h-12 md:w-20 md:h-16 relative opacity-40 mb-[-10px] z-10">
                            <Image 
                                src="/LOGOMCD.svg" 
                                alt="MCD 13" 
                                fill 
                                className="object-contain invert dark:invert-0" 
                                priority
                            />
                        </div>
                        {/* Face Silhouette */}
                        <div ref={faceRef} className="relative w-28 h-28 md:w-36 md:h-36 opacity-60">
                            <Image 
                                src="/FACEMC.svg" 
                                alt="Miguel Camacho Silhouette" 
                                fill 
                                className="object-contain grayscale contrast-125" 
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Bio - Precise spacing and contrast */}
                <div className="mt-auto mb-10 max-w-[580px] ml-1">
                    <div className="flex flex-col gap-4 text-zinc-300 dark:text-[#cfd0d8] font-sans text-[13px] md:text-[14.5px] leading-[1.4] tracking-normal font-[400]">
                        <p className="cover-desc">
                            I take the time to truly understand the business, the people behind it, and what they want to communicate. 
                            From there, I build visual systems that feel cohesive, intentional, and designed to grow over time.
                        </p>
                        <p className="cover-desc">
                            My work brings together brand identity, digital experiences, and strategic content — always grounded in purpose.
                        </p>
                        <p className="cover-desc">
                            I care about doing things properly, keeping them simple, and creating solutions that make sense long term.
                        </p>
                        <p className="cover-desc">
                            If that sounds like what you&apos;re looking for, we&apos;ll get along just fine.
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Texture/Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        </div>
    );
}

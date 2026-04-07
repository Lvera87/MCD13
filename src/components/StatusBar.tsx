"use client";

interface StatusBarProps {
    text?: string;
}

export default function StatusBar({ text = "Available for Projects" }: StatusBarProps) {
    return (
        <div
            className="flex items-center gap-5 px-8 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 w-fit whitespace-nowrap"
        >
            <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-white motion-safe:animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white">
                    {text}
                </span>
            </div>
        </div>
    );
}

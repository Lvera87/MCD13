"use client";

interface NavItemProps {
    id: string;
    name: string;
    isActive: boolean;
    onClick: () => void;
    variant: "sidebar" | "mobile";
}

export default function NavItem({ id, name, isActive, onClick, variant }: NavItemProps) {
    const isSidebar = variant === "sidebar";
    const heightClass = isSidebar ? "h-9" : "h-11";
    const blurClass = isSidebar ? "backdrop-blur-sm" : "";
    const inactiveClass = isSidebar
        ? "border-transparent bg-transparent hover:border-white/10 hover:bg-white/5"
        : "border-transparent bg-transparent active:bg-white/5";
    const activeClass =
        "border-white/20 bg-white/10 shadow-[0_4px_12px_rgba(255,255,255,0.03)]";

    return (
        <button
            onClick={onClick}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Navigate to ${name}`}
            className={`relative w-full flex items-center px-5 rounded-full border transition-all duration-300 group whitespace-nowrap ${heightClass} ${blurClass} ${isActive ? activeClass : inactiveClass}`}
        >
            {isActive && (
                <div className="absolute left-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse" />
            )}
            <span className="flex items-center gap-5 w-full">
                <span
                    className={`text-[10px] font-bold font-mono transition-colors duration-300 ${
                        isActive
                            ? "text-white"
                            : isSidebar
                              ? "text-white/20 group-hover:text-white/40"
                              : "text-white/20"
                    }`}
                >
                    {id}
                </span>
                <span
                    className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex-1 text-left ${
                        isActive
                            ? "text-white"
                            : isSidebar
                              ? "text-white/30 group-hover:text-white/70"
                              : "text-white/30"
                    }`}
                >
                    {name}
                </span>
                {isActive && (
                    <span className="material-icons text-[12px] text-white/50">chevron_right</span>
                )}
            </span>
        </button>
    );
}

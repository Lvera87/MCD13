import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Respect prefers-reduced-motion — reducedMotion is a valid GSAP 3.9+ config option
// but TypeScript types have not been updated yet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(gsap as any).config({ reducedMotion: "prefers" });

export { gsap };

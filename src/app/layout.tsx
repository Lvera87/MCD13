import type { Metadata } from "next";
import { Outfit, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <title>Design Portfolio - Miguel Camacho</title>
        <meta name="description" content="Design Portfolio" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 1. LIMPIEZA ACTIVA (Borra el atributo antes de que Next.js lo vea)
                const removeAttr = () => {
                  document.querySelectorAll('[bis_skin_checked]').forEach(el => el.removeAttribute('bis_skin_checked'));
                };
                ATTR_OBSERVER = new MutationObserver(removeAttr);
                ATTR_OBSERVER.observe(document.documentElement, { attributes: true, subtree: true, childList: true });
                
                // 2. SILENCIO DE CONSOLA
                const silence = (...args) => {
                  try {
                    return args.some(arg => 
                      (typeof arg === 'string' && (arg.includes('bis_skin_checked') || arg.includes('hydration-mismatch'))) ||
                      (arg && typeof arg === 'object' && (arg.message?.includes?.('bis_skin_checked') || arg.bis_skin_checked))
                    );
                  } catch (e) { return false; }
                };

                const originalError = console.error;
                const originalWarn = console.warn;
                console.error = function(...args) { if (silence(...args)) return; originalError.apply(console, args); };
                console.warn = function(...args) { if (silence(...args)) return; originalWarn.apply(console, args); };
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

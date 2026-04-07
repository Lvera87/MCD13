import { Outfit, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
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
        <link rel="icon" type="image/svg+xml" href="/LOGOMCD.svg" />
        {/* Remove bis_skin_checked injected by Bitdefender to avoid React reconciler warnings */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){const o=new MutationObserver(()=>{document.querySelectorAll('[bis_skin_checked]').forEach(el=>el.removeAttribute('bis_skin_checked'))});o.observe(document.documentElement,{attributes:true,subtree:true,childList:true})})();`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

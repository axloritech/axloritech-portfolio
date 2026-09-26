import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site, socials } from "@/lib/site";

/**
 * Fonts are self-hosted (latin subset, variable) so there is no third-party
 * request at runtime and no layout shift: Inter for body copy, Plus Jakarta
 * Sans for display headings, JetBrains Mono for code and micro-labels.
 */
const inter = localFont({
  src: "../fonts/inter-var.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  preload: true,
});

const display = localFont({
  src: "../fonts/jakarta-var.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  preload: true,
});

const mono = localFont({
  src: "../fonts/jetbrains-var.woff2",
  weight: "100 800",
  style: "normal",
  display: "swap",
  variable: "--font-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Full-Stack Developer & Builder`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Axloritech",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "Node.js",
    "AI integrations",
    "web applications",
    "PWA development",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Full-Stack Developer & Builder`,
    description: site.description,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@axloritech",
    creator: "@axloritech",
    title: `${site.name} — Full-Stack Developer & Builder`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070a" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfc" },
  ],
  colorScheme: "dark light",
};

/**
 * Runs before paint: resolves the colour theme and decides whether the intro
 * plays. Written defensively so a blocked localStorage never breaks the page.
 */
const bootstrapScript = `
(function(){
  var d = document.documentElement;
  try {
    var theme = localStorage.getItem('axloritech:theme') || 'dark';
    if (theme === 'light') { d.classList.remove('dark'); } else { d.classList.add('dark'); }
    var seen = localStorage.getItem('axloritech:intro:v1') === 'seen';
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!seen && !reduce) { d.setAttribute('data-intro', 'play'); }
  } catch (e) {}
})();
`.trim();

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      alternateName: "Axlori",
      url: site.url,
      jobTitle: "Full-Stack Software Developer",
      description: site.description,
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "REST APIs",
        "Databases",
        "AI integrations",
        "Progressive Web Apps",
      ],
      sameAs: socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      slogan: site.tagline,
      description: site.description,
      publisher: { "@id": `${site.url}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable} dark`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
        {/* Scroll-reveal wrappers ship hidden and are revealed by JS. Without JS
            (or with it blocked) this makes sure no content is ever invisible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-canvas text-ink antialiased">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

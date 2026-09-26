import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function GithubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-5.9l-4.62-6.04L5.96 21H2.94l7.06-8.06L2.25 3h6.05l4.17 5.52L17.53 3Zm-1.06 16.2h1.67L7.6 4.71H5.81L16.47 19.2Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.75} {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.75} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.75} {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.75} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.75} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function ReplayIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12a9 9 0 1 0 3-6.7M3 4v4.5h4.5" />
    </svg>
  );
}

/* ---------------------------- Capability icons ---------------------------- */

export function WindowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 13.7 9 19 10.7 13.7 12.4 12 18l-1.7-5.6L5 10.7 10.3 9 12 3.5Z" />
      <path d="M18.5 16.5 19 18l1.5.5L19 19l-.5 1.5L18 19l-1.5-.5L18 18l.5-1.5Z" />
    </svg>
  );
}

export function RocketIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 4.5c3.2-2 6-1.5 6-1.5s.5 2.8-1.5 6c-1.6 2.6-4.3 4.8-6.5 6L8 12c1.2-2.2 3.4-4.9 5.5-7.5Z" />
      <path d="M8 12l-3 .5.5 3 2.5 2.5 3 .5.5-3" />
      <path d="M7 17c-1 1-1 3-1 3s2 0 3-1" />
    </svg>
  );
}

export function TerminalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M7.5 10l2 2-2 2M12.5 14h4" />
    </svg>
  );
}

/* ------------------------------ Skill glyphs ------------------------------ */

export function NextjsGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.2 15.4V8.6l6.1 8.2" strokeWidth={1.4} />
      <path d="M14.3 8.6v4.3" strokeWidth={1.4} />
    </svg>
  );
}

export function ReactGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </svg>
  );
}

export function TypescriptGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7.4 10.2h4.2M9.5 10.2v7.2" strokeWidth={1.4} />
      <path d="M13.6 17.2c.6.5 1.3.7 2.1.7 1.2 0 2-.5 2-1.5 0-1.7-3.4-1.3-3.4-3.2 0-.9.8-1.5 1.9-1.5.7 0 1.3.2 1.8.5" strokeWidth={1.4} />
    </svg>
  );
}

export function JavascriptGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9.6 10.4v4.8c0 1-.7 1.6-1.7 1.6-.7 0-1.2-.2-1.6-.6" strokeWidth={1.4} />
      <path d="M12.9 17.2c.6.5 1.3.7 2.1.7 1.2 0 2-.5 2-1.5 0-1.7-3.4-1.3-3.4-3.2 0-.9.8-1.5 1.9-1.5.7 0 1.3.2 1.8.5" strokeWidth={1.4} />
    </svg>
  );
}

export function HtmlGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 8l-4.5 4L9 16M15 8l4.5 4L15 16M13.4 5.5l-2.8 13" />
    </svg>
  );
}

export function CssGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8.5 9.5h7l-.6 6-2.9 1-2.9-1" strokeWidth={1.4} />
    </svg>
  );
}

export function TailwindGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 12.5c1-3.4 3-5 5.5-4.7 1.8.2 2.4 1.6 3.7 2.2 1.3.6 2 .1 2.8-1.3M9 16c1-3.4 3-5 5.5-4.7 1.8.2 2.4 1.6 3.7 2.2 1.3.6 2 .1 2.8-1.3" strokeWidth={1.4} />
    </svg>
  );
}

export function NodeGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.2l7.3 4.2v9.2L12 20.8l-7.3-4.2V7.4L12 3.2Z" />
      <path d="M12 8.6v6.8M9.2 10.2c-.6.4-.6 1.1 0 1.5l5.4 3" strokeWidth={1.4} />
    </svg>
  );
}

export function ApiGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8.5 4.5C6.8 4.5 6 5.5 6 7.2v2c0 1.4-.7 2.3-2 2.8 1.3.5 2 1.4 2 2.8v2c0 1.7.8 2.7 2.5 2.7M15.5 4.5c1.7 0 2.5 1 2.5 2.7v2c0 1.4.7 2.3 2 2.8-1.3.5-2 1.4-2 2.8v2c0 1.7-.8 2.7-2.5 2.7" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DatabaseGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="6.5" rx="7.5" ry="3" />
      <path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </svg>
  );
}

export function AiGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7.5" y="7.5" width="9" height="9" rx="2.5" />
      <path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6.4 6.4l1.7 1.7M15.9 15.9l1.7 1.7M17.6 6.4l-1.7 1.7M8.1 15.9l-1.7 1.7" strokeWidth={1.3} />
    </svg>
  );
}

export function VercelGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5 21 19.5H3L12 4.5Z" />
    </svg>
  );
}

export const skillIcons: Record<string, (p: IconProps) => ReactElement> = {
  nextjs: NextjsGlyph,
  react: ReactGlyph,
  typescript: TypescriptGlyph,
  javascript: JavascriptGlyph,
  html: HtmlGlyph,
  css: CssGlyph,
  tailwind: TailwindGlyph,
  nodejs: NodeGlyph,
  api: ApiGlyph,
  database: DatabaseGlyph,
  ai: AiGlyph,
  github: GithubIcon,
  vercel: VercelGlyph,
  window: WindowIcon,
  spark: SparkIcon,
  rocket: RocketIcon,
  terminal: TerminalIcon,
};

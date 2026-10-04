/**
 * Central site configuration.
 * Everything brand-related lives here so it is easy to update in one place.
 */

export const site = {
  name: "Axloritech",
  /** Set this to a real address to enable the mailto CTA. Leave empty to route the
   *  "Let's Work Together" buttons to X (DMs) instead — no address is invented. */
  contactEmail: "",
  tagline: "Tech Beyond Limits.",
  role: "Full-Stack Developer & Builder",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://axloritech.vercel.app",
  description:
    "Axloritech is the portfolio of a full-stack software developer building modern web applications, AI-powered products and digital experiences with Next.js, React, TypeScript and Node.js.",
} as const;

export const socials = [
  { name: "GitHub", href: "https://github.com/axloritech", handle: "axloritech", icon: "github" },
  { name: "X", href: "https://x.com/axloritech", handle: "@axloritech", icon: "x" },
  {
    name: "Instagram",
    href: "https://instagram.com/axloritech",
    handle: "@axloritech",
    icon: "instagram",
  },
] as const;

/**
 * Primary call to action target.
 * Uses the configured email when present, otherwise the X profile.
 */
export function contactHref(): string {
  return site.contactEmail
    ? `mailto:${site.contactEmail}?subject=Project%20enquiry%20—%20Axloritech`
    : "https://x.com/axloritech";
}

export const contactIsEmail = site.contactEmail.length > 0;

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const capabilities = [
  {
    title: "Web Applications",
    description: "Modern, responsive applications built for real users and real-world problems.",
    icon: "window",
  },
  {
    title: "AI Products",
    description: "AI-powered tools, assistants and intelligent workflows.",
    icon: "spark",
  },
  {
    title: "Startup Products",
    description: "Turning ideas into functional MVPs and scalable digital products.",
    icon: "rocket",
  },
  {
    title: "Developer Tools",
    description: "Useful tools that simplify workflows and solve specific problems.",
    icon: "terminal",
  },
] as const;

export type SkillGroup = {
  title: string;
  note: string;
  items: { name: string; icon: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    note: "Interfaces, component systems and responsive layouts.",
    items: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    title: "Backend & Data",
    note: "Server logic, API design and data modelling.",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "APIs", icon: "api" },
      { name: "Databases", icon: "database" },
    ],
  },
  {
    title: "AI & Delivery",
    note: "Intelligent features, version control and deployment.",
    items: [
      { name: "AI Integrations", icon: "ai" },
      { name: "GitHub", icon: "github" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  href: string;
  tags: string[];
  image: string;
  blur: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Canva Offline",
    description:
      "An offline-focused design tool inspired by modern visual editors, built for creating and editing designs directly in the browser.",
    href: "https://canvaoffline.vercel.app/",
    tags: ["Next.js", "TypeScript", "PWA", "Canvas"],
    image: "/projects/canvaoffline.webp",
    blur: "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAAAwBQCdASooABkAPtFcqU+oJKOiKrgIAQAaCWUAzuwKL97yNV9QEmgZ2IdWY1Zh/EmZQAD+9hPGULIZq1LNvyff5Utzq9kIkhU2xV288qJWp8ynk0o7qmKBD4qxexN3p9HSESuVxmkIIUVH0lxvoa2B03wVVzsNRbodp1mJNLx5WG0RtydAAA==",
    featured: true,
  },
  {
    name: "Axlori Lead Finder",
    description:
      "A business prospecting tool designed to help discover and organize potential business leads.",
    href: "https://axlorileadfinder.vercel.app/",
    tags: ["Next.js", "TypeScript", "AI", "APIs"],
    image: "/projects/axlorileadfinder.webp",
    blur: "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAABwBACdASooABkAPtFcp06oJSOiKqgBABoJZwDKeBfd7lAYWbOdK5Bjh7LEAAD+8gkycWpJpO2nbi26fodB8BCVB+4QWyEUfC6mYGTgUSOFx2JYsQRxdQWLeLj8PL+SOeQb06wUVB99iifWGNwK07teuxKhs3GaTeey5AAA",
  },
  {
    name: "Axlori Tasks",
    description:
      "A clean productivity and task-management application designed to help users organize their work and daily tasks.",
    href: "https://axloritask.vercel.app/",
    tags: ["Next.js", "React", "TypeScript", "PWA"],
    image: "/projects/axloritask.webp",
    blur: "data:image/webp;base64,UklGRsAAAABXRUJQVlA4ILQAAAAwBQCdASooABkAPsFMn0unpCKhurZoAPAYCWMAvOAdIGFOVmvuUNTA3IE7mz0CHyzgAAD+8gseL1bNPPLHCKJtOUnwzKXfLiZGRgxozQg5ZHUND8u0nsY6n+vX7ld9TYK8JGZt4NVwlX/zHwiW4uFwqCkoQ7WlHsY54LtDfZlb0XCsSnmguBqAEce3DYYBxtWkOVfvwWOfn4zH3QLnquGaqJpuP+5r7OZ+BpIy8dMLahGAgAA=",
  },
  {
    name: "ChartMind",
    description:
      "An intelligent chart-analysis platform designed to help users analyze trading charts and extract useful insights.",
    href: "https://chartmind-zeta.vercel.app/",
    tags: ["Next.js", "TypeScript", "AI", "Data"],
    image: "/projects/chartmind-zeta.webp",
    blur: "data:image/webp;base64,UklGRpwAAABXRUJQVlA4IJAAAAAQBQCdASooABkAPs1SoEunpKMhtVgIAPAZiWUAAL8OaICIoJCpBoY2rvhekBRNw7EAAP76GZ+lbasYhpRjpwuZcVD27TlhTJilavGzM7GAlqGynvz9U0qFuTAl79/W24yrUiQD8YbxsAS5f876bMS7/T2j84hsGhp7MF5wr10z+KuX4OUCHoBJZGXXgScAAAA=",
  },
  {
    name: "Axlori Agent",
    description:
      "An AI-powered agent concept designed to interact with users and assist with intelligent tasks and workflows.",
    href: "https://axloriagent.vercel.app/",
    tags: ["Next.js", "TypeScript", "AI", "Automation"],
    image: "/projects/axloriagent.webp",
    blur: "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAACwAwCdASooABkAPtFepE2oJSMiKqoBABoJZQAASxWYUmCHA3vpAAD+8cdSO/pZ6e9k0jbc+pIrHzRDjrbLneOzs7UolglhSXqBSBQAAAA=",
  },
];

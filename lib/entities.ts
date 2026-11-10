/**
 * The two identities this site represents.
 *
 * 1. Jeremiah Iselen — the person.  → /jeremiah-iselen
 * 2. Axloritech      — the company. → /axloritech
 *
 * Everything below is deliberately factual: no awards, qualifications, client
 * counts, employee numbers or founding dates are asserted anywhere, because
 * none of that has been supplied. Copy and structured data both read from here
 * so the page text and the JSON-LD can never drift apart.
 */

import { capabilities, projects, site, socials } from "@/lib/site";

export const PERSON_PATH = "/jeremiah-iselen";
export const ORG_PATH = "/axloritech";

export const personUrl = `${site.url}${PERSON_PATH}`;
export const orgUrl = `${site.url}${ORG_PATH}`;

/* Stable entity ids — used for cross-page references in JSON-LD. */
export const personId = `${personUrl}#person`;
export const orgId = `${orgUrl}#organization`;
export const websiteId = `${site.url}/#website`;
export const logoId = `${site.url}/#logo`;

const github = socials.find((s) => s.name === "GitHub")!.href;
const x = socials.find((s) => s.name === "X")!.href;

/**
 * Public profiles. `sameAs` arrays only ever contain URLs that were supplied
 * and independently checked — nothing is guessed.
 *
 * Freelancer was verified before adding: /u/axloritech returns 200 with the
 * profile title "Jeremiah Profile", while non-existent usernames return 404.
 */
export const verifiedProfiles = [
  {
    name: "GitHub",
    handle: "axloritech",
    href: github,
    description: "Source code and shipped projects.",
    icon: "github" as const,
  },
  {
    name: "X",
    handle: "@axloritech",
    href: x,
    description: "Notes on what is being built.",
    icon: "x" as const,
  },
  {
    name: "Freelancer",
    handle: "axloritech",
    href: "https://www.freelancer.com/u/axloritech",
    description: "Public freelancer profile.",
    icon: "link" as const,
  },
] as const;

export const person = {
  name: "Jeremiah Iselen",
  firstName: "Jeremiah",
  lastName: "Iselen",
  jobTitle: "Software Developer, Entrepreneur and Founder of Axloritech",
  shortJobTitle: "Software Developer, Entrepreneur & Founder",
  image: "/image.jpg",
  imageWidth: 941,
  imageHeight: 1280,
  imageAlt:
    "Jeremiah Iselen, software developer and founder of Axloritech, photographed in a suit",
  description:
    "Jeremiah Iselen is a software developer, entrepreneur and the founder of Axloritech. He builds web applications, AI-powered products and developer tools.",
  bio: [
    "Jeremiah Iselen is a software developer and entrepreneur, and the founder of Axloritech, an independent technology company. He designs and builds web applications, AI-powered products and developer tools, working across the interface, backend, APIs, databases and AI integrations.",
    "His work is product-focused: taking an idea from an empty repository to software that people can actually open, use and rely on. The products shown on this site — Canva Offline, Axlori Lead Finder, Axlori Tasks, ChartMind and Axlori Agent — were designed, developed and shipped end to end as complete applications.",
  ],
  knowsAbout: [
    "Software development",
    "Web application development",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "REST APIs",
    "Databases",
    "AI integrations",
    "Progressive Web Apps",
    "Product development",
  ],
  interests: [
    {
      title: "Web applications",
      text: "Fast, responsive interfaces built with Next.js, React and TypeScript, backed by real APIs and databases.",
      icon: "window" as const,
    },
    {
      title: "AI-powered products",
      text: "AI integrations, assistants and intelligent workflows that solve a concrete problem rather than decorate one.",
      icon: "spark" as const,
    },
    {
      title: "Developer & productivity tools",
      text: "Small, focused tools that remove friction from everyday work and stay out of the way.",
      icon: "terminal" as const,
    },
    {
      title: "Progressive web apps",
      text: "Installable, offline-capable experiences that behave like native software inside the browser.",
      icon: "rocket" as const,
    },
  ],
  /** At-a-glance facts. Every row is something the site already states. */
  facts: [
    { label: "Role", value: "Software developer, entrepreneur" },
    { label: "Company", value: "Axloritech — founder" },
    { label: "Focus", value: "Web applications · AI products · Developer tools" },
    { label: "Stack", value: "Next.js · React · TypeScript · Node.js" },
  ],
} as const;

export const organization = {
  name: "Axloritech",
  alternateName: "Axlori",
  slogan: site.tagline,
  industry: "Technology and Software Development",
  founder: person.name,
  description:
    "Axloritech is an independent technology and software development company founded by Jeremiah Iselen. It builds web apps, AI products and developer tools.",
  overview: [
    "Axloritech is an independent technology company founded by Jeremiah Iselen. It builds web applications, AI-powered products and developer tools — from the first working prototype to a finished product people can use.",
    "The company works across the whole stack: interface and interaction design, frontend engineering, backend logic, APIs, data and AI integrations. Each Axloritech product is built and shipped end to end rather than assembled from disconnected parts.",
  ],
  mission:
    "Tech Beyond Limits — turning ideas into working software that is fast, useful and genuinely finished.",
  logos: "/icons/icon-512.png",
  logoAlt: "Axloritech logo",
} as const;

/* ------------------------------- JSON-LD ---------------------------------- */

const personSameAs = verifiedProfiles.map((p) => p.href);
const orgSameAs = [x, github];

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: organization.name,
    alternateName: organization.alternateName,
    url: orgUrl,
    description: organization.description,
    slogan: organization.slogan,
    keywords: [
      "technology company",
      "software development",
      "web applications",
      "AI products",
      "developer tools",
      organization.industry,
    ].join(", "),
    logo: {
      "@type": "ImageObject",
      "@id": logoId,
      url: `${site.url}${organization.logos}`,
      contentUrl: `${site.url}${organization.logos}`,
      width: 512,
      height: 512,
      caption: organization.logoAlt,
    },
    image: { "@id": logoId },
    founder: { "@id": personId },
    sameAs: orgSameAs,
    knowsAbout: [
      "Software development",
      "Web applications",
      "AI integrations",
      "Progressive Web Apps",
      "Developer tools",
    ],
  };
}

export function personNode() {
  return {
    "@type": "Person",
    "@id": personId,
    name: person.name,
    givenName: person.firstName,
    familyName: person.lastName,
    url: personUrl,
    jobTitle: person.jobTitle,
    description: person.description,
    image: {
      "@type": "ImageObject",
      url: `${site.url}${person.image}`,
      width: person.imageWidth,
      height: person.imageHeight,
      caption: person.imageAlt,
    },
    worksFor: { "@id": orgId },
    knowsAbout: [...person.knowsAbout],
    sameAs: personSameAs,
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": orgId },
  };
}

export function breadcrumbNode(crumbs: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${crumbs[crumbs.length - 1].url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export const productList = projects.map((p) => ({
  name: p.name,
  description: p.description,
  href: p.href,
  tags: p.tags,
}));

export const focusAreas = capabilities;

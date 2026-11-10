import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Portrait from "@/components/Portrait";
import { GithubIcon, XIcon, ArrowRight, ArrowUpRight, skillIcons } from "@/components/icons";
import {
  PERSON_PATH,
  ORG_PATH,
  person,
  personId,
  personUrl,
  breadcrumbNode,
  organizationNode,
  personNode,
  verifiedProfiles,
  websiteId,
} from "@/lib/entities";
import { site } from "@/lib/site";

const TITLE = "Jeremiah Iselen — Software Developer & Founder of Axloritech";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: person.description,
  keywords: [
    "Jeremiah Iselen",
    "software developer",
    "entrepreneur",
    "founder",
    "Axloritech",
    "Next.js developer",
    "full-stack developer",
  ],
  alternates: { canonical: PERSON_PATH },
  openGraph: {
    type: "profile",
    url: personUrl,
    siteName: site.name,
    title: TITLE,
    description: person.description,
    firstName: person.firstName,
    lastName: person.lastName,
    username: "axloritech",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jeremiah Iselen — software developer and founder of Axloritech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@axloritech",
    creator: "@axloritech",
    title: TITLE,
    description: person.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const profilePageId = `${personUrl}#profilepage`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: personUrl,
      name: TITLE,
      description: person.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
      inLanguage: "en",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${site.url}${person.image}`,
        width: person.imageWidth,
        height: person.imageHeight,
        caption: person.imageAlt,
      },
      breadcrumb: { "@id": `${personUrl}#breadcrumb` },
    },
    personNode(),
    organizationNode(),
    breadcrumbNode([
      { name: "Home", url: `${site.url}/` },
      { name: person.name, url: personUrl },
    ]),
  ],
};

export default function JeremiahIselenPage() {
  return (
    <>
      <SiteHeader />

      <main id="home">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ------------------------------- Hero ------------------------------- */}
        <section
          aria-labelledby="profile-title"
          className="relative isolate overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-40"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="grid-bg fade-mask absolute inset-0 opacity-60" />
            <div
              className="absolute -top-32 right-[-12%] h-[30rem] w-[30rem] rounded-full blur-[130px]"
              style={{ background: "radial-gradient(circle, var(--glow) 0%, transparent 65%)" }}
            />
          </div>

          <div className="shell">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                <li>
                  <Link href="/" className="transition-colors hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink-soft">
                  Jeremiah Iselen
                </li>
              </ol>
            </nav>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-14">
              <div>
                <p className="eyebrow">Profile</p>
                <h1
                  id="profile-title"
                  className="mt-4 text-[2.15rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.5rem]"
                >
                  Jeremiah Iselen
                </h1>
                <p className="mt-4 max-w-xl text-[1.05rem] font-medium leading-snug text-ink-soft sm:text-lg">
                  Software Developer, Entrepreneur and Founder of{" "}
                  <Link
                    href={ORG_PATH}
                    className="link-underline text-accent"
                    aria-label="Axloritech company profile"
                  >
                    Axloritech
                  </Link>
                  .
                </p>
                <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-base">
                  I build web applications, AI-powered products and developer tools — taking an idea
                  from a blank repository to software people can actually use.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link href="/#projects" className="btn btn-primary">
                    View my work
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href={ORG_PATH} className="btn btn-ghost">
                    Axloritech company profile
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-start gap-5 lg:items-end">
                <Portrait
                  alt={person.imageAlt}
                  className="h-32 w-32 sm:h-40 sm:w-40 lg:h-44 lg:w-44"
                />
                <div className="w-full max-w-xs rounded-2xl border border-line bg-surface/70 p-4 backdrop-blur-sm">
                  <p className="eyebrow">Verified profiles</p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {verifiedProfiles.map((p) => (
                      <li key={p.name}>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer me"
                          className="group flex items-center justify-between gap-4 text-sm text-ink-soft transition-colors hover:text-ink"
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            {p.icon === "github" ? (
                              <GithubIcon className="h-4 w-4 text-muted" />
                            ) : p.icon === "x" ? (
                              <XIcon className="h-4 w-4 text-muted" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-muted" />
                            )}
                            {p.name}
                          </span>
                          <span className="shrink-0 font-mono text-[0.7rem] text-muted">
                            {p.handle}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------- Biography ---------------------------- */}
        <section aria-labelledby="bio-title" className="section hairline">
          <div className="shell grid gap-10 lg:grid-cols-[0.45fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Biography</p>
              <h2
                id="bio-title"
                className="mt-4 text-[1.6rem] font-bold leading-tight text-ink sm:text-3xl lg:text-[2.25rem]"
              >
                About Jeremiah
              </h2>
            </div>

            <Reveal>
              <div className="max-w-2xl space-y-5">
                {person.bio.map((paragraph) => (
                  <p key={paragraph} className="text-[0.95rem] leading-relaxed text-muted sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              <dl className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {person.facts.map((fact) => (
                  <div className="bg-surface p-4 sm:p-5" key={fact.label}>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-sm text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ------------------------ Work & interests ------------------------- */}
        <section aria-labelledby="interests-title" className="section hairline">
          <div className="shell">
            <div className="max-w-2xl">
              <p className="eyebrow">Work &amp; technology interests</p>
              <h2
                id="interests-title"
                className="mt-4 text-[1.6rem] font-bold leading-tight text-ink sm:text-3xl lg:text-[2.25rem]"
              >
                What I work on
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted sm:text-base">
                Four areas where most of the building happens, from a first sketch to something
                people can actually use.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
              {person.interests.map((interest) => {
                const Icon = skillIcons[interest.icon];
                return (
                  <article key={interest.title} className="card flex h-full flex-col p-5 sm:p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-base font-semibold text-ink sm:text-[1.05rem]">
                      {interest.title}
                    </h3>
                    <p className="mt-2.5 text-[0.85rem] leading-relaxed text-muted">
                      {interest.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* --------------------------- Profiles / org ------------------------ */}
        <section aria-labelledby="connect-title" className="section hairline">
          <div className="shell grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="card p-6 sm:p-8">
              <p className="eyebrow">Elsewhere</p>
              <h2
                id="connect-title"
                className="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl"
              >
                Verified public profiles
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                These are the only profiles that exist. Everything linked here is maintained
                directly.
              </p>
              <ul className="mt-6 flex flex-col divide-y divide-line">
                {verifiedProfiles.map((p) => (
                  <li key={p.name}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-ink">{p.name}</span>
                        <span className="mt-0.5 block text-[0.8rem] text-muted">
                          {p.description}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 font-mono text-[0.7rem] text-muted">
                        {p.handle}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card flex flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="eyebrow">The company</p>
                <h2 className="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl">
                  Founder of Axloritech
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Axloritech is the independent technology company I founded. It builds the web
                  applications, AI-powered products and developer tools shown on this site.
                </p>
              </div>
              <Link
                href={ORG_PATH}
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-ink"
              >
                Read the Axloritech company profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

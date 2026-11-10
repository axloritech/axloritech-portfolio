import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Portrait from "@/components/Portrait";
import { GithubIcon, XIcon, ArrowRight, ArrowUpRight, skillIcons } from "@/components/icons";
import {
  ORG_PATH,
  PERSON_PATH,
  focusAreas,
  organization,
  organizationNode,
  orgId,
  orgUrl,
  person,
  personNode,
  breadcrumbNode,
  productList,
  verifiedProfiles,
  websiteId,
} from "@/lib/entities";
import { site } from "@/lib/site";

const TITLE = "Axloritech — Technology & Software Development Company";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: organization.description,
  keywords: [
    "Axloritech",
    "technology company",
    "software development",
    "web applications",
    "AI products",
    "developer tools",
    "Jeremiah Iselen",
  ],
  alternates: { canonical: ORG_PATH },
  openGraph: {
    type: "website",
    url: orgUrl,
    siteName: organization.name,
    title: TITLE,
    description: organization.description,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Axloritech — technology and software development company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@axloritech",
    creator: "@axloritech",
    title: TITLE,
    description: organization.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const aboutPageId = `${orgUrl}#webpage`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": aboutPageId,
      url: orgUrl,
      name: TITLE,
      description: organization.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": orgId },
      mainEntity: { "@id": orgId },
      inLanguage: "en",
      breadcrumb: { "@id": `${orgUrl}#breadcrumb` },
    },
    organizationNode(),
    personNode(),
    breadcrumbNode([
      { name: "Home", url: `${site.url}/` },
      { name: organization.name, url: orgUrl },
    ]),
  ],
};

export default function AxloritechPage() {
  const github = verifiedProfiles.find((p) => p.name === "GitHub")!;
  const x = verifiedProfiles.find((p) => p.name === "X")!;

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
          aria-labelledby="company-title"
          className="relative isolate overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-40"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="grid-bg fade-mask absolute inset-0 opacity-60" />
            <div
              className="absolute -top-32 left-[-12%] h-[30rem] w-[30rem] rounded-full blur-[130px]"
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
                  Axloritech
                </li>
              </ol>
            </nav>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-center lg:gap-14">
              <div>
                <p className="eyebrow">Company profile</p>
                <h1
                  id="company-title"
                  className="mt-4 font-display text-[2.15rem] font-extrabold leading-[1.05] tracking-[0.02em] text-ink sm:text-5xl lg:text-[3.5rem]"
                >
                  AXLORI<span className="text-accent">TECH</span><span className="text-highlight" aria-hidden="true">.</span>
                </h1>
                <p className="mt-4 font-mono text-[0.8rem] uppercase tracking-[0.2em] text-accent">
                  {organization.slogan}
                </p>
                <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-base">
                  An independent technology and software development company founded by{" "}
                  <Link href={PERSON_PATH} className="link-underline font-medium text-ink">
                    {person.name}
                  </Link>
                  . We build web applications, AI-powered products and developer tools.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link href="/#projects" className="btn btn-primary">
                    See the products
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href={PERSON_PATH} className="btn btn-ghost">
                    Founder profile
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="w-full max-w-xs rounded-2xl border border-line bg-surface/70 p-5 backdrop-blur-sm lg:justify-self-end">
                <p className="eyebrow">Company</p>
                <dl className="mt-4 flex flex-col gap-3.5 text-sm">
                  <div>
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                      Name
                    </dt>
                    <dd className="mt-0.5 text-ink">{organization.name}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                      Industry
                    </dt>
                    <dd className="mt-0.5 text-ink">{organization.industry}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                      Founder
                    </dt>
                    <dd className="mt-0.5">
                      <Link href={PERSON_PATH} className="link-underline text-accent">
                        {person.name}
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                      Profiles
                    </dt>
                    <dd className="mt-1 flex items-center gap-3">
                      <a
                        href={github.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label={`Axloritech on GitHub — ${github.handle}`}
                        className="text-muted transition-colors hover:text-ink"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                      <a
                        href={x.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label={`Axloritech on X — ${x.handle}`}
                        className="text-muted transition-colors hover:text-ink"
                      >
                        <XIcon className="h-4 w-4" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------- Overview & mission ----------------------- */}
        <section aria-labelledby="overview-title" className="section hairline">
          <div className="shell grid gap-10 lg:grid-cols-[0.45fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Overview</p>
              <h2
                id="overview-title"
                className="mt-4 text-[1.6rem] font-bold leading-tight text-ink sm:text-3xl lg:text-[2.25rem]"
              >
                What Axloritech is
              </h2>
            </div>

            <Reveal>
              <div className="max-w-2xl space-y-5">
                {organization.overview.map((paragraph) => (
                  <p key={paragraph} className="text-[0.95rem] leading-relaxed text-muted sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div
                className="mt-8 rounded-2xl border border-line p-5 sm:p-6"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-soft) 0%, transparent 55%), var(--surface)",
                }}
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
                  Mission
                </p>
                <p className="mt-2.5 font-display text-[1.05rem] font-semibold leading-snug text-ink sm:text-lg">
                  {organization.mission}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------- Focus areas -------------------------- */}
        <section aria-labelledby="focus-title" className="section hairline">
          <div className="shell">
            <div className="max-w-2xl">
              <p className="eyebrow">What we do</p>
              <h2
                id="focus-title"
                className="mt-4 text-[1.6rem] font-bold leading-tight text-ink sm:text-3xl lg:text-[2.25rem]"
              >
                Software built end to end
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted sm:text-base">
                Four areas the company works in, from a first sketch to a shipped product.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
              {focusAreas.map((area) => {
                const Icon = skillIcons[area.icon];
                return (
                  <article key={area.title} className="card flex h-full flex-col p-5 sm:p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-base font-semibold text-ink sm:text-[1.05rem]">
                      {area.title}
                    </h3>
                    <p className="mt-2.5 text-[0.85rem] leading-relaxed text-muted">
                      {area.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------ Products ---------------------------- */}
        <section aria-labelledby="products-title" className="section hairline">
          <div className="shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">Products &amp; projects</p>
                <h2
                  id="products-title"
                  className="mt-4 text-[1.6rem] font-bold leading-tight text-ink sm:text-3xl lg:text-[2.25rem]"
                >
                  Software Axloritech has built
                </h2>
              </div>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-ink"
              >
                Full portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="mt-10 flex flex-col divide-y divide-line border-y border-line">
              {productList.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-3 py-6 transition-colors sm:grid-cols-[minmax(0,14rem)_1fr_auto] sm:items-start sm:gap-8"
                  >
                    <span className="flex items-center gap-2 font-display text-[1.05rem] font-semibold text-ink sm:min-w-0">
                      {product.name}
                      <ArrowUpRight className="h-4 w-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </span>
                    <span className="text-[0.9rem] leading-relaxed text-muted">
                      {product.description}
                    </span>
                    <span className="flex flex-wrap gap-1.5 sm:justify-end">
                      {product.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------ Founder ----------------------------- */}
        <section aria-labelledby="founder-title" className="section hairline">
          <div className="shell">
            <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-center gap-5">
                <Portrait alt={person.imageAlt} className="h-16 w-16 sm:h-20 sm:w-20" />
                <div>
                  <p className="eyebrow">Founder</p>
                  <h2
                    id="founder-title"
                    className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl"
                  >
                    {person.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{person.jobTitle}</p>
                </div>
              </div>
              <Link href={PERSON_PATH} className="btn btn-ghost shrink-0">
                Personal profile
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

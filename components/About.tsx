"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Portrait from "@/components/Portrait";

const approach = [
  {
    title: "End-to-end ownership",
    text: "From interface and interaction design through APIs, data and deployment.",
  },
  {
    title: "Built to be used",
    text: "Responsive, accessible and fast by default — not as an afterthought.",
  },
  {
    title: "Clean foundations",
    text: "Typed, readable code and architecture that can grow with the product.",
  },
];

const layers = [
  { label: "Interface", note: "Next.js · React · Tailwind" },
  { label: "Logic", note: "TypeScript · Node.js" },
  { label: "Data & APIs", note: "REST · Databases" },
  { label: "Intelligence", note: "AI integrations" },
];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" aria-labelledby="about-title" className="section hairline relative">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal y={12}>
              <div className="mb-8 flex items-center gap-5 sm:mb-9 sm:gap-6">
                <Portrait className="h-20 w-20 sm:h-[5.5rem] sm:w-[5.5rem]" />
                <div className="min-w-0">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                    Axloritech
                  </p>
                  <p className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                    Full-Stack Developer &amp; Builder
                  </p>
                </div>
              </div>
            </Reveal>

            <SectionHeading
              index="01"
              eyebrow="About"
              title={<span id="about-title">The developer and brand behind the products.</span>}
              description="Axloritech is both the brand and the person building it — every product you see here was designed, developed and shipped end to end."
            />

            <Reveal delay={0.05}>
              <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-base">
                I&apos;m a full-stack software developer focused on turning ideas into functional
                digital products. I work across frontend, backend, APIs, databases and AI-powered
                systems, building products that are designed to be useful, scalable and enjoyable to
                use.
              </p>
            </Reveal>

            <ul className="mt-9 grid gap-5 sm:grid-cols-3 lg:gap-6">
              {approach.map((a, i) => (
                <li key={a.title} className="h-full border-t border-line pt-4">
                  <Reveal delay={0.08 * i} blur>
                    <h3 className="font-display text-sm font-semibold text-ink">{a.title}</h3>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{a.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          {/* Software-development visual: a live-looking system stack */}
          <Reveal delay={0.12} className="lg:pt-4">
            <div className="card relative overflow-hidden p-5 sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
              />

              <div className="flex items-center justify-between gap-3">
                <span className="eyebrow">System stack</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-muted">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  online
                </span>
              </div>

              <div className="relative mt-5">
                {/* the connecting spine */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 4 220"
                  preserveAspectRatio="none"
                  className="absolute left-[1.15rem] top-3 h-[calc(100%-2rem)] w-1"
                >
                  <line x1="2" y1="0" x2="2" y2="220" stroke="var(--line-strong)" strokeWidth="1" />
                  <motion.line
                    x1="2"
                    y1="0"
                    x2="2"
                    y2="220"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    strokeDasharray="6 14"
                    animate={reduce ? {} : { strokeDashoffset: [0, -40] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
                  />
                </svg>

                <ul className="flex flex-col gap-3">
                  {layers.map((l, i) => (
                    <li
                      key={l.label}
                      className="group relative ml-9 rounded-xl border border-line bg-surface-2/50 px-4 py-3 transition-colors duration-300 hover:border-accent/40 hover:bg-surface-2"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-9 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-accent ring-4 ring-canvas"
                      />
                      <Reveal delay={0.06 * i} y={10}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-display text-sm font-semibold text-ink">
                            {l.label}
                          </span>
                          <span className="font-mono text-[0.62rem] text-muted">{l.note}</span>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[0.65rem] text-muted">
                <span>day-one → production</span>
                <span className="text-accent">Axloritech</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

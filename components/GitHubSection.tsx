"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GithubIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export default function GitHubSection() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="github-title" className="section hairline">
      <div className="shell">
        <Reveal>
          <div className="card relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-[90px]"
              style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
            />
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.07]"
              viewBox="0 0 200 200"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern id="gh-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M20 0H0V20" fill="none" stroke="var(--ink)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#gh-grid)" />
            </svg>

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface-2 text-ink">
                    <GithubIcon className="h-[1.15rem] w-[1.15rem]" />
                  </span>
                  <span className="eyebrow">Open source</span>
                </div>
                <h2
                  id="github-title"
                  className="mt-5 font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl"
                >
                  Build in Public
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted sm:text-base">
                  Explore my projects, experiments and open-source work on GitHub.
                </p>
              </div>

              <motion.a
                href="https://github.com/axloritech"
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={`Visit ${site.name} on GitHub (opens in a new tab)`}
                whileHover={reduce ? {} : { y: -2 }}
                whileTap={reduce ? {} : { scale: 0.985 }}
                className="btn btn-ghost shrink-0 self-start md:self-auto"
              >
                <GithubIcon className="h-4 w-4" />
                Visit GitHub
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

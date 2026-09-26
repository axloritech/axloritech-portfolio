"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { ArrowDown, ArrowRight } from "@/components/icons";
import { useIntroGate } from "@/hooks/use-intro-gate";

const container = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Hero() {
  const ready = useIntroGate();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-28 lg:pt-44"
    >
      {/* Ambient background — deliberately restrained */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg fade-mask absolute inset-0 opacity-70" />
        <div
          className="animate-drift absolute -top-24 right-[-10%] h-[34rem] w-[34rem] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, var(--glow) 0%, transparent 65%)",
          }}
        />
        <div
          className="animate-pulse-soft absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--line-strong), transparent)",
          }}
        />
      </div>

      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
          {/* Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={ready ? "shown" : "hidden"}
            className="flex flex-col items-start"
          >
            <motion.div variants={item} className="flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="eyebrow">{site.tagline}</span>
            </motion.div>

            <motion.h1
              id="hero-title"
              variants={item}
              className="mt-5 font-display text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]"
            >
              AXLORITECH
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-lg font-semibold text-ink-soft sm:text-xl lg:text-2xl"
            >
              <span
                aria-hidden="true"
                className="h-px w-8 bg-accent/70 sm:w-12"
              />
              Full-Stack Developer &amp; Builder
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-muted sm:text-lg sm:leading-relaxed"
            >
              I build modern web applications, AI-powered products and digital experiences that turn
              ideas into real products.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#projects" className="btn btn-primary group w-full sm:w-auto">
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="btn btn-ghost w-full sm:w-auto">
                Let&apos;s Work Together
              </a>
            </motion.div>

            <motion.a
              variants={item}
              href="#about"
              className="mt-10 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
            >
              <ArrowDown className="h-3.5 w-3.5 animate-bounce [animation-duration:2.4s]" />
              Scroll to explore
            </motion.a>
          </motion.div>

          {/* Developer card */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-x-6 -inset-y-8 -z-10 rounded-[2rem] opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 60% 30%, var(--glow) 0%, transparent 70%)",
              }}
            />
            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
                <span className="ml-2 font-mono text-[0.7rem] text-muted">axloritech.ts</span>
                <span className="ml-auto font-mono text-[0.65rem] text-accent">live</span>
              </div>

              <pre className="overflow-x-auto px-4 py-5 font-mono text-[0.72rem] leading-[1.85] text-ink-soft sm:text-[0.8rem]">
                <code>
                  <span className="text-muted">{"// "}</span>
                  <span className="text-muted">design → build → ship</span>
                  {"\n"}
                  <span className="text-[var(--code-keyword)]">const</span> axloritech = {"{"}
                  {"\n  role: "}
                  <span className="text-[var(--code-string)]">
                    &quot;full-stack developer&quot;
                  </span>
                  ,
                  {"\n  stack: ["}
                  <span className="text-[var(--code-string)]">&quot;next.js&quot;</span>,{" "}
                  <span className="text-[var(--code-string)]">&quot;react&quot;</span>,{" "}
                  <span className="text-[var(--code-string)]">&quot;typescript&quot;</span>,
                  {"\n          "}
                  <span className="text-[var(--code-string)]">&quot;node.js&quot;</span>,{" "}
                  <span className="text-[var(--code-string)]">&quot;apis&quot;</span>,{" "}
                  <span className="text-[var(--code-string)]">&quot;ai&quot;</span>],
                  {"\n  focus: ["}
                  <span className="text-[var(--code-string)]">&quot;web apps&quot;</span>,{" "}
                  <span className="text-[var(--code-string)]">&quot;product launches&quot;</span>],
                  {"\n  shipping: "}
                  <span className="text-[var(--code-bool)]">true</span>,
                  {"\n"}
                  {"}"};
                  <span className="ml-1 inline-block h-4 w-[7px] translate-y-[3px] animate-caret bg-accent align-middle" />
                </code>
              </pre>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line bg-surface-2/40 px-4 py-3 font-mono text-[0.65rem] text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  build passing
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  mobile + desktop
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden="true" />
                  pwa ready
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

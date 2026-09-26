"use client";

import { motion, useReducedMotion } from "framer-motion";
import { capabilities } from "@/lib/site";
import { skillIcons } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";

export default function WhatIBuild() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="build-title" className="section hairline">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title={<span id="build-title">What I Build</span>}
          description="Four areas where I spend most of my time — from a first sketch to something people can actually use."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {capabilities.map((c, i) => {
            const Icon = skillIcons[c.icon];
            return (
              <motion.article
                key={c.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                data-reveal=""
                className="group card relative flex h-full flex-col p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-float sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 20% 0%, var(--accent-soft) 0%, transparent 60%)",
                  }}
                />
                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="relative mt-5 font-display text-base font-semibold text-ink sm:text-[1.05rem]">
                  {c.title}
                </h3>
                <p className="relative mt-2.5 text-[0.85rem] leading-relaxed text-muted">
                  {c.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

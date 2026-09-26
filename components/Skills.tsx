"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillGroups } from "@/lib/site";
import { skillIcons } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" aria-labelledby="skills-title" className="section hairline">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Toolkit"
          title={<span id="skills-title">Skills &amp; Technologies</span>}
          description="The tools I reach for when turning an idea into a shipped product."
        />

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.08} className="h-full">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-sm font-semibold tracking-wide text-ink">
                    {group.title}
                  </h3>
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[0.62rem] text-muted">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-3 max-w-xs text-[0.82rem] leading-relaxed text-muted">
                  {group.note}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((item, i) => {
                    const Icon = skillIcons[item.icon];
                    return (
                      <motion.li
                        key={item.name}
                        data-reveal=""
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.45,
                          delay: Math.min(i * 0.045, 0.3),
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 text-[0.8rem] font-medium text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-ink hover:shadow-card">
                          <Icon className="h-4 w-4 text-muted transition-colors duration-300 group-hover:text-accent" />
                          {item.name}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

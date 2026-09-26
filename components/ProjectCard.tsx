"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

export default function ProjectCard({
  project,
  index = 0,
  featured = false,
}: {
  project: Project;
  index?: number;
  featured?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.07, 0.28), ease: [0.22, 1, 0.36, 1] }}
      data-reveal=""
      className="group card relative flex h-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/45 hover:shadow-float focus-within:-translate-y-1.5 focus-within:border-accent/45"
    >
      {/* Preview */}
      <div
        className={`relative overflow-hidden border-b border-line bg-surface-2 ${
          featured ? "aspect-[16/9]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={project.image}
          alt={`${project.name} interface preview`}
          fill
          sizes={featured ? "(min-width: 1024px) 70vw, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
          placeholder="blur"
          blurDataURL={project.blur}
          quality={80}
          className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-35"
        />
        <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/80 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Live
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">{project.name}</h3>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} — live project (opens in a new tab)`}
            className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent/50 group-hover:text-accent"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-3 text-[0.85rem] leading-relaxed text-muted sm:text-[0.9rem]">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3 pt-1">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
          >
            View Project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <span aria-hidden="true" className="font-mono text-[0.62rem] text-muted">
            opens in a new tab
          </span>
        </div>
      </div>
    </motion.article>
  );
}

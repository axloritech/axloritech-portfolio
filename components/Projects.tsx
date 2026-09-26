"use client";

import { projects } from "@/lib/site";
import ProjectCard from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Projects() {
  const [first, ...rest] = projects;

  return (
    <section id="projects" aria-labelledby="projects-title" className="section hairline">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="04"
            eyebrow="Selected work"
            title={<span id="projects-title">Featured Projects</span>}
            description="Live products, built and shipped end to end — each one opens in a new tab."
          />
          <Reveal delay={0.1}>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted md:pb-2 md:text-right">
              {String(projects.length).padStart(2, "0")} projects · live
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
          <div className="lg:col-span-2">
            <ProjectCard project={first} index={0} featured />
          </div>
          {rest.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contactHref, contactIsEmail, socials, site } from "@/lib/site";
import { ArrowUpRight, GithubIcon, InstagramIcon, XIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";

const icons: Record<string, (p: { className?: string }) => React.ReactElement> = {
  github: GithubIcon,
  x: XIcon,
  instagram: InstagramIcon,
};

export default function Contact() {
  const reduce = useReducedMotion();
  const href = contactHref();

  return (
    <section id="contact" aria-labelledby="contact-title" className="section hairline">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-surface px-6 py-14 text-center sm:px-10 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 w-[36rem] max-w-full rounded-full blur-[110px]"
              style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
            />
            <div aria-hidden="true" className="grid-bg fade-mask absolute inset-0 opacity-50" />

            <div className="relative mx-auto flex max-w-2xl flex-col items-center">
              <span className="eyebrow">Contact</span>
              <h2
                id="contact-title"
                className="mt-5 font-display text-[1.9rem] font-bold leading-[1.1] text-ink sm:text-4xl lg:text-[3rem]"
              >
                Have an idea? Let&apos;s build it.
              </h2>
              <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-base">
                Whether you&apos;re building a startup, launching a product or need a modern web
                application, let&apos;s turn the idea into something real.
              </p>

              <motion.a
                href={href}
                {...(contactIsEmail
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                whileHover={reduce ? {} : { y: -2 }}
                whileTap={reduce ? {} : { scale: 0.985 }}
                className="btn btn-primary group mt-9 w-full sm:w-auto"
              >
                Let&apos;s Work Together
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>

              <p className="mt-4 font-mono text-[0.68rem] text-muted">
                {contactIsEmail
                  ? site.contactEmail
                  : "No inbox set up yet — this opens a DM on X (@axloritech)"}
              </p>

              <div className="mt-10 flex items-center gap-3">
                {socials.map((s) => {
                  const Icon = icons[s.icon];
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={`${s.name} — ${s.handle}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-ink"
                    >
                      <Icon className="h-[1.15rem] w-[1.15rem]" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

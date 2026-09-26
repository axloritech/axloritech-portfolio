"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site, socials } from "@/lib/site";
import {
  CloseIcon,
  GithubIcon,
  InstagramIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "@/components/icons";
import { useIntroGate } from "@/hooks/use-intro-gate";

const socialIcon: Record<string, (p: { className?: string }) => React.ReactElement> = {
  github: GithubIcon,
  x: XIcon,
  instagram: InstagramIcon,
};

function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      window.localStorage.setItem("axloritech:theme", next);
    } catch {
      /* ignore */
    }
  };

  const Icon = theme === "dark" ? SunIcon : MoonIcon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink ${className ?? ""}`}
    >
      <Icon className="h-[1.05rem] w-[1.05rem]" />
    </button>
  );
}

export default function SiteHeader() {
  const ready = useIntroGate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight the section currently in view. */
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ready]);

  /* Mobile panel: lock scroll + close on Escape. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-canvas/80 backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/65"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        {/* Wordmark */}
        <a
          href="#home"
          className="group flex items-baseline gap-2.5 py-2"
          aria-label={`${site.name} — home`}
        >
          <span className="font-display text-[0.95rem] font-extrabold tracking-[0.2em] text-ink sm:text-base">
            AXLORI<span className="text-accent">TECH</span>
          </span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted lg:inline">
            {site.tagline}
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        {/* Utilities */}
        <div className="flex items-center gap-1.5">
          <div className="hidden items-center gap-1 sm:flex">
            {socials.map((s) => {
              const Icon = socialIcon[s.icon];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`${s.name} — ${s.handle}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-muted transition-colors hover:border-line hover:text-ink"
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              );
            })}
          </div>
          <span className="hidden h-5 w-px bg-line sm:block" aria-hidden="true" />
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary btn-sm hidden lg:inline-flex">
            Let&apos;s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-strong md:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-line bg-canvas/95 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile" className="shell flex flex-col py-3">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  className="flex items-center justify-between border-b border-line py-3.5 text-base text-ink last:border-b-0"
                >
                  {item.label}
                  <span className="font-mono text-[0.65rem] text-muted">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="shell flex items-center justify-between gap-4 pb-6 pt-2">
              <div className="flex items-center gap-2">
                {socials.map((s) => {
                  const Icon = socialIcon[s.icon];
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={`${s.name} — ${s.handle}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
                    >
                      <Icon className="h-[1.15rem] w-[1.15rem]" />
                    </a>
                  );
                })}
              </div>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn btn-accent btn-sm"
              >
                Let&apos;s work together
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

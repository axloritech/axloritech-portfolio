"use client";

import { socials, site } from "@/lib/site";
import { GithubIcon, InstagramIcon, XIcon } from "@/components/icons";
import ReplayIntroButton from "@/components/ReplayIntroButton";

const icons: Record<string, (p: { className?: string }) => React.ReactElement> = {
  github: GithubIcon,
  x: XIcon,
  instagram: InstagramIcon,
};

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline mt-4 bg-canvas-alt/60">
      <div className="shell py-12 sm:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#home" className="inline-block" aria-label={`${site.name} — back to top`}>
              <span className="font-display text-lg font-extrabold tracking-[0.2em] text-ink">
                AXLORI<span className="text-accent">TECH</span>
              </span>
            </a>
            <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-6 sm:flex-row sm:gap-14">
            <div>
              <p className="eyebrow">Navigate</p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                {[
                  ["Home", "#home"],
                  ["About", "#about"],
                  ["Skills", "#skills"],
                  ["Projects", "#projects"],
                  ["Contact", "#contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-muted transition-colors hover:text-ink link-underline"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Connect</p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                {socials.map((s) => {
                  const Icon = icons[s.icon];
                  return (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                      >
                        <Icon className="h-4 w-4 transition-colors group-hover:text-accent" />
                        {s.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.68rem] text-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <ReplayIntroButton />
            <a
              href="#home"
              className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

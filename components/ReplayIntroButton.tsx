"use client";

import { ReplayIcon } from "@/components/icons";

/** Lets visitors play the handwriting intro again after it has been seen. */
export default function ReplayIntroButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("axloritech:intro-replay"))}
      className={`group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink ${
        className ?? ""
      }`}
    >
      <ReplayIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-[120deg]" />
      Replay intro
    </button>
  );
}

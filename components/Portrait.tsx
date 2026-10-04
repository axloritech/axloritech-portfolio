"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Round portrait slot.
 *
 * Drop the photo at `public/image.jpg` and it appears here automatically — no
 * code change needed. A designed placeholder is shown until then, and stays in
 * place if the file is missing or fails to load, so a broken-image icon can
 * never reach the page.
 *
 * A plain <img> is used deliberately: next/image would ask the optimiser for
 * `/image.jpg`, and a 404 from that request can be cached at the CDN, which
 * would keep the photo hidden after the file is uploaded.
 */
export default function Portrait({ className = "" }: { className?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"pending" | "ready" | "missing">("pending");

  /**
   * If /image.jpg was served from cache it can finish loading *before* React
   * hydrates, in which case onLoad never fires. Catch that case on mount.
   */
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (el.complete) {
      setState(el.naturalWidth > 0 ? "ready" : "missing");
    }
  }, []);

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full p-[3px] ${className}`}
      style={{
        background:
          "conic-gradient(from 145deg, var(--accent) 0%, rgba(167,139,250,0.45) 22%, var(--line-strong) 48%, rgba(167,139,250,0.45) 72%, var(--accent) 100%)",
      }}
    >
      <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-surface-2">
        {state !== "ready" && (
          /* placeholder: muted portrait glyph, clearly "a photo goes here" */
          <svg
            viewBox="0 0 24 24"
            className="h-[42%] w-[42%] text-muted"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="12" cy="8.6" r="3.5" fill="currentColor" opacity="0.45" />
            <path
              d="M4.9 20.1c1.4-3.5 4-5.3 7.1-5.3s5.7 1.8 7.1 5.3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>
        )}

        {state !== "missing" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src="/image.jpg"
            alt="Portrait of the Axloritech developer"
            width={512}
            height={512}
            decoding="async"
            onLoad={() => setState("ready")}
            onError={() => setState("missing")}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              state === "ready" ? "opacity-100" : "opacity-0"
            }`}
            style={{ objectPosition: "50% 38%" }} // keeps the face centred in the circular crop
          />
        )}
      </span>
    </span>
  );
}

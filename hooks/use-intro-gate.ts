"use client";

import { useEffect, useState } from "react";

const EVENT_DONE = "axloritech:intro-done";

/**
 * Returns `false` while the intro overlay is on screen and `true` once it is
 * gone. Sections use it to time their entrance animations so the portfolio
 * reveals itself right as the intro hands over.
 */
export function useIntroGate() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") {
      const id = window.setTimeout(() => setReady(true), 0);
      return () => window.clearTimeout(id);
    }
    const onDone = () => setReady(true);
    window.addEventListener(EVENT_DONE, onDone);
    return () => window.removeEventListener(EVENT_DONE, onDone);
  }, []);

  return ready;
}

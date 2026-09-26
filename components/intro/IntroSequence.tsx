"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import strokes from "./writing-paths.json";

/**
 * INTRO SEQUENCE — handwritten "Axloritech"
 * -------------------------------------------------------------------------
 * The wordmark is a hand-authored single-line SVG script (writing-paths.json).
 * Every stroke is drawn by animating its `stroke-dashoffset` from full length to
 * zero with a linear transition, so ink is genuinely laid down along the path —
 * no fade-in masking, no handwriting font, and no hand or person anywhere.
 *
 * A small glowing writing point rides the leading edge of the active stroke
 * (sampled with `getPointAtLength`) so the mark reads as an invisible pen
 * leaving ink behind it.
 *
 * Lifecycle is a small state machine:
 *   idle → playing → closing → done
 * `play()` only arms the overlay; the drawing itself runs in an effect so the
 * paths are guaranteed to be mounted (this also makes replay work).
 */

/* tight viewBox around the ink so the wordmark is optically centred */
const VB_X = -14;
const VB_Y = 40;
const VB_W = 812;
const VB_H = 156;

const INTRO_KEY = "axloritech:intro:v1";
const EVENT_DONE = "axloritech:intro-done";
const EVENT_REPLAY = "axloritech:intro-replay";

/* ------------------------------- Timeline (ms) ----------------------------- */
const T_OVERLAY_IN = 160;
const T_PEN_IN = 240;
const T_DRAW_START = 300;
const T_DRAW_SPAN = 1900; // total time distributed across all strokes
const T_STROKE_OVERLAP = 18; // strokes flow into one another
const T_HOLD = 600; // beat after the last stroke, before the hand-off
const T_CLOSE_DUR = 600;
const T_MIN_STROKE = 70; // keeps the i-dot and short joins readable

type Phase = "idle" | "playing" | "closing" | "done";

export default function IntroSequence() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [tagline, setTagline] = useState(false);

  const tipRef = useRef<SVGGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  const raf = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
  }, []);

  /** Hands the page back: the portfolio starts animating in as the overlay
   *  dissolves, so there is never an empty black frame between the two. */
  const revealContent = useCallback(() => {
    document.getElementById("site-content")?.removeAttribute("inert");
    window.dispatchEvent(new Event(EVENT_DONE));
  }, []);

  const finish = useCallback(
    (markSeen = true) => {
      clearTimers();
      revealContent();
      if (markSeen) {
        try {
          window.localStorage.setItem(INTRO_KEY, "seen");
        } catch {
          /* storage blocked — the intro simply plays again next visit */
        }
      }
      document.documentElement.removeAttribute("data-intro");
      setPhase("done");
    },
    [clearTimers, revealContent],
  );

  /** Arms the overlay. The animation itself runs from the effect below. */
  const play = useCallback(() => {
    clearTimers();
    setTagline(false);
    document.documentElement.setAttribute("data-intro", "play");
    document.getElementById("site-content")?.setAttribute("inert", "");
    setPhase("playing");
  }, [clearTimers]);

  /* ---------- the drawing: runs once the strokes are in the DOM ---------- */
  useEffect(() => {
    if (phase !== "playing") return;

    const els = pathRefs.current.filter(Boolean) as SVGPathElement[];
    if (!els.length) return;

    // 1. hide every stroke by offsetting it by its own length
    const lengths = els.map((el) => el.getTotalLength() || 1);
    els.forEach((el, i) => {
      el.style.transition = "none";
      el.style.strokeDasharray = `${lengths[i]}`;
      el.style.strokeDashoffset = `${lengths[i]}`;
    });

    // 2. schedule each stroke in proportion to how much ink it lays down
    const totalInk = lengths.reduce((a, b) => a + b, 0);
    const durs = lengths.map((l) => Math.max(T_MIN_STROKE, (l / totalInk) * T_DRAW_SPAN));
    const scale = T_DRAW_SPAN / durs.reduce((a, b) => a + b, 0);
    const starts: number[] = [];
    let cursor = T_DRAW_START;
    durs.forEach((d, i) => {
      durs[i] = d * scale;
      starts.push(cursor);
      cursor += durs[i] - T_STROKE_OVERLAP;
    });
    const drawEnd = starts[starts.length - 1] + durs[durs.length - 1];

    // 3. lay the ink down
    els.forEach((el, i) => {
      timers.current.push(
        window.setTimeout(() => {
          el.style.transition = `stroke-dashoffset ${durs[i]}ms linear`;
          el.style.strokeDashoffset = "0";
        }, starts[i]),
      );
    });

    // 4. the invisible pen rides the leading edge of the active stroke
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = now - t0;
      const tip = tipRef.current;
      let active = -1;
      for (let i = 0; i < els.length; i++) {
        if (t >= starts[i] && t <= starts[i] + durs[i]) {
          active = i;
          break;
        }
      }
      if (tip) {
        if (active >= 0 && t > T_PEN_IN) {
          const p = Math.min(1, Math.max(0, (t - starts[active]) / durs[active]));
          const pt = els[active].getPointAtLength(lengths[active] * p);
          tip.setAttribute("transform", `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)})`);
          tip.style.opacity = "1";
        } else {
          tip.style.opacity = "0";
        }
      }
      if (t < drawEnd + 150) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    // 5. tagline → brief hold → cinematic hand-off to the site
    timers.current.push(window.setTimeout(() => setTagline(true), drawEnd + 130));
    timers.current.push(
      window.setTimeout(() => {
        setPhase("closing");
        revealContent(); // cross-fade: site animates in while the overlay dissolves
        timers.current.push(window.setTimeout(() => finish(), T_CLOSE_DUR));
      }, drawEnd + T_HOLD),
    );
  }, [phase, finish, revealContent]);

  /* --------------------------- mount / replay wiring --------------------------- */
  useEffect(() => {
    const wantsPlay = document.documentElement.dataset.intro === "play";
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || reduceMotion;

    if (wantsPlay && !reduce) {
      play();
    } else if (wantsPlay) {
      finish(); // respect reduced motion: go straight to the site
    } else {
      setPhase("done");
      revealContent();
    }

    const onReplay = () => {
      try {
        window.localStorage.removeItem(INTRO_KEY);
      } catch {
        /* ignore */
      }
      window.scrollTo({ top: 0, behavior: "auto" });
      play();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.documentElement.dataset.intro === "play") finish();
    };

    window.addEventListener(EVENT_REPLAY, onReplay);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(EVENT_REPLAY, onReplay);
      window.removeEventListener("keydown", onKey);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closing = phase === "closing";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          className="intro-overlay fixed inset-0 z-[100] flex-col items-center justify-center bg-[#050507]"
          initial={{ opacity: 0 }}
          animate={{ opacity: closing ? 0 : 1 }}
          transition={{
            opacity: {
              duration: (closing ? T_CLOSE_DUR : T_OVERLAY_IN) / 1000,
              ease: "easeOut",
            },
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Axloritech intro"
        >
          {/* ambient light — extremely restrained */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.20) 0%, rgba(139,92,246,0.06) 42%, transparent 70%)",
            }}
          />

          <motion.div
            className="relative w-full px-6"
            animate={closing ? { scale: 1.06 } : { scale: 1 }}
            transition={{ duration: T_CLOSE_DUR / 1000, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto w-full max-w-[62rem]">
              <svg
                viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
                className="w-full overflow-visible"
                style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <linearGradient
                    id="intro-ink"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="760"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="45%" stopColor="#e7e1ff" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <radialGradient id="intro-tip-glow">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="35%" stopColor="#a78bfa" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <g
                  fill="none"
                  stroke="url(#intro-ink)"
                  strokeWidth={7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 0 15px rgba(139,92,246,0.32))" }}
                >
                  {strokes.strokes.map((s, i) => (
                    <path
                      key={`${s.letter}-${i}`}
                      ref={(el) => {
                        pathRefs.current[i] = el;
                      }}
                      d={s.d}
                    />
                  ))}
                </g>

                {/* the invisible pen — a glowing point, never a hand */}
                <g
                  ref={tipRef}
                  style={{
                    opacity: 0,
                    transition: `opacity ${T_PEN_IN}ms ease-out`,
                    willChange: "transform",
                  }}
                >
                  <circle r="26" fill="url(#intro-tip-glow)" />
                  <circle r="3.4" fill="#fff" />
                </g>
              </svg>

              <div className="mt-2 flex h-16 flex-col items-center justify-start gap-3 sm:mt-4 sm:h-20">
                <motion.div
                  className="h-px w-24 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent"
                  initial={false}
                  animate={tagline ? { scaleX: 1, opacity: 0.9 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.p
                  className="text-center font-mono text-[0.7rem] uppercase tracking-[0.42em] text-white/70 sm:text-sm sm:tracking-[0.5em]"
                  initial={false}
                  animate={tagline ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {strokes.tagline}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Skip control */}
          <button
            type="button"
            onClick={() => finish()}
            className="group absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-2 text-[0.7rem] font-medium tracking-wide text-white/70 backdrop-blur transition-colors hover:border-white/35 hover:text-white sm:bottom-8 sm:right-8 sm:text-xs"
          >
            Skip intro
            <span className="hidden rounded border border-white/20 px-1 py-px font-mono text-[0.6rem] text-white/50 sm:inline">
              ESC
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const build = (y: number, blur: boolean): Variants => ({
  hidden: { opacity: 0, y, filter: blur ? "blur(6px)" : "blur(0px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
});

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  /** Render as a list item when the parent is a <ul>/<ol>, keeps semantics valid. */
  as?: "div" | "li";
};

/** Subtle scroll reveal. Motion is skipped entirely for reduced-motion visitors. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  blur = false,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const variants = build(y, blur);

  if (reduce) {
    return as === "li" ? (
      <li className={className}>{children}</li>
    ) : (
      <div className={className}>{children}</div>
    );
  }

  return (
    <motion.div
      data-reveal=""
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...(as === "li" ? { role: "listitem" } : {})}
    >
      {children}
    </motion.div>
  );
}

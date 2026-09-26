import type { ReactNode } from "react";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto flex max-w-2xl flex-col items-center text-center"
          : "flex max-w-2xl flex-col"
      }
    >
      <div className="flex items-center gap-3">
        {index ? (
          <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-accent">{index}</span>
        ) : null}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="mt-4 text-[1.75rem] font-bold leading-[1.15] text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[0.95rem] leading-relaxed text-muted sm:text-base">{description}</p>
      ) : null}
      {children}
    </div>
  );
}

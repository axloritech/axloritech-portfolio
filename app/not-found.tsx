import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-accent">404</p>
      <h1 className="mt-5 font-display text-3xl font-bold text-ink sm:text-5xl">
        This page drifted off the map.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        The link you followed doesn&apos;t exist. Head back to the portfolio and explore the live
        projects instead.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to Axloritech
      </Link>
    </main>
  );
}

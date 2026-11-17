import { NextResponse, type NextRequest } from "next/server";
import { PRIMARY_URL } from "@/lib/site";

/**
 * Canonical-domain enforcement.
 *
 * A staging copy of this site is also deployed to Netlify. Running the same
 * site as two public duplicates splits crawl/ranking signals, so requests
 * to the Netlify production hostname permanently redirect to the same path
 * on the canonical domain (axloritechportfolio.vercel.app).
 *
 * netlify.toml carries the same rule at the CDN edge; this proxy is
 * the guarantee if the Next.js runtime on Netlify serves a route before
 * the edge rule applies. On every other host (the canonical domain,
 * localhost, deploy previews) this is a no-op.
 */
const REDIRECT_HOSTS = new Set(["axloritech.netlify.app"]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase();
  if (!host || !REDIRECT_HOSTS.has(host)) return NextResponse.next();

  const url = request.nextUrl.clone();
  const target = new URL(PRIMARY_URL);
  url.protocol = target.protocol;
  url.hostname = target.hostname;
  url.port = "";
  return NextResponse.redirect(url, 301);
}

export const config = {
  // Skip static assets and image optimisation internals; redirect pages,
  // sitemap.xml, robots.txt and everything else.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

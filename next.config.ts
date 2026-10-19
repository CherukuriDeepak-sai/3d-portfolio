import { readFileSync } from "node:fs";
import type { NextConfig } from "next";

/** The easter-egg photo, wherever /edit currently points it. */
const hiddenPortrait: string | undefined = JSON.parse(
  readFileSync("content/data/profile.json", "utf8"),
).profile?.portraitHidden;
const githubPages = process.env.GITHUB_PAGES === 'true'
const pagesBasePath = githubPages ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '/3d-portfolio') : ''

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  /*
   * Standalone server output, for the Docker image only. Vercel runs its own packaging and its
   * build fails outright with standalone on (`ENOENT .next/next-server.js.nft.json`) — every
   * Vercel deploy from 1aeff73 to the fix failed that way. `VERCEL` is set in Vercel's builds.
   */
  output: githubPages ? 'export' : process.env.VERCEL ? undefined : 'standalone',
  ...(githubPages ? { basePath: pagesBasePath, trailingSlash: true, images: { unoptimized: true } } : {}),

  /*
   * `/resume` was the plain, printable surface back when `/` was the canvas. The front page is
   * that surface now, so the route is gone — but the URL has been shared, so it redirects rather
   * than 404s. Permanent, because it is never coming back.
   */
  ...(!githubPages ? { async redirects() {
    return [
      { source: '/resume', destination: '/', permanent: true },
      { source: '/canvas', destination: '/', permanent: true },
    ]
  } } : {}),

  /*
   * The portrait easter egg's photo is a secret, not a search result. It is never in the page's
   * HTML (it loads ten taps in), and if a crawler reaches the file anyway, this asks it not to
   * index it. A header rather than robots.txt: a Disallow line would publish the path, and would
   * stop crawlers seeing this header at all.
   */
  ...(!githubPages ? { async headers() {
    return hiddenPortrait
      ? [{ source: hiddenPortrait, headers: [{ key: 'X-Robots-Tag', value: 'noindex, noimageindex' }] }]
      : []
  } } : {}),
};

export default nextConfig;

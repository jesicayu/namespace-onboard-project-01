import type { NextConfig } from "next";

// Set by the GitHub Pages workflow (.github/workflows/pages.yml) to the site's path, such as
// "/namespace-onboard-project-01".
const pagesBasePath = process.env.PAGES_BASE_PATH;

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // A self-contained server in .next/standalone, which the Docker image runs.
  output: "standalone",
  // The dev server is opened through the Devbox's devbox.so URL; without this, Next blocks its
  // dev-only requests from that origin and the page never becomes interactive.
  allowedDevOrigins: ["*.devbox.so"],
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Static HTML in out/ for GitHub Pages instead. Pages has no server, so images aren't optimised,
  // and static export can't be combined with Cache Components or partial prefetching.
  ...(pagesBasePath !== undefined && {
    output: "export",
    basePath: pagesBasePath,
    images: { unoptimized: true },
    cacheComponents: false,
    partialPrefetching: false,
    experimental: { useCache: true },
  }),
};

export default nextConfig;

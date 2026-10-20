import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // Verification builds set NEXT_DIST_DIR so they never clobber a running `next dev`.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: {
    // Team photos in the CSAU Sanity project (the team ring reads them through
    // the image optimiser when the CDN refuses a cross-origin request).
    remotePatterns: [new URL("https://cdn.sanity.io/images/wzu06sd5/production/**")],
  },
  // Old csau.in addresses Google still lists, sent to their pages on this site.
  async redirects() {
    return [
      { source: "/blogs/:path*", destination: "/blog", permanent: true },
      { source: "/crackit/:path*", destination: "/quick-code", permanent: true },
    ];
  },
};

export default nextConfig;

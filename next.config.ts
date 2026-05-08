import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "sanat-rewa.vercel.app" },
    ],
  },
  // Permanent redirects for slug aliases users naturally type but the
  // canonical slug differs. Without these, the URL 404s and Next.js renders
  // a noindex page — which Lighthouse / Search Console then flags. Keep
  // the canonical `delhi` slug (already indexed) and 308 the brand-name
  // variant so PageRank consolidates instead of stranding on a 404.
  redirects: async () => [
    {
      source: "/:country/:locale/cities/delhi-ncr",
      destination: "/:country/:locale/cities/delhi",
      permanent: true,
    },
    {
      source: "/:country/:locale/cities/delhi-ncr/:rest*",
      destination: "/:country/:locale/cities/delhi/:rest*",
      permanent: true,
    },
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(self)",
        },
      ],
    },
    {
      source: "/(.*)\\.(js|css|woff2|png|jpg|svg|ico)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default nextConfig;

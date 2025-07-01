// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "img.youtube.com",
            port: "",
            pathname: "/vi/**/hqdefault.jpg",
          },
          {
            protocol: "https",
            hostname: "img.youtube.com",
            port: "",
            pathname: "/vi/**/maxresdefault.jpg",
          },
          {
            protocol: "https",
            hostname: "cdn-images-1.medium.com",
            port: "",
            pathname: "/**",
          },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/ingest/static/:path*",
                destination: "https://us-assets.i.posthog.com/static/:path*",
            },
            {
                source: "/ingest/:path*",
                destination: "https://us.i.posthog.com/:path*",
            },
            {
                source: "/ingest/decide",
                destination: "https://us.i.posthog.com/decide",
            },
        ];
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true,
};

export default nextConfig;

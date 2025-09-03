// next.config.mjs
import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Performance optimizations
    compress: true,
    poweredByHeader: false,
    
    // Image optimization
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
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
    
    // Performance headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                source: '/images/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
    
    // Bundle optimization
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['framer-motion', 'react-icons', 'lucide-react'],
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

export default withBundleAnalyzer(nextConfig);

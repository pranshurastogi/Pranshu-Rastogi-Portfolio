// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // Allow next/image to fetch from Medium's CDN
      domains: ["cdn-images-1.medium.com"],
      // Or use remotePatterns for finer control:
      // remotePatterns: [
      //   {
      //     protocol: "https",
      //     hostname: "cdn-images-1.medium.com",
      //     port: "",
      //     pathname: "/**",
      //   },
      // ],
    },
  };
  
  export default nextConfig;
  
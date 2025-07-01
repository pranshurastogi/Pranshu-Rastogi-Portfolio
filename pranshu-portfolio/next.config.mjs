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
  };
  
  export default nextConfig;
  
 
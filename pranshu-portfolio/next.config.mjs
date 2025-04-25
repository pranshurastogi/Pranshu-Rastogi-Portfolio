// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "cdn-images-1.medium.com",   // for Medium embeds
            "img.youtube.com",           // for YouTube thumbnails
          ],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "img.youtube.com",
            port: "",
            pathname: "/vi/**/hqdefault.jpg",
          },
        ],
      },
  };
  
  export default nextConfig;
  
 
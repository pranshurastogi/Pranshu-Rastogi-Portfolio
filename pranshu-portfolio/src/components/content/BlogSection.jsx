// src/components/BlogSection.jsx
import React from "react";
import Parser from "rss-parser";
import BlogList from "./BlogList";
import FloatingBlockchainIcons from '../hero/FloatingBlockchainIcons';

export const revalidate = 3600; // 1 hour cache for RSS

export default async function BlogSection() {
  const parser = new Parser({
    customFields: { item: [["content:encoded", "content"]] },
  });

  let posts = [];
  let error = null;
  try {
    const feed = await parser.parseURL(
      "https://pranshurastogi.medium.com/feed"
    );
    posts = feed.items.slice(0, 3); // Back to 3 posts
  } catch (err) {
    error = "Failed to load blog posts. Please try again later.";
    console.warn("Failed to fetch Medium RSS:", err);
  }

  // Top & bottom divider SVG (pulsy)
  const Divider = () => (
    <div className="w-full flex justify-center items-center py-2">
      <svg
        width="120"
        height="24"
        viewBox="0 0 120 24"
        fill="none"
        className="animate-pulse"
      >
        <rect
          x="0"
          y="8"
          width="40"
          height="8"
          rx="4"
          fill="#39FF14"
          opacity="0.18"
        />
        <rect
          x="40"
          y="10"
          width="8"
          height="4"
          rx="2"
          fill="#AEEA00"
        />
        <rect
          x="56"
          y="10"
          width="8"
          height="4"
          rx="2"
          fill="#00e0ff"
        />
        <rect
          x="72"
          y="10"
          width="8"
          height="4"
          rx="2"
          fill="#a259ff"
        />
        <rect
          x="88"
          y="8"
          width="32"
          height="8"
          rx="4"
          fill="#39FF14"
          opacity="0.18"
        />
      </svg>
    </div>
  );

  return (
    <>
      <Divider />
      <div className="relative w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden">
        {/* Animated blockchain lines background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" width="100%" height="100%" viewBox="0 0 1200 300">
          {/* Main neon chain */}
          <polyline points="60,120 180,80 320,160 500,100 700,180 900,120 1100,180" fill="none" stroke="#39FF14" strokeWidth="2.2" strokeDasharray="16 12" opacity="0.15">
            <animate attributeName="stroke-dashoffset" values="60;0;100" dur="10s" repeatCount="indefinite" />
          </polyline>
          {/* Random mesh lines for blockchain effect */}
          <polyline points="100,200 220,110 340,180 480,90 600,210 740,130 900,200 1150,140" fill="none" stroke="#AEEA00" strokeWidth="1.5" strokeDasharray="10 8" opacity="0.12">
            <animate attributeName="stroke-dashoffset" values="40;0;60" dur="13s" repeatCount="indefinite" />
          </polyline>
          <polyline points="80,60 200,140 350,100 520,180 700,80 850,160 1050,100 1190,180" fill="none" stroke="#00e0ff" strokeWidth="1.2" strokeDasharray="8 7" opacity="0.10">
            <animate attributeName="stroke-dashoffset" values="30;0;50" dur="15s" repeatCount="indefinite" />
          </polyline>
          <polyline points="120,180 260,90 400,160 600,120 800,200 1000,140 1150,220" fill="none" stroke="#a259ff" strokeWidth="1.1" strokeDasharray="12 10" opacity="0.08">
            <animate attributeName="stroke-dashoffset" values="20;0;40" dur="17s" repeatCount="indefinite" />
          </polyline>
          <polyline points="60,220 180,160 320,240 500,180 700,260 900,200 1100,260" fill="none" stroke="#39FF14" strokeWidth="1.3" strokeDasharray="14 11" opacity="0.06">
            <animate attributeName="stroke-dashoffset" values="10;0;30" dur="19s" repeatCount="indefinite" />
          </polyline>
        </svg>
        {/* Subtle floating blockchain icons */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <FloatingBlockchainIcons interactive={false} />
        </div>
        
        {/* Enhanced header with blockchain theme */}
        <div className="relative z-10 py-8 sm:py-12 md:py-16 px-4">
                      <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#AEEA00] mb-4 drop-shadow-lg tracking-tight">
                Latest Blog Posts
              </h2>
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"></div>
                <div className="w-3 h-3 bg-[#39FF14] rounded-full animate-pulse"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"></div>
              </div>
            </div>
          
          {/* Blog content with enhanced styling */}
          {error ? (
            <div className="text-center py-8">
              <div className="bg-[#1a1a1a]/80 border border-[#E53E3E] rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-[#E53E3E] text-4xl mb-4">⚠️</div>
                <div className="text-[#E53E3E] font-medium">{error}</div>
              </div>
            </div>
          ) : (
            <div className="relative z-10">
              <BlogList posts={posts} />
            </div>
          )}
        </div>
      </div>
      <Divider />

      {/* ----------------------- */}
      {/* Inline keyframes and utility styles */}
      {/* ----------------------- */}
      <style>
        {`
        @keyframes chainFlow {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        /* Ensure line-clamp works across browsers */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Blog card text overflow handling */
        .blog-card-title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
          max-height: 2.8em;
        }
        
        .blog-card-description {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.3;
          max-height: 2.6em;
        }
      `}
      </style>
    </>
  );
}

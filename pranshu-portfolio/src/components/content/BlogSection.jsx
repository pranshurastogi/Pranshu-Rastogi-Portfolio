// src/components/BlogSection.jsx
import React from "react";
import Parser from "rss-parser";
import BlogList from "./BlogList";
import FloatingBlockchainIcons from '../hero/FloatingBlockchainIcons';
import BlockchainMeshBg from '../ui/BlockchainMeshBg';
import SectionDivider from '../ui/SectionDivider';

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

  return (
    <>
      <SectionDivider />
      <div className="relative w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden">
        <BlockchainMeshBg />
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
      <SectionDivider />

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

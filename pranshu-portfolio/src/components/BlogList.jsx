// src/components/BlogList.jsx
"use client";

import React from "react";
import OptimizedImage from "./OptimizedImage";
import Link from "next/link";
import { motion } from "framer-motion";

// Animations
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Helper to pull first <img> out of HTML
function extractFirstImage(html = "") {
  try {
    const m = html.match(/<img.*?src=["']([^"']+)["']/i);
    return m ? m[1] : null;
  } catch (e) {
    console.error("Failed to extract image from HTML:", e);
    return null;
  }
}

export default function BlogList({ posts = [] }) {
  // early handling of missing or empty posts
  if (!Array.isArray(posts) || posts.length === 0) {
    console.warn("BlogList: no posts to display", posts);
    return (
      <div className="text-center py-8">
        <div className="bg-[#1a1a1a]/80 border border-[#39FF14] rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-[#39FF14] text-4xl mb-4">📝</div>
          <div className="text-[#39FF14] font-medium">No blog posts available at the moment. Please check back soon!</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl mx-auto px-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {posts.map((post, idx) => {
        let imgSrc;
        let contentSnippet;
        try {
          imgSrc = post.enclosure?.url || extractFirstImage(post.content);
          // Extract content snippet from content or use fallback
          if (post.content && typeof window !== 'undefined') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = post.content;
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            contentSnippet = textContent.substring(0, 120).trim() + (textContent.length > 120 ? '...' : '');
          } else {
            contentSnippet = 'Click to read more about this article...';
          }
        } catch (e) {
          console.error("Error determining image URL for post", post, e);
          imgSrc = null;
          contentSnippet = 'Click to read more about this article...';
        }
        
        const neonColors = ["#00ff99", "#39FF14", "#00e0ff"];
        const color = neonColors[idx % neonColors.length];
        
        return (
          <motion.div
            key={post.link}
            variants={item}
            className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 rounded-2xl shadow-xl overflow-hidden flex flex-col w-full h-72 sm:h-80 group cursor-pointer"
            style={{
              boxShadow: `0 4px 20px 0 ${color}66, 0 0 20px 0 ${color}33, inset 0 1px 0 rgba(255,255,255,0.1)`,
              borderColor: color,
              background: `linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)`
            }}
            whileHover={{ 
              scale: 1.05, 
              rotate: [0, 1, -1, 0], 
              boxShadow: `0 8px 32px 0 ${color}aa, 0 0 48px 0 ${color}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
              y: -8,
              borderColor: `${color}ff`
            }}
            whileTap={{ scale: 0.98, rotate: 0 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
            initial={{ opacity: 0, y: 60, scale: 0.8, rotate: -6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
          >
            {/* Blockchain connection lines */}
            <div className="absolute -top-1 left-1/2 w-0.5 h-2 bg-gradient-to-b from-transparent to-[#39FF14] opacity-60"></div>
            <div className="absolute -bottom-1 left-1/2 w-0.5 h-2 bg-gradient-to-t from-transparent to-[#39FF14] opacity-60"></div>
            
            {/* Enhanced hexagon background */}
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2 z-0 opacity-25"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.25 }}
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 8, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
              viewport={{ once: true }}
            >
              <svg width="48" height="42" viewBox="0 0 60 52" fill="none">
                <polygon points="30,4 56,18 56,44 30,56 4,44 4,18" fill={color} />
              </svg>
            </motion.div>
            
            {/* Blockchain SVG element */}
            <svg className="absolute -top-3 left-1/2 -translate-x-1/2 z-10" width="48" height="20" viewBox="0 0 48 20" fill="none">
              <rect x="0" y="6" width="48" height="8" rx="4" fill="#39FF14" opacity="0.15" />
              <rect x="16" y="8" width="8" height="4" rx="2" fill="#AEEA00" />
              <rect x="28" y="8" width="8" height="4" rx="2" fill="#00e0ff" />
            </svg>
            
            <Link
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full relative z-10"
            >
              {imgSrc && (
                <div className="relative w-full h-24 sm:h-28 overflow-hidden">
                  <OptimizedImage
                    src={imgSrc}
                    alt={`${post.title} - Blockchain blog post and Web3 content`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) =>
                      console.error("Next/Image failed to load", imgSrc)
                    }
                  />
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}
              
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-[#AEEA00] transition-colors duration-300 leading-tight blog-card-title">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-400 mb-2 blog-card-description leading-relaxed">
                    {contentSnippet}
                  </p>
                  <p className="text-xs text-[#39FF14] mb-2 bg-black/20 px-2 py-1 rounded-full border border-[#39FF14]/30 inline-block">
                    {new Date(post.isoDate).toLocaleDateString()}
                  </p>
                </div>
                
                {/* Read more indicator */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-[#AEEA00] text-xs sm:text-sm font-medium group-hover:text-[#39FF14] transition-colors duration-300">
                    Read More →
                  </span>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#39FF14]/20 border border-[#39FF14]/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#39FF14] rounded-full"></div>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Enhanced hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                 style={{
                   background: `linear-gradient(45deg, transparent 0%, ${color}20 50%, transparent 100%)`
                 }}>
            </div>
            
            {/* Animated mining effect */}
            <span className="absolute top-3 right-3 text-[#39FF14] animate-pulse text-lg z-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300">⛏️</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

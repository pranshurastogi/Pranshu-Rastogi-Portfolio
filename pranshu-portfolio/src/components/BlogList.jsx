// src/components/BlogList.jsx
"use client";

import React from "react";
import Image from "next/image";
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
      <section id="blog" className="py-16 bg-gradient-to-br from-[#0f2027] to-[#232526] w-full">
        <div className="container mx-auto px-8 text-center text-[#AEEA00]">
          <h3 className="text-3xl font-semibold mb-4 text-[#AEEA00] drop-shadow-lg">
            Latest Blog Posts
          </h3>
          <p className="bg-black/80 rounded-xl border border-[#39FF14] inline-block px-4 py-2">No blog posts available at the moment. Please check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-[#0f2027] to-[#232526] w-full">
      {/* Blockchain section divider (top) */}
      <div className="w-full flex justify-center items-center py-2">
        <svg width="180" height="32" viewBox="0 0 180 32" fill="none" className="animate-pulse">
          <rect x="0" y="12" width="60" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          <rect x="60" y="14" width="16" height="4" rx="2" fill="#AEEA00" />
          <rect x="84" y="14" width="16" height="4" rx="2" fill="#00e0ff" />
          <rect x="108" y="14" width="16" height="4" rx="2" fill="#a259ff" />
          <rect x="132" y="12" width="48" height="8" rx="4" fill="#39FF14" opacity="0.18" />
        </svg>
      </div>
      <div className="container mx-auto px-8">
        <h3 className="text-3xl font-semibold text-center mb-12 text-[#AEEA00] drop-shadow-lg">
          Latest Blog Posts
        </h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {posts.map((post, idx) => {
            let imgSrc;
            try {
              imgSrc = post.enclosure?.url || extractFirstImage(post.content);
            } catch (e) {
              console.error("Error determining image URL for post", post, e);
              imgSrc = null;
            }
            return (
              <motion.div
                key={post.link}
                variants={item}
                whileHover={{ scale: 1.07, rotate: 1, boxShadow: '0 0 40px #39FF14' }}
                className="block-card bg-black/80 border-2 border-[#39FF14] shadow-lg rounded-2xl overflow-hidden flex flex-col w-full min-h-[440px] relative group transition-all duration-300"
                initial={{ opacity: 0, y: 80, scale: 0.92, rotate: -4 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 120, delay: idx * 0.10 }}
              >
                {/* Blockchain SVG element */}
                <svg className="absolute -top-4 left-1/2 -translate-x-1/2 z-10" width="60" height="24" viewBox="0 0 60 24" fill="none">
                  <rect x="0" y="8" width="60" height="8" rx="4" fill="#39FF14" opacity="0.13" />
                  <rect x="20" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
                  <rect x="36" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
                </svg>
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {imgSrc && (
                    <div className="relative w-full h-52">
                      <Image
                        src={imgSrc}
                        alt={post.title}
                        fill
                        className="object-cover rounded-t-2xl"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        onError={(e) =>
                          console.error("Next/Image failed to load", imgSrc)
                        }
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <h4 className="text-lg font-medium text-[#AEEA00] mb-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-[#39FF14] mb-4">
                      {new Date(post.isoDate).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
                {/* Animated mining effect */}
                <span className="absolute top-3 right-3 text-[#39FF14] animate-pulse text-xl z-20 group-hover:opacity-100 opacity-0 transition-opacity">⛏️</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      {/* Blockchain section divider (bottom) */}
      <div className="w-full flex justify-center items-center py-2 mt-8">
        <svg width="180" height="32" viewBox="0 0 180 32" fill="none" className="animate-pulse">
          <rect x="0" y="12" width="60" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          <rect x="60" y="14" width="16" height="4" rx="2" fill="#AEEA00" />
          <rect x="84" y="14" width="16" height="4" rx="2" fill="#00e0ff" />
          <rect x="108" y="14" width="16" height="4" rx="2" fill="#a259ff" />
          <rect x="132" y="12" width="48" height="8" rx="4" fill="#39FF14" opacity="0.18" />
        </svg>
      </div>
    </section>
  );
}

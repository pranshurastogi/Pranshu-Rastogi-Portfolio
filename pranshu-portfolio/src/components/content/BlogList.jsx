// src/components/BlogList.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassBlogCard } from "../ui/glass-blog-card";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Helper to pull first <img> out of HTML
function extractFirstImage(html = "") {
  try {
    const m = html.match(/<img.*?src=["']([^"']+)["']/i);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

// Estimate read time from HTML content
function estimateReadTime(html = "") {
  try {
    const text = html.replace(/<[^>]*>/g, " ");
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  } catch {
    return null;
  }
}

// Strip HTML and get plain text excerpt
function getExcerpt(html = "", maxLength = 120) {
  try {
    const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  } catch {
    return "Click to read this article on Medium.";
  }
}

export default function BlogList({ posts = [] }) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-[#1a1a1a]/80 border border-[#39FF14] rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-[#39FF14] text-4xl mb-4">📝</div>
          <div className="text-[#39FF14] font-medium">
            No blog posts available at the moment. Please check back soon!
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {posts.map((post, idx) => {
        const imgSrc = post.enclosure?.url || extractFirstImage(post.content);
        const excerpt = getExcerpt(post.content || post.contentSnippet || "");
        const readTime = estimateReadTime(post.content || "");
        const tags = Array.isArray(post.categories) ? post.categories : [];
        const date = post.isoDate
          ? new Date(post.isoDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "";

        return (
          <motion.div key={post.link || idx} variants={item}>
            <GlassBlogCard
              title={post.title}
              excerpt={excerpt}
              image={imgSrc}
              author={{ name: post.creator || "Pranshu Rastogi" }}
              date={date}
              readTime={readTime}
              tags={tags}
              href={post.link}
              className="h-full"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// src/components/BlogSection.jsx
import React from "react";
import Parser from "rss-parser";
import BlogList from "./BlogList";
import SectionWrapper from './SectionWrapper';

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
    posts = feed.items.slice(0, 3);
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
      <SectionWrapper>
        {/* Remove redundant section and SVG backgrounds, keep only BlogList and error handling */}
        {error ? (
          <div className="text-center py-8 text-[#AEEA00]">{error}</div>
        ) : (
          <BlogList posts={posts} />
        )}
      </SectionWrapper>
      <Divider />

      {/* ----------------------- */}
      {/* Inline keyframes */}
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
      `}
      </style>
    </>
  );
}

// src/components/BlogSection.jsx
import Parser from "rss-parser";
import BlogList from "./BlogList";
import React from "react";

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

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return <BlogList posts={posts} />;
}

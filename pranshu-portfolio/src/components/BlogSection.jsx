// src/components/BlogSection.jsx
import Parser from "rss-parser";
import BlogList from "./BlogList";

export default async function BlogSection() {
  const parser = new Parser({
    customFields: { item: [["content:encoded", "content"]] },
  });

  let posts = [];
  try {
    const feed = await parser.parseURL(
      "https://pranshurastogi.medium.com/feed"
    );
    posts = feed.items.slice(0, 3);
  } catch (err) {
    console.warn("Failed to fetch Medium RSS:", err);
  }

  return <BlogList posts={posts} />;
}

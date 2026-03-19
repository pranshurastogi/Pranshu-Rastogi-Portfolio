import React from "react";
import Parser from "rss-parser";
import BlogList from "./BlogList";

export default async function BlogSection() {
  const parser = new Parser({
    customFields: { item: [["content:encoded", "content"]] },
  });

  let posts = [];
  let error = null;
  try {
    const res = await fetch("https://pranshurastogi.medium.com/feed", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
    const xml = await res.text();
    const feed = await parser.parseString(xml);
    posts = feed.items.slice(0, 3);
  } catch (err) {
    error = "Failed to load blog posts. Please try again later.";
    console.warn("Failed to fetch Medium RSS:", err);
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Latest Writing
          </h2>
          <div className="section-divider mb-4" />
          <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
            Thoughts on blockchain, engineering, and the future of decentralized systems.
          </p>
          <a
            href="https://specterpq.com/insights"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-[var(--accent-purple-dim)] border border-[var(--accent-purple)]/20 text-[var(--accent-purple)] hover:border-[var(--accent-purple)]/40 hover:text-white transition-all text-xs font-mono"
          >
            <span>🔬</span>
            Post-Quantum & Privacy Research on SPECTER Insights
            <span className="text-[var(--text-muted)]">→</span>
          </a>
        </div>

        {error ? (
          <div className="text-center py-8">
            <div className="bg-[var(--bg-secondary)] border border-white/[0.06] rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-[var(--text-muted)]">{error}</p>
            </div>
          </div>
        ) : (
          <BlogList posts={posts} />
        )}
      </div>
    </div>
  );
}

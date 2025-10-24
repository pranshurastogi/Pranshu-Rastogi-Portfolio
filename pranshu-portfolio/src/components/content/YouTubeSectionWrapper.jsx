// src/components/YouTubeSectionWrapper.jsx
import Parser from "rss-parser";
import YouTubeSection from "./YouTubeSection";
import React from "react";

export const revalidate = 3600; // 1 hour ISR for RSS

export default async function YouTubeSectionWrapper() {
  const parser = new Parser();
  try {
    const feed = await parser.parseURL(
      "https://www.youtube.com/feeds/videos.xml?channel_id=UC8INoQWXK5AwIe5Fdb0BO2Q"
    );

    const videos = feed.items
      .map((item) => {
        try {
          const url = new URL(item.link);
          const videoId = url.searchParams.get("v");
          if (!videoId) return null;
          return { videoId, title: item.title };
        } catch (err) {
          return null;
        }
      })
      .filter(Boolean);

    return <YouTubeSection videos={videos} />;
  } catch (error) {
    return (
      <section id="youtube" className="py-16 bg-base-100">
        <div className="container mx-auto px-4 text-center text-[#AEEA00]">
          <p>Videos are cooling down. Check back soon.</p>
        </div>
      </section>
    );
  }
}

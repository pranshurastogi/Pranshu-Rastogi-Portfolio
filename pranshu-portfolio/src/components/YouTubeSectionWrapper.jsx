// src/components/YouTubeSectionWrapper.jsx
import Parser from "rss-parser";
import YouTubeSection from "./YouTubeSection";

export default async function YouTubeSectionWrapper() {
  const parser = new Parser();
  try {
    const feed = await parser.parseURL(
      "https://www.youtube.com/feeds/videos.xml?channel_id=UC8INoQWXK5AwIe5Fdb0BO2Q"
    );

    // map all videos, handle parsing errors
    const videos = feed.items
      .map((item) => {
        try {
          const url = new URL(item.link);
          const videoId = url.searchParams.get("v");
          if (!videoId) throw new Error("Missing video ID");
          return { videoId, title: item.title };
        } catch (err) {
          console.error("YouTube item parse error:", err);
          return null;
        }
      })
      .filter(Boolean);

    return <YouTubeSection videos={videos} />;
  } catch (error) {
    console.error("Failed to fetch YouTube feed:", error);
    return (
      <section id="youtube" className="py-16 bg-base-100">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>Failed to load videos. Please try again later.</p>
        </div>
      </section>
    );
  }
}

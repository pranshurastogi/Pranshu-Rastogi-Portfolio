// src/components/YouTubeSectionWrapper.jsx
import Parser from "rss-parser";
import YouTubeSection from "./YouTubeSection";
import React from "react";

export const revalidate = 3600; // 1 hour ISR for RSS

// Fallback video IDs - manually updated from your channel
// To add new videos: get video ID from YouTube URL (e.g., https://youtube.com/watch?v=VIDEO_ID)
const FALLBACK_VIDEOS = [
  { videoId: "nh3vEoGYN24", title: "XRange : Cross Chain Trailing Range Rebalancer Uniswap v4 Hooks" },
  { videoId: "UPJ7uowUepU", title: "Open Intent Framework by Ethereum : Discover the Open Intent Advantage! [ERC - 7683]" },
  { videoId: "rcySZCHCaq4", title: "How to Send Email from Ethereum to Solana! (Push Chain Step-by-Step)" },
  { videoId: "bIiewuAYo3Y", title: "How to become DevRel in web3 ?" },
  { videoId: "TkXput4WxyA", title: "How to become Ecosystem Developer in web3?" },
];

const YOUTUBE_CHANNEL_ID = "UC8INoQWXK5AwIe5Fdb0BO2Q";
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

async function fetchYouTubeRSS() {
  try {
    // Try with custom fetch and headers
    const response = await fetch(RSS_FEED_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
        "Accept": "application/xml, text/xml, */*",
      },
      signal: AbortSignal.timeout(8000), // 8 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const parser = new Parser();
    const feed = await parser.parseString(xmlText);

    const videos = feed.items
      .map((item) => {
        try {
          let videoId = null;
          // Try to get video ID from link
          if (item.link) {
            const url = new URL(item.link);
            videoId = url.searchParams.get("v");
          }
          // Fallback: YouTube Atom feeds have id like "yt:video:VIDEO_ID"
          if (!videoId && item.id && typeof item.id === "string") {
            const parts = item.id.split(":");
            videoId = parts[parts.length - 1] || null;
          }
          if (!videoId || !item.title) return null;
          return { videoId, title: item.title };
        } catch (err) {
          return null;
        }
      })
      .filter(Boolean);

    return videos.length > 0 ? videos : null;
  } catch (error) {
    console.error("[YouTubeSection] RSS fetch failed:", error.message);
    return null;
  }
}

export default async function YouTubeSectionWrapper() {
  try {
    // Try to fetch from RSS feed first
    const rssVideos = await fetchYouTubeRSS();
    
    if (rssVideos && rssVideos.length > 0) {
      console.log("[YouTubeSection] Successfully loaded from RSS feed");
      return <YouTubeSection videos={rssVideos} />;
    }

    // Fallback to manual video list
    console.log("[YouTubeSection] Using fallback video list");
    return <YouTubeSection videos={FALLBACK_VIDEOS} />;
  } catch (error) {
    console.error("[YouTubeSection] Failed to load videos:", error);
    // Still show fallback videos instead of error message
    return <YouTubeSection videos={FALLBACK_VIDEOS} />;
  }
}

"use client";
import { motion } from "framer-motion";
import { getThumbnailUrl, FALLBACK_THUMB } from "./youtubeConstants";
import { Play } from "lucide-react";

/**
 * Modern video card: thumbnail-first, title below, clean hover.
 */
export default function YouTubeVideoCard({ video, index, onSelect }) {
  const handleImgError = (e) => {
    e.target.src = getThumbnailUrl(video.videoId, "hq");
    e.target.onerror = () => {
      e.target.src = FALLBACK_THUMB;
    };
  };

  return (
    <motion.article
      className="group rounded-2xl overflow-hidden bg-[#111] border border-white/[0.06] hover:border-[#39FF14]/40 transition-colors duration-300 cursor-pointer min-w-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={onSelect}
    >
      {/* Thumbnail - aspect-video like YouTube */}
      <div className="relative w-full aspect-video overflow-hidden bg-black">
        <img
          src={getThumbnailUrl(video.videoId)}
          alt={video.title}
          loading="lazy"
          onError={handleImgError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Play button - YouTube-style */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/40 scale-90 group-hover:scale-100 transition-transform duration-200">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" strokeWidth={2} />
          </div>
        </div>
      </div>
      {/* Title below thumbnail */}
      <div className="p-4">
        <h3 className="text-[#e5e5e5] font-medium text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-white transition-colors">
          {video.title}
        </h3>
        <p className="text-white/50 text-xs mt-1.5">Watch on YouTube</p>
      </div>
    </motion.article>
  );
}

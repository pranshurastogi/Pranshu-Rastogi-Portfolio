// src/components/YouTubeSection.jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getVisibleVideos } from "./youtubeConstants";
import YouTubeVideoCard from "./YouTubeVideoCard";
import { X } from "lucide-react";

export default function YouTubeSection({ videos }) {
  if (!Array.isArray(videos)) {
    return (
      <div className="text-center py-12 text-white/70">
        Invalid video data.
      </div>
    );
  }
  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-white/70">
        No videos available.
      </div>
    );
  }

  const [modalVideo, setModalVideo] = useState(null);
  const visibleVideos = getVisibleVideos(videos);

  return (
    <div
      id="youtube"
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0c0c0c] to-[#0a0a0a] border border-white/[0.06] scroll-mt-20"
    >
      {/* Subtle top gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#AEEA00]/[0.04] to-transparent pointer-events-none" />

      <div className="relative z-10 py-10 sm:py-14 md:py-16 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Latest YouTube Videos
          </h2>
          <p className="text-white/50 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Talks, tutorials, and updates from the channel
          </p>
          <div className="mt-4 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-[#AEEA00]/60 to-transparent rounded-full" />
        </div>

        {/* Video grid */}
        <div className="grid w-full max-w-6xl mx-auto gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visibleVideos.map((video, idx) => (
            <YouTubeVideoCard
              key={video.videoId}
              video={video}
              index={idx}
              onSelect={() => setModalVideo(video)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalVideo(null)}
          >
            <motion.div
              className="bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full border border-white/10"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10">
                <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-1 pr-4">
                  {modalVideo.title}
                </h3>
                <button
                  className="shrink-0 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  onClick={() => setModalVideo(null)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${modalVideo.videoId}?autoplay=1`}
                  title={modalVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

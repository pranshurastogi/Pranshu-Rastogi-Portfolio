// src/components/YouTubeSection.jsx
"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Animated mesh/hex background
function YouTubeGalleryBg() {
  return (
    <svg
      width="100%"
      height="100%"
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
    >
      {[...Array(10)].map((_, i) => (
        <polygon
          key={i}
          points="30,5 55,20 55,50 30,65 5,50 5,20"
          fill="#805AD5"
          opacity="0.07"
          style={{
            transform: `translate(${i * 11 + 5}vw, ${
              i % 2 === 0 ? 10 : 30
            }vh) scale(${0.7 + 0.1 * (i % 3)})`,
          }}
        >
          <animate
            attributeName="opacity"
            values="0.07;0.13;0.07"
            dur={`${7 + i}s`}
            repeatCount="indefinite"
          />
        </polygon>
      ))}
      <polyline
        points="0,100 200,120 400,80 600,140 800,100"
        fill="none"
        stroke="#38A169"
        strokeOpacity="0.04"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function YouTubeSection({ videos }) {
  // type checks & empty state
  if (!Array.isArray(videos)) {
    return <div className="text-center py-8">Invalid video data.</div>;
  }
  if (videos.length === 0) {
    return <div className="text-center py-8">No videos available.</div>;
  }

  const visibleCount = 4;
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVideo, setModalVideo] = useState(null);

  const maxVisible = Math.min(visibleCount, videos.length);

  // Carousel nav
  const prev = () =>
    setActiveIndex((i) => (i - 1 + videos.length) % videos.length);
  const next = () => setActiveIndex((i) => (i + 1) % videos.length);

  // Touch support
  const touchStartRef = useRef(null);
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartRef.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartRef.current;
    if (delta > 50) prev();
    else if (delta < -50) next();
    touchStartRef.current = null;
  };

  // slice visible set
  const visibleVideos = Array.from({ length: maxVisible }, (_, i) => {
    const idx = (activeIndex + i) % videos.length;
    return videos[idx];
  });

  // thumbnail + fallback
  const getThumbnail = (id) =>
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const handleImgError = (e) => {
    e.target.src = "/images/fallback.jpg";
  };

  // animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, type: "spring", stiffness: 200 },
    }),
    hover: { scale: 1.05, rotate: 1, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <section id="youtube" className="py-16 bg-base-100 relative overflow-hidden">
      <YouTubeGalleryBg />
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center text-primary mb-8">
          Latest YouTube Videos
        </h3>

        <div
          className="relative flex items-center justify-center max-w-5xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Prev arrow */}
          {videos.length > maxVisible && (
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
              aria-label="Previous"
            >
              <FaChevronLeft size={24} />
            </motion.button>
          )}

          {/* Cards */}
          <div className="flex gap-6 justify-center overflow-hidden">
            {visibleVideos.map((video, idx) => (
              <motion.div
                key={video.videoId}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="w-72 h-48 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-0.5 cursor-pointer shadow-lg"
                onClick={() => setModalVideo(video)}
              >
                <div className="relative w-full h-full bg-black rounded-[calc(1rem-2px)] overflow-hidden">
                  <img
                    src={getThumbnail(video.videoId)}
                    alt={video.title}
                    loading="lazy"
                    onError={handleImgError}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40">
                    <span className="text-white text-5xl">▶</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <h4 className="text-white text-sm font-semibold line-clamp-2">
                      {video.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Next arrow */}
          {videos.length > maxVisible && (
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
              aria-label="Next"
            >
              <FaChevronRight size={24} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalVideo(null)}
          >
            <motion.div
              className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${modalVideo.videoId}`}
                  title={modalVideo.title}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="text-lg font-semibold mb-2">{modalVideo.title}</h4>
                <button
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                  onClick={() => setModalVideo(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

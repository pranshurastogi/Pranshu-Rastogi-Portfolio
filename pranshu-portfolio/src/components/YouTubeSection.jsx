// src/components/YouTubeSection.jsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingBlockchainIcons from "./FloatingBlockchainIcons";
import SectionWrapper from './SectionWrapper';

function YouTubeGalleryBg() {
  // Generate random positions for Ξ symbols only on the client
  const [ethPositions, setEthPositions] = useState(null);
  useEffect(() => {
    const positions = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setEthPositions(positions);
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
    >
      {/* drifting hexagons */}
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

      {/* subtle Ethereum Ξ symbols */}
      {ethPositions && ethPositions.map((pos, i) => (
        <text
          key={i}
          x={`${pos.x}%`}
          y={`${pos.y}%`}
          fill="#38A169"
          opacity="0.05"
          fontSize="40"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          Ξ
          <animate
            attributeName="opacity"
            values="0.05;0.12;0.05"
            dur={`${5 + i}s`}
            repeatCount="indefinite"
          />
        </text>
      ))}

      {/* sweeping wave line */}
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
  if (!Array.isArray(videos)) {
    return <div className="text-center py-8">Invalid video data.</div>;
  }
  if (videos.length === 0) {
    return <div className="text-center py-8">No videos available.</div>;
  }

  const [modalVideo, setModalVideo] = useState(null);
  const visibleVideos = videos.slice(0, 4);

  const getThumbnail = (id) =>
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const handleImgError = (e) => {
    e.target.src = "/images/fallback.jpg";
  };

  return (
    <SectionWrapper>
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center text-[#AEEA00] mb-8 drop-shadow-lg">
          Latest YouTube Videos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
          {visibleVideos.slice(0, 4).map((video, idx) => (
            <motion.div
              key={video.videoId}
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group bg-black/80 border-2 border-[#39FF14] p-1 transition-all duration-300"
              whileHover={{ boxShadow: '0 0 32px #39FF14', scale: 1.04 }}
              onClick={() => setModalVideo(video)}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, delay: idx * 0.08 }}
            >
              <div className="relative w-full h-48 sm:h-56 md:h-56 rounded-xl overflow-hidden bg-black">
                <img
                  src={getThumbnail(video.videoId)}
                  alt={video.title}
                  loading="lazy"
                  onError={handleImgError}
                  className="w-full h-full object-cover rounded-xl group-hover:brightness-110 group-hover:scale-105 transition duration-300"
                />
                {/* Web3 border animation */}
                <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-[#AEEA00] group-hover:animate-pulse" />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40">
                  <span className="text-white text-5xl">▶</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <h4 className="text-[#AEEA00] text-sm font-semibold line-clamp-2">
                    {video.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Modal/Lightbox */}
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
              className="bg-black rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full border-2 border-[#39FF14]"
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
                <h4 className="text-lg font-semibold mb-2 text-[#AEEA00]">{modalVideo.title}</h4>
                <button
                  className="px-4 py-2 bg-[#39FF14] text-black rounded-lg hover:bg-[#AEEA00] transition"
                  onClick={() => setModalVideo(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

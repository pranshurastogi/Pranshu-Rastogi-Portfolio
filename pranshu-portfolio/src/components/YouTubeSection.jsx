// src/components/YouTubeSection.jsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingBlockchainIcons from "./FloatingBlockchainIcons";

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
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
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
    <div className="relative w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden">
      {/* Animated blockchain lines background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" width="100%" height="100%" viewBox="0 0 1200 300">
        {/* Main neon chain */}
        <polyline points="60,120 180,80 320,160 500,100 700,180 900,120 1100,180" fill="none" stroke="#39FF14" strokeWidth="2.2" strokeDasharray="16 12" opacity="0.15">
          <animate attributeName="stroke-dashoffset" values="60;0;100" dur="10s" repeatCount="indefinite" />
        </polyline>
        {/* Random mesh lines for blockchain effect */}
        <polyline points="100,200 220,110 340,180 480,90 600,210 740,130 900,200 1150,140" fill="none" stroke="#AEEA00" strokeWidth="1.5" strokeDasharray="10 8" opacity="0.12">
          <animate attributeName="stroke-dashoffset" values="40;0;60" dur="13s" repeatCount="indefinite" />
        </polyline>
        <polyline points="80,60 200,140 350,100 520,180 700,80 850,160 1050,100 1190,180" fill="none" stroke="#00e0ff" strokeWidth="1.2" strokeDasharray="8 7" opacity="0.10">
          <animate attributeName="stroke-dashoffset" values="30;0;50" dur="15s" repeatCount="indefinite" />
        </polyline>
        <polyline points="120,180 260,90 400,160 600,120 800,200 1000,140 1150,220" fill="none" stroke="#a259ff" strokeWidth="1.1" strokeDasharray="12 10" opacity="0.08">
          <animate attributeName="stroke-dashoffset" values="20;0;40" dur="17s" repeatCount="indefinite" />
        </polyline>
        <polyline points="60,220 180,160 320,240 500,180 700,260 900,200 1100,260" fill="none" stroke="#39FF14" strokeWidth="1.3" strokeDasharray="14 11" opacity="0.06">
          <animate attributeName="stroke-dashoffset" values="10;0;30" dur="19s" repeatCount="indefinite" />
        </polyline>
      </svg>
      
      {/* Subtle floating blockchain icons */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <FloatingBlockchainIcons interactive={false} />
      </div>

      {/* Enhanced header with blockchain theme */}
      <div className="relative z-10 py-8 sm:py-12 md:py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#AEEA00] mb-4 drop-shadow-lg tracking-tight">
            Latest YouTube Videos
          </h2>
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"></div>
            <div className="w-3 h-3 bg-[#39FF14] rounded-full animate-pulse"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          {visibleVideos.map((video, idx) => {
            const neonColors = ["#00ff99", "#39FF14", "#00e0ff", "#a259ff"];
            const color = neonColors[idx % neonColors.length];
            
            return (
              <motion.div
                key={video.videoId}
                className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 rounded-2xl shadow-xl overflow-hidden cursor-pointer group"
                style={{
                  boxShadow: `0 4px 24px 0 ${color}66, 0 0 24px 0 ${color}33, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  borderColor: color,
                  background: `linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)`
                }}
                whileHover={{ 
                  scale: 1.03, 
                  rotate: [0, 0.5, -0.5, 0], 
                  boxShadow: `0 8px 32px 0 ${color}aa, 0 0 48px 0 ${color}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
                  y: -6,
                  borderColor: `${color}ff`
                }}
                whileTap={{ scale: 0.98, rotate: 0 }}
                onClick={() => setModalVideo(video)}
                initial={{ opacity: 0, y: 40, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Blockchain connection lines */}
                <div className="absolute -top-1 left-1/2 w-0.5 h-2 bg-gradient-to-b from-transparent to-[#39FF14] opacity-50"></div>
                <div className="absolute -bottom-1 left-1/2 w-0.5 h-2 bg-gradient-to-t from-transparent to-[#39FF14] opacity-50"></div>
                
                {/* Enhanced hexagon background */}
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-0 opacity-20"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.2 }}
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 8, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                  viewport={{ once: true }}
                >
                  <svg width="40" height="35" viewBox="0 0 50 43" fill="none">
                    <polygon points="25,3 46,14 46,36 25,47 4,36 4,14" fill={color} />
                  </svg>
                </motion.div>

                <div className="relative w-full h-64 sm:h-72 rounded-t-2xl overflow-hidden bg-black">
                  <img
                    src={getThumbnail(video.videoId)}
                    alt={video.title}
                    loading="lazy"
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Enhanced overlay with blockchain theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-[#39FF14]/20 backdrop-blur-sm rounded-full border-2 border-[#39FF14] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-[#39FF14] text-2xl">▶</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                    <h4 className="text-[#AEEA00] text-lg font-bold line-clamp-2 group-hover:text-[#39FF14] transition-colors duration-300">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
                      <span className="text-[#39FF14]/80 text-sm">Click to watch</span>
                    </div>
                  </div>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                     style={{
                       background: `linear-gradient(45deg, transparent 0%, ${color}15 50%, transparent 100%)`
                     }}>
                </div>
                
                {/* Blockchain pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  style={{ borderColor: color }}
                  animate={{ 
                    scale: [1, 1.02, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Modal/Lightbox */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalVideo(null)}
          >
            <motion.div
              className="bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full border-2 border-[#39FF14] relative"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="bg-[#1a1a1a] px-6 py-4 border-b border-[#39FF14]/30">
                <h3 className="text-xl font-bold text-[#AEEA00] text-center">{modalVideo.title}</h3>
              </div>
              
              <div className="relative w-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${modalVideo.videoId}`}
                  title={modalVideo.title}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
              
              <div className="bg-[#1a1a1a] px-6 py-4 border-t border-[#39FF14]/30 flex justify-center">
                <button
                  className="px-6 py-3 bg-[#39FF14] text-black font-bold rounded-lg hover:bg-[#AEEA00] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#39FF14]/50"
                  onClick={() => setModalVideo(null)}
                >
                  Close Video
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

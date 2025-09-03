// src/components/MediaSection.jsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaEthereum, FaBitcoin } from "react-icons/fa";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import FloatingBlockchainIcons from "./FloatingBlockchainIcons";

const mediaItems = [
  {
    url: "https://youtu.be/vEJvaVTWb_M?si=SVrUotAbEP4EcWx2",
    title: "Open Intent Framework - Discover the Open Intent advantage",
    thumbnail: "https://img.youtube.com/vi/vEJvaVTWb_M/maxresdefault.jpg",
  },
  {
    url: "https://kukufm.com/show/get-started-with-blockchain?utm_source=share_sh",
    title: "Kuku FM Podcast: Get Started with Blockchain",
    thumbnail: "/images/kuku.png",  // download/upload a suitable image
  },
  {
    url: "https://open.spotify.com/episode/1qQ57vyYZb5366843Gh24Z",
    title: "Spotify:Where's The Block?",
    thumbnail: "/images/wtb.png",     // grab the show/episode cover
  },
  {
    url: "https://youtube.com/shorts/pII6zoDs_1k?si=sVzxBVM9Q32aMeG1",
    title: "4k+ audience at LPU",
    thumbnail: "/images/lpu.png",
  },
  {
    url: "https://youtu.be/R00PZeQuB8I?si=-diX-f704Jrz3uVs",
    title: "Ethereum Merge",
    thumbnail: "https://img.youtube.com/vi/R00PZeQuB8I/maxresdefault.jpg",
  },
];

// Blockchain chain/mesh background
function BlockchainMediaBg() {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 w-full h-full pointer-events-none select-none z-0" style={{top:0,left:0}}>
      <g>
        <rect x="10%" y="30%" width="32" height="32" rx="8" fill="#00ff99" opacity="0.10">
          <animate attributeName="y" values="30%;40%;30%" dur="7s" repeatCount="indefinite" />
        </rect>
        <rect x="70%" y="60%" width="28" height="28" rx="7" fill="#39FF14" opacity="0.10">
          <animate attributeName="y" values="60%;70%;60%" dur="9s" repeatCount="indefinite" />
        </rect>
        <rect x="40%" y="15%" width="18" height="18" rx="5" fill="#00e0ff" opacity="0.09">
          <animate attributeName="y" values="15%;25%;15%" dur="11s" repeatCount="indefinite" />
        </rect>
        <polyline points="0,80 100,100 200,60 300,110 400,80 500,120 600,100 700,140" fill="none" stroke="#AEEA00" strokeOpacity="0.06" strokeWidth="2">
          <animate attributeName="points" values="0,80 100,100 200,60 300,110 400,80 500,120 600,100 700,140;0,90 100,110 200,70 300,120 400,90 500,130 600,110 700,150;0,80 100,100 200,60 300,110 400,80 500,120 600,100 700,140" dur="16s" repeatCount="indefinite" />
        </polyline>
      </g>
    </svg>
  );
}

export default function MediaSection() {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  // For block indicators
  const [activeIdx, setActiveIdx] = React.useState(0);

  // Drag logic for slider
  const handleDragEnd = (event, info) => {
    const width = containerRef.current?.clientWidth || 1;
    const cardWidth = 280; // w-64 + gap
    let idx = Math.round(-x.get() / cardWidth);
    idx = Math.max(0, Math.min(mediaItems.length - 1, idx));
    setActiveIdx(idx);
    controls.start({ x: -idx * cardWidth });
  };

  // Button navigation
  const scrollToIdx = (idx) => {
    setActiveIdx(idx);
    controls.start({ x: -idx * 280 });
  };

  return (
    <>
      {/* Blockchain section divider (top) */}
      <div className="w-full flex justify-center items-center py-2">
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="animate-pulse">
          <rect x="0" y="8" width="40" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          <rect x="40" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
          <rect x="56" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
          <rect x="72" y="10" width="8" height="4" rx="2" fill="#a259ff" />
          <rect x="88" y="8" width="32" height="8" rx="4" fill="#39FF14" opacity="0.18" />
        </svg>
      </div>
      <div className="relative py-16 md:py-24 px-4 rounded-2xl bg-[#181a20] border-2 border-[#2d3748] shadow-lg overflow-hidden my-8">
        <div className="container mx-auto px-4">
          <motion.h3
            className="text-3xl font-semibold text-center mb-8 text-[#AEEA00] drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Featured In
          </motion.h3>
          <div className="relative">
            {/* Prev */}
            <motion.button
              whileTap={{ scale: 0.85, x: -8 }}
              onClick={() => scrollToIdx(Math.max(0, activeIdx - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/80 p-2 rounded-full shadow z-20 hover:bg-[#232526] border-2 border-[#39FF14] text-[#AEEA00]"
              aria-label="Scroll left"
            >
              <FaChevronLeft size={20} />
            </motion.button>
            {/* Carousel - draggable */}
            <motion.div
              ref={containerRef}
              className="flex flex-row gap-8 overflow-x-auto pb-4 no-scrollbar"
              style={{ minWidth: '100%' }}
              animate={{ x: -activeIdx * 280 }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            >
              {mediaItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="relative w-64 rounded-2xl overflow-hidden shadow-xl bg-black/80 border-2 border-[#39FF14] group transition-all duration-300 flex-shrink-0"
                  whileHover={{ boxShadow: '0 0 40px #39FF14', scale: 1.06 }}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 120, delay: 0.05 * i }}
                >
                  {/* Blockchain SVG element */}
                  <svg className="absolute -top-4 left-1/2 -translate-x-1/2 z-10" width="60" height="24" viewBox="0 0 60 24" fill="none">
                    <rect x="0" y="8" width="60" height="8" rx="4" fill="#39FF14" opacity="0.13" />
                    <rect x="20" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
                    <rect x="36" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
                  </svg>
                  {/* Block number/hash */}
                  <span className="absolute top-2 left-2 bg-[#232526] text-[#AEEA00] text-xs font-mono px-2 py-1 rounded-full shadow-sm z-10">
                    Block #{i + 1}
                  </span>
                  {/* Mining effect on hover */}
                  <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#39FF14] animate-pulse text-lg z-10">
                    ⛏️
                  </span>
                  <Link href={item.url} target="_blank" rel="noopener noreferrer">
                    <div className="relative w-full h-40">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 16rem"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-lg text-[#AEEA00]">{item.title}</h4>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            {/* Next */}
            <motion.button
              whileTap={{ scale: 0.85, x: 8 }}
              onClick={() => scrollToIdx(Math.min(mediaItems.length - 1, activeIdx + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/80 p-2 rounded-full shadow z-20 hover:bg-[#232526] border-2 border-[#39FF14] text-[#AEEA00]"
              aria-label="Scroll right"
            >
              <FaChevronRight size={20} />
            </motion.button>
            {/* Block indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {mediaItems.map((_, i) => (
                <motion.span
                  key={i}
                  className={`w-6 h-3 rounded-md ${activeIdx === i ? 'bg-[#AEEA00]' : 'bg-[#232526]'} block transition-all`}
                  animate={{ scale: activeIdx === i ? 1.2 : 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Blockchain section divider (bottom) */}
      <div className="w-full flex justify-center items-center py-2">
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="animate-pulse">
          <rect x="0" y="8" width="40" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          <rect x="40" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
          <rect x="56" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
          <rect x="72" y="10" width="8" height="4" rx="2" fill="#a259ff" />
          <rect x="88" y="8" width="32" height="8" rx="4" fill="#39FF14" opacity="0.18" />
        </svg>
      </div>
    </>
  );
}

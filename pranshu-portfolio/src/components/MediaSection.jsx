// src/components/MediaSection.jsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaEthereum, FaBitcoin } from "react-icons/fa";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import React from "react";

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
    <svg width="100%" height="100%" className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      {/* Animated chain links */}
      <g>
        {[0,1,2,3,4,5,6].map((i) => (
          <rect
            key={i}
            x={`${10 + i * 13}%`}
            y={i % 2 === 0 ? "30%" : "50%"}
            width="48"
            height="16"
            rx="8"
            fill="#805AD5"
            opacity="0.08"
          >
            <animate attributeName="y" values={i%2===0?"30%;40%;30%":"50%;60%;50%"} dur={`${6+i}s`} repeatCount="indefinite" />
          </rect>
        ))}
        {/* Subtle mesh lines */}
        <polyline points="0,80 100,100 200,60 300,110 400,80 500,120 600,100 700,140" fill="none" stroke="#38A169" strokeOpacity="0.04" strokeWidth="2" />
      </g>
      {/* Floating Ethereum logo */}
      <g>
        <motion.g animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}>
          <FaEthereum x="90%" y="10%" style={{ position: 'absolute', left: '90%', top: '10%', fontSize: 32, color: '#627EEA', opacity: 0.13 }} />
        </motion.g>
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
    <section id="media" className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <BlockchainMediaBg />
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-8 text-primary">
          Featured In
        </h3>
        <div className="relative">
          {/* Prev */}
          <motion.button
            whileTap={{ scale: 0.85, x: -8 }}
            onClick={() => scrollToIdx(Math.max(0, activeIdx - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow z-20 hover:bg-white border-2 border-indigo-200"
            aria-label="Scroll left"
          >
            <FaChevronLeft size={20} />
          </motion.button>
          {/* Carousel - draggable */}
          <div className="overflow-x-hidden px-8">
            <motion.div
              ref={containerRef}
              className="flex space-x-6 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -(mediaItems.length - 1) * 280, right: 0 }}
              style={{ x }}
              animate={controls}
              onDragEnd={handleDragEnd}
            >
              {mediaItems.map((item, i) => (
                <motion.div
                  key={i}
                  className={`flex-none w-64 snap-start rounded-2xl overflow-hidden shadow-xl bg-white border-2 border-indigo-100 relative group transition-all duration-300 ${activeIdx === i ? 'ring-2 ring-indigo-400' : ''}`}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.12, type: 'spring', stiffness: 120 }}
                  whileHover={{ boxShadow: '0 0 32px 0 #805AD5', scale: 1.04 }}
                >
                  {/* Block number/hash */}
                  <span className="absolute top-2 left-2 bg-indigo-50 text-indigo-400 text-xs font-mono px-2 py-1 rounded-full shadow-sm z-10">
                    Block #{i + 1}
                  </span>
                  {/* Mining effect on hover */}
                  <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400 animate-pulse text-lg z-10">
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
                      <h4 className="font-medium text-lg">{item.title}</h4>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* Next */}
          <motion.button
            whileTap={{ scale: 0.85, x: 8 }}
            onClick={() => scrollToIdx(Math.min(mediaItems.length - 1, activeIdx + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow z-20 hover:bg-white border-2 border-indigo-200"
            aria-label="Scroll right"
          >
            <FaChevronRight size={20} />
          </motion.button>
          {/* Block indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {mediaItems.map((_, i) => (
              <motion.span
                key={i}
                className={`w-6 h-3 rounded-md ${activeIdx === i ? 'bg-indigo-400' : 'bg-indigo-100'} block transition-all`}
                animate={{ scale: activeIdx === i ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

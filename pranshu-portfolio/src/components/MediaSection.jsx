// src/components/MediaSection.jsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

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

export default function MediaSection() {
  const containerRef = useRef(null);

  const scrollByWidth = (offset) => {
    const c = containerRef.current;
    if (c) c.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section id="media" className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-8 text-primary">
          Featured In
        </h3>
        <div className="relative">
          {/* Prev */}
          <button
            onClick={() => scrollByWidth(-containerRef.current.clientWidth * 0.7)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow z-20 hover:bg-white"
            aria-label="Scroll left"
          >
            <FaChevronLeft size={20} />
          </button>
          {/* Carousel */}
          <div
            ref={containerRef}
            className="flex space-x-6 overflow-x-auto snap-x snap-mandatory px-8 scroll-smooth"
          >
            {mediaItems.map((item, i) => (
              <motion.div
                key={i}
                className="flex-none w-64 snap-start rounded-lg overflow-hidden shadow-lg bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
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
          </div>
          {/* Next */}
          <button
            onClick={() => scrollByWidth(containerRef.current.clientWidth * 0.7)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow z-20 hover:bg-white"
            aria-label="Scroll right"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

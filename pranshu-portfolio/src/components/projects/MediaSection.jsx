"use client";

import { useState } from "react";
import OptimizedImage from "../ui/OptimizedImage";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    thumbnail: "/images/kuku.png",
  },
  {
    url: "https://open.spotify.com/episode/1qQ57vyYZb5366843Gh24Z",
    title: "Spotify: Where's The Block?",
    thumbnail: "/images/wtb.png",
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
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollToIdx = (idx) => {
    setActiveIdx(Math.max(0, Math.min(mediaItems.length - 1, idx)));
  };

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Featured In
          </h2>
          <div className="section-divider mb-4" />
          <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
            Podcasts, talks, and media appearances across the Web3 space.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={() => scrollToIdx(activeIdx - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-[var(--bg-secondary)] border border-white/[0.08] rounded-full text-[var(--text-muted)] hover:text-[var(--accent-purple)] hover:border-[var(--accent-purple)]/30 transition-all"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="overflow-hidden mx-10">
            <motion.div
              className="flex gap-5"
              animate={{ x: -activeIdx * 280 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
            >
              {mediaItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="w-64 flex-shrink-0 rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-white/[0.06] hover:border-[var(--accent-purple)]/30 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link href={item.url} target="_blank" rel="noopener noreferrer">
                    <div className="relative w-full h-40">
                      <OptimizedImage
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, 16rem"
                        priority={i < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-40" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={() => scrollToIdx(activeIdx + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-[var(--bg-secondary)] border border-white/[0.08] rounded-full text-[var(--text-muted)] hover:text-[var(--accent-purple)] hover:border-[var(--accent-purple)]/30 transition-all"
            aria-label="Next item"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {mediaItems.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIdx(i)}
                className={`w-8 h-1.5 rounded-full transition-all ${
                  activeIdx === i
                    ? "bg-[var(--accent-purple)]"
                    : "bg-white/[0.08] hover:bg-white/[0.15]"
                }`}
                aria-label={`Go to item ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

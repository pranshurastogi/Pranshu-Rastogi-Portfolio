// src/components/content/SpeakerGallery.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import { CircularGallery } from "../ui/CircularGallery";
import { Play, Pause, RotateCcw, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";

const SPEAKERS_RAW = [
  { src: "/images/pg-bangkok.JPG", name: "ETHGlobal Bangkok booth" },
  { src: "/images/pg-bangkok-2.jpg", name: "ETHGlobal Bangkok Push Protocol" },
  { src: "/images/pg-ethIndia.JPG", name: "ETHIndia Push protocol booth" },
  { src: "/images/pg-ETHGlobal-istanbul.jpg", name: "ETHGlobal Istanbul" },
  { src: "/images/pg-ethi.jpg", name: "ETHGlobal Istanbul" },
  { src: "/images/pg-Unfold.jpg", name: "Unfold X Push Protocol" },
  { src: "/images/pg-NFT-day-SKIT.JPG", name: "NFT Day - SKIT" },
  { src: "/images/pg-poly.jpg", name: "Polygon event" },
  { src: "/images/pg-coindcx.png", name: "Namaste Web3, CoinDCX X Forbes" },
  { src: "/images/pg-polygon-guild.png", name: "Polygon Guild, Blr" },
  { src: "/images/pg-google.png", name: "Google Cloud Web3 Conclave" },
  { src: "/images/pg-dtp.png", name: "Intro to web3 - DYP" },
  { src: "/images/pg-fipkart.JPG", name: "Polygon X Flipkart" },
  { src: "/images/pg-vietnam.png", name: "BUIDL ASIA, Vietnam" },
  { src: "/images/pg-w3c.jpeg", name: "Web3 Conf Goa" },
];

function toGalleryItems(speakers) {
  return speakers.map((s) => ({
    common: s.name,
    binomial: "",
    photo: { url: s.src, text: s.name, pos: "center", by: "Pranshu Rastogi" },
  }));
}

const SPEEDS = [
  { label: "Slow", value: 0.01 },
  { label: "Normal", value: 0.03 },
  { label: "Fast", value: 0.07 },
];

export default function SpeakerGallery() {
  const [radius, setRadius] = useState(720);
  const [mode, setMode] = useState("auto"); // "auto" | "scroll"
  const [paused, setPaused] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1); // index into SPEEDS
  const items = toGalleryItems(SPEAKERS_RAW);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(
        window.innerWidth < 640
          ? 420
          : window.innerWidth < 1024
          ? 560
          : 720
      );
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // When switching to scroll mode, reset pause
  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "scroll") setPaused(false);
  };

  return (
    <section
      className="py-12 sm:py-20 bg-gradient-to-b from-zinc-950 via-zinc-900/95 to-zinc-950 relative overflow-hidden"
      aria-label="Speaker & event gallery"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#e9d5ff] mb-2">
            Gallery
          </h2>
          <p className="text-sm text-zinc-500">
            Events, talks & hackathons across the web3 world
          </p>
        </motion.div>

        {/* ── Controls ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          {/* Mode toggle */}
          <div className="flex items-center gap-1 rounded-xl border border-zinc-700/60 bg-zinc-900/80 p-1 backdrop-blur">
            <button
              onClick={() => handleModeChange("auto")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                mode === "auto"
                  ? "bg-[#AEEA00] text-black shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Auto Rotate
            </button>
            <button
              onClick={() => handleModeChange("scroll")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                mode === "scroll"
                  ? "bg-[#AEEA00] text-black shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <MousePointer2 className="w-3.5 h-3.5" />
              Scroll Driven
            </button>
          </div>

          {/* Play / Pause — only shown in auto mode */}
          {mode === "auto" && (
            <button
              onClick={() => setPaused((p) => !p)}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-700/60 bg-zinc-900/80 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-500 transition-all backdrop-blur"
              aria-label={paused ? "Resume rotation" : "Pause rotation"}
            >
              {paused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#39FF14]" /> Resume
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#AEEA00]" /> Pause
                </>
              )}
            </button>
          )}

          {/* Speed — only shown in auto mode */}
          {mode === "auto" && (
            <div className="flex items-center gap-1 rounded-xl border border-zinc-700/60 bg-zinc-900/80 p-1 backdrop-blur">
              {SPEEDS.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setSpeedIdx(i)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    speedIdx === i
                      ? "bg-zinc-700 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Scroll hint */}
          {mode === "scroll" && (
            <span className="text-xs text-zinc-500 italic">
              Scroll the page to rotate the gallery
            </span>
          )}
        </motion.div>

        {/* ── Gallery ── */}
        <div
          className="relative mx-auto w-full"
          style={{ minHeight: "min(85vw, 520px)", height: "min(85vw, 520px)" }}
        >
          <CircularGallery
            items={items}
            radius={radius}
            autoRotateSpeed={SPEEDS[speedIdx].value}
            mode={mode}
            paused={paused}
            className="absolute inset-0"
          />
        </div>
      </div>
    </section>
  );
}

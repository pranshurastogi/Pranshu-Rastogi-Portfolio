"use client";

import { useState, useEffect } from "react";
import { CircularGallery } from "../ui/CircularGallery";
import {
  Play, Pause, RefreshCw, MousePointer2,
  Satellite, LayoutGrid, Stars,
} from "lucide-react";
import { motion } from "framer-motion";
import speakingGallery from "@/data/speaking-gallery.json";
import { ImageGallery } from "@/components/ui/image-gallery";

const SPEAKERS_RAW = speakingGallery.items;

function toGalleryItems(speakers) {
  return speakers.map((s) => ({
    common: s.name,
    binomial: "",
    photo: { url: s.src, text: s.name, pos: "center", by: "Pranshu Rastogi" },
  }));
}

const SPEEDS = [
  { label: "SLOW",   value: 0.01 },
  { label: "CRUISE", value: 0.03 },
  { label: "WARP",   value: 0.07 },
];

export default function SpeakerGallery() {
  const [radius, setRadius]       = useState(720);
  const [mode, setMode]           = useState("auto");
  const [paused, setPaused]       = useState(false);
  const [speedIdx, setSpeedIdx]   = useState(1);
  const [galleryView, setGalleryView] = useState("circular");

  const items = toGalleryItems(SPEAKERS_RAW);
  const imageGalleryItems = SPEAKERS_RAW.map((item) => ({
    src: item.src,
    alt: item.name,
    placeholder: "/images/profile/pfp-current.png",
  }));

  useEffect(() => {
    const update = () =>
      setRadius(window.innerWidth < 640 ? 420 : window.innerWidth < 1024 ? 560 : 720);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "scroll") setPaused(false);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" aria-label="Speaker & event gallery">
      {/* Ambient radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(124,77,255,0.07),transparent)]" />

      <div className="max-w-6xl mx-auto px-4">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">Gallery</h2>
          <div className="section-divider mb-4" />
          <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
            Events, talks & hackathons across the Web3 world.
          </p>
        </motion.div>

        {/* ── View toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="flex justify-center mb-8"
        >
          <div className="relative p-1 rounded-2xl bg-[#06040F] border border-[#7C4DFF]/20 shadow-[0_0_40px_rgba(124,77,255,0.1)]">
            {/* Subtle scanline texture */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)]" />
            </div>

            <div className="relative flex items-center">
              {[
                { key: "circular", Icon: Satellite,  label: "ORBITAL", sub: "VIEW" },
                { key: "grid",     Icon: LayoutGrid, label: "STELLAR", sub: "GRID" },
              ].map(({ key, Icon, label, sub }) => {
                const active = galleryView === key;
                return (
                  <button
                    key={key}
                    onClick={() => setGalleryView(key)}
                    aria-pressed={active}
                    className={`relative flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-xs tracking-widest transition-all duration-300 overflow-hidden ${
                      active ? "text-white" : "text-white/25 hover:text-white/55"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="view-indicator"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#4F7CFF]"
                        style={{ boxShadow: "0 0 28px rgba(124,77,255,0.55), inset 0 1px 0 rgba(255,255,255,0.15)" }}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                      />
                    )}
                    <Icon className="relative z-10 w-4 h-4 flex-shrink-0" />
                    <span className="relative z-10 text-left">
                      <span className="block font-bold text-[11px]">{label}</span>
                      <span className={`block text-[9px] ${active ? "opacity-55" : "opacity-25"}`}>{sub}</span>
                    </span>
                    {active && (
                      <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Mission Control Panel (circular mode only) ── */}
        {galleryView === "circular" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mb-10"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#7C4DFF]/12 bg-[#06040F]/90 backdrop-blur-sm shadow-[0_4px_40px_rgba(0,0,0,0.55)]">
              <div className="h-px bg-gradient-to-r from-transparent via-[#7C4DFF]/45 to-transparent" />

              <div className="flex flex-wrap items-center gap-px px-3 py-3">

                {/* TRAJECTORY */}
                <div className="px-3">
                  <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#7C4DFF]/45 mb-2.5">Trajectory</p>
                  <div className="flex gap-0.5 rounded-xl bg-black/50 p-0.5 border border-white/[0.04]">
                    <button
                      onClick={() => handleModeChange("auto")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest transition-all duration-300 ${
                        mode === "auto"
                          ? "bg-gradient-to-r from-[#7C4DFF] to-[#5B6FFF] text-white shadow-[0_0_20px_rgba(124,77,255,0.4)]"
                          : "text-white/28 hover:text-white/55 hover:bg-white/5"
                      }`}
                    >
                      <RefreshCw
                        className={`w-3 h-3 ${mode === "auto" && !paused ? "animate-spin" : ""}`}
                        style={{ animationDuration: "3s" }}
                      />
                      AUTO ORBIT
                    </button>
                    <button
                      onClick={() => handleModeChange("scroll")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest transition-all duration-300 ${
                        mode === "scroll"
                          ? "bg-gradient-to-r from-[#00C4CC]/65 to-[#0099B8]/65 text-white shadow-[0_0_20px_rgba(0,196,204,0.3)]"
                          : "text-white/28 hover:text-white/55 hover:bg-white/5"
                      }`}
                    >
                      <MousePointer2 className="w-3 h-3" />
                      WARP DRIVE
                    </button>
                  </div>
                </div>

                <div className="w-px h-10 bg-white/[0.06] mx-1" />

                {mode === "auto" && (
                  <>
                    {/* STATUS */}
                    <div className="px-3">
                      <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#7C4DFF]/45 mb-2.5">Status</p>
                      <button
                        onClick={() => setPaused((p) => !p)}
                        aria-label={paused ? "Resume rotation" : "Pause rotation"}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-bold tracking-widest transition-all duration-300 ${
                          paused
                            ? "border-[#4ADE80]/30 bg-[#4ADE80]/[0.08] text-[#4ADE80] shadow-[0_0_16px_rgba(74,222,128,0.15)]"
                            : "border-[#F97316]/30 bg-[#F97316]/[0.08] text-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.15)]"
                        }`}
                      >
                        {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                        {paused ? "RESUME" : "HOLD"}
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            paused ? "bg-[#4ADE80]" : "bg-[#F97316] animate-pulse"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="w-px h-10 bg-white/[0.06] mx-1" />

                    {/* VELOCITY */}
                    <div className="px-3">
                      <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#7C4DFF]/45 mb-2.5">Velocity</p>
                      <div className="flex gap-0.5 rounded-xl bg-black/50 p-0.5 border border-white/[0.04]">
                        {SPEEDS.map((s, i) => (
                          <button
                            key={s.label}
                            onClick={() => setSpeedIdx(i)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest transition-all duration-300 ${
                              speedIdx === i
                                ? "bg-white/10 text-white shadow"
                                : "text-white/22 hover:text-white/50 hover:bg-white/[0.04]"
                            }`}
                          >
                            {/* Throttle bars */}
                            <span className="flex items-end gap-[2px] h-3.5">
                              {[0, 1, 2].map((bar) => (
                                <span
                                  key={bar}
                                  className={`w-[2px] rounded-full transition-all ${
                                    speedIdx === i && bar <= i ? "bg-[#A78BFA]" : "bg-white/15"
                                  }`}
                                  style={{ height: `${(bar + 1) * 5}px` }}
                                />
                              ))}
                            </span>
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {mode === "scroll" && (
                  <div className="flex items-center gap-2 px-4">
                    <Stars className="w-3.5 h-3.5 text-[#00C4CC] animate-pulse" />
                    <span className="text-[10px] text-white/30 italic tracking-widest">
                      Scroll to navigate the galaxy
                    </span>
                  </div>
                )}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#7C4DFF]/45 to-transparent" />
            </div>
          </motion.div>
        )}

        {/* ── Gallery ── */}
        {galleryView === "circular" ? (
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
        ) : (
          <ImageGallery items={imageGalleryItems} />
        )}
      </div>
    </section>
  );
}

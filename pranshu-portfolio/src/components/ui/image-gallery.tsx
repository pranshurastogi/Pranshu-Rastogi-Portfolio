"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export interface ImageGalleryItem {
  src: string;
  alt: string;
  ratio?: number;
  placeholder?: string;
}

interface ImageGalleryProps {
  items: ImageGalleryItem[];
  className?: string;
}

export function ImageGallery({ items, className }: ImageGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const open  = useCallback((i: number) => setSelected(i), []);
  const close = useCallback(() => setSelected(null), []);
  const prev  = useCallback(
    () => setSelected((s) => (s !== null ? (s - 1 + items.length) % items.length : null)),
    [items.length]
  );
  const next  = useCallback(
    () => setSelected((s) => (s !== null ? (s + 1) % items.length : null)),
    [items.length]
  );

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      close();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <div className={cn("relative w-full py-2", className)}>
      {/* Horizontal scroll — edge fade via mask-image so it works on any background */}
      <div
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-3 px-10"
        style={{
          scrollbarWidth: "none",
          // @ts-ignore
          msOverflowStyle: "none",
          maskImage:
            "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
        }}
      >
        {items.map((item, i) => (
          <GalleryCard key={i} item={item} index={i} onClick={() => open(i)} />
        ))}
      </div>

      {/* Scroll hint */}
      <p className="text-center text-[9px] uppercase tracking-[0.25em] text-white/12 mt-1 select-none">
        ← drag to explore the galaxy →
      </p>

      <AnimatePresence>
        {selected !== null && (
          <Lightbox
            item={items[selected]}
            index={selected}
            total={items.length}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Card ────────────────────────────────────────────────────────────────────

interface GalleryCardProps {
  item: ImageGalleryItem;
  index: number;
  onClick: () => void;
}

function GalleryCard({ item, index, onClick }: GalleryCardProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 200px" });
  const [loaded, setLoaded]   = useState(false);
  const [hovered, setHovered] = useState(false);
  const [imgSrc, setImgSrc]   = useState(item.src);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 48, scale: 0.93 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: 48, scale: 0.93 }
      }
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.065, 0.6),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative flex-none snap-center cursor-pointer select-none"
      style={{ width: 268, height: 368 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Outer orbital glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(124,77,255,0.45) 0%, rgba(0,196,255,0.2) 55%, transparent 100%)",
          filter: "blur(12px)",
        }}
      />

      {/* Card shell */}
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        animate={{
          y: hovered ? -7 : 0,
          boxShadow: hovered
            ? "0 24px 60px rgba(0,0,0,0.65), 0 0 32px rgba(124,77,255,0.28), inset 0 0 20px rgba(0,0,0,0.3)"
            : "0 4px 24px rgba(0,0,0,0.45)",
          borderColor: hovered
            ? "rgba(124,77,255,0.5)"
            : "rgba(255,255,255,0.08)",
        }}
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Shimmer while loading */}
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#7C4DFF]/8 to-[#00C4FF]/8" />
        )}

        {/* Image (with inner scale on hover) */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.09 : 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Image
            src={imgSrc}
            alt={item.alt}
            fill
            sizes="268px"
            className={cn(
              "object-cover transition-opacity duration-500",
              loaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setLoaded(true)}
            onError={() => {
              if (item.placeholder && imgSrc !== item.placeholder)
                setImgSrc(item.placeholder!);
            }}
          />
        </motion.div>

        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-black/8 pointer-events-none" />

        {/* Cosmic shimmer on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(124,77,255,0.13) 0%, transparent 50%, rgba(0,196,255,0.09) 100%)",
          }}
        />

        {/* Index badge */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-sm border border-white/[0.09]">
          <span className="text-[9px] font-mono text-white/35 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Expand icon */}
        <motion.div
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/15"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.65 }}
          transition={{ duration: 0.22 }}
        >
          <Maximize2 className="w-3.5 h-3.5 text-white/75" />
        </motion.div>

        {/* Name reveal at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1 h-1 rounded-full bg-[#A78BFA] animate-pulse" />
            <span className="text-[8px] uppercase tracking-[0.22em] text-[#A78BFA] font-bold">
              Event
            </span>
          </div>
          <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
            {item.alt}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  item: ImageGalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ item, index, total, onClose, onPrev, onNext }: LightboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/92 backdrop-blur-md" />

      {/* Galaxy atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(124,77,255,0.07),transparent)]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#7C4DFF]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00C4FF]/5 blur-3xl" />
      </div>

      {/* Image panel */}
      <motion.div
        key={item.src}
        initial={{ scale: 0.84, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.84, opacity: 0, y: 24 }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative max-w-4xl w-full mx-16 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow frame */}
        <div
          className="absolute -inset-0.5 rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(124,77,255,0.55), rgba(0,196,255,0.38))",
            filter: "blur(5px)",
          }}
        />

        <div className="relative rounded-2xl overflow-hidden bg-[#06040F]">
          {/* Image */}
          <div className="relative" style={{ height: "65vh" }}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Info bar */}
          <div className="relative px-6 py-4 border-t border-white/[0.08] bg-gradient-to-r from-[#06040F] via-[#0E0824] to-[#06040F]">
            <div className="h-px absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-[#7C4DFF]/40 to-transparent" />
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1 h-1 rounded-full bg-[#A78BFA] animate-pulse flex-shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#A78BFA] font-bold">
                    Event
                  </span>
                </div>
                <p className="text-white font-semibold text-base truncate">{item.alt}</p>
              </div>
              <span className="text-[#A78BFA]/35 text-xs font-mono tabular-nums flex-shrink-0">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2.5 rounded-full bg-white/[0.07] hover:bg-white/14 border border-white/14 backdrop-blur-sm transition-all group"
      >
        <X className="w-5 h-5 text-white/65 group-hover:text-white transition-colors" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#7C4DFF]/22 border border-white/12 backdrop-blur-sm transition-all group"
      >
        <ChevronLeft className="w-6 h-6 text-white/55 group-hover:text-white transition-colors" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#7C4DFF]/22 border border-white/12 backdrop-blur-sm transition-all group"
      >
        <ChevronRight className="w-6 h-6 text-white/55 group-hover:text-white transition-colors" />
      </button>
    </motion.div>
  );
}

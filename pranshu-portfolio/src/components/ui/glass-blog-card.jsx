"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";

export function GlassBlogCard({
  title,
  excerpt,
  image,
  author,
  date,
  readTime,
  tags = [],
  href,
  className = "",
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--bg-secondary)] transition-all duration-300 hover:border-[var(--accent-purple)]/30 hover:shadow-lg hover:shadow-[var(--accent-purple)]/5 cursor-pointer ${className}`}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[var(--accent-purple-dim)] to-[var(--bg-card)] flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-[var(--accent-purple)]/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-50" />

        {tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-[var(--accent-cyan)] backdrop-blur-sm border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-[var(--accent-purple)] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--accent-purple)]/25">
            <BookOpen className="h-4 w-4" />
            Read Article
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="space-y-2 flex-1">
          <h3 className="text-base font-semibold leading-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-purple)] line-clamp-2">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm text-[var(--text-muted)] leading-relaxed">
            {excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-[var(--accent-purple-dim)] border border-white/[0.06] flex items-center justify-center text-[var(--accent-purple)] text-xs font-semibold">
              {author?.name?.[0] || "P"}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-[var(--text-primary)]">
                {author?.name || "Pranshu Rastogi"}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">{date}</span>
            </div>
          </div>

          {readTime && (
            <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
              <Clock className="h-3 w-3" />
              <span>{readTime}</span>
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
}

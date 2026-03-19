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
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#AEEA00]/20 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-[#AEEA00]/60 hover:shadow-xl hover:shadow-[#AEEA00]/10 cursor-pointer ${className}`}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#AEEA00]/20 to-black/50 flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-[#AEEA00]/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-[#AEEA00] backdrop-blur-sm border border-[#AEEA00]/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full bg-[#AEEA00] px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-[#AEEA00]/30">
            <BookOpen className="h-4 w-4" />
            Read Article
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-5 flex-1">
        <div className="space-y-2 flex-1">
          <h3 className="text-base font-semibold leading-tight text-white transition-colors group-hover:text-[#AEEA00] line-clamp-2">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-400 leading-relaxed">
            {excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-[#AEEA00]/20 pt-4">
          <div className="flex items-center gap-2">
            {author?.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="h-8 w-8 rounded-full border border-[#AEEA00]/30 object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full border border-[#AEEA00]/30 bg-[#AEEA00]/20 flex items-center justify-center text-[#AEEA00] text-sm font-bold">
                {author?.name?.[0] || "P"}
              </div>
            )}
            <div className="flex flex-col text-xs">
              <span className="font-medium text-white">{author?.name || "Pranshu Rastogi"}</span>
              <span className="text-gray-500">{date}</span>
            </div>
          </div>

          {readTime && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{readTime}</span>
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
}

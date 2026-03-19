"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLinkIcon,
  GithubIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
  TrophyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "lucide-react";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import projectsData from "@/data/projects.json";

function isVideo(src) {
  return src?.match(/\.(mov|mp4|webm)$/);
}

const LINK_ITEMS = [
  { key: "live", label: "Live Demo", sub: "Open app", Icon: ExternalLinkIcon },
  { key: "github", label: "Source Code", sub: "GitHub", Icon: GithubIcon },
  { key: "docs", label: "Documentation", sub: "Read docs", Icon: BookOpenIcon },
  { key: "showcase", label: "Showcase", sub: "View entry", Icon: TrophyIcon },
];

export default function ProjectPageClient({ project }) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((p) => (p - 1 + project.images.length) % project.images.length);
  const next = () =>
    setCurrent((p) => (p + 1) % project.images.length);

  const activeLinks = LINK_ITEMS.filter((l) => !!project[l.key]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(159,78,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-8 pb-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-purple)] transition-colors mb-10"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              {project.title}
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)] text-xs font-medium">
              {project.category}
            </span>
          </div>
          <p className="text-[var(--text-muted)] text-base">{project.subtitle}</p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT: media + description + tech + features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 min-w-0 space-y-6"
          >
            {/* Carousel */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-video bg-[var(--bg-secondary)] relative"
                >
                  {isVideo(project.images[current]) ? (
                    <video
                      src={project.images[current]}
                      className="w-full h-full object-cover"
                      muted loop playsInline autoPlay controls
                    />
                  ) : (
                    <OptimizedImage
                      src={project.images[current]}
                      alt={`${project.title} – screenshot ${current + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Counter */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur border border-white/[0.08] text-[var(--text-secondary)] text-xs px-2.5 py-1 rounded-full font-mono">
                {current + 1} / {project.images.length}
              </div>

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur border border-white/[0.08] text-white rounded-full hover:bg-[var(--accent-purple)]/20 hover:border-[var(--accent-purple)]/30 transition-all"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur border border-white/[0.08] text-white rounded-full hover:bg-[var(--accent-purple)]/20 hover:border-[var(--accent-purple)]/30 transition-all"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {project.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      i === current
                        ? "border-[var(--accent-purple)] shadow-[0_0_12px_rgba(159,78,255,0.3)]"
                        : "border-white/[0.06] hover:border-white/[0.15]"
                    }`}
                  >
                    {isVideo(img) ? (
                      <video src={img} className="w-full h-full object-cover" muted />
                    ) : (
                      <OptimizedImage
                        src={img}
                        alt={`thumb ${i + 1}`}
                        width={80}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="rounded-2xl border border-white/[0.06] bg-[var(--bg-secondary)] p-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
                About
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                {project.longDescription}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="rounded-2xl border border-white/[0.06] bg-[var(--bg-secondary)] p-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg border border-[var(--accent-purple)]/15 bg-[var(--accent-purple-dim)] text-[var(--accent-purple)] text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="rounded-2xl border border-white/[0.06] bg-[var(--bg-secondary)] p-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                Core Features
              </h3>
              <ul className="space-y-2.5">
                {project.features.map((feat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                    className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                  >
                    <CheckCircleIcon className="w-4 h-4 text-[var(--accent-lime)] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* RIGHT: links sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-72 xl:w-80 flex-shrink-0 space-y-4"
          >
            {/* Quick Links */}
            <div className="rounded-2xl border border-white/[0.06] bg-[var(--bg-secondary)] p-5">
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-4">
                Quick Links
              </p>
              <div className="space-y-3">
                {activeLinks.map(({ key, label, sub, Icon }) => (
                  <a
                    key={key}
                    href={project[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-[var(--bg-primary)] px-4 py-3.5 transition-all duration-300 hover:border-[var(--accent-purple)]/30 hover:bg-[var(--accent-purple-dim)] hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-purple-dim)] text-[var(--accent-purple)] group-hover:bg-[var(--accent-purple)]/20 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">
                          {label}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{sub}</p>
                      </div>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-purple)] group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="rounded-2xl border border-white/[0.06] bg-[var(--bg-secondary)] p-5">
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-3">
                Project Info
              </p>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Category</span>
                  <span className="text-[var(--accent-cyan)] font-medium">
                    {project.category}
                  </span>
                </div>
                {project.difficulty && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">Difficulty</span>
                    <span
                      className={`font-medium ${
                        project.difficulty === "Advanced"
                          ? "text-red-400"
                          : project.difficulty === "Intermediate"
                          ? "text-yellow-400"
                          : "text-[var(--accent-lime)]"
                      }`}
                    >
                      {project.difficulty}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Stack size</span>
                  <span className="text-[var(--accent-purple)]">
                    {project.technologies.length} techs
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Projects */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16"
        >
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">
            Other Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectsData.projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((rel) => (
                <Link
                  key={rel.id}
                  href={`/projects/${rel.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--bg-secondary)] hover:border-[var(--accent-purple)]/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent-purple)]/5"
                >
                  <div className="aspect-video relative bg-[var(--bg-primary)]">
                    {isVideo(rel.images[0]) ? (
                      <video
                        src={rel.images[0]}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                        muted loop playsInline
                      />
                    ) : (
                      <OptimizedImage
                        src={rel.images[0]}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-[var(--text-muted)] text-xs mt-1">
                      {rel.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

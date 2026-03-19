// src/app/projects/[slug]/ProjectPageClient.jsx
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
  ZapIcon,
  CheckCircleIcon,
} from "lucide-react";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import projectsData from "@/data/projects.json";
import { FaEthereum, FaBitcoin, FaCube, FaLink, FaCode, FaStar, FaShieldAlt } from "react-icons/fa";
import { SiPolygon, SiSolana } from "react-icons/si";

const getProjectIcon = (iconName) => {
  const map = {
    ethereum: <FaEthereum className="text-[#627EEA]" />,
    bitcoin: <FaBitcoin className="text-[#F7931A]" />,
    polygon: <SiPolygon className="text-[#a259ff]" />,
    solana: <SiSolana className="text-[#00FFA3]" />,
    zap: <ZapIcon className="text-[#AEEA00]" />,
    cube: <FaCube className="text-[#39FF14]" />,
    link: <FaLink className="text-[#2A5ADA]" />,
    code: <FaCode className="text-[#AEEA00]" />,
    star: <FaStar className="text-[#FFD700]" />,
    shield: <FaShieldAlt className="text-[#8B5CF6]" />,
  };
  return map[iconName] || <FaCube className="text-[#AEEA00]" />;
};

function isVideo(src) {
  return src?.endsWith(".mov") || src?.endsWith(".mp4") || src?.endsWith(".webm");
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
    <div
      className="min-h-screen font-mono"
      style={{
        background: "linear-gradient(180deg, #070f09 0%, #0a1a0d 40%, #070f09 100%)",
        fontFamily: "'JetBrains Mono','Fira Mono','Cascadia Code','Consolas',monospace",
      }}
    >
      {/* ── Hero gradient band ── */}
      <div
        className={`w-full h-1 bg-gradient-to-r ${project.gradient?.replace(/\/20|\/10/g, "")} opacity-80`}
      />

      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(174,234,0,0.06) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 pt-8 pb-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#AEEA00]/70 hover:text-[#AEEA00] transition-colors mb-10"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="text-3xl">{getProjectIcon(project.icon)}</span>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                  style={{
                    color: "#AEEA00",
                    textShadow: "0 0 30px rgba(174,234,0,0.3)",
                  }}
                >
                  {project.title}
                </h1>
                <span className="px-2.5 py-1 rounded-full border border-[#39FF14]/40 bg-[#39FF14]/10 text-[#39FF14] text-xs font-semibold">
                  {project.category}
                </span>
              </div>
              <p className="text-[#80CBC4] text-base">{project.subtitle}</p>
            </div>
          </div>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT: media + description + tech + features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 min-w-0 space-y-6"
          >
            {/* ── Carousel ── */}
            <div className="relative rounded-2xl overflow-hidden border border-[#AEEA00]/20"
              style={{ boxShadow: "0 0 40px rgba(174,234,0,0.06)" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-video bg-black relative"
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

              {/* counter */}
              <div className="absolute top-3 left-3 bg-black/70 border border-[#AEEA00]/30 text-[#AEEA00] text-xs px-2.5 py-1 rounded-full font-mono backdrop-blur">
                {current + 1} / {project.images.length}
              </div>

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/70 border border-[#AEEA00]/30 text-[#AEEA00] rounded-full hover:bg-[#AEEA00]/20 transition-all hover:scale-110"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/70 border border-[#AEEA00]/30 text-[#AEEA00] rounded-full hover:bg-[#AEEA00]/20 transition-all hover:scale-110"
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
                        ? "border-[#AEEA00] shadow-[0_0_12px_rgba(174,234,0,0.4)]"
                        : "border-[#AEEA00]/20 hover:border-[#AEEA00]/50"
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
            <div className="rounded-2xl border border-[#AEEA00]/15 bg-black/40 backdrop-blur-md p-6">
              <div className="flex items-center gap-2 text-[#39FF14] text-xs mb-3">
                <span className="animate-pulse">█</span>
                <span>cat README.md</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">
                {project.longDescription}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="rounded-2xl border border-[#AEEA00]/15 bg-black/40 backdrop-blur-md p-6">
              <h3 className="text-[#AEEA00] font-bold mb-4 text-sm uppercase tracking-widest">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg border border-[#AEEA00]/25 bg-[#AEEA00]/5 text-[#AEEA00] text-xs font-mono hover:bg-[#AEEA00]/15 hover:border-[#AEEA00]/50 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="rounded-2xl border border-[#AEEA00]/15 bg-black/40 backdrop-blur-md p-6">
              <h3 className="text-[#AEEA00] font-bold mb-4 text-sm uppercase tracking-widest">
                Core Features
              </h3>
              <ul className="space-y-2.5">
                {project.features.map((feat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <CheckCircleIcon className="w-4 h-4 text-[#39FF14] flex-shrink-0 mt-0.5" />
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
            {/* Glassmorphism link cards */}
            <div className="rounded-2xl border border-[#AEEA00]/15 bg-black/40 backdrop-blur-md p-5"
              style={{ boxShadow: "0 0 40px rgba(174,234,0,0.04)" }}
            >
              <p className="text-[#AEEA00]/50 text-xs uppercase tracking-widest mb-4">
                Quick Links
              </p>
              <div className="space-y-3">
                {activeLinks.map(({ key, label, sub, Icon }) => (
                  <a
                    key={key}
                    href={project[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-[#AEEA00]/15 bg-black/50 px-4 py-3.5 transition-all duration-300 hover:border-[#AEEA00]/50 hover:bg-[#AEEA00]/5 hover:shadow-md hover:shadow-[#AEEA00]/10 hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#AEEA00]/0 to-[#AEEA00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#AEEA00]/25 bg-[#AEEA00]/10 text-[#AEEA00] group-hover:bg-[#AEEA00]/20 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-[#AEEA00] transition-colors">
                          {label}
                        </p>
                        <p className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">
                          {sub}
                        </p>
                      </div>
                    </div>
                    <ArrowRightIcon className="relative w-4 h-4 text-gray-600 group-hover:text-[#AEEA00] group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Difficulty/category chip */}
            <div className="rounded-2xl border border-[#AEEA00]/15 bg-black/40 backdrop-blur-md p-5">
              <p className="text-[#AEEA00]/50 text-xs uppercase tracking-widest mb-3">Project Info</p>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="text-[#39FF14] font-medium">{project.category}</span>
                </div>
                {project.difficulty && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Difficulty</span>
                    <span
                      className={`font-medium ${
                        project.difficulty === "Advanced"
                          ? "text-red-400"
                          : project.difficulty === "Intermediate"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {project.difficulty}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Stack size</span>
                  <span className="text-[#AEEA00]">{project.technologies.length} techs</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Related Projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16"
        >
          <h2 className="text-lg font-bold text-[#AEEA00] mb-6 uppercase tracking-widest">
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
                  className="group overflow-hidden rounded-2xl border border-[#AEEA00]/15 bg-black/40 backdrop-blur-md hover:border-[#AEEA00]/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-[#AEEA00]/8"
                >
                  <div className="aspect-video relative bg-black">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#AEEA00] group-hover:text-[#39FF14] transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">{rel.subtitle}</p>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

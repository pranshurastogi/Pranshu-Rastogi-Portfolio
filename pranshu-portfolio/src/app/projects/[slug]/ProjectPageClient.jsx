"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLinkIcon,
  GithubIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  TrophyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  PackageIcon,
  CopyIcon,
  CheckIcon,
  GraduationCapIcon,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import VideoWithFallback from "@/components/ui/VideoWithFallback";
import projectsData from "@/data/projects.json";
import { projectSlug } from "@/lib/site-seo";

function isVideo(src) {
  return src?.match(/\.(mov|mp4|webm)$/);
}

/** Sidebar quick links — each renders only when the project defines that field */
const LINK_ITEMS = [
  { key: "live", label: "Live App", sub: "Open app", Icon: ExternalLinkIcon },
  { key: "github", label: "Source Code", sub: "GitHub", Icon: GithubIcon },
  { key: "docs", label: "Documentation", sub: "Read docs", Icon: BookOpenIcon },
  {
    key: "npm",
    label: "npm Package",
    sub: (p) => p.npm,
    href: (p) => `https://www.npmjs.com/package/${p.npm}`,
    Icon: PackageIcon,
  },
  {
    key: "social",
    label: "Follow on X",
    sub: (p) => p.social.xHandle,
    href: (p) => p.social.x,
    Icon: FaXTwitter,
  },
  { key: "showcase", label: "Showcase", sub: "View entry", Icon: TrophyIcon },
];

const card = "rounded-2xl border border-white/[0.06] bg-[var(--bg-secondary)]";
const sectionLabel =
  "text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider";

function CopyCommand({ command }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (insecure context / permissions) — fail quietly
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[var(--bg-primary)] pl-3 pr-1.5 py-1.5">
      <span className="text-[var(--accent-lime)] font-mono text-xs select-none">$</span>
      <code className="flex-1 min-w-0 truncate font-mono text-xs text-[var(--text-secondary)]">
        {command}
      </code>
      <button
        onClick={copy}
        aria-label={copied ? "Copied" : `Copy “${command}”`}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--accent-purple-dim)] hover:text-[var(--accent-purple)] transition-colors"
      >
        {copied ? (
          <CheckIcon className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
        ) : (
          <CopyIcon className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}

export default function ProjectPageClient({ project }) {
  const [current, setCurrent] = useState(0);
  const total = project.images.length;

  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);

  // Arrow keys move the gallery (ignored while typing in a field)
  useEffect(() => {
    if (total < 2) return;
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total, prev, next]);

  const activeLinks = LINK_ITEMS.filter((l) => !!project[l.key]);
  const paragraphs = project.longDescription.split(/\n\s*\n/);
  const hasBadges =
    project.awards?.length > 0 || project.programs?.length > 0 || project.social?.x;

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
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-purple)] transition-colors mb-10"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Page header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              {project.title}
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)] text-xs font-medium">
              {project.category}
            </span>
          </div>
          {project.tagline && (
            <p className="text-lg md:text-xl font-medium text-[var(--text-secondary)] mb-1">
              {project.tagline}
            </p>
          )}
          <p className="text-[var(--text-muted)] text-sm">{project.subtitle}</p>

          {/* Recognition badges */}
          {hasBadges && (
            <div className="flex flex-wrap items-center gap-2 mt-5">
              {project.awards?.map((award, i) => (
                <span
                  key={`award-${i}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/[0.06] px-3 py-1.5 text-xs text-amber-300"
                >
                  <TrophyIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold">{award.label}</span>
                  <span className="text-amber-300/70">· {award.prize}</span>
                </span>
              ))}
              {project.programs?.map((program, i) => (
                <a
                  key={`program-${i}`}
                  href={program.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/[0.06] py-1 pl-1 pr-3 text-xs text-teal-200 hover:border-teal-300/60 transition-colors"
                >
                  <OptimizedImage
                    src={program.logo}
                    alt={`${program.org} logo`}
                    width={22}
                    height={22}
                    className="rounded-full bg-white/90"
                  />
                  <span className="font-semibold">{program.label}</span>
                </a>
              ))}
              {project.social?.x && (
                <a
                  href={project.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[var(--accent-purple)]/40 hover:text-[var(--accent-purple)] transition-colors"
                >
                  <FaXTwitter className="w-3 h-3" />
                  {project.social.xHandle}
                </a>
              )}
            </div>
          )}
        </motion.header>

        {/* Key numbers */}
        {project.stats?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
          >
            {project.stats.map((stat) => (
              <div key={stat.label} className={`${card} px-4 py-4`}>
                <p className="text-xl md:text-2xl font-bold text-[var(--accent-purple)] font-mono tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT: media + description + steps + tech + features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 min-w-0 space-y-6 w-full"
          >
            {/* Carousel */}
            <div
              className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
              role="region"
              aria-roledescription="carousel"
              aria-label={`${project.title} screenshots`}
            >
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
                    <VideoWithFallback
                      src={project.images[current]}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                      controls
                      aria-label={`${project.title} preview video`}
                    />
                  ) : (
                    <OptimizedImage
                      src={project.images[current]}
                      alt={`${project.title} – screenshot ${current + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-top"
                      priority={current === 0}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Counter */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur border border-white/[0.08] text-[var(--text-secondary)] text-xs px-2.5 py-1 rounded-full font-mono">
                {current + 1} / {total}
              </div>

              {total > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur border border-white/[0.08] text-white rounded-full hover:bg-[var(--accent-purple)]/20 hover:border-[var(--accent-purple)]/30 transition-all"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur border border-white/[0.08] text-white rounded-full hover:bg-[var(--accent-purple)]/20 hover:border-[var(--accent-purple)]/30 transition-all"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {total > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Show screenshot ${i + 1}`}
                    aria-current={i === current}
                    className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      i === current
                        ? "border-[var(--accent-purple)] shadow-[0_0_12px_rgba(159,78,255,0.3)]"
                        : "border-white/[0.06] hover:border-white/[0.15]"
                    }`}
                  >
                    {isVideo(img) ? (
                      <VideoWithFallback
                        src={img}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        aria-label={`Thumbnail video ${i + 1}`}
                      />
                    ) : (
                      <OptimizedImage
                        src={img}
                        alt={`thumb ${i + 1}`}
                        width={80}
                        height={48}
                        className="w-full h-full object-cover object-top"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <section className={`${card} p-6`}>
              <h2 className={`${sectionLabel} mb-3`}>About</h2>
              <div className="space-y-3">
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-[var(--text-secondary)] leading-relaxed text-sm">
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* How it works */}
            {project.howItWorks?.length > 0 && (
              <section className={`${card} p-6`}>
                <h2 className={`${sectionLabel} mb-5`}>How it works</h2>
                <ol className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
                  {project.howItWorks.map((step, i) => (
                    <li
                      key={step.title}
                      className="relative rounded-xl border border-white/[0.06] bg-[var(--bg-primary)] p-4"
                    >
                      <span className="font-mono text-[10px] text-[var(--accent-purple)] tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                        {step.title}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-1">
                        {step.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Tech Stack */}
            <section className={`${card} p-6`}>
              <h2 className={`${sectionLabel} mb-4`}>Tech Stack</h2>
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
            </section>

            {/* Features */}
            <section className={`${card} p-6`}>
              <h2 className={`${sectionLabel} mb-4`}>Core Features</h2>
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
            </section>
          </motion.div>

          {/* RIGHT: links sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4"
          >
            {/* Quick Links */}
            <div className={`${card} p-5`}>
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-4">
                Quick Links
              </p>
              <div className="space-y-3">
                {activeLinks.map(({ key, label, sub, href, Icon }) => (
                  <a
                    key={key}
                    href={href ? href(project) : project[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-[var(--bg-primary)] px-4 py-3.5 transition-all duration-300 hover:border-[var(--accent-purple)]/30 hover:bg-[var(--accent-purple-dim)] hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-purple-dim)] text-[var(--accent-purple)] group-hover:bg-[var(--accent-purple)]/20 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">
                          {label}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] truncate">
                          {typeof sub === "function" ? sub(project) : sub}
                        </p>
                      </div>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent-purple)] group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Install */}
            {project.install && (
              <div className={`${card} p-5`}>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-3">
                  Install the SDK
                </p>
                <CopyCommand command={project.install} />
              </div>
            )}

            {/* Programs / accelerators */}
            {project.programs?.length > 0 && (
              <div className="rounded-2xl border border-teal-300/20 bg-[var(--bg-secondary)] p-5 relative overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(45,212,191,0.08) 0%, transparent 70%)",
                  }}
                />
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <GraduationCapIcon className="w-3.5 h-3.5 text-teal-300" />
                  <p className="text-teal-300/80 text-xs uppercase tracking-widest font-medium">
                    Backed by
                  </p>
                </div>
                <div className="space-y-3 relative z-10">
                  {project.programs.map((program, i) => (
                    <a
                      key={i}
                      href={program.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 rounded-xl border border-teal-300/10 bg-teal-300/[0.04] p-3 hover:border-teal-300/30 transition-colors"
                    >
                      <OptimizedImage
                        src={program.logo}
                        alt={`${program.org} logo`}
                        width={44}
                        height={44}
                        className="flex-shrink-0 rounded-lg bg-white/90"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-teal-100 flex items-center gap-1">
                          {program.label}
                          <ArrowUpRightIcon className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </p>
                        {program.description && (
                          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-0.5">
                            {program.description}
                          </p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Awards & Recognition */}
            {project.awards?.length > 0 && (
              <div className="rounded-2xl border border-amber-400/20 bg-[var(--bg-secondary)] p-5 relative overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.07) 0%, transparent 70%)",
                  }}
                />
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <TrophyIcon className="w-3.5 h-3.5 text-amber-400" />
                  <p className="text-amber-400/80 text-xs uppercase tracking-widest font-medium">
                    Awards
                  </p>
                </div>
                <div className="space-y-3 relative z-10">
                  {project.awards.map((award, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-amber-400/10 bg-amber-400/[0.04] px-4 py-3"
                    >
                      <p className="text-amber-300 text-xs font-semibold mb-0.5">
                        {award.prize}
                      </p>
                      {award.link ? (
                        <a
                          href={award.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-amber-400/60 hover:text-amber-400 transition-colors font-mono"
                        >
                          {award.label}
                          <ExternalLinkIcon className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <p className="text-[10px] text-amber-400/60 font-mono">
                          {award.label}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Info */}
            <div className={`${card} p-5`}>
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-3">
                Project Info
              </p>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[var(--text-muted)]">Category</span>
                  <span className="text-[var(--accent-cyan)] font-medium text-right">
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
          </motion.aside>
        </div>

        {/* Resources: every public link, grouped */}
        {project.resources?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
            aria-labelledby="resources-heading"
          >
            <h2
              id="resources-heading"
              className="text-lg font-bold text-[var(--text-primary)] mb-1"
            >
              Resources
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Everything public about {project.title}: product, developer tools, pitch and
              research, and community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.resources.map((group) => (
                <div key={group.group} className={`${card} p-5`}>
                  <p className="text-[var(--accent-purple)] text-[10px] font-mono uppercase tracking-[0.2em] mb-3">
                    {group.group}
                  </p>
                  <ul className="divide-y divide-white/[0.04]">
                    {group.items.map((item) => (
                      <li key={item.url}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 py-2.5"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">
                              {item.label}
                            </p>
                            {item.description && (
                              <p className="text-xs text-[var(--text-muted)] truncate">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <ArrowUpRightIcon className="w-4 h-4 flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent-purple)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>
        )}

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
                  href={`/projects/${projectSlug(rel.title)}`}
                  className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--bg-secondary)] hover:border-[var(--accent-purple)]/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent-purple)]/5"
                >
                  <div className="aspect-video relative bg-[var(--bg-primary)]">
                    {isVideo(rel.images[0]) ? (
                      <VideoWithFallback
                        src={rel.images[0]}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                        muted
                        loop
                        playsInline
                        aria-label={`${rel.title} preview`}
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

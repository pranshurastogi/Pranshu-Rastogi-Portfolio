"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLinkIcon, GithubIcon, EyeIcon, XIcon, MailIcon, ChevronLeftIcon, ChevronRightIcon, TrophyIcon,
} from "lucide-react";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import projectsData from "../../data/projects.json";
import OptimizedImage from "../ui/OptimizedImage";
import VideoWithFallback from "../ui/VideoWithFallback";
import { projectSlug } from "@/lib/site-seo";

const PROJECTS_PER_PAGE = 6;

const pageVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -50 : 50, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function ProjectShowcase() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);

  const projects = projectsData.projects;
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const pageProjects = projects.slice(page * PROJECTS_PER_PAGE, (page + 1) * PROJECTS_PER_PAGE);

  function changePage(newPage) {
    setDir(newPage > page ? 1 : -1);
    setPage(newPage);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openProject(project) {
    router.push(`/projects/${projectSlug(project.title)}`);
  }

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
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--accent-purple)] uppercase opacity-70">
              {page === 0 ? "★ Featured Builds" : "★ More Projects"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight cosmic-shimmer">
            Projects
          </h2>
          <div className="section-divider-cosmic mb-4" />
          <p className="text-[var(--text-muted)] text-sm max-w-lg mx-auto">
            Building privacy protocols, AI security infrastructure, and decentralized identity across multiple chains.
          </p>
        </motion.div>

        {/* Project grid with AnimatePresence for page transitions */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
          >
            {pageProjects.map((project, index) => (
              <motion.article
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
                onClick={() => openProject(project)}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`relative bg-[var(--bg-secondary)] border rounded-2xl p-0 h-full transition-all duration-300 overflow-hidden ${
                    hoveredCard === project.id
                      ? "border-[var(--accent-purple)]/40 shadow-[0_8px_40px_rgba(159,78,255,0.12)]"
                      : "border-white/[0.06]"
                  }`}
                >
                  {/* Cosmic glow overlay on hover */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-2xl ${
                      hoveredCard === project.id ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, rgba(159,78,255,0.08) 0%, transparent 70%)`,
                    }}
                  />

                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    {project.images[0]?.match(/\.(mov|mp4|webm)$/) ? (
                      <VideoWithFallback
                        src={project.images[0]}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                        aria-label={`${project.title} preview video`}
                      />
                    ) : (
                      <OptimizedImage
                        src={project.images[0]}
                        alt={`${project.title} — ${project.subtitle}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[var(--bg-primary)]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur rounded-full p-3 border border-white/20">
                        <EyeIcon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    {/* Difficulty badge */}
                    {project.difficulty === "Advanced" && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur rounded-md border border-[var(--accent-purple)]/30 text-[9px] font-mono text-[var(--accent-purple)] uppercase tracking-wider">
                        Advanced
                      </div>
                    )}
                    {/* Recognition badges: award + accelerator program */}
                    {(project.awards?.length > 0 || project.programs?.length > 0) && (
                      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center gap-1.5">
                        {project.awards?.length > 0 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur rounded-md border border-amber-400/40">
                            <TrophyIcon className="w-2.5 h-2.5 text-amber-400 flex-shrink-0" />
                            <span className="text-[9px] font-mono text-amber-300 leading-none">
                              {project.awards[0].label}
                            </span>
                          </div>
                        )}
                        {project.programs?.map((program) => (
                          <div
                            key={program.label}
                            className="flex items-center gap-1 pl-0.5 pr-2 py-0.5 bg-black/70 backdrop-blur rounded-md border border-teal-300/40"
                          >
                            <OptimizedImage
                              src={program.logo}
                              alt={`${program.org} logo`}
                              width={14}
                              height={14}
                              className="rounded-sm bg-white/90"
                            />
                            <span className="text-[9px] font-mono text-teal-200 leading-none">
                              {program.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className={`text-base font-semibold mb-1 transition-colors ${
                        hoveredCard === project.id ? "text-[var(--accent-purple)]" : "text-[var(--text-primary)]"
                      }`}>
                        {project.title}
                      </h3>
                      <p className="text-[var(--text-muted)] text-xs">{project.subtitle}</p>
                    </div>

                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[var(--accent-purple-dim)] text-[var(--accent-purple)] text-[10px] rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 bg-white/[0.03] text-[var(--text-muted)] text-[10px] rounded-md">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                      <span className="px-2 py-0.5 bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)] text-[10px] rounded-md font-medium">
                        {project.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.live, "_blank", "noopener,noreferrer");
                        }}
                        className="px-3 py-1.5 bg-[var(--accent-purple-dim)] text-[var(--accent-purple)] text-xs rounded-lg font-medium hover:bg-[var(--accent-purple)]/20 transition-colors min-h-[36px]"
                        aria-label={`Launch demo for ${project.title}`}
                      >
                        {project.live?.includes("github.com") ? "GitHub →" : "Live Demo →"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex items-center justify-center gap-6 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => changePage(page - 1)}
              disabled={page === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                page === 0
                  ? "border-white/[0.04] text-[var(--text-muted)] opacity-40 cursor-not-allowed"
                  : "border-white/[0.08] text-[var(--text-secondary)] hover:border-[var(--accent-purple)]/40 hover:text-[var(--accent-purple)] hover:bg-[var(--accent-purple-dim)]"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Prev
            </button>

            {/* Cosmic dot indicators */}
            <div className="flex items-center gap-2.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => changePage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className="relative"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === page
                        ? "w-6 h-2 bg-[var(--accent-purple)] shadow-[0_0_8px_rgba(159,78,255,0.8)]"
                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                page === totalPages - 1
                  ? "border-white/[0.04] text-[var(--text-muted)] opacity-40 cursor-not-allowed"
                  : "border-white/[0.08] text-[var(--text-secondary)] hover:border-[var(--accent-purple)]/40 hover:text-[var(--accent-purple)] hover:bg-[var(--accent-purple-dim)]"
              }`}
              aria-label="Next page"
            >
              Next
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative bg-[var(--bg-secondary)] border border-white/[0.06] rounded-2xl p-8 max-w-lg mx-auto overflow-hidden">
            {/* Nebula glow inside CTA */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 100%, rgba(159,78,255,0.06) 0%, transparent 70%)",
              }}
            />
            <p className="text-[var(--text-secondary)] mb-5 text-sm relative z-10">
              Interested in collaborating on blockchain or AI security projects?
            </p>
            <button
              onClick={() => setShowCollabModal(true)}
              className="relative z-10 px-6 py-2.5 bg-[var(--accent-purple)] text-white font-medium rounded-xl hover:bg-[var(--accent-purple)]/90 transition-all hover:shadow-lg hover:shadow-[var(--accent-purple)]/20 text-sm"
            >
              Let's Build Together
            </button>
          </div>
        </motion.div>
      </div>

      {/* Collaboration Modal */}
      <AnimatePresence>
        {showCollabModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => setShowCollabModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[var(--bg-secondary)] border border-white/[0.08] rounded-2xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/[0.06]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                      Let's Build Together
                    </h2>
                    <p className="text-sm text-[var(--text-muted)]">
                      Connect to discuss blockchain projects and Web3 ideas.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCollabModal(false)}
                    className="p-2 hover:bg-white/[0.04] rounded-lg transition-colors text-[var(--text-muted)]"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <a
                  href="https://x.com/pranshurastogii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] hover:border-[var(--accent-purple)]/30 hover:bg-white/[0.02] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-purple-dim)] flex items-center justify-center">
                    <FaTwitter className="w-5 h-5 text-[var(--accent-purple)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">Connect on X</p>
                    <p className="text-xs text-[var(--text-muted)]">@pranshurastogii — DM for real-time conversations</p>
                  </div>
                  <ExternalLinkIcon className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-purple)] transition-colors" />
                </a>

                <div className="p-4 rounded-xl border border-white/[0.06]">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-cyan-dim)] flex items-center justify-center">
                      <MailIcon className="w-5 h-5 text-[var(--accent-cyan)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">Email</p>
                      <p className="text-xs text-[var(--text-muted)] font-mono">pranshurastogi.eth@gmail.com</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText("pranshurastogi.eth@gmail.com")}
                    className="w-full py-2 text-xs font-medium text-[var(--accent-cyan)] bg-[var(--accent-cyan-dim)] rounded-lg hover:bg-[var(--accent-cyan)]/15 transition-colors"
                  >
                    Copy email address
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

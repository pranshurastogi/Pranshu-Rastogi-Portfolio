"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLinkIcon, GithubIcon, EyeIcon, BookOpenIcon, TrophyIcon,
  XIcon, MessageCircleIcon, MailIcon,
} from "lucide-react";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import projectsData from "../../data/projects.json";
import OptimizedImage from "../ui/OptimizedImage";

const ProjectShowcase = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showCollabModal, setShowCollabModal] = useState(false);
  const projects = projectsData.projects;

  const openProject = (project) => {
    const slug = project.title.toLowerCase().replace(/\s+/g, "-");
    router.push(`/projects/${slug}`);
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
            Projects
          </h2>
          <div className="section-divider mb-4" />
          <p className="text-[var(--text-muted)] text-sm max-w-lg mx-auto">
            Building privacy protocols, DeFi infrastructure, and decentralized identity across multiple chains.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
              onClick={() => openProject(project)}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`bg-[var(--bg-secondary)] border rounded-2xl p-0 h-full transition-all duration-300 overflow-hidden ${
                  hoveredCard === project.id
                    ? "border-[var(--accent-purple)]/30 shadow-lg shadow-[var(--accent-purple)]/5"
                    : "border-white/[0.06]"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  {project.images[0]?.match(/\.(mov|mp4|webm)$/) ? (
                    <video
                      src={project.images[0]}
                      className="w-full h-full object-cover"
                      muted loop playsInline autoPlay
                    />
                  ) : (
                    <OptimizedImage
                      src={project.images[0]}
                      alt={`${project.title} — ${project.subtitle}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[var(--bg-primary)]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur rounded-full p-3 border border-white/20">
                      <EyeIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
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
                      Live Demo →
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-[var(--bg-secondary)] border border-white/[0.06] rounded-2xl p-8 max-w-lg mx-auto">
            <p className="text-[var(--text-secondary)] mb-5 text-sm">
              Interested in collaborating on blockchain projects?
            </p>
            <button
              onClick={() => setShowCollabModal(true)}
              className="px-6 py-2.5 bg-[var(--accent-purple)] text-white font-medium rounded-xl hover:bg-[var(--accent-purple)]/90 transition-all hover:shadow-lg hover:shadow-[var(--accent-purple)]/20 text-sm"
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
              {/* Header */}
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

              {/* Connect options */}
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
                    <p className="text-xs text-[var(--text-muted)]">DM for real-time conversations</p>
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
};

export default ProjectShowcase;

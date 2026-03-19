"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaTwitter, FaLinkedin, FaMedium, FaGithub, FaYoutube,
} from "react-icons/fa";
import { FileText, Download, ChevronDown, ChevronUp } from "lucide-react";
import AnimatedPfp from "./AnimatedPfp";

/* ── Typewriter ── */
function Typewriter({ roles, speed = 80, pause = 1200 }) {
  const [displayed, setDisplayed] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!deleting && charIdx < roles[roleIdx].length) {
      timeout = setTimeout(() => setCharIdx(charIdx + 1), speed);
      setDisplayed(roles[roleIdx].slice(0, charIdx + 1));
    } else if (!deleting && charIdx === roles[roleIdx].length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(charIdx - 1), speed / 2);
      setDisplayed(roles[roleIdx].slice(0, charIdx - 1));
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx, roles, speed, pause]);

  return (
    <span className="text-base sm:text-xl md:text-2xl tracking-tight text-[var(--text-secondary)]">
      {displayed}
      <span className="text-[var(--accent-cyan)] terminal-cursor">|</span>
    </span>
  );
}

/* ── Social icon ── */
function SocialIcon({ href, label, children }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group"
    >
      <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[var(--accent-purple)]/40 hover:bg-[var(--accent-purple-dim)] transition-all duration-200 hover:scale-105">
        <span className="text-xl text-[var(--text-muted)] group-hover:text-[var(--accent-purple)] transition-colors">
          {children}
        </span>
      </span>
    </Link>
  );
}

export default function Hero() {
  const shortBio =
    "It all started in 2018 with the Bitcoin whitepaper. That one PDF changed everything. Today, I build, lead, and grow ecosystems across Web3. Obsessed with technology, empathy, and building with purpose.";
  const longBio =
    "It all started in 2018. Not with an airdrop, but with the Bitcoin whitepaper. That one PDF hit differently. Since then, I've worn many hats: software engineer, engineering lead, and now ecosystem builder forging integrations that actually matter.\n\nSomewhere along the way, I discovered one seriously underrated superpower: empathy. It's what builds strong communities, aligns people, and turns contributors into true believers. I'm deeply obsessed with tech, psychology, and storytelling that connects, not just converts.\n\nWe're not just shipping products here; we're building purpose. Web3 isn't a hype cycle for me. It's a mirror, a place to find our truest contribution. Still here. Still building. The road is long, but with the right people, it feels just right.";

  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const socials = [
    ["https://x.com/pranshurastogii", <FaTwitter key="x" />, "X"],
    ["https://www.linkedin.com/in/rastogipranshu/", <FaLinkedin key="li" />, "LinkedIn"],
    ["https://pranshurastogi.medium.com/", <FaMedium key="md" />, "Medium"],
    ["https://github.com/pranshurastogi", <FaGithub key="gh" />, "GitHub"],
    ["https://www.youtube.com/@pranshurastogi", <FaYoutube key="yt" />, "YouTube"],
  ];

  const roles = [
    "Head of Ecosystem & Integrations @ Push Chain",
    "Web3 Builder & Community Orchestrator",
    "Storyteller. Technologist. Empath.",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20 md:pt-0">

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center md:items-start w-full max-w-5xl gap-8 py-10 md:py-16 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Avatar */}
        <motion.div
          className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 flex-shrink-0 mx-auto md:mx-0"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ perspective: 800 }}
        >
          <div className="absolute inset-0 rounded-3xl border-2 border-[var(--accent-purple)]/20 shadow-[0_0_40px_rgba(159,78,255,0.12)]" />
          <motion.div
            className="relative w-full h-full rounded-3xl overflow-hidden"
            animate={{ rotateY: hovered ? 8 : 0, rotateX: hovered ? 4 : 0, scale: hovered ? 1.03 : 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <AnimatedPfp />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Name */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-1 tracking-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Pranshu Rastogi
          </motion.h1>

          {/* Typewriter role */}
          <motion.h2
            className="text-base sm:text-lg md:text-xl mb-5 font-medium min-h-[2.5rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Typewriter roles={roles} />
          </motion.h2>

          {/* Bio */}
          <motion.div
            className="w-full max-w-xl mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {expanded ? longBio : shortBio}
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 inline-flex items-center gap-1.5 text-[var(--accent-purple)] text-sm font-medium hover:text-[var(--accent-cyan)] transition-colors"
            >
              {expanded ? (
                <>Show less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Read more <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-2.5 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {socials.map(([url, icon, label]) => (
              <SocialIcon key={url} href={url} label={label}>
                {icon}
              </SocialIcon>
            ))}
          </motion.div>

          {/* Resume */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[var(--text-muted)] hover:text-[var(--accent-purple)] hover:border-[var(--accent-purple)]/30 transition-all text-sm"
            >
              <FileText className="w-4 h-4" />
              <span className="font-mono text-xs">resume.pdf</span>
              <Download className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

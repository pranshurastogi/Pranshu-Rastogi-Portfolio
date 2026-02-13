// src/components/Hero.jsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import VaporizeTextCycle, { Tag } from "../ui/vaporize-text-cycle";
import Link from "next/link";

const CelestialBloomShader = dynamic(
  () => import("../ui/celestial-bloom-shader"),
  { ssr: false }
);
const FloatingCryptoIcons = dynamic(() => import("./FloatingCryptoIcons"), {
  ssr: false,
});
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaLinkedin,
  FaMedium,
  FaGithub,
  FaYoutube,
  FaFileDownload,
  FaFilePdf,
} from "react-icons/fa";
import AnimatedPfp from "./AnimatedPfp";

// Update Typewriter for hacker theme
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
      <span
        className="font-mono text-base sm:text-xl md:text-2xl tracking-tight"
        style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace", color: "#e9d5ff" }}
      >
        {displayed}
        <span className="terminal-cursor">█</span>
      </span>
  );
}

// Glassy social icon
function GlassSocial({ href, label, children }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative"
    >
      <span className="relative flex items-center justify-center w-12 h-12 mx-1 rounded-2xl bg-black/60 border border-[#a78bfa]/50 shadow-lg hover:scale-110 transition-transform hover:border-[#c4b5fd]"
        style={{ boxShadow: '0 0 16px rgba(167,139,250,0.2)' }}>
        <span className="text-2xl transition-colors duration-200 group-hover:text-[#e9d5ff]" style={{ color: '#c4b5fd' }}>{children}</span>
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 top-14 opacity-0 group-hover:opacity-100 bg-black/90 text-[#e9d5ff] text-xs rounded px-2 py-1 pointer-events-none transition-opacity z-20 whitespace-nowrap font-mono border border-[#a78bfa]/50 shadow-lg" style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace" }}>
        {label}
      </span>
    </Link>
  );
}

// Terminal-style bio with Minimize button
function TerminalBio({ text, showFullBio, onMinimize }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!showFullBio) {
      setDisplayed('');
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 12);
      return () => clearInterval(interval);
    } else {
      setDisplayed(text);
    }
  }, [text, showFullBio]);
  return (
      <div className="relative w-full max-w-xl mt-2 flex flex-col items-center px-2 sm:px-0">
      <div className="terminal-bio px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-l-4 border-[#a78bfa] bg-black/60 shadow-lg backdrop-blur-sm font-mono text-[#e9d5ff] text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line w-full">
        <span className="select-none text-[#c4b5fd]">$</span> <span>{displayed}</span><span className="terminal-cursor">█</span>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{background: 'repeating-linear-gradient(0deg, transparent, transparent 6px, #AEEA0033 7px, transparent 8px)'}} />
      {showFullBio && (
        <div className="w-full flex justify-center mt-3">
          <button
            className="px-3 py-1 rounded border border-[#a78bfa]/60 bg-black/70 text-[#e9d5ff] font-mono font-bold shadow transition hover:bg-black/80 hover:text-[#c4b5fd] hover:border-[#c4b5fd] focus:outline-none focus:ring-2 focus:ring-[#a78bfa] flex items-center gap-2 z-10"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace" }}
            onClick={onMinimize}
          >
            <span className="select-none text-[#c4b5fd]">↩</span> Minimize <span className="hacker-cursor">█</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  const shortBio =
    "Started my journey in 2018 with the Bitcoin whitepaper. Now building, leading, and growing ecosystems in Web3. Obsessed with tech, empathy, and purpose.";
  const longBio =
    "Started my journey in 2018, not with an airdrop, but with the Bitcoin whitepaper. That one PDF hit differently. Since then, I've worn many hats: software engineer, engineering lead, and now, I help grow ecosystems and forge integrations that matter. Along the way, I've realized one underrated superpower empathy. It's what builds strong communities, aligns people, and turns contributors into believers. I'm deeply obsessed with tech, psychology, and storytelling—the kind that connects, not just converts. I believe we're not just building products here; we're building purpose. For me, Web3 isn't a hype cycle. It's a mirror—a place to find our truest contribution. Still here. Still building. Long road ahead, but with the right people, it feels just right. Positive vibes only.";
  const [showFullBio, setShowFullBio] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [headingAlignment, setHeadingAlignment] = useState("center");
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setHeadingAlignment(mq.matches ? "left" : "center");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Bitcoin logo SVG as cursor
  const bitcoinCursor = "url('data:image/svg+xml;utf8,<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"16\" cy=\"16\" r=\"14\" fill=\"%23F7931A\" stroke=\"%23000\" stroke-width=\"2\"/><text x=\"10\" y=\"23\" font-size=\"16\" font-family=\"monospace\" fill=\"#fff\">฿</text></svg>') 4 4, auto";

  // Gold coin drop effect state
  const [coins, setCoins] = useState([]);
  const handleDoubleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Drop 5 coins with random horizontal offsets
    const newCoins = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + Math.random() + i,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 10,
    }));
    setCoins((prev) => [...prev, ...newCoins]);
    setTimeout(() => {
      setCoins((prev) => prev.slice(newCoins.length));
    }, 1800);
  }, []);

  const socials = [
    ["https://x.com/pranshurastogii", <FaTwitter />, "X", "#1DA1F2"],
    ["https://www.linkedin.com/in/rastogipranshu/", <FaLinkedin />, "LinkedIn", "#0077B5"],
    ["https://pranshurastogi.medium.com/", <FaMedium />, "Medium", "#02B875"],
    ["https://github.com/pranshurastogi", <FaGithub />, "GitHub", "#333"],
    ["https://www.youtube.com/@pranshurastogi", <FaYoutube />, "YouTube", "#FF0000"],
  ];

  const resumeUrl = "/resume.pdf"; // You'll need to add your resume PDF to the public folder

  const roles = [
    "Head of Ecosystem & Integrations at Push Chain",
    "Web3 Builder & Community Orchestrator",
    "Storyteller. Technologist. Empath."
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-2 sm:px-4 md:px-0 pt-20 sm:pt-24 md:pt-0"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace", cursor: bitcoinCursor }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Layer 1: Celestial Bloom shader — only background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0612]">
        <CelestialBloomShader contained className="inset-0 w-full h-full" />
      </div>
      {/* Layer 2: Subtle gradient for content readability (no heavy overlay) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(10,6,18,0.4) 70%, rgba(10,6,18,0.7) 100%)",
        }}
      />
      {/* Layer 2b: Floating Web3 / crypto icons (Ethereum, Bitcoin, Solana, etc.) */}
      <FloatingCryptoIcons />
      {/* Gold coin drop effect */}
      {coins.map((coin) => (
        <span
          key={coin.id}
          className="gold-coin-drop"
          style={{ left: coin.x - 18, top: coin.y - 18 }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="16" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
            <text x="10" y="25" fontSize="16" fontFamily="monospace" fill="#fff" fontWeight="bold">฿</text>
          </svg>
        </span>
      ))}
      {/* Layer 3: Main content */}
      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center md:items-start w-full max-w-6xl gap-4 sm:gap-6 md:gap-8 py-8 sm:py-10 md:py-12 px-4 sm:px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Avatar (hacker terminal style background) */}
        <motion.div
          className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-6 sm:mb-8 md:mb-0 flex-shrink-0 group mx-auto md:mx-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ perspective: 800 }}
        >
          {/* Premium glass border effect */}
          <div className="absolute inset-0 z-0 glass-avatar-border" />
          {/* Glass highlight/reflection */}
          <div className="absolute inset-0 z-10 pointer-events-none glass-avatar-reflection" />
          {/* PFP stays perfectly clear */}
          <motion.div
            className="relative w-full h-full rounded-3xl overflow-hidden z-20"
            animate={{
              rotateY: hovered ? 12 : 0,
              rotateX: hovered ? 8 : 0,
              scale: hovered ? 1.04 : 1
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          >
            <AnimatedPfp />
          </motion.div>
        </motion.div>
        {/* Text content */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="relative w-full flex justify-center md:justify-start mb-2 min-h-[3.5rem] sm:min-h-[4rem] md:min-h-[5rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, type: "spring" }}
          >
            {/* Fallback h1: visible so name always shows if canvas hasn't drawn yet */}
            <h1
              className="absolute inset-0 flex items-center justify-center md:justify-start w-full max-w-full md:max-w-2xl text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-center md:text-left pointer-events-none select-none celestial-bloom-heading-block opacity-100 z-0"
              style={{
                fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace",
                color: "#e9d5ff",
              }}
            >
              Pranshu Rastogi
            </h1>
            {/* Vaporize canvas on top – when it draws, it covers the fallback */}
            <div className="relative w-full max-w-full md:max-w-2xl h-16 sm:h-20 md:h-24 lg:h-28 text-center md:text-left z-10">
              <VaporizeTextCycle
                texts={["Pranshu Rastogi"]}
                font={{
                  fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace",
                  fontSize: "clamp(30px, 5vw, 72px)",
                  fontWeight: 600,
                }}
                color="rgb(233, 213, 255)"
                spread={5}
                density={5}
                animation={{
                  vaporizeDuration: 2.5,
                  fadeInDuration: 1.2,
                  waitDuration: 0.8,
                }}
                direction="left-to-right"
                alignment={headingAlignment}
                tag={Tag.H1}
                className="celestial-bloom-heading-block w-full h-full"
              />
            </div>
          </motion.div>
          <motion.h2
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 font-semibold min-h-[2.5rem] text-center md:text-left px-2 sm:px-0"
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace",
              color: "#c4b5fd"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, type: 'spring' }}
          >
            <Typewriter roles={roles} />
          </motion.h2>
          {/* Terminal-style bio with prompt and scanline, and minimize button */}
          <TerminalBio text={showFullBio ? longBio : `blockchain installing...\n${shortBio}`} showFullBio={showFullBio} onMinimize={() => setShowFullBio(false)} />
          <div className="flex justify-center md:justify-start">
            {!showFullBio && (
              <button
                className="mt-3 px-6 py-2 rounded-lg border border-[#a78bfa]/60 bg-black/70 text-[#e9d5ff] font-mono font-bold shadow transition hover:bg-black/80 hover:text-[#c4b5fd] hover:border-[#c4b5fd] focus:outline-none focus:ring-2 focus:ring-[#a78bfa] flex items-center gap-2"
                style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace" }}
                onClick={() => setShowFullBio(true)}
              >
                <span className="select-none text-[#c4b5fd]">$</span> Read More <span className="hacker-cursor">█</span>
              </button>
            )}
          </div>
          {/* Socials - glassy blockchain style */}
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-3 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            {socials.map(([url, Icon, label, color], i) => (
              <GlassSocial key={url} href={url} label={label}>
                {Icon}
              </GlassSocial>
            ))}
          </motion.div>
          
          {/* Enhanced Resume Link */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-black/50 border border-[#a78bfa]/40 text-[#c4b5fd] hover:text-[#e9d5ff] hover:border-[#c4b5fd]/60 hover:bg-black/60 transition-all duration-300 font-mono text-sm backdrop-blur-sm"
              style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace" }}
            >
              <FaFilePdf className="text-base text-[#FF6B6B] group-hover:text-[#FF8E8E] transition-colors" />
              <span className="group-hover:underline">resume.pdf</span>
              <FaFileDownload className="text-xs opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <style jsx>{`
        .terminal-bio {
          box-shadow: 0 0 20px rgba(167, 139, 250, 0.15);
        }
        .terminal-cursor, .hacker-cursor {
          color: #c4b5fd;
        }
        .celestial-bloom-heading-block {
          filter: drop-shadow(0 0 12px rgba(167, 139, 250, 0.4)) drop-shadow(0 0 24px rgba(139, 92, 246, 0.2));
        }
        .glass-avatar-border {
          border-radius: 1.5rem;
          box-shadow:
            0 0 0 4px rgba(255,255,255,0.08) inset,
            0 0 0 10px rgba(167,139,250,0.15) inset,
            0 4px 32px rgba(139, 92, 246, 0.2);
          background: linear-gradient(120deg, rgba(255,255,255,0.12) 0%, rgba(167,139,250,0.08) 100%);
          border: 2px solid rgba(167,139,250,0.35);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          opacity: 0.98;
          width: 100%;
          height: 100%;
        }
        .glass-avatar-reflection {
          border-radius: 1.5rem;
          background: linear-gradient(120deg, rgba(255,255,255,0.2) 10%, transparent 80%);
          opacity: 0.2;
          width: 100%;
          height: 100%;
          mask-image: linear-gradient(120deg, rgba(0,0,0,0.6) 0%, transparent 60%);
          pointer-events: none;
        }
        .gold-coin-drop {
          position: absolute;
          z-index: 50;
          pointer-events: none;
          animation: coin-fall 1.6s cubic-bezier(0.4,0.7,0.6,1) forwards;
          opacity: 0.92;
        }
        @keyframes coin-fall {
          0% { transform: translateY(0) scale(1) rotate(-10deg); opacity: 1; }
          60% { transform: translateY(80px) scale(1.08) rotate(10deg); opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(180px) scale(0.92) rotate(24deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

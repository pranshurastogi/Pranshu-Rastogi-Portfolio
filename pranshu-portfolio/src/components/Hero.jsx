// src/components/Hero.jsx
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import {
  FaTwitter,
  FaLinkedin,
  FaMedium,
  FaGithub,
  FaYoutube,
  FaEthereum,
  FaBitcoin,
  FaLink,
  FaCube,
} from "react-icons/fa";

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
      className="font-mono text-[#AEEA00] text-xl md:text-2xl tracking-tight"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace" }}
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
      <span className="relative flex items-center justify-center w-12 h-12 mx-1 rounded-2xl bg-black/80 border-2 border-[#AEEA00] shadow-lg hover:scale-110 transition-transform hover:border-[#39FF14]"
        style={{ boxShadow: '0 0 12px #AEEA00, 0 0 2px #AEEA00' }}>
        <span className="text-2xl transition-colors duration-200 group-hover:text-[#39FF14]" style={{ color: '#AEEA00' }}>{children}</span>
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 top-14 opacity-0 group-hover:opacity-100 bg-black/90 text-[#AEEA00] text-xs rounded px-2 py-1 pointer-events-none transition-opacity z-20 whitespace-nowrap font-mono border border-[#AEEA00] shadow-lg" style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace" }}>
        {label}
      </span>
    </Link>
  );
}

// Animated mesh background with multiple animated gradients for hacker theme
function AnimatedMeshBackground() {
  return (
    <div className="absolute inset-0 w-full h-full -z-30 pointer-events-none overflow-hidden">
      {/* Multiple animated gradient blobs */}
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="1400" height="1000" viewBox="0 0 1400 1000" fill="none">
        <motion.ellipse
          cx="700" cy="500" rx="420" ry="320"
          fill="url(#hackerGradient1)"
          opacity="0.18"
          animate={{
            rx: [420, 440, 420],
            ry: [320, 340, 320],
            cx: [700, 720, 700],
            cy: [500, 520, 500]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="900" cy="300" rx="180" ry="120"
          fill="url(#hackerGradient2)"
          opacity="0.13"
          animate={{
            rx: [180, 200, 180],
            ry: [120, 140, 120],
            cx: [900, 940, 900],
            cy: [300, 340, 300]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="400" cy="700" rx="160" ry="100"
          fill="url(#hackerGradient3)"
          opacity="0.12"
          animate={{
            rx: [160, 180, 160],
            ry: [100, 120, 100],
            cx: [400, 420, 400],
            cy: [700, 720, 700]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <radialGradient id="hackerGradient1" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#00ff99" />
            <stop offset="100%" stopColor="#0f2027" />
          </radialGradient>
          <radialGradient id="hackerGradient2" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#00e0ff" />
            <stop offset="100%" stopColor="#232526" />
          </radialGradient>
          <radialGradient id="hackerGradient3" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#a259ff" />
            <stop offset="100%" stopColor="#092b1a" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

// Matrix rain background effect
function MatrixRain() {
  // Deterministic matrix rain for SSR consistency
  const columns = 10;
  const rows = 6;
  // Define blockchain icons to rain with their brand colors, with more Bitcoin and Ethereum
  const icons = [
    { icon: <FaEthereum />, color: "#627EEA" },
    { icon: <FaEthereum />, color: "#627EEA" },
    { icon: <FaEthereum />, color: "#627EEA" },
    { icon: <FaBitcoin />, color: "#F7931A" },
    { icon: <FaBitcoin />, color: "#F7931A" },
    { icon: <FaBitcoin />, color: "#F7931A" },
    { icon: <FaCube />, color: "#00ff99" },
    { icon: <FaLink />, color: "#2A5ADA" },
    // Polkadot SVG icon with brand color
    { icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="7" fill="#E6007A"/><circle cx="16" cy="4" r="3" fill="#E6007A"/><circle cx="16" cy="28" r="3" fill="#E6007A"/><circle cx="4" cy="16" r="3" fill="#E6007A"/><circle cx="28" cy="16" r="3" fill="#E6007A"/></svg>, color: "#E6007A" },
  ];
  function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {Array.from({ length: columns }).map((_, colIdx) => (
        <span
          key={colIdx}
          className="matrix-col"
          style={{ left: `${(colIdx / columns) * 100}%` }}
        >
          {Array.from({ length: rows }).map((_, rowIdx) => {
            const seed = colIdx * 100 + rowIdx;
            const delay = (seededRandom(seed) * 4).toFixed(2);
            const opacity = (0.08 + seededRandom(seed + 1) * 0.17).toFixed(2); // 0.08-0.25
            const iconIdx = Math.floor(seededRandom(seed + 2) * icons.length);
            const { icon, color } = icons[iconIdx];
            return (
              <span
                key={rowIdx}
                className="matrix-glyph"
                style={{
                  animationDelay: `${delay}s`,
                  opacity,
                  color,
                }}
              >
                {icon}
              </span>
            );
          })}
        </span>
      ))}
      <style jsx>{`
        .matrix-col {
          position: absolute;
          top: 0;
          width: 7vw;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-events: none;
        }
        .matrix-glyph {
          font-family: 'Fira Mono', 'Consolas', monospace;
          font-size: min(2.8vw, 54px);
          min-font-size: 32px;
          text-shadow: 0 0 3px #00ff99, 0 0 1px #00ff99;
          animation: matrix-fall 36s linear infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .matrix-glyph svg {
          width: 1em;
          height: 1em;
          display: inline;
        }
        @keyframes matrix-fall {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Update TerminalBio to show Minimize button at the bottom, centered
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
    <div className="relative w-full max-w-xl mt-2 flex flex-col items-center">
      <div className="terminal-bio px-6 py-4 rounded-2xl border-l-4 border-[#AEEA00] bg-black/80 shadow-lg backdrop-blur-sm font-mono text-[#AEEA00] text-base md:text-lg leading-relaxed whitespace-pre-line w-full">
        <span className="select-none text-[#39FF14]">$</span> <span>{displayed}</span><span className="terminal-cursor">█</span>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{background: 'repeating-linear-gradient(0deg, transparent, transparent 6px, #AEEA0033 7px, transparent 8px)'}} />
      {showFullBio && (
        <div className="w-full flex justify-center mt-3">
          <button
            className="px-3 py-1 rounded border-2 border-[#AEEA00] bg-black/90 text-[#AEEA00] font-mono font-bold shadow transition hover:shadow-lg hover:bg-[#101c0f] hover:text-[#39FF14] hover:border-[#39FF14] focus:outline-none focus:ring-2 focus:ring-[#AEEA00] flex items-center gap-2 z-10"
            style={{ textShadow: '0 0 8px #AEEA00, 0 0 2px #AEEA00', fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace" }}
            onClick={onMinimize}
          >
            <span className="select-none text-[#39FF14]">↩</span> Minimize <span className="hacker-cursor">█</span>
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
  const [bioVisible, setBioVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBioVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const socials = [
    ["https://x.com/pranshurastogii", <FaTwitter />, "X", "#1DA1F2"],
    ["https://www.linkedin.com/in/rastogipranshu/", <FaLinkedin />, "LinkedIn", "#0077B5"],
    ["https://pranshurastogi.medium.com/", <FaMedium />, "Medium", "#02B875"],
    ["https://github.com/pranshurastogi", <FaGithub />, "GitHub", "#333"],
    ["https://www.youtube.com/@pranshurastogi", <FaYoutube />, "YouTube", "#FF0000"],
  ];

  const roles = [
    "Head of Ecosystem & Integrations at Push Chain",
    "Web3 Builder & Community Orchestrator",
    "Storyteller. Technologist. Empath."
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-0"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace", background: "linear-gradient(135deg, #071d16 0%, #0f3327 60%, #0a1812 100%)" }}
    >
      {/* Matrix rain hacker background */}
      <MatrixRain />
      {/* Animated mesh/cubes background and particles (now neon green/cyan/purple/blue/black) */}
      <AnimatedMeshBackground />
      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full opacity-20" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff99 2.5px, transparent 3px)" }} />
      </div>
      {/* Glassmorphism overlay for the whole hero section */}
      <div className="absolute inset-0 z-20 bg-white/30 dark:bg-black/30 backdrop-blur-xl" style={{opacity: 0.7}} />
      {/* Main content */}
      <motion.div
        className="relative z-30 flex flex-col md:flex-row items-center md:items-start w-full max-w-6xl gap-12 py-24"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Avatar (hacker terminal style background) */}
        <motion.div
          className="relative w-48 h-48 md:w-56 md:h-56 mb-8 md:mb-0 flex-shrink-0 group"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ perspective: 800 }}
        >
          {/* Terminal-style background and scanline */}
          <div className="absolute inset-0 rounded-3xl bg-black/80 border-2 border-[#AEEA00] z-0" />
          <div className="absolute inset-0 rounded-3xl z-0 pointer-events-none opacity-10" style={{background: 'repeating-linear-gradient(0deg, transparent, transparent 6px, #AEEA0033 7px, transparent 8px)'}} />
          {/* Animated glowing, pulsing border (neon green) */}
          <motion.div
            className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#AEEA00] via-[#00ff99] to-[#AEEA00] blur-2xl opacity-90 z-0"
            animate={{
              scale: [1, 1.08, 1],
              filter: [
                'blur(24px) brightness(1)',
                'blur(32px) brightness(1.2)',
                'blur(24px) brightness(1)'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative w-full h-full rounded-3xl overflow-hidden z-10"
            animate={{
              rotateY: hovered ? 12 : 0,
              rotateX: hovered ? 8 : 0,
              scale: hovered ? 1.04 : 1
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          >
            <Image
              src="/images/pfp.jpg"
              alt="Pranshu Rastogi"
              fill
              className="object-cover"
              sizes="220px"
              priority
            />
          </motion.div>
        </motion.div>
        {/* Text content */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-normal mb-2 drop-shadow-lg neon-flicker"
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace",
              color: "#AEEA00"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, type: 'spring' }}
          >
            Pranshu Rastogi
          </motion.h1>
          <motion.h2
            className="text-lg md:text-2xl mb-4 font-semibold min-h-[2.5rem]"
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace",
              color: "#80CBC4"
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
                className="mt-3 px-6 py-2 rounded-lg border-2 border-[#AEEA00] bg-black/90 text-[#AEEA00] font-mono font-bold shadow transition hover:shadow-lg hover:bg-[#101c0f] hover:text-[#39FF14] hover:border-[#39FF14] focus:outline-none focus:ring-2 focus:ring-[#AEEA00] flex items-center gap-2"
                style={{ textShadow: '0 0 8px #AEEA00, 0 0 2px #AEEA00', fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace" }}
                onClick={() => setShowFullBio(true)}
              >
                <span className="select-none text-[#39FF14]">$</span> Read More <span className="hacker-cursor">█</span>
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
        </motion.div>
      </motion.div>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .terminal-bio {
          box-shadow: 0 0 16px #0f0a, 0 0 2px #0f0a;
        }
        .terminal-cursor, .hacker-cursor {
          color: #AEEA00;
          animation: blink 1s steps(2, start) infinite;
        }
        .neon-flicker {
          text-shadow:
            0 0 6px #AEEA00,
            0 0 12px #AEEA00,
            0 0 20px #AEEA00,
            0 0 40px #222,
            0 0 2px #222;
          animation: neon-flicker 2.2s infinite linear alternate;
        }
        @keyframes neon-flicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 6px #AEEA00, 0 0 12px #AEEA00, 0 0 20px #AEEA00, 0 0 40px #222, 0 0 2px #222; }
          2% { opacity: 0.85; }
          8% { opacity: 0.95; }
          10% { opacity: 0.7; text-shadow: 0 0 2px #AEEA00, 0 0 8px #AEEA00, 0 0 10px #AEEA00, 0 0 20px #222, 0 0 2px #222; }
          12% { opacity: 1; }
          20% { opacity: 0.9; }
          22% { opacity: 1; }
          24% { opacity: 0.8; }
          28% { opacity: 1; }
          70% { opacity: 0.95; }
          72% { opacity: 0.7; }
          77% { opacity: 1; }
        }
        @keyframes blink {
          to { visibility: hidden; }
        }
      `}</style>
    </section>
  );
}

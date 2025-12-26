// src/components/Hero.jsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import OptimizedImage from "../ui/OptimizedImage";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
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
  FaFileDownload,
  FaFilePdf,
} from "react-icons/fa";
import AnimatedPfp from "./AnimatedPfp";
import FloatingBlockchainIcons from "./FloatingBlockchainIcons";

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
        className="font-mono text-[#AEEA00] text-base sm:text-xl md:text-2xl tracking-tight"
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

// Optimized animated mesh background with reduced complexity
function AnimatedMeshBackground() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className="absolute inset-0 w-full h-full -z-30 pointer-events-none overflow-hidden">
      {/* Simplified animated gradient blobs */}
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="1400" height="1000" viewBox="0 0 1400 1000" fill="none">
        <motion.ellipse
          cx="700" cy="500" rx="420" ry="320"
          fill="url(#hackerGradient1)"
          opacity="0.18"
          animate={isInView ? {
            rx: [420, 440, 420],
            ry: [320, 340, 320],
          } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="900" cy="300" rx="180" ry="120"
          fill="url(#hackerGradient2)"
          opacity="0.13"
          animate={isInView ? {
            rx: [180, 200, 180],
            ry: [120, 140, 120],
          } : {}}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.ellipse
          cx="400" cy="200" rx="150" ry="100"
          fill="url(#hackerGradient3)"
          opacity="0.15"
          animate={isInView ? {
            rx: [150, 170, 150],
            ry: [100, 120, 100],
          } : {}}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        
        {/* Gradients */}
        <defs>
          <radialGradient id="hackerGradient1" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hackerGradient2" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hackerGradient3" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#AEEA00" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#AEEA00" stopOpacity="0" />
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
      <div className="relative w-full max-w-xl mt-2 flex flex-col items-center px-2 sm:px-0">
      <div className="terminal-bio px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-l-4 border-[#AEEA00] bg-black/80 shadow-lg backdrop-blur-sm font-mono text-[#AEEA00] text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line w-full">
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
  const [crack, setCrack] = useState({ visible: false, x: 0, y: 0 });

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

  const resumeUrl = "/resume.pdf"; // You'll need to add your resume PDF to the public folder

  const roles = [
    "Head of Ecosystem & Integrations at Push Chain",
    "Web3 Builder & Community Orchestrator",
    "Storyteller. Technologist. Empath."
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-2 sm:px-4 md:px-0 pt-20 sm:pt-24 md:pt-0"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace", background: "#070f09", cursor: bitcoinCursor }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Matrix rain hacker background */}
      <MatrixRain />
      {/* Animated mesh/cubes background and particles (now neon green/cyan/purple/blue/black) */}
      <AnimatedMeshBackground />
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
      {/* Glass crack effect overlay */}
      {crack.visible && (
        <div
          className="pointer-events-none absolute z-40"
          style={{
            left: crack.x - 64,
            top: crack.y - 64,
            width: 128,
            height: 128,
            pointerEvents: "none",
          }}
        >
          {/* SVG crack graphic */}
          <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
            <g opacity="0.85">
              <path d="M64 0v32M64 128v-32M0 64h32M128 64h-32M32 32l16 16M96 96l-16-16M32 96l16-16M96 32l-16 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M64 64l-20-20M64 64l20-20M64 64l-20 20M64 64l20 20" stroke="#AEEA00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
      )}
      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full opacity-20" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff99 2.5px, transparent 3px)" }} />
      </div>
      {/* Glassmorphism overlay for the whole hero section */}
      <div className="absolute inset-0 z-20 glass-bg">
        <div className="glass-shadow" />
        <div className="glass-reflection" />
        <div className="glass-inner-border" />
      </div>
      {/* Main content */}
      <motion.div
        className="relative z-30 flex flex-col md:flex-row items-center md:items-start w-full max-w-6xl gap-4 sm:gap-6 md:gap-8 py-8 sm:py-10 md:py-12 px-4 sm:px-6"
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
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal mb-2 drop-shadow-lg neon-flicker text-center md:text-left"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 font-semibold min-h-[2.5rem] text-center md:text-left px-2 sm:px-0"
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
              className="group inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-black/40 border border-[#39FF14]/30 text-[#80CBC4] hover:text-[#AEEA00] hover:border-[#AEEA00]/50 hover:bg-black/60 transition-all duration-300 font-mono text-sm backdrop-blur-sm"
              style={{ 
                fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace",
                boxShadow: '0 0 8px rgba(57, 255, 20, 0.1)'
              }}
            >
              <FaFilePdf className="text-base text-[#FF6B6B] group-hover:text-[#FF8E8E] transition-colors" />
              <span className="group-hover:underline">resume.pdf</span>
              <FaFileDownload className="text-xs opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>
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
        .glass-bg {
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0.13) 92%, rgba(174,234,0,0.07) 100%);
          border: 1.5px solid rgba(255,255,255,0.18);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 8px 0 rgba(174,234,0,0.05) inset;
          backdrop-filter: blur(8px) saturate(1.08);
          -webkit-backdrop-filter: blur(8px) saturate(1.08);
          border-radius: 24px;
          opacity: 0.75;
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .glass-bg:before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          pointer-events: none;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.13) 98%, rgba(255,255,255,0.18) 100%);
          opacity: 0.6;
          z-index: 1;
        }
        /* Top-left highlight */
        .glass-bg:after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 60%; height: 40%;
          border-radius: 32px 120px 80px 0;
          background: linear-gradient(120deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 100%);
          filter: blur(2px);
          opacity: 0.55;
          z-index: 2;
          pointer-events: none;
        }
        /* Bottom-right shadow for depth */
        .glass-bg .glass-shadow {
          content: '';
          position: absolute;
          right: 0; bottom: 0;
          width: 60%; height: 40%;
          border-radius: 0 0 32px 120px;
          background: linear-gradient(120deg, rgba(31,38,135,0.13) 0%, rgba(174,234,0,0.04) 100%);
          filter: blur(4px);
          opacity: 0.5;
          z-index: 2;
          pointer-events: none;
        }
        /* Curved reflection highlight */
        .glass-bg .glass-reflection {
          content: '';
          position: absolute;
          left: 18%; top: 12%;
          width: 38%; height: 18%;
          border-radius: 60% 80% 60% 80%/80% 60% 80% 60%;
          background: linear-gradient(120deg, rgba(255,255,255,0.33) 0%, rgba(255,255,255,0.01) 100%);
          transform: rotate(-8deg);
          opacity: 0.45;
          z-index: 3;
          pointer-events: none;
        }
        /* Inner border for thickness */
        .glass-bg .glass-inner-border {
          content: '';
          position: absolute;
          inset: 8px;
          border-radius: 18px;
          border: 1.5px solid rgba(255,255,255,0.18);
          opacity: 0.7;
          z-index: 4;
          pointer-events: none;
        }
        /* Premium glass avatar border */
        .glass-avatar-border {
          border-radius: 1.5rem;
          box-shadow:
            0 0 0 4px rgba(255,255,255,0.10) inset,
            0 0 0 10px rgba(174,234,0,0.10) inset,
            0 4px 32px 0 rgba(31, 38, 135, 0.13),
            0 1.5px 8px 0 rgba(174,234,0,0.08) inset;
          background:
            linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(174,234,0,0.07) 100%),
            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 80%);
          border: 2.5px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(10px) saturate(1.2);
          -webkit-backdrop-filter: blur(10px) saturate(1.2);
          opacity: 0.98;
          width: 100%;
          height: 100%;
        }
        .glass-avatar-reflection {
          border-radius: 1.5rem;
          background: linear-gradient(120deg, rgba(255,255,255,0.33) 10%, rgba(255,255,255,0.01) 80%);
          opacity: 0.25;
          width: 100%;
          height: 100%;
          mask-image: linear-gradient(120deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%);
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

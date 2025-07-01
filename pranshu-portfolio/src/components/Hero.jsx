// src/components/Hero.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaLinkedin,
  FaMedium,
  FaGithub,
  FaYoutube,
  FaShareAlt,
  FaEthereum,
  FaBitcoin,
  FaLink,
} from "react-icons/fa";

// Social icon with blockchain glassy style and tooltip
function GlassSocial({ href, label, children, color }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative"
    >
      <span className="relative flex items-center justify-center w-12 h-12 mx-1 rounded-xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur border border-white/20 shadow-lg hover:scale-110 transition-transform">
        <span className="text-2xl" style={{ color }}>{children}</span>
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 top-14 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity z-20 whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
}

// Blockchain mesh/cubes background
function BlockchainBackground() {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 w-full h-full -z-30 pointer-events-none">
      <g>
        {/* Floating cubes */}
        <rect x="10%" y="12%" width="32" height="32" rx="8" fill="#38A169" opacity="0.10">
          <animate attributeName="y" values="12%;18%;12%" dur="6s" repeatCount="indefinite" />
        </rect>
        <rect x="80%" y="70%" width="40" height="40" rx="10" fill="#805AD5" opacity="0.10">
          <animate attributeName="y" values="70%;60%;70%" dur="7s" repeatCount="indefinite" />
        </rect>
        <rect x="50%" y="8%" width="24" height="24" rx="6" fill="#E53E3E" opacity="0.08">
          <animate attributeName="y" values="8%;16%;8%" dur="8s" repeatCount="indefinite" />
        </rect>
        <rect x="20%" y="80%" width="28" height="28" rx="7" fill="#FBBF24" opacity="0.09">
          <animate attributeName="y" values="80%;70%;80%" dur="9s" repeatCount="indefinite" />
        </rect>
        {/* Subtle mesh lines */}
        <polyline points="0,60 100,80 200,40 300,90 400,60 500,100 600,80 700,120" fill="none" stroke="#fff" strokeOpacity="0.04" strokeWidth="2" />
      </g>
    </svg>
  );
}

export default function Hero() {
  // Short and long bio
  const shortBio =
    "Started my journey in 2018 with the Bitcoin whitepaper. Now building, leading, and growing ecosystems in Web3. Obsessed with tech, empathy, and purpose.";
  const longBio =
    "Started my journey in 2018, not with an airdrop, but with the Bitcoin whitepaper. That one PDF hit differently. Since then, I've worn many hats: software engineer, engineering lead, and now, I help grow ecosystems and forge integrations that matter. Along the way, I've realized one underrated superpower—empathy. It's what builds strong communities, aligns people, and turns contributors into believers. I'm deeply obsessed with tech, psychology, and storytelling—the kind that connects, not just converts. I believe we're not just building products here; we're building purpose. For me, Web3 isn't a hype cycle. It's a mirror—a place to find our truest contribution. Still here. Still building. Long road ahead, but with the right people, it feels just right. Positive vibes only.";
  const [showFullBio, setShowFullBio] = useState(false);
  const [bioVisible, setBioVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBioVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Socials
  const socials = [
    ["https://x.com/pranshurastogii", <FaTwitter />, "X", "#1DA1F2"],
    ["https://www.linkedin.com/in/rastogipranshu/", <FaLinkedin />, "LinkedIn", "#0077B5"],
    ["https://pranshurastogi.medium.com/", <FaMedium />, "Medium", "#02B875"],
    ["https://github.com/pranshurastogi", <FaGithub />, "GitHub", "#333"],
    ["https://www.youtube.com/@pranshurastogi", <FaYoutube />, "YouTube", "#FF0000"],
    ["https://warpcast.com/pranshurastogi", <FaShareAlt />, "Warpcast", "#8B5CF6"],
  ];

  return (
    <section
      className="relative overflow-hidden h-auto md:h-screen"
      style={{ fontFamily: "Inter, Helvetica, Arial, sans-serif" }}
    >
      {/* Blockchain mesh/cubes background */}
      <BlockchainBackground />
      {/* Cover image overlay for depth */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/cover.png"
          alt="Cover Banner"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-60" />
      </motion.div>
      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto flex flex-col items-center md:flex-row md:items-start pt-32 px-6 md:px-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Avatar with blockchain elements */}
        <motion.div
          className="relative w-40 h-40 mb-8 md:mb-0 md:mr-12 flex-shrink-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Static blockchain border */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-green-400 via-indigo-400 to-yellow-400 p-1" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white">
            <Image
              src="/images/pfp.jpg"
              alt="Pranshu Rastogi"
              fill
              className="object-cover"
              sizes="160px"
              priority
            />
            {/* Animated blockchain icons around avatar */}
            <motion.span
              className="absolute -top-4 -left-4 text-green-400 text-2xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, type: 'spring' }}
            >
              <FaEthereum />
            </motion.span>
            <motion.span
              className="absolute -bottom-4 -right-4 text-yellow-400 text-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7, type: 'spring' }}
            >
              <FaBitcoin />
            </motion.span>
            <motion.span
              className="absolute -top-4 right-1/2 text-indigo-400 text-xl"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.7, type: 'spring' }}
            >
              <FaLink />
            </motion.span>
          </div>
        </motion.div>
        {/* Text */}
        <motion.div
          className="max-w-2xl text-center md:text-left text-white flex flex-col"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, type: 'spring' }}
          >
            Pranshu Rastogi
          </motion.h1>
          <motion.h2
            className="text-xl md:text-2xl text-yellow-300 mb-4 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, type: 'spring' }}
          >
            <span className="border-r-2 border-white pr-2">
              Head of Ecosystem &amp; Integrations at Push Chain
            </span>
          </motion.h2>
          {/* Bio with fade/slide animation and Read More */}
          <div className="flex-auto mb-6">
            <motion.p
              className="text-base md:text-lg leading-relaxed whitespace-pre-line bg-white/10 border border-white/10 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={bioVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              {showFullBio ? longBio : shortBio}
            </motion.p>
            {!showFullBio && (
              <button
                className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-indigo-500 text-white font-semibold shadow hover:scale-105 transition"
                onClick={() => setShowFullBio(true)}
              >
                Read More
              </button>
            )}
          </div>
          {/* Socials - glassy blockchain style */}
          <motion.div
            className="flex-shrink-0 flex justify-center md:justify-start space-x-3 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            {socials.map(([url, Icon, label, color], i) => (
              <GlassSocial key={url} href={url} label={label} color={color}>
                {Icon}
              </GlassSocial>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 3.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

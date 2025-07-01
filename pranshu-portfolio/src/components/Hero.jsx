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
} from "react-icons/fa";

// Typewriter effect for roles
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
    <span className="text-gradient font-semibold">{displayed}<span className="blinking-cursor">|</span></span>
  );
}

// Glassy social icon
function GlassSocial({ href, label, children, color }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative"
    >
      <span className="relative flex items-center justify-center w-12 h-12 mx-1 rounded-2xl bg-white/10 backdrop-blur border border-white/20 shadow-lg hover:scale-110 hover:-rotate-3 transition-transform">
        <span className="text-2xl" style={{ color }}>{children}</span>
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 top-14 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity z-20 whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
}

// Animated morphing mesh background with particles
function AnimatedMeshBackground() {
  return (
    <div className="absolute inset-0 w-full h-full -z-30 pointer-events-none overflow-hidden">
      {/* Morphing mesh blob */}
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="1200" height="900" viewBox="0 0 1200 900" fill="none">
        <motion.path
          initial={{
            d: "M 600 200 Q 900 200 900 450 Q 900 700 600 700 Q 300 700 300 450 Q 300 200 600 200 Z"
          }}
          animate={{
            d: [
              "M 600 200 Q 900 200 900 450 Q 900 700 600 700 Q 300 700 300 450 Q 300 200 600 200 Z",
              "M 600 180 Q 950 250 900 450 Q 950 650 600 720 Q 250 650 300 450 Q 250 250 600 180 Z",
              "M 600 200 Q 900 200 900 450 Q 900 700 600 700 Q 300 700 300 450 Q 300 200 600 200 Z"
            ]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          fill="url(#meshGradient)"
          opacity="0.18"
        />
        <defs>
          <radialGradient id="meshGradient" cx="50%" cy="50%" r="80%" gradientTransform="rotate(30)">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#38A169" />
            <stop offset="100%" stopColor="#FBBF24" />
          </radialGradient>
        </defs>
      </svg>
      {/* Animated particles */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(24)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/40 shadow-lg"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)'
            }}
            animate={{
              y: [0, Math.random() * 40 - 20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Orbiting blockchain icons with 3D effect
function OrbitingBlockchainIcons({ hovered }) {
  // Orbit parameters
  const icons = [
    { icon: <FaEthereum />, color: "#8B5CF6", angle: 0 },
    { icon: <FaBitcoin />, color: "#FBBF24", angle: 120 },
    { icon: <FaLink />, color: "#38A169", angle: 240 },
  ];
  return (
    <>
      {icons.map((item, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl drop-shadow-lg pointer-events-none"
          animate={{
            rotate: 360,
            x: [
              0,
              60 * Math.cos((item.angle * Math.PI) / 180),
              0
            ],
            y: [
              0,
              60 * Math.sin((item.angle * Math.PI) / 180),
              0
            ],
            z: [0, hovered ? 24 : 0, 0],
            scale: hovered ? 1.25 : 1
          }}
          transition={{
            duration: hovered ? 2 : 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            color: item.color,
            filter: `drop-shadow(0 0 8px ${item.color}80)`
          }}
        >
          {item.icon}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero() {
  const shortBio =
    "Started my journey in 2018 with the Bitcoin whitepaper. Now building, leading, and growing ecosystems in Web3. Obsessed with tech, empathy, and purpose.";
  const longBio =
    "Started my journey in 2018, not with an airdrop, but with the Bitcoin whitepaper. That one PDF hit differently. Since then, I've worn many hats: software engineer, engineering lead, and now, I help grow ecosystems and forge integrations that matter. Along the way, I've realized one underrated superpower—empathy. It's what builds strong communities, aligns people, and turns contributors into believers. I'm deeply obsessed with tech, psychology, and storytelling—the kind that connects, not just converts. I believe we're not just building products here; we're building purpose. For me, Web3 isn't a hype cycle. It's a mirror—a place to find our truest contribution. Still here. Still building. Long road ahead, but with the right people, it feels just right. Positive vibes only.";
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
    "Web3 Builder & Community Leader",
    "Storyteller. Technologist. Empath."
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] overflow-hidden px-4 md:px-0"
      style={{ fontFamily: "Inter, Helvetica, Arial, sans-serif" }}
    >
      {/* Animated mesh/cubes background and particles */}
      <AnimatedMeshBackground />
      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center md:items-start w-full max-w-6xl gap-12 py-24"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Avatar + orbiting blockchain icons */}
        <motion.div
          className="relative w-48 h-48 md:w-56 md:h-56 mb-8 md:mb-0 flex-shrink-0 group"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ perspective: 800 }}
        >
          {/* Animated glowing, pulsing border */}
          <motion.div
            className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-green-400 via-indigo-400 to-yellow-400 blur-2xl opacity-80"
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
            className="relative w-full h-full rounded-3xl overflow-hidden bg-white/10 backdrop-blur border-2 border-white/20 shadow-xl"
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
            <OrbitingBlockchainIcons hovered={hovered} />
          </motion.div>
        </motion.div>
        {/* Text content */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left text-white"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-2 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, type: 'spring' }}
          >
            Pranshu Rastogi
          </motion.h1>
          <motion.h2
            className="text-lg md:text-2xl mb-4 font-semibold min-h-[2.5rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, type: 'spring' }}
          >
            <Typewriter roles={roles} />
          </motion.h2>
          {/* Bio with fade/slide animation and Read More */}
          <div className="flex-auto mb-6 w-full max-w-xl">
            <motion.p
              className="text-base md:text-lg leading-relaxed whitespace-pre-line bg-white/10 border border-white/10 rounded-2xl px-6 py-4 shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={bioVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              {showFullBio ? longBio : shortBio}
            </motion.p>
            <div className="flex justify-center md:justify-start">
              {!showFullBio && (
                <button
                  className="mt-3 px-5 py-2 rounded-lg bg-gradient-to-r from-green-400 to-indigo-500 text-white font-semibold shadow hover:scale-105 transition"
                  onClick={() => setShowFullBio(true)}
                >
                  Read More
                </button>
              )}
            </div>
          </div>
          {/* Socials - glassy blockchain style */}
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-3 mt-4"
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
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .text-gradient {
          background: linear-gradient(90deg, #8B5CF6, #38A169, #FBBF24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        .blinking-cursor {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to { visibility: hidden; }
        }
      `}</style>
    </section>
  );
}

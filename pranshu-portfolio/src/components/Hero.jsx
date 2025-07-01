// src/components/Hero.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";
import {
  FaTwitter,
  FaLinkedin,
  FaMedium,
  FaGithub,
  FaYoutube,
  FaShareAlt,
} from "react-icons/fa";

export default function Hero() {
  // Typewriter bio
  const fullBio = `Started my journey in 2018, not with an airdrop, but with the Bitcoin whitepaper. That one PDF hit differently.\n\nSince then, I’ve worn many hats: software engineer, engineering lead, and now, I help grow ecosystems and forge integrations that matter. Along the way, I’ve realized one underrated superpower—empathy. It’s what builds strong communities, aligns people, and turns contributors into believers.\n\nI’m deeply obsessed with tech, psychology, and storytelling—the kind that connects, not just converts. I believe we’re not just building products here; we’re building purpose. For me, Web3 isn't a hype cycle. It’s a mirror a place to find our truest contribution.\n\nStill here. Still building. Long road ahead, but with the right people, it feels just right. Positive vibes only.`;
  const [typedBio, setTypedBio] = useState("");
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setTypedBio(fullBio.slice(0, idx));
      idx++;
      if (idx > fullBio.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative overflow-hidden h-auto md:h-screen"
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      {/* Cover */}
      <motion.div
        className="absolute inset-0 -z-30"
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

      {/* Particles */}
      <div className="absolute inset-0 -z-20">
        <ParticlesBackground />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto flex flex-col items-center md:flex-row md:items-start pt-32 px-6 md:px-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Avatar */}
        <motion.div
          className="relative w-40 h-40 mb-8 md:mb-0 md:mr-12 flex-shrink-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 p-1 animate-spin-slow" />
          <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
            <Image
              src="/images/pfp.jpg"
              alt="Pranshu Rastogi"
              fill
              className="object-cover"
              sizes="160px"
              priority
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          className="max-w-2xl text-center md:text-left text-white flex flex-col"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            Pranshu Rastogi
          </h1>

          <h2 className="text-xl md:text-2xl text-yellow-300 mb-4 font-semibold">
            <span className="border-r-2 border-white pr-2">
              Head of Ecosystem &amp; Integrations at Push Chain
            </span>
          </h2>

          <div className="flex-auto mb-6">
            <p
              className="text-sm md:text-base leading-relaxed whitespace-pre-line"
            >
              {typedBio}
            </p>
          </div>

          {/* Socials */}
          <motion.div
            className="flex-shrink-0 flex justify-center md:justify-start space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            {[
              ["https://x.com/pranshurastogii", FaTwitter, "X"],
              ["https://www.linkedin.com/in/rastogipranshu/", FaLinkedin, "LinkedIn"],
              ["https://pranshurastogi.medium.com/", FaMedium, "Medium"],
              ["https://github.com/pranshurastogi", FaGithub, "GitHub"],
              ["https://www.youtube.com/@pranshurastogi", FaYoutube, "YouTube"],
              ["https://warpcast.com/pranshurastogi", FaShareAlt, "Warpcast"],
            ].map(([url, Icon, label]) => (
              <Link
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-200 transition-transform transform hover:scale-110"
                aria-label={label}
              >
                <Icon size={28} />
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

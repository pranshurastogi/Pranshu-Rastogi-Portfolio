// src/components/Hero.jsx
"use client";

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
  return (
    <section className="relative overflow-hidden h-screen">
      {/* Cover image */}
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
        <div className="absolute inset-0 bg-black opacity-50" />
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0 -z-20">
        <ParticlesBackground />
      </div>

      {/* Content container: align to top with padding */}
      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-start pt-32 px-10">
        {/* Avatar */}
        <motion.div
          className="relative w-48 h-48 mb-8 md:mb-0 md:mr-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-600 via-orange-400 to-indigo-600 p-[2px] animate-spin-slow" />
          <div className="relative w-full h-full rounded-full bg-white overflow-hidden">
            <Image
              src="/images/pfp.jpg"
              alt="Pranshu Rastogi"
              fill
              className="object-cover"
              sizes="192px"
              priority
            />
          </div>
        </motion.div>

        {/* Text & Socials */}
        <motion.div
          className="max-w-2xl text-center md:text-left text-white drop-shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold mb-2">Pranshu Rastogi</h1>
          <h2 className="text-xl text-orange-300 mb-4">
            Head of Ecosystem &amp; Integrations at Push Chain
          </h2>
          <p className="mb-6">
            I’m passionate about building robust Web3 ecosystems, integrating
            developer tools, and driving adoption through innovative UX and
            open-infrastructure solutions.
          </p>

          <div className="flex justify-center md:justify-start space-x-6">
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
                className="text-white hover:text-orange-200 transition drop-shadow-md"
                aria-label={label}
              >
                <Icon size={24} />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Twitter, Globe } from "lucide-react";

const listVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function GlassmorphismPortfolioBlock({
  name = "Pranshu Rastogi",
  title = "Blockchain Engineer & Web3 Builder",
  bio = "Building privacy-preserving protocols and DeFi infrastructure. Passionate about post-quantum cryptography, stealth payments, and decentralized ecosystems.",
  avatar = "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=640&q=80",
  highlights = [],
  socialLinks = [],
  ctaLabel = "View Projects",
  ctaHref = "#projects",
}) {
  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-[#AEEA00]/20 bg-black/40 p-8 backdrop-blur-2xl md:p-12"
          style={{ boxShadow: "0 0 60px rgba(174, 234, 0, 0.05)" }}
        >
          {/* Glass gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#AEEA00]/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            {/* Left column */}
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#AEEA00]/30 bg-black/60 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-[#AEEA00]/70 backdrop-blur">
                Portfolio Insight
              </span>

              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {name},{" "}
                  <span className="text-[#AEEA00]">{title}</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-xl text-base leading-relaxed text-gray-400"
                >
                  {bio}
                </motion.p>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="grid gap-4">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      whileHover={{ y: -4 }}
                      className="group relative overflow-hidden rounded-2xl border border-[#AEEA00]/20 bg-black/60 p-5 backdrop-blur transition-all hover:border-[#AEEA00]/40 hover:shadow-lg"
                    >
                      <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#AEEA00]/50">
                          {item.title}
                        </p>
                        <p className="text-sm leading-relaxed text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <a
                  href={ctaHref}
                  className="inline-flex items-center gap-2 rounded-full bg-[#AEEA00] px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-black transition-all hover:bg-[#39FF14] hover:shadow-lg hover:shadow-[#AEEA00]/30"
                >
                  {ctaLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>

            {/* Right column - Profile card */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-[#AEEA00]/15 via-transparent to-transparent blur-3xl" />
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-[#AEEA00]/20 bg-black/60 p-8 backdrop-blur-xl">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-6"
                  >
                    <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#AEEA00]/20 blur-2xl" />
                    <img
                      src={avatar}
                      alt={name}
                      className="relative h-28 w-28 rounded-full border-2 border-[#AEEA00]/40 object-cover"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-1"
                  >
                    <h3 className="text-xl font-semibold text-white">{name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#AEEA00]/60">
                      {title}
                    </p>
                  </motion.div>
                </div>

                {/* Social links */}
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="mt-8 flex flex-col gap-3"
                >
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        variants={itemVariants}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-2xl border border-[#AEEA00]/20 bg-black/60 px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-[#AEEA00]/40 hover:bg-black/80 hover:shadow-md"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#AEEA00]/30 bg-[#AEEA00]/10 text-[#AEEA00]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-white">{social.label}</p>
                            <p className="text-xs text-gray-500">{social.handle}</p>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-gray-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#AEEA00]" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

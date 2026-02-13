"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Career", id: "career" },
  { label: "Projects", id: "projects" },
  { label: "Blog", id: "blog" },
  { label: "YouTube", id: "youtube" },
  { label: "Featured", id: "featured" },
];

function scrollToSection(id) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/**
 * Dark-theme pill nav – matches site (#10151a, #AEEA00, #39FF14).
 */
export default function PillNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const pillWidth = useSpring(140, { stiffness: 220, damping: 25, mass: 1 });

  useEffect(() => {
    if (hovering) {
      setExpanded(true);
      pillWidth.set(640);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false);
        pillWidth.set(140);
      }, 600);
    }
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [hovering, pillWidth]);

  const handleSectionClick = (sectionId) => {
    setIsTransitioning(true);
    setActiveSection(sectionId);
    setHovering(false);
    scrollToSection(sectionId);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const activeItem = navItems.find((item) => item.id === activeSection);

  return (
    <motion.nav
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative rounded-full border border-[#39FF14]/40"
      style={{
        width: pillWidth,
        height: "48px",
        background:
          "linear-gradient(180deg, #1a1f26 0%, #151a20 50%, #0f1318 100%)",
        boxShadow: expanded
          ? "0 0 20px rgba(57, 255, 20, 0.15), inset 0 1px 0 rgba(57, 255, 20, 0.1)"
          : "0 0 12px rgba(57, 255, 20, 0.08), inset 0 1px 0 rgba(57, 255, 20, 0.06)",
        overflow: "hidden",
        transition: "box-shadow 0.25s ease-out",
      }}
    >
      {/* Top edge glow */}
      <div
        className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(57, 255, 20, 0.5) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 h-full flex items-center justify-center px-5 font-mono">
        {!expanded && (
          <div className="flex items-center relative">
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.span
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="text-[#AEEA00] font-semibold text-sm tracking-wide whitespace-nowrap"
                  style={{
                    textShadow: "0 0 12px rgba(174, 234, 0, 0.4)",
                  }}
                >
                  {activeItem.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}

        {expanded && (
          <div className="flex items-center justify-evenly w-full gap-0.5">
            {navItems.map((item, index) => {
              const isActive = item.id === activeSection;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  onClick={() => handleSectionClick(item.id)}
                  className={`relative cursor-pointer transition-all duration-200 rounded-lg px-3 py-2 border-none outline-none whitespace-nowrap text-sm font-medium ${
                    isActive
                      ? "text-[#AEEA00]"
                      : "text-[#00ff99]/80 hover:text-[#AEEA00]"
                  }`}
                  style={{
                    background: isActive ? "rgba(57, 255, 20, 0.08)" : "transparent",
                    textShadow: isActive
                      ? "0 0 10px rgba(174, 234, 0, 0.35)"
                      : "none",
                  }}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </motion.nav>
  );
}

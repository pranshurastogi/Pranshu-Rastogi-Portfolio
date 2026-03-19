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

export default function PillNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const pillWidth = useSpring(120, { stiffness: 220, damping: 25, mass: 1 });

  useEffect(() => {
    if (hovering) {
      setExpanded(true);
      pillWidth.set(580);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false);
        pillWidth.set(120);
      }, 600);
    }
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [hovering, pillWidth]);

  const handleClick = (id) => {
    setActiveSection(id);
    setHovering(false);
    scrollToSection(id);
  };

  const activeItem = navItems.find((i) => i.id === activeSection);

  return (
    <motion.nav
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative rounded-full border border-white/[0.08]"
      style={{
        width: pillWidth,
        height: 44,
        background: "linear-gradient(180deg, #18181F 0%, #111116 100%)",
        boxShadow: expanded
          ? "0 0 24px rgba(159,78,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
          : "0 0 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
        overflow: "hidden",
        transition: "box-shadow 0.25s ease-out",
      }}
    >
      {/* Top edge glow */}
      <div
        className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(159,78,255,0.3) 50%, transparent 100%)" }}
      />

      <div className="relative z-10 h-full flex items-center justify-center px-4">
        {!expanded && (
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.span
                key={activeItem.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-[var(--accent-purple)] font-medium text-sm tracking-wide whitespace-nowrap"
              >
                {activeItem.label}
              </motion.span>
            )}
          </AnimatePresence>
        )}

        {expanded && (
          <div className="flex items-center justify-evenly w-full gap-0.5">
            {navItems.map((item, index) => {
              const isActive = item.id === activeSection;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.15 }}
                  onClick={() => handleClick(item.id)}
                  className={`cursor-pointer transition-all duration-200 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? "text-[var(--accent-purple)] bg-[var(--accent-purple-dim)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
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

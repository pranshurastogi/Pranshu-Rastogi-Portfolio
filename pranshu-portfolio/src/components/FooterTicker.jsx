// src/components/FooterTicker.jsx
"use client";

import { useState } from "react";

export default function FooterTicker() {
  const stats = [
    "7+ years of Web3 experience",
    "Head of Ecosystem & Integrations at Push Chain",
    "1,000+ integrations implemented at Push Protocol",
    "Hosted 30+ hackathons globally",
    "Launched the BRB Bootcamp",
    "Mentored 2,500+ students via e-learning platforms",
    "30+ speaking engagements at conferences",
    "20+ published technical articles",
  ];

  // track whether the ticker is hovered
  const [paused, setPaused] = useState(false);

  return (
    <footer
      className="fixed bottom-0 left-0 w-full h-14 flex items-center z-50"
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Subtle blockchain mesh/cubes background */}
      <svg width="100%" height="100%" className="absolute inset-0 w-full h-full pointer-events-none select-none" style={{zIndex: 0}}>
        <g>
          <rect x="10%" y="40%" width="24" height="24" rx="6" fill="#38A169" opacity="0.08" />
          <rect x="80%" y="60%" width="28" height="28" rx="7" fill="#805AD5" opacity="0.08" />
          <rect x="50%" y="20%" width="18" height="18" rx="5" fill="#FBBF24" opacity="0.07" />
          <polyline points="0,30 100,40 200,20 300,45 400,30 500,50 600,40 700,60" fill="none" stroke="#fff" strokeOpacity="0.03" strokeWidth="2" />
        </g>
      </svg>
      <div
        className="relative w-full flex items-center overflow-hidden px-4"
        style={{
          zIndex: 1,
          background: 'linear-gradient(90deg, rgba(56,161,105,0.32) 0%, rgba(128,90,213,0.32) 50%, rgba(251,191,36,0.32) 100%)',
          borderTop: '1px solid rgba(128,90,213,0.22)',
          boxShadow: '0 -2px 16px 0 rgba(0,0,0,0.10)',
          borderRadius: '0 0 16px 16px',
        }}
      >
        <div
          className="marquee space-x-12"
          style={{
            animationDuration: '40s',
            animationPlayState: paused ? 'paused' : 'running',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {stats.map((text, idx) => (
            <span
              key={idx}
              className="text-xs md:text-sm font-semibold text-white px-3 py-1 rounded-lg bg-black/40 shadow border border-white/20 backdrop-blur-sm transition-all duration-200"
              style={{letterSpacing: '0.01em'}}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

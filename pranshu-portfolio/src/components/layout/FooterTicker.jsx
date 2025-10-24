// src/components/FooterTicker.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFilePdf, FaFileDownload } from "react-icons/fa";

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

  const resumeUrl = "/resume.pdf";
  
  // track whether the ticker is hovered
  const [paused, setPaused] = useState(false);

  return (
    <footer
      className="fixed bottom-0 left-0 w-full h-14 flex items-center z-50"
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        background: 'linear-gradient(90deg, #0f2027 0%, #232526 100%)',
        borderTop: '1px solid #39FF14',
        boxShadow: '0 -2px 24px 0 #39FF1499',
        borderRadius: '0 0 16px 16px',
      }}
    >
      {/* Subtle blockchain mesh/cubes background */}
      <svg width="100%" height="100%" className="absolute inset-0 w-full h-full pointer-events-none select-none" style={{zIndex: 0}}>
        <g>
          <rect x="10%" y="40%" width="24" height="24" rx="6" fill="#00ff99" opacity="0.10" />
          <rect x="80%" y="60%" width="28" height="28" rx="7" fill="#39FF14" opacity="0.10" />
          <rect x="50%" y="20%" width="18" height="18" rx="5" fill="#00e0ff" opacity="0.09" />
          <polyline points="0,30 100,40 200,20 300,45 400,30 500,50 600,40 700,60" fill="none" stroke="#AEEA00" strokeOpacity="0.06" strokeWidth="2" />
        </g>
      </svg>
      <div
        className="relative w-full flex items-center justify-between overflow-hidden px-4"
        style={{
          zIndex: 1,
          background: 'linear-gradient(90deg, rgba(0,255,153,0.18) 0%, rgba(57,255,20,0.18) 50%, rgba(0,224,255,0.18) 100%)',
          borderTop: '1px solid #232526',
          boxShadow: '0 -2px 16px 0 #39FF1444',
          borderRadius: '0 0 16px 16px',
        }}
      >
        {/* Resume Link - Fixed Position */}
        <div className="flex-shrink-0 z-10">
          <Link
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 border border-[#39FF14]/40 text-[#80CBC4] hover:text-[#AEEA00] hover:border-[#AEEA00]/60 hover:bg-black/80 transition-all duration-300 font-mono text-xs backdrop-blur-sm"
            style={{ 
              fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace",
              boxShadow: '0 0 8px rgba(57, 255, 20, 0.15)'
            }}
          >
            <FaFilePdf className="text-sm text-[#FF6B6B] group-hover:text-[#FF8E8E] transition-colors" />
            <span className="group-hover:underline">resume.pdf</span>
            <FaFileDownload className="text-xs opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        {/* Scrolling Stats */}
        <div
          className="marquee space-x-12 flex-1"
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
              className="text-xs md:text-sm font-semibold text-[#AEEA00] px-3 py-1 rounded-lg bg-black/60 shadow border border-[#39FF14]/30 backdrop-blur-sm transition-all duration-200"
              style={{letterSpacing: '0.01em', textShadow: '0 0 8px #AEEA00'}}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

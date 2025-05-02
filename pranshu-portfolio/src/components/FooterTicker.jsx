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
    <footer className="
      fixed bottom-0 left-0 w-full
      bg-indigo-900 text-white
      border-t border-indigo-700
      h-12 flex items-center
      overflow-hidden z-50
    ">
      <div
        className="marquee space-x-16 px-4"
        style={{ animationPlayState: paused ? "paused" : "running" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {stats.map((text, idx) => (
          <span key={idx} className="text-sm font-medium">
            {text}
          </span>
        ))}
      </div>
    </footer>
  );
}

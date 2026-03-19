"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Download } from "lucide-react";

export default function FooterTicker() {
  const stats = [
    "7+ years in Web3",
    "Head of Ecosystem & Integrations at Push Chain",
    "1,000+ integrations at Push Protocol",
    "30+ hackathons hosted globally",
    "BRB Bootcamp founder",
    "2,500+ students mentored",
    "30+ speaking engagements",
    "20+ published articles",
  ];

  const [paused, setPaused] = useState(false);

  return (
    <footer className="fixed bottom-0 left-0 w-full h-12 items-center z-50 hidden md:flex bg-[var(--bg-primary)]/95 backdrop-blur-xl border-t border-white/[0.06]">
      {/* Resume */}
      <div className="flex-shrink-0 z-10 pl-4">
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-purple)] transition-all text-xs font-medium"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="font-mono text-xs">resume.pdf</span>
          <Download className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* Scrolling stats */}
      <div
        className="marquee space-x-8 flex-1"
        style={{ animationPlayState: paused ? "paused" : "running" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {stats.map((text, idx) => (
          <span
            key={idx}
            className="text-xs text-[var(--text-muted)] px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.04]"
          >
            {text}
          </span>
        ))}
      </div>
    </footer>
  );
}

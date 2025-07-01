// src/components/Header.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Tweets", href: "/tweets" },
    // { name: "POAPs", href: "/poaps" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 font-mono">
      {/* Terminal/Blockchain Backdrop */}
      <div className="bg-[#181c1f] border-b border-green-500/30 shadow-lg shadow-green-400/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Terminal-style Logo */}
          <Link href="/" className="text-lg md:text-2xl font-bold text-green-400 flex items-center gap-2 select-none">
            <span className="text-amber-400">pranshu</span>
            <span className="text-white">@</span>
            <span className="text-green-400">blockchain</span>
            <span className="text-white">:~$</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative flex items-center gap-1 text-green-300 hover:text-amber-400 transition group text-base tracking-wide"
              >
                <span className="text-amber-400">&gt;</span>
                <span className="group-hover:glow-text">{l.name}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full" style={{transition: 'width 0.3s'}}></span>
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-green-400 hover:text-amber-400 transition"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-[#181c1f] border-t border-green-500/30 animate-fade-in">
            <div className="px-6 py-4 space-y-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg text-green-300 hover:text-amber-400 transition flex items-center gap-2"
                >
                  <span className="text-amber-400">&gt;</span>
                  <span>{l.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        .font-mono {
          font-family: 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
        }
        .glow-text {
          text-shadow: 0 0 8px #fbbf24, 0 0 2px #fbbf24;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease;
        }
      `}</style>
    </header>
  );
}

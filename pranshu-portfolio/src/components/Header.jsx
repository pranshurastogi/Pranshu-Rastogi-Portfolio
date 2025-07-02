// src/components/Header.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Career", href: "#career" },
    { name: "YouTube", href: "#youtube" },
    { name: "Blog", href: "#blog" },
    { name: "Featured", href: "#featured" },
  ];
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 font-mono">
      {/* Terminal/Blockchain Backdrop */}
      <div className="bg-[#181c1f] border-b border-green-500/30 shadow-lg shadow-green-400/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Terminal-style Logo */}
          <Link href="/" className="text-lg md:text-2xl font-bold text-green-400 flex items-center gap-2 select-none">
            {/* Blockchain Icon */}
            <Image src="/globe.svg" alt="blockchain" width={24} height={24} className="inline-block" />
            <span className="text-amber-400">pranshu</span>
            <span className="text-white">@</span>
            <span className="text-green-400">blockchain</span>
            <span className="text-white">:~$</span>
            {/* Blinking Cursor */}
            <span className="ml-1 text-green-400 blink-cursor">_</span>
            {/* Mock Wallet Address */}
            <span className="ml-3 px-2 py-0.5 rounded bg-green-900/40 text-xs text-green-300 border border-green-700 select-all hidden sm:inline-flex items-center gap-1">
              <Image src="/eth.svg" alt="Ethereum" width={16} height={16} className="inline-block" />
              pranshurastogi.eth
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative flex items-center gap-1 text-green-300 hover:text-amber-400 transition group text-base tracking-wide"
                aria-current={pathname === l.href ? "page" : undefined}
              >
                <span className="text-amber-400">&gt;</span>
                <span className="group-hover:glow-text">{l.name}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full" style={{transition: 'width 0.3s'}}></span>
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-green-400 hover:text-amber-400 transition font-mono border border-green-700 px-2 py-1 rounded bg-[#181c1f] shadow-inner shadow-green-400/10"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="tracking-widest">[menu]</span>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-[#181c1f] border-t border-green-500/30 animate-fade-in relative overflow-hidden">
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 scanline-overlay" />
            <div className="px-6 py-4 space-y-4 relative z-20">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg text-green-300 hover:text-amber-400 transition flex items-center gap-2 font-mono"
                  aria-current={pathname === l.href ? "page" : undefined}
                >
                  <span className="text-amber-400">&gt;</span>
                  <span>{l.name}</span>
                </Link>
              ))}
              {/* Mock Wallet Address in Mobile */}
              <div className="mt-6 text-xs text-green-300 bg-green-900/40 border border-green-700 rounded px-2 py-1 select-all flex items-center gap-1">
                <Image src="/eth.svg" alt="Ethereum" width={16} height={16} className="inline-block" />
                pranshurastogi.eth
              </div>
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
        .blink-cursor {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to { visibility: hidden; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease;
        }
        /* CRT Scanline Overlay */
        .scanline-overlay {
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.03) 0px,
            rgba(255,255,255,0.03) 1px,
            transparent 1px,
            transparent 4px
          );
          z-index: 10;
        }
      `}</style>
    </header>
  );
}

// src/components/Header.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import OptimizedImage from "../ui/OptimizedImage";
import CustomLogo from "../ui/CustomLogo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Career", href: "#career" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "YouTube", href: "#youtube" },
    { name: "Featured", href: "#featured" },
  ];
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 font-mono">
      {/* Terminal/Blockchain Backdrop */}
      <div className="bg-[#10151a] border-b border-[#39FF14]/30 shadow-lg shadow-[#39FF14]/10">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Terminal-style Logo */}
          <Link href="/" className="text-sm sm:text-lg md:text-2xl font-bold text-[#AEEA00] flex items-center gap-1 sm:gap-2 select-none flex-shrink-0 min-w-0">
            {/* Custom Logo */}
            <CustomLogo width={20} height={20} className="sm:w-6 sm:h-6 inline-block flex-shrink-0" />
            <span className="text-[#AEEA00] whitespace-nowrap">pranshu</span>
            <span className="text-white hidden xs:inline">@</span>
            <span className="text-[#39FF14] hidden sm:inline">blockchain</span>
            <span className="text-white hidden sm:inline">:~$</span>
            {/* Blinking Cursor */}
            <span className="ml-1 text-[#39FF14] blink-cursor hidden sm:inline">_</span>
            {/* Mock Wallet Address - Show on larger mobile */}
            <span className="ml-2 sm:ml-3 px-1.5 sm:px-2 py-0.5 rounded bg-[#232526] text-[10px] sm:text-xs text-[#00e0ff] border border-[#39FF14] select-all hidden lg:inline-flex items-center gap-1">
              <OptimizedImage src="/eth.svg" alt="Ethereum blockchain network" width={12} height={12} className="sm:w-4 sm:h-4 inline-block" />
              <span className="hidden xl:inline">pranshurastogi.eth</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative flex items-center gap-1 text-[#00ff99] hover:text-[#AEEA00] transition group text-base tracking-wide min-h-[44px] px-2"
                aria-current={pathname === l.href ? "page" : undefined}
              >
                <span className="text-[#39FF14]">&gt;</span>
                <span className="group-hover:glow-text">{l.name}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#AEEA00] transition-all group-hover:w-full" style={{transition: 'width 0.3s'}}></span>
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#AEEA00] hover:text-[#39FF14] transition font-mono border border-[#39FF14] px-3 py-2.5 sm:px-4 sm:py-3 rounded bg-[#10151a] shadow-inner shadow-[#39FF14]/10 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation active:scale-95 flex-shrink-0"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="tracking-widest text-xs sm:text-sm">[menu]</span>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div 
            id="mobile-menu"
            className="md:hidden bg-[#10151a] border-t border-[#39FF14]/30 animate-fade-in relative overflow-hidden"
          >
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 scanline-overlay" />
            <div className="px-6 py-4 space-y-2 relative z-20">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg text-[#00ff99] hover:text-[#AEEA00] transition flex items-center gap-2 font-mono min-h-[44px] py-2 touch-manipulation active:bg-[#39FF14]/10 rounded-lg px-2"
                  aria-current={pathname === l.href ? "page" : undefined}
                >
                  <span className="text-[#39FF14]">&gt;</span>
                  <span>{l.name}</span>
                </Link>
              ))}
              {/* Mock Wallet Address in Mobile */}
              <div className="mt-6 text-xs text-[#00e0ff] bg-[#232526] border border-[#39FF14] rounded px-2 py-1 select-all flex items-center gap-1">
                <OptimizedImage src="/eth.svg" alt="Ethereum blockchain network" width={16} height={16} className="inline-block" />
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

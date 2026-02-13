// src/components/Header.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import OptimizedImage from "../ui/OptimizedImage";
import CustomLogo from "../ui/CustomLogo";
import PillNav from "./PillNav";

const mobileLinks = [
  { name: "Career", href: "#career" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "YouTube", href: "#youtube" },
  { name: "Featured", href: "#featured" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-[9998] font-mono">
      {/* Dark topbar – matches site theme (#10151a, #39FF14, #AEEA00) */}
      <div className="bg-[#10151a] border-b border-[#39FF14]/30 shadow-lg shadow-[#39FF14]/10">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-3 flex items-center justify-between">
          {/* Logo – green terminal style */}
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 select-none flex-shrink-0 min-w-0 overflow-hidden text-[#AEEA00] hover:text-[#39FF14] transition-colors"
          >
            <CustomLogo
              width={20}
              height={20}
              className="sm:w-6 sm:h-6 inline-block flex-shrink-0"
            />
            <span className="text-sm sm:text-lg font-bold">pranshu</span>
            <span className="text-[#39FF14] hidden sm:inline text-sm">@</span>
            <span className="text-[#00ff99] hidden sm:inline text-sm">
              blockchain
            </span>
            <span className="ml-2 sm:ml-3 px-1.5 sm:px-2 py-0.5 rounded bg-[#232526] text-[10px] sm:text-xs text-[#00e0ff] border border-[#39FF14]/50 select-all hidden lg:inline-flex items-center gap-1">
              <OptimizedImage
                src="/eth.svg"
                alt="Ethereum"
                width={12}
                height={12}
                className="sm:w-4 sm:h-4 inline-block"
              />
              <span className="hidden xl:inline">pranshurastogi.eth</span>
            </span>
          </Link>

          {/* Desktop: pill nav (dark theme) */}
          <div className="hidden md:flex items-center">
            <PillNav />
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-[#AEEA00] hover:text-[#39FF14] border border-[#39FF14]/50 px-3 py-2.5 rounded bg-[#10151a] min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation active:scale-95 flex-shrink-0"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile menu – dark theme */}
        {open && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-[#39FF14]/30 bg-[#0d1117] animate-fade-in"
          >
            <div className="px-4 py-4 space-y-0.5">
              {mobileLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-[#00ff99] hover:text-[#AEEA00] py-3 px-4 text-base font-medium transition rounded-lg hover:bg-[#39FF14]/10"
                >
                  <span className="text-[#39FF14]">&gt;</span> {l.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-[#39FF14]/20 flex items-center gap-2 text-xs text-[#00e0ff] px-4">
                <OptimizedImage
                  src="/eth.svg"
                  alt="Ethereum"
                  width={16}
                  height={16}
                />
                pranshurastogi.eth
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

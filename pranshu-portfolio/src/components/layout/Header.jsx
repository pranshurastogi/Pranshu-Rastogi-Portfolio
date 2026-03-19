"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import CustomLogo from "../ui/CustomLogo";
import PillNav from "./PillNav";

const mobileLinks = [
  { name: "Home", href: "#home" },
  { name: "Career", href: "#career" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "YouTube", href: "#youtube" },
  { name: "Featured", href: "#featured" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-[9998]">
      <div className="bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 select-none text-[var(--text-primary)] hover:text-[var(--accent-purple)] transition-colors"
          >
            <CustomLogo width={22} height={22} className="flex-shrink-0" />
            <span className="text-base font-semibold tracking-tight">
              Pranshu Rastogi
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            <PillNav />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/[0.06] bg-[var(--bg-primary)]/95 backdrop-blur-xl animate-fade-in">
            <nav className="px-4 py-3 space-y-0.5">
              {mobileLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 px-3 text-[var(--text-secondary)] hover:text-[var(--accent-purple)] text-sm font-medium transition-colors rounded-lg hover:bg-white/[0.03]"
                >
                  {l.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

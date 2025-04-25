// src/components/Header.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Blog", href: "/blog" },
    { name: "Tweets", href: "/tweets" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Backdrop blur + transparent */}
      <div className="backdrop-blur bg-white/30 dark:bg-black/30 border-b border-white/20 dark:border-black/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white md:text-2xl">
            Pranshu Rastogi
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative text-white hover:text-yellow-300 transition"
              >
                {l.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white/90 dark:bg-black/90 backdrop-blur border-t border-white/20 dark:border-black/20">
            <div className="px-6 py-4 space-y-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg text-white hover:text-yellow-300 transition"
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

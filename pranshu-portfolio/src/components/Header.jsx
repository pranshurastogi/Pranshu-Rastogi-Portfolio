// src/components/Header.jsx
"use client";
import Link from "next/link";

export default function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Blog", href: "/blog" },  // ← updated
  ];

  return (
    <nav className="fixed top-0 w-full bg-base-100 shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Pranshu Rastogi
            </Link>
          </div>
          <div>
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base-content hover:text-primary transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

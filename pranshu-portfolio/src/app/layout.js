// src/app/layout.js
"use client";

import "./globals.css";
import Header from "@/components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FooterTicker from "@/components/FooterTicker";


export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en" data-theme="pranshuTheme">
      <body className="antialiased pt-16">
        {/* Your main header/navigation */}
        <Header />

        {/* Page‐by‐page fade transition */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* Vercel Analytics: collects pageview metrics */}
        <Analytics />

        {/* Vercel Speed Insights: reports LCP, TTFB, CLS, etc. */}
        <SpeedInsights />
        <FooterTicker/>
      </body>
    </html>
  );
}

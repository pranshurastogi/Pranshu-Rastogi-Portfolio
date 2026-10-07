"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "./Header";
import FooterTicker from "./FooterTicker";
import ContactForm from "@/components/forms/ContactForm";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WebVitals from "@/components/analytics/WebVitals";
import PerformanceMonitor from "./PerformanceMonitor";

const ShootingStarsBackground = dynamic(
  () => import("./ShootingStarsBackground"),
  { ssr: false }
);

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  // Becomes true after the first client navigation, so only route changes animate
  const hasNavigated = useRef(false);
  const firstPath = useRef(pathname);
  if (pathname !== firstPath.current) hasNavigated.current = true;

  return (
    <>
      {/* Global animated background — shooting stars + static stars */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[var(--bg-primary)]">
        <ShootingStarsBackground />
      </div>

      <div className="relative z-10">
        <Header />

        {/*
          Enter-only route transition. An exit animation (AnimatePresence mode="wait")
          breaks with the App Router: children swap before the exit runs, and on
          browser Back the outgoing <main> could freeze at opacity 0 — a blank page.
          The first render skips the animation so server HTML is never hidden.
        */}
        <motion.main
          key={pathname}
          initial={hasNavigated.current ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="min-h-screen"
        >
          {children}
        </motion.main>

        <ContactForm />
        <Analytics />
        <SpeedInsights />
        <FooterTicker />
        <WebVitals />
        <PerformanceMonitor />
      </div>
    </>
  );
}

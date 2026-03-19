"use client";

import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <>
      {/* Global animated background — shooting stars + static stars */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[var(--bg-primary)]">
        <ShootingStarsBackground />
      </div>

      <div className="relative z-10">
        <Header />

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

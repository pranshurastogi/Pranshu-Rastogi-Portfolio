"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Header from "./Header";
import FooterTicker from "./FooterTicker";
import ContactForm from "@/components/forms/ContactForm";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WebVitals from "@/components/analytics/WebVitals";
import PerformanceMonitor from "./PerformanceMonitor";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
}

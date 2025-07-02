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
      <head>
        <title>Pranshu Rastogi | Blockchain Engineer, Speaker, Writer</title>
        <meta name="description" content="Pranshu Rastogi's personal portfolio. Blockchain engineer, speaker, writer, and educator. Explore projects, blogs, talks, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pranshu.dev/" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        {/* Open Graph */}
        <meta property="og:title" content="Pranshu Rastogi | Blockchain Engineer, Speaker, Writer" />
        <meta property="og:description" content="Pranshu Rastogi's personal portfolio. Blockchain engineer, speaker, writer, and educator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pranshu.dev/" />
        <meta property="og:image" content="/images/pfp.jpg" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pranshu Rastogi | Blockchain Engineer, Speaker, Writer" />
        <meta name="twitter:description" content="Pranshu Rastogi's personal portfolio. Blockchain engineer, speaker, writer, and educator." />
        <meta name="twitter:image" content="/images/pfp.jpg" />
        <meta name="twitter:site" content="@pranshurastogii" />
        {/* Schema.org Person JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Pranshu Rastogi',
          url: 'https://pranshu.dev/',
          sameAs: [
            'https://twitter.com/pranshurastogii',
            'https://github.com/pranshurastogi',
            'https://linkedin.com/in/pranshurastogi',
            'https://medium.com/@pranshurastogi',
            'https://youtube.com/@pranshurastogi',
          ],
          jobTitle: 'Blockchain Engineer',
          image: 'https://pranshu.dev/images/pfp.jpg',
          description: "Blockchain engineer, speaker, writer, and educator."
        }) }} />
      </head>
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

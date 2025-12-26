// src/app/layout.js
"use client";

import "./globals.css";
import Header from "@/components/layout/Header";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FooterTicker from "@/components/layout/FooterTicker";
import ContactForm from "@/components/forms/ContactForm";
import PerformanceMonitor from "@/components/layout/PerformanceMonitor";
import WebVitals from "@/components/analytics/WebVitals";

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
        <link rel="canonical" href="https://pranshurastogi.com/" />
        {/* Favicon setup with proper fallbacks and cache-busting */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-64.png?v=2" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-64.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <meta name="msapplication-TileColor" content="#39FF14" />
        <meta name="theme-color" content="#39FF14" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/pfp-current.png" as="image" />
        <link rel="preload" href="/images/cover.png" as="image" />
        <link rel="dns-prefetch" href="//img.youtube.com" />
        <link rel="dns-prefetch" href="//cdn-images-1.medium.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://cdn-images-1.medium.com" />
        <link rel="preconnect" href="https://us.i.posthog.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Pranshu Rastogi | Blockchain Engineer, Speaker, Writer" />
        <meta property="og:description" content="Head of Ecosystem & Integrations at Push Chain. Blockchain engineer, speaker, writer, and educator. Explore projects, blogs, talks, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pranshurastogi.com/" />
        <meta property="og:image" content="https://pranshurastogi.com/images/pfp-current.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Pranshu Rastogi - Blockchain Engineer, Speaker, Writer" />
        <meta property="og:site_name" content="Pranshu Rastogi Portfolio" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pranshu Rastogi | Blockchain Engineer, Speaker, Writer" />
        <meta name="twitter:description" content="Head of Ecosystem & Integrations at Push Chain. Blockchain engineer, speaker, writer, and educator." />
        <meta name="twitter:image" content="https://pranshurastogi.com/images/pfp-current.png" />
        <meta name="twitter:image:alt" content="Pranshu Rastogi - Blockchain Engineer, Speaker, Writer" />
        <meta name="twitter:site" content="@pranshurastogii" />
        <meta name="twitter:creator" content="@pranshurastogii" />
        
        {/* Schema.org Person JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Pranshu Rastogi',
          url: 'https://pranshurastogi.com/',
          image: 'https://pranshurastogi.com/images/pfp-current.png',
          jobTitle: 'Head of Ecosystem & Integrations',
          worksFor: {
            '@type': 'Organization',
            name: 'Push Chain',
            url: 'https://push.org'
          },
          sameAs: [
            'https://twitter.com/pranshurastogii',
            'https://github.com/pranshurastogi',
            'https://linkedin.com/in/pranshurastogi',
            'https://medium.com/@pranshurastogi',
            'https://youtube.com/@pranshurastogi',
          ],
          description: "Head of Ecosystem & Integrations at Push Chain. Blockchain engineer, speaker, writer, and educator.",
          knowsAbout: ['Blockchain', 'Web3', 'DeFi', 'Ethereum', 'Smart Contracts', 'Ecosystem Development', 'Push Protocol'],
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Lovely Professional University'
          }
        }) }} />
        
        {/* Website Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Pranshu Rastogi Portfolio',
          url: 'https://pranshurastogi.com',
          description: 'Personal portfolio of Pranshu Rastogi - Blockchain Engineer, Speaker, Writer',
          publisher: {
            '@type': 'Person',
            name: 'Pranshu Rastogi'
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://pranshurastogi.com/search?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          }
        }) }} />
        
        {/* ProfilePage Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: {
            '@type': 'Person',
            name: 'Pranshu Rastogi',
            jobTitle: 'Head of Ecosystem & Integrations',
            worksFor: {
              '@type': 'Organization',
              name: 'Push Chain'
            }
          }
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

        <ContactForm />
        
        {/* Vercel Analytics: collects pageview metrics */}
        <Analytics />

        {/* Vercel Speed Insights: reports LCP, TTFB, CLS, etc. */}
        <SpeedInsights />
        <FooterTicker/>
        
        {/* Web Vitals tracking */}
        <WebVitals />
        
        {/* Performance monitoring (development only) */}
        <PerformanceMonitor />
      </body>
    </html>
  );
}

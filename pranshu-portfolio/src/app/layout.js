import "./globals.css";
import { Poppins, Victor_Mono } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import { GlobalJsonLd } from "@/components/seo/JsonLd";
import { ASSETS, absoluteUrl } from "@/lib/site-assets";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SEO_KEYWORDS,
  SITE_URL,
  SOCIAL,
} from "@/lib/site-seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const victorMono = Victor_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-victor-mono",
});

export const metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Pranshu Rastogi",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.json",
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2", type: "image/x-icon" },
      { url: "/favicon-64.png?v=2", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/favicon-64.png?v=2", sizes: "180x180" }],
    shortcut: "/favicon.ico?v=2",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/`,
    images: [
      {
        url: absoluteUrl(ASSETS.profile.pfp),
        width: 1200,
        height: 630,
        alt: "Pranshu Rastogi — DevRel, Ecosystem & Blockchain Engineer",
      },
    ],
    siteName: "Pranshu Rastogi",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(ASSETS.profile.pfp)],
    site: "@pranshurastogii",
    creator: "@pranshurastogii",
  },
  other: {
    "msapplication-TileColor": "#0A0A0F",
    "ai-content-declaration":
      "This site provides public portfolio information about Pranshu Rastogi for search engines and AI assistants. See /llms.txt and /ai.txt.",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0F" },
    { media: "(prefers-color-scheme: light)", color: "#0A0A0F" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${victorMono.variable}`}>
      <head>
        <link rel="dns-prefetch" href="//img.youtube.com" />
        <link rel="dns-prefetch" href="//cdn-images-1.medium.com" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://cdn-images-1.medium.com" />
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="author" href={`${SITE_URL}/llms.txt`} />
        <link rel="alternate" type="text/plain" href={`${SITE_URL}/ai.txt`} title="AI discovery file" />
        <link rel="dns-prefetch" href="//platform.twitter.com" />
        <link rel="preconnect" href="https://platform.twitter.com" crossOrigin="anonymous" />
        <GlobalJsonLd />
      </head>
      <body className={`${poppins.className} ${victorMono.variable} antialiased pt-16 pb-14`} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

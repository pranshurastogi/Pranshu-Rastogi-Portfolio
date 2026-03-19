import "./globals.css";
import { Poppins, Victor_Mono } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import projectsData from "@/data/projects.json";

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
  title: "Pranshu Rastogi | Blockchain Engineer, Speaker & Web3 Builder",
  description:
    "Head of Ecosystem & Integrations at Push Chain. Blockchain engineer with 7+ years in Web3, speaker at 30+ global conferences, and technical writer. Builder of SPECTER, a post-quantum stealth address protocol for private payments on Ethereum and Sui. Writes about post-quantum cryptography, onchain privacy, and the future of decentralized communication.",
  keywords: [
    "Pranshu Rastogi", "blockchain engineer", "Web3 builder", "Push Chain", "Push Protocol",
    "SPECTER", "post-quantum cryptography", "stealth addresses", "ML-KEM-768", "NIST FIPS 203",
    "onchain privacy", "Ethereum privacy", "quantum-resistant blockchain", "Solidity", "Rust",
    "DeFi", "decentralized identity", "ecosystem development", "blockchain speaker",
    "smart contracts", "privacy protocols", "lattice-based cryptography",
  ],
  metadataBase: new URL("https://pranshurastogi.com"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
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
    title: "Pranshu Rastogi | Blockchain Engineer, Speaker & Web3 Builder",
    description:
      "Head of Ecosystem & Integrations at Push Chain. Building SPECTER, a post-quantum stealth address protocol using ML-KEM-768 for private payments on Ethereum and Sui. Writes about post-quantum cryptography, onchain privacy, and decentralized systems. 7+ years in Web3.",
    type: "website",
    url: "https://pranshurastogi.com/",
    images: [
      {
        url: "https://pranshurastogi.com/images/pfp-current.png",
        width: 1200,
        height: 630,
        alt: "Pranshu Rastogi - Blockchain Engineer & Web3 Builder",
      },
    ],
    siteName: "Pranshu Rastogi",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranshu Rastogi | Blockchain Engineer & Web3 Builder",
    description:
      "Head of Ecosystem & Integrations at Push Chain. Building SPECTER for post-quantum private payments. 7+ years in Web3.",
    images: ["https://pranshurastogi.com/images/pfp-current.png"],
    site: "@pranshurastogii",
    creator: "@pranshurastogii",
  },
  other: {
    "msapplication-TileColor": "#0A0A0F",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0F" },
    { media: "(prefers-color-scheme: light)", color: "#0A0A0F" },
  ],
};

export default function RootLayout({ children }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pranshu Rastogi",
    url: "https://pranshurastogi.com/",
    image: "https://pranshurastogi.com/images/pfp-current.png",
    jobTitle: "Head of Ecosystem & Integrations",
    worksFor: {
      "@type": "Organization",
      name: "Push Chain",
      url: "https://push.org",
    },
    sameAs: [
      "https://twitter.com/pranshurastogii",
      "https://github.com/pranshurastogi",
      "https://linkedin.com/in/pranshurastogi",
      "https://medium.com/@pranshurastogi",
      "https://youtube.com/@pranshurastogi",
    ],
    description:
      "Head of Ecosystem & Integrations at Push Chain. Blockchain engineer, post-quantum cryptography researcher, speaker at 30+ conferences, and technical writer covering onchain privacy, stealth addresses, and decentralized communication. 7+ years in Web3.",
    knowsAbout: [
      "Blockchain", "Web3", "DeFi", "Ethereum", "Smart Contracts",
      "Ecosystem Development", "Push Protocol", "Onchain Privacy", "Post-Quantum Cryptography",
      "ML-KEM-768", "Stealth Addresses", "Lattice-Based Cryptography", "Decentralized Identity",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Lovely Professional University",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pranshu Rastogi",
    url: "https://pranshurastogi.com",
    description: "Personal portfolio of Pranshu Rastogi — Blockchain Engineer, Speaker & Web3 Builder",
    publisher: { "@type": "Person", name: "Pranshu Rastogi" },
  };

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Pranshu Rastogi",
      jobTitle: "Head of Ecosystem & Integrations",
      worksFor: { "@type": "Organization", name: "Push Chain" },
    },
  };

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blockchain Projects by Pranshu Rastogi",
    itemListElement: projectsData.projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.title,
        description: p.description,
        url: p.live,
        applicationCategory: p.category,
      },
    })),
  };

  return (
    <html lang="en" className={`${poppins.variable} ${victorMono.variable}`}>
      <head>
        <link rel="preload" href="/images/pfp-current.png" as="image" />
        <link rel="dns-prefetch" href="//img.youtube.com" />
        <link rel="dns-prefetch" href="//cdn-images-1.medium.com" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://cdn-images-1.medium.com" />
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="author" href="https://pranshurastogi.com/llms.txt" />
        <link rel="dns-prefetch" href="//platform.twitter.com" />
        <link rel="preconnect" href="https://platform.twitter.com" crossOrigin="anonymous" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }} />
      </head>
      <body className={`${poppins.className} ${victorMono.variable} antialiased pt-16 pb-14`} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

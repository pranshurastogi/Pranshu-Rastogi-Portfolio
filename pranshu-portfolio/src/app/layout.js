import "./globals.css";
import { Poppins } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import projectsData from "@/data/projects.json";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Pranshu Rastogi | Blockchain Engineer, Speaker, Writer",
  description:
    "Pranshu Rastogi's personal portfolio. Blockchain engineer, speaker, writer, and educator. Explore projects, blogs, talks, and more.",
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
    title: "Pranshu Rastogi | Blockchain Engineer, Speaker, Writer",
    description:
      "Head of Ecosystem & Integrations at Push Chain. Blockchain engineer, speaker, writer, and educator. Explore projects, blogs, talks, and more.",
    type: "website",
    url: "https://pranshurastogi.com/",
    images: [
      {
        url: "https://pranshurastogi.com/images/pfp-current.png",
        width: 1200,
        height: 630,
        alt: "Pranshu Rastogi - Blockchain Engineer, Speaker, Writer",
      },
    ],
    siteName: "Pranshu Rastogi Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranshu Rastogi | Blockchain Engineer, Speaker, Writer",
    description:
      "Head of Ecosystem & Integrations at Push Chain. Blockchain engineer, speaker, writer, and educator.",
    images: ["https://pranshurastogi.com/images/pfp-current.png"],
    site: "@pranshurastogii",
    creator: "@pranshurastogii",
  },
  other: {
    "msapplication-TileColor": "#39FF14",
  },
};

export const viewport = {
  themeColor: "#39FF14",
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
      "Head of Ecosystem & Integrations at Push Chain. Blockchain engineer, speaker, writer, and educator.",
    knowsAbout: [
      "Blockchain",
      "Web3",
      "DeFi",
      "Ethereum",
      "Smart Contracts",
      "Ecosystem Development",
      "Push Protocol",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Lovely Professional University",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pranshu Rastogi Portfolio",
    url: "https://pranshurastogi.com",
    description:
      "Personal portfolio of Pranshu Rastogi - Blockchain Engineer, Speaker, Writer",
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
    name: "Projects by Pranshu Rastogi",
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
    <html lang="en" data-theme="pranshuTheme" className={poppins.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/images/pfp-current.png" as="image" />
        <link rel="preload" href="/images/cover.png" as="image" />
        <link rel="dns-prefetch" href="//img.youtube.com" />
        <link rel="dns-prefetch" href="//cdn-images-1.medium.com" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://cdn-images-1.medium.com" />
        <link rel="preconnect" href="https://us.i.posthog.com" />

        {/* Schema.org Person JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* ProfilePage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
        />
        {/* Projects ItemList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
        />
      </head>
      <body
        className={`${poppins.className} antialiased pt-16 pb-14`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

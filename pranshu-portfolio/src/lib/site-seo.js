import projectsData from "@/data/projects.json";
import { ASSETS, SITE_ORIGIN, absoluteUrl } from "@/lib/site-assets";

export const SITE_NAME = "Pranshu Rastogi";
export const SITE_URL = SITE_ORIGIN;

export const SOCIAL = {
  twitter: "https://x.com/pranshurastogii",
  linkedin: "https://www.linkedin.com/in/rastogipranshu/",
  github: "https://github.com/pranshurastogi",
  medium: "https://pranshurastogi.medium.com/",
  youtube: "https://www.youtube.com/@pranshurastogi",
  email: "pranshurastogi.eth@gmail.com",
};

/** Roles recruiters and AI agents should associate with this profile */
export const HIRING_ROLES = [
  "Developer Relations (DevRel)",
  "Ecosystem Lead",
  "Ecosystem & Integrations",
  "Backend Engineer",
  "Blockchain Engineer",
  "Web3 Engineer",
  "Technical Community Lead",
  "Protocol Engineer",
];

export const SEO_KEYWORDS = [
  "Pranshu Rastogi",
  "hire blockchain engineer",
  "hire DevRel",
  "hire developer relations",
  "hire ecosystem lead",
  "hire backend engineer Web3",
  "blockchain developer portfolio",
  "Web3 ecosystem builder",
  "Push Chain",
  "Push Protocol",
  "SPECTER",
  "VANTA",
  "post-quantum cryptography",
  "stealth addresses",
  "Solidity developer",
  "Rust blockchain",
  "smart contracts",
  "DeFi engineer",
  "technical speaker Web3",
  "ecosystem integrations",
  "developer adoption",
  "protocol engineering",
  "onchain privacy",
  "AI agent security blockchain",
  "TuckBack",
  "TuckBack app",
  "AI reminder app iPhone",
  "on-device AI app",
  "Apple Foundation Models",
  "Apple Intelligence developer",
  "Swift SwiftUI developer",
  "local-first app",
  "TheRawByte",
  "RWA research",
  "tokenized real-world assets",
  "onchain private credit",
  "Dune dashboards",
  "GEO AI search optimization",
  "Web3 founder",
];

export const DEFAULT_TITLE =
  "Pranshu Rastogi | DevRel, Ecosystem & Blockchain Engineer — Web3 Builder";

export const DEFAULT_DESCRIPTION =
  "Hire Pranshu Rastogi for DevRel, ecosystem, backend, or blockchain engineering. Head of Ecosystem & Integrations at Push Chain with 7+ years in Web3, 30+ global talks, and 1,000+ protocol integrations. Founder of SPECTER (post-quantum privacy), TuckBack (on-device AI reminders for iPhone) and TheRawByte (RWA research studio). Open to full-time roles and consulting.";

export const SHORT_TAGLINE =
  "DevRel · Ecosystem · Backend · Blockchain — 7+ years building and scaling Web3";

export const PERSON_DESCRIPTION =
  "Pranshu Rastogi is Head of Ecosystem & Integrations at Push Chain, a blockchain engineer with 7+ years in Web3, a DevRel-oriented technical speaker (30+ conferences), and founder of SPECTER (post-quantum privacy), TuckBack (on-device AI iOS app) and TheRawByte (RWA research studio). Experienced in backend systems, smart contracts, on-device AI, protocol integrations, and ecosystem growth.";

export const KNOWS_ABOUT = [
  "Developer Relations",
  "Ecosystem Development",
  "Backend Engineering",
  "Blockchain Engineering",
  "Web3",
  "Ethereum",
  "Solidity",
  "Rust",
  "Smart Contracts",
  "DeFi",
  "Push Protocol",
  "Protocol Integrations",
  "Technical Writing",
  "On-device AI",
  "Apple Foundation Models",
  "Swift",
  "SwiftUI",
  "iOS Development",
  "Real-World Assets (RWA)",
  "Tokenized Private Credit",
  "Onchain Data Analytics",
  "Community Building",
  "Post-Quantum Cryptography",
  "Stealth Addresses",
  "Onchain Privacy",
  "Decentralized Identity",
  "AI Agent Security",
];

export function projectSlug(title) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export function projectUrl(title) {
  return `${SITE_URL}/projects/${projectSlug(title)}`;
}

export const isVideoSrc = (src) => /\.(mov|mp4|webm)$/i.test(src || "");
const isStillSrc = (src) => !/\.(gif|mov|mp4|webm)$/i.test(src || "");

/** First still image path for a project (skips GIFs/videos) — posters, thumbnails, related cards */
export function projectStillSrc(project) {
  return project.images.find(isStillSrc) || project.images[0];
}

/** Absolute URL of the first still image — used for OG cards, JSON-LD and sitemaps */
export function projectStillImage(project) {
  const src = projectStillSrc(project);
  return src?.startsWith("http") ? src : absoluteUrl(src);
}

/** Every outbound link for a project (quick links + grouped resources), deduplicated */
export function projectLinks(project) {
  const urls = [
    project.live,
    project.github,
    project.docs,
    project.showcase,
    project.beta,
    project.social?.x,
    project.npm && `https://www.npmjs.com/package/${project.npm}`,
    ...(project.resources || []).flatMap((g) => g.items.map((i) => i.url)),
  ].filter((u) => u?.startsWith("http"));
  return [...new Set(urls)];
}

/** Detailed SoftwareApplication schema for a single project page */
export function buildProjectSchema(project) {
  const sameAs = projectLinks(project).filter((u) => u !== project.live);
  if (project.schemaType === "Organization") {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${projectUrl(project.title)}#organization`,
      name: project.title,
      slogan: project.tagline,
      description: project.description,
      url: project.live || projectUrl(project.title),
      mainEntityOfPage: projectUrl(project.title),
      image: projectStillImage(project),
      knowsAbout: project.technologies,
      sameAs,
      founder: { "@id": `${SITE_URL}/#person` },
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${projectUrl(project.title)}#software`,
    name: project.title,
    alternateName: project.tagline,
    description: project.description,
    url: project.live || projectUrl(project.title),
    mainEntityOfPage: projectUrl(project.title),
    image: projectStillImage(project),
    applicationCategory: project.applicationCategory || project.category,
    operatingSystem: project.operatingSystem || "Web",
    keywords: project.technologies.join(", "),
    featureList: project.features,
    sameAs,
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@type": "Person", name: SITE_NAME, url: `${SITE_URL}/` },
    ...(project.offers && { offers: { "@type": "Offer", ...project.offers } }),
    award: [
      ...(project.awards || []).map((a) => `${a.label} — ${a.prize}`),
      ...(project.programs || []).map((p) => `Selected for ${p.label}`),
    ],
  };
}

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_NAME,
    givenName: "Pranshu",
    familyName: "Rastogi",
    url: `${SITE_URL}/`,
    image: absoluteUrl(ASSETS.profile.pfp),
    email: SOCIAL.email,
    jobTitle: "Head of Ecosystem & Integrations",
    description: PERSON_DESCRIPTION,
    worksFor: {
      "@type": "Organization",
      name: "Push Chain",
      url: "https://push.org",
    },
    hasOccupation: HIRING_ROLES.map((role) => ({
      "@type": "Occupation",
      name: role,
      occupationLocation: { "@type": "Place", name: "Remote / Global" },
    })),
    knowsAbout: KNOWS_ABOUT,
    sameAs: Object.values(SOCIAL).filter((u) => !u.includes("@")),
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Lovely Professional University",
    },
    award: [
      "ETHCC[9] — 3rd Prize Stage Pitch (SPECTER)",
      "Founder School Cohort 2 (SPECTER)",
      "Cited on Ethereum.org (TheRawByte research)",
      "30+ Web3 conference speaking engagements",
      "1,000+ Push Protocol integrations led",
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: `${SITE_NAME} — Portfolio`,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
    about: { "@id": `${SITE_URL}/#person` },
  };
}

export function buildProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: `${SITE_URL}/`,
    name: `${SITE_NAME} — DevRel, Ecosystem & Blockchain Portfolio`,
    description: DEFAULT_DESCRIPTION,
    mainEntity: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function buildProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#hire`,
    name: `${SITE_NAME} — Blockchain & Ecosystem Engineering`,
    url: SITE_URL,
    description:
      "Available for DevRel, ecosystem, backend, and blockchain engineering roles. Protocol integrations, developer adoption, smart contracts, and technical community leadership.",
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: "Worldwide",
    serviceType: HIRING_ROLES,
    knowsAbout: KNOWS_ABOUT,
  };
}

export function buildFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Pranshu Rastogi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pranshu Rastogi is Head of Ecosystem & Integrations at Push Chain, a blockchain engineer with 7+ years in Web3, technical speaker at 30+ conferences, and builder of SPECTER and VANTA.",
        },
      },
      {
        "@type": "Question",
        name: "Is Pranshu Rastogi available for DevRel roles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pranshu has deep DevRel experience: technical talks, hackathon hosting, developer onboarding, ecosystem partnerships, and technical writing. Contact via LinkedIn or email on pranshurastogi.com.",
        },
      },
      {
        "@type": "Question",
        name: "Is Pranshu Rastogi available for ecosystem or integrations roles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. He currently leads ecosystem and integrations at Push Chain, having scaled 1,000+ protocol integrations and strategic partnerships across Web3.",
        },
      },
      {
        "@type": "Question",
        name: "Is Pranshu Rastogi available for backend or blockchain engineering roles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Background includes backend architecture, production smart contracts (Solidity), Rust protocol work, Substrate/DID systems, and shipping products like SPECTER, TuckBack, VANTA, AlphIQ, and EYI.",
        },
      },
      {
        "@type": "Question",
        name: "What has Pranshu Rastogi built?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SPECTER, a post-quantum stealth address protocol for Ethereum and Sui (ETHCC[9] 3rd prize, Founder School Cohort 2); TuckBack, a private, local-first AI reminder app for iPhone built with Swift 6 and Apple Foundation Models; and TheRawByte, a research studio for tokenized real-world assets with a live Private Credit Map. Also VANTA, AlphIQ, EYI and more.",
        },
      },
      {
        "@type": "Question",
        name: "How do I hire or contact Pranshu Rastogi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Visit https://pranshurastogi.com, download the resume PDF, or reach out on LinkedIn (linkedin.com/in/rastogipranshu), X (@pranshurastogii), or email pranshurastogi.eth@gmail.com.",
        },
      },
    ],
  };
}

export function buildProjectsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blockchain Projects by Pranshu Rastogi",
    itemListElement: projectsData.projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": p.schemaType || "SoftwareApplication",
        name: p.title,
        description: p.description,
        url: projectUrl(p.title),
        image: projectStillImage(p),
        ...(p.live && { sameAs: p.live }),
        ...(p.schemaType === "Organization"
          ? { founder: { "@id": `${SITE_URL}/#person` } }
          : {
              applicationCategory: p.applicationCategory || p.category,
              author: { "@id": `${SITE_URL}/#person` },
            }),
      },
    })),
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Serialize JSON-LD safely: escaping "<" prevents a value from closing the <script> tag */
export function jsonLdScript(data) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

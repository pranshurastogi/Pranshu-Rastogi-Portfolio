import PoapGallery from "@/components/blockchain/PoapGallery";
import { ASSETS, absoluteUrl } from "@/lib/site-assets";
import { SITE_URL } from "@/lib/site-seo";

const ADDRESS = "0xcB034160f7B45E41E6015ECEA09F31A66C144422";

export const metadata = {
  title: "POAPs — Blockchain Event Attendance",
  description:
    "POAP collection of Pranshu Rastogi from 30+ Web3 conferences, hackathons, and ecosystem events. Proof of DevRel and ecosystem presence across global blockchain communities.",
  alternates: { canonical: `${SITE_URL}/poaps` },
  openGraph: {
    title: "POAPs | Pranshu Rastogi",
    description:
      "Blockchain event POAPs collected by Pranshu Rastogi — DevRel, ecosystem, and conference participation across Web3.",
    url: `${SITE_URL}/poaps`,
    images: [{ url: absoluteUrl(ASSETS.profile.pfp), alt: "Pranshu Rastogi POAPs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "POAPs | Pranshu Rastogi",
    description:
      "Onchain proof of 30+ Web3 conferences, hackathons, and ecosystem programs attended by Pranshu Rastogi.",
    images: [absoluteUrl(ASSETS.profile.pfp)],
  },
};

export default function PoapsPage() {
  return (
    <section className="min-h-screen pt-16 bg-base-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold text-center mb-3 text-primary">
          All My POAPs
        </h1>
        <p className="text-center text-[var(--text-muted)] text-sm max-w-lg mx-auto mb-8">
          Onchain proof of 30+ Web3 events — conferences, hackathons, and ecosystem programs.
        </p>
        <PoapGallery address={ADDRESS} />
      </div>
    </section>
  );
}

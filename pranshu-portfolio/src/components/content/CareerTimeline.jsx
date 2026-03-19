"use client";

import { motion } from "framer-motion";
import { Briefcase, Code2, Network, Rocket } from "lucide-react";
import dynamic from "next/dynamic";

const RadialOrbitalTimeline = dynamic(
  () => import("../ui/radial-orbital-timeline"),
  { ssr: false }
);

const careerData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Terse Software",
    date: "Apr 2019 – Jul 2020",
    content:
      "Architected foundational backend systems and wrote my first production smart contracts. This was where the blockchain rabbit hole truly began.",
    category: "Engineering",
    icon: Code2,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Dhiway",
    date: "Aug 2020 – Sep 2021",
    content:
      "Shipped decentralized identity solutions on Substrate chains. Went deep into DID protocols, verifiable credentials, and the identity layer of Web3.",
    category: "Blockchain",
    icon: Briefcase,
    relatedIds: [1, 3],
    status: "completed",
    energy: 100,
  },
  {
    id: 3,
    title: "VP of Engineering",
    company: "Push Protocol",
    date: "Nov 2021 – May 2023",
    content:
      "Led the engineering org building Web3's communication infrastructure. Scaled the protocol to 1,000+ integrations and shipped the core notification system from zero to production.",
    category: "Leadership",
    icon: Network,
    relatedIds: [2, 4],
    status: "completed",
    energy: 100,
  },
  {
    id: 4,
    title: "Head of Ecosystem",
    company: "Push Chain",
    date: "Apr 2023 – Present",
    content:
      "Steering ecosystem growth, forging strategic partnerships, and accelerating developer adoption across chains. Currently shaping the next chapter of decentralized communication.",
    category: "Ecosystem",
    icon: Rocket,
    relatedIds: [3],
    status: "in-progress",
    energy: 90,
  },
];

export default function CareerTimeline() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Career Journey
          </h2>
          <div className="section-divider mb-4" />
          <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
            From writing my first smart contract to leading ecosystem growth across chains. Click a node to explore.
          </p>
        </motion.div>

        <RadialOrbitalTimeline timelineData={careerData} />
      </div>
    </div>
  );
}

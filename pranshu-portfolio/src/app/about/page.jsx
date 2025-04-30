// src/app/about/page.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fullBio = `Started my journey in 2018, not with an airdrop, but with the Bitcoin whitepaper. That one PDF hit differently.

Since then, I’ve worn many hats: software engineer, engineering lead, and now, I help grow ecosystems and forge integrations that matter. Along the way, I’ve realized one underrated superpower—empathy. It’s what builds strong communities, aligns people, and turns contributors into believers.

I’m deeply obsessed with tech, psychology, and storytelling—the kind that connects, not just converts. I believe we’re not just building products here; we’re building purpose. For me, Web3 isn't a hype cycle. It’s a mirror—a place to find our truest contribution.

Still here. Still building. Long road ahead, but with the right people, it feels just right. Positive vibes only.`;

const skills = [
  "Community Building",
  "Technical Writing",
  "Developer Advocacy",
  "Event Management",
  "SDK Integration",
  "Feedback Analysis",
  "Web3 Standards",
  "API Design",
  "Content Creation",
  "Metrics & Analytics",
];

// Reusable morphing‐blob animation settings
const morphTransition = {
  duration: 12,
  ease: "easeInOut",
  repeat: Infinity,
};

const blobKeyframes = [
  "40% 60% 30% 70% / 60% 30% 70% 40%",
  "30% 70% 60% 40% / 50% 60% 30% 70%",
  "60% 40% 50% 50% / 40% 60% 50% 50%",
  "40% 60% 50% 50% / 60% 30% 70% 40%",
];

export default function AboutPage() {
  return (
    <main className="pt-16 bg-base-100 min-h-screen">
      {/* Hero Section (reuse your existing code) */}
      <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
        <div className="w-40 h-40 mb-8 md:mb-0 md:mr-12 flex-shrink-0">
          <Image
            src="/images/pfp.jpg"
            alt="Pranshu Rastogi"
            width={160}
            height={160}
            className="rounded-full border-4 border-primary shadow-lg"
          />
        </div>
        <div className="max-w-2xl text-gray-800">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="whitespace-pre-line leading-relaxed text-lg">
            {fullBio}
          </p>
        </div>
      </section>

      {/* Skills Blobs */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">
          What I Offer
        </h2>
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              className="relative px-6 py-3 text-white shadow-lg"
              style={{ backgroundColor: "#3f51b5" }}
              animate={{ borderRadius: blobKeyframes }}
              transition={{ 
                ...morphTransition, 
                duration: 8, 
                delay: idx * 0.2 
              }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

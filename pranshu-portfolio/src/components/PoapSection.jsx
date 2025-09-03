// src/components/PoapSection.jsx
"use client";

import Link from "next/link";
import PoapGallery from "./PoapGallery";

const ADDRESS = "0xcB034160f7B45E41E6015ECEA09F31A66C144422";

export default function PoapSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 rounded-2xl bg-[#181a20] border-2 border-[#2d3748] shadow-lg overflow-hidden my-8" id="poaps">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-8 text-primary">
          My POAPs
        </h3>
        {/* Show first 6 */}
        <PoapGallery address={ADDRESS} limit={6} />
        {/* Link to full gallery */}
        <div className="flex justify-center mt-8">
          <Link
            href="/poaps"
            className="btn btn-outline btn-primary"
          >
            View All POAPs
          </Link>
        </div>
      </div>
    </section>
  );
}

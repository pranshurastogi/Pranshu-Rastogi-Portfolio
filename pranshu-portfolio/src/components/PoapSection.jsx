// src/components/PoapSection.jsx
"use client";

import Link from "next/link";
import PoapGallery from "./PoapGallery";
import SectionWrapper from './SectionWrapper';

const ADDRESS = "0xcB034160f7B45E41E6015ECEA09F31A66C144422";

export default function PoapSection() {
  return (
    <SectionWrapper>
      <section id="poaps" className="py-16 bg-base-100">
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
    </SectionWrapper>
  );
}

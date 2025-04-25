"use client";

import { useState } from "react";
import Image from "next/image";

const speakers = [
  { src: "/images/pfp.jpg", name: "Alice Johnson" },
  { src: "/images/pfp.jpg", name: "Bob Smith" },
  { src: "/images/pfp.jpg", name: "David Kim" },
  { src: "/images/speaker5.jpg", name: "Eva Patel" },
  { src: "/images/speaker6.jpg", name: "Frank Zhao" },
  { src: "/images/speaker7.jpg", name: "Grace Chen" },
  { src: "/images/speaker8.jpg", name: "Henry O'Neill" },
  { src: "/images/speaker9.jpg", name: "Isabel Cruz" },
  { src: "/images/speaker10.jpg", name: "Jack Rivera" },
  // …up to speaker15.jpg
];

export default function SpeakerGallery() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? speakers : speakers.slice(0, 5);

  return (
    <section id="speakers" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-8 text-primary">
          Speakers &amp; Mentors
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visible.map((spk, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden shadow-lg"
            >
              {/* Image */}
              <div className="w-full h-64 relative">
                <Image
                  src={spk.src}
                  alt={spk.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>

              {/* Blurred footer overlay */}
              <div
                className="absolute left-2 right-2 bottom-4 p-2 bg-white/30 backdrop-blur-sm rounded-lg text-center"
              >
                <p className="text-base-content font-medium">{spk.name}</p>
              </div>
            </div>
          ))}
        </div>

        {speakers.length > 5 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-outline btn-primary"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

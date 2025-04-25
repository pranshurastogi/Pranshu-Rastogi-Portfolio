// src/components/SpeakerGallery.jsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const speakers = [
  { src: "/images/pfp.jpg", name: "Alice Johnson" },
  { src: "/images/pfp.jpg", name: "Bob Smith" },
  { src: "/images/pfp.jpg", name: "Carol Lee" },
  { src: "/images/pfp.jpg", name: "David Kim" },
  { src: "/images/pfp.jpg", name: "Eva Patel" },
  { src: "/images/speaker6.jpg", name: "Frank Zhao" },
  { src: "/images/speaker7.jpg", name: "Grace Chen" },
  { src: "/images/speaker8.jpg", name: "Henry O'Neill" },
  { src: "/images/speaker9.jpg", name: "Isabel Cruz" },
  { src: "/images/speaker10.jpg", name: "Jack Rivera" },
  // …up to speaker15.jpg
];

export default function SpeakerGallery() {
  const containerRef = useRef(null);

  const scrollPrev = () => {
    const c = containerRef.current;
    if (c) {
      c.scrollBy({ left: -c.clientWidth, behavior: "smooth" });
    }
  };
  const scrollNext = () => {
    const c = containerRef.current;
    if (c) {
      c.scrollBy({ left: c.clientWidth, behavior: "smooth" });
    }
  };

  return (
    <section id="speakers" className="py-16 bg-base-100 relative">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-8 text-primary">
          Speakers &amp; Mentors
        </h3>

        <div className="relative">
          {/* Prev button */}
          <button
            onClick={scrollPrev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-20"
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Scroll container */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory space-x-6 px-8 py-4 scroll-smooth"
          >
            {speakers.map((spk, i) => (
              <div
                key={i}
                className="flex-none w-64 snap-start rounded-lg overflow-hidden shadow-lg relative"
              >
                {/* Image */}
                <div className="w-full h-64 relative">
                  <Image
                    src={spk.src}
                    alt={spk.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 16rem"
                    className="object-cover"
                  />
                </div>
                {/* Blurred footer overlay */}
                <div className="absolute left-2 right-2 bottom-4 p-2 bg-white/30 backdrop-blur-sm rounded-lg text-center">
                  <p className="text-base-content font-medium">{spk.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={scrollNext}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-20"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

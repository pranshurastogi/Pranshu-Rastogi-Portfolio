// src/components/SpeakerGallery.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const speakers = [
  { src: "/images/pg-coindcx.png", name: "Namaste Web3, CoinDCX X Forbes" },
  { src: "/images/pg-polygon-guild.png", name: "Polygon Guild, Blr" },
  { src: "/images/pg-google.png", name: "Google Cloud Web3 Conclave" },
  { src: "/images/pg-vietnam.png", name: "BUIDL ASIA, Vietnam" },
  // …add more as needed
];

export default function SpeakerGallery() {
  const containerRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [selected, setSelected] = useState(null);

  // Auto‐scroll every 3s, pause on hover
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const interval = setInterval(() => {
      if (!hovering) {
        c.scrollBy({ left: c.clientWidth / 2, behavior: "smooth" });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [hovering]);

  const scrollPrev = () => {
    const c = containerRef.current;
    if (c) c.scrollBy({ left: -c.clientWidth / 2, behavior: "smooth" });
  };
  const scrollNext = () => {
    const c = containerRef.current;
    if (c) c.scrollBy({ left: c.clientWidth / 2, behavior: "smooth" });
  };

  return (
    <section
      id="speakers"
      className="py-16 bg-base-100 relative"
    >
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
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="flex overflow-x-auto snap-x snap-mandatory space-x-6 px-8 py-4 scroll-smooth"
          >
            {speakers.map((spk, i) => (
              <motion.div
                key={i}
                className="flex-none w-64 snap-start rounded-lg overflow-hidden shadow-lg relative cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelected(spk)}
              >
                <div className="w-full h-64 relative">
                  <Image
                    src={spk.src}
                    alt={spk.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 16rem"
                    className="object-cover"
                  />
                </div>
                <div className="absolute left-2 right-2 bottom-4 p-2 bg-white/30 backdrop-blur-sm rounded-lg text-center">
                  <p className="text-base-content font-medium">
                    {spk.name}
                  </p>
                </div>
              </motion.div>
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

      {/* Modal popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-lg w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-80">
                <Image
                  src={selected.src}
                  alt={selected.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 600px"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold mb-2">{selected.name}</h4>
                <button
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

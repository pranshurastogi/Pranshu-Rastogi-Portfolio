// src/components/SpeakerGallery.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaEthereum, FaCube } from "react-icons/fa";
import { motion, AnimatePresence, useMotionValue, useTransform, useInView } from "framer-motion";

const speakers = [
  { src: "/images/pg-bangkok.JPG", name: "ETHGlobal Bangkok booth" },
  { src: "/images/pg-bangkok-2.jpg", name: "ETHGlobal Bangkok Push Protocol" },
  { src: "/images/pg-ethIndia.JPG", name: "ETHIndia Push protocol booth" },
  { src: "/images/pg-ETHGlobal-istanbul.jpg", name: "ETHGlobal Istanbul" },
  { src: "/images/pg-ethi.jpg", name: "ETHGlobal Istanbul" },
  { src: "/images/pg-Unfold.jpg", name: "Unfold X Push Protocol" },
  { src: "/images/pg-NFT-day-SKIT.JPG", name: "NFT Day - SKIT" },
  { src: "/images/pg-poly.jpg", name: "Polygon event" },
  { src: "/images/pg-coindcx.png", name: "Namaste Web3, CoinDCX X Forbes" },
  { src: "/images/pg-polygon-guild.png", name: "Polygon Guild, Blr" },
  { src: "/images/pg-google.png", name: "Google Cloud Web3 Conclave" },
  { src: "/images/pg-dtp.png", name: "Intro to web3 - DYP" },
  { src: "/images/pg-fipkart.JPG", name: "Polygon X Flipkart" },
  { src: "/images/pg-vietnam.png", name: "BUIDL ASIA, Vietnam" },
  { src: "/images/pg-w3c.jpeg", name: "Web3 Conf Goa" },

  // …add more as needed
];

// Helper for responsive grid positions and z-depth
const getGridStyle = (i, cols, depth) => {
  const row = Math.floor(i / cols);
  const col = i % cols;
  const x = col * 22 + (row % 2 === 0 ? 0 : 11); // px-8, offset for even rows
  const y = row * 22; // px-8
  return {
    left: `${x}%`,
    top: `${y}%`,
    zIndex: 10 + i + depth,
  };
};

// Enhanced animated mesh/chain/hex background
function SpeakerGalleryBg() {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      {/* Animated hexagons */}
      {[0,1,2,3,4,5,6,7,8,9].map((i) => (
        <polygon
          key={i}
          points="30,5 55,20 55,50 30,65 5,50 5,20"
          fill="#805AD5"
          opacity="0.07"
          style={{
            transform: `translate(${i*11+5}vw, ${i%2===0?10:30}vh) scale(${0.7+0.1*(i%3)})`,
          }}
        >
          <animate attributeName="opacity" values="0.07;0.13;0.07" dur={`${7+i}s`} repeatCount="indefinite" />
        </polygon>
      ))}
      {/* Subtle mesh lines */}
      <polyline points="0,100 200,120 400,80 600,140 800,100" fill="none" stroke="#38A169" strokeOpacity="0.04" strokeWidth="2" />
      {/* Floating Ethereum icon */}
      <g>
        <FaEthereum style={{ position: 'absolute', left: '90%', top: '10%', fontSize: 32, color: '#627EEA', opacity: 0.13 }} />
      </g>
    </svg>
  );
}

export default function SpeakerGallery() {
  const [hoveringIdx, setHoveringIdx] = useState(null);
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Responsive columns
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 640) setCols(2);
      else if (window.innerWidth < 1024) setCols(3);
      else setCols(4);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  // 3D parallax motion values
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const rotateX = useTransform(parallaxY, [-50, 50], [10, -10]);
  const rotateY = useTransform(parallaxX, [-50, 50], [-10, 10]);

  // Mouse/touch parallax handler
  const handleParallax = (e) => {
    let x, y;
    if (e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    const rect = sectionRef.current.getBoundingClientRect();
    parallaxX.set(((x - rect.left) / rect.width - 0.5) * 100);
    parallaxY.set(((y - rect.top) / rect.height - 0.5) * 100);
  };
  const resetParallax = () => {
    parallaxX.set(0);
    parallaxY.set(0);
  };

  // Depth for each image
  const getDepth = (i) => (i % cols) - Math.floor(cols / 2);

  return (
    <section
      id="speakers"
      ref={sectionRef}
      className="py-16 bg-base-100 relative min-h-[60vh] overflow-x-hidden overflow-y-visible select-none"
      onMouseMove={handleParallax}
      onMouseLeave={resetParallax}
      onTouchMove={handleParallax}
      onTouchEnd={resetParallax}
    >
      <SpeakerGalleryBg />
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-8 text-primary">
          Gallery
        </h3>
        {/* Collage grid with 3D parallax and scroll-triggered entry */}
        <motion.div
          className="relative w-full"
          style={{
            perspective: 1200,
            height: `calc(${Math.ceil(speakers.length / cols) * 22 + 20}vw)`,
            maxHeight: 600,
            minHeight: 340,
          }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {speakers.map((spk, i) => (
            <motion.div
              key={i}
              className="absolute w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              style={{
                ...getGridStyle(i, cols, getDepth(i)),
                transform: `translateZ(${getDepth(i) * 30}px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`
              }}
              initial={{ opacity: 0, scale: 0.7, y: 60, rotate: 8 * getDepth(i) }}
              animate={isInView ? {
                opacity: 1,
                scale: hoveringIdx === i ? 1.13 : 1,
                y: hoveringIdx === i ? -16 : 0,
                boxShadow: hoveringIdx === i ? '0 0 32px #38A169' : '0 4px 24px #805AD522',
                rotate: 0,
              } : {}}
              transition={{ delay: 0.2 + i * 0.09, type: 'spring', stiffness: 120 }}
              whileHover={{ zIndex: 99 }}
              onMouseEnter={() => setHoveringIdx(i)}
              onMouseLeave={() => setHoveringIdx(null)}
              onClick={() => setSelected(spk)}
            >
              {/* Animated block/cube icon */}
              <motion.span
                className="absolute -top-4 -left-4 text-indigo-400 text-2xl"
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FaCube />
              </motion.span>
              <Image
                src={spk.src}
                alt={spk.name}
                fill
                sizes="(max-width: 768px) 40vw, 12rem"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                style={{ filter: hoveringIdx === i ? 'brightness(1.1) saturate(1.2)' : 'none' }}
              />
              {/* Glassy overlay on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-sm pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveringIdx === i ? 0.25 : 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Caption */}
              <div className="absolute left-2 right-2 bottom-2 p-2 bg-white/30 backdrop-blur-sm rounded-lg text-center">
                <p className="text-base-content font-medium text-xs md:text-base">
                  {spk.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Modal popup with 3D pop, ripple, and blur */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full relative"
              initial={{ scale: 0.7, y: 100, boxShadow: '0 0 0 #38A169', filter: 'blur(8px)' }}
              animate={{ scale: 1, y: 0, boxShadow: '0 8px 32px #38A16988', filter: 'blur(0px)' }}
              exit={{ scale: 0.7, y: 100, boxShadow: '0 0 0 #38A169', filter: 'blur(8px)' }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Animated mining effect */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 text-3xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >⛏️</motion.div>
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

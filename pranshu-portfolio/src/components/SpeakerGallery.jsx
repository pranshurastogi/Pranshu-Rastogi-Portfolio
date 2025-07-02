// src/components/SpeakerGallery.jsx
"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { FaEthereum, FaCube } from "react-icons/fa";
import { SiBitcoin, SiSolana, SiPolygon } from "react-icons/si";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";

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

// Animated SVG background
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
    </svg>
  );
}

// Floating blockchain icon configs
const blockchainIcons = [
  { Icon: FaEthereum, color: "#627EEA" },
  { Icon: SiBitcoin, color: "#F7931A" },
  { Icon: SiPolygon, color: "#8247E5" },
  { Icon: SiSolana, color: "#00FFA3" },
];

// Generate a random position biased toward the border, avoiding the center
function getRandomPosition() {
  // Border zones: 0-15% or 85-100%
  function borderVal() {
    return Math.random() < 0.5
      ? Math.random() * 15
      : 85 + Math.random() * 15;
  }
  let top, left;
  // Try up to 10 times to avoid the center (30-70%)
  for (let i = 0; i < 10; i++) {
    top = borderVal();
    left = borderVal();
    // If either is in the border, accept
    if (top <= 20 || top >= 80 || left <= 20 || left >= 80) break;
  }
  return { top: `${top}%`, left: `${left}%` };
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

  // Responsive: detect mobile (client only)
  const [isMobile, setIsMobile] = useState(false); // default to desktop for SSR
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fewer floating icons on mobile
  const [floatingIconCount, setFloatingIconCount] = useState(12);
  useEffect(() => {
    if (isMobile === null) return;
    setFloatingIconCount(isMobile ? 4 : 12);
  }, [isMobile]);

  // Only generate icons when count changes
  const [floatingIcons, setFloatingIcons] = useState([]);
  useEffect(() => {
    if (isMobile === null) return; // Don't generate until we know
    const arr = Array.from({ length: floatingIconCount }).map(() => {
      const iconIdx = Math.floor(Math.random() * blockchainIcons.length);
      const { Icon, color } = blockchainIcons[iconIdx];
      const pos = getRandomPosition();
      const size = isMobile ? 24 : Math.floor(Math.random() * 2) ? 32 : 40;
      const duration = Math.random() * 4 + 4; // 4-8s
      const floatY = Math.random() > 0.5 ? [0, 12, 0] : [0, -12, 0];
      return { Icon, color, pos, size, duration, floatY };
    });
    setFloatingIcons(arr);
  }, [floatingIconCount, isMobile]);

  return (
    <section
      id="speakers"
      ref={sectionRef}
      className="py-8 sm:py-16 bg-gray-900 relative min-h-[60vw] sm:min-h-[60vh] overflow-hidden select-none"
      onMouseMove={handleParallax}
      onMouseLeave={resetParallax}
      onTouchMove={handleParallax}
      onTouchEnd={resetParallax}
    >
      <SpeakerGalleryBg />
      {/* Random floating blockchain icons */}
      {floatingIcons.map(({ Icon, color, pos, size, duration, floatY }, idx) => (
        <motion.div
          key={idx}
          className={`absolute opacity-20 pointer-events-none ${isMobile && idx > 3 ? 'hidden' : 'block'}`}
          style={{ ...pos, zIndex: 2, color, fontSize: size }}
          animate={{ y: floatY }}
          transition={{ duration, repeat: Infinity }}
        >
          <Icon />
        </motion.div>
      ))}
      {/* Floating cubes/blocks */}
      <motion.div
        className="absolute top-1/4 left-1/3 text-[#39FF14] text-xl sm:text-2xl opacity-25"
        animate={{ y: [0, 14, 0], rotate: [0, 20, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <FaCube />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 text-[#AEEA00] text-xl sm:text-3xl opacity-20"
        animate={{ y: [0, -10, 0], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        <FaCube />
      </motion.div>
      {/* Blockchain line SVG */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none -z-10" width="100%" height="100%" viewBox="0 0 1000 200">
        <motion.polyline
          points="60,120 180,80 320,160 500,100 700,180 900,120"
          fill="none"
          stroke="#39FF14"
          strokeWidth={isMobile ? 1.2 : 3}
          strokeDasharray="12 10"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: [100, 0, 100] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          opacity={0.13}
        />
      </svg>
      <div className="container mx-auto px-2 sm:px-4">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-6 sm:mb-8 text-[#AEEA00]">
          Gallery
        </h3>
        {/* Collage grid with 3D parallax and scroll-triggered entry */}
        <motion.div
          className="relative w-full"
          style={{
            perspective: 1200,
            height: isMobile ? `calc(${Math.ceil(speakers.length / cols) * 22 + 20}vw)` : `calc(${Math.ceil(speakers.length / cols) * 22 + 20}vw)`,
            maxHeight: isMobile ? undefined : 600,
            minHeight: isMobile ? '60vw' : '340px',
          }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {speakers.map((spk, i) => (
            <motion.div
              key={i}
              className="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden cursor-pointer group border-2 border-[#39FF14] shadow-[0_0_24px_2px_#39FF1480] bg-gradient-to-br from-[#18181b] via-[#232323] to-[#0f0f0f]"
              style={{
                ...getGridStyle(i, cols, getDepth(i)),
                transform: isMobile ? undefined : `translateZ(${getDepth(i) * 30}px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`
              }}
              initial={{ opacity: 0, scale: 0.7, y: 60, rotate: isMobile ? 0 : 8 * getDepth(i) }}
              animate={isInView ? {
                opacity: 1,
                scale: hoveringIdx === i ? 1.13 : 1,
                y: hoveringIdx === i ? -8 : 0,
                boxShadow: hoveringIdx === i ? '0 0 32px 8px #39FF14, 0 4px 24px #39FF1440' : '0 4px 24px #39FF1440',
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
                className="absolute -top-3 -left-3 text-indigo-400 text-lg sm:text-2xl"
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
                style={{ filter: hoveringIdx === i ? 'brightness(1.2) saturate(1.5) drop-shadow(0_0_12px_#39FF14)' : 'brightness(0.95) saturate(1.1)' }}
              />
              {/* Glassy overlay on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#39FF14]/10 via-white/10 to-transparent backdrop-blur-sm pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveringIdx === i ? 0.25 : 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Slimmer, less obtrusive caption bar */}
              <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-[#18181b]/70 via-transparent to-transparent px-1 py-0.5 sm:px-2 sm:py-1 text-center pointer-events-none">
                <span className="font-mono font-medium text-[0.60rem] sm:text-xs text-[#AEEA00] drop-shadow-[0_0_2px_#18181b] truncate block whitespace-nowrap overflow-hidden" style={{ maxWidth: '100%' }}>
                  {spk.name}
                </span>
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
                  className="mt-4 px-4 py-2 bg-[#AEEA00] text-black rounded-lg hover:bg-[#39FF14]"
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

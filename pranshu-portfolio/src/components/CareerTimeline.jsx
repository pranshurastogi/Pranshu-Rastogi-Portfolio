// src/components/CareerTimeline.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCube, FaLink, FaCode, FaStar, FaEthereum, FaBitcoin } from "react-icons/fa";
import { SiPolygon, SiSolana } from "react-icons/si";
import clsx from "clsx";
import SectionWrapper from './SectionWrapper';
import FloatingBlockchainIcons from './FloatingBlockchainIcons';

// Polkadot SVG
const PolkadotSVG = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#E6007A"/><circle cx="16" cy="16" r="7" fill="#fff"/><circle cx="16" cy="16" r="4" fill="#E6007A"/></svg>
);
// Ethereum SVG
const EthereumSVG = () => (
  <svg width="24" height="24" viewBox="0 0 256 417" fill="none"><g><polygon fill="#343434" points="127.9,0 125.2,9.5 125.2,279.1 127.9,281.8 255.8,209.2"/><polygon fill="#8C8C8C" points="127.9,0 0,209.2 127.9,281.8 127.9,150.9"/><polygon fill="#3C3C3B" points="127.9,307.1 126.4,308.9 126.4,414.2 127.9,417 255.9,233.6"/><polygon fill="#8C8C8C" points="127.9,417 127.9,307.1 0,233.6"/><polygon fill="#141414" points="127.9,281.8 255.8,209.2 127.9,150.9"/><polygon fill="#393939" points="0,209.2 127.9,281.8 127.9,150.9"/></g></svg>
);
// Hyperledger SVG (simplified)
const HyperledgerSVG = () => (
  <svg width="28" height="28" viewBox="0 0 64 64" fill="none"><polygon points="32,4 60,16 60,48 32,60 4,48 4,16" fill="#2E3A4A"/><polygon points="32,8 56,18 56,46 32,56 8,46 8,18" fill="#fff"/></svg>
);
// Bell SVG
const BellSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 1 0-2 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 0 0 6 19h12a1 1 0 0 0 .71-1.71L18 16z" fill="#FBBF24"/></svg>
);
// Polygon SVG
const PolygonSVG = () => (
  <svg width="28" height="28" viewBox="0 0 38 38" fill="none"><circle cx="19" cy="19" r="16" fill="#a259ff" /><text x="8" y="26" fontSize="18" fontFamily="monospace" fill="#fff">⬡</text></svg>
);
// Bitcoin SVG
const BitcoinSVG = () => (
  <svg width="28" height="28" viewBox="0 0 38 38" fill="none"><circle cx="19" cy="19" r="16" fill="#F7931A" /><text x="10" y="26" fontSize="18" fontFamily="monospace" fill="#fff">฿</text></svg>
);
// Solana SVG
const SolanaSVG = () => (
  <svg width="28" height="28" viewBox="0 0 38 38" fill="none"><rect x="6" y="6" width="26" height="26" rx="8" fill="#00FFA3" /><text x="10" y="26" fontSize="18" fontFamily="monospace" fill="#222">S</text></svg>
);

const blockIcons = [<FaCube />, <FaLink />, <FaCode />, <FaStar />, <FaBitcoin />, <SiPolygon />, <SiSolana />];
const minorIcons = [<FaEthereum />, <FaCube />, <FaLink />, <FaCode />, <BitcoinSVG />, <PolygonSVG />, <SolanaSVG />];

const careerEvents = [
  {
    title: "Software Engineer",
    company: (
      <span className="flex items-center gap-2">Terse Software Pvt. Ltd. <EthereumSVG /> <HyperledgerSVG /> <PolygonSVG /></span>
    ),
    timestamp: "Apr 2019 – Jul 2020",
    icon: blockIcons[0],
    minor: minorIcons[0],
  },
  {
    title: "Software Engineer",
    company: (
      <span className="flex items-center gap-2">Dhiway <PolkadotSVG /> <BitcoinSVG /></span>
    ),
    timestamp: "Aug 2020 – Sep 2021",
    icon: blockIcons[1],
    minor: minorIcons[1],
  },
  {
    title: "VP of Engineering",
    company: (
      <span className="flex items-center gap-2">Push Protocol <SolanaSVG /></span>
    ),
    timestamp: "Nov 2021 – May 2023",
    icon: blockIcons[4],
    minor: minorIcons[4],
  },
  {
    title: "Head of Ecosystem & Integrations",
    company: (
      <span className="flex items-center gap-2">Push Chain <BellSVG /> <PolygonSVG /></span>
    ),
    timestamp: "Apr 2023 – Present",
    icon: blockIcons[5],
    minor: minorIcons[5],
  },
];

const colors = ["#38A169", "#805AD5", "#E53E3E", "#DD6B20"];

export default function CareerTimeline() {
  const pathRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [progress, setProgress] = useState(0);

  // Experience Counter Logic
  const genesisDate = new Date("2019-04-01T00:00:00Z");
  const [exp, setExp] = useState({ years: 0, days: 0, hours: 0 });

  useEffect(() => {
    function handleScroll() {
      const section = document.getElementById("career");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visible = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
      const total = Math.min(rect.height, windowHeight);
      setProgress(Math.max(0, Math.min(1, visible / total)));
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    try {
      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      const delta = 1;
      const pts = careerEvents.map((_, i) => {
        const frac = (length * i) / (careerEvents.length - 1);
        const { x, y } = path.getPointAtLength(frac);
        const prev = path.getPointAtLength(Math.max(0, frac - delta));
        const dx = x - prev.x,
          dy = y - prev.y;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return { x, y, angle };
      });
      setPoints(pts);
    } catch (err) {
      setPoints([]);
    }
  }, []);

  useEffect(() => {
    function updateExp() {
      const now = new Date();
      let diff = now - genesisDate;
      const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
      diff -= years * 365.25 * 24 * 60 * 60 * 1000;
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      diff -= days * 24 * 60 * 60 * 1000;
      const hours = Math.floor(diff / (60 * 60 * 1000));
      setExp({ years, days, hours });
    }
    updateExp();
    const interval = setInterval(updateExp, 1000 * 60); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Blockchain section divider (top) */}
      <div className="w-full flex justify-center items-center py-2">
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="animate-pulse">
          <rect x="0" y="8" width="40" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          <rect x="40" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
          <rect x="56" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
          <rect x="72" y="10" width="8" height="4" rx="2" fill="#a259ff" />
          <rect x="88" y="8" width="32" height="8" rx="4" fill="#39FF14" opacity="0.18" />
        </svg>
      </div>
      <SectionWrapper>
        {/* Animated blockchain lines background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" width="100%" height="100%" viewBox="0 0 1200 300">
          {/* Main neon chain */}
          <polyline points="60,120 180,80 320,160 500,100 700,180 900,120 1100,180" fill="none" stroke="#39FF14" strokeWidth="2.2" strokeDasharray="16 12" opacity="0.08">
            <animate attributeName="stroke-dashoffset" values="60;0;100" dur="10s" repeatCount="indefinite" />
          </polyline>
          {/* Random mesh lines for blockchain effect */}
          <polyline points="100,200 220,110 340,180 480,90 600,210 740,130 900,200 1150,140" fill="none" stroke="#AEEA00" strokeWidth="1.5" strokeDasharray="10 8" opacity="0.06">
            <animate attributeName="stroke-dashoffset" values="40;0;60" dur="13s" repeatCount="indefinite" />
          </polyline>
          <polyline points="80,60 200,140 350,100 520,180 700,80 850,160 1050,100 1190,180" fill="none" stroke="#00e0ff" strokeWidth="1.2" strokeDasharray="8 7" opacity="0.05">
            <animate attributeName="stroke-dashoffset" values="30;0;50" dur="15s" repeatCount="indefinite" />
          </polyline>
          <polyline points="120,180 260,90 400,160 600,120 800,200 1000,140 1150,220" fill="none" stroke="#a259ff" strokeWidth="1.1" strokeDasharray="12 10" opacity="0.04">
            <animate attributeName="stroke-dashoffset" values="20;0;40" dur="17s" repeatCount="indefinite" />
          </polyline>
          <polyline points="60,220 180,160 320,240 500,180 700,260 900,200 1100,260" fill="none" stroke="#39FF14" strokeWidth="1.3" strokeDasharray="14 11" opacity="0.03">
            <animate attributeName="stroke-dashoffset" values="10;0;30" dur="19s" repeatCount="indefinite" />
          </polyline>
        </svg>
        {/* Subtle floating blockchain icons */}
        <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
          <FloatingBlockchainIcons interactive={false} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-[#AEEA00] mb-16 drop-shadow-lg tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            Career Timeline
          </motion.h2>
          <div className="relative flex flex-col items-center">
            {/* Horizontal chain spine */}
            <div className="w-full overflow-x-auto pb-8">
              <div className="relative flex flex-row items-center min-w-[700px] md:min-w-[900px] lg:min-w-[1100px] gap-0">
                {/* Career Genesis badge with animation */}
                <motion.div
                  className="flex flex-col items-center mr-4 relative"
                  initial={{ opacity: 0, scale: 0.7, y: 40 }}
                  whileInView={{ opacity: 1, scale: [1, 1.15, 1], y: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="bg-[#232526] text-[#AEEA00] text-xs font-bold px-3 py-1 rounded-full shadow border border-[#AEEA00] mb-2 animate-pulse">Career Genesis</span>
                  <span className="w-8 h-8 rounded-full bg-[#0f2027] border-4 border-[#AEEA00] flex items-center justify-center shadow-lg relative">
                    <FaCube className="text-[#AEEA00] animate-spin-slow" />
                    {/* Sparkle animation */}
                    <motion.span
                      className="absolute -top-2 -right-2 text-[#39FF14]"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                    >
                      ✨
                    </motion.span>
                  </span>
                  {/* Neon blockchain/Ethereum icon on right */}
                  <span className="absolute right-[-36px] top-1/2 -translate-y-1/2 text-[#39FF14] text-2xl animate-pulse drop-shadow-lg">
                    <FaEthereum />
                  </span>
                </motion.div>
                {/* Timeline blocks and chain links */}
                {careerEvents.map((event, idx) => {
                  const neonColors = ["#00ff99", "#39FF14", "#00e0ff", "#a259ff"];
                  const color = neonColors[idx % neonColors.length];
                  return (
                    <motion.div
                      key={idx}
                      className="flex flex-col items-center relative"
                      initial={{ opacity: 0, y: 60, scale: 0.8, rotate: -6 }}
                      whileInView={{ opacity: 1, y: [0, -8, 0], scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + idx * 0.18, type: 'spring', stiffness: 120, damping: 18, duration: 3 }}
                      viewport={{ once: true }}
                    >
                      {/* Animated block connector (blockchain link) */}
                      {idx !== 0 && (
                        <motion.div
                          className="absolute -left-8 top-1/2 -translate-y-1/2 z-10"
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          animate={{ filter: [
                            `drop-shadow(0 0 8px ${color})`,
                            `drop-shadow(0 0 16px ${color})`,
                            `drop-shadow(0 0 8px ${color})`
                          ] }}
                          transition={{ delay: 0.25 + idx * 0.18, type: 'spring', stiffness: 120, duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                          viewport={{ once: true }}
                        >
                          <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                            <rect x="0" y="8" width="40" height="8" rx="4" fill="#232526" />
                            <rect x="8" y="10" width="8" height="4" rx="2" fill={color} >
                              <animate attributeName="fill-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="24" y="10" width="8" height="4" rx="2" fill={color} >
                              <animate attributeName="fill-opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="16" y="6" width="8" height="12" rx="4" fill="#39FF14" opacity="0.12" />
                          </svg>
                        </motion.div>
                      )}
                      {/* Block card with advanced animation and glow */}
                      <motion.div
                        className="relative bg-black/80 border-2 rounded-2xl shadow-xl px-8 py-8 flex flex-col items-center block-card min-w-[220px] max-w-[260px] mx-2 border-[#232526] group"
                        style={{boxShadow: `0 4px 24px 0 ${color}99, 0 0 24px 0 ${color}44`, borderColor: color}}
                        whileHover={{ scale: 1.13, rotate: [0, 2, -2, 0], boxShadow: `0 8px 32px 0 ${color}cc, 0 0 32px 0 ${color}88`, filter: `brightness(1.15) saturate(1.2)`, y: -12 }}
                        whileTap={{ scale: 0.97, rotate: 0 }}
                        whileInView={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.5, type: 'spring', stiffness: 180, damping: 14 }}
                        initial={{ opacity: 0, y: 60, scale: 0.8, rotate: -6 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                      >
                        {/* Animated hexagon background */}
                        <motion.div
                          className="absolute -top-6 left-1/2 -translate-x-1/2 z-0"
                          initial={{ scale: 0.7, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 0.18 }}
                          animate={{ rotate: [0, 6, -6, 0] }}
                          transition={{ delay: 0.4 + idx * 0.18, duration: 6, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                          viewport={{ once: true }}
                        >
                          <svg width="60" height="52" viewBox="0 0 60 52" fill="none">
                            <polygon points="30,4 56,18 56,44 30,56 4,44 4,18" fill={color} opacity="0.25" />
                          </svg>
                        </motion.div>
                        <motion.span
                          className="relative z-10 text-2xl mb-2"
                          style={{ color, textShadow: `0 0 12px ${color}cc` }}
                          animate={{ scale: [1, 1.15, 1], filter: [
                            `drop-shadow(0 0 8px ${color})`,
                            `drop-shadow(0 0 16px ${color})`,
                            `drop-shadow(0 0 8px ${color})`
                          ] }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                        >
                          {event.icon}
                        </motion.span>
                        <h3 className="text-lg font-bold text-white mb-1 text-center drop-shadow" style={{ textShadow: `0 0 6px ${color}88` }}>{event.title}</h3>
                        <div className="text-sm text-[#AEEA00] mb-2 text-center font-mono">{event.company}</div>
                        <div className="text-xs text-gray-300 mb-2 text-center">{event.timestamp}</div>
                      </motion.div>
                    </motion.div>
                  );
                })}
                {/* Animated 'Now' marker at the end */}
                <motion.div
                  className="flex flex-col items-center ml-4 relative"
                  initial={{ opacity: 0, scale: 0.7, y: 40 }}
                  whileInView={{ opacity: 1, scale: [1, 1.15, 1], y: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="bg-[#232526] text-[#00e0ff] text-xs font-bold px-3 py-1 rounded-full shadow border border-[#00e0ff] mb-2 animate-pulse">Now</span>
                  <span className="w-8 h-8 rounded-full bg-[#0f2027] border-4 border-[#00e0ff] flex items-center justify-center shadow-lg relative">
                    <FaStar className="text-[#00e0ff] animate-spin-slow" />
                    {/* Sparkle animation */}
                    <motion.span
                      className="absolute -top-2 -right-2 text-[#39FF14]"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                    >
                      ✨
                    </motion.span>
                  </span>
                  {/* Neon blockchain/Ethereum icon on left */}
                  <span className="absolute left-[-36px] top-1/2 -translate-y-1/2 text-[#00e0ff] text-2xl animate-pulse drop-shadow-lg">
                    <FaEthereum />
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {/* Chain Age Block - Blockchain Experience Counter */}
        <div className="flex justify-center mt-16">
          <motion.div
            className="relative bg-black/80 border-2 border-[#39FF14] rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center block-card min-w-[300px] max-w-[400px] mx-2"
            style={{ boxShadow: '0 0 32px #39FF14, 0 0 8px #AEEA00' }}
            initial={{ opacity: 0, y: 60, scale: 0.9, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 48px #AEEA00, 0 0 16px #39FF14' }}
          >
            {/* Animated blockchain SVG element */}
            <svg className="absolute -top-6 left-1/2 -translate-x-1/2 z-10" width="80" height="32" viewBox="0 0 80 32" fill="none">
              <rect x="0" y="12" width="80" height="8" rx="4" fill="#39FF14" opacity="0.13" />
              <rect x="28" y="14" width="12" height="4" rx="2" fill="#AEEA00" />
              <rect x="48" y="14" width="12" height="4" rx="2" fill="#00e0ff" />
            </svg>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center bg-[#232526] border-2 border-[#AEEA00] rounded-full shadow mb-2 text-3xl animate-spin-slow text-[#39FF14]">
                <FaCube />
              </div>
              <h3 className="text-2xl font-bold text-[#AEEA00] mb-1 text-center tracking-wide drop-shadow">Chain Age (Total Exp.)</h3>
              <div className="text-[#39FF14] font-medium mb-1 text-center">Experience Mined Since Genesis</div>
              <div className="flex gap-6 mt-2 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-mono font-bold text-[#AEEA00] animate-pulse">{exp.years}</span>
                  <span className="text-xs text-[#39FF14]">Years</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-mono font-bold text-[#AEEA00] animate-pulse">{exp.days}</span>
                  <span className="text-xs text-[#39FF14]">Days</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-mono font-bold text-[#AEEA00] animate-pulse">{exp.hours}</span>
                  <span className="text-xs text-[#39FF14]">Hours</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-[#00e0ff] italic">Uptime: {exp.years * 365 + exp.days} blocks</div>
              {/* Animated mining effect */}
              <span className="absolute top-3 right-3 text-[#39FF14] animate-pulse text-xl z-20 opacity-80">⛏️</span>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
      {/* Blockchain section divider (bottom) */}
      <div className="w-full flex justify-center items-center py-2">
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="animate-pulse">
          <rect x="0" y="8" width="40" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          <rect x="40" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
          <rect x="56" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
          <rect x="72" y="10" width="8" height="4" rx="2" fill="#a259ff" />
          <rect x="88" y="8" width="32" height="8" rx="4" fill="#39FF14" opacity="0.18" />
        </svg>
      </div>
    </>
  );
}

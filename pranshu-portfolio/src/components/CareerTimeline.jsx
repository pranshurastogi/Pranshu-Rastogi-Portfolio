// src/components/CareerTimeline.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCube, FaLink, FaCode, FaStar, FaEthereum } from "react-icons/fa";
import clsx from "clsx";

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

const blockIcons = [<FaCube />, <FaLink />, <FaCode />, <FaStar />];
const minorIcons = [<FaEthereum />, <FaCube />, <FaLink />, <FaCode />];

const careerEvents = [
  {
    title: "Software Engineer (Blockchain)",
    company: (
      <span className="flex items-center gap-2">Terse Software Pvt. Ltd. <EthereumSVG /> <HyperledgerSVG /></span>
    ),
    period: "Apr 2019 – Jul 2020",
    icon: blockIcons[0],
    minor: minorIcons[0],
  },
  {
    title: "Software Engineer",
    company: (
      <span className="flex items-center gap-2">Dhiway <PolkadotSVG /></span>
    ),
    period: "Aug 2020 – Sep 2021",
    icon: blockIcons[1],
    minor: minorIcons[1],
  },
  {
    title: "VP of Engineering",
    company: "Push Protocol (formerly EPNS)",
    period: "Nov 2021 – May 2023",
    icon: blockIcons[2],
    minor: minorIcons[2],
  },
  {
    title: "Head of Ecosystem & Integrations",
    company: (
      <span className="flex items-center gap-2">Push Chain <BellSVG /></span>
    ),
    period: "Apr 2023 – Present",
    icon: blockIcons[3],
    minor: minorIcons[3],
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
    <section id="career" className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 drop-shadow-lg">
          Career Timeline
        </h2>
        <div className="relative flex flex-col items-center">
          {/* Horizontal chain spine */}
          <div className="w-full overflow-x-auto pb-8">
            <div className="relative flex flex-row items-center min-w-[700px] md:min-w-[900px] lg:min-w-[1100px] gap-0">
              {/* Career Genesis badge with animation */}
              <motion.div
                className="flex flex-col items-center mr-4"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', delay: 0.1 }}
              >
                <span className="bg-pink-200 text-pink-800 text-xs font-bold px-3 py-1 rounded-full shadow border border-pink-300 mb-2 animate-pulse">Career Genesis</span>
                <span className="w-8 h-8 rounded-full bg-pink-400 border-4 border-white flex items-center justify-center shadow-lg relative">
                  <FaCube className="text-white animate-spin-slow" />
                  {/* Sparkle animation */}
                  <motion.span
                    className="absolute -top-2 -right-2 text-yellow-300"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.div>
              {/* Timeline blocks and chain links */}
              {careerEvents.map((event, idx) => {
                const color = colors[idx % colors.length];
                return (
                  <motion.div
                    key={idx}
                    className="flex flex-col items-center relative"
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.2, type: 'spring', stiffness: 120 }}
                  >
                    {/* Chain link (except first block) */}
                    {idx !== 0 && (
                      <motion.div
                        className="absolute -left-8 top-1/2 -translate-y-1/2 z-10"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15 + idx * 0.2 }}
                      >
                        <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                          <rect x="0" y="8" width="40" height="8" rx="4" fill="#CBD5E1" />
                          <rect x="8" y="10" width="8" height="4" rx="2" fill={color} />
                          <rect x="24" y="10" width="8" height="4" rx="2" fill={color} />
                        </svg>
                      </motion.div>
                    )}
                    {/* Block card with more animation and details */}
                    <motion.div
                      className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-xl px-8 py-8 flex flex-col items-center block-card min-w-[220px] max-w-[260px] mx-2"
                      style={{boxShadow: `0 4px 24px 0 ${color}22`}}
                      whileHover={{ scale: 1.08, boxShadow: `0 8px 32px 0 ${color}44` }}
                    >
                      {/* Animated hexagon background */}
                      <motion.div
                        className="absolute -top-6 left-1/2 -translate-x-1/2 z-0"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.12 }}
                        transition={{ delay: 0.3 + idx * 0.2, duration: 0.6 }}
                      >
                        <svg width="60" height="52" viewBox="0 0 60 52" fill="none">
                          <polygon points="30,4 56,18 56,44 30,56 4,44 4,18" fill={color} />
                        </svg>
                      </motion.div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-200 rounded-full shadow mb-2 text-2xl animate-bounce" style={{color}}>
                          {event.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 text-center tracking-wide" style={{color}}>{event.title}</h3>
                        <div className="text-gray-700 font-medium mb-1 text-center">{event.company}</div>
                        <div className="text-xs text-gray-500 font-mono mb-2 text-center">{event.period}</div>
                        {/* Minor blockchain element */}
                        <div className="flex gap-2 mt-2">
                          <span className="inline-block w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-lg animate-spin-slow" style={{color}}>{event.minor}</span>
                          <span className="inline-block w-3 h-3 bg-gradient-to-br from-green-400 to-indigo-400 rounded-full animate-pulse" />
                          <span className="inline-block w-3 h-3 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full animate-pulse" />
                        </div>
                        {/* Blocky border effect */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 flex gap-1 z-0">
                          {[...Array(8)].map((_, i) => (
                            <span key={i} className="block w-2 h-2 rounded-sm" style={{background: i % 2 === 0 ? color : '#CBD5E1', opacity: 0.7}} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
              {/* End badge */}
              <motion.div
                className="flex flex-col items-center ml-4"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + careerEvents.length * 0.2 }}
              >
                <span className="w-8 h-8 rounded-full bg-yellow-400 border-4 border-white flex items-center justify-center shadow-lg animate-bounce">
                  <FaStar className="text-white" />
                </span>
                <span className="bg-yellow-200 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow border border-yellow-300 mt-2">Now</span>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Blockchain Experience Counter */}
        <div className="flex justify-center mt-12">
          <motion.div
            className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-xl px-8 py-6 flex flex-col items-center block-card min-w-[260px] max-w-[340px] mx-2"
            style={{boxShadow: `0 4px 24px 0 #38A16922`}}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            {/* Animated hexagon background */}
            <motion.div
              className="absolute -top-6 left-1/2 -translate-x-1/2 z-0"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.10 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <svg width="60" height="52" viewBox="0 0 60 52" fill="none">
                <polygon points="30,4 56,18 56,44 30,56 4,44 4,18" fill="#38A169" />
              </svg>
            </motion.div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-200 rounded-full shadow mb-2 text-2xl animate-bounce text-green-600">
                <FaCube />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 text-center tracking-wide" style={{color: '#38A169'}}>Chain Age (Total exp.)</h3>
              <div className="text-gray-700 font-medium mb-1 text-center">Experience Mined Since Genesis</div>
              <div className="flex gap-4 mt-2 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-mono font-bold text-green-700 animate-pulse">{exp.years}</span>
                  <span className="text-xs text-gray-500">Years</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-mono font-bold text-green-700 animate-pulse">{exp.days}</span>
                  <span className="text-xs text-gray-500">Days</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-mono font-bold text-green-700 animate-pulse">{exp.hours}</span>
                  <span className="text-xs text-gray-500">Hours</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-400 italic">Uptime: {exp.years * 365 + exp.days} blocks</div>
            </div>
          </motion.div>
        </div>
        <style jsx>{`
          .block-card {
            border-radius: 1.25rem;
            border-width: 2.5px;
            border-style: solid;
            border-image: linear-gradient(135deg, #38A169 0%, #805AD5 100%) 1;
            box-shadow: 0 8px 32px 0 rgba(60,60,60,0.08);
            transition: box-shadow 0.3s, transform 0.3s;
          }
          .animate-spin-slow {
            animation: spin 2.5s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </section>
  );
}

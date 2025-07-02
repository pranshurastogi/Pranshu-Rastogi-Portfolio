'use client';
import React, { useEffect, useRef, useState } from "react";

const icons = [
  // Ethereum
  (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" key="eth">
      <polygon points="19,4 33,19 19,34 5,19" fill="#627EEA" />
      <polygon points="19,4 19,34 33,19" fill="#99aaff" opacity="0.7" />
    </svg>
  ),
  // Bitcoin
  (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" key="btc">
      <circle cx="19" cy="19" r="16" fill="#F7931A" />
      <text x="10" y="26" fontSize="18" fontFamily="monospace" fill="#fff">฿</text>
    </svg>
  ),
  // Polygon
  (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" key="poly">
      <circle cx="19" cy="19" r="16" fill="#a259ff" />
      <text x="8" y="26" fontSize="18" fontFamily="monospace" fill="#fff">⭑</text>
    </svg>
  ),
  // Chainlink
  (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" key="link">
      <polygon points="19,6 32,19 19,32 6,19" fill="#2A5ADA" />
    </svg>
  ),
  // Solana
  (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" key="sol">
      <rect x="6" y="6" width="26" height="26" rx="8" fill="#00FFA3" />
      <text x="10" y="26" fontSize="18" fontFamily="monospace" fill="#222">S</text>
    </svg>
  ),
  // Polkadot
  (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" key="dot">
      <circle cx="19" cy="19" r="16" fill="#E6007A" />
      <text x="8" y="26" fontSize="18" fontFamily="monospace" fill="#fff">●</text>
    </svg>
  ),
  // Avalanche
  (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" key="avax">
      <circle cx="19" cy="19" r="16" fill="#E84142" />
      <text x="8" y="26" fontSize="18" fontFamily="monospace" fill="#fff">A</text>
    </svg>
  ),
  // BNB
  (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" key="bnb">
      <circle cx="19" cy="19" r="16" fill="#F3BA2F" />
      <text x="8" y="26" fontSize="18" fontFamily="monospace" fill="#222">B</text>
    </svg>
  ),
];

const floatingConfigs = [
  { top: "12%", left: "8%", duration: 18, delay: 0, dir: 1 },
  { top: "22%", left: "78%", duration: 22, delay: 2, dir: -1 },
  { top: "68%", left: "18%", duration: 20, delay: 1, dir: 1 },
  { top: "60%", left: "70%", duration: 24, delay: 3, dir: -1 },
  { top: "40%", left: "45%", duration: 19, delay: 1.5, dir: 1 },
  { top: "80%", left: "60%", duration: 21, delay: 2.5, dir: -1 },
  { top: "30%", left: "60%", duration: 23, delay: 0.5, dir: 1 },
  { top: "75%", left: "30%", duration: 25, delay: 2.2, dir: -1 },
  { top: "10%", left: "55%", duration: 20, delay: 1.1, dir: 1 },
  { top: "55%", left: "10%", duration: 22, delay: 2.7, dir: -1 },
  { top: "85%", left: "85%", duration: 26, delay: 1.8, dir: 1 },
  { top: "15%", left: "90%", duration: 19, delay: 0.9, dir: -1 },
];

export default function FloatingBlockchainIcons({ interactive = true }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (!interactive) return;
    function handleMouseMove(e) {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setOffset({ x, y });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  return (
    <div className="floating-blockchain-icons" ref={ref}>
      {floatingConfigs.map((cfg, i) => {
        // Parallax offset
        const parallaxX = interactive ? offset.x * 30 * cfg.dir : 0;
        const parallaxY = interactive ? offset.y * 20 * cfg.dir : 0;
        return (
          <span
            className="floating-icon"
            key={i}
            style={{
              top: cfg.top,
              left: cfg.left,
              animationDuration: `${cfg.duration}s`,
              animationDelay: `${cfg.delay}s`,
              transform: `translate(${parallaxX}px, ${parallaxY}px)`
            }}
          >
            {icons[i % icons.length]}
          </span>
        );
      })}
      <style jsx>{`
        .floating-blockchain-icons {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 6;
        }
        .floating-icon {
          position: absolute;
          opacity: 0.18;
          filter: drop-shadow(0 0 8px #AEEA00) blur(0.5px);
          animation: float-bc-icon 18s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }
        @keyframes float-bc-icon {
          0% { transform: translateY(0px) scale(1) rotate(-8deg); opacity: 0.18; }
          30% { opacity: 0.32; }
          50% { transform: translateY(-32px) scale(1.08) rotate(8deg); opacity: 0.22; }
          70% { opacity: 0.32; }
          100% { transform: translateY(0px) scale(1) rotate(-8deg); opacity: 0.18; }
        }
      `}</style>
    </div>
  );
} 
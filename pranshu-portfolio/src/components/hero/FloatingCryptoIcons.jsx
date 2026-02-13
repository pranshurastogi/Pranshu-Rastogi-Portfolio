"use client";

import { useMemo, useState, useEffect } from "react";
import { FaEthereum, FaBitcoin } from "react-icons/fa";
import {
  SiBitcoin,
  SiSolana,
  SiPolygon,
  SiChainlink,
  SiPolkadot,
  SiLitecoin,
  SiDogecoin,
  SiStellar,
  SiCardano,
} from "react-icons/si";

const ICONS = [
  { Icon: FaEthereum, color: "#627EEA", label: "Ethereum" },
  { Icon: FaBitcoin, color: "#F7931A", label: "Bitcoin" },
  { Icon: SiBitcoin, color: "#F7931A", label: "Bitcoin" },
  { Icon: SiSolana, color: "#14F195", label: "Solana" },
  { Icon: SiPolygon, color: "#8247E5", label: "Polygon" },
  { Icon: SiChainlink, color: "#2A5ADA", label: "Chainlink" },
  { Icon: SiPolkadot, color: "#E6007A", label: "Polkadot" },
  { Icon: SiLitecoin, color: "#345D9D", label: "Litecoin" },
  { Icon: SiDogecoin, color: "#C2A633", label: "Dogecoin" },
  { Icon: SiStellar, color: "#14B6E4", label: "Stellar" },
  { Icon: SiCardano, color: "#0033AD", label: "Cardano" },
];

function getPosition(index, total) {
  const seed = index * 1.618033988749;
  const x = (Math.sin(seed * 7) * 0.5 + 0.5) * 100;
  const y = (Math.cos(seed * 11) * 0.5 + 0.5) * 100;
  const size = 12 + (Math.sin(seed * 13) * 0.5 + 0.5) * 22;
  const delay = (index / total) * 5;
  const duration = 16 + (index % 6) * 3;
  return {
    x: Number(x).toFixed(4),
    y: Number(y).toFixed(4),
    size: Number(size).toFixed(4),
    delay,
    duration,
  };
}

export default function FloatingCryptoIcons() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const count = isMobile ? 10 : 20;

  const items = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const iconSet = ICONS[i % ICONS.length];
      const pos = getPosition(i, count);
      list.push({ ...iconSet, ...pos, key: i });
    }
    return list;
  }, [count]);

  return (
    <div
      className="absolute inset-0 z-[2] overflow-hidden pointer-events-none"
      aria-hidden
    >
      {items.map(({ Icon, color, x, y, size, delay, duration, key }) => (
        <span
          key={key}
          className="absolute opacity-[0.14] floating-crypto-icon"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            color,
            "--float-duration": `${duration}s`,
            "--float-delay": `${delay}s`,
          }}
        >
          <Icon className="w-full h-full" style={{ width: "100%", height: "100%" }} />
        </span>
      ))}
    </div>
  );
}

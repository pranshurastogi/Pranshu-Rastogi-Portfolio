import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

// Slate/grey/black palette
const BORDER_COLOR = "#6b7280"; // slate-500
const GLOW_1 = "#6b7280"; // slate-500
const GLOW_2 = "#111827"; // slate-900
const GLOW_3 = "#374151"; // slate-700
const GLOW_4 = "#000000"; // black

// Matrix/code effect overlay for inside the PFP
function MatrixCodeOverlay({ color = "#6b7280", density = 18 }) {
  const columns = density;
  const rows = 8;
  const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    <div
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      style={{
        mixBlendMode: "lighten",
        opacity: 0.10,
        filter: "blur(0.3px)",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        {Array.from({ length: columns }).map((_, colIdx) => (
          Array.from({ length: rows }).map((_, rowIdx) => {
            const delay = (colIdx * 0.2 + rowIdx * 0.13).toFixed(2);
            const duration = (2.5 + (colIdx % 3) * 0.7).toFixed(2);
            const char = chars[Math.floor(Math.random() * chars.length)];
            return (
              <text
                key={colIdx + "-" + rowIdx}
                x={5 + (colIdx * 90) / (columns - 1)}
                y={10 + (rowIdx * 80) / (rows - 1)}
                fill={color}
                fontSize="7"
                fontFamily="'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace"
                opacity={0.4 - rowIdx * 0.04}
              >
                <animate
                  attributeName="y"
                  values={`0;${10 + (rowIdx * 80) / (rows - 1)};100`}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                />
                {char}
              </text>
            );
          })
        ))}
      </svg>
    </div>
  );
}

export default function AnimatedPfp({
  size = 224, // default 224px (w-56)
  src = "/images/pfp.png",
  alt = "Pranshu Rastogi",
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Stronger 3D tilt transforms and perspective
  const rotateX = useTransform(y, [-100, 100], [18, -18]);
  const rotateY = useTransform(x, [-100, 100], [-18, 18]);
  const shadowX = useTransform(x, [-100, 100], [32, -32]);
  const shadowY = useTransform(y, [-100, 100], [-16, 32]);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px - rect.width / 2);
    y.set(py - rect.height / 2);
    setMouse({ x: px / rect.width, y: py / rect.height });
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
    setMouse({ x: 0.5, y: 0.5 });
  }

  function handleMouseEnter() {
    setHovered(true);
  }

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ width: size, height: size, perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Animated slate/grey/black glow border */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none z-30"
        animate={hovered ? {
          boxShadow: [
            `0 0 0px ${GLOW_1}, 0 0 0px ${GLOW_2}`,
            `0 0 32px ${GLOW_1}, 0 0 16px ${GLOW_2}`,
            `0 0 48px ${GLOW_3}, 0 0 32px ${GLOW_4}`,
            `0 0 32px ${GLOW_1}, 0 0 16px ${GLOW_2}`,
            `0 0 0px ${GLOW_1}, 0 0 0px ${GLOW_2}`
          ]
        } : {
          boxShadow: [
            `0 0 0px ${GLOW_1}, 0 0 0px ${GLOW_2}`,
            `0 0 16px ${GLOW_1}, 0 0 8px ${GLOW_2}`,
            `0 0 24px ${GLOW_3}, 0 0 12px ${GLOW_4}`,
            `0 0 16px ${GLOW_1}, 0 0 8px ${GLOW_2}`,
            `0 0 0px ${GLOW_1}, 0 0 0px ${GLOW_2}`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ borderRadius: 24, border: `2px solid ${BORDER_COLOR}` }}
      />
      {/* Subtle floating effect + 3D tilt + glass shadow */}
      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden z-20"
        style={{
          rotateX,
          rotateY,
          scale: hovered ? 1.09 : 1,
          boxShadow: shadowX && shadowY ? `0px ${shadowY.get()}px ${48 + (hovered ? 24 : 0)}px 0px rgba(30,41,59,0.32)` : undefined,
        }}
        animate={{
          y: [0, -10, 0, 10, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Matrix/code effect now behind the image for clarity */}
        <MatrixCodeOverlay />
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="220px"
          priority
        />
        {/* Glassmorphism overlay, now more subtle and above image */}
        <div
          className="absolute inset-0 rounded-3xl z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(107,114,128,0.06) 60%, rgba(17,24,39,0.10) 100%)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            border: "1.5px solid rgba(255,255,255,0.06)",
            boxShadow: "0 2px 16px 0 rgba(30,41,59,0.06)",
            mixBlendMode: "lighten",
            opacity: 0.55,
          }}
        >
          {/* Moving highlight/reflection, now more faint */}
          <div
            className="absolute"
            style={{
              left: `${20 + mouse.x * 60}%`,
              top: `${10 + mouse.y * 30}%`,
              width: "38%",
              height: "18%",
              background: "linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)",
              borderRadius: "50%",
              filter: "blur(8px)",
              opacity: hovered ? 0.35 : 0.18,
              pointerEvents: "none",
              transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
            }}
          />
          {/* Subtle inner glow for glass depth */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              boxShadow: "inset 0 0 16px 0 rgba(255,255,255,0.06), inset 0 0 32px 0 rgba(107,114,128,0.06)",
              pointerEvents: "none",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
} 
import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import OptimizedImage from "../ui/OptimizedImage";
import useIsMobile from "@/hooks/useIsMobile";
import { ASSETS } from "@/lib/site-assets";

// Slate/grey/black palette
const BORDER_COLOR = "#6b7280"; // slate-500
const GLOW_1 = "#6b7280"; // slate-500
const GLOW_2 = "#111827"; // slate-900
const GLOW_3 = "#374151"; // slate-700
const GLOW_4 = "#000000"; // black

// Matrix/code effect — 8×4 = 32 elements (down from 144), skipped on mobile
function MatrixCodeOverlay({ color = "#6b7280" }) {
  const COLS = 8;
  const ROWS = 4;
  const chars = "01ABCDEF";
  return (
    <div
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      style={{ mixBlendMode: "lighten", opacity: 0.09 }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: COLS }, (_, ci) =>
          Array.from({ length: ROWS }, (_, ri) => {
            const delay = ((ci * 0.3 + ri * 0.2) % 2).toFixed(2);
            const dur = (2.5 + (ci % 3) * 0.6).toFixed(2);
            const char = chars[(ci * 3 + ri * 5) % chars.length];
            return (
              <text
                key={`${ci}-${ri}`}
                x={6 + (ci * 88) / (COLS - 1)}
                y={12 + (ri * 76) / (ROWS - 1)}
                fill={color}
                fontSize="8"
                fontFamily="monospace"
                opacity={0.38 - ri * 0.06}
              >
                <animate
                  attributeName="y"
                  values={`0;${12 + (ri * 76) / (ROWS - 1)};100`}
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                />
                {char}
              </text>
            );
          })
        )}
      </svg>
    </div>
  );
}

export default function AnimatedPfp({
  size = 224, // default 224px (w-56)
  src = ASSETS.profile.pfp,
  alt = "Pranshu Rastogi",
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Reduced 3D tilt on mobile for better performance
  const rotateX = useTransform(y, [-100, 100], isMobile ? [8, -8] : [18, -18]);
  const rotateY = useTransform(x, [-100, 100], isMobile ? [-8, 8] : [-18, 18]);
  const shadowYVal = useTransform(y, [-100, 100], [-16, 32]);
  // Derive reactive boxShadow string from the MotionValue so it updates on mouse move
  const boxShadow = useTransform(
    shadowYVal,
    (sy) => `0px ${sy.toFixed(1)}px 48px 0px rgba(30,41,59,0.32)`
  );

  function handleMouseMove(e) {
    if (isMobile) return; // Disable mouse tracking on mobile
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px - rect.width / 2);
    y.set(py - rect.height / 2);
    setMouse({ x: px / rect.width, y: py / rect.height });
  }

  function handleMouseLeave() {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    setHovered(false);
    setMouse({ x: 0.5, y: 0.5 });
  }

  function handleMouseEnter() {
    if (isMobile) return;
    setHovered(true);
  }

  // Responsive size will be handled by parent container

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-full"
      style={{ perspective: isMobile ? 800 : 1200 }}
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
        style={{ rotateX, rotateY, boxShadow }}
        animate={{
          y: [0, -10, 0, 10, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Matrix code effect — skipped on mobile for performance */}
        {!isMobile && <MatrixCodeOverlay />}
        <OptimizedImage
          src={src}
          alt={`${alt} - Blockchain engineer and Web3 developer profile picture`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
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
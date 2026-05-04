"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";

// Deterministic LCG — avoids random mismatch between renders
function lcgRand(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const rand = lcgRand(20240101);
const STARS = Array.from({ length: 200 }, (_, i) => ({
  cx: rand() * 100,
  cy: rand() * 100,
  r: rand() * 1.5 + 0.2,
  opacity: rand() * 0.55 + 0.07,
  twinkleClass: i % 5 === 0
    ? `star-twinkle-${(i % 5) + 1}`
    : i % 7 === 0
      ? `star-twinkle-${(i % 3) + 2}`
      : "",
}));

// Fixed constellation groups — three small star clusters
const CONSTELLATIONS = [
  {
    stars: [
      { x: 10, y: 7 }, { x: 16, y: 4 }, { x: 23, y: 9 },
      { x: 20, y: 17 }, { x: 13, y: 19 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2]],
  },
  {
    stars: [
      { x: 74, y: 9 }, { x: 81, y: 5 }, { x: 89, y: 11 },
      { x: 86, y: 21 }, { x: 77, y: 18 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
  },
  {
    stars: [
      { x: 44, y: 63 }, { x: 52, y: 58 }, { x: 61, y: 65 },
      { x: 57, y: 74 }, { x: 48, y: 71 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3]],
  },
];

export default function ShootingStarsBackground() {
  return (
    <>
      {/* ── Nebula layers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Upper-left purple nebula */}
        <div
          className="absolute animate-nebula-pulse"
          style={{
            top: "-18%",
            left: "-12%",
            width: "58%",
            height: "58%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(159,78,255,0.08) 0%, rgba(100,40,210,0.04) 45%, transparent 70%)",
            filter: "blur(64px)",
          }}
        />

        {/* Lower-right cyan nebula */}
        <div
          className="absolute animate-nebula-pulse-slow"
          style={{
            bottom: "-12%",
            right: "-10%",
            width: "52%",
            height: "52%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(0,245,255,0.065) 0%, rgba(0,140,210,0.03) 45%, transparent 70%)",
            filter: "blur(56px)",
          }}
        />

        {/* Centre deep-indigo nebula */}
        <div
          className="absolute animate-nebula-drift"
          style={{
            top: "22%",
            left: "32%",
            width: "38%",
            height: "44%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(75,25,190,0.045) 0%, transparent 70%)",
            filter: "blur(72px)",
          }}
        />

        {/* Aurora strip at top */}
        <div
          className="absolute top-0 left-0 right-0 animate-aurora"
          style={{
            height: "28%",
            background:
              "linear-gradient(180deg, rgba(159,78,255,0.045) 0%, rgba(0,245,255,0.025) 55%, transparent 100%)",
            filter: "blur(22px)",
          }}
        />

        {/* Subtle radial centre glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 90%, rgba(20,8,50,0.35) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Star field + constellations ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Constellation lines */}
        {CONSTELLATIONS.map((c, ci) =>
          c.lines.map(([a, b], li) => (
            <line
              key={`cl-${ci}-${li}`}
              x1={`${c.stars[a].x}%`}
              y1={`${c.stars[a].y}%`}
              x2={`${c.stars[b].x}%`}
              y2={`${c.stars[b].y}%`}
              stroke="rgba(159,78,255,0.14)"
              strokeWidth="0.6"
              strokeDasharray="3 5"
            />
          ))
        )}

        {/* Background stars */}
        {STARS.map((star, i) => (
          <circle
            key={i}
            cx={`${star.cx}%`}
            cy={`${star.cy}%`}
            r={star.r}
            fill="white"
            opacity={star.opacity}
            className={star.twinkleClass}
          />
        ))}

        {/* Constellation anchor stars — brighter */}
        {CONSTELLATIONS.flatMap((c, ci) =>
          c.stars.map((star, si) => (
            <circle
              key={`cs-${ci}-${si}`}
              cx={`${star.x}%`}
              cy={`${star.y}%`}
              r={1.9}
              fill="rgba(215,195,255,0.82)"
              className={`star-twinkle-${((ci * 5 + si) % 5) + 1}`}
            />
          ))
        )}
      </svg>

      {/* ── Shooting stars ── */}
      <ShootingStars
        starColor="#9F4EFF"
        trailColor="#00F5FF"
        minSpeed={15}
        maxSpeed={35}
        minDelay={1500}
        maxDelay={4000}
      />
      <ShootingStars
        starColor="#00F5FF"
        trailColor="#39FF9E"
        minSpeed={10}
        maxSpeed={25}
        minDelay={2000}
        maxDelay={5000}
      />
      <ShootingStars
        starColor="#39FF9E"
        trailColor="#9F4EFF"
        minSpeed={8}
        maxSpeed={18}
        minDelay={3000}
        maxDelay={7000}
      />
    </>
  );
}

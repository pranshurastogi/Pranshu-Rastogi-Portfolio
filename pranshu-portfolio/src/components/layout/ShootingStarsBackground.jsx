"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";

function StaticStars() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_80%)]" />
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 120 }).map((_, i) => (
          <circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r={Math.random() * 1.2 + 0.3}
            fill="white"
            opacity={Math.random() * 0.5 + 0.1}
          />
        ))}
      </svg>
    </div>
  );
}

export default function ShootingStarsBackground() {
  return (
    <>
      <StaticStars />
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
    </>
  );
}

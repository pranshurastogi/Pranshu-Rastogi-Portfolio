// src/components/CareerTimeline.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaMapPin } from "react-icons/fa";

const careerEvents = [
  {
    title: "Head of Ecosystem & Integrations",
    company: "Push Protocol (formerly EPNS)",
    period: "Apr 2023 – Present",
  },
  {
    title: "VP of Engineering",
    company: "Push Protocol (formerly EPNS)",
    period: "Nov 2021 – May 2023",
  },
  {
    title: "Software Engineer",
    company: "Dhiway",
    period: "Aug 2020 – Sep 2021",
  },
  {
    title: "Software Engineer (Blockchain)",
    company: "Terse Software Pvt. Ltd.",
    period: "Apr 2019 – Jul 2020",
  },
];

const colors = ["#E53E3E", "#DD6B20", "#38A169", "#805AD5"];

export default function CareerTimeline() {
  const pathRef = useRef(null);
  const [points, setPoints] = useState([]);

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
      console.warn("Failed to compute timeline points:", err);
      setPoints([]); 
    }
  }, []);

  return (
    <section id="career" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Career Progress
        </h2>

        <div className="overflow-x-auto -mx-4 px-4">
          {/* Make the inner timeline wider so endpoints aren’t clipped */}
          <div className="relative w-[1100px] h-64 sm:h-80 mx-auto">
            <svg
              viewBox="0 0 1100 200"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4A5568" />
                  <stop offset="100%" stopColor="#2D3748" />
                </linearGradient>
              </defs>

              {/* Thick road */}
              <path
                d="M20,100 C200,100 200,20 400,20 S700,180 1080,180"
                fill="none"
                stroke="url(#roadGrad)"
                strokeWidth="20"
                strokeLinecap="round"
              />

              {/* Dashed center line */}
              <motion.path
                ref={pathRef}
                d="M20,100 C200,100 200,20 400,20 S700,180 1080,180"
                fill="none"
                stroke="#EDF2F7"
                strokeWidth="4"
                strokeDasharray="15,10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Fallback if something went wrong */}
            {points.length !== careerEvents.length && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Loading timeline…
              </div>
            )}

            {points.map((pt, idx) => {
              const color = colors[idx % colors.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1 + idx * 0.3,
                    type: "spring",
                    stiffness: 120,
                  }}
                  className="absolute flex flex-col items-center text-center"
                  style={{
                    left: `${(pt.x / 1100) * 100}%`,
                    top: `${(pt.y / 200) * 100}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  {/* Colored pin */}
                  <FaMapPin
                    size={28}
                    style={{ color, textShadow: "0 0 4px rgba(0,0,0,0.3)" }}
                  />

                  {/* Callout */}
                  <div
                    className="mt-1 bg-white p-3 rounded-lg shadow-lg max-w-xs"
                    style={{
                      transform: `rotate(${pt.angle}deg)`,
                      borderLeft: `4px solid ${color}`,
                    }}
                  >
                    <h4 className="text-sm font-semibold">
                      {careerEvents[idx].title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {careerEvents[idx].company}
                    </p>
                    <p className="text-xs text-gray-500">
                      {careerEvents[idx].period}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

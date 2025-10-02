"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaEthereum } from "react-icons/fa";

// Animated SVG background (hexes + mesh + ETH icon)
function TweetsGalleryBg() {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      {/* drifting hexagons */}
      {[...Array(8)].map((_, i) => (
        <polygon
          key={i}
          points="30,5 55,20 55,50 30,65 5,50 5,20"
          fill="#805AD5"
          opacity="0.07"
          style={{
            transform: `translate(${i * 13 + 5}vw, ${i % 2 === 0 ? 12 : 32}vh) scale(${0.7 + 0.1 * (i % 3)})`,
          }}
        >
          <animate
            attributeName="opacity"
            values="0.07;0.13;0.07"
            dur={`${7 + i}s`}
            repeatCount="indefinite"
          />
        </polygon>
      ))}
      {/* mesh line */}
      <polyline
        points="0,100 200,120 400,80 600,140 800,100"
        fill="none"
        stroke="#38A169"
        strokeOpacity="0.04"
        strokeWidth="2"
      />
      {/* floating Ethereum icon */}
      <g>
        <FaEthereum style={{ position: 'absolute', left: '90%', top: '10%', fontSize: 32, color: '#627EEA', opacity: 0.13 }} />
      </g>
    </svg>
  );
}

export default function TweetsSection({ tweets = [], limit = 6 }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Only load the Twitter widget script when section is visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const loadWidgets = () => {
      if (window.twttr?.ready) {
        window.twttr.ready((twttr) => {
          if (containerRef.current) twttr.widgets.load(containerRef.current);
        });
      } else if (window.twttr?.widgets && containerRef.current) {
        window.twttr.widgets.load(containerRef.current);
      }
    };

    if (typeof window !== 'undefined') {
      const existing = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = loadWidgets;
        document.body.appendChild(script);
      } else {
        loadWidgets();
      }
    }
  }, [isVisible, tweets, limit]);

  const visibleTweets = tweets.slice(0, limit);

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 px-4 rounded-2xl bg-[#181a20] border-2 border-[#2d3748] shadow-lg overflow-hidden my-8">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-8 text-[#AEEA00] drop-shadow-lg">
          My Tweets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {isVisible && visibleTweets.map((url, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl overflow-hidden shadow-xl bg-black/80 border-2 border-[#39FF14] group transition-all duration-300 p-1 backdrop-blur"
              whileHover={{ boxShadow: '0 0 32px #39FF14', scale: 1.04 }}
            >
              {/* Floating Ethereum icon on hover */}
              <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#39FF14] animate-bounce text-2xl z-10 pointer-events-none">
                <FaEthereum />
              </span>
              <blockquote className="twitter-tweet min-h-[350px]">
                <a href={url}></a>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-bounce { animation: bounce 1.6s infinite alternate; }
        @keyframes bounce { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }
      `}</style>
    </section>
  );
} 
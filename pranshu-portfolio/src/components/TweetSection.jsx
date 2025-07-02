"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    // Always reload widgets after tweets change
    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [tweets, limit]);

  return (
    <section id="tweets" className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <TweetsGalleryBg />
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-primary text-center mb-8">
          My Tweets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {tweets.slice(0, limit).map((url, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl overflow-hidden shadow-xl bg-white/70 border-2 border-indigo-100 group transition-all duration-300 p-1 backdrop-blur"
              whileHover={{ boxShadow: '0 0 32px #805AD5', scale: 1.04 }}
            >
              {/* Floating Ethereum icon on hover */}
              <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 animate-bounce text-2xl z-10 pointer-events-none">
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
        .animate-bounce {
          animation: bounce 1.6s infinite alternate;
        }
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
} 
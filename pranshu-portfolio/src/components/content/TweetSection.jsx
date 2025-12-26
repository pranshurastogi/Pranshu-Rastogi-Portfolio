"use client";

import { useEffect, useRef, useState, useMemo } from "react";
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

// Utility function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Utility function to get random number between min and max (inclusive)
function getRandomCount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function TweetsSection({ tweets = [], minCount = 6, maxCount = 9 }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [widgetsLoaded, setWidgetsLoaded] = useState(false);

  // Memoize random selection to prevent re-shuffling on re-renders
  const selectedTweets = useMemo(() => {
    if (!tweets || tweets.length === 0) return [];
    
    // Validate tweet URLs (support both twitter.com and x.com)
    const validTweets = tweets.filter(url => {
      try {
        return typeof url === 'string' && 
               (url.includes('twitter.com') || url.includes('x.com')) && 
               url.includes('/status/');
      } catch {
        return false;
      }
    });

    if (validTweets.length === 0) {
      console.warn('No valid tweet URLs provided');
      return [];
    }

    // Shuffle and select random count
    const shuffled = shuffleArray(validTweets);
    const count = Math.min(
      getRandomCount(minCount, maxCount),
      shuffled.length
    );
    
    return shuffled.slice(0, count);
  }, [tweets, minCount, maxCount]);

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

  // Load Twitter widgets with error handling
  useEffect(() => {
    if (!isVisible || selectedTweets.length === 0) return;

    const loadWidgets = () => {
      try {
        if (window.twttr?.ready) {
          window.twttr.ready((twttr) => {
            if (containerRef.current) {
              twttr.widgets.load(containerRef.current).catch((err) => {
                console.error('Error loading Twitter widgets:', err);
                setLoadingError(true);
              });
            }
          });
        } else if (window.twttr?.widgets && containerRef.current) {
          window.twttr.widgets.load(containerRef.current).catch((err) => {
            console.error('Error loading Twitter widgets:', err);
            setLoadingError(true);
          });
        }
        setWidgetsLoaded(true);
      } catch (error) {
        console.error('Error in loadWidgets:', error);
        setLoadingError(true);
      }
    };

    if (typeof window === 'undefined') return;

    // Check if script already exists
    const existing = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onerror = () => {
        console.error('Failed to load Twitter widgets script');
        setLoadingError(true);
      };
      script.onload = () => {
        // Add timeout to prevent hanging
        const timeout = setTimeout(() => {
          if (!widgetsLoaded) {
            console.warn('Twitter widgets loading timeout');
            setLoadingError(true);
          }
        }, 10000); // 10 second timeout

        loadWidgets();
        clearTimeout(timeout);
      };
      
      document.body.appendChild(script);
    } else {
      // Script exists, try to load widgets
      if (window.twttr) {
        loadWidgets();
      } else {
        // Wait for script to be ready
        const checkInterval = setInterval(() => {
          if (window.twttr) {
            clearInterval(checkInterval);
            loadWidgets();
          }
        }, 100);
        
        // Clear interval after 5 seconds
        setTimeout(() => clearInterval(checkInterval), 5000);
      }
    }
  }, [isVisible, selectedTweets.length, widgetsLoaded]);

  // Error state
  if (loadingError && selectedTweets.length === 0) {
    return (
      <section className="relative py-16 md:py-24 px-4 rounded-2xl bg-[#181a20] border-2 border-[#2d3748] shadow-lg overflow-hidden my-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#AEEA00]">Unable to load tweets at this time. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 px-4 rounded-2xl bg-[#181a20] border-2 border-[#2d3748] shadow-lg overflow-hidden my-8">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-8 text-[#AEEA00] drop-shadow-lg">
          My Tweets
        </h3>
        
        {selectedTweets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No tweets available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {isVisible && selectedTweets.map((url, i) => (
              <motion.div
                key={`${url}-${i}`}
                className="relative rounded-2xl overflow-hidden shadow-xl bg-black/80 border-2 border-[#39FF14] group transition-all duration-300 p-1 backdrop-blur"
                whileHover={{ boxShadow: '0 0 32px #39FF14', scale: 1.04 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Floating Ethereum icon on hover */}
                <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#39FF14] animate-bounce text-2xl z-10 pointer-events-none">
                  <FaEthereum />
                </span>
                <blockquote className="twitter-tweet min-h-[350px]" data-theme="dark">
                  <a href={url} target="_blank" rel="noopener noreferrer"></a>
                </blockquote>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .animate-bounce { animation: bounce 1.6s infinite alternate; }
        @keyframes bounce { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }
      `}</style>
    </section>
  );
}

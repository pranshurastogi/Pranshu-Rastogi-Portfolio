"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomCount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function TweetsSection({ tweets = [], minCount = 6, maxCount = 9 }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [widgetsLoaded, setWidgetsLoaded] = useState(false);

  const selectedTweets = useMemo(() => {
    if (!tweets || tweets.length === 0) return [];
    const validTweets = tweets.filter((url) => {
      try {
        return (
          typeof url === "string" &&
          (url.includes("twitter.com") || url.includes("x.com")) &&
          url.includes("/status/")
        );
      } catch {
        return false;
      }
    });
    if (validTweets.length === 0) return [];
    const shuffled = shuffleArray(validTweets);
    const count = Math.min(getRandomCount(minCount, maxCount), shuffled.length);
    return shuffled.slice(0, count);
  }, [tweets, minCount, maxCount]);

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
      { threshold: 0.05, rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || selectedTweets.length === 0) return;

    const loadWidgets = () => {
      try {
        if (window.twttr?.ready) {
          window.twttr.ready((twttr) => {
            if (containerRef.current) {
              twttr.widgets.load(containerRef.current).catch(() => setLoadingError(true));
            }
          });
        } else if (window.twttr?.widgets && containerRef.current) {
          window.twttr.widgets.load(containerRef.current).catch(() => setLoadingError(true));
        }
        setWidgetsLoaded(true);
      } catch {
        setLoadingError(true);
      }
    };

    if (typeof window === "undefined") return;

    const existing = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onerror = () => setLoadingError(true);
      script.onload = () => {
        const timeout = setTimeout(() => {
          if (!widgetsLoaded) setLoadingError(true);
        }, 10000);
        loadWidgets();
        clearTimeout(timeout);
      };
      document.body.appendChild(script);
    } else {
      if (window.twttr) {
        loadWidgets();
      } else {
        const checkInterval = setInterval(() => {
          if (window.twttr) {
            clearInterval(checkInterval);
            loadWidgets();
          }
        }, 100);
        setTimeout(() => clearInterval(checkInterval), 5000);
      }
    }
  }, [isVisible, selectedTweets.length, widgetsLoaded]);

  if (loadingError && selectedTweets.length === 0) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="bg-[var(--bg-secondary)] border border-white/[0.06] rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-[var(--text-muted)]">Unable to load tweets at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Tweets
          </h2>
          <div className="section-divider mb-4" />
          <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
            Thoughts and updates from the Web3 ecosystem.
          </p>
        </motion.div>

        {selectedTweets.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-[var(--bg-secondary)] border border-white/[0.06] rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-[var(--text-muted)]">No tweets available at the moment.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {isVisible &&
              selectedTweets.map((url, i) => (
                <motion.div
                  key={`${url}-${i}`}
                  className="rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-white/[0.06] hover:border-[var(--accent-purple)]/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <blockquote className="twitter-tweet min-h-[350px]" data-theme="dark">
                    <a href={url} target="_blank" rel="noopener noreferrer"></a>
                  </blockquote>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

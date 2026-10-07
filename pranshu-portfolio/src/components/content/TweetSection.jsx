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

function tweetHandle(url) {
  try {
    return new URL(url).pathname.split("/")[1] || "x";
  } catch {
    return "x";
  }
}

const WIDGETS_SRC = "https://platform.twitter.com/widgets.js";

/** Load X's widgets.js once; resolves with window.twttr or rejects if blocked/slow. */
function loadTwitterWidgets(timeoutMs = 8000) {
  if (window.twttr?.widgets) return Promise.resolve(window.twttr);
  return new Promise((resolve, reject) => {
    let script = document.querySelector(`script[src="${WIDGETS_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = WIDGETS_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    const timer = setTimeout(() => reject(new Error("widgets.js timeout")), timeoutMs);
    const done = () => {
      clearTimeout(timer);
      window.twttr?.widgets ? resolve(window.twttr) : reject(new Error("twttr missing"));
    };
    script.addEventListener("load", done, { once: true });
    script.addEventListener("error", () => { clearTimeout(timer); reject(new Error("widgets.js blocked")); }, { once: true });
  });
}

export default function TweetsSection({ tweets = [], minCount = 6, maxCount = 9 }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const selectedTweets = useMemo(() => {
    const validTweets = (tweets || []).filter(
      (url) =>
        typeof url === "string" &&
        (url.includes("twitter.com") || url.includes("x.com")) &&
        url.includes("/status/")
    );
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

  // Upgrade the fallback cards into embeds. If X is blocked or slow, the
  // fallback link cards simply stay — never an empty grid.
  useEffect(() => {
    if (!isVisible || selectedTweets.length === 0) return;
    let cancelled = false;
    loadTwitterWidgets()
      .then((twttr) => {
        if (!cancelled && containerRef.current) twttr.widgets.load(containerRef.current);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isVisible, selectedTweets.length]);

  if (selectedTweets.length === 0) return null;

  return (
    <section ref={containerRef} className="py-16 md:py-24" aria-labelledby="tweets-heading">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="tweets-heading" className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Tweets
          </h2>
          <div className="section-divider mb-4" />
          <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
            Thoughts and updates from the Web3 ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {isVisible &&
            selectedTweets.map((url, i) => {
              const handle = tweetHandle(url);
              return (
                <motion.div
                  key={`${url}-${i}`}
                  className="rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-white/[0.06] hover:border-[var(--accent-purple)]/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {/* widgets.js replaces this blockquote with the embed; until then it is a real link card */}
                  <blockquote className="twitter-tweet !m-0 p-5" data-theme="dark" data-dnt="true">
                    <p className="text-sm text-[var(--text-secondary)] mb-3">
                      Post by <span className="text-[var(--text-primary)] font-medium">@{handle}</span>
                    </p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-purple-text)] hover:underline"
                    >
                      View post on X <span aria-hidden="true">→</span>
                    </a>
                  </blockquote>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

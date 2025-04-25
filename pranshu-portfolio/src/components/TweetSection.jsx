// src/components/TweetsSection.jsx
"use client";

import { useEffect } from "react";

export default function TweetsSection({ tweets = [] }) {
  useEffect(() => {
    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="tweets" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-primary text-center mb-8">
          Posts that you may like
        </h3>

        {/* 3-column responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tweets.slice(0, 6).map((url, i) => (
            <blockquote key={i} className="twitter-tweet">
              <a href={url}></a>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// src/components/BlogList.jsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Animations
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Helper to pull first <img> out of HTML
function extractFirstImage(html = "") {
  try {
    const m = html.match(/<img.*?src=["']([^"']+)["']/i);
    return m ? m[1] : null;
  } catch (e) {
    console.error("Failed to extract image from HTML:", e);
    return null;
  }
}

export default function BlogList({ posts = [] }) {
  // early handling of missing or empty posts
  if (!Array.isArray(posts) || posts.length === 0) {
    console.warn("BlogList: no posts to display", posts);
    return (
      <section id="blog" className="py-16 bg-base-100">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <h3 className="text-3xl font-semibold mb-4 text-primary">
            Latest Blog Posts
          </h3>
          <p>No blog posts available at the moment. Please check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-8 text-primary">
          Latest Blog Posts
        </h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {posts.map((post) => {
            let imgSrc;
            try {
              imgSrc = post.enclosure?.url || extractFirstImage(post.content);
            } catch (e) {
              console.error("Error determining image URL for post", post, e);
              imgSrc = null;
            }

            return (
              <motion.div
                key={post.link}
                variants={item}
                whileHover={{ scale: 1.03, rotate: 1 }}
                className="card bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {imgSrc && (
                    <div className="relative w-full h-48">
                      <Image
                        src={imgSrc}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        onError={(e) =>
                          console.error("Next/Image failed to load", imgSrc)
                        }
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-lg font-medium text-secondary mb-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                      {new Date(post.isoDate).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

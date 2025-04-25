// src/components/BlogList.jsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Animations
const container = { hidden: {}, show: { transition: { staggerChildren: 0.2 } } };
const item = {
  hidden: { opacity: 0, y: 30, rotate: -2 },
  show:  { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function extractFirstImage(html = "") {
  const m = html.match(/<img.*?src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

export default function BlogList({ posts }) {
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
            const imgSrc = post.enclosure?.url || extractFirstImage(post.content);
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

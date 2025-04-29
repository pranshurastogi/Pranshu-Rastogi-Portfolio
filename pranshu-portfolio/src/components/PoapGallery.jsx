// src/components/PoapGallery.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PoapGallery({ address, limit }) {
  const [poaps, setPoaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPoaps() {
      try {
        setLoading(true);
        setError("");
        // Official POAP API endpoint :contentReference[oaicite:2]{index=2}
        const res = await fetch(`/api/poaps/${address}`, { signal });
        if (!res.ok) {
          // If the API host is wrong (e.g. .xyz vs .tech) you'll see a CORS or 4xx/5xx here :contentReference[oaicite:3]{index=3}
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        setPoaps(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Failed to fetch POAPs:", err);
        setError("Could not load POAPs. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchPoaps();
    return () => controller.abort();
  }, [address]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 text-red-700 rounded-lg text-center">
        {error}
      </div>
    );
  }

  if (poaps.length === 0) {
    return (
      <p className="text-center py-12 text-gray-600">No POAPs found.</p>
    );
  }

  // Limit to `limit` items if provided
  const items = limit ? poaps.slice(0, limit) : poaps;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {items.map((poap, i) => (
        <motion.a
          key={poap.id}
          href={poap.event.event_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg overflow-hidden shadow-lg bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <div className="relative w-full h-40">
            <Image
              src={`${poap.event.image_url}?size=small`}
              alt={poap.event.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-lg">{poap.event.name}</h4>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(poap.minted_date).toLocaleDateString()}
            </p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

// src/components/PoapGallery.jsx
"use client";

import { useEffect, useState } from "react";
import OptimizedImage from "../ui/OptimizedImage";
import { motion } from "framer-motion";
import SectionDivider from "../ui/SectionDivider";

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
        const res = await fetch(`/api/poaps/${address}`, { signal: controller.signal });
        if (!res.ok) {
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
      <>
        <SectionDivider />
        <section className="py-20 bg-[var(--bg-secondary)] relative w-full min-h-[60vh] flex flex-col justify-center items-center">
          <div className="container mx-auto px-4">
            <div className="p-6 bg-[var(--bg-primary)]/80 text-[var(--accent-lime)] rounded-lg text-center border border-white/[0.06]">
              {error}
            </div>
          </div>
        </section>
        <SectionDivider />
      </>
    );
  }

  if (poaps.length === 0) {
    return (
      <>
        <SectionDivider />
        <section className="py-20 bg-[var(--bg-secondary)] relative w-full min-h-[60vh] flex flex-col justify-center items-center">
          <div className="container mx-auto px-4">
            <p className="text-center py-12 text-[var(--accent-lime)] bg-[var(--bg-primary)]/80 rounded-xl border border-white/[0.06]">No POAPs found.</p>
          </div>
        </section>
        <SectionDivider />
      </>
    );
  }

  // Limit to `limit` items if provided
  const items = limit ? poaps.slice(0, limit) : poaps;

  return (
    <>
      <SectionDivider />
      <section className="py-20 bg-[var(--bg-secondary)] relative w-full min-h-[60vh] flex flex-col justify-center items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {items.map((poap, i) => (
              <motion.a
                key={poap.id}
                href={poap.event.event_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden shadow-lg bg-[var(--bg-primary)]/80 border border-white/[0.06] hover:border-[var(--accent-purple)]/40 transition relative group"
                initial={{ opacity: 0, y: 60, scale: 0.9, rotate: -4 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.12, type: 'spring', stiffness: 120 }}
                whileHover={{ scale: 1.04 }}
              >
                <div className="relative w-full h-40">
                  <OptimizedImage
                    src={`${poap.event.image_url}?size=small`}
                    alt={`${poap.event.name} - POAP`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-[var(--accent-lime)]">{poap.event.name}</h4>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    {new Date(poap.minted_date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider />
    </>
  );
}

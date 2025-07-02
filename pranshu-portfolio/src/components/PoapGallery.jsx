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
      <>
        {/* Blockchain section divider (top) */}
        <div className="w-full flex justify-center items-center py-2">
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="animate-pulse">
            <rect x="0" y="8" width="40" height="8" rx="4" fill="#39FF14" opacity="0.18" />
            <rect x="40" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
            <rect x="56" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
            <rect x="72" y="10" width="8" height="4" rx="2" fill="#a259ff" />
            <rect x="88" y="8" width="32" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          </svg>
        </div>
        <section className="py-20 bg-gradient-to-br from-[#0f2027] to-[#232526] relative w-full min-h-[60vh] flex flex-col justify-center items-center">
          <div className="container mx-auto px-4">
            <div className="p-6 bg-black/80 text-[#AEEA00] rounded-lg text-center border border-[#39FF14]">
              {error}
            </div>
          </div>
        </section>
        {/* Blockchain section divider (bottom) */}
        <div className="w-full flex justify-center items-center py-2">
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="animate-pulse">
            <rect x="0" y="8" width="40" height="8" rx="4" fill="#39FF14" opacity="0.18" />
            <rect x="40" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
            <rect x="56" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
            <rect x="72" y="10" width="8" height="4" rx="2" fill="#a259ff" />
            <rect x="88" y="8" width="32" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          </svg>
        </div>
      </>
    );
  }

  if (poaps.length === 0) {
    return (
      <>
        {/* Blockchain section divider (top) */}
        <div className="w-full flex justify-center items-center py-2">
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="animate-pulse">
            <rect x="0" y="8" width="40" height="8" rx="4" fill="#39FF14" opacity="0.18" />
            <rect x="40" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
            <rect x="56" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
            <rect x="72" y="10" width="8" height="4" rx="2" fill="#a259ff" />
            <rect x="88" y="8" width="32" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          </svg>
        </div>
        <section className="py-20 bg-gradient-to-br from-[#0f2027] to-[#232526] relative w-full min-h-[60vh] flex flex-col justify-center items-center">
          <div className="container mx-auto px-4">
            <p className="text-center py-12 text-[#AEEA00] bg-black/80 rounded-xl border border-[#39FF14]">No POAPs found.</p>
          </div>
        </section>
        {/* Blockchain section divider (bottom) */}
        <div className="w-full flex justify-center items-center py-2">
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="animate-pulse">
            <rect x="0" y="8" width="40" height="8" rx="4" fill="#39FF14" opacity="0.18" />
            <rect x="40" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
            <rect x="56" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
            <rect x="72" y="10" width="8" height="4" rx="2" fill="#a259ff" />
            <rect x="88" y="8" width="32" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          </svg>
        </div>
      </>
    );
  }

  // Limit to `limit` items if provided
  const items = limit ? poaps.slice(0, limit) : poaps;

  return (
    <>
      {/* Blockchain section divider (top) */}
      <div className="w-full flex justify-center items-center py-2">
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="animate-pulse">
          <rect x="0" y="8" width="40" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          <rect x="40" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
          <rect x="56" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
          <rect x="72" y="10" width="8" height="4" rx="2" fill="#a259ff" />
          <rect x="88" y="8" width="32" height="8" rx="4" fill="#39FF14" opacity="0.18" />
        </svg>
      </div>
      <section className="py-20 bg-gradient-to-br from-[#0f2027] to-[#232526] relative w-full min-h-[60vh] flex flex-col justify-center items-center">
        {/* Blockchain mesh/cubes background */}
        <svg width="100%" height="100%" className="absolute inset-0 w-full h-full pointer-events-none select-none z-0" style={{top:0,left:0}}>
          <g>
            <rect x="12%" y="38%" width="24" height="24" rx="6" fill="#00ff99" opacity="0.10">
              <animate attributeName="y" values="38%;48%;38%" dur="8s" repeatCount="indefinite" />
            </rect>
            <rect x="82%" y="62%" width="28" height="28" rx="7" fill="#39FF14" opacity="0.10">
              <animate attributeName="y" values="62%;72%;62%" dur="10s" repeatCount="indefinite" />
            </rect>
            <rect x="52%" y="22%" width="18" height="18" rx="5" fill="#00e0ff" opacity="0.09">
              <animate attributeName="y" values="22%;32%;22%" dur="12s" repeatCount="indefinite" />
            </rect>
            <polyline points="0,40 100,60 200,20 300,65 400,40 500,70 600,60 700,80" fill="none" stroke="#AEEA00" strokeOpacity="0.06" strokeWidth="2">
              <animate attributeName="points" values="0,40 100,60 200,20 300,65 400,40 500,70 600,60 700,80;0,45 100,65 200,25 300,70 400,45 500,75 600,65 700,85;0,40 100,60 200,20 300,65 400,40 500,70 600,60 700,80" dur="14s" repeatCount="indefinite" />
            </polyline>
          </g>
        </svg>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {items.map((poap, i) => (
              <motion.a
                key={poap.id}
                href={poap.event.event_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden shadow-lg bg-black/80 border-2 border-[#39FF14] hover:shadow-[#AEEA00] transition relative group"
                initial={{ opacity: 0, y: 60, scale: 0.9, rotate: -4 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.12, type: 'spring', stiffness: 120 }}
                whileHover={{ scale: 1.06, boxShadow: '0 0 32px #39FF14' }}
              >
                {/* Blockchain SVG element */}
                <svg className="absolute -top-4 left-1/2 -translate-x-1/2 z-10" width="60" height="24" viewBox="0 0 60 24" fill="none">
                  <rect x="0" y="8" width="60" height="8" rx="4" fill="#39FF14" opacity="0.13" />
                  <rect x="20" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
                  <rect x="36" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
                </svg>
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
                  <h4 className="font-semibold text-lg text-[#AEEA00]">{poap.event.name}</h4>
                  <p className="text-sm text-[#39FF14] mt-1">
                    {new Date(poap.minted_date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                  </p>
                </div>
                {/* Animated mining effect */}
                <span className="absolute top-3 right-3 text-[#39FF14] animate-pulse text-xl z-20 group-hover:opacity-100 opacity-0 transition-opacity">⛏️</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      {/* Blockchain section divider (bottom) */}
      <div className="w-full flex justify-center items-center py-2">
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="animate-pulse">
          <rect x="0" y="8" width="40" height="8" rx="4" fill="#39FF14" opacity="0.18" />
          <rect x="40" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
          <rect x="56" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
          <rect x="72" y="10" width="8" height="4" rx="2" fill="#a259ff" />
          <rect x="88" y="8" width="32" height="8" rx="4" fill="#39FF14" opacity="0.18" />
        </svg>
      </div>
    </>
  );
}

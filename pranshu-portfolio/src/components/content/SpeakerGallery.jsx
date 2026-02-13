// src/components/content/SpeakerGallery.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import { CircularGallery } from "../ui/CircularGallery";

const SPEAKERS_RAW = [
  { src: "/images/pg-bangkok.JPG", name: "ETHGlobal Bangkok booth" },
  { src: "/images/pg-bangkok-2.jpg", name: "ETHGlobal Bangkok Push Protocol" },
  { src: "/images/pg-ethIndia.JPG", name: "ETHIndia Push protocol booth" },
  { src: "/images/pg-ETHGlobal-istanbul.jpg", name: "ETHGlobal Istanbul" },
  { src: "/images/pg-ethi.jpg", name: "ETHGlobal Istanbul" },
  { src: "/images/pg-Unfold.jpg", name: "Unfold X Push Protocol" },
  { src: "/images/pg-NFT-day-SKIT.JPG", name: "NFT Day - SKIT" },
  { src: "/images/pg-poly.jpg", name: "Polygon event" },
  { src: "/images/pg-coindcx.png", name: "Namaste Web3, CoinDCX X Forbes" },
  { src: "/images/pg-polygon-guild.png", name: "Polygon Guild, Blr" },
  { src: "/images/pg-google.png", name: "Google Cloud Web3 Conclave" },
  { src: "/images/pg-dtp.png", name: "Intro to web3 - DYP" },
  { src: "/images/pg-fipkart.JPG", name: "Polygon X Flipkart" },
  { src: "/images/pg-vietnam.png", name: "BUIDL ASIA, Vietnam" },
  { src: "/images/pg-w3c.jpeg", name: "Web3 Conf Goa" },
];

function toGalleryItems(speakers) {
  return speakers.map((s) => ({
    common: s.name,
    binomial: "",
    photo: {
      url: s.src.startsWith("http") ? s.src : s.src,
      text: s.name,
      pos: "center",
      by: "Pranshu Rastogi",
    },
  }));
}

export default function SpeakerGallery() {
  const sectionRef = useRef(null);
  const [radius, setRadius] = useState(720);
  const items = toGalleryItems(SPEAKERS_RAW);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 640 ? 420 : window.innerWidth < 1024 ? 560 : 720);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-20 bg-gradient-to-b from-zinc-950 via-zinc-900/95 to-zinc-950 relative overflow-hidden"
      aria-label="Speaker & event gallery"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 sm:mb-14 text-[#e9d5ff]">
          Gallery
        </h2>
        <div
          className="relative mx-auto w-full"
          style={{ minHeight: "min(85vw, 520px)", height: "min(85vw, 520px)" }}
        >
          <CircularGallery
            items={items}
            radius={radius}
            autoRotateSpeed={0.03}
            className="absolute inset-0"
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect, useRef, forwardRef } from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

/**
 * @param {Object} props
 * @param {Array}  props.items
 * @param {number} [props.radius=720]
 * @param {number} [props.autoRotateSpeed=0.02]
 * @param {"auto"|"scroll"} [props.mode="auto"]  - rotation source
 * @param {boolean} [props.paused=false]          - pause auto mode
 * @param {string}  [props.className]
 */
const CircularGallery = forwardRef(function CircularGallery(
  {
    items = [],
    className,
    radius = 720,
    autoRotateSpeed = 0.02,
    mode = "auto",
    paused = false,
    ...props
  },
  ref
) {
  const [rotation, setRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Scroll-driven mode
  useEffect(() => {
    if (mode !== "scroll") return;
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setRotation(scrollProgress * 360);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [mode]);

  // Auto-rotate mode
  useEffect(() => {
    if (mode !== "auto") return;
    if (paused) return;

    const autoRotate = () => {
      setRotation((prev) => prev + autoRotateSpeed);
      animationFrameRef.current = requestAnimationFrame(autoRotate);
    };
    animationFrameRef.current = requestAnimationFrame(autoRotate);
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mode, paused, autoRotateSpeed]);

  if (!items.length) return null;

  const anglePerItem = 360 / items.length;

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Circular 3D Gallery"
      className={cn(
        "relative w-full h-full flex items-center justify-center",
        className
      )}
      style={{ perspective: "2000px" }}
      {...props}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem;
          const totalRotation = rotation % 360;
          const relativeAngle = (itemAngle + totalRotation + 360) % 360;
          const normalizedAngle = Math.abs(
            relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
          );
          const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

          return (
            <div
              key={item.photo?.url ?? i}
              role="group"
              aria-label={item.common}
              className="absolute w-[220px] h-[300px] sm:w-[250px] sm:h-[340px]"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) translate(-50%, -50%)`,
                left: "50%",
                top: "50%",
                opacity,
                transition: "opacity 0.3s linear",
              }}
            >
              <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden border border-white/10 bg-zinc-900/70 backdrop-blur-lg">
                <img
                  src={item.photo?.url}
                  alt={item.photo?.text ?? item.common}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: item.photo?.pos || "center" }}
                />
                <div className="absolute bottom-0 left-0 right-0 min-h-[88px] p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent text-white flex flex-col justify-end">
                  <h2 className="text-sm sm:text-base font-bold leading-tight line-clamp-2 break-words">
                    {item.common}
                  </h2>
                  {item.binomial && (
                    <em className="text-xs italic opacity-80 mt-0.5">
                      {item.binomial}
                    </em>
                  )}
                  {item.photo?.by && (
                    <p className="text-xs mt-1.5 opacity-90 whitespace-nowrap truncate">
                      {item.photo.by}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

CircularGallery.displayName = "CircularGallery";
export { CircularGallery };

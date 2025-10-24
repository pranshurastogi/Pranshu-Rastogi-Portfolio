"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import particles with no SSR
const Particles = dynamic(() => import("react-tsparticles"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const loadFull = dynamic(() => import("tsparticles").then(mod => mod.loadFull), {
  ssr: false,
});

export default function ParticlesBackground() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const particlesInit = useCallback(async (engine) => {
    if (loadFull) {
      await loadFull(engine);
      setIsLoaded(true);
    }
  }, []);

  // Don't render particles until visible and loaded
  if (!isVisible || !isLoaded) {
    return <div ref={containerRef} className="w-full h-full" />;
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      <Particles
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "#ffffff00" } },
          fpsLimit: 30, // Reduced from 60 for better performance
          particles: {
            number: { 
              value: 25, // Reduced from 50
              density: { enable: true, area: 1200 } // Increased area for better distribution
            },
            color: { value: ["#4F46E5", "#F59E0B"] },
            shape: { type: "circle" },
            opacity: { 
              value: 0.4, // Reduced opacity
              animation: { enable: false } // Disable opacity animation
            },
            size: { 
              value: { min: 1, max: 3 }, // Reduced max size
              animation: { enable: false } // Disable size animation
            },
            move: { 
              enable: true, 
              speed: 1, // Reduced speed
              outModes: "bounce",
              direction: "none" // Prevent directional movement
            },
            // Disable expensive effects
            line_linked: { enable: false },
            collisions: { enable: false },
            repulse: { enable: false },
            grab: { enable: false },
            bubble: { enable: false },
            attract: { enable: false },
          },
          detectRetina: false, // Disable for better performance
          pauseOnBlur: true, // Pause when tab is not focused
          pauseOnOutsideViewport: true, // Pause when not visible
        }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}

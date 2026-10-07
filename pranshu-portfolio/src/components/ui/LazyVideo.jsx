"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted, looping preview video for cards. Shows the poster until the video is
 * on screen, then loads and plays it; pauses again off-screen. Users who prefer
 * reduced motion keep the poster only. Nothing is downloaded until visible
 * (`preload="none"`), so several previews on one page stay cheap.
 */
export default function LazyVideo({ src, poster, className = "", "aria-label": ariaLabel }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {}); // autoplay can be refused (e.g. data saver) — poster stays
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (failed && poster) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={ariaLabel || ""} className={className} loading="lazy" />;
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      aria-label={ariaLabel}
      onError={() => setFailed(true)}
    />
  );
}

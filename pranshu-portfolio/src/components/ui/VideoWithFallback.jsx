"use client";

import { useState } from "react";

/**
 * Local or remote video with a simple error fallback (broken file, codec, or network).
 */
export default function VideoWithFallback({
  src,
  className = "",
  muted,
  loop,
  playsInline,
  autoPlay,
  controls,
  poster,
  "aria-label": ariaLabel,
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1 bg-[var(--bg-secondary)] text-[var(--text-muted)] text-xs ${className}`}
        role="img"
        aria-label={ariaLabel || "Video unavailable"}
      >
        <span className="opacity-60">Video unavailable</span>
      </div>
    );
  }

  return (
    <video
      src={src}
      className={className}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      autoPlay={autoPlay}
      controls={controls}
      poster={poster}
      aria-label={ariaLabel}
      onError={() => setFailed(true)}
    />
  );
}

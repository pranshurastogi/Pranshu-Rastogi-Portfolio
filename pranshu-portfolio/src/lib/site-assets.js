/**
 * Canonical public URLs for static assets.
 * Update paths here when files move — avoid hardcoding `/images/...` across components.
 */

export const SITE_ORIGIN = "https://pranshurastogi.com";

/** @type {const} */
export const ASSETS = {
  profile: {
    /** Primary OG / hero / schema image */
    pfp: "/images/profile/pfp-current.png",
  },
  documents: {
    resume: "/documents/resume.pdf",
  },
};

/**
 * @param {string} path - Absolute path on this site (starts with `/`)
 * @returns {string} Full URL for metadata, JSON-LD, and social previews
 */
export function absoluteUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}

/**
 * URL of a local image served through Next's optimizer (resized WebP/AVIF).
 * Use where next/image can't be, e.g. <video poster>. `width` must be one of
 * next.config.mjs `images.deviceSizes`.
 */
export function optimizedImageSrc(src, width = 1080, quality = 75) {
  if (!src || src.startsWith("http") || src.startsWith("data:")) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

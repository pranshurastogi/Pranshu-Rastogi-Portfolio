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

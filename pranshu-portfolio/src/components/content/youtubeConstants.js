// YouTube section config – change here to show more/fewer videos
export const MAX_VIDEOS_DISPLAY = 5;
export const MIN_VIDEOS_DISPLAY = 5;

export const NEON_COLORS = ["var(--accent-lime)", "var(--accent-cyan)", "var(--accent-purple)", "var(--accent-lime)"];

export const FALLBACK_THUMB = "/images/fallback.jpg";

/**
 * @param {string} videoId - YouTube video ID
 * @param {'maxres' | 'hq'} quality - maxres = 1280x720, hq = 480x360
 * @returns {string} Thumbnail URL
 */
export function getThumbnailUrl(videoId, quality = "maxres") {
  if (!videoId) return FALLBACK_THUMB;
  const path = quality === "maxres" ? "maxresdefault" : "hqdefault";
  return `https://img.youtube.com/vi/${videoId}/${path}.jpg`;
}

/**
 * @param {Array<{ videoId: string; title: string }>} videos - Full list from feed
 * @returns {Array<{ videoId: string; title: string }>} Sliced list for display (5–7)
 */
export function getVisibleVideos(videos) {
  if (!Array.isArray(videos)) return [];
  return videos.slice(0, MAX_VIDEOS_DISPLAY);
}

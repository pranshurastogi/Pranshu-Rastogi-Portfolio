/**
 * Permanent redirects from historical URLs (bookmarks, social caches, external links)
 * to the modular layout under `public/images/*` and `public/documents/*`.
 *
 * When you add or rename files, append entries here if the old URL should keep working.
 */

/** @type {Record<string, string>} */
export const LEGACY_ASSET_REDIRECTS = {
  "/resume.pdf": "/documents/resume.pdf",

  "/images/pfp-current.png": "/images/profile/pfp-current.png",
  "/images/pfp.png": "/images/profile/pfp.png",
  "/images/pfp.jpg": "/images/profile/pfp.jpg",
  "/images/pfp_new.png": "/images/profile/pfp_new.png",

  "/images/kuku.png": "/images/featured/kuku.png",
  "/images/wtb.png": "/images/featured/wtb.png",
  "/images/lpu.png": "/images/featured/lpu.png",

  "/images/cover.png": "/images/archive/cover.png",
  "/images/project-ai-content-generator-2.png": "/images/archive/project-ai-content-generator-2.png",
  "/images/project-defi-dashboard-1.png": "/images/archive/project-defi-dashboard-1.png",
  "/images/project-e-commerce-platform-3.png": "/images/archive/project-e-commerce-platform-3.png",
  "/images/project-nft-marketplace-4.png": "/images/archive/project-nft-marketplace-4.png",

  // Projects (were at flat `/images/`)
  "/images/specter.png": "/images/projects/specter.png",
  "/images/specter-1.png": "/images/projects/specter-1.png",
  "/images/VAANTA-1.png": "/images/projects/VAANTA-1.png",
  "/images/VAANTA-2.png": "/images/projects/VAANTA-2.png",
  "/images/VAANTA-3.png": "/images/projects/VAANTA-3.png",
  "/images/alphiq-mov.mov": "/images/projects/alphiq-mov.mov",
  "/images/alphIQ-dashboard1.png": "/images/projects/alphIQ-dashboard1.png",
  "/images/alphIQ-dashboard-2.png": "/images/projects/AlphIQ-Dashboard-2.png",
  "/images/Bloom-ideas-1.png": "/images/projects/Bloom-ideas-1.png",
  "/images/Bloom-ideas-2.png": "/images/projects/Bloom-ideas-2.png",
  "/images/Bloom-ideas-3.gif": "/images/projects/Bloom-ideas-3.gif",
  "/images/alphiq-admin-1.png": "/images/projects/alphiq-admin-1.png",
  "/images/alphiq-admin-2.png": "/images/projects/alphiq-admin-2.png",
  "/images/alphiq-admin-3.gif": "/images/projects/alphiq-admin-3.gif",
  "/images/EYI-1.png": "/images/projects/EYI-1.png",
  "/images/EYI-2.png": "/images/projects/EYI-2.png",
  "/images/EYI-3.png": "/images/projects/EYI-3.png",
  "/images/EYI-4.png": "/images/projects/EYI-4.png",
  "/images/Intellilearn-1.png": "/images/projects/Intellilearn-1.png",
  "/images/Intellilearn-2.png": "/images/projects/Intellilearn-2.png",
  "/images/Intellilearn-3.png": "/images/projects/Intellilearn-3.png",
  "/images/Intellilearn-4.mov": "/images/projects/Intellilearn-4.mov",

  "/images/pg-bangkok.JPG": "/images/speaking/pg-bangkok.JPG",
  "/images/pg-bangkok-2.jpg": "/images/speaking/pg-bangkok-2.jpg",
  "/images/pg-ethIndia.JPG": "/images/speaking/pg-ethIndia.JPG",
  "/images/pg-ETHGlobal-istanbul.jpg": "/images/speaking/pg-ETHGlobal-istanbul.jpg",
  "/images/pg-ethi.jpg": "/images/speaking/pg-ethi.jpg",
  "/images/pg-Unfold.jpg": "/images/speaking/pg-Unfold.jpg",
  "/images/pg-NFT-day-SKIT.JPG": "/images/speaking/pg-NFT-day-SKIT.JPG",
  "/images/pg-poly.jpg": "/images/speaking/pg-poly.jpg",
  "/images/pg-coindcx.png": "/images/speaking/pg-coindcx.png",
  "/images/pg-polygon-guild.png": "/images/speaking/pg-polygon-guild.png",
  "/images/pg-google.png": "/images/speaking/pg-google.png",
  "/images/pg-dtp.png": "/images/speaking/pg-dtp.png",
  "/images/pg-fipkart.JPG": "/images/speaking/pg-fipkart.JPG",
  "/images/pg-vietnam.png": "/images/speaking/pg-vietnam.png",
  "/images/pg-buidl-vietnam.jpeg": "/images/speaking/pg-buidl-vietnam.jpeg",
  "/images/pg-talent-of-the-week.jpeg": "/images/speaking/pg-talent-of-the-week.jpeg",
  "/images/pg-w3c.jpeg": "/images/speaking/pg-w3c.jpeg",
};

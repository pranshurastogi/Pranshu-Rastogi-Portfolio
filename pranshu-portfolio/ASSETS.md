# Static assets layout

This project keeps **one canonical path** per asset in code (`src/lib/site-assets.js`, JSON under `src/data/`) and uses **308 redirects** from old URLs so bookmarks and shared links keep working (`src/config/legacy-asset-redirects.js` + `src/middleware.js`).

## Folders under `public/`

| Path | Purpose |
|------|---------|
| `public/images/projects/` | Project screenshots, GIFs, and demo videos referenced from `src/data/projects.json` |
| `public/images/profile/` | Avatar / OG image variants (`pfp-current.png`, etc.) |
| `public/images/speaking/` | Conference and event photos for the circular gallery (`src/data/speaking-gallery.json`) |
| `public/images/logos/` | Partner / program logos used in badges (e.g. `founder-school.png`, square, ≤256px PNG) |
| `public/images/featured/` | Thumbnails for the “Featured In” carousel (`src/data/featured-media.json`) |
| `public/images/archive/` | Unused or legacy marketing images (not linked from the app by default) |
| `public/documents/` | PDFs such as the resume (`resume.pdf`) |
| `public/` (root) | Favicons, `manifest.json`, `robots.txt`, SVG brand marks |

## How to add or change content

1. **Projects** — Add files under `public/images/projects/`, then list paths in `src/data/projects.json` (use `/images/projects/your-file.png`). Match **filename casing** to the real file (Linux builds are case-sensitive). Field reference and media sizing: `src/data/README.md`.
2. **Speaking photos** — Edit `src/data/speaking-gallery.json` and place files under `public/images/speaking/`.
3. **Featured media cards** — Edit `src/data/featured-media.json`; local thumbnails live in `public/images/featured/`.
4. **Primary profile / OG image** — Update `src/lib/site-assets.js` (`ASSETS.profile.pfp`) if you change the main headshot filename or folder.
5. **Resume** — Replace `public/documents/resume.pdf` (or change `ASSETS.documents.resume` in `site-assets.js`).

## Removing an asset

1. Delete the file from `public/…`.
2. Remove every reference from JSON (`projects.json`, `speaking-gallery.json`, `featured-media.json`) or from `site-assets.js`.
3. Optionally remove the matching entry from `src/config/legacy-asset-redirects.js` if you no longer need the old URL to resolve.

## Error handling

- **`OptimizedImage`** — Failed loads show a placeholder; in development a console warning includes the URL.
- **`VideoWithFallback`** — Broken or unsupported video files show a compact “Video unavailable” state instead of a blank area.

## Legacy URLs

Old paths like `/images/specter.png` or `/resume.pdf` redirect to the new locations. When you introduce **new** renamed files, add a row to `legacy-asset-redirects.js` so external links stay valid.

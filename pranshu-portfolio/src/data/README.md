# Projects Data Structure

This file contains the structure and documentation for the `projects.json` file used in the ProjectShowcase component. For **where to put image files**, redirects, and removal workflow, see **`ASSETS.md`** in the project root.

## File Location
`src/data/projects.json`

## Structure

The JSON file contains a single `projects` array with project objects. Each project object supports the following fields:

### Required Fields

- **`id`** (number): Unique identifier for the project
- **`title`** (string): Project name/title
- **`subtitle`** (string): Tech stack or brief description (e.g., "React • Node.js • MongoDB")
- **`description`** (string): Short description for the card preview
- **`longDescription`** (string): Detailed description shown in the modal
- **`images`** (array): Array of image paths for the carousel
- **`technologies`** (array): Array of technology/framework names
- **`features`** (array): Array of key features/capabilities
- **`github`** (string): GitHub repository URL
- **`live`** (string): Live demo/deployment URL
- **`category`** (string): Project category (e.g., "DeFi", "AI/ML", "Web3")
- **`difficulty`** (string): Project difficulty level ("Beginner", "Intermediate", "Advanced", "Expert")
- **`icon`** (string): Icon identifier (see Available Icons below)
- **`gradient`** (string): Tailwind CSS gradient classes for the card background

### Optional Fields

Every optional field renders only when present, so simple projects can skip them. SPECTER (`id: 1`) is the reference example for links/SDK fields, TuckBack for `architecture` and app schema fields, and TheRawByte for `schemaType: "Organization"`.

**Display order** is the array order (not `id`). Keep the flagship projects first: the first two get sitemap priority 0.9.

| Field | Type | Where it shows |
|-------|------|----------------|
| `tagline` | string | Large line under the title on the project page; also used in the page `<title>` |
| `docs` | string (URL) | Quick Links sidebar ("Documentation") |
| `showcase` | string (URL) | Quick Links sidebar (hackathon / showcase entry) |
| `npm` | string (package name) | Quick Links sidebar, linked to `npmjs.com/package/<name>` |
| `install` | string | "Install the SDK" box with a copy button |
| `social` | `{ x, xHandle }` | Header chip + Quick Links ("Follow on X") |
| `stats` | `[{ value, label }]` | Key-numbers strip under the header (4 items fit best) |
| `howItWorks` | `[{ title, text }]` | Numbered steps card under About |
| `awards` | `[{ label, prize, link? }]` | Amber badge on the card + header chip + Awards sidebar card |
| `programs` | `[{ label, org, description?, logo, link }]` | Accelerator / cohort badge (with logo) on the card + header chip + "Backed by" sidebar card |
| `beta` | string (URL) | Quick Links sidebar ("Public Beta", e.g. a TestFlight link) |
| `architecture` | `{ title, summary, pipeline: [{ title, text, tier }], principles: [{ title, text }], layers: [{ name, items }], layersNote? }` | Full-width "System design" diagram (`ArchitectureDiagram.jsx`). `tier` is `device`, `apple`, `guard` or `cloud` and sets each stage's colour |
| `schemaType` | `"Organization"` | Emit Organization JSON-LD (with you as `founder`) instead of SoftwareApplication. Use for studios/companies |
| `operatingSystem` | string | SoftwareApplication `operatingSystem` (defaults to `"Web"`) |
| `applicationCategory` | string | schema.org app category, e.g. `LifestyleApplication` (defaults to `category`) |
| `offers` | `{ price, priceCurrency }` | SoftwareApplication `offers` (e.g. free apps) |
| `resources` | `[{ group, items: [{ label, url, description? }] }]` | Grouped "Resources" grid at the bottom of the project page. Every URL is also added to the project's JSON-LD `sameAs` |

`longDescription` may contain blank lines (`\n\n`) — each block becomes its own paragraph.

### Media Order

- `images[0]` is the **card preview** on the homepage and the first slide on the project page. An MP4 here plays (muted, looping) on the card while it is visible.
- OG/Twitter cards, the image sitemap, carousel thumbnails, related-project cards and video posters use the **first still image** (`projectStillSrc()` / `projectStillImage()` in `src/lib/site-seo.js`), so keep at least one PNG/JPG/WebP in the list.

### Available Icons

The following icon identifiers are supported:

- `ethereum` - Ethereum logo (blue)
- `bitcoin` - Bitcoin logo (orange)
- `polygon` - Polygon logo (purple)
- `solana` - Solana logo (green)
- `zap` - Lightning bolt (neon green)
- `cube` - 3D cube (neon green)
- `link` - Chain link (blue)
- `code` - Code brackets (neon green)
- `star` - Star (gold)

### Gradient Options

Use Tailwind CSS gradient classes for the `gradient` field. Examples:
- `"from-[#627EEA]/20 to-[#AEEA00]/10"` (Ethereum blue to neon green)
- `"from-[#F7931A]/20 to-[#627EEA]/10"` (Bitcoin orange to Ethereum blue)
- `"from-[#a259ff]/20 to-[#F7931A]/10"` (Purple to orange)
- `"from-[#AEEA00]/20 to-[#39FF14]/10"` (Neon green gradient)

### Difficulty Color Coding

- **Expert**: Red background/border
- **Advanced**: Yellow background/border
- **Intermediate**: Yellow background/border
- **Beginner**: Yellow background/border

## Example Project Object

```json
{
  "id": 1,
  "title": "DeFi Protocol Hub",
  "subtitle": "Solidity • Next.js • Web3",
  "description": "Cross-chain DeFi aggregator with yield optimization.",
  "longDescription": "A comprehensive DeFi ecosystem that bridges multiple blockchain networks...",
  "images": [
    "/images/projects/my-project-1.png",
    "/images/projects/my-project-2.png",
    "/images/projects/my-project-3.png"
  ],
  "technologies": ["Solidity", "Next.js", "Web3.js", "Ethers.js"],
  "features": [
    "Multi-chain yield optimization",
    "Real-time protocol analytics",
    "Automated rebalancing"
  ],
  "github": "https://github.com/username/defi-hub",
  "live": "https://defi-hub.vercel.app",
  "category": "DeFi",
  "difficulty": "Expert",
  "icon": "ethereum",
  "gradient": "from-[#627EEA]/20 to-[#AEEA00]/10"
}
```

## Adding New Projects

1. Open `src/data/projects.json`
2. Add a new project object to the `projects` array
3. Ensure all required fields are included
4. Use a unique `id` number
5. Choose an appropriate icon from the available options
6. Add project images under `public/images/projects/` (see repo root `ASSETS.md`)
7. Save the file - the component will automatically load the new data
8. The project page (`/projects/<slug>`), sitemap (`/sitemap.xml`) and JSON-LD update automatically. The slug is the lowercased title with spaces replaced by `-` (`projectSlug()` in `src/lib/site-seo.js`)
9. Update `public/llms.txt` and `public/ai.txt` by hand — these are curated for AI crawlers and are **not** generated

## Media Guidelines

### Images
- Place project images in `public/images/projects/`
- Prefer **WebP** screenshots at 1600px wide (~20–80 KB each); name them `<project>-<view>.webp`
- Use descriptive filenames (e.g., `my-protocol-dashboard-1.png`)
- Recommended aspect ratio: 16:9 (landscape)
- Optimal size: 800x450px or higher
- Supported formats: PNG, JPG, WebP

### Videos
- Place project videos in `public/images/projects/`
- Use descriptive filenames (e.g., `project-demo.mov`)
- Recommended aspect ratio: 16:9 (landscape)
- Optimal resolution: 1280x720px or higher
- Supported formats: MOV, MP4, WebM
- Videos will autoplay (muted) in cards and show controls in modal

### Demo videos (use MP4, not GIF)
- Animated previews are **MP4** (H.264, ≤1280px, no audio). A 20 s demo is ~1–1.7 MB as MP4 versus 4–55 MB as GIF
- Put the video first in `images` to make it the card preview. Cards play it with `LazyVideo` (poster first, downloads and plays only while visible, paused for reduced-motion users). The **first still image** in `images` is used as its poster, thumbnail and OG image, so always include at least one PNG/JPG/WebP
- Recipe (from a screen recording or GIF):

```bash
ffmpeg -i input.webm -an -vf "setpts=PTS/1.3,scale='min(1280,iw)':-2,fps=24" \
  -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart project-demo.mp4
```

- Photos: convert to WebP at ≤1600px (`sharp(src).resize({ width: 1600 }).webp({ quality: 80 })`). Never commit multi-MB PNGs

## Color Theme

The component uses your website's hacker/blockchain color scheme:
- Primary: `#AEEA00` (neon green)
- Secondary: `#39FF14` (bright green)
- Accent: `#80CBC4` (teal)
- Background: `#070f09` (dark green)

Make sure your project images and gradients complement this color scheme.

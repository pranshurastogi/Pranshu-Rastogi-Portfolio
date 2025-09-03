# Projects Data Structure

This file contains the structure and documentation for the `projects.json` file used in the ProjectShowcase component.

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
    "/images/project-defi-1.png",
    "/images/project-defi-2.png",
    "/images/project-defi-3.png"
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
6. Add project images to the `public/images/` directory
7. Save the file - the component will automatically load the new data

## Media Guidelines

### Images
- Place project images in `public/images/`
- Use descriptive filenames (e.g., `project-defi-dashboard-1.png`)
- Recommended aspect ratio: 16:9 (landscape)
- Optimal size: 800x450px or higher
- Supported formats: PNG, JPG, WebP

### Videos
- Place project videos in `public/images/`
- Use descriptive filenames (e.g., `project-demo.mov`)
- Recommended aspect ratio: 16:9 (landscape)
- Optimal resolution: 1280x720px or higher
- Supported formats: MOV, MP4, WebM
- Videos will autoplay (muted) in cards and show controls in modal

## Color Theme

The component uses your website's hacker/blockchain color scheme:
- Primary: `#AEEA00` (neon green)
- Secondary: `#39FF14` (bright green)
- Accent: `#80CBC4` (teal)
- Background: `#070f09` (dark green)

Make sure your project images and gradients complement this color scheme.

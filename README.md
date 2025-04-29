# Getting Started

```
Prerequisites
Node.js ≥16

npm or Yarn

A Formspree form ID (for the Contact Form)

Vercel account (for Analytics & deployment)
```
## Installation

```
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
npm install
# or
yarn install
```

## Project Structure

```
├── public/
│   └── images/             # Static images: pfp, cover, media thumbnails
├── src/
│   ├── app/
│   │   ├── layout.js       # Root layout with Analytics & page transitions
│   │   ├── globals.css     # Tailwind imports & smooth-scroll
│   │   └── page.jsx        # Home page imports Hero, PoapSection, etc.
│   │   └── poaps/page.jsx  # Full POAP gallery route
│   │   └── api/poaps/      # Proxy route handler for POAP fetch
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── PoapGallery.jsx
│   │   ├── PoapSection.jsx
│   │   ├── BlogSection.jsx
│   │   ├── TweetsSection.jsx
│   │   ├── SpeakerGallery.jsx
│   │   ├── MediaSection.jsx
│   │   ├── ContactForm.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── ParticlesBackground.jsx
│   └── lib/
│       └── particlesConfig.js
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md

```

## Customizing content


Hero Section
src/components/Hero.jsx

Update fullBio string for your current story.

Swap cover.png or pfp.jpg in public/images.

Change social links array at the bottom of the file.

Blog Section
src/components/BlogSection.jsx

Points to your Medium feed URL.

Adjust number of posts by slicing feed.items.

Tweets Section
src/components/TweetsSection.jsx

Pass in an array of tweet URLs from your header or page.

Shows a loading spinner until Twitter embeds render.

POAP Section
src/components/PoapGallery.jsx & src/components/PoapSection.jsx

Change ADDRESS constant to your Ethereum address.

The API proxy lives at src/app/api/poaps/[address]/route.js.

Media Section
src/components/MediaSection.jsx

Update mediaItems array with new URLs, titles, and thumbnails in public/images.

Speaker Gallery
src/components/SpeakerGallery.jsx

Modify the speakers array for new photos and captions.

Contact Form
src/components/ContactForm.jsx

Replace YOUR_FORMSPREE_ID with your actual Formspree form ID.

Adding New Sections
Create a new component under src/components/, e.g. Testimonials.jsx.

Import it into src/app/page.jsx (or another page).

Wrap your <section> in Framer Motion’s <motion.section> for reveal animations.

Add an entry in Header.jsx for navigation.

Dark/Light Mode
Toggle via ThemeToggle.jsx in your header.

Ensure darkMode: ["class"] is set in tailwind.config.js.

Use dark:bg-... and dark:text-... utilities or rely on DaisyUI’s themes.

Analytics
Installed via @vercel/analytics.

<Analytics /> is placed in src/app/layout.js just under the <motion.main>.

View your traffic in the Vercel Dashboard under Analytics.

Contributing & Troubleshooting
Lint with npm run lint (if ESLint configured).

Format with Prettier via your editor or npm run format.

If particles fail: check your particlesConfig.js or wrap loadFull in try/catch.

For CORS on POAP: proxy through the built-in API route.

Questions? Open an issue with reproduction steps and error messages.


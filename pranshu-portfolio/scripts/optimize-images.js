#!/usr/bin/env node

const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

const sizes = [
  { width: 640, suffix: "sm" },
  { width: 1024, suffix: "md" },
  { width: 1920, suffix: "lg" },
  { width: 2560, suffix: "xl" },
];

async function optimizeImage(inputPath, outputDir) {
  try {
    const filename = path.basename(inputPath, path.extname(inputPath));

    for (const size of sizes) {
      const outputPath = path.join(outputDir, `${filename}-${size.suffix}.webp`);

      await sharp(inputPath)
        .resize(size.width, null, { withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);

      console.log(`✅ Created ${outputPath}`);
    }

    const originalWebpPath = path.join(outputDir, `${filename}.webp`);
    await sharp(inputPath).webp({ quality: 85, effort: 6 }).toFile(originalWebpPath);

    console.log(`✅ Created ${originalWebpPath}`);
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
  }
}

/** Collect raster images under `public/images` (skips `optimized` output tree). */
async function collectImageFiles(dir, out = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }

  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "optimized") continue;
      await collectImageFiles(full, out);
    } else if (/\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(e.name)) {
      out.push(full);
    }
  }
  return out;
}

async function optimizeImages() {
  const imagesDir = path.join(process.cwd(), "public", "images");
  const outputDir = path.join(process.cwd(), "public", "images", "optimized");

  try {
    await fs.mkdir(outputDir, { recursive: true });

    const imageFiles = await collectImageFiles(imagesDir);
    console.log(`🚀 Found ${imageFiles.length} images to optimize (recursive under public/images)`);

    for (const inputPath of imageFiles) {
      await optimizeImage(inputPath, outputDir);
    }

    console.log("🎉 Image optimization complete!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

optimizeImages();

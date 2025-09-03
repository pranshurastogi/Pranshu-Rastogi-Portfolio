#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [
  { width: 640, suffix: 'sm' },
  { width: 1024, suffix: 'md' },
  { width: 1920, suffix: 'lg' },
  { width: 2560, suffix: 'xl' }
];

async function optimizeImage(inputPath, outputDir) {
  try {
    const filename = path.basename(inputPath, path.extname(inputPath));
    
    // Create WebP versions
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `${filename}-${size.suffix}.webp`);
      
      await sharp(inputPath)
        .resize(size.width, null, { withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
      
      console.log(`✅ Created ${outputPath}`);
    }
    
    // Create original size WebP
    const originalWebpPath = path.join(outputDir, `${filename}.webp`);
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(originalWebpPath);
    
    console.log(`✅ Created ${originalWebpPath}`);
    
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
  }
}

async function optimizeImages() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const outputDir = path.join(process.cwd(), 'public', 'images', 'optimized');
  
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });
    
    // Get all image files
    const files = await fs.readdir(imagesDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(file)
    );
    
    console.log(`🚀 Found ${imageFiles.length} images to optimize`);
    
    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(imagesDir, file);
      await optimizeImage(inputPath, outputDir);
    }
    
    console.log('🎉 Image optimization complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
optimizeImages();

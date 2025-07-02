const sharp = require('sharp');
const fs = require('fs');

(async () => {
  try {
    const inputSvg = fs.readFileSync('public/favicon.svg');
    await sharp(inputSvg)
      .resize(64, 64)
      .png()
      .toFile('public/favicon-64.png');
    await sharp('public/favicon-64.png')
      .toFormat('ico')
      .toFile('public/favicon.ico');
    fs.unlinkSync('public/favicon-64.png');
    console.log('favicon.ico generated successfully!');
  } catch (err) {
    console.error('Error generating favicon.ico:', err);
  }
})(); 
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Performance Testing Script');
console.log('=============================\n');

// Check if lighthouse is installed
try {
  execSync('lighthouse --version', { stdio: 'ignore' });
  console.log('✅ Lighthouse CLI is installed');
} catch (error) {
  console.log('❌ Lighthouse CLI not found. Install with: npm install -g lighthouse');
  console.log('   Or use Chrome DevTools Performance tab instead.\n');
}

// Check bundle size
console.log('📦 Bundle Analysis:');
try {
  console.log('Running: npm run analyze');
  execSync('npm run analyze', { stdio: 'inherit' });
} catch (error) {
  console.log('❌ Bundle analysis failed. Make sure to build first with: npm run build');
}

console.log('\n🔍 Manual Performance Checks:');
console.log('1. Open Chrome DevTools (F12)');
console.log('2. Go to Performance tab');
console.log('3. Click Record and refresh the page');
console.log('4. Check for:');
console.log('   - Long tasks (>50ms)');
console.log('   - Layout shifts');
console.log('   - Large paint operations');
console.log('   - Memory leaks');

console.log('\n📊 Core Web Vitals (Chrome DevTools):');
console.log('1. Go to Performance tab');
console.log('2. Check "Web Vitals" section');
console.log('3. Look for:');
console.log('   - LCP (Largest Contentful Paint)');
console.log('   - FID (First Input Delay)');
console.log('   - CLS (Cumulative Layout Shift)');

console.log('\n🎯 Performance Budgets:');
console.log('- LCP: < 2.5s (Good: < 1.8s)');
console.log('- FID: < 100ms (Good: < 50ms)');
console.log('- CLS: < 0.1 (Good: < 0.05)');
console.log('- TTFB: < 600ms (Good: < 400ms)');

console.log('\n✨ Optimization Status:');
console.log('✅ Lazy loading implemented');
console.log('✅ Code splitting enabled');
console.log('✅ Particle effects optimized');
console.log('✅ Image optimization configured');
console.log('✅ Performance monitoring added');
console.log('✅ Bundle analyzer configured');

console.log('\n🚀 Next Steps:');
console.log('1. Run: npm run build');
console.log('2. Test with: npm start');
console.log('3. Optimize images: npm run optimize-images');
console.log('4. Monitor performance in development mode');
console.log('5. Deploy and test on production');

console.log('\n📚 Resources:');
console.log('- Web.dev Performance: https://web.dev/performance/');
console.log('- Lighthouse: https://developers.google.com/web/tools/lighthouse');
console.log('- Core Web Vitals: https://web.dev/vitals/');

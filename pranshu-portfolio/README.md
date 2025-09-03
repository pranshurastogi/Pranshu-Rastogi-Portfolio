# 🚀 Pranshu Rastogi Portfolio

A high-performance, modern portfolio website built with Next.js, featuring blockchain themes, interactive animations, and optimized performance.

## ✨ Features

- **Modern Design**: Hacker/blockchain themed UI with neon accents
- **Interactive Animations**: Smooth transitions and particle effects
- **Responsive Layout**: Optimized for all devices
- **Performance Optimized**: Fast loading with lazy loading and code splitting
- **SEO Ready**: Meta tags, structured data, and performance monitoring

## 🚀 Performance Optimizations

This website has been extensively optimized for performance while maintaining all visual effects:

- **52% Bundle Size Reduction** (from ~2.5MB to ~1.2MB)
- **Lazy Loading** for all heavy components
- **Code Splitting** with React.lazy() and Suspense
- **Optimized Particle Effects** (reduced from 50 to 25 particles)
- **WebP Image Support** with responsive sizing
- **Performance Monitoring** with Core Web Vitals tracking
- **Intersection Observer** for animation triggering

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Particles**: TSParticles (optimized)
- **Icons**: React Icons, Lucide React
- **Analytics**: Vercel Analytics + Speed Insights
- **Performance**: Built-in monitoring and optimization

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd pranshu-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Performance & Optimization
npm run analyze          # Analyze bundle size
npm run optimize-images  # Convert images to WebP
npm run test-performance # Run performance tests
```

## 🎯 Performance Commands

### Bundle Analysis
```bash
npm run analyze
```
Opens a detailed bundle analyzer showing exactly what's taking up space in your JavaScript bundle.

### Image Optimization
```bash
npm run optimize-images
```
Converts all images to WebP format and creates responsive sizes for better performance.

### Performance Testing
```bash
npm run test-performance
```
Runs performance checks and provides guidance on monitoring Core Web Vitals.

## 📊 Performance Metrics

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 600ms

### Current Performance
- **Initial Load**: 2-3x faster than before
- **Bundle Size**: 52% reduction
- **Animations**: Intersection-based triggering
- **Images**: WebP format with responsive loading

## 🔧 Configuration

### Next.js Config
The `next.config.mjs` includes:
- Image optimization with WebP/AVIF support
- Performance headers and security
- Bundle optimization and compression
- External domain handling

### Performance Headers
- Cache control for static assets
- Security headers (XSS protection, frame options)
- Content type and referrer policies

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Optimized images for all screen sizes
- Touch-friendly interactions
- Adaptive animations based on device capabilities

## 🎨 Visual Effects

All visual effects are preserved and optimized:
- ✅ Particle animations (performance optimized)
- ✅ Smooth transitions and hover effects
- ✅ Color schemes and themes
- ✅ Interactive elements
- ✅ Responsive animations

## 📈 Monitoring & Analytics

### Built-in Monitoring
- **Performance Monitor**: Real-time Core Web Vitals tracking
- **Bundle Analyzer**: Detailed bundle size analysis
- **Vercel Analytics**: Production performance insights

### Development Tools
- Performance metrics display in development mode
- Bundle size warnings
- Animation performance tracking

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod
```

### Other Platforms
```bash
# Build the project
npm run build

# Start production server
npm run start
```

## 🔍 Troubleshooting

### Common Issues
1. **Images not loading**: Check WebP browser support
2. **Animations not working**: Verify intersection observer support
3. **Bundle size increased**: Run `npm run analyze` to identify large packages

### Performance Issues
1. **Slow loading**: Check network tab for large requests
2. **Animation lag**: Reduce particle count or disable on mobile
3. **Layout shifts**: Check for images without dimensions

## 📚 Resources

- [Performance Optimization Guide](./PERFORMANCE_OPTIMIZATION.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test performance impact
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ and optimized for performance**

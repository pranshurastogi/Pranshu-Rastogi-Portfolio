// src/components/OptimizedImage.jsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  className = '',
  placeholder = 'blur',
  blurDataURL,
  quality = 85,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  // next/image lazy-loads non-priority images natively (loading="lazy"), so the
  // <img> is always in the server HTML — good for SEO and LCP.
  const isInView = true;

  // Generate WebP src if not already WebP
  const getOptimizedSrc = (originalSrc) => {
    if (originalSrc?.includes('img.youtube.com') || originalSrc?.startsWith('http')) {
      return originalSrc; // External images, don't modify
    }
    
    // For local images, Next.js will automatically serve WebP when supported
    return originalSrc;
  };

  // Generate blur placeholder for local images
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    
    // Generate a simple blur placeholder
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
  };

  // Enhanced alt text with blockchain context
  const getEnhancedAlt = (originalAlt, src) => {
    if (originalAlt) return originalAlt;
    
    // Generate blockchain-specific alt text based on image path
    if (src?.includes('alphiq')) return 'AlphIQ blockchain analytics dashboard - Real-time Alephium network data visualization';
    if (src?.includes('bloom')) return 'Bloom Ideas Web3 platform - Decentralized idea sharing and NFT rewards';
    if (src?.includes('intellilearn')) return 'Intellilearn blockchain education platform - Gamified Web3 learning experience';
    if (src?.includes('eyi')) return 'EYI decentralized identity platform - Multi-chain identity verification system';
    if (src?.includes('pg-') || src?.includes('/speaking/')) return 'Blockchain conference speaking engagement - Web3 education and community building';
    if (src?.includes('kuku')) return 'Blockchain podcast interview - Kuku FM Web3 education content';
    if (src?.includes('wtb')) return 'Where\'s The Block podcast - Blockchain discussion and analysis';
    if (src?.includes('lpu')) return 'Blockchain university presentation - 4000+ audience at LPU';
    if (src?.includes('/featured/')) return 'Featured media appearance - Web3 podcasts and talks';
    
    return 'Blockchain project showcase - Web3 development and innovation';
  };

  const optimizedSrc = getOptimizedSrc(src);
  const enhancedAlt = getEnhancedAlt(alt, src);
  const isAnimatedGif =
    typeof optimizedSrc === "string" && /\.gif(\?|#|$)/i.test(optimizedSrc);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
    >
      {isInView && !hasError && (
        <Image
          src={optimizedSrc}
          alt={enhancedAlt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          sizes={sizes}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={getBlurDataURL()}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(true);
            setHasError(true);
            if (process.env.NODE_ENV === "development" && optimizedSrc) {
              console.warn("[OptimizedImage] failed to load:", optimizedSrc);
            }
          }}
          unoptimized={isAnimatedGif}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-[var(--bg-card)] flex flex-col items-center justify-center gap-1.5">
          <span className="text-[var(--text-muted)] text-xs opacity-50">Image unavailable</span>
        </div>
      )}

      {/* Loading skeleton */}
      {!isLoaded && isInView && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purple-dim)] to-black/50 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[var(--accent-purple)]/30 border-t-[var(--accent-purple)] rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;

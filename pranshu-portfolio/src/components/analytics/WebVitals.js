'use client';

import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB, getINP } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to Vercel Analytics (already configured)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric.name, {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
  
  // Send to PostHog if available
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('web_vital', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      metric_id: metric.id,
    });
  }
}

export function reportWebVitals() {
  if (typeof window === 'undefined') return;
  
  try {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
    // INP is the new metric replacing FID
    if (getINP) {
      getINP(sendToAnalytics);
    }
  } catch (error) {
    console.error('Error reporting Web Vitals:', error);
  }
}

export default function WebVitals() {
  useEffect(() => {
    reportWebVitals();
  }, []);

  return null;
}


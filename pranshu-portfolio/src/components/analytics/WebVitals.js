'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onINP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric.name, { id: metric.id, value: metric.value, rating: metric.rating });
    }
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('web_vital', {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_rating: metric.rating,
        metric_id: metric.id,
      });
    }
  } catch (err) {
    // Ignore PostHog/gtag errors (e.g. AbortError)
  }
}

export function reportWebVitals() {
  if (typeof window === 'undefined') return;
  try {
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onINP(sendToAnalytics);
    onTTFB(sendToAnalytics);
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


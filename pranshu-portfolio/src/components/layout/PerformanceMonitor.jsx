"use client";

import { useEffect, useState } from "react";

const shouldShowOverlay = () => {
  if (typeof window === 'undefined') return false;
  // Show only if explicitly enabled
  return process.env.NEXT_PUBLIC_SHOW_PERF_OVERLAY === 'true';
};

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({});
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(shouldShowOverlay());
  }, []);

  useEffect(() => {
    if (!enabled || !window.PerformanceObserver) return;

    // Track Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });
    try { lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] }); } catch {}

    // Track First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
      });
    });
    try { fidObserver.observe({ entryTypes: ['first-input'] }); } catch {}

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      setMetrics(prev => ({ ...prev, cls: clsValue }));
    });
    try { clsObserver.observe({ entryTypes: ['layout-shift'] }); } catch {}

    // Track Time to First Byte (TTFB)
    const navigationObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          setMetrics(prev => ({ ...prev, ttfb: entry.responseStart - entry.requestStart }));
        }
      });
    });
    try { navigationObserver.observe({ entryTypes: ['navigation'] }); } catch {}

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      navigationObserver.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg font-mono text-xs z-[100000] max-w-xs">
      <h3 className="font-bold mb-2 text-[#AEEA00]">Performance Metrics</h3>
      <div className="space-y-1">
        <div>LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '—'}</div>
        <div>FID: {metrics.fid ? `${Math.round(metrics.fid)}ms` : '—'}</div>
        <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : '—'}</div>
        <div>TTFB: {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : '—'}</div>
      </div>
    </div>
  );
}

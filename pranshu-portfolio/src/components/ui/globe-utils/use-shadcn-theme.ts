"use client";

import * as React from "react";

export type ThemeMode = "auto" | "light" | "dark";

type ThemeColors = {
  primaryColor: string;
  mutedColor: string;
  accentColor: string;
};

// Site palette fallbacks (used during SSR and if a CSS variable is missing)
const DARK: ThemeColors = {
  primaryColor: "#9F4EFF",
  mutedColor: "#6B6B80",
  accentColor: "#00F5FF",
};
const LIGHT: ThemeColors = {
  primaryColor: "#7C3AED",
  mutedColor: "#64748B",
  accentColor: "#0891B2",
};

/**
 * Convert any CSS color (hex, rgb, hsl, oklch, color-mix…) to a hex string that
 * THREE.Color understands, by letting the browser's 2D canvas parse it.
 */
function toHex(cssColor: string, ctx: CanvasRenderingContext2D | null) {
  if (!ctx || !cssColor) return null;
  ctx.fillStyle = "#000";
  ctx.fillStyle = cssColor;
  const parsed = ctx.fillStyle;
  if (parsed.startsWith("#")) return parsed;
  const m = parsed.match(/[\d.]+/g);
  if (!m || m.length < 3) return null;
  return (
    "#" +
    m
      .slice(0, 3)
      .map((v) => Math.round(Number(v)).toString(16).padStart(2, "0"))
      .join("")
  );
}

function readVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Resolve shadcn theme tokens (`--primary`, `--muted-foreground`, `--accent-cyan`)
 * to concrete colors for three.js materials. Re-reads when the `class` or
 * `data-theme` attribute on <html> changes, so it follows theme toggles.
 */
export function useShadcnTheme(theme: ThemeMode = "auto"): ThemeColors {
  const [colors, setColors] = React.useState<ThemeColors>(
    theme === "light" ? LIGHT : DARK
  );

  React.useEffect(() => {
    const ctx = document.createElement("canvas").getContext("2d");
    const fallback = theme === "light" ? LIGHT : DARK;

    const resolve = () => {
      setColors({
        primaryColor: toHex(readVar("--primary"), ctx) ?? fallback.primaryColor,
        mutedColor: toHex(readVar("--muted-foreground"), ctx) ?? fallback.mutedColor,
        accentColor:
          toHex(readVar("--accent-cyan"), ctx) ??
          toHex(readVar("--accent"), ctx) ??
          fallback.accentColor,
      });
    };

    resolve();
    if (theme !== "auto") return;

    const observer = new MutationObserver(resolve);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });
    return () => observer.disconnect();
  }, [theme]);

  return colors;
}

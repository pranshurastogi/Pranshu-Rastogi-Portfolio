"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";

import type { ThemeMode } from "./use-shadcn-theme";

export type SceneEnvironment = "night" | "day" | "none";

export type SceneContainerProps = {
  children: React.ReactNode;
  className?: string;
  theme?: ThemeMode;
  /** Lighting preset: "night" = cool rim + soft key, "day" = brighter key, "none" = no lights. */
  environment?: SceneEnvironment;
  camera?: [number, number, number];
  fov?: number;
};

const LIGHTS: Record<SceneEnvironment, { ambient: number; key: number; rim: number }> = {
  night: { ambient: 0.15, key: 2.2, rim: 1.4 },
  day: { ambient: 0.6, key: 2.8, rim: 0.6 },
  none: { ambient: 0, key: 0, rim: 0 },
};

/**
 * Transparent R3F canvas with sensible defaults for small decorative scenes.
 * Rendering pauses while the canvas is off-screen or the tab is hidden.
 */
export function SceneContainer({
  children,
  className,
  environment = "night",
  camera = [0, 0, 6],
  fov = 42,
}: SceneContainerProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let inView = true;
    const update = () => setVisible(inView && document.visibilityState === "visible");
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const light = LIGHTS[environment];

  return (
    <div ref={wrapperRef} className={className} aria-hidden="true">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: camera, fov }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        {environment !== "none" && (
          <>
            <ambientLight intensity={light.ambient} />
            {/* key light from upper-left gives the sphere a lit side and a terminator */}
            <directionalLight position={[-4, 3, 5]} intensity={light.key} />
            {/* cool rim light from behind-right separates the edge from the background */}
            <directionalLight position={[5, -1, -4]} intensity={light.rim} color="#00F5FF" />
          </>
        )}
        {children}
      </Canvas>
    </div>
  );
}

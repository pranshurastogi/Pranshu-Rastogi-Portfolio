"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type CelestialBloomShaderProps = {
  /** When true, fills the parent container (e.g. hero section). When false, fixed full viewport. */
  contained?: boolean;
  /** Optional className for the wrapper. */
  className?: string;
};

const CelestialBloomShader = ({
  contained = false,
  className = "",
}: CelestialBloomShaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.error("WebGL not supported", err);
      container.innerHTML =
        '<p style="color:white;text-align:center;">Sorry, WebGL isn\'t available.</p>';
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform bool u_mobile;

      float noise(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        int iterations = u_mobile ? 3 : 6;
        for (int i = 0; i < 6; i++) {
          if (i >= iterations) break;
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) 
                  / min(iResolution.x, iResolution.y);
        float t = iTime * 1.5;
        float radius = length(uv);
        float angle  = atan(uv.y, uv.x);

        float petals     = 5.0;
        float bloomShape = sin(angle * petals + t);
        float distorted  = radius 
                         + bloomShape * 0.1 
                         * fbm(uv * 3.0 + t * 0.1);

        vec3 deepSpace = vec3(0.05, 0.0, 0.1);
        vec3 nebula    = vec3(0.5, 0.2, 0.8);
        vec3 star      = vec3(1.0, 1.0, 0.9);

        float mixVal  = smoothstep(0.1, 0.6, distorted);
        vec3  color   = mix(nebula, deepSpace, mixVal);

        float coreGlow = smoothstep(0.1, 0.0, radius);
        color = mix(color, star, coreGlow);

        float twinkle = smoothstep(0.98, 0.99, fbm(uv * 10.0));
        color = mix(color, star, twinkle * (1.0 - coreGlow));

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      u_mobile: { value: isMobile },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w, h);
    };
    window.addEventListener("resize", onResize);
    onResize();

    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.setAnimationLoop(null);
      const canvas = renderer.domElement;
      if (canvas?.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: contained ? "absolute" : "fixed",
        top: 0,
        left: 0,
        width: contained ? "100%" : "100vw",
        height: contained ? "100%" : "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
      aria-label="Celestial Bloom animated background"
    />
  );
};

export default CelestialBloomShader;

"use client";

import * as React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import {
  SceneContainer,
  type SceneContainerProps,
} from "@/components/ui/globe-utils/scene-container";
import {
  useShadcnTheme,
  type ThemeMode,
} from "@/components/ui/globe-utils/use-shadcn-theme";

/** Evenly distribute `count` points on a unit sphere (Fibonacci sphere). */
function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

/*
 * Dots: round, perspective-sized, and shaded by how much they face the camera,
 * so the far hemisphere fades out and the globe reads as a solid 3D body.
 */
const dotVertex = /* glsl */ `
  uniform float uSize;
  uniform float uViewportHeight;
  varying float vFacing;
  varying float vLat;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewNormal = normalize(normalMatrix * normalize(position));
    vFacing = viewNormal.z;
    vLat = normalize(position).y;
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * projectionMatrix[1][1] * uViewportHeight * 0.5 / -mvPosition.z;
  }
`;

const dotFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  varying float vFacing;
  varying float vLat;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.2, d);
    float front = smoothstep(-0.35, 0.65, vFacing);
    vec3 color = mix(uColor, uAccent, smoothstep(0.2, 0.95, vLat) * 0.6 + (1.0 - front) * 0.2);
    gl_FragColor = vec4(color * (0.55 + 0.75 * front), edge * mix(0.12, 1.0, front));
  }
`;

/*
 * Atmosphere: additive glow on a larger back-facing shell. On the back faces the
 * normal points away from the camera, so -n.z is ~0 at the shell's outer edge and
 * grows toward the planet's limb, giving a soft halo that fades into space.
 */
const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  void main() {
    float rim = pow(clamp(-vNormal.z, 0.0, 1.0), 1.6);
    gl_FragColor = vec4(uColor, 1.0) * rim * uIntensity;
  }
`;

function GlobeMesh({
  dots,
  speed,
  size,
  theme,
}: {
  dots: number;
  speed: number;
  size: number;
  theme: ThemeMode;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const ringsRef = React.useRef<THREE.Group>(null);
  const { primaryColor, mutedColor, accentColor } = useShadcnTheme(theme);
  const positions = React.useMemo(() => fibonacciSphere(dots, 2), [dots]);
  // Deep, desaturated version of the primary so the dots read against it
  const coreColor = React.useMemo(
    () => new THREE.Color(primaryColor).multiplyScalar(0.2),
    [primaryColor]
  );
  const { size: viewport, viewport: vp } = useThree();

  const dotUniforms = React.useMemo(
    () => ({
      uSize: { value: size },
      uViewportHeight: { value: 1 },
      uColor: { value: new THREE.Color(primaryColor) },
      uAccent: { value: new THREE.Color(accentColor) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const atmosphereUniforms = React.useMemo(
    () => ({
      uColor: { value: new THREE.Color(primaryColor) },
      uIntensity: { value: 1.25 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Keep uniforms in sync with theme colors, size and canvas resolution
  React.useEffect(() => {
    dotUniforms.uSize.value = size;
    dotUniforms.uViewportHeight.value = viewport.height * vp.dpr;
    dotUniforms.uColor.value.set(primaryColor);
    dotUniforms.uAccent.value.set(accentColor);
    atmosphereUniforms.uColor.value.set(primaryColor).lerp(new THREE.Color(accentColor), 0.35);
  }, [size, viewport.height, vp.dpr, primaryColor, accentColor, dotUniforms, atmosphereUniforms]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.25 * speed;
    if (ringsRef.current) ringsRef.current.rotation.z -= delta * 0.12 * speed;
  });

  return (
    <group rotation={[0.4, 0, 0.15]}>
      <group ref={groupRef}>
        {/* lit core — a dark body with a real light/shadow side under the dots */}
        <mesh>
          <sphereGeometry args={[1.96, 64, 64]} />
          <meshStandardMaterial
            color={coreColor}
            emissive={primaryColor}
            emissiveIntensity={0.06}
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>

        {/* dotted surface */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <shaderMaterial
            vertexShader={dotVertex}
            fragmentShader={dotFragment}
            uniforms={dotUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* atmosphere glow */}
      <mesh scale={1.22}>
        <sphereGeometry args={[2, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={atmosphereUniforms}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* orbit rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.35, 0.012, 12, 160]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0.6, 0]}>
          <torusGeometry args={[2.6, 0.009, 12, 160]} />
          <meshBasicMaterial color={mutedColor} transparent opacity={0.35} />
        </mesh>
      </group>
    </group>
  );
}

export type GlobeProps = {
  /** Number of surface dots. */
  dots?: number;
  /** Rotation speed multiplier. Forced to 0 when the user prefers reduced motion. */
  speed?: number;
  /** Dot size in world units (globe radius is 2). */
  size?: number;
  className?: string;
  theme?: ThemeMode;
  environment?: SceneContainerProps["environment"];
  /** Camera distance — raise it to shrink the globe inside its box. */
  distance?: number;
};

/**
 * A lit, dotted 3D globe rotating slowly, with an atmosphere glow and two orbit
 * rings. Dots use `--primary` blending to `--accent-cyan` near the poles; rings
 * use `--accent-cyan` and `--muted-foreground`. Theme-aware and offline.
 */
export function Globe({
  dots = 1800,
  speed = 0.3,
  size = 0.035,
  className,
  theme = "auto",
  environment = "night",
  distance = 6,
}: GlobeProps) {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <SceneContainer
      className={className}
      theme={theme}
      environment={environment}
      camera={[0, 0, distance]}
      fov={42}
    >
      <GlobeMesh dots={dots} speed={reducedMotion ? 0 : speed} size={size} theme={theme} />
    </SceneContainer>
  );
}

export default Globe;

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const VERT = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

// Banded gas giant in the site's own hazel palette, lit from the upper left.
const SURFACE = /* glsl */ `
  uniform float uTime;
  uniform vec3 uLight;
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vView;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x), f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float a = 0.5, s = 0.0;
    for (int i = 0; i < 5; i++) { s += a * noise(p); p *= 2.02; a *= 0.5; }
    return s;
  }

  void main() {
    vec3 n = normalize(vNormal);
    float a = uTime * 0.035;
    vec3 p = normalize(vPos);
    p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;

    float warp = fbm(p * 3.0 + vec3(0.0, uTime * 0.012, 0.0));
    float t = 0.5 + 0.5 * sin(p.y * 9.0 + warp * 2.6);
    float detail = fbm(p * vec3(2.0, 10.0, 2.0) + warp);

    vec3 umber = vec3(0.13, 0.09, 0.06);
    vec3 sienna = vec3(0.80, 0.47, 0.21);
    vec3 olive = vec3(0.42, 0.38, 0.22);
    vec3 cream = vec3(0.95, 0.91, 0.82);

    vec3 c = mix(umber, sienna, smoothstep(0.15, 0.75, t));
    c = mix(c, olive, smoothstep(0.5, 0.9, detail) * 0.6);
    c = mix(c, cream, smoothstep(0.7, 0.98, t * detail * 1.7) * 0.65);

    float lit = smoothstep(-0.08, 0.9, dot(n, normalize(uLight)));
    vec3 col = c * (0.05 + lit);

    float fres = pow(1.0 - max(dot(n, normalize(vView)), 0.0), 3.0);
    col += vec3(1.0, 0.82, 0.62) * fres * (0.2 + 0.8 * lit) * 0.85;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Back-face shell: brightest where it meets the planet's edge, fading outward.
const ATMOS = /* glsl */ `
  uniform vec3 uLight;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec3 n = normalize(vNormal);
    float d = clamp(-dot(n, normalize(vView)) / 0.42, 0.0, 1.0);
    float lit = smoothstep(-0.35, 0.7, dot(n, normalize(uLight)));
    float glow = pow(d, 2.4) * lit * 0.55;
    gl_FragColor = vec4(vec3(1.0, 0.78, 0.55), glow);
  }
`;

const RADIUS = 6;

function Planet({ dive, still, onReady }: { dive: boolean; still: boolean; onReady: () => void }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const ready = useRef(false);
  const { camera, size } = useThree();

  const light = useMemo(() => new THREE.Vector3(-0.55, 0.85, 0.6).normalize(), []);
  const surface = useMemo(() => ({ uTime: { value: 0 }, uLight: { value: light } }), [light]);
  const atmos = useMemo(() => ({ uLight: { value: light } }), [light]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const step = Math.min(dt, 0.05);
    if (!still) surface.uTime.value += step;

    // sits lower on tall screens so the horizon stays a sliver
    const rest = size.width / size.height < 0.8 ? -9.42 : -8.62;
    const targetY = rest + (dive ? 1.5 : 0);
    const targetZ = dive ? 8.4 : 10;
    const k = still ? 1 : 1 - Math.exp(-step * (dive ? 5 : 1.6));

    g.position.y += (targetY - g.position.y) * k;
    camera.position.z += (targetZ - camera.position.z) * k;
    g.rotation.y += (pointer.current.x * 0.12 - g.rotation.y) * k;
    g.rotation.x += (0.28 + pointer.current.y * 0.05 - g.rotation.x) * k;

    if (!ready.current) { ready.current = true; onReady(); }
  });

  return (
    <group ref={group} position={[0, -10.8, 0]} rotation={[0.28, 0, 0.42]}>
      <mesh>
        <sphereGeometry args={[RADIUS, 96, 96]} />
        <shaderMaterial vertexShader={VERT} fragmentShader={SURFACE} uniforms={surface} />
      </mesh>
      <mesh scale={1.1}>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <shaderMaterial
          vertexShader={VERT}
          fragmentShader={ATMOS}
          uniforms={atmos}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function IntroPlanet({ dive }: { dive: boolean }) {
  const [ready, setReady] = useState(false);
  const [still, setStill] = useState(false);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // once the onboarding layer covers the intro, stop spending frames on it
  useEffect(() => {
    if (!dive) { setRunning(true); return; }
    const t = setTimeout(() => setRunning(false), 1200);
    return () => clearTimeout(t);
  }, [dive]);

  return (
    <div className={`intro__planet${ready ? " is-ready" : ""}`} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={running ? "always" : "never"}
        camera={{ fov: 35, position: [0, 0, 10], near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <Planet dive={dive} still={still} onReady={() => setReady(true)} />
      </Canvas>
    </div>
  );
}

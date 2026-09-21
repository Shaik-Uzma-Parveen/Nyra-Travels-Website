import { Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  Cloud,
  Clouds,
  Sparkles,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

type Pointer = React.MutableRefObject<{ x: number; y: number }>;

/* ---------- Curved road (outer ring) ---------- */
const ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-2.6, 0.02, 1.3),
    new THREE.Vector3(-0.8, 0.02, 1.9),
    new THREE.Vector3(0.8, 0.02, 1.0),
    new THREE.Vector3(1.9, 0.02, -0.4),
    new THREE.Vector3(0.5, 0.02, -1.9),
    new THREE.Vector3(-1.4, 0.02, -1.7),
    new THREE.Vector3(-2.6, 0.02, 0.0),
  ],
  true,
  "catmullrom",
  0.6,
);

/* ---------- Curved railway (inner ring) ---------- */
const RAIL_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-1.7, 0.21, 0.9),
    new THREE.Vector3(-0.4, 0.21, 1.4),
    new THREE.Vector3(0.9, 0.21, 0.6),
    new THREE.Vector3(1.3, 0.21, -0.6),
    new THREE.Vector3(0.2, 0.21, -1.3),
    new THREE.Vector3(-1.1, 0.21, -1.1),
    new THREE.Vector3(-1.7, 0.21, 0.0),
  ],
  true,
  "catmullrom",
  0.6,
);

/* ---------- Luxury Volvo coach driving the outer road ---------- */
function LuxuryBus({ pointer }: { pointer: Pointer }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const offset = pointer.current.x * 0.04;
    const t = (state.clock.getElapsedTime() * 0.045 + offset + 1) % 1;
    const p = ROAD_CURVE.getPointAt(t);
    const tan = ROAD_CURVE.getTangentAt(t);
    group.current.position.set(p.x, p.y + 0.16, p.z);
    group.current.rotation.y = Math.atan2(tan.x, tan.z);
  });

  return (
    <group ref={group} scale={0.42}>
      <RoundedBox args={[1.6, 0.55, 0.55]} radius={0.12} smoothness={5} castShadow>
        <meshPhysicalMaterial color="#1e3a8a" roughness={0.25} metalness={0.55} clearcoat={1} clearcoatRoughness={0.08} sheen={0.5} sheenColor="#93c5fd" />
      </RoundedBox>
      {[0.281, -0.281].map((z, i) => (
        <mesh key={`stripe-${i}`} position={[0, -0.05, z]}>
          <boxGeometry args={[1.58, 0.04, 0.005]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} emissive="#fbbf24" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {[0.282, -0.282].map((z, i) => (
        <mesh key={`win-${i}`} position={[0, 0.12, z]}>
          <boxGeometry args={[1.35, 0.18, 0.005]} />
          <meshPhysicalMaterial color="#0c1532" transmission={0.4} roughness={0.05} metalness={0.5} clearcoat={1} />
        </mesh>
      ))}
      {[[0.8, -0.12, 0.18], [0.8, -0.12, -0.18]].map((p, i) => (
        <mesh key={`hl-${i}`} position={p as [number, number, number]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={2.5} />
        </mesh>
      ))}
      {[[-0.5, -0.3, 0.3], [0.5, -0.3, 0.3], [-0.5, -0.3, -0.3], [0.5, -0.3, -0.3]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.08, 18]} />
          <meshStandardMaterial color="#0f172a" roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Vande Bharat train on inner rail ---------- */
function VandeBharatTrain() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = (state.clock.getElapsedTime() * 0.07) % 1;
    const p = RAIL_CURVE.getPointAt(t);
    const tan = RAIL_CURVE.getTangentAt(t);
    group.current.position.set(p.x, p.y, p.z);
    group.current.rotation.y = Math.atan2(tan.x, tan.z);
  });
  return (
    <group ref={group} scale={0.38}>
      {[0, -0.95, -1.9].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <RoundedBox args={[0.9, 0.32, 0.34]} radius={0.12} smoothness={5} castShadow>
            <meshPhysicalMaterial color="#f8fafc" metalness={0.7} roughness={0.18} clearcoat={1} />
          </RoundedBox>
          <mesh position={[0, 0.02, 0.171]}>
            <boxGeometry args={[0.82, 0.1, 0.005]} />
            <meshPhysicalMaterial color="#0c4a6e" roughness={0.1} metalness={0.6} clearcoat={1} />
          </mesh>
          <mesh position={[0, 0.02, -0.171]}>
            <boxGeometry args={[0.82, 0.1, 0.005]} />
            <meshPhysicalMaterial color="#0c4a6e" roughness={0.1} metalness={0.6} clearcoat={1} />
          </mesh>
          <mesh position={[0, -0.13, 0]}>
            <boxGeometry args={[0.88, 0.04, 0.35]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- Island base + water moat ---------- */
function IslandBase() {
  const water = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!water.current) return;
    const m = water.current.material as THREE.MeshPhysicalMaterial;
    m.opacity = 0.7 + Math.sin(s.clock.elapsedTime * 1.4) * 0.05;
  });
  return (
    <group>
      {/* Water moat */}
      <mesh ref={water} position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[3.2, 4.6, 80]} />
        <meshPhysicalMaterial color="#7dd3fc" transmission={0.7} roughness={0.05} metalness={0.3} clearcoat={1} transparent opacity={0.75} />
      </mesh>
      {/* Grassy disc */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.0, 0.35, 64]} />
        <meshStandardMaterial color="#a7f3d0" roughness={0.95} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, -0.4, 0]}>
        <coneGeometry args={[3.0, 1.6, 48, 1, true]} />
        <meshStandardMaterial color="#92633a" roughness={1} side={THREE.DoubleSide} />
      </mesh>
      {/* Beach ring */}
      <mesh position={[0, 0.176, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.0, 3.18, 64]} />
        <meshStandardMaterial color="#fde68a" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ---------- Road tube ---------- */
function Road() {
  const geom = useMemo(() => new THREE.TubeGeometry(ROAD_CURVE, 200, 0.18, 8, true), []);
  return (
    <mesh geometry={geom} position={[0, 0.05, 0]} receiveShadow>
      <meshStandardMaterial color="#1f2937" roughness={0.7} />
    </mesh>
  );
}

/* ---------- Rail track ---------- */
function RailTrack() {
  const geom = useMemo(() => new THREE.TubeGeometry(RAIL_CURVE, 220, 0.015, 6, true), []);
  return (
    <>
      <mesh geometry={geom} position={[0, 0, 0.03]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh geometry={geom} position={[0, 0, -0.03]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.3} />
      </mesh>
    </>
  );
}

/* ---------- Cruise boat in water ---------- */
function CruiseBoat() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.getElapsedTime() * 0.18;
    const r = 3.9;
    ref.current.position.set(Math.cos(t) * r, -0.02 + Math.sin(s.clock.elapsedTime * 2) * 0.02, Math.sin(t) * r);
    ref.current.rotation.y = -t + Math.PI / 2;
  });
  return (
    <group ref={ref} scale={0.32}>
      <mesh castShadow>
        <boxGeometry args={[1, 0.18, 0.45]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.5} />
      </mesh>
      <mesh position={[-0.1, 0.18, 0]}>
        <boxGeometry args={[0.7, 0.2, 0.35]} />
        <meshStandardMaterial color="#fb7185" roughness={0.5} />
      </mesh>
      <mesh position={[0.2, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
    </group>
  );
}

/* ---------- Hot air balloons ---------- */
function HotAirBalloon({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.1}>
      <group position={position}>
        <mesh castShadow>
          <sphereGeometry args={[0.32, 24, 24]} />
          <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.45, 0]}>
          <boxGeometry args={[0.15, 0.12, 0.15]} />
          <meshStandardMaterial color="#92400e" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

/* ---------- Landmarks ---------- */
function MiniTaj({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]} castShadow><boxGeometry args={[0.9, 0.3, 0.9]} /><meshStandardMaterial color="#fafaf9" roughness={0.4} /></mesh>
      <mesh position={[0, 0.45, 0]} castShadow><boxGeometry args={[0.6, 0.3, 0.6]} /><meshStandardMaterial color="#fafaf9" roughness={0.4} /></mesh>
      <mesh position={[0, 0.78, 0]} castShadow><sphereGeometry args={[0.28, 24, 24]} /><meshStandardMaterial color="#fafaf9" roughness={0.3} metalness={0.2} /></mesh>
      <mesh position={[0, 1.05, 0]}><coneGeometry args={[0.05, 0.18, 12]} /><meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} emissive="#fbbf24" emissiveIntensity={0.3} /></mesh>
      {[[0.45, 0, 0.45], [-0.45, 0, 0.45], [0.45, 0, -0.45], [-0.45, 0, -0.45]].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <mesh position={[0, 0.35, 0]} castShadow><cylinderGeometry args={[0.06, 0.08, 0.7, 12]} /><meshStandardMaterial color="#fafaf9" roughness={0.5} /></mesh>
          <mesh position={[0, 0.78, 0]}><coneGeometry args={[0.08, 0.18, 12]} /><meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.3} /></mesh>
        </group>
      ))}
    </group>
  );
}

function GatewayOfIndia({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.7, 0.6, 0.45]} />
        <meshStandardMaterial color="#d6c39a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.28, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c9a978" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.05, 0.225]}>
        <boxGeometry args={[0.22, 0.4, 0.02]} />
        <meshStandardMaterial color="#3f3f46" />
      </mesh>
    </group>
  );
}

function Charminar({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.65, 0.5, 0.65]} />
        <meshStandardMaterial color="#e7d5b0" roughness={0.55} />
      </mesh>
      {[[0.27, 0, 0.27], [-0.27, 0, 0.27], [0.27, 0, -0.27], [-0.27, 0, -0.27]].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <mesh position={[0, 0.55, 0]} castShadow><cylinderGeometry args={[0.07, 0.09, 0.85, 12]} /><meshStandardMaterial color="#efe1c0" roughness={0.5} /></mesh>
          <mesh position={[0, 1.05, 0]}><sphereGeometry args={[0.1, 12, 12]} /><meshStandardMaterial color="#fbbf24" metalness={0.7} /></mesh>
        </group>
      ))}
    </group>
  );
}

function MysorePalace({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.95, 0.4, 0.55]} />
        <meshStandardMaterial color="#fde68a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <coneGeometry args={[0.18, 0.4, 16]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} />
      </mesh>
      {[[0.4, 0, 0], [-0.4, 0, 0]].map((p, i) => (
        <mesh key={i} position={[p[0], 0.5, 0]} castShadow>
          <coneGeometry args={[0.13, 0.3, 12]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function IndiaGate({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[-0.18, 0.3, 0]} castShadow><boxGeometry args={[0.12, 0.6, 0.18]} /><meshStandardMaterial color="#d6b78a" roughness={0.6} /></mesh>
      <mesh position={[0.18, 0.3, 0]} castShadow><boxGeometry args={[0.12, 0.6, 0.18]} /><meshStandardMaterial color="#d6b78a" roughness={0.6} /></mesh>
      <mesh position={[0, 0.65, 0]} castShadow><boxGeometry args={[0.55, 0.12, 0.2]} /><meshStandardMaterial color="#d6b78a" roughness={0.6} /></mesh>
    </group>
  );
}

function Mountain({ position, h, r, color }: { position: [number, number, number]; h: number; r: number; color: string }) {
  return (
    <mesh position={position} castShadow>
      <coneGeometry args={[r, h, 12]} />
      <meshStandardMaterial color={color} roughness={0.85} flatShading />
    </mesh>
  );
}

function PalmTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.04, 0.06, 0.7, 8]} /><meshStandardMaterial color="#92633a" roughness={1} /></mesh>
      <mesh position={[0, 0.75, 0]}><sphereGeometry args={[0.22, 12, 12]} /><meshStandardMaterial color="#16a34a" roughness={0.9} flatShading /></mesh>
    </group>
  );
}

function Pin({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2.2} floatIntensity={0.4} rotationIntensity={0}>
      <group position={position}>
        <mesh position={[0, 0.45, 0]}><sphereGeometry args={[0.11, 16, 16]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} /></mesh>
        <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.015, 0.015, 0.5, 6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} /></mesh>
      </group>
    </Float>
  );
}

/* ---------- Airplane that tilts toward cursor ---------- */
function Airplane({ pointer, radius = 4.4, speed = 0.22, y = 1.8 }: { pointer: Pointer; radius?: number; speed?: number; y?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.getElapsedTime() * speed;
    ref.current.position.set(Math.cos(t) * radius, y + Math.sin(t * 1.2) * 0.15, Math.sin(t) * radius);
    ref.current.rotation.y = -t + Math.PI / 2;
    ref.current.rotation.z = pointer.current.x * 0.25;
    ref.current.rotation.x = -pointer.current.y * 0.18;
  });
  return (
    <group ref={ref} scale={0.4}>
      <mesh castShadow>
        <capsuleGeometry args={[0.15, 0.95, 8, 16]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.5, 0.04, 0.34]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-0.5, 0.18, 0]}>
        <boxGeometry args={[0.28, 0.24, 0.04]} />
        <meshStandardMaterial color="#ff6b5e" metalness={0.5} roughness={0.3} />
      </mesh>
      <pointLight position={[0.5, 0, 0]} color="#fbbf24" intensity={0.4} distance={1.5} />
    </group>
  );
}

/* ---------- Island parallax tilt ---------- */
function FloatingIsland({ pointer }: { pointer: Pointer }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!group.current) return;
    const t = s.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.6) * 0.12;
    group.current.rotation.y += 0.0015;
    const tiltX = -pointer.current.y * 0.09; // ~5deg max
    const tiltZ = pointer.current.x * 0.09;
    group.current.rotation.x += (tiltX - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (tiltZ - group.current.rotation.z) * 0.05;
  });
  return (
    <group ref={group}>
      <IslandBase />
      <Road />
      <RailTrack />
      <LuxuryBus pointer={pointer} />
      <VandeBharatTrain />

      {/* Landmarks */}
      <MiniTaj position={[0.6, 0.18, 0.2]} />
      <GatewayOfIndia position={[-1.1, 0.18, 0.7]} />
      <Charminar position={[1.5, 0.18, -0.9]} />
      <MysorePalace position={[-0.4, 0.18, -1.4]} />
      <IndiaGate position={[1.7, 0.18, 0.7]} />

      {/* Himalayas */}
      <Mountain position={[-2.2, 0.7, -0.4]} h={1.7} r={0.6} color="#a78bfa" />
      <Mountain position={[-2.6, 0.55, 0.4]} h={1.3} r={0.5} color="#c4b5fd" />
      <Mountain position={[-1.9, 0.6, -1.5]} h={1.5} r={0.55} color="#8b5cf6" />
      {/* Snow caps */}
      <mesh position={[-2.2, 1.42, -0.4]}><coneGeometry args={[0.22, 0.4, 12]} /><meshStandardMaterial color="#ffffff" /></mesh>

      <PalmTree position={[2.2, 0.18, 0.2]} />
      <PalmTree position={[2.0, 0.18, -1.5]} />
      <PalmTree position={[-1.6, 0.18, 1.6]} />

      <Pin position={[0.6, 0.18, 0.2]} color="#ef4444" />
      <Pin position={[-1.1, 0.18, 0.7]} color="#3b82f6" />
      <Pin position={[1.5, 0.18, -0.9]} color="#f59e0b" />
      <Pin position={[-0.4, 0.18, -1.4]} color="#10b981" />
    </group>
  );
}

/* ---------- Camera ---------- */
function CameraRig({ pointer, scrollRef }: { pointer: Pointer; scrollRef: React.MutableRefObject<number> }) {
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.12;
    const s = scrollRef.current;
    const targetX = Math.sin(t) * 0.4 + pointer.current.x * 0.8;
    const targetY = 2.6 + pointer.current.y * 0.4 - s * 0.5;
    const targetZ = 8.4 - s * 2.0;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
    state.camera.lookAt(0, 0.2, 0);
  });
  return null;
}

export default function TravelScene3D({ scrollProgress }: { scrollProgress?: MotionValue<number> }) {
  const pointer = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!scrollProgress) return;
    return scrollProgress.on("change", (v) => {
      scrollRef.current = v;
    });
  }, [scrollProgress]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  };

  return (
    <div
      className="absolute inset-0"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => (pointer.current = { x: 0, y: 0 })}
    >
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 2.6, 8.4]} fov={42} />
        <CameraRig pointer={pointer} scrollRef={scrollRef} />

        <ambientLight intensity={0.85} color="#fff7ed" />
        <directionalLight position={[6, 8, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} color="#fff1d6" />
        <directionalLight position={[-6, 4, -4]} intensity={0.5} color="#bae6fd" />
        <pointLight position={[0, 5, 4]} intensity={0.6} color="#fbbf24" />

        <Suspense fallback={null}>
          <Environment preset="city" />

          <Float speed={0.8} floatIntensity={0.3} rotationIntensity={0.05}>
            <FloatingIsland pointer={pointer} />
          </Float>

          <Airplane pointer={pointer} radius={4.6} speed={0.2} y={2.0} />
          <Airplane pointer={pointer} radius={5.2} speed={-0.14} y={2.6} />

          <CruiseBoat />

          {/* Hot air balloons */}
          <HotAirBalloon position={[-3.5, 2.2, -1]} color="#ff6b5e" />
          <HotAirBalloon position={[3.4, 2.6, -0.5]} color="#3ccfb0" />
          <HotAirBalloon position={[2.5, 1.5, 2.5]} color="#fbbf24" />

          <Clouds material={THREE.MeshBasicMaterial}>
            <Cloud seed={1} bounds={[6, 1, 2]} segments={20} position={[-3.5, 3.0, -2]} color="#ffffff" opacity={0.85} />
            <Cloud seed={2} bounds={[7, 1, 2]} segments={20} position={[3.8, 3.4, -2.5]} color="#ffffff" opacity={0.8} />
            <Cloud seed={3} bounds={[5, 1, 2]} segments={18} position={[-2.2, -1.6, -3]} color="#ffffff" opacity={0.7} />
            <Cloud seed={4} bounds={[6, 1, 2]} segments={18} position={[3.0, -1.4, -2.8]} color="#ffffff" opacity={0.65} />
          </Clouds>

          <Sparkles count={60} scale={[10, 6, 6]} size={2.2} speed={0.3} color="#fbbf24" />
          <Sparkles count={40} scale={[10, 6, 6]} size={1.6} speed={0.4} color="#ffffff" />

          <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={12} blur={3} far={5} color="#1e3a8a" />
        </Suspense>
      </Canvas>
    </div>
  );
}

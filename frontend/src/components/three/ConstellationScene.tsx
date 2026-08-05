'use client';

import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import {
  Edges,
  Html,
  Line,
  OrthographicCamera,
  RoundedBox,
} from '@react-three/drei';
import {
  Braces,
  CloudCog,
  Database,
  ListTree,
  MonitorSmartphone,
  PanelsTopLeft,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import {
  CONSTELLATION_EDGES,
  CONSTELLATION_NODES,
  type ConstellationNode,
} from './constellationData';

const ICONS: Record<string, LucideIcon> = {
  client: MonitorSmartphone,
  frontend: PanelsTopLeft,
  api: Braces,
  auth: ShieldCheck,
  queue: ListTree,
  database: Database,
  cloud: CloudCog,
};

const ROUTES: Record<string, [number, number, number][]> = {
  'client-frontend': [
    [-3.55, 1.68, -0.12],
    [-3.2, 1.22, -0.12],
    [-2.78, 0.82, -0.12],
  ],
  'frontend-api': [
    [-1.78, 0.34, -0.12],
    [-1.15, 0.17, -0.12],
    [-0.78, 0.08, -0.12],
  ],
  'api-auth': [
    [0.8, 0.08, -0.12],
    [1.18, 0.2, -0.12],
    [1.48, 0.4, -0.12],
  ],
  'auth-queue': [
    [2.8, 0.87, -0.12],
    [3.2, 1.16, -0.12],
    [3.72, 1.58, -0.12],
  ],
  'api-database': [
    [-0.12, -0.48, -0.12],
    [-0.24, -0.96, -0.12],
    [-0.46, -1.58, -0.12],
  ],
  'database-cloud': [
    [0.14, -2.13, -0.12],
    [1.2, -2.13, -0.12],
    [2.4, -2.08, -0.12],
  ],
  'queue-cloud': [
    [4.08, 1.38, -0.12],
    [4.08, 0.5, -0.12],
    [3.82, -0.52, -0.12],
    [3.36, -1.5, -0.12],
  ],
};

function ResponsiveCamera() {
  const { size } = useThree();
  const zoom = size.width < 520 ? 52 : size.width < 650 ? 60 : 68;

  return (
    <OrthographicCamera
      makeDefault
      position={[0, 1.15, 10]}
      rotation={[-0.17, 0, 0]}
      zoom={zoom}
      near={0.1}
      far={40}
    />
  );
}

function ResponsiveMap({ children }: { children: React.ReactNode }) {
  const { size } = useThree();
  const narrow = size.width < 520;
  const shortCanvas = size.height < 500;

  return (
    <group
      position={[0, shortCanvas ? -0.38 : 0, 0]}
      scale={[narrow ? 0.82 : 1, narrow ? 0.9 : 1, 1]}
    >
      {children}
    </group>
  );
}

function NodeOverlay({
  node,
  hovered,
  dimmed,
}: {
  node: ConstellationNode;
  hovered: boolean;
  dimmed: boolean;
}) {
  const Icon = ICONS[node.id];
  const isApi = node.id === 'api';

  return (
    <>
      <Html
        center
        position={[0, 0.25, 0.56]}
        style={{ pointerEvents: 'none' }}
        zIndexRange={[20, 10]}
      >
        <div
          className={[
            'flex items-center justify-center rounded-lg border bg-obsidian/90 text-ivory shadow-[0_10px_30px_-15px_rgba(0,0,0,0.9)] backdrop-blur-sm transition-all duration-300',
            isApi ? 'h-12 w-12' : 'h-10 w-10',
            hovered
              ? 'border-crimson-bright/70 text-crimson-bright shadow-[0_10px_28px_-12px_rgba(229,72,77,0.5)]'
              : isApi
                ? 'border-crimson/45 text-crimson'
                : 'border-line-strong',
          ].join(' ')}
          style={{ opacity: dimmed ? 0.48 : 1 }}
        >
          <Icon className={isApi ? 'h-5 w-5' : 'h-[18px] w-[18px]'} strokeWidth={1.65} />
        </div>
      </Html>

      <Html
        center
        position={[0, -0.68, 0.28]}
        style={{ pointerEvents: 'none' }}
        zIndexRange={[20, 10]}
      >
        <div
          className="w-[132px] select-none text-center font-mono transition-all duration-300"
          style={{
            opacity: dimmed ? 0.38 : hovered ? 1 : 0.84,
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          <div className="flex items-center justify-center gap-1.5">
            <span className="rounded border border-crimson/35 bg-crimson/8 px-1 py-0.5 text-[9px] leading-none text-crimson">
              {String(node.index).padStart(2, '0')}
            </span>
            <strong className="text-[11px] font-semibold leading-none text-ivory">
              {node.label}
            </strong>
          </div>
          <small className="mt-1 block text-[9px] leading-none text-grey-muted">
            {node.sub}
          </small>
        </div>
      </Html>
    </>
  );
}

function SystemNode3D({
  node,
  hovered,
  dimmed,
  onHover,
}: {
  node: ConstellationNode;
  hovered: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const baseMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const topMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const isApi = node.id === 'api';
  const scale = isApi ? 1.12 : 1;

  useFrame((_state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetY = node.position[1] + (hovered ? 0.14 : 0);
    group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 10, delta);

    if (baseMaterialRef.current) {
      baseMaterialRef.current.emissiveIntensity = THREE.MathUtils.damp(
        baseMaterialRef.current.emissiveIntensity,
        hovered ? 0.18 : 0.035,
        9,
        delta
      );
    }
    if (topMaterialRef.current) {
      topMaterialRef.current.emissiveIntensity = THREE.MathUtils.damp(
        topMaterialRef.current.emissiveIntensity,
        hovered ? 0.28 : isApi ? 0.1 : 0.065,
        9,
        delta
      );
    }
  });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onHover(node.id);
  };

  return (
    <group
      ref={groupRef}
      position={node.position}
      scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={() => onHover(null)}
    >
      <RoundedBox
        args={[1.42, 0.24, 1]}
        radius={0.09}
        smoothness={5}
      >
        <meshStandardMaterial
          ref={baseMaterialRef}
          color="#23262e"
          metalness={0.28}
          roughness={0.56}
          emissive="#7f1d2d"
          emissiveIntensity={0.035}
        />
        <Edges
          threshold={20}
          color={hovered ? '#ff5a65' : '#56202b'}
          lineWidth={hovered ? 1.35 : 0.7}
        />
      </RoundedBox>

      <RoundedBox
        position={[0, 0.21, 0]}
        args={[1.08, 0.14, 0.72]}
        radius={0.065}
        smoothness={5}
      >
        <meshStandardMaterial
          ref={topMaterialRef}
          color="#2e323b"
          metalness={0.24}
          roughness={0.5}
          emissive="#7f1d2d"
          emissiveIntensity={isApi ? 0.1 : 0.065}
        />
        <Edges
          threshold={20}
          color={hovered ? '#ff5a65' : isApi ? '#a32c3d' : '#48202a'}
          lineWidth={hovered ? 1.25 : 0.65}
        />
      </RoundedBox>

      <NodeOverlay node={node} hovered={hovered} dimmed={dimmed} />
    </group>
  );
}

function DataPulse({
  curve,
  delay,
  dimmed,
}: {
  curve: THREE.CatmullRomCurve3;
  delay: number;
  dimmed: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const elapsedRef = useRef(0);
  const pointRef = useRef(new THREE.Vector3());

  useFrame((_state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    elapsedRef.current = (elapsedRef.current + delta * 0.2) % 1;
    const t = (elapsedRef.current + delay) % 1;
    curve.getPointAt(t, pointRef.current);
    mesh.position.copy(pointRef.current);

    const material = mesh.material as THREE.MeshBasicMaterial;
    material.opacity = (0.35 + Math.sin(t * Math.PI) * 0.65) * (dimmed ? 0.28 : 1);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.045, 10, 10]} />
      <meshBasicMaterial
        color="#ff5a65"
        transparent
        opacity={0.8}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function Connection({
  fromId,
  toId,
  active,
  dimmed,
  pulseDelay,
}: {
  fromId: string;
  toId: string;
  active: boolean;
  dimmed: boolean;
  pulseDelay?: number;
}) {
  const key = `${fromId}-${toId}`;
  const curve = useMemo(() => {
    const route = ROUTES[key];
    return new THREE.CatmullRomCurve3(
      route.map(point => new THREE.Vector3(...point)),
      false,
      'catmullrom',
      0.35
    );
  }, [key]);
  const points = useMemo(() => curve.getPoints(32), [curve]);

  return (
    <>
      <Line
        points={points}
        color={active ? '#ff5a65' : '#7f1d2d'}
        lineWidth={active ? 1.55 : 0.8}
        transparent
        opacity={active ? 0.9 : dimmed ? 0.12 : 0.42}
        depthWrite={false}
      />
      {pulseDelay !== undefined && (
        <DataPulse curve={curve} delay={pulseDelay} dimmed={dimmed} />
      )}
    </>
  );
}

export default function ConstellationScene({ paused = false }: { paused?: boolean }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const connectedIds = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    const ids = new Set<string>([hoveredId]);
    CONSTELLATION_EDGES.forEach(([from, to]) => {
      if (from === hoveredId) ids.add(to);
      if (to === hoveredId) ids.add(from);
    });
    return ids;
  }, [hoveredId]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      frameloop={paused ? 'never' : 'always'}
      onPointerMissed={() => setHoveredId(null)}
    >
      <ResponsiveCamera />

      <ambientLight intensity={0.95} />
      <hemisphereLight args={['#f5f2ea', '#08090b', 0.55]} />
      <directionalLight
        position={[4, 6, 8]}
        intensity={1.2}
        color="#f5f2ea"
      />
      <directionalLight position={[-4, 2, 5]} intensity={0.35} color="#9ca3af" />
      <pointLight position={[0, 1, 4]} intensity={0.4} color="#e5484d" />

      <ResponsiveMap>
        {CONSTELLATION_EDGES.map(([from, to], index) => {
          const active = hoveredId === from || hoveredId === to;
          const dimmed = hoveredId !== null && !active;
          const pulseDelay =
            index === 1 ? 0 : index === 5 ? 0.45 : undefined;

          return (
            <Connection
              key={`${from}-${to}`}
              fromId={from}
              toId={to}
              active={active}
              dimmed={dimmed}
              pulseDelay={pulseDelay}
            />
          );
        })}

        {CONSTELLATION_NODES.map(node => (
          <SystemNode3D
            key={node.id}
            node={node}
            hovered={hoveredId === node.id}
            dimmed={hoveredId !== null && !connectedIds.has(node.id)}
            onHover={setHoveredId}
          />
        ))}
      </ResponsiveMap>
    </Canvas>
  );
}

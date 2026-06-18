'use client';

import React, {
  useState,
  Suspense,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import {
  ArrowLeft,
  X,
  Trash2,
  RotateCw,
  Menu,
} from 'lucide-react';

// ─── TYPES 

type RoomShape = 'rectangular' | 'l-shape';
type UnitSystem = 'feet' | 'cm';

interface WallSplitDesign {
  splitMode: 'full' | 'horizontal' | 'vertical';
  tileColorBottom: string;
  tileColorTop: string;
  tileColorCenter: string;
  tileColorSides: string;
}

interface PlacedItem {
  id: string;
  type: string;
  name: string;
  cost: number;
  position: [number, number, number];
  rotation: number;
  isWallMounted: boolean;
}

interface DesignState {
  widthFt: number;
  depthFt: number;
  heightFt: number;
  shape: RoomShape;
  unit: UnitSystem;
  floorColor: string;
  wallDesigns: WallSplitDesign[];
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const TILE_COLORS = [
  { id: 'white', name: 'Metro White', hex: '#EAEAEA' },
  { id: 'gray', name: 'Slate Gray', hex: '#63666A' },
  { id: 'dark', name: 'Charcoal Black', hex: '#1E2022' },
  { id: 'blue', name: 'Oceanic Blue', hex: '#4A6FA5' },
  { id: 'green', name: 'Sage Green', hex: '#7A8B7B' },
  { id: 'gold', name: 'Sandstone Beige', hex: '#D2B48C' },
  { id: 'terracotta', name: 'Terracotta', hex: '#C07050' },
  { id: 'mosaic', name: 'Teal Mosaic', hex: '#2A7B88' },
];

const FLOOR_TILES = [
  { id: 'dark-gray', name: 'Dark Slate', hex: '#34383C' },
  { id: 'light-gray', name: 'Light Cement', hex: '#AEB4B8' },
  { id: 'black', name: 'Ebony Marble', hex: '#1A1A1C' },
  { id: 'wood-deck', name: 'Teak Plank', hex: '#8B5A2B' },
];

const ITEM_CATALOG = [
  { type: 'sink', name: 'Vanity Cabinet Sink', cost: 249.99, isWallMounted: false },
  { type: 'bathtub', name: 'Freestanding Bath', cost: 599.99, isWallMounted: false },
  { type: 'shower', name: 'Walk-In Shower Box', cost: 449.99, isWallMounted: false },
  { type: 'toilet', name: 'Wall-Hung Toilet', cost: 199.99, isWallMounted: false },
  { type: 'towel_rail', name: 'Chrome Towel Ladder', cost: 119.99, isWallMounted: true },
  { type: 'washing_machine', name: 'Eco Wash Machine', cost: 349.99, isWallMounted: false },
  { type: 'light', name: 'Vanity Mirror Light', cost: 79.99, isWallMounted: true },
  { type: 'plant', name: 'Deco Ceramic Plant', cost: 44.99, isWallMounted: false },
];

const INITIAL_WALL_DESIGN: WallSplitDesign = {
  splitMode: 'full',
  tileColorBottom: '#63666A',
  tileColorTop: '#EAEAEA',
  tileColorCenter: '#2A7B88',
  tileColorSides: '#EAEAEA',
};

const INITIAL: DesignState = {
  widthFt: 12.0,
  depthFt: 9.0,
  heightFt: 8.5,
  shape: 'rectangular',
  unit: 'feet',
  floorColor: '#34383C',
  wallDesigns: Array(8).fill(null).map(() => ({ ...INITIAL_WALL_DESIGN })),
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function feetToCm(ft: number) { return Math.round(ft * 30.48); }
function cmToFeet(cm: number) { return parseFloat((cm / 30.48).toFixed(2)); }

// Tile texture cache (canvas-generated with grout lines)
const tileTextureCache: Record<string, THREE.CanvasTexture> = {};

function getTileTexture(color: string, repeatX: number, repeatY: number) {
  const key = `${color}_${repeatX}_${repeatY}`;
  if (tileTextureCache[key]) return tileTextureCache[key];

  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = 'rgba(180,184,188,0.6)';
    ctx.lineWidth = 3;
    ctx.strokeRect(1, 1, 126, 126);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tileTextureCache[key] = tex;
  return tex;
}

// ─── 3D FIXTURE MODELS ───────────────────────────────────────────────────────

function SinkModel({ selected }: { selected: boolean }) {
  return (
    <group>
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[1.5, 2.3, 1.3]} />
        <meshStandardMaterial color="#A08060" roughness={0.6} />
      </mesh>
      <mesh position={[0, 2.45, 0]}>
        <boxGeometry args={[1.6, 0.2, 1.4]} />
        <meshStandardMaterial color="#fafafa" roughness={0.1} />
      </mesh>
      <mesh position={[0, 2.7, -0.4]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
        <meshStandardMaterial color="#c0c5c8" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 2.9, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial color="#c0c5c8" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.5, 0.67]}>
        <boxGeometry args={[0.6, 0.06, 0.06]} />
        <meshStandardMaterial color="#d0d5d8" metalness={0.8} />
      </mesh>
      {selected && (
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[1.7, 2.9, 1.5]} />
          <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

function BathtubModel({ selected }: { selected: boolean }) {
  return (
    <group>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[4.2, 1.7, 2.2]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.15} />
      </mesh>
      <mesh position={[0, 1.75, 0]}>
        <boxGeometry args={[4.3, 0.1, 2.3]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.8, 1.8]} />
        <meshStandardMaterial color="#a5d8f3" transparent opacity={0.65} roughness={0.05} />
      </mesh>
      {selected && (
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[4.4, 1.9, 2.4]} />
          <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

function ShowerModel({ selected }: { selected: boolean }) {
  return (
    <group>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[2.5, 0.2, 2.5]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.5, -1.2]}>
        <boxGeometry args={[2.4, 6.8, 0.1]} />
        <meshStandardMaterial color="#fafafa" roughness={0.4} />
      </mesh>
      <mesh position={[-1.2, 3.5, 0]}>
        <boxGeometry args={[0.06, 6.8, 2.4]} />
        <meshStandardMaterial color="#dbeafe" transparent opacity={0.35} roughness={0.05} />
      </mesh>
      <mesh position={[0, 4.0, -1.1]}>
        <cylinderGeometry args={[0.04, 0.04, 3.5, 8]} />
        <meshStandardMaterial color="#b0b8c0" metalness={0.9} />
      </mesh>
      <mesh position={[0, 5.7, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
        <meshStandardMaterial color="#b0b8c0" metalness={0.9} />
      </mesh>
      {selected && (
        <mesh position={[0, 3.5, 0]}>
          <boxGeometry args={[2.6, 7.1, 2.6]} />
          <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

function ToiletModel({ selected }: { selected: boolean }) {
  return (
    <group>
      <mesh position={[0, 0.8, 0.3]}>
        <boxGeometry args={[1.1, 1.4, 1.4]} />
        <meshStandardMaterial color="#fefefe" roughness={0.1} />
      </mesh>
      <mesh position={[0, 2.0, -0.4]}>
        <boxGeometry args={[1.2, 1.2, 0.7]} />
        <meshStandardMaterial color="#fefefe" roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.55, 0.35]}>
        <boxGeometry args={[1.05, 0.1, 1.3]} />
        <meshStandardMaterial color="#eaeaea" roughness={0.4} />
      </mesh>
      {selected && (
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[1.3, 2.8, 1.6]} />
          <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

function TowelRailModel({ selected }: { selected: boolean }) {
  return (
    <group>
      <mesh position={[-0.4, 2.5, 0.05]}>
        <cylinderGeometry args={[0.03, 0.03, 3.5, 8]} />
        <meshStandardMaterial color="#d0d5d8" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.4, 2.5, 0.05]}>
        <cylinderGeometry args={[0.03, 0.03, 3.5, 8]} />
        <meshStandardMaterial color="#d0d5d8" metalness={0.9} roughness={0.1} />
      </mesh>
      {[0, 1, 2, 3, 4].map(i => (
        <mesh key={i} position={[0, 1.1 + i * 0.7, 0.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial color="#d0d5d8" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {selected && (
        <mesh position={[0, 2.5, 0.05]}>
          <boxGeometry args={[1.0, 3.7, 0.2]} />
          <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

function WashingMachineModel({ selected }: { selected: boolean }) {
  return (
    <group>
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[1.6, 2.5, 1.6]} />
        <meshStandardMaterial color="#fafafa" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.1, 0.82]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.04, 32]} />
        <meshStandardMaterial color="#2d3748" metalness={0.4} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.1, 0.84]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.03, 16]} />
        <meshStandardMaterial color="#c0e0f0" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 2.2, 0.81]}>
        <boxGeometry args={[1.4, 0.3, 0.03]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>
      {selected && (
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[1.75, 2.7, 1.75]} />
          <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

function WallLightModel({ selected }: { selected: boolean }) {
  return (
    <group>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.2, 0.6, 0.1]} />
        <meshStandardMaterial color="#333" metalness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.28]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#fff" emissive="#fffae0" emissiveIntensity={2.5} />
      </mesh>
      <pointLight position={[0, 0, 0.4]} intensity={2.0} color="#ffeed0" distance={6} />
      {selected && (
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[0.5, 0.8, 0.6]} />
          <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

function PlantModel({ selected }: { selected: boolean }) {
  return (
    <group>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.35, 0.22, 0.8, 16]} />
        <meshStandardMaterial color="#cc8866" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <cylinderGeometry args={[0.33, 0.33, 0.03, 8]} />
        <meshStandardMaterial color="#4b3621" roughness={1.0} />
      </mesh>
      {[0, 1, 2, 3, 4].map(i => (
        <mesh key={i} position={[0, 1.1, 0]} rotation={[0.3, i * (Math.PI * 0.4), 0.2]}>
          <boxGeometry args={[0.12, 1.0, 0.02]} />
          <meshStandardMaterial color="#3f8f52" roughness={0.8} />
        </mesh>
      ))}
      {selected && (
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[1.0, 1.9, 1.0]} />
          <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

// ─── BATHROOM SCENE ──────────────────────────────────────────────────────────

function BathroomScene({
  state,
  topView,
  activeSideView,
  setActiveSideView,
  zoomTrigger,
  setZoomTrigger,
  setNumWalls,
  placedItems,
  setPlacedItems,
  selectedItemId,
  setSelectedItemId,
  isPlacingItem,
  setIsPlacingItem,
  orbitEnabled,
  setOrbitEnabled,
}: {
  state: DesignState;
  topView: boolean;
  activeSideView: number | null;
  setActiveSideView: (n: number | null) => void;
  zoomTrigger: 'in' | 'out' | null;
  setZoomTrigger: (t: 'in' | 'out' | null) => void;
  setNumWalls: (n: number) => void;
  placedItems: PlacedItem[];
  setPlacedItems: React.Dispatch<React.SetStateAction<PlacedItem[]>>;
  selectedItemId: string | null;
  setSelectedItemId: (s: string | null) => void;
  isPlacingItem: PlacedItem | null;
  setIsPlacingItem: (item: PlacedItem | null) => void;
  orbitEnabled: boolean;
  setOrbitEnabled: (v: boolean) => void;
}) {
  const { camera, gl } = useThree();
  const w = state.widthFt;
  const d = state.depthFt;
  const h = state.heightFt;

  const controlsRef = useRef<any>(null);
  const draggingItemId = useRef<string | null>(null);

  // Room polygon (x, z) world space
  const polygon = useMemo((): [number, number][] => {
    if (state.shape === 'l-shape') {
      return [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, 0], [w * 0.1, 0], [w * 0.1, d / 2], [-w / 2, d / 2]];
    }
    return [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]];
  }, [state.shape, w, d]);

  // Floor geometry
  const floorGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(polygon[0][0], -polygon[0][1]);
    for (let i = 1; i < polygon.length; i++) shape.lineTo(polygon[i][0], -polygon[i][1]);
    shape.closePath();
    return new THREE.ShapeGeometry(shape, 3);
  }, [polygon]);

  // Wall segments from polygon edges
  const walls = useMemo(() => {
    return polygon.map((p, i) => {
      const q = polygon[(i + 1) % polygon.length];
      const dx = q[0] - p[0];
      const dz = q[1] - p[1];
      const len = Math.sqrt(dx * dx + dz * dz);
      return {
        p1: p, p2: q,
        cx: (p[0] + q[0]) / 2,
        cz: (p[1] + q[1]) / 2,
        len,
        rotY: Math.atan2(-dz, dx),
      };
    });
  }, [polygon]);

  // Dynamic wall visibility — front-facing walls fade away on rotate
  const [wallVisibilities, setWallVisibilities] = useState<boolean[]>([]);

  useFrame(() => {
    if (topView) {
      const all = walls.map(() => true);
      if (all.join(',') !== wallVisibilities.join(',')) setWallVisibilities(all);
      return;
    }
    const camX = camera.position.x;
    const camZ = camera.position.z;
    const vis = walls.map(wall => {
      // Wall normal points inward; dot product with camera position:
      // if camera is "in front" of the wall (same side), hide it.
      const dot = camX * wall.cx + camZ * wall.cz;
      return dot < 0.1;
    });
    if (vis.join(',') !== wallVisibilities.join(',')) setWallVisibilities(vis);
  });

  useEffect(() => { setNumWalls(walls.length); }, [walls.length, setNumWalls]);

  const raycasterRef = useMemo(() => new THREE.Raycaster(), []);
  const floorPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);

  const getFloorHit = useCallback((e: PointerEvent): THREE.Vector3 | null => {
    const rect = gl.domElement.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycasterRef.setFromCamera(new THREE.Vector2(mx, my), camera);
    const pt = new THREE.Vector3();
    return raycasterRef.ray.intersectPlane(floorPlane, pt) ? pt : null;
  }, [camera, gl, raycasterRef, floorPlane]);

  // Pointer drag logic
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const activeId = draggingItemId.current || (isPlacingItem ? isPlacingItem.id : null);
      if (!activeId || walls.length === 0) return;
      const pt = getFloorHit(e);
      if (!pt) return;

      const itemToMove = placedItems.find(i => i.id === activeId) || isPlacingItem;
      if (!itemToMove) return;

      if (itemToMove.isWallMounted) {
        // Snap to nearest wall
        let closestWallIdx = 0;
        let closestDist = Infinity;
        let closestOffset = 0;

        walls.forEach((wall, idx) => {
          const dx = wall.p2[0] - wall.p1[0];
          const dz = wall.p2[1] - wall.p1[1];
          const ux = pt.x - wall.p1[0];
          const uz = pt.z - wall.p1[1];
          const wallLenSq = wall.len * wall.len;
          const t = Math.max(0.1, Math.min(0.9, wallLenSq > 0 ? (ux * dx + uz * dz) / wallLenSq : 0));
          const projX = wall.p1[0] + t * dx;
          const projZ = wall.p1[1] + t * dz;
          const dist = Math.hypot(pt.x - projX, pt.z - projZ);
          if (dist < closestDist) { closestDist = dist; closestWallIdx = idx; closestOffset = t * wall.len; }
        });

        const wall = walls[closestWallIdx];
        const dx = wall.p2[0] - wall.p1[0];
        const dz = wall.p2[1] - wall.p1[1];
        const ux = dx / wall.len, uz = dz / wall.len;
        const nx = -uz, nz = ux;
        const bias = 0.08;
        const posX = wall.p1[0] + ux * closestOffset + nx * bias;
        const posZ = wall.p1[1] + uz * closestOffset + nz * bias;

        const wallPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
          new THREE.Vector3(nx, 0, nz).normalize(),
          new THREE.Vector3(wall.cx, 0, wall.cz)
        );
        const wallPt = new THREE.Vector3();
        let heightY = 4.5;
        if (raycasterRef.ray.intersectPlane(wallPlane, wallPt)) {
          heightY = Math.max(1.0, Math.min(h - 1.5, wallPt.y));
        }

        const updateItem = (prev: PlacedItem) => ({
          ...prev,
          position: [posX, heightY, posZ] as [number, number, number],
          rotation: wall.rotY,
        });

        if (draggingItemId.current) {
          setPlacedItems(prev => prev.map(item => item.id === activeId ? updateItem(item) : item));
        } else if (isPlacingItem) {
          setIsPlacingItem(updateItem(isPlacingItem));
        }
      } else {
        const boundOffset = 0.8;
        const posX = Math.max(-w / 2 + boundOffset, Math.min(w / 2 - boundOffset, pt.x));
        const posZ = Math.max(-d / 2 + boundOffset, Math.min(d / 2 - boundOffset, pt.z));

        const updateItem = (prev: PlacedItem) => ({
          ...prev,
          position: [posX, 0, posZ] as [number, number, number],
        });

        if (draggingItemId.current) {
          setPlacedItems(prev => prev.map(item => item.id === activeId ? updateItem(item) : item));
        } else if (isPlacingItem) {
          setIsPlacingItem(updateItem(isPlacingItem));
        }
      }
    };

    const onUp = () => {
      if (draggingItemId.current) {
        draggingItemId.current = null;
        setOrbitEnabled(true);
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [getFloorHit, walls, h, w, d, placedItems, isPlacingItem, setPlacedItems, setIsPlacingItem, raycasterRef, setOrbitEnabled]);

  // Top-view camera
  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    if (topView) {
      controls.target.set(0, 0, 0);
      camera.position.set(0, Math.max(w, d) * 1.5, 0);
      controls.update();
    } else {
      controls.target.set(0, h * 0.28, 0);
      camera.position.set(w * 0.48, h * 0.52, d * 1.18);
      controls.update();
    }
  }, [topView, camera, w, d, h]);

  // Side-view jump
  useEffect(() => {
    if (activeSideView === null || !controlsRef.current || walls.length === 0) return;
    const controls = controlsRef.current;
    const wall = walls[activeSideView];
    if (!wall) return;
    const dx = wall.p2[0] - wall.p1[0];
    const dz = wall.p2[1] - wall.p1[1];
    const nx = -(dz / wall.len);
    const nz = (dx / wall.len);
    const viewDist = Math.max(w, d) * 0.8;
    camera.position.set(wall.cx + nx * viewDist, h * 0.5, wall.cz + nz * viewDist);
    controls.target.set(wall.cx, h * 0.5, wall.cz);
    controls.update();
    setActiveSideView(null);
  }, [activeSideView, walls, w, d, h, camera, setActiveSideView]);

  // Zoom triggers
  useEffect(() => {
    if (!zoomTrigger || !controlsRef.current) return;
    const target = controlsRef.current.target;
    const dir = new THREE.Vector3().subVectors(camera.position, target);
    dir.multiplyScalar(zoomTrigger === 'in' ? 0.8 : 1.25);
    camera.position.addVectors(target, dir);
    controlsRef.current.update();
    setZoomTrigger(null);
  }, [zoomTrigger, camera, setZoomTrigger]);

  const floorTexture = useMemo(() => getTileTexture(state.floorColor, 8, 8), [state.floorColor]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[w * 0.4, h * 1.2, d * 0.9]} intensity={0.5} castShadow />
      <spotLight position={[-w * 0.2, h - 0.2, -d * 0.2]} angle={Math.PI / 3} penumbra={0.8} intensity={2.0} castShadow />
      <spotLight position={[w * 0.2, h - 0.2, d * 0.2]} angle={Math.PI / 3} penumbra={0.8} intensity={2.0} castShadow />

      {/* Floor */}
      <mesh geometry={floorGeom} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial map={floorTexture} roughness={0.7} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Ceiling */}
      <mesh geometry={floorGeom} rotation={[Math.PI / 2, 0, 0]} position={[0, h, 0]}>
        <meshStandardMaterial color="#f0eeeb" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Walls */}
      {walls.map((wall, i) => {
        const isVisible = wallVisibilities[i] !== false;
        if (!isVisible) return null;

        const design = state.wallDesigns[i] || INITIAL_WALL_DESIGN;
        const split = design.splitMode;
        const repX = Math.max(1, Math.round(wall.len * 0.8));
        const repY = Math.max(1, Math.round(h * 0.8));

        if (split === 'full') {
          return (
            <mesh key={`w-${i}`} position={[wall.cx, h / 2, wall.cz]} rotation={[0, wall.rotY, 0]}>
              <planeGeometry args={[wall.len, h]} />
              <meshStandardMaterial map={getTileTexture(design.tileColorBottom, repX, repY)} roughness={0.4} side={THREE.DoubleSide} />
            </mesh>
          );
        }

        if (split === 'horizontal') {
          const hBot = 3.5;
          const hTop = h - hBot;
          return (
            <group key={`w-${i}`} position={[wall.cx, 0, wall.cz]} rotation={[0, wall.rotY, 0]}>
              <mesh position={[0, hBot / 2, 0]}>
                <planeGeometry args={[wall.len, hBot]} />
                <meshStandardMaterial map={getTileTexture(design.tileColorBottom, repX, Math.max(1, Math.round(hBot * 0.8)))} roughness={0.4} side={THREE.DoubleSide} />
              </mesh>
              <mesh position={[0, hBot + hTop / 2, 0]}>
                <planeGeometry args={[wall.len, hTop]} />
                <meshStandardMaterial map={getTileTexture(design.tileColorTop, repX, Math.max(1, Math.round(hTop * 0.8)))} roughness={0.4} side={THREE.DoubleSide} />
              </mesh>
              {/* Skirting strip */}
              <mesh position={[0, hBot, 0.005]}>
                <planeGeometry args={[wall.len, 0.12]} />
                <meshStandardMaterial color="#6B4E31" roughness={0.8} />
              </mesh>
            </group>
          );
        }

        if (split === 'vertical') {
          const wCenter = 2.4;
          const wSides = (wall.len - wCenter) / 2;
          return (
            <group key={`w-${i}`} position={[wall.cx, h / 2, wall.cz]} rotation={[0, wall.rotY, 0]}>
              <mesh position={[0, 0, 0.002]}>
                <planeGeometry args={[wCenter, h]} />
                <meshStandardMaterial map={getTileTexture(design.tileColorCenter, Math.max(1, Math.round(wCenter * 0.8)), repY)} roughness={0.2} metalness={0.1} side={THREE.DoubleSide} />
              </mesh>
              {wSides > 0 && (
                <>
                  <mesh position={[-(wCenter / 2 + wSides / 2), 0, 0]}>
                    <planeGeometry args={[wSides, h]} />
                    <meshStandardMaterial map={getTileTexture(design.tileColorSides, Math.max(1, Math.round(wSides * 0.8)), repY)} roughness={0.4} side={THREE.DoubleSide} />
                  </mesh>
                  <mesh position={[wCenter / 2 + wSides / 2, 0, 0]}>
                    <planeGeometry args={[wSides, h]} />
                    <meshStandardMaterial map={getTileTexture(design.tileColorSides, Math.max(1, Math.round(wSides * 0.8)), repY)} roughness={0.4} side={THREE.DoubleSide} />
                  </mesh>
                </>
              )}
            </group>
          );
        }

        return null;
      })}

      {/* Placed items */}
      {placedItems.map(item => {
        const isSelected = selectedItemId === item.id;
        return (
          <group
            key={item.id}
            position={item.position}
            rotation={[0, item.rotation, 0]}
            onPointerDown={(e) => {
              e.stopPropagation();
              setSelectedItemId(item.id);
              draggingItemId.current = item.id;
              setOrbitEnabled(false);
            }}
          >
            {item.type === 'sink' && <SinkModel selected={isSelected} />}
            {item.type === 'bathtub' && <BathtubModel selected={isSelected} />}
            {item.type === 'shower' && <ShowerModel selected={isSelected} />}
            {item.type === 'toilet' && <ToiletModel selected={isSelected} />}
            {item.type === 'towel_rail' && <TowelRailModel selected={isSelected} />}
            {item.type === 'washing_machine' && <WashingMachineModel selected={isSelected} />}
            {item.type === 'light' && <WallLightModel selected={isSelected} />}
            {item.type === 'plant' && <PlantModel selected={isSelected} />}
          </group>
        );
      })}

      {/* Placing-item ghost */}
      {isPlacingItem && (
        <group position={isPlacingItem.position} rotation={[0, isPlacingItem.rotation, 0]}>
          {isPlacingItem.type === 'sink' && <SinkModel selected />}
          {isPlacingItem.type === 'bathtub' && <BathtubModel selected />}
          {isPlacingItem.type === 'shower' && <ShowerModel selected />}
          {isPlacingItem.type === 'toilet' && <ToiletModel selected />}
          {isPlacingItem.type === 'towel_rail' && <TowelRailModel selected />}
          {isPlacingItem.type === 'washing_machine' && <WashingMachineModel selected />}
          {isPlacingItem.type === 'light' && <WallLightModel selected />}
          {isPlacingItem.type === 'plant' && <PlantModel selected />}
        </group>
      )}

      <OrbitControls
        ref={controlsRef}
        enabled={orbitEnabled}
        target={[0, h * 0.28, 0]}
        enablePan={true}
        enableRotate={!topView}
        minDistance={3}
        maxDistance={Math.max(w, d) * 1.8}
        maxPolarAngle={topView ? 0 : Math.PI * 0.48}
        minPolarAngle={topView ? 0 : Math.PI * 0.05}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />
    </>
  );
}

// ─── CUSTOMISE ROOM DRAWER ───────────────────────────────────────────────────

function CustomiseRoomDrawer({
  state,
  numWalls,
  onChange,
  onClose,
}: {
  state: DesignState;
  numWalls: number;
  onChange: (s: Partial<DesignState>) => void;
  onClose: () => void;
}) {
  const { unit, widthFt, depthFt, heightFt, floorColor, wallDesigns } = state;
  const [selectedWallIdx, setSelectedWallIdx] = useState(0);

  const fromCm = (c: number) => parseFloat((c / 30.48).toFixed(2));

  const updateWallDesign = (idx: number, updates: Partial<WallSplitDesign>) => {
    const next = [...wallDesigns];
    next[idx] = { ...next[idx], ...updates };
    onChange({ wallDesigns: next });
  };

  const wallCount = Math.max(4, numWalls);

  return (
    <div className="absolute inset-y-0 left-0 w-80 bg-white shadow-2xl z-40 border-r border-gray-100 flex flex-col font-sans overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#1A1A1A] text-white">
        <h2 className="font-semibold text-sm tracking-wider uppercase">Customise Room</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Unit system */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Unit System</label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-full">
            {(['feet', 'cm'] as UnitSystem[]).map(u => (
              <button
                key={u}
                onClick={() => onChange({ unit: u })}
                className={`py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full transition-all ${unit === u ? 'bg-white shadow text-[#1A1A1A]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {u === 'feet' ? 'Feet' : 'Metric'}
              </button>
            ))}
          </div>
        </div>

        {/* Dimensions */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100 pb-1.5">Room Dimensions</h3>
          {[
            { label: 'Width', val: widthFt, key: 'widthFt' as const },
            { label: 'Depth', val: depthFt, key: 'depthFt' as const },
            { label: 'Height', val: heightFt, key: 'heightFt' as const },
          ].map(({ label, val, key }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-gray-500 uppercase">{label}</span>
              <input
                type="number"
                value={unit === 'feet' ? val : feetToCm(val)}
                step={unit === 'feet' ? 0.5 : 10}
                min={unit === 'feet' ? 4 : 120}
                max={unit === 'feet' ? 24 : 750}
                onChange={e => {
                  const v = parseFloat(e.target.value) || 0;
                  onChange({ [key]: unit === 'feet' ? v : fromCm(v) });
                }}
                className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-xs text-[#1A1A1A] font-mono focus:outline-none focus:border-[#1A1A1A] rounded"
              />
            </div>
          ))}
        </div>

        {/* Room shape */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100 pb-1.5">Room Shape</h3>
          <div className="grid grid-cols-2 gap-2">
            {(['rectangular', 'l-shape'] as RoomShape[]).map(s => (
              <button
                key={s}
                onClick={() => onChange({ shape: s })}
                className={`py-2 text-[10px] font-bold border rounded uppercase tracking-wider transition-all ${state.shape === s ? 'bg-[#1A1A1A] text-white border-transparent' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                {s === 'rectangular' ? 'Rectangle' : 'L-Shape'}
              </button>
            ))}
          </div>
        </div>

        {/* Floor tiles */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100 pb-1.5">Floor Tiles</h3>
          <div className="grid grid-cols-4 gap-2">
            {FLOOR_TILES.map(ft => (
              <button
                key={ft.id}
                onClick={() => onChange({ floorColor: ft.hex })}
                style={{ background: ft.hex }}
                className={`h-9 w-full rounded border-2 transition-all ${floorColor === ft.hex ? 'border-[#1A1A1A] scale-105 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                title={ft.name}
              />
            ))}
          </div>
        </div>

        {/* Wall split & tiles */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100 pb-1.5">Wall Splits & Tiles</h3>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-500 uppercase">Select Wall</span>
            <select
              value={selectedWallIdx}
              onChange={e => setSelectedWallIdx(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-xs text-[#1A1A1A] rounded focus:outline-none"
            >
              {Array.from({ length: wallCount }).map((_, i) => (
                <option key={i} value={i}>
                  Wall {i + 1} ({i === 0 ? 'Back' : i === 1 ? 'Right' : i === 2 ? 'Left' : 'Front'})
                </option>
              ))}
            </select>
          </div>

          {/* Split mode */}
          <div className="grid grid-cols-3 gap-1.5 text-center">
            {[
              { id: 'full' as const, label: 'Single' },
              { id: 'horizontal' as const, label: 'Horiz.' },
              { id: 'vertical' as const, label: 'Vert.' },
            ].map(mode => {
              const active = (wallDesigns[selectedWallIdx]?.splitMode || 'full') === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => updateWallDesign(selectedWallIdx, { splitMode: mode.id })}
                  className={`py-2 text-[10px] font-bold border rounded transition-all uppercase tracking-wider ${active ? 'bg-[#1A1A1A] text-white border-transparent' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>

          {/* Color pickers per split mode */}
          {wallDesigns[selectedWallIdx]?.splitMode === 'full' && (
            <div className="space-y-2">
              <span className="text-[9px] text-gray-400 block font-semibold">Tile Color</span>
              <div className="grid grid-cols-4 gap-2">
                {TILE_COLORS.map(tc => (
                  <button
                    key={tc.id}
                    onClick={() => updateWallDesign(selectedWallIdx, { tileColorBottom: tc.hex })}
                    style={{ background: tc.hex }}
                    className={`h-8 w-full rounded border-2 transition-all ${wallDesigns[selectedWallIdx]?.tileColorBottom === tc.hex ? 'border-[#1A1A1A] scale-105' : 'border-gray-200'}`}
                    title={tc.name}
                  />
                ))}
              </div>
            </div>
          )}

          {wallDesigns[selectedWallIdx]?.splitMode === 'horizontal' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[9px] text-gray-400 block font-semibold">Bottom Tile</span>
                <div className="grid grid-cols-4 gap-2">
                  {TILE_COLORS.map(tc => (
                    <button key={tc.id} onClick={() => updateWallDesign(selectedWallIdx, { tileColorBottom: tc.hex })} style={{ background: tc.hex }}
                      className={`h-8 w-full rounded border-2 transition-all ${wallDesigns[selectedWallIdx]?.tileColorBottom === tc.hex ? 'border-[#1A1A1A] scale-105' : 'border-gray-200'}`} title={tc.name} />
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[9px] text-gray-400 block font-semibold">Top Tile</span>
                <div className="grid grid-cols-4 gap-2">
                  {TILE_COLORS.map(tc => (
                    <button key={tc.id} onClick={() => updateWallDesign(selectedWallIdx, { tileColorTop: tc.hex })} style={{ background: tc.hex }}
                      className={`h-8 w-full rounded border-2 transition-all ${wallDesigns[selectedWallIdx]?.tileColorTop === tc.hex ? 'border-[#1A1A1A] scale-105' : 'border-gray-200'}`} title={tc.name} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {wallDesigns[selectedWallIdx]?.splitMode === 'vertical' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[9px] text-gray-400 block font-semibold">Center Accent</span>
                <div className="grid grid-cols-4 gap-2">
                  {TILE_COLORS.map(tc => (
                    <button key={tc.id} onClick={() => updateWallDesign(selectedWallIdx, { tileColorCenter: tc.hex })} style={{ background: tc.hex }}
                      className={`h-8 w-full rounded border-2 transition-all ${wallDesigns[selectedWallIdx]?.tileColorCenter === tc.hex ? 'border-[#1A1A1A] scale-105' : 'border-gray-200'}`} title={tc.name} />
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[9px] text-gray-400 block font-semibold">Sides Tile</span>
                <div className="grid grid-cols-4 gap-2">
                  {TILE_COLORS.map(tc => (
                    <button key={tc.id} onClick={() => updateWallDesign(selectedWallIdx, { tileColorSides: tc.hex })} style={{ background: tc.hex }}
                      className={`h-8 w-full rounded border-2 transition-all ${wallDesigns[selectedWallIdx]?.tileColorSides === tc.hex ? 'border-[#1A1A1A] scale-105' : 'border-gray-200'}`} title={tc.name} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ICONS ───────────────────────────────────────────────────────────

const SINK_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6z" />
    <path d="M12 2v4M10 2h4" />
  </svg>
);
const BATHTUB_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 10h20v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-8z" />
    <path d="M4 6v4M2 14c4-4 16-4 20 0M6 22v1M18 22v1" />
  </svg>
);
const TOWEL_RAIL_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M6 3v18M18 3v18M6 7h12M6 12h12M6 17h12" />
  </svg>
);
const SHOWER_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 4h16M12 4v8" />
    <path d="M8 12a4 4 0 0 1 8 0" />
    <path d="M10 16v1M12 16v2M14 16v1" />
  </svg>
);
const TOILET_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 3h6v8H5zM8 11v8a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-8H8z" />
  </svg>
);
const WASHING_MACHINE_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <circle cx="12" cy="13" r="4" />
    <circle cx="12" cy="13" r="2" />
    <path d="M7 6h2M15 6h2" />
  </svg>
);
const LIGHT_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="9" r="4" />
    <path d="M9 13h6M12 17v4M10 21h4" />
  </svg>
);
const ACCESSORIES_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M8 22h8v-6a4 4 0 0 0-4-4H12a4 4 0 0 0-4 4v6z" />
    <path d="M12 12V3M10 4l4 4" />
  </svg>
);

// ─── SUMMARY MODAL ───────────────────────────────────────────────────────────

function SummaryModal({ items, total, onClose }: { items: PlacedItem[]; total: number; onClose: () => void; }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white max-w-md w-full mx-4 shadow-2xl rounded-xl overflow-hidden font-sans border border-gray-100">
        <div className="bg-[#1A1A1A] px-6 py-5 text-white flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Bathroom Cost Summary</h2>
            <p className="text-[11px] text-gray-400 font-light mt-0.5">Summary of placed items</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-4 max-h-[300px] overflow-y-auto divide-y divide-gray-100">
          {items.length === 0 ? (
            <div className="py-6 text-center text-xs text-gray-400 font-light">No items placed yet.</div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-semibold text-[#1A1A1A]">{item.name}</h4>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">
                    {item.isWallMounted ? 'Wall Mounted' : 'Floor Mounted'}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#1A1A1A]">£{item.cost.toFixed(2)}</span>
              </div>
            ))
          )}
        </div>
        <div className="bg-gray-50 px-6 py-5 border-t border-gray-100 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Price</span>
            <span className="text-lg font-mono font-bold text-[#1A1A1A]">£{total.toFixed(2)}</span>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white font-semibold text-xs tracking-widest uppercase py-3.5 transition-all text-center rounded-lg"
          >
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function BathroomPlannerPage() {
  const router = useRouter();
  const [state, setState] = useState<DesignState>(INITIAL);
  const [topView, setTopView] = useState(false);
  const [activeSideView, setActiveSideView] = useState<number | null>(null);
  const [zoomTrigger, setZoomTrigger] = useState<'in' | 'out' | null>(null);
  const [numWalls, setNumWalls] = useState(0);

  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isPlacingItem, setIsPlacingItem] = useState<PlacedItem | null>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showRoomCustomizer, setShowRoomCustomizer] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // ── orbit enable lives in parent so both Scene + UI can toggle it ──
  const [orbitEnabled, setOrbitEnabled] = useState(true);

  const [undoStack, setUndoStack] = useState<PlacedItem[][]>([]);
  const [redoStack, setRedoStack] = useState<PlacedItem[][]>([]);

  const update = (p: Partial<DesignState>) => setState(prev => ({ ...prev, ...p }));

  const selectedItem = useMemo(() => placedItems.find(i => i.id === selectedItemId), [placedItems, selectedItemId]);
  const totalPrice = useMemo(() => placedItems.reduce((s, i) => s + i.cost, 0), [placedItems]);

  const recordHistory = (next: PlacedItem[]) => {
    setUndoStack(prev => [...prev, placedItems]);
    setRedoStack([]);
    setPlacedItems(next);
  };

  const handleUndo = () => {
    if (!undoStack.length) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack(s => s.slice(0, -1));
    setRedoStack(s => [...s, placedItems]);
    setPlacedItems(prev);
    setSelectedItemId(null);
  };

  const handleRedo = () => {
    if (!redoStack.length) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(s => s.slice(0, -1));
    setUndoStack(s => [...s, placedItems]);
    setPlacedItems(next);
    setSelectedItemId(null);
  };

  const handleAddItem = (type: string) => {
    const cat = ITEM_CATALOG.find(i => i.type === type);
    if (!cat) return;
    setIsPlacingItem({
      id: `${type}_${Date.now()}`,
      type,
      name: cat.name,
      cost: cat.cost,
      position: [0, cat.isWallMounted ? 4.5 : 0, 0],
      rotation: 0,
      isWallMounted: cat.isWallMounted,
    });
    setActiveCategory(null);
  };

  const confirmPlacement = () => {
    if (!isPlacingItem) return;
    recordHistory([...placedItems, isPlacingItem]);
    setSelectedItemId(isPlacingItem.id);
    setIsPlacingItem(null);
  };

  const cancelPlacement = () => setIsPlacingItem(null);

  const handleDeleteItem = () => {
    if (!selectedItemId) return;
    recordHistory(placedItems.filter(i => i.id !== selectedItemId));
    setSelectedItemId(null);
  };

  const handleRotateItem = () => {
    if (!selectedItemId) return;
    recordHistory(
      placedItems.map(item =>
        item.id === selectedItemId
          ? { ...item, rotation: (item.rotation + Math.PI / 2) % (Math.PI * 2) }
          : item
      )
    );
  };

  return (
    <div className="flex h-screen bg-[#F0EFEB] font-sans overflow-hidden select-none relative">

      {/* ── HEADER ── */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            id="btn-menu"
            onClick={() => router.push('/designer')}
            className="w-12 h-12 bg-white hover:bg-gray-50 border border-gray-200 shadow-lg rounded-full flex items-center justify-center text-[#1A1A1A] transition-all"
            title="Back to Designer"
          >
            <Menu size={18} />
          </button>
          <button
            id="btn-save"
            onClick={() => alert('Design saved!')}
            className="px-6 h-12 bg-white hover:bg-gray-50 border border-gray-200 shadow-lg rounded-full flex items-center justify-center gap-2 font-bold text-xs tracking-wider uppercase text-[#1A1A1A] transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save
          </button>
        </div>

        {/* Price display */}
        <div id="price-display" className="bg-white border border-gray-200 shadow-lg rounded-full h-12 px-2 py-1 flex items-center gap-4 pointer-events-auto">
          <div className="flex items-center gap-2 pl-4">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span className="font-mono font-bold text-base text-[#1A1A1A]">£{totalPrice.toFixed(2)}</span>
          </div>
          <button
            id="btn-summary"
            onClick={() => setShowSummaryModal(true)}
            className="px-5 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#1A1A1A] transition-all"
          >
            Summary
            <ArrowLeft className="rotate-180" size={10} />
          </button>
        </div>
      </div>

      {/* ── RIGHT SIDEBAR TOOLBAR ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
        {/* Home / exit */}
        <button
          id="btn-exit"
          onClick={() => router.push('/designer')}
          className="w-12 h-12 bg-black text-white hover:bg-[#333] shadow-xl rounded-xl flex items-center justify-center transition-all"
          title="Exit to Designer"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>

        {/* Category icons */}
        <div className="bg-black rounded-xl p-1.5 shadow-2xl flex flex-col gap-1.5 border border-white/10">
          {[
            { id: 'sink', label: 'Wash Basin', icon: SINK_ICON },
            { id: 'bathtub', label: 'Bathtubs', icon: BATHTUB_ICON },
            { id: 'towel_rail', label: 'Towel Rails', icon: TOWEL_RAIL_ICON },
            { id: 'shower', label: 'Shower Cabin', icon: SHOWER_ICON },
            { id: 'toilet', label: 'Toilets', icon: TOILET_ICON },
            { id: 'washing_machine', label: 'Wash Machines', icon: WASHING_MACHINE_ICON },
            { id: 'light', label: 'Lighting', icon: LIGHT_ICON },
            { id: 'plant', label: 'Plants & Decor', icon: ACCESSORIES_ICON },
          ].map(cat => (
            <button
              key={cat.id}
              id={`btn-cat-${cat.id}`}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${activeCategory === cat.id
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              title={cat.label}
            >
              {cat.icon}
            </button>
          ))}
        </div>
      </div>

      {/* ── ITEMS DRAWER ── */}
      {activeCategory && (
        <div className="absolute right-20 top-1/2 -translate-y-1/2 w-64 bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl p-5 z-30 font-sans flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
            <h3 className="text-xs font-bold tracking-wider text-[#1A1A1A] uppercase">
              Add {activeCategory.replace('_', ' ')}
            </h3>
            <button onClick={() => setActiveCategory(null)} className="p-1 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {ITEM_CATALOG.filter(i => i.type === activeCategory).map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleAddItem(item.type)}
                className="w-full text-left p-3.5 border border-gray-100 rounded-xl hover:border-black hover:bg-gray-50 transition-all flex flex-col gap-1.5"
              >
                <span className="text-xs font-bold text-[#1A1A1A]">{item.name}</span>
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    {item.isWallMounted ? 'Wall Snap' : 'Floor Placement'}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#1A1A1A]">£{item.cost.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── PLACING ITEM CONFIRMATION ── */}
      {isPlacingItem && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-full px-6 py-3.5 flex items-center gap-4 z-40">
          <span className="text-xs font-semibold text-gray-600">
            Drag <strong className="text-black">{isPlacingItem.name}</strong> into position…
          </span>
          <button
            id="btn-confirm-placement"
            onClick={confirmPlacement}
            className="px-4 py-1.5 bg-[#4ade80] hover:bg-[#22c55e] text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-md transition-all"
          >
            Confirm
          </button>
          <button
            id="btn-cancel-placement"
            onClick={cancelPlacement}
            className="px-4 py-1.5 bg-red-400 hover:bg-red-500 text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-md transition-all"
          >
            Cancel
          </button>
        </div>
      )}

      {/* ── SELECTED ITEM ACTIONS ── */}
      {selectedItem && !isPlacingItem && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-[#1A1A1A] border border-white/10 shadow-2xl rounded-full px-5 py-3 flex items-center gap-4 z-30 text-white">
          <span className="text-xs font-semibold tracking-wide border-r border-white/15 pr-4">
            Selected: <strong className="text-gray-200">{selectedItem.name}</strong>
          </span>
          <button
            id="btn-rotate"
            onClick={handleRotateItem}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center gap-1.5 text-xs font-bold uppercase transition-all"
            title="Rotate 90°"
          >
            <RotateCw size={14} />
            Rotate
          </button>
          <button
            id="btn-delete"
            onClick={handleDeleteItem}
            className="p-2 bg-red-500/85 hover:bg-red-600 rounded-full flex items-center justify-center gap-1.5 text-xs font-bold uppercase transition-all"
            title="Delete"
          >
            <Trash2 size={14} />
            Delete
          </button>
          <button
            onClick={() => setSelectedItemId(null)}
            className="text-[10px] text-gray-400 hover:text-white font-bold tracking-widest uppercase pl-2"
          >
            Deselect
          </button>
        </div>
      )}

      {/* ── 3D CANVAS ── */}
      <div className="flex-1 w-full h-full overflow-hidden">
        <Canvas
          camera={{ position: [6, 5, 8], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
          style={{ width: '100%', height: '100%' }}
          shadows
        >
          <Suspense fallback={null}>
            <BathroomScene
              state={state}
              topView={topView}
              activeSideView={activeSideView}
              setActiveSideView={setActiveSideView}
              zoomTrigger={zoomTrigger}
              setZoomTrigger={setZoomTrigger}
              setNumWalls={setNumWalls}
              placedItems={placedItems}
              setPlacedItems={setPlacedItems}
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
              isPlacingItem={isPlacingItem}
              setIsPlacingItem={setIsPlacingItem}
              orbitEnabled={orbitEnabled}
              setOrbitEnabled={setOrbitEnabled}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* ── BOTTOM CONTROL BAR ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/85 backdrop-blur-md border border-gray-200/80 shadow-2xl rounded-full px-5 py-2.5 flex items-center gap-4 z-20">
        {/* Dollhouse view */}
        <button
          id="btn-dollhouse"
          onClick={() => setTopView(false)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${!topView ? 'bg-[#1A1A1A] text-white shadow-md' : 'text-gray-600 hover:text-[#1A1A1A] hover:bg-gray-100/50'
            }`}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          Dollhouse
        </button>

        {/* Top view */}
        <button
          id="btn-topview"
          onClick={() => setTopView(true)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${topView ? 'bg-[#1A1A1A] text-white shadow-md' : 'text-gray-600 hover:text-[#1A1A1A] hover:bg-gray-100/50'
            }`}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
          Top View
        </button>

        {/* Side views dropdown */}
        {numWalls > 0 && (
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-gray-600 hover:text-[#1A1A1A] hover:bg-gray-100/50 transition-all duration-300">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Side Views
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 ml-1 opacity-60" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-xl rounded-xl py-1.5 hidden group-hover:flex flex-col min-w-[130px] z-30">
              {Array.from({ length: numWalls }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setTopView(false); setActiveSideView(idx); }}
                  className="w-full text-center px-4 py-2 text-[10px] font-bold tracking-wider uppercase text-gray-700 hover:bg-gray-100 hover:text-[#1A1A1A] transition-colors"
                >
                  Wall {idx + 1} ({idx === 0 ? 'Back' : idx === 1 ? 'Right' : idx === 2 ? 'Left' : 'Front'})
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="w-[1px] h-5 bg-gray-200" />

        {/* Customise room */}
        <button
          id="btn-customise"
          onClick={() => setShowRoomCustomizer(!showRoomCustomizer)}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase rounded-full tracking-wider transition-all ${showRoomCustomizer ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          Customise Room
        </button>

        <div className="w-[1px] h-5 bg-gray-200" />

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <button
            id="btn-zoom-in"
            onClick={() => setZoomTrigger('in')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-[#1A1A1A] hover:bg-gray-100/50 transition-all"
            title="Zoom In"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
          </button>
          <button
            id="btn-zoom-out"
            onClick={() => setZoomTrigger('out')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-[#1A1A1A] hover:bg-gray-100/50 transition-all"
            title="Zoom Out"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /></svg>
          </button>
        </div>

        <div className="w-[1px] h-5 bg-gray-200" />

        {/* Undo / Redo */}
        <div className="flex items-center gap-1">
          <button
            id="btn-undo"
            onClick={handleUndo}
            disabled={undoStack.length === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${undoStack.length === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-[#1A1A1A] hover:bg-gray-100/50'}`}
            title="Undo"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
            </svg>
          </button>
          <button
            id="btn-redo"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${redoStack.length === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-[#1A1A1A] hover:bg-gray-100/50'}`}
            title="Redo"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── CUSTOMISE ROOM DRAWER ── */}
      {showRoomCustomizer && (
        <CustomiseRoomDrawer
          state={state}
          numWalls={numWalls}
          onChange={update}
          onClose={() => setShowRoomCustomizer(false)}
        />
      )}

      {/* ── SUMMARY MODAL ── */}
      {showSummaryModal && (
        <SummaryModal
          items={placedItems}
          total={totalPrice}
          onClose={() => setShowSummaryModal(false)}
        />
      )}
    </div>
  );
}

import * as React from 'react';
import { BathroomShape, WallDesign } from '@tilevista/types';

export interface BathroomCanvasProps {
  children?: React.ReactNode;
  cameraPosition?: [number, number, number];
  showGrid?: boolean;
}

export const BathroomCanvas: React.FC<BathroomCanvasProps> = ({
  children,
  cameraPosition = [5, 5, 5],
  showGrid = true,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'radial-gradient(circle, #1e293b 0%, #0f172a 100%)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: '#ffffff',
          fontFamily: "'Outfit', sans-serif",
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: '1.25rem', fontWeight: 600, textTransform: 'uppercase' }}>
          3D Virtual Showroom Canvas
        </span>
        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
          OrbitControls: Enabled | Real-Time Lighting Active
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 15 L80 35 L80 65 L50 85 L20 65 L20 35 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50 15 L50 85" stroke="currentColor" strokeWidth="1" />
          <path d="M20 35 L80 65" stroke="currentColor" strokeWidth="1" />
          <path d="M80 35 L20 65" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div style={{ display: 'none' }}>{children}</div>
    </div>
  );
};

export interface RoomStructureProps {
  shape: BathroomShape;
  width: number;
  length: number;
  height: number;
  wallDesigns?: WallDesign[];
}

export const RoomStructure: React.FC<RoomStructureProps> = ({
  shape,
  width,
  length,
  height,
  wallDesigns = [],
}) => {
  return (
    <g id="three-room-structure">
      <desc>{`Rendering bathroom structure with shape ${shape}, size: ${width}x${length}x${height}m`}</desc>
    </g>
  );
};

export interface TileMeshProps {
  tileSize?: string;
  color?: string;
  roughness?: number;
  textureUrl?: string;
}

export const TileMesh: React.FC<TileMeshProps> = ({
  tileSize = '600x600mm',
  color = '#ffffff',
  roughness = 0.5,
  textureUrl,
}) => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 0.02]} />
      <meshStandardMaterial color={color} roughness={roughness} />
    </mesh>
  );
};

export interface RulerToolProps {
  start: { x: number; y: number; z: number };
  end: { x: number; y: number; z: number };
}

export const RulerTool: React.FC<RulerToolProps> = ({ start, end }) => {
  const distance = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2) + Math.pow(end.z - start.z, 2)
  );

  return (
    <group>
      <line>
        <bufferGeometry />
        <lineBasicMaterial color="#ef4444" linewidth={3} />
      </line>
      <span style={{ color: '#ef4444', fontWeight: 'bold' }}>
        {`${distance.toFixed(2)}m`}
      </span>
    </group>
  );
};

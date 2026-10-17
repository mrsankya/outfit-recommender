// src/components/Wardrobe3D.jsx
// Interactive 3D rotating wardrobe built with React Three Fiber
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

/* ── Hanging clothes item ── */
function ClothingItem({ position, color, shape, hovered, setHovered, label }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 0.8 : 0.25);
    }
  });

  const geo = shape === 'shirt'  ? [0.35, 0.5,  0.05] :
              shape === 'pants'  ? [0.25, 0.65, 0.05] :
              shape === 'jacket' ? [0.4,  0.55, 0.07] :
                                   [0.3,  0.45, 0.04];
  return (
    <group position={position}>
      {/* Hanger rod */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.5, 8]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Garment */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(label)}
        onPointerOut={() => setHovered(null)}
      >
        <boxGeometry args={geo} />
        <meshStandardMaterial
          color={hovered === label ? '#ffffff' : color}
          roughness={0.6}
          metalness={0.1}
          emissive={hovered === label ? color : '#000000'}
          emissiveIntensity={hovered === label ? 0.3 : 0}
        />
      </mesh>
    </group>
  );
}

/* ── Wardrobe frame ── */
function WardrobeFrame() {
  const wood = <meshStandardMaterial color="#C4A882" roughness={0.7} metalness={0.05} />;
  return (
    <group>
      {/* Back panel */}
      <mesh position={[0, 0, -0.55]}>
        <boxGeometry args={[3.2, 3.0, 0.08]} />
        <meshStandardMaterial color="#D4B896" roughness={0.8} />
      </mesh>
      {/* Left side */}
      <mesh position={[-1.6, 0, 0]}>
        <boxGeometry args={[0.08, 3.0, 1.1]} />
        {wood}
      </mesh>
      {/* Right side */}
      <mesh position={[1.6, 0, 0]}>
        <boxGeometry args={[0.08, 3.0, 1.1]} />
        {wood}
      </mesh>
      {/* Top */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[3.36, 0.08, 1.1]} />
        {wood}
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[3.36, 0.08, 1.1]} />
        {wood}
      </mesh>
      {/* Hanging rod */}
      <mesh position={[0, 0.9, -0.1]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3.0, 12]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Shelf */}
      <mesh position={[0, -0.4, -0.1]}>
        <boxGeometry args={[3.1, 0.05, 0.9]} />
        {wood}
      </mesh>
      {/* Door handles */}
      {[-0.15, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0.56]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#C0A060" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Scene ── */
function WardrobeScene() {
  const [hovered, setHovered] = useState(null);
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  const items = [
    { position: [-1.2, 0.55, -0.08], color: '#E8D5C4', shape: 'shirt',  label: 'Linen Shirt' },
    { position: [-0.7, 0.55, -0.08], color: '#E67E22', shape: 'shirt',  label: 'Saffron Silk Kurta' },
    { position: [-0.2, 0.55, -0.08], color: '#1A1A1A', shape: 'jacket', label: 'Black Jacket' },
    { position: [0.3,  0.55, -0.08], color: '#2B4CC4', shape: 'jacket', label: 'Royal Velvet Sherwani' },
    { position: [0.8,  0.55, -0.08], color: '#8B5E3C', shape: 'pants',  label: 'Chinos' },
    { position: [1.3,  0.55, -0.08], color: '#D4A5A5', shape: 'shirt',  label: 'Floral Kurti' },
  ];

  return (
    <group ref={groupRef}>
      <WardrobeFrame />
      {items.map((item) => (
        <ClothingItem
          key={item.label}
          {...item}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </group>
  );
}

/* ── Exported Component ── */
export default function Wardrobe3D() {
  return (
    <div style={{ width: '100%', height: '480px', cursor: 'grab', touchAction: 'pan-y' }}>
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        gl={{ antialias: true }}
        style={{ touchAction: 'pan-y' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#fff5e0" />
        <pointLight position={[0, 2, 3]} intensity={0.8} color="#ffffff" />
        <WardrobeScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
          touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DO_NOTHING }}
        />
      </Canvas>
    </div>
  );
}

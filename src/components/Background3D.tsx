import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const GLYPH_FONT = 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace';

function createGlyphTexture(glyph: string, color: string, font: string) {
  const canvas = document.createElement('canvas');
  const size = 256;
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return new THREE.Texture();
  }

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold 160px ${font}`;
  ctx.fillText(glyph, size / 2, size / 2 + 6);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 4;
  return texture;
}

function useGlyphTextures() {
  const textures = useMemo(() => {
    return {
      zero: createGlyphTexture('0', '#bae6fd', GLYPH_FONT),
      one: createGlyphTexture('1', '#bae6fd', GLYPH_FONT)
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(textures).forEach((texture) => texture.dispose());
    };
  }, [textures]);

  return textures;
}

function BinaryStream({ count = 400 }) {
  const groupRef = useRef<THREE.Group>(null);
  const timer = useMemo(() => new THREE.Timer(), []);
  const textures = useGlyphTextures();
  const binaryItems = useMemo(() => {
    return Array.from({ length: count }, () => {
      const radius = 8 + Math.random() * 22;
      const angle = Math.random() * Math.PI * 2;
      const zOffset = (Math.random() - 0.5) * 22;
      return {
        radius,
        angle,
        height: Math.random() * 70 - 35,
        angularSpeed: (Math.random() * 0.008 + 0.0015) * (Math.random() > 0.5 ? 1 : -1),
        riseSpeed: 0.012 + Math.random() * 0.045,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.015
        ],
        tilt: [(Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6, 0],
        zOffset,
        value: Math.random() > 0.5 ? '1' : '0',
        opacity: 0.12 + Math.random() * 0.6,
        fontSize: 0.28 + Math.random() * 0.5
      };
    });
  }, [count]);

  useFrame(() => {
    if (groupRef.current) {
      timer.update();
      groupRef.current.rotation.y = timer.getElapsed() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {binaryItems.map((item, i) => (
        <BinaryChar
          key={i}
          texture={item.value === '1' ? textures.one : textures.zero}
          {...item}
        />
      ))}
    </group>
  );
}

function BinaryChar({
  radius,
  angle,
  height,
  angularSpeed,
  riseSpeed,
  rotationSpeed,
  tilt,
  zOffset,
  value,
  opacity,
  fontSize,
  texture
}: any) {
  const mesh = useRef<THREE.Group>(null);
  const spriteRef = useRef<THREE.Sprite>(null);
  const initialRotation = useMemo(() => [Math.random() * Math.PI, Math.random() * Math.PI, 0], []);
  const motion = useRef({ angle, y: height });
  const timer = useMemo(() => new THREE.Timer(), []);
  const baseScale = useMemo(() => fontSize * 2.2, [fontSize]);

  useFrame(() => {
    if (!mesh.current) {
      return;
    }

    timer.update();
    const delta = timer.getDelta();
    motion.current.angle += angularSpeed * delta * 60;
    motion.current.y -= riseSpeed * delta * 60;

    if (motion.current.y < -35) {
      motion.current.y = 35;
    }

    const x = Math.cos(motion.current.angle) * radius;
    const z = Math.sin(motion.current.angle) * radius * 0.8 + zOffset - 8;

    mesh.current.position.set(x, motion.current.y, z);
    mesh.current.rotation.x += rotationSpeed[0];
    mesh.current.rotation.y += rotationSpeed[1];
    mesh.current.rotation.z += rotationSpeed[2];

    if (spriteRef.current) {
      const depth = THREE.MathUtils.clamp(1 - (z + 16) / 36, 0.6, 1.45);
      spriteRef.current.scale.set(baseScale * depth, baseScale * depth, 1);
    }
  });

  return (
    <group ref={mesh} rotation={new THREE.Euler(...initialRotation)}>
      <group rotation={new THREE.Euler(...tilt)}>
        <sprite ref={spriteRef} scale={[baseScale, baseScale, 1]}>
          <spriteMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
        </sprite>
      </group>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ width: '100vw', height: '100vh' }}>
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          backgroundImage: `url('${import.meta.env.BASE_URL}sky.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <Canvas
        style={{ position: 'absolute', inset: 0, zIndex: 1, width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={1.6} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#e0f2fe" />
        <BinaryStream count={300} />
        <Stars radius={200} depth={50} count={3000} factor={5} saturation={0} fade speed={2} />
      </Canvas>
    </div>
  );
}

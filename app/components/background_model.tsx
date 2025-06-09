'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
useGLTF.preload('/PostBox.glb');

function Model() {
  const gltf = useGLTF('/PostBox.glb');
  return <primitive object={gltf.scene} scale={0.2} />;
}

export default function BackgroundCanvas() {
  return (
    <Canvas
      className="bg-transparent "
      camera={{ position: [0, 0, 5], fov: 20 }}
    >
      <ambientLight intensity={4} />
      <directionalLight position={[0, 0, 5]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  );
}

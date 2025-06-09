'use client';

import { Canvas } from '@react-three/fiber';
import { Text3D, Center, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

function Title3D() {
  return (
    <Center>
      <Text3D
        font="/Regular.json"
        size={1}
        height={0.3}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.05}
      >
        InCaseYouSeeThis
        <meshStandardMaterial color="hotpink" />
      </Text3D>
    </Center>
  );
}

export default function TitleCanvas() {
  return (
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Title3D />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate />
      </Canvas>
    // </div>
  );
}

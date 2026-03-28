// src/components/vr/scenes/ancient-rome/AncientRomeScene.tsx
'use client';

import React from 'react';
import { useGLTF } from '@react-three/drei';
import Terrain from './Terrain';

const AncientRomeScene: React.FC = () => {
  // Загружаем модели (те же, что у тебя уже есть в public/models)
  const { scene: temple } = useGLTF('/models/Temple.glb');
  const { scene: columns } = useGLTF('/models/columns.glb');
  const { scene: ruins } = useGLTF('/models/Ruined.glb');

  return (
    <>
      {/* 1. Атмосфера и небо (золотой час Рима) */}
      <color attach="background" args={['#87b5ff']} />
      <fog attach="fog" args={['#87b5ff', 40, 220]} />

      {/* 2. Освещение AAA-уровня */}
      <hemisphereLight intensity={0.6} color="#ffe5b5" groundColor="#8b5a2b" />
      <directionalLight
        position={[35, 45, -20]}
        intensity={1.4}
        color="#ffddaa"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={300}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />
      <ambientLight intensity={0.3} />

      {/* 3. Terrain — наши холмы из предыдущего шага */}
      <Terrain />

      {/* 4. Главный фокус — Храм (правильная позиция и поворот) */}
      <primitive
        object={temple}
        position={[0, 0, -65]}
        scale={1.35}
        rotation={[0, Math.PI / 6, 0]}
      />

      {/* 5. Leading lines — колонны, которые ведут взгляд к храму */}
      <group position={[-18, 0, -35]}>
        <primitive
          object={columns}
          scale={1.1}
          rotation={[0, Math.PI / 2, 0]}
        />
      </group>
      <group position={[18, 0, -35]}>
        <primitive
          object={columns}
          scale={1.1}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </group>

      {/* 6. Depth layers — руины для ощущения глубины и масштаба */}
      <group position={[-45, 0, -85]}>
        <primitive object={ruins} scale={0.9} rotation={[0, Math.PI / 3, 0]} />
      </group>
      <group position={[42, 0, -92]}>
        <primitive object={ruins} scale={0.85} rotation={[0, -Math.PI / 4, 0]} />
      </group>
      <group position={[-55, 0, -120]}>
        <primitive object={ruins} scale={0.7} />
      </group>
    </>
  );
};

export default AncientRomeScene;
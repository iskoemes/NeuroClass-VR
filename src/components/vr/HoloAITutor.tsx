"use client";

import { useRef, useImperativeHandle, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface HoloAITutorRef {
  startSpeaking: () => void;
  stopSpeaking: () => void;
}

const HoloAITutor = forwardRef<HoloAITutorRef>((props, ref) => {
  const groupRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Mesh>(null!);
  const bodyRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  const isSpeaking = useRef(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    groupRef.current.position.y = 5.5 + Math.sin(t * 1.5) * 0.25;
    groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.15;

    const intensity = isSpeaking.current ? 1.25 + Math.sin(t * 14) * 0.18 : 1;

    if (headRef.current) headRef.current.scale.setScalar(intensity);
    if (bodyRef.current) bodyRef.current.scale.setScalar(1 + Math.sin(t * 9) * 0.04);

    if (glowRef.current && glowRef.current.material instanceof THREE.MeshPhongMaterial) {
      const mat = glowRef.current.material as THREE.MeshPhongMaterial;
      mat.emissive?.setHex(isSpeaking.current ? 0x00ffff : 0x44ddff);
      mat.emissiveIntensity = isSpeaking.current ? 2.8 : 1.3;
    }
  });

  useImperativeHandle(ref, () => ({
    startSpeaking: () => { isSpeaking.current = true; },
    stopSpeaking: () => { isSpeaking.current = false; }
  }));

  return (
    <group ref={groupRef} position={[9, 5.5, -8]}>
      {/* Тело */}
      <mesh ref={bodyRef} position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.9, 1.1, 2.8, 32, 1, true]} />
        <meshPhongMaterial 
          color="#00ccff" 
          emissive="#0088ff" 
          emissiveIntensity={0.9} 
          transparent 
          opacity={0.7} 
        />
      </mesh>

      {/* Голова */}
      <mesh ref={headRef} position={[0, 3.8, 0]}>
        <sphereGeometry args={[1.1, 48, 48]} />
        <meshPhongMaterial 
          color="#bbffff" 
          emissive="#66ffff" 
          emissiveIntensity={1.4} 
          transparent 
          opacity={0.8} 
        />
      </mesh>

      {/* Нимб */}
      <mesh ref={glowRef} position={[0, 5.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.65, 0.13, 16, 64]} />
        <meshPhongMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={1.6} 
          transparent 
          opacity={0.75} 
        />
      </mesh>

      {/* Глаза */}
      <mesh position={[-0.45, 4.1, 0.95]}>
        <sphereGeometry args={[0.17]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.45, 4.1, 0.95]}>
        <sphereGeometry args={[0.17]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
});

HoloAITutor.displayName = "HoloAITutor";
export default HoloAITutor;
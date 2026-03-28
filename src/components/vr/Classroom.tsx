/* eslint-disable react-hooks/purity */
'use client'

import { useRef, useMemo } from 'react'
import { useGLTF, Sky } from '@react-three/drei'
import { Group } from 'three'
import { InteractiveObject } from './interaction/InteractiveObject'

export default function Classroom() {

  const group = useRef<Group>(null)

  const columns = useGLTF('/models/columns.glb')
  const ruins = useGLTF('/models/Ruined.glb')
  const temple = useGLTF('/models/Temple.glb')

  // 🌿 ГУСТАЯ ТРАВА
  const grass = useMemo(() => {
    const items = []
    for (let i = 0; i < 800; i++) {
      const x = (Math.random() - 0.5) * 250
      const z = (Math.random() - 0.5) * 250
      const scale = 0.5 + Math.random()

      items.push(
        <mesh key={i} position={[x, 0.05, z]} scale={scale}>
          <coneGeometry args={[0.12, 0.5, 5]} />
          <meshStandardMaterial color="#3f7d2b" />
        </mesh>
      )
    }
    return items
  }, [])

  // 🐦 ПТИЦЫ (выше и шире)
  const birds = useMemo(() => {
    const items = []
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 200
      const z = (Math.random() - 0.5) * 200
      const y = 20 + Math.random() * 20

      items.push(
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="black" />
        </mesh>
      )
    }
    return items
  }, [])

  return (
    <group ref={group}>

      {/* 🌤 НЕБО */}
      <Sky
        distance={450000}
        sunPosition={[50, 80, 20]}
        inclination={0.49}
        azimuth={0.25}
      />

      {/* ☀️ СОЛНЦЕ */}
      <directionalLight
        position={[80, 120, 40]}
        intensity={4}
        castShadow
        shadow-mapSize={[4096, 4096]}
      />

      {/* 🌫 ТУМАН (ВАЖНО ДЛЯ АТМОСФЕРЫ) */}
      <fog attach="fog" args={['#d6c7a1', 80, 260]} />

      {/* МЯГКИЙ СВЕТ */}
      <ambientLight intensity={0.7} />

      {/* 🌍 ЗЕМЛЯ (БОЛЬШЕ И МЯГЧЕ) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[800, 800]} />
        <meshStandardMaterial color="#c2a878" />
      </mesh>

      {/* 🏛 ГЛАВНЫЙ ХРАМ (ОГРОМНЫЙ И ВИДНЫЙ) */}
      <InteractiveObject
        label="Explore Temple"
        onClick={() => {
          fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({
              message: 'Explain Ancient Roman temples in simple terms'
            })
          })
        }}
      >
        <primitive
          object={temple.scene}
          position={[0, 0, -120]}
          scale={25}
          userData={{ interactive: true, name: 'Temple' }}
        />
      </InteractiveObject>

      {/* 🏛 КОЛОННЫ — АЛЛЕЯ */}
      {[-60, -30, 0, 30, 60].map((x, i) => (
        <primitive
          key={i}
          object={columns.scene.clone()}
          position={[x, 0, -40]}
          scale={14}
        />
      ))}

      {[-60, -30, 0, 30, 60].map((x, i) => (
        <primitive
          key={'back-' + i}
          object={columns.scene.clone()}
          position={[x, 0, -80]}
          scale={14}
        />
      ))}

      {/* 🧱 РУИНЫ (РАЗБРОСАНЫ) */}
      <primitive
        object={ruins.scene}
        position={[30, 0, 40]}
        scale={12}
      />

      <primitive
        object={ruins.scene.clone()}
        position={[-40, 0, 60]}
        scale={12}
      />

      <primitive
        object={ruins.scene.clone()}
        position={[70, 0, 70]}
        scale={12}
      />

      <primitive
        object={ruins.scene.clone()}
        position={[-70, 0, 80]}
        scale={12}
      />

      {/* 🌿 ТРАВА */}
      {grass}

      {/* 🐦 ПТИЦЫ */}
      {birds}

    </group>
  )
}

useGLTF.preload('/models/columns.glb')
useGLTF.preload('/models/Ruined.glb')
useGLTF.preload('/models/Temple.glb')
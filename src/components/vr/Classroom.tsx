/* eslint-disable react-hooks/purity */
'use client'

import { useMemo } from 'react'
import { useGLTF, Sky } from '@react-three/drei'
import { InteractiveObject } from './interaction/InteractiveObject'
import { GroundedModel } from './GroundedModel'

const COLUMN_X = [-60, -30, 0, 30, 60] as const

export default function Classroom() {
  const columns = useGLTF('/models/columns.glb')
  const ruins = useGLTF('/models/Ruined.glb')
  const temple = useGLTF('/models/Temple.glb')

  const columnFront = useMemo(
    () => COLUMN_X.map(() => columns.scene.clone()),
    [columns.scene]
  )
  const columnBack = useMemo(
    () => COLUMN_X.map(() => columns.scene.clone()),
    [columns.scene]
  )

  const ruinInstances = useMemo(
    () => [0, 1, 2, 3].map(() => ruins.scene.clone()),
    [ruins.scene]
  )

  const grass = useMemo(() => {
    const items = []
    for (let i = 0; i < 220; i++) {
      const x = (Math.random() - 0.5) * 220
      const z = (Math.random() - 0.5) * 220
      const scale = 0.45 + Math.random() * 0.55

      items.push(
        <mesh key={i} position={[x, 0.08, z]} scale={scale}>
          <coneGeometry args={[0.1, 0.45, 5]} />
          <meshStandardMaterial color="#3d6b32" roughness={0.85} />
        </mesh>
      )
    }
    return items
  }, [])

  const birds = useMemo(() => {
    const items = []
    for (let i = 0; i < 16; i++) {
      const x = (Math.random() - 0.5) * 180
      const z = (Math.random() - 0.5) * 180
      const y = 18 + Math.random() * 22

      items.push(
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      )
    }
    return items
  }, [])

  return (
    <group>
      <Sky
        distance={450000}
        sunPosition={[50, 80, 20]}
        inclination={0.49}
        azimuth={0.25}
      />

      <directionalLight
        position={[80, 120, 40]}
        intensity={3.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={500}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />

      <fog attach="fog" args={['#c9bba8', 90, 240]} />

      <ambientLight intensity={0.55} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[800, 800]} />
        <meshStandardMaterial color="#b8a882" roughness={0.95} />
      </mesh>

      <InteractiveObject
        label="Храм — подробнее"
        onClick={() => {
          void fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [
                {
                  role: 'user',
                  content:
                    'Кратко объясни храмы Древнего Рима простым языком для школьника.',
                },
              ],
            }),
          })
        }}
      >
        <GroundedModel
          object={temple.scene}
          position={[0, 0, -120]}
          scale={25}
          rotation={[0, 0, 0]}
        />
      </InteractiveObject>

      {COLUMN_X.map((x, i) => (
        <GroundedModel
          key={`col-f-${i}`}
          object={columnFront[i]!}
          position={[x, 0, -40]}
          scale={14}
        />
      ))}

      {COLUMN_X.map((x, i) => (
        <GroundedModel
          key={`col-b-${i}`}
          object={columnBack[i]!}
          position={[x, 0, -80]}
          scale={14}
        />
      ))}

      <GroundedModel object={ruinInstances[0]!} position={[30, 0, 40]} scale={12} />
      <GroundedModel object={ruinInstances[1]!} position={[-40, 0, 60]} scale={12} />
      <GroundedModel object={ruinInstances[2]!} position={[70, 0, 70]} scale={12} />
      <GroundedModel object={ruinInstances[3]!} position={[-70, 0, 80]} scale={12} />

      {grass}
      {birds}
    </group>
  )
}

useGLTF.preload('/models/columns.glb')
useGLTF.preload('/models/Ruined.glb')
useGLTF.preload('/models/Temple.glb')

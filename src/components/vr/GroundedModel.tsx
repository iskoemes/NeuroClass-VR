'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import * as THREE from 'three'

type Props = {
  object: THREE.Object3D
  position?: [number, number, number]
  scale?: number | [number, number, number]
  rotation?: [number, number, number]
  children?: ReactNode
}

export function GroundedModel({
  object,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  children,
}: Props) {
  const rootRef = useRef<THREE.Group>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const box = new THREE.Box3().setFromObject(root)
    if (box.isEmpty()) return

    root.position.y = position[1] - box.min.y
  }, [object, position, rotation, scale])

  const s = Array.isArray(scale) ? scale : [scale, scale, scale]

  return (
    <group
      ref={rootRef}
      position={[position[0], 0, position[2]]}
      rotation={rotation}
      scale={s as [number, number, number]}
    >
      <primitive object={object} />
      {children}
    </group>
  )
}

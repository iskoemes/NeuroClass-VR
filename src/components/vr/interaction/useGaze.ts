'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { Raycaster, Vector2 } from 'three'
import { useRef } from 'react'

export function useGaze(onHover: (object: unknown | null) => void) {
  const { camera, scene } = useThree()
  const raycaster = useRef(new Raycaster())

  useFrame(() => {
    // центр экрана (как взгляд)
    raycaster.current.setFromCamera(new Vector2(0, 0), camera)

    const intersects = raycaster.current.intersectObjects(
      scene.children,
      true
    )

    if (intersects.length > 0) {
      onHover(intersects[0].object)
    } else {
      onHover(null)
    }
  })
}
'use client'

import { useState } from 'react'
import { Html } from '@react-three/drei'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  label?: string
}

export function InteractiveObject({
  children,
  onClick,
  label = 'Explain'
}: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {children}

      {hovered && (
        <Html position={[0, 3, 0]} center>
          <div
            style={{
              background: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              userSelect: 'none'
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}
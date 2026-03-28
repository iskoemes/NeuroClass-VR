'use client'

import { useState } from 'react'
import { useGaze } from '../interaction/useGaze'

interface InteractiveObject {
  userData?: {
    interactive?: boolean
  }
}

export function InteractionManager() {
  const [, setCurrent] = useState<InteractiveObject | null>(null)

  useGaze((obj: unknown) => {
    if (obj && typeof obj === 'object' && 'userData' in obj) {
      const interactive = obj as InteractiveObject
      if (interactive.userData?.interactive) {
        setCurrent(interactive)
      } else {
        setCurrent(null)
      }
    } else {
      setCurrent(null)
    }
  })

  return null
}
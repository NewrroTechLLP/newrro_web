"use client"

import { useEffect, useRef, useState } from 'react'
import { Group, Box3, Vector3 } from 'three'
import { Html } from '@react-three/drei'
import { useModelLoader } from '@/hooks/use-model-loader'

export function ArjunaModel() {
  const { model, error, isLoading } = useModelLoader('/Arjuna.glb')
  const [centeredModel, setCenteredModel] = useState<Group | null>(null)

  useEffect(() => {
    if (model) {
      // Compute the bounding box of the model
      const boundingBox = new Box3().setFromObject(model)
      const center = new Vector3()
      boundingBox.getCenter(center)

      // Adjust the model's position to center it
      model.position.sub(center)

      // Set the updated model
      setCenteredModel(model)
    }
  }, [model])

  if (error) {
    return (
      <Html center>
        <div className="text-red-500 bg-white/80 px-4 py-2 rounded-lg">
          {error}
        </div>
      </Html>
    )
  }

  if (isLoading || !centeredModel) {
    return null // Loading spinner is handled by Suspense
  }

  return <primitive object={centeredModel} scale={7.5} />
}

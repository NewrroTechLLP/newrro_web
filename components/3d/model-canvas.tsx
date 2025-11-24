"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense, useRef, useEffect } from "react"
import { ArjunaModel } from "./arjuna-model"
import { ModelLighting } from "./model-lighting"
import { LoadingSpinner } from "./loading-spinner"

interface ModelCanvasProps {
  className?: string
}

export function ModelCanvas({ className }: ModelCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [5, 2, 5], fov: 30 }}
        style={{ background: "#ffffff" }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Separate scene component with hooks for zoom and reset functionality
function Scene() {
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()
  const originalCameraPosition = useRef<[number, number, number]>([5, 2, 5])

  useEffect(() => {
    const canvas = document.querySelector("canvas")

    const handleZoomIn = () => {
      if (controlsRef.current) {
        controlsRef.current.dollyOut(1.1)
        controlsRef.current.update()
      }
    }

    const handleZoomOut = () => {
      if (controlsRef.current) {
        controlsRef.current.dollyIn(1.1)
        controlsRef.current.update()
      }
    }

    const handleReset = () => {
      camera.position.set(...originalCameraPosition.current)
      camera.lookAt(0, 0, 0)
      controlsRef.current?.reset()
    }

    if (canvas) {
      canvas.addEventListener("zoom-in", handleZoomIn)
      canvas.addEventListener("zoom-out", handleZoomOut)
      canvas.addEventListener("reset-camera", handleReset)
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("zoom-in", handleZoomIn)
        canvas.removeEventListener("zoom-out", handleZoomOut)
        canvas.removeEventListener("reset-camera", handleReset)
      }
    }
  }, [camera])

  return (
    <>
      <ModelLighting />
      <ArjunaModel />
      <Environment preset="studio" />
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
      />
    </>
  )
}

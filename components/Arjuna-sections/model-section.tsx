"use client"

import { ModelCanvas } from "../3d/model-canvas"
import { ModelControls } from "../3d/model-controls"

export default function ModelSection() {
  const handleEventDispatch = (eventName: string) => {
    const canvas = document.querySelector("canvas")
    if (canvas) {
      const event = new CustomEvent(eventName)
      canvas.dispatchEvent(event)
    }
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Arjuna in 3D
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interact with our advanced robotics platform. Rotate, zoom, and examine every detail of Arjuna&apos;s sophisticated design.
          </p>
        </div>

        <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-xl bg-white">
          <ModelCanvas className="absolute inset-0" />
          <ModelControls
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            onReset={() => handleEventDispatch("reset-camera")}
            // onZoomIn={() => handleEventDispatch("zoom-in")}
            // onZoomOut={() => handleEventDispatch("zoom-out")}
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Use your mouse or touch gestures to rotate. Click the controls below for additional viewing options.
          </p>
        </div>
      </div>
    </section>
  )
}

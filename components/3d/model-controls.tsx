"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react"

interface ModelControlsProps {
  className?: string
  onReset?: () => void
  // onZoomIn?: () => void
  // onZoomOut?: () => void
}

export function ModelControls({ 
  className, 
  onReset, 
  // onZoomIn, 
  // onZoomOut 
}: ModelControlsProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <Button
        variant="secondary"
        size="icon"
        className="bg-black text-white hover:bg-gray-800"
        onClick={onReset}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      {/* <Button
        variant="secondary"
        size="icon"
        className="bg-black text-white hover:bg-gray-800"
        onClick={onZoomIn}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-black text-white hover:bg-gray-800"
        onClick={onZoomOut}
      >
        <ZoomOut className="h-4 w-4" />
      </Button> */}
    </div>
  )
}

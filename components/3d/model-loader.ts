"use client"

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as THREE from 'three'

export class ModelLoader {
  private static loader: GLTFLoader | null = null

  static getLoader(): GLTFLoader {
    if (!this.loader) {
      // Initialize DRACO loader for compressed models
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

      // Initialize GLTF loader
      this.loader = new GLTFLoader()
      this.loader.setDRACOLoader(dracoLoader)
    }
    return this.loader
  }

  static async loadModel(url: string, targetSize = 1): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      this.getLoader().load(
        url,
        (gltf) => {
          try {
            const scene = gltf.scene

            // Normalize model size
            this.normalizeSize(scene, targetSize)

            // Apply material and shadow settings
            this.setupModel(scene)

            resolve(scene)
          } catch (error) {
            reject(new Error(`Error processing model: ${error}`))
          }
        },
        (progress) => {
          console.log('Loading progress:', ((progress.loaded / progress.total) * 100).toFixed(2), '%')
        },
        (error: Error | unknown) => {
          if (error instanceof Error) {
            console.error('Error loading model:', error)
            reject(new Error(`Failed to load model: ${error.message}`))
          } else {
            console.error('Unknown error loading model:', error)
            reject(new Error(`Failed to load model: ${error}`))
          }
        }
      )
    })
  }

  private static normalizeSize(scene: THREE.Group, targetSize: number) {
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    box.getSize(size)

    const maxDimension = Math.max(size.x, size.y, size.z)
    const scaleFactor = targetSize / maxDimension

    scene.scale.setScalar(scaleFactor)

    // Center the model
    const center = new THREE.Vector3()
    box.getCenter(center)
    scene.position.sub(center.multiplyScalar(scaleFactor))
  }

  private static setupModel(scene: THREE.Group) {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Default material settings
        if (child.material) {
          child.material.roughness = 0.5
          child.material.metalness = 0.5
          child.material.needsUpdate = true
        }

        // Enable shadows
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }
}

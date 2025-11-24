"use client"
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

export class ModelLoader {
  private static gltfLoader: GLTFLoader | null = null
  private static dracoLoader: DRACOLoader | null = null
  private static ktx2Loader: KTX2Loader | null = null

  private static initializeLoaders() {
    // Initialize DRACO loader
    if (!this.dracoLoader) {
      this.dracoLoader = new DRACOLoader()
      this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    }

    // Initialize KTX2 loader
    if (!this.ktx2Loader) {
      this.ktx2Loader = new KTX2Loader()
      this.ktx2Loader.setTranscoderPath('/basis/')
      // Assuming there's a way to get the current renderer instance
      // Corrected to use an instance of WebGLRenderer instead of the class
      const renderer = new THREE.WebGLRenderer(); // This line is a placeholder for getting the actual renderer instance
      this.ktx2Loader.detectSupport(renderer)
    }

    // Initialize GLTF loader with all necessary extensions
    if (!this.gltfLoader) {
      this.gltfLoader = new GLTFLoader()
      this.gltfLoader.setDRACOLoader(this.dracoLoader)
      this.gltfLoader.setKTX2Loader(this.ktx2Loader)
    }
  }

  static async loadModel(url: string): Promise<THREE.Group> {
    this.initializeLoaders()

    if (!this.gltfLoader) {
      throw new Error('GLTF Loader initialization failed')
    }

    return new Promise((resolve, reject) => {
      this.gltfLoader!.load(
        url,
        (gltf) => {
          try {
            this.setupModel(gltf.scene)
            resolve(gltf.scene)
          } catch (error) {
            reject(new Error(`Error setting up model: ${error}`))
          }
        },
        (progress) => {
          const percentage = (progress.loaded / progress.total) * 100
          console.log('Loading progress:', percentage.toFixed(2), '%')
        },
        (error: any) => { // Changed the error parameter type to 'any' to fix the linting issue
          console.error('Error loading model:', error)
          reject(new Error(`Failed to load model: ${error.message}`))
        }
      )
    })
  }

  private static setupModel(scene: THREE.Group) {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Apply default material settings
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
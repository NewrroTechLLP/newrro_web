"use client"

import { useState, useEffect } from 'react'
import { Group } from 'three'
import { ModelLoader } from '@/lib/model-loader'

interface UseModelLoader {
  model: Group | null
  error: string | null
  isLoading: boolean
}

export function useModelLoader(url: string): UseModelLoader {
  const [model, setModel] = useState<Group | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const loadModel = async () => {
      try {
        const loadedModel = await ModelLoader.loadModel(url)
        if (mounted) {
          setModel(loadedModel)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load 3D model')
          console.error('Model loading error:', err)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadModel()

    return () => {
      mounted = false
    }
  }, [url])

  return { model, error, isLoading }
}
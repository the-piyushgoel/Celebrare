import { useState, useEffect } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

// Custom hook: fetches the photo list once, when the component mounts.
// Returns { photos, loading, error } so the UI never has to touch fetch().
export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // AbortController lets us cancel the request if the component unmounts
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })

        // fetch() does not throw on 404/500, so we check this ourselves
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        if (err.name === 'AbortError') return // cancelled on purpose, not a real error
        setError(err.message || 'Something went wrong')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchPhotos()

    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}

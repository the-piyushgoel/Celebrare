import { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import {
  favouritesReducer,
  loadFavourites,
  FAVOURITES_KEY,
} from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'
import Spinner from './Spinner'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [searchTerm, setSearchTerm] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  // Save favourites to localStorage every time they change
  useEffect(() => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites))
  }, [favourites])

  // useCallback: keeps the same function reference between renders
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  // useCallback: stable reference, so memoized PhotoCards don't re-render needlessly
  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }, [])

  // useMemo: the filter only re-runs when photos or the search text change
  const filteredPhotos = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, searchTerm])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Photo Gallery</h1>

        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by author"
          aria-label="Search photos by author"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 sm:max-w-xs"
        />
      </header>

      {loading && <Spinner />}

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800"
        >
          Could not load photos: {error}. Check your connection and refresh the page.
        </div>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-16 text-center text-slate-500">
          No photos found for &ldquo;{searchTerm.trim()}&rdquo;. Try a different author name.
        </p>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  )
}

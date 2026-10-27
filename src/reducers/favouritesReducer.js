export const FAVOURITES_KEY = 'photo-gallery-favourites'

// State is a simple array of favourited photo ids, e.g. ["0", "10", "17"]
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id) // already a favourite -> remove
        : [...state, action.id] // not a favourite yet -> add
    default:
      return state
  }
}

// Used as the lazy initializer for useReducer: reads saved favourites on first load
export function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVOURITES_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return [] // corrupted or unavailable storage -> start empty
  }
}

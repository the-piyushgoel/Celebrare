import { memo } from 'react'

function PhotoCard({ photo, isFavourite, onToggle }) {
  // The list API returns very large originals, so we ask Picsum for a 400x300 version
  const imageUrl = `https://picsum.photos/id/${photo.id}/400/300`

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
      <img
        src={imageUrl}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="aspect-[4/3] w-full bg-slate-200 object-cover"
      />

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="truncate font-medium">{photo.author}</p>

        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="shrink-0 rounded-full p-1.5 transition-transform hover:bg-slate-100 active:scale-90 focus-visible:outline-2 focus-visible:outline-rose-600"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 ${
              isFavourite ? 'fill-rose-600 stroke-rose-600' : 'fill-none stroke-slate-500'
            }`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21z" />
          </svg>
        </button>
      </div>
    </article>
  )
}

// memo: a card only re-renders when its own props change
export default memo(PhotoCard)

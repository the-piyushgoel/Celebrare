# Photo Gallery

A small React photo gallery built for the Celebrare frontend internship pre-screening.

## Tech

- React (functional components + hooks only)
- Vite
- Tailwind CSS (no other UI libraries)
- Data from the Picsum Photos API: `https://picsum.photos/v2/list?limit=30`

## What it does

- Fetches 30 photos on load, with a loading spinner and an error message
- Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Real-time search by author name (filters the already-fetched data, no extra API call)
- Heart button to mark favourites, managed with `useReducer` and saved in `localStorage`

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Project structure

```
src/
  main.jsx
  App.jsx
  index.css
  hooks/
    useFetchPhotos.js        # custom hook -> { photos, loading, error }
  reducers/
    favouritesReducer.js     # reducer + localStorage loader
  components/
    Gallery.jsx              # uses the hook, useReducer, useCallback, useMemo
    PhotoCard.jsx            # photo, author name, heart button
    Spinner.jsx
```

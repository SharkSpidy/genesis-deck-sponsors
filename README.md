# HIVE — Venue Partnership Deck

A Vite + React + TypeScript rebuild of the HIVE pitch deck for Jain University.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. Build for production with `npm run build`;
the output lands in `dist/` and can be hosted anywhere static files are served.

## Editing content

Each slide is its own component under `src/slides/`. Edit the text directly in
the relevant `SlideNN*.tsx` file — layout and styling live in `src/App.css`.
Navigation, keyboard/touch handling, and the progress bar are in `src/Deck.tsx`.

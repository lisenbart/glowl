# GLOWL WORKS

Conversion-focused one-page site for **GLOWL WORKS** — commercial, gaming and cinematic production.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy (GitHub Pages)

Pushes to `main` deploy automatically via GitHub Actions.

Live URL: `https://lisenbart.github.io/glowl/`

To enable the first deploy, open the repo on GitHub → **Settings** → **Pages** → set **Source** to **GitHub Actions**.

## Production build

```bash
npm run build
npm run preview
```

## Assets

| Path | Purpose |
|------|---------|
| `public/images/header_01.png` | Hero background (from `header_01.png`) |
| `public/logos/glowl-logo.png` | Header / footer logo |
| `public/images/reels/` | Reel poster images |
| `public/videos/commercial.mp4` | Commercial reel |
| `public/videos/gaming.mp4` | Gaming reel |
| `public/videos/cinema.mp4` | Film reel |

Update paths in `src/data/reels.ts`.

## Contact form (Formspree / Resend)

1. Open `src/data/site.ts`
2. Set `contactEndpoint` to your Formspree form URL, e.g. `https://formspree.io/f/xxxxx`
3. Submissions include file upload support via `FormData`

Until configured, submissions log to the browser console and show success in dev.

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Framer Motion
- Lucide icons

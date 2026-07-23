# GLOWL

Cinematic production site for brands, games and entertainment.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy (Netlify)

Production: [https://glowl.direct](https://glowl.direct)

- Build: `npm run build`
- Publish directory: `dist`
- Node: 20
- Config: `netlify.toml`
- Branch: `main` → auto-deploy

DNS stays at Imena.ua; hosting/CDN is Netlify (same pattern as lisenbart.com).

## Production build

```bash
npm run build
npm run preview
```

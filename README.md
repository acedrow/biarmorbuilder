# BiArmor Builder

One-page Vue app for viewing and customizing steel combat armor sets. Hardcoded data for now; deployed as a static SPA on Cloudflare Workers.

## Development

```bash
npm install
npm run dev
```

## Build & preview

```bash
npm run build
npm run preview
```

## Deploy to Cloudflare

Log in once with `wrangler login`, then:

```bash
npm run deploy
```

This runs `vite build` and deploys the client assets via Wrangler. No backend worker is configured yet.

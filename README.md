### Hotel & Thalasso – Landing Page (Next.js App Router)

A fast, multilingual (FR/EN) landing page for Dakhla Club’s spa & wellness offers.

### Tech stack

- **Next.js 15 (App Router)**: server/client components, headers/redirects
- **TypeScript**
- **Tailwind CSS** (+ shadcn/ui, Radix, tailwindcss-animate)
- **next-intl** (i18n routing `/fr` and `/en`)
- **next-themes** (light/dark)
- **Framer Motion**, **Embla Carousel**
- **Vercel Analytics**, **next-sitemap**

### Features

- 2s animated loader that doesn’t block SEO
- SEO-ready: metadata, Open Graph, sitemap, robots, responsive images
- Accessible and responsive UI
- Serverless API to forward reservations to Google Apps Script/Sheets
- Easy localisation via `src/messages/*.json`

### Project structure

```text
src/
├─ app/
│  ├─ [locale]/            # “fr” & “en” segments
│  │  ├─ layout.tsx        # i18n provider, theme, analytics, schema
│  │  └─ page.tsx          # localized landing pages
│  └─ api/
│     ├─ reservation/route.ts
│     └─ chatbot-reservation/route.ts
├─ components/              # UI and sections (incl. shadcn ui/*)
├─ i18n/                    # next-intl routing helpers
├─ lib/                     # utilities
├─ messages/                # en.json, fr.json
└─ app/globals.css          # Tailwind base styles
```

### Requirements

- Node.js 18+

### Setup

1. Install dependencies

```bash
npm install
```

2. Copy environment template and fill values

```bash
cp .env.example .env.local
# set GSCRIPT_URL
```

3. Run the app

```bash
npm run dev
```

Build and start

```bash
npm run build && npm start
```

### Environment variables

- **GSCRIPT_URL**: Server-side URL to your Google Apps Script endpoint (preferred)
- Legacy: **NEXT_PUBLIC_GSCRIPT_URL** (still supported via fallback)

### NPM scripts

- `dev`: run Next.js in dev with Turbopack
- `build`: production build
- `start`: start production server
- `lint`, `lint:fix`: lint code
- `type-check`: TypeScript without emitting
- `format`, `format:check`: Prettier formatting

### Conventions & tooling

- Type-safe env via `src/env.ts` (Zod). API routes use `env.GSCRIPT_URL`.
- Prettier + Tailwind plugin and `.editorconfig` for consistent formatting.
- Strict TS, ESLint `next/core-web-vitals`.

### Deployment

- Recommended: Vercel. Ensure `GSCRIPT_URL` is configured in project settings.
- `next-sitemap` runs postbuild to generate `sitemap.xml` and `robots.txt`.

### License

Private project. All rights reserved.

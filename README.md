# Hotel & Thalasso – Landing Page (Next.js App Router)

A fast, multilingual (FR/EN) landing page for **Dakhla Club’s spa & wellness offers**.

| Tech | Usage |
|------|-------|
| **Next.js 14** | App Router, Server/Client components |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui + Radix** | Accessible UI primitives |
| **next-intl** | i18n routing (`/fr` / `/en`) |
| **next-themes** | Light / Dark mode toggle |
| **Framer-Motion** | Hero & logo loader animations |
| **Embla-Carousel** | Responsive testimonial / image carousels |
| **Google Apps Script + API route** | Sends reservation forms to Google Sheets |
| **next-sitemap** | Auto-generated sitemap & `robots.txt` |
| **SweetAlert2** | Friendly form feedback |

---

## ✨ Features

- **2-second animated loader** that does **not** hurt SEO (full HTML is rendered underneath, then an overlay fades).
- **SEO-ready**: title/description tags, Open Graph, ALT attributes, sitemap, robots, and lighthouse-friendly performance.
- **Responsive & accessible** out of the box – keyboard navigation, proper color contrast, semantic markup.
- **Serverless form endpoint** (`/api/reservation`) → Google Sheets (no dedicated backend required).
- **Easy localisation** – add new languages by dropping JSON files in `src/messages`.

---

## 🔧 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/successproductions/hotel-thalasso-landing.git
cd hotel-thalasso-landing
npm install        # or npm install / yarn


src/
├─ app/                     # Next App Router routes
│  ├─ [locale]/             # “fr” & “en” segments
│  │  ├─ page.tsx           # root landing page
│  │  └─ layout.tsx         # i18n + theme + PageLoader overlay
│  └─ api/
│     └─ reservation/       # POST → Google Apps Script
├─ components/              # Reusable UI pieces
│  ├─ PageLoader.tsx        # 2-second logo overlay
│  ├─ contact-form.tsx
│  ├─ ImageCarousel.tsx     # Embla wrapper
│  └─ ui/                   # shadcn-generated primitives
├─ messages/                # i18n JSON dictionaries
└─ styles/                  # globals.css, fonts, etc.
public/
  ├─ LogoIcone.png
  └─ og-images/…

# TileVista — Static Image Assets

All site images are stored here under `frontend/public/images/`.
Files placed here are served at the root URL — e.g. a file at
`public/images/hero/slide2.jpg` is accessed in code as `/images/hero/slide2.jpg`.

---

## Folder Structure

```
public/
└── images/
    ├── hero/            ← Hero slider background images
    │   ├── slide1.jpg   (Slide 1 — already using Unsplash URL, replace here if needed)
    │   ├── slide2.jpg   (Slide 2 — Tile Collections)
    │   └── slide3.jpg   (Slide 3 — 3D Designer)
    │
    ├── products/        ← Individual product images (if not served by backend)
    │   └── ...
    │
    ├── categories/      ← Category section thumbnail images on home page
    │   └── ...
    │
    └── ui/              ← Logos, icons, brand assets, other UI elements
        └── ...
```

---

## How to use images in code

### Next.js `<Image>` component (recommended — auto-optimizes)
```tsx
import Image from 'next/image';

<Image
  src="/images/hero/slide2.jpg"
  alt="Tile Collections"
  fill
  className="object-cover"
/>
```

### Plain CSS background (used in Hero slider)
```tsx
style={{ backgroundImage: "url('/images/hero/slide2.jpg')" }}
```

---

## Hero Slider — replacing placeholder images

Open `frontend/src/components/landing/Hero.tsx` and update `imageUrl` in the slides array:

```ts
// Slide 2 — Tile Collections (~line 72)
imageUrl: '/images/hero/slide2.jpg',

// Slide 3 — 3D Designer (~line 89)
imageUrl: '/images/hero/slide3.jpg',
```

---

## Supported formats
- `.jpg` / `.jpeg` — Photos (recommended for hero/product images)
- `.png` — Logos, icons, transparent images
- `.webp` — Best compression (convert with Squoosh or similar)
- `.svg` — Vector icons and brand marks

---

## Recommended image sizes
| Folder | Recommended size | Notes |
|--------|-----------------|-------|
| `hero/` | 1920 × 1080 px | Wide landscape, used full-bleed |
| `products/` | 800 × 800 px | Square preferred |
| `categories/` | 600 × 400 px | Landscape |
| `ui/` | Varies | Keep SVG where possible |

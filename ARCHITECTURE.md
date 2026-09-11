# Rajasthan Tourism — Architecture & Learning Documentation
**Phase 1: Foundation, Design System & Core Architecture**

Welcome to the architectural chronicle of **Rajasthan Tourism**. This document explains the design principles, file structure, data layers, and component patterns established in Phase 1. It serves as an educational and technical roadmap for building a modern, editorial, and accessible travel web platform.

---

## 1. Project Directory Structure

```
├── ARCHITECTURE.md          # Architecture & developer reference (this document)
├── index.html               # Entry HTML with preconnected Cormorant & Jakarta fonts
├── metadata.json            # AI Studio applet permissions and description
├── package.json             # Dependencies and build/lint scripts
├── tsconfig.json            # Strict TypeScript configuration
├── vite.config.ts           # Vite 6 + Tailwind v4 build pipeline
├── src/
│   ├── App.tsx              # Application orchestrator and route dispatcher
│   ├── main.tsx             # React 19 root DOM renderer
│   ├── index.css            # Tailwind v4 theme definitions and CSS variables
│   ├── types/
│   │   └── index.ts         # Strictly typed domain models
│   ├── data/
│   │   ├── destinations.ts  # Rich data for 8 core cultural epicenters
│   │   ├── experiences.ts   # Curated desert, lake, and craft activities
│   │   ├── cuisines.ts      # Authentic culinary specialties and heritage
│   │   ├── festivals.ts     # Annual festive calendar and cultural context
│   │   └── itineraries.ts   # Multi-day travel circuits (Royal Triangle, etc.)
│   ├── lib/
│   │   ├── repository.ts    # Decoupled Data Access Layer (Repository Pattern)
│   │   ├── router.tsx       # Accessible client-side router (hash + history fallback)
│   │   └── motion.ts        # Standard motion easings and reduced-motion tokens
│   ├── components/
│   │   ├── ui/              # Atomic design primitives
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── LinkButton.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ResponsiveImage.tsx
│   │   ├── layout/          # Global structural wrappers
│   │   │   ├── Header.tsx   # Desktop nav, mobile drawer, active indicator
│   │   │   ├── Footer.tsx   # Semantic landmarks and educational disclaimer
│   │   │   └── PageShell.tsx# Skip-to-content accessibility wrapper
│   │   └── map/
│   │       └── MapFoundation.tsx # Vector SVG spatial navigator & dual list
│   └── views/               # Route view foundations
│       ├── HomeView.tsx
│       ├── DestinationsView.tsx
│       ├── DestinationDetailView.tsx
│       ├── ExperiencesView.tsx
│       ├── FoodView.tsx
│       ├── FestivalsView.tsx
│       ├── TravelGuideView.tsx
│       └── PlannerView.tsx
```

---

## 2. The Repository / Data Access Pattern

### The Problem in Traditional Frontends
In many beginner projects, UI components directly import raw JSON or array files (e.g., `import { data } from '../data/myFile'`). This creates tight coupling: changing a field name or switching to an API requires editing every component.

### The Solution: `tourismRepository`
We established a clean repository layer in `src/lib/repository.ts`.
- Components only invoke methods such as `tourismRepository.getAllDestinations()` or `tourismRepository.getDestinationBySlug(slug)`.
- Data is returned with hydrated relationships (e.g., each destination automatically includes its regional culinary items, festivals, and nearby travel routes).
- **Future-Proofing:** When transitioning to a headless CMS (like Strapi/Sanity) or a database (like Firestore/Postgres), only `repository.ts` needs to be updated to fetch data over `async/await`; zero component code needs to change.

---

## 3. Design System & Semantic Tokens

The design language reflects *Contemporary Rajputana*—warm, architectural, and restrained, avoiding cliché visual clutter.

### Semantic Color Tokens (`src/index.css`)
- `--bg-app: #FAF7F2`: Warm Ivory canvas, mimicking natural lime plaster and sun-bleached linen.
- `--surface-card: #FFFFFF` and `--surface-elevated: #F5EFE6`: Clean stone-tinted containers.
- `--accent-primary: #B85D38`: Terracotta ochre inspired by Jaipur pottery and desert bricks.
- `--accent-royal: #2A4B6B`: Indigo Citadel blue honoring the blue alleys of Jodhpur.
- `--accent-crimson: #842222`: Deep Haveli red for royal ceremonial accents.
- `--accent-saffron: #D97706`: Muted desert saffron celebrating festive occasions.
- `--text-primary: #1C1917` & `--text-secondary: #57534E`: High-contrast charcoal passing WCAG AA requirements (no light gray on pale backgrounds).

### Typographic Hierarchy
1. **Display Serif (`font-serif`):** *Cormorant Garamond* for majestic, expressive headlines that evoke ancient stone inscriptions and royal manuscripts.
2. **Sans Body (`font-sans`):** *Plus Jakarta Sans* for dense, ultra-legible metadata, travel times, and body copy.
3. **Tabular Numerals (`font-mono`):** For distance metrics, coordinates, and rupee budget values to prevent visual layout shift.

---

## 4. Routing Architecture (`src/lib/router.tsx`)

Instead of relying on heavy third-party routing packages that can run into issues with sandboxed iframes or React 19 concurrent mode, we built a zero-dependency, fully typed client router:
- Listens to both standard `window.location.hash` (`#/destinations/jaipur`) and `popstate` events.
- Provides a clean hook `useRouter()` returning `{ currentPath, navigate, params }`.
- Supports dynamic segment matching: `/destinations/:slug` correctly extracts `{ slug: 'jaipur' }`.
- Automatically scrolls smoothly to top on navigation.
- Accessible `<Link>` component sets `aria-current="page"` on active links.

---

## 5. Interactive Map Foundation (`src/components/map/MapFoundation.tsx`)

### Normalized Vector Canvas vs. Heavy GIS Maps
Rather than loading an external 250KB tile library (like Google Maps or Mapbox) that requires API keys and network roundtrips, we built an accessible vector map using pure SVG:
- **Normalized ViewBox:** `viewBox="0 0 800 650"`. Every destination contains pre-computed relative coordinate points (`svgX: 520, svgY: 260`).
- **Responsive Scaling:** SVG vectors scale proportionally on any phone, tablet, or 4K monitor.
- **Dual Representation for Accessibility:** The map component provides a view-mode toggle between the **Interactive Map Canvas** and an **Accessible Card List**. Keyboard users can navigate pins via `Tab` and press `Enter` to inspect preview dossiers.

---

## 6. Image System (`src/components/ui/ResponsiveImage.tsx`)

1. **Explicit Aspect Ratios:** Uses `aspect-video (16/9)`, `aspect-4/3`, or `aspect-square` to eliminate Cumulative Layout Shift (CLS).
2. **Skeleton Fallback:** Renders a subtle CSS gradient pulse until the image finishes decoding.
3. **Lazy Decoding:** Uses `loading="lazy"` and `decoding="async"` for non-hero imagery, and `loading="eager"` for hero images.
4. **Focal Point Handling:** Supports `object-top`, `object-center`, etc., to ensure architectural monuments are cropped properly.

---

## 7. Motion & Accessibility Standards

- **Reduced Motion Support:** A global CSS rule in `src/index.css` sets transition durations to `0.01ms` when `@media (prefers-reduced-motion: reduce)` is detected.
- **Keyboard Navigation:** All interactive elements (`Button`, `LinkButton`, Map Pins, Drawer triggers) feature high-visibility focus rings (`focus-visible:ring-2 focus-visible:ring-[#B85D38]`).
- **Skip Link:** A hidden skip-to-content landmark allows screen reader and keyboard users to bypass navigation.
- **No Anti-Patterns:** No scroll-jacking, custom mouse cursors, or magnetic buttons.

---

## 8. Development Commands

- `npm run dev`: Starts local Vite development server on port 3000.
- `npm run lint`: Performs strict TypeScript type-checking (`tsc --noEmit`).
- `npm run build`: Compiles production assets into `dist/`.
- `npm run preview`: Previews the compiled production build locally.

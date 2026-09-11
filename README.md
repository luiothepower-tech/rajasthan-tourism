# Rajasthan Tourism — The Royal Heritage Experience

An immersive, architectural, high-performance web platform celebrating the history, destinations, culture, sensory landscape, and regional circuits of Rajasthan, India. Built with Vite, React 19, TypeScript, and Tailwind CSS.

---

## 1. Architectural Overview

- **Framework**: React 19 + TypeScript on Vite 6.
- **Styling**: Tailwind CSS v4 featuring the bespoke *Royal Sandstone* aesthetic palette (Sandstone, Terracotta, Indigo, Crimson, and Saffron).
- **Typography**: Cormorant Garamond (Editorial Display Serif) paired with Plus Jakarta Sans (Precision UI Sans).
- **Navigation & Routing**: Custom zero-dependency hash-capable client router (`src/lib/router.tsx`) engineered for sandboxed iframe environments, browser history, and direct linkability without server-side redirect dependencies.
- **Data Architecture**: Decoupled Repository Pattern (`src/lib/repository.ts`) with typed models (`src/types/`) and centralized data sources (`src/data/`).
- **Asset Integrity**: Centralized Image Manifest (`src/data/imageManifest.ts`) with strict runtime and build-time verification (`src/data/imageValidation.ts`). Every visual asset is verified and locally served from `/public/images/`.

---

## 2. Security & Privacy Posture

- **Client-Side Architecture**: The current application does not contain a production API/backend endpoint, therefore server-side API authentication and server-side rate limiting are not currently applicable.
- **Zero Third-Party Secret Leakage**: No secret API keys (such as `GEMINI_API_KEY`) are exposed to the client-side bundle or required for execution.
- **Strict Privacy**: Trip planning state is persisted exclusively to the user's browser `localStorage` under the key `rajasthan_planner_state_v1`. No personal data, tracking cookies, or tracking telemetry is dispatched to external servers.
- **Defensive Sanitization**: All route parameters, search terms, and `localStorage` states are strictly validated and sanitized against whitelisted schemas, preventing state corruption, invalid types, or script injection.
- **XSS & Injection Protection**: No usage of `dangerouslySetInnerHTML`, `eval()`, `document.write()`, or unescaped HTML injection exists in the codebase. The router validates navigation schemes and blocks unsafe protocols (`javascript:`, `data:`, `vbscript:`).

---

## 3. Production HTTP Security Headers & Deployment Guide

For production deployment behind a reverse proxy (e.g., Nginx, Cloudflare, Caddy, Google Cloud Run), configure the following HTTP security headers at the web server/ingress layer:

### Recommended Security Headers

```http
# Modern Content Security Policy (allows self-hosted scripts, styles, Google fonts, SVG data URIs, and self images)
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data:; media-src 'self'; connect-src 'self'; frame-ancestors 'self';

# Prevents browsers from MIME-sniffing a response away from the declared content-type
X-Content-Type-Options: nosniff

# Mitigates clickjacking by restricting framing to identical origins
X-Frame-Options: SAMEORIGIN

# Controls referrer data leakage across origins
Referrer-Policy: strict-origin-when-cross-origin

# Restricts access to sensitive browser device APIs
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()

# Enforces HTTPS connections and subdomains for 1 year (when served over TLS)
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### Production Nginx Ingress Configuration Example

```nginx
server {
    listen 443 ssl http2;
    server_name YOUR_DEPLOYED_DOMAIN.example;

    root /var/www/rajasthan-explorer/dist;
    index index.html;

    # Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data:; media-src 'self'; connect-src 'self'; frame-ancestors 'self';" always;

    # SPA Routing Fallback
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # Immutable Caching for Hashed Static Assets
    location ~* \.(?:js|css|jpg|jpeg|png|svg|webp|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }
}
```

---

## 4. Key Functional Modules

1. **Cinematic Hero**: Verified cross-fading imagery representing the four color cities (Jaipur, Jodhpur, Udaipur, Jaisalmer) with authentic ambient audio loop and live multi-category search.
2. **Destination Exploration**: Curated guides for 8 primary destinations (Jaipur, Udaipur, Jodhpur, Jaisalmer, Pushkar, Chittorgarh, Bikaner, Mount Abu) with seasonal timing, duration, cultural monikers, and regional filters.
3. **Interactive Route & Budget Planner**: Parametric trip planner calculating distance matrices, travel duration, accommodation tiers, transport modes, and contingency reserves.
   - *Note on Rates*: All budget outputs are strictly **DEMO / ESTIMATED VALUES** calculated for educational planning and orientation purposes.
4. **Heritage Experiences & Gastronomy**: Curated guides detailing culinary recipes, iconic stepwells, desert circuits, and annual cultural festival calendars.
5. **Accessibility & Reduced Motion**: Fully functional and compliant with `prefers-reduced-motion: reduce`. Standard WCAG AA contrast compliance and semantic HTML elements across all components.

---

## 5. Development & Build Scripts

```bash
# Install dependencies
npm install

# Start local development server (Port 3000)
npm run dev

# Run TypeScript compilation and Vite production build
npm run build

# Run ESLint validation
npm run lint
```

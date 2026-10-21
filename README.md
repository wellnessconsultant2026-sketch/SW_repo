# Return to Yourself — Production React Site

A bespoke, client-facing single-page React website for a Moldova-based spiritual healer and meditation guide. Built like a quiet, expensive gallery installation, avoiding generic wellness or clinical tropes.

---

## 1. Quick Start

Ensure [Node.js](https://nodejs.org) (v18+ recommended) is installed.

```bash
# Install dependencies
npm install

# Start the Vite development server at http://localhost:3000
npm run dev

# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

## Supabase Production Storage

The Next.js API routes use Supabase for production persistence when these variables are present in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=your-strong-admin-password
ADMIN_JWT_SECRET=your-long-random-secret
```

Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. In the Supabase SQL editor, run [`supabase/schema.sql`](./supabase/schema.sql), then migrate the existing local content:

```bash
npm run supabase:seed
```

Content and consultation inquiries are stored in PostgreSQL. Media assets are stored in the public `site-assets` Storage bucket. Without Supabase variables, local JSON and `public/` storage remain available for development.

---

## 2. Project Structure

```
return-to-yourself/
├── package.json
├── vite.config.js
├── index.html
├── README.md
└── src/
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Main component composition
    ├── styles/
    │   ├── tokens.css           # Core color, type, and spacing design tokens
    │   ├── reset.css            # Modern CSS reset
    │   └── global.css           # Global typography, focus states, reduced-motion rules
    ├── data/
    │   └── content.js           # Centralized copy layer (all user-facing strings)
    ├── hooks/
    │   ├── useReducedMotion.js  # React hook listening for prefers-reduced-motion
    │   └── useInView.js         # IntersectionObserver wrapper for scroll animations
    ├── lib/
    │   └── motion.js            # Shared Framer Motion variants (fadeUp, fadeIn, stagger)
    └── components/
        ├── Nav.jsx & .module.css
        ├── Footer.jsx & .module.css
        ├── ConsultationModal.jsx & .module.css
        └── sections/
            ├── Hero.jsx & .module.css
            ├── Pause.jsx & .module.css
            ├── About.jsx & .module.css
            ├── Services.jsx & .module.css
            ├── Healing.jsx & .module.css
            ├── Stillness.jsx & .module.css
            ├── Testimonials.jsx & .module.css
            ├── Faq.jsx & .module.css
            └── Contact.jsx & .module.css
```

---

## 3. Animation Philosophy & Discipline

1. **The Hero is the "Big Swing"**:
   - Holds full dark screen for ~800ms.
   - A single point of light appears off-center and gently expands over 2.5s.
   - The seated silhouette emerges softly from the darkness as light passes over it.
   - ~80 ambient particles begin a slow, near-static upward drift.
   - Headline fades in last with letter-spacing settling from `0.04em` to `0`.
   - Subtle 2–4px mouse parallax applies strictly to the silhouette and particles (never to text).
2. **One Animated Idea per Section**:
   - Each subsequent section has exactly one calm, restrained motion effect (e.g. scroll-linked background warming, sticky horizontal card unfolding, 4-4-4 breathing circle, or gentle crossfade).
3. **Strict Reduced Motion Support**:
   - When `prefers-reduced-motion: reduce` is detected, animations immediately collapse to `1ms` or static states, canvas particles are disabled, and heavy parallax is removed.

---

## 4. How to Swap Copy

All user-facing copy is strictly isolated in [`src/data/content.js`](./src/data/content.js).

To update any text on the website:

1. Open `src/data/content.js`.
2. Locate the appropriate section key (`hero`, `pause`, `journey`, `healing`, `stillness`, `guidance`, `discover`, `testimonials`, `transformation`, `contact`, or `footer`).
3. Edit strings directly. Components import from this single source of truth; no component files need modification.

> **Note on Tone & Vocabulary**: Keep copy quiet, direct, and unhurried. Do not introduce clinical, medical, or therapy terms (`treatment`, `therapy`, `patient`, `diagnosis`, `doctor`, `clinic`, `cure`, `heal you`).

---

## 5. How to Add a Practitioner Photo

The practitioner section in [`src/components/sections/About.jsx`](./src/components/sections/About.jsx) currently features a fine-art SVG silhouette with gentle warm lighting.

To substitute a high-resolution photograph:

1. Place your optimized web image (e.g., `practitioner.webp` or `practitioner.jpg`, recommended dimensions $800 \times 1000\text{px}$) in the `public/` directory or `src/assets/`.
2. Open `src/components/sections/About.jsx`.
3. In `visualCol`, replace the `<svg className={styles.cardSvg} ...>` block with:
   ```jsx
   <img
     src="/practitioner.webp"
     alt="Elena Moraru, practitioner in Chișinău, Moldova"
     className={styles.portraitImg}
     loading="lazy"
     width="400"
     height="500"
   />
   ```
4. In `src/components/sections/About.module.css`, style `.portraitImg` with:
   ```css
   .portraitImg {
     width: 100%;
     height: auto;
     display: block;
     filter: contrast(0.95) brightness(0.9);
   }
   ```

---

## 6. Verification & Build

```bash
# Run production build
npm run build
```

This project compiles cleanly with Vite and has zero warnings.

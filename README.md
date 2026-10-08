# Prit Patel — Digital Artifact & Developer Portfolio: "DARKROOM"

> **Concept**: A developer is also the chemical catalyst that turns an exposed negative into a sharp print on paper. Pages arrive dark and develop into focus. The projects index is a contact sheet. Hovering a frame brings up a 140px loupe. Case studies follow **Develop → Stop → Fix**. The theme toggle is an iris exposure wipe.

Built strictly to the specification in [DESIGN_BRIEF.md](./DESIGN_BRIEF.md) and governed by the standing quality rules in [AGENTS.md](./AGENTS.md).

---

## 🌟 The Twelve Signature Moments

Every pinned scene, camera move, and page transition is strictly choreographed per Brief §14 and verified in the Motion Lab (`/dev/moments`):

1. **M1 · Develop Intro**: First visit session intro. Radial clip-path veil opening from wordmark centre; Archivo `wdth` axis easing 62 → 125 with per-letter stagger; instant skip on click/key.
2. **M2 · Name Response & Exit**: Fine-pointer proximity widening (`wdth` 100 → 125); scrubbed scroll exit dimming (1 → 0.2) like a chemical stop bath.
3. **M3 · Contact-Sheet Camera**: Selected work frame-by-frame zoom on desktop (≥ 1024px) with label snapping; clean vertical list fallback on mobile/reduced-motion.
4. **M4 · Loupe**: 140px magnifying lens following pointer with 2.2× zoom and 2px ring; tap fallback on touch devices.
5. **M5 · Picks (Grease-Pencil Marks)**: Hand-drawn SVG grease-pencil ellipse encircling marked FrameCards; persisted in `sessionStorage`; header count chip; bottom sheet tray; pre-fills into `/contact?picks=...`.
6. **M6 · Shared-Element Transition**: Morphing thumbnail frame to case study hero via View Transitions API.
7. **M7 · Chapter Stamps**: Develop / Stop / Fix chapter headers typed in monospace font (`▷ 04A · DEVELOP`) with scroll trigger.
8. **M8 · Iris Theme Toggle**: Circular clip-path wipe expanding from button origin via View Transitions API (600ms expo-out); instant swap under reduced motion.
9. **M9 · Contact Success**: Smooth FLIP collapse of input fields into developed darkroom confirmation (`Negative received and queued. I reply within 24 hours`).
10. **M10 · 404 Blank Negative**: Film frame with grease-pencil X in safelight amber, interactive command palette search, and 3 recovery pathways.
11. **M11 · Console Hello**: Stylized ASCII banner logged on initial visit in browser console (`PRIT PATEL · BACKEND & DISTRIBUTED SYSTEMS ARCHITECT`).
12. **M12 · Keyboard Shortcuts Layer**: Global `?` modal dialog with sequential navigation (`g h`, `g p`, `g w`, `g c`, `g r`), system tools (`⌘K`, `/`, `t`), and a dedicated WCAG 2.1.4 single-key disable switch.

---

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router, React 19 Server Components)
- **Styling**: Tailwind CSS v4 driven strictly by CSS variable design tokens (`--bg`, `--surface`, `--surface-2`, `--line`, `--text`, `--text-dim`, `--safelight`)
- **Typography**:
  - **Display**: Archivo Variable (`wght 100–900`, `wdth 62–125`) with pointer proximity kinetics
  - **Body Text**: Geist (`400/500`) at 18–20px fluid scale (`--step-body`, line-height 1.6)
  - **Meta & Counters**: Geist Mono with tabular numerals and uppercase tracking
- **Motion & Animation**: GSAP 3 (ScrollTrigger, Flip), Lenis smooth scroll, View Transitions API
- **Code & Syntax**: Shiki monospace highlighting with filename badges and copy actions
- **Edge Dynamic OpenGraph**: Satori & Next.js `ImageResponse` generating 1200×630 cards at `/api/og`
- **Syndication**: Standard RSS 2.0 XML feed at `/rss.xml`
- **Data Integrity**: Zod schemas and strict source verification

---

## 🚀 Getting Started

### Prerequisites
Node.js 18+ (tested on Node v22 / v24) and npm.

### Installation

```bash
git clone https://github.com/pritpatel2412/Portfolio.git
cd Portfolio
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Quality Gates & Test Suites

The site is governed by strict CI gates (Brief §19):

```bash
npm run typecheck       # Strict TypeScript check (0 errors)
npm run lint            # ESLint static analysis (0 warnings)
npm run check:content   # Content integrity: zero unverified claims, zero broken routes
npm run check:contrast  # WCAG 2.1 AA audit of all 12 token contrast pairs
npm run test:audit      # Playwright audit (12 routes × 4 viewports × 2 themes + 4x CPU throttle)
npm run build           # Production static build (prerenders all 27 static & dynamic routes)
npm run start           # Run production server
```

---

## 📁 Content Management Architecture

All content is strictly factual with zero invented metrics or client claims. Missing facts are tracked as `TODO(content)` entries:

- `lib/projects.ts`: Structured case studies (RedForge, SearchMind API, Kyren, CodeGuard, KemLang, ARIA) with senior decision logs, architecture node graphs, verified metric sources, and gallery screens.
- `content/articles.ts`: Verbatim technical essays with structured headings, code blocks, callouts, and margin sidenotes.
- `content/experience.json`: Career timeline with role outcomes and technologies.
- `content/profile.json`: Core bio, positioning, proof points, and social links.
- `app/sitemap.ts`: Dynamic XML sitemap indexing all projects, essays, and core routes.

---

## ⌨️ Global Keyboard Navigation

- `?`: Open Keyboard Shortcuts specification modal
- `⌘K` or `Ctrl+K`: Open Command Palette (Search, navigation, quick actions)
- `/`: Focus quick search filter
- `t`: Toggle Darkroom / Lightbox theme
- `g then h`: Navigate to Studio Home (`/`)
- `g then p`: Navigate to Projects Contact Sheet (`/projects`)
- `g then w`: Navigate to Writing & Field Notes (`/writing`)
- `g then c`: Navigate to Contact & Proposals (`/contact`)
- `g then r`: Navigate to Semantic Résumé (`/resume`)
- `Esc`: Close open modal, mobile menu, or command palette

*(Note: Single-key shortcuts can be disabled anytime inside the `?` dialog per WCAG 2.1.4).*

---

## 📄 License & Credits

Designed and engineered by **Prit Patel**. Concept & art direction: **DARKROOM**.
All rights reserved.

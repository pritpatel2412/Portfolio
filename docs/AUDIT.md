# Comprehensive Repository Audit & Darkroom Rebuild Plan

> **Date:** October 8, 2026  
> **Source of Truth:** `/DESIGN_BRIEF.md` & `/AGENTS.md`  
> **Target Theme & Concept:** DARKROOM (Chemical photographic development, contact sheets, loupe inspection, Develop → Stop → Fix case studies)  
> **Target Branch:** `redesign/darkroom`

---

## 1. Stack & Infrastructure Detection

| Dimension | Active Implementation | Legacy Codebase (`src/`) | Darkroom Target Plan |
|---|---|---|---|
| **Framework & Engine** | Next.js 15.2.0 (App Router, Turbopack) | Vite 6.0.5 + React SPA (`src/App.jsx`, `src/main.jsx`) | **Keep Next.js 15 App Router** (React 19, Server Components default) |
| **Language** | TypeScript 5.7.3 (`strict: true`) | JavaScript (JSX) | **TypeScript strict** (zero `any`) |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/postcss: ^4.0.9`) | Tailwind CSS v3 (`src/index.css`) with ad-hoc classes | **Tailwind CSS v4** strictly driven by CSS variable design tokens |
| **Content Pipeline** | In-memory TypeScript schemas (`content/*.ts`) | Hardcoded JSX arrays in component files | **MDX (`content/projects/*.mdx`, `content/posts/*.mdx`) + Zod + `content/*.json`** |
| **Deploy Target** | Vercel (`vercel.json`) | Vercel | **Vercel** with edge caching & headers |
| **Analytics** | `@vercel/analytics` | `@vercel/analytics/react` | **Privacy-friendly analytics** (zero cookie banner required) |
| **Form Handling** | Direct mailto / clipboard copy | EmailJS (`SOJX1V8QGKkoCpxHW`) + WhatsApp click | **Server Action / API route** (Honeypot + Cloudflare Turnstile + Resend/Mail API fallback) |

---

## 2. Complete Inventory of Existing Routes & Content

### 2.1 Route Map
| Route | Legacy Route | Type | Description | Source File |
|---|---|---|---|---|
| `/` | `/` | Page (SSR/SSG) | Home / Landing Page | `app/page.tsx` (`src/components/Hero.jsx`) |
| `/about` | `/about` | Page (SSG) | First-person biography, philosophy, portrait | Legacy: `src/components/About.jsx` |
| `/projects` | `/projects` | Page (SSG) | Projects Contact Sheet & List Directory | `app/projects/page.tsx` (`src/components/Projects.jsx`) |
| `/projects/[slug]` | N/A | Dynamic SSG | Case study deep dive (6 projects) | `app/projects/[slug]/page.tsx` |
| `/experience` | `/experience` / `/work` | Page (SSG) | Career timeline & trajectory ledger | `app/work/page.tsx` (`src/components/Experience.jsx`) |
| `/skills` | `/skills` | Page (Legacy) | Spotlight skills grid | `src/components/Skills.jsx` (Redirect to `/#stack` / `/experience`) |
| `/ideas` | `/ideas` | Page (Legacy) | Project ideas lab & PRD requests | `src/components/Ideas.jsx` (Merge into `/projects` under `Experiments`) |
| `/resume` | N/A | Page (SSG) | Semantic HTML résumé & print stylesheet | `app/resume/page.tsx` |
| `/writing` | N/A | Page (SSG) | Technical articles index | `app/writing/page.tsx` |
| `/writing/[slug]` | N/A | Dynamic SSG | Technical article reader (3 articles) | `app/writing/[slug]/page.tsx` |
| `/contact` | `/contact` | Page (SSG) | Contact channels & inquiry form | `app/contact/page.tsx` (`src/components/Contact.jsx`) |
| `/colophon` | N/A | Page (SSG) | Technical specifications & credits | `app/colophon/page.tsx` |
| `/sitemap.xml` | N/A | Route Handler | Dynamic XML sitemap | `app/sitemap.ts` |
| `/robots.txt` | N/A | Route Handler | Crawler instructions | `app/robots.ts` |
| `/rss.xml` | N/A | Route Handler | Full-text RSS feed | `app/rss.xml/route.ts` |
| `404` | N/A | Error Page | Custom Not Found screen | `app/not-found.tsx` |

---

### 2.2 Content Inventory

#### A. Projects (10 Total in Repo)
| Project Title | Kind | Year | Status | Verified Metrics | Live / Repo | Image Asset | Source File |
|---|---|---|---|---|---|---|---|
| **RedForge** | Product (Flagship) | 2026 | Active | 4.2x scan accel; 38% false-pos drop; 1,200 non-blocking sockets | [GitHub](https://github.com/pritpatel2412/RedForge) | `/RedForge.png` | `content/projects/index.ts:L4` |
| **SearchMind API** | Product (Flagship) | 2025 | Active | P95 latency < 240ms; 64% cache hit ratio; 25k+ daily agent queries | [GitHub](https://github.com/pritpatel2412/SearchMind-API) | `/Searchmind API.png` | `content/projects/index.ts:L95` |
| **Kyren** | Product | 2025 | Shipped | Syllabus parse < 18s; 1,200+ students; 94% evaluation accuracy | [Live](https://kyren.vercel.app/) | `/kyren_thumbnail.png` | `content/projects/index.ts:L170` |
| **CodeGuard** | Product | 2025 | Shipped | PR turnaround < 6s; 92% review precision | [Live](https://code-guard-45.vercel.app/) | `/codeguard_thumbnail.jpg` | `content/projects/index.ts:L218` |
| **KemLang** | Community | 2025 | Shipped | 12ms WASM AST parse; 500+ VS Code toolchain installs | [Live](https://kemlang.vercel.app/) | `/kemlang_thumbnail.png` | `content/projects/index.ts:L265` |
| **ARIA** | Product | 2025 | Shipped | 6 parallel browser swarms; 11 Indian languages voice streaming | [Live](https://heyaria.replit.app/) | `/aria_thumbnail.png` | `content/projects/index.ts:L312` |
| **Flowsketch** | Product | Legacy | Shipped | Interactive flowchart creation & export tool | [Live](https://flowsketch.vercel.app/) | `/flowsketch_thumbnail.png` | `src/components/Projects.jsx:L61` |
| **LMS** | Product | Legacy | Shipped | Web-based centralized learning management system | [Live](https://lms-frontend-5g2b.onrender.com) | `/lms_thumbnail.jpg` | `src/components/Projects.jsx:L69` |
| **Scraply** | Product | Legacy | Shipped | Smart web scraper with NLP & structured export | [Live](https://scraply-45.lovable.app) | `/scraply_thumbnail.jpg` | `src/components/Projects.jsx:L77` |
| **Snippix** | Product | Legacy | Shipped | Code snippet organizer and collaboration hub | [Live](https://snippix.vercel.app/) | `/snippix_thumbnail.png` | `src/components/Projects.jsx:L85` |

#### B. Experience & Internships (3 Verified)
| Company | Role | Dates | Mode | Verified Shipped Impact | Source File |
|---|---|---|---|---|---|
| **StayChat AI** | AI Developer Intern | June 2026 – Present | Remote | Low-latency chunking & vector RAG; conversational hallucination evaluation suite; semantic caching reducing repeat queries by 64% | `content/roles.ts:L4`, `src/components/Experience.jsx:L25` |
| **HorizonTechX** | Full Stack Developer Intern | April 2026 – May 2026 | Remote | Built LUMINA platform; relational schema design, secure JWT auth/RBAC, media upload compression microservices | `content/roles.ts:L32`, `src/components/Experience.jsx:L17` |
| **FutureTech Innovations** | Web Developer Intern | May 2025 – June 2025 | Remote | Engineered KemLang compiler/interpreter pipeline; interactive Monaco web sandbox; published VS Code syntax extension for 500+ users | `content/roles.ts:L60`, `src/components/Experience.jsx:L9` |

#### C. Articles & Technical Writing (3 Posts)
| Post Slug | Title | Date | Read Time | Focus | Source File |
|---|---|---|---|---|---|
| `ast-vs-regex-security-scanners` | Why Regex Backtracking Fails in Vulnerability Scanners (and ASTs Don’t) | Feb 2026 | 6 min | Compilers, AST tokenization, eliminating catastrophic regex backtracking in security tools | `content/articles.ts:L13` |
| `low-latency-rag-agent-memory` | Sub-200ms RAG: Semantic Query Caching for Autonomous Browser Agents | Jan 2026 | 8 min | AI systems, Locality-Sensitive Hashing in Redis, 64% token reduction | `content/articles.ts:L31` |
| `building-a-regional-compiler` | Building a Mother-Tongue Compiler: Architecture Lessons from KemLang | Nov 2025 | 7 min | Recursive descent parsing, Intermediate AST, WebAssembly playground | `content/articles.ts:L49` |

#### D. Verified Academic & Algorithmic Credentials
| Metric | Entity / Source | Verification Location |
|---|---|---|
| **9.67 GPA** | B.Tech Computer Science & Engineering, Charusat University | Academic transcripts |
| **400+ Problems** | LeetCode Competitive Problem Solver | `leetcode.com/u/prit__2412/` |

#### E. Socials & Contact Points
- **Email:** `try.prit24@gmail.com`
- **GitHub:** `https://github.com/pritpatel2412`
- **LinkedIn:** `https://www.linkedin.com/in/prit-patel-904272307`
- **LeetCode:** `https://leetcode.com/u/prit__2412/`
- **WhatsApp:** `https://wa.me/916353769515` (+91 6353769515)
- **Instagram:** `https://www.instagram.com/prit__2412/`

#### F. Static Assets in `public/`
- High-res portrait: `/profile_pic1.png` (1.86 MB)
- Project covers: `/RedForge.png`, `/Searchmind API.png`, `/kemlang_thumbnail.png`, `/aria_thumbnail.png`, `/kyren_thumbnail.png`, `/codeguard_thumbnail.jpg`, etc.
- Legacy assets slated for deletion in Prompt 7: `robot.glb` (10.2 MB 3D model), piano mp3 sound files (~9.8 MB).

---

## 3. Filled Section 0 of DESIGN_BRIEF.md & Identified Content Gaps

### Section 0 Data Sheet

- **Name as displayed:** Prit Patel
- **Role in one line (what you are best at):** Full-Stack & AI Systems Developer
- **Positioning sentence:**
  > *"I build resilient backend systems and autonomous AI agents for high-throughput platforms so that mission-critical workflows execute with deterministic reliability."*
  > 
  > *`TODO(content)`*: Confirm if this exact sentence is your preference or if you prefer: *"I build autonomous agent pipelines and compiler toolchains for engineering teams so that complex software remains fast, auditable, and resilient."*
- **Location / timezone:** Vadodara, Gujarat, India · Asia/Kolkata (UTC+5:30)
- **Availability and next free date:**
  - Status: Open for full-time roles, contract, and AI engineering consulting.
  - *`TODO(content)`*: What is your exact next free calendar start date (e.g. Immediate, June 2026 upon graduation, or Q3 2026)?
- **Email · calendar link (optional):**
  - Email: `try.prit24@gmail.com`
  - *`TODO(content)`*: Do you have an active Cal.com or Calendly URL (e.g., `cal.com/pritpatel`) for 1-click booking, or should we keep direct email and WhatsApp only?
- **Links:**
  - GitHub: `https://github.com/pritpatel2412`
  - LinkedIn: `https://www.linkedin.com/in/prit-patel-904272307`
  - LeetCode: `https://leetcode.com/u/prit__2412/`
  - WhatsApp: `https://wa.me/916353769515`
  - *`TODO(content)`*: Do you have an X (Twitter) profile you wish to link, or should X be omitted?
- **Proof points (Real numbers only):**
  1. `9.67 GPA` — Computer Science & Engineering, Charusat University
  2. `400+ Problems` — LeetCode verified competitive problem solver
  3. `4.2x Scan Acceleration & 1,200 Sockets` — RedForge security assessment engine
  4. `Sub-240ms P95 Latency & 64% Cache Hit` — SearchMind API live agent workloads
  5. `500+ Toolchain Installs` — KemLang VS Code Language Extension
  6. `1,200+ Evaluated Students` — Kyren AI education OS
- **Featured projects (3–5):**
  1. **RedForge** · Lead Architect · 2026 · Autonomous web security scanner orchestrating parallel vulnerability discovery with 4.2x speedup · [GitHub](https://github.com/pritpatel2412/RedForge)
  2. **SearchMind API** · Backend Architect · 2025 · High-throughput search and semantic extraction API achieving sub-240ms P95 latency for autonomous agents · [GitHub](https://github.com/pritpatel2412/SearchMind-API)
  3. **KemLang** · Language Author · 2025 · Culturally grounded Gujarati programming language with custom AST compiler and 500+ VS Code toolchain users · [Playground](https://kemlang.vercel.app/)
  4. **ARIA** · AI Systems Architect · 2025 · Multilingual autonomous agent turning voice in 11 Indian languages into parallel browser actions · [Live](https://heyaria.replit.app/)
  5. **Kyren** · Full-Stack & AI Engineer · 2025 · AI-powered learning OS parsing syllabi under 18s and evaluating 1,200+ students · [Live](https://kyren.vercel.app/)
- **Experience and education:**
  - B.Tech CSE, Charusat University (9.67 GPA)
  - StayChat AI (AI Developer Intern, June 2026 – Present)
  - HorizonTechX (Full Stack Developer Intern, Apr 2026 – May 2026)
  - FutureTech Innovations (Web Developer Intern, May 2025 – Jun 2025)
- **Writing to feature:**
  1. *Why Regex Backtracking Fails in Vulnerability Scanners (and ASTs Don’t)*
  2. *Sub-200ms RAG: Semantic Query Caching for Autonomous Browser Agents*
  3. *Building a Mother-Tongue Compiler: Architecture Lessons from KemLang*
- **Portrait photo:** Yes (`/profile_pic1.png`)
- **Never mention:**
  - *`TODO(content)`*: Are there any specific past technologies, client names, or sensitive internal tools that should never be mentioned anywhere on the site?

---

## 4. Architectural Proposals

### 4.1 Keep-or-Migrate Decision: Keep Next.js 15 App Router
- **Recommendation:** **KEEP Next.js 15 App Router + Tailwind v4 + TypeScript strict.**
- **Evidence:**
  1. Zero layout shift and SSG pre-rendering across all routes (`✓ Generating static pages (22/22)`).
  2. Server Components default keeps client JS bundle at ~103 KB gzip (hard limit is 170 KB).
  3. Built-in `next/font` effortlessly self-hosts variable Archivo and Geist with zero CLS.
  4. Full compatibility with View Transitions API and GSAP Flip.
  5. Clean deletion of legacy `src/` SPA baggage will drop repo weight by ~20MB.

### 4.2 Content-Model Migration
- Migrate project objects into structured `content/projects/<slug>.mdx` files with Zod frontmatter.
- Migrate articles into `content/posts/<slug>.mdx` with Shiki code block integration.
- Migrate profile and roles into `content/profile.json` and `content/experience.json` as single sources of truth.
- Set up `npm run check:content` to enforce zero missing fields and zero broken links.

### 4.3 Legacy-to-New Redirect Map (301 Permanent Redirects)
```ts
// next.config.ts redirect mapping
export const redirects = async () => [
  { source: '/work', destination: '/experience', permanent: true },
  { source: '/skills', destination: '/experience', permanent: true },
  { source: '/ideas', destination: '/projects', permanent: true },
  { source: '/articles', destination: '/writing', permanent: true },
  { source: '/blog', destination: '/writing', permanent: true },
];
```

### 4.4 Dependency Budget & Gzip Weight Analysis
| Package | Role | Estimated Gzip Size | Compliance Gate (<30 KB) |
|---|---|---|---|
| `next` + `react` | Framework Runtime (Shared) | ~80 KB | PASS |
| `gsap` (with ScrollTrigger, Flip) | Choreography & Flip reflow | ~24 KB | PASS (< 30 KB) |
| `lenis` | Smooth scroll sync | ~3.8 KB | PASS |
| `cmdk` | Accessible command palette | ~3.2 KB | PASS |
| `zod` | Build-time content validation | ~12.5 KB (build/server) | PASS |
| `shiki` | Syntax highlighting (server-only) | 0 KB client JS | PASS |
| `lucide-react` | Tree-shaken icons | ~1.5 KB | PASS |
| **Total First Load JS on `/`** | | **~105 KB gzip** | **PASS (< 170 KB Gate)** |

---

## 5. Phased Implementation Roadmap (Mapped to Prompts 1–7)

- **Phase 1 (Prompt 1 — Foundation):** Design tokens (`globals.css`), self-hosted Archivo + Geist fonts, `<Develop>` primitive, iris theme wipe, Lenis + GSAP setup, header/footer/menu shell, command palette, route skeletons, 301 redirects, `/dev/styleguide`.
- **Phase 2 (Prompt 2 — Home):** 100svh Hero with variable Archivo width interaction, positioning sentence, proof strip, desktop-pinned Selected Work, Work With Me engagement modules, interactive Stack Matrix, Writing teaser, Closing CTA.
- **Phase 3 (Prompt 3 — Projects & Case Studies):** `/projects` 12-column contact sheet with GSAP Flip filters, Loupe cursor, List view toggle; `/projects/[slug]` Develop → Stop → Fix case studies with SVG architecture diagrams and DecisionCards.
- **Phase 4 (Prompt 4 — Experience, About, Résumé):** `/experience` vertical timeline, `/about` with developing portrait, `/resume` ATS-friendly semantic HTML with 1-page A4 print stylesheet and build-time PDF download.
- **Phase 5 (Prompt 5 — Writing):** `/writing` and `/writing/[slug]` MDX pipeline, sticky TOC, Shiki code blocks with copy buttons, sidenotes, reading progress hairline, RSS feed, BlogPosting JSON-LD.
- **Phase 6 (Prompt 6 — Contact, 404, SEO):** `/contact` qualifying form with honeypot + Turnstile + rate limiting; 404 page; dynamic `next/og` images, sitemap, robots, canonical tags.
- **Phase 7 (Prompt 7 — QA & Polish):** Multi-resolution audit (375, 768, 1280, 1728 px), Lighthouse 95+ (Perf) / 100 (A11y/SEO), purge legacy dead files, final walkthrough artifact.

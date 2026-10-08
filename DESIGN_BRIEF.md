### 0. Profile (fill in; the agent fills gaps from the existing repo)

- Name as displayed:
- Role in one line (what you are best at):
- Positioning sentence — I build \_\_\_ for \_\_\_ so that \_\_\_:
- Location / timezone:
- Availability (hire / freelance / both) and next free date:
- Email · calendar link (optional):
- Links (GitHub, LinkedIn, X, other):
- Proof points — real numbers only, each with where it can be verified:
- Featured projects (3–5): title · role · year · one-line outcome · live/repo links:
- Experience and education (extract from repo or résumé if blank):
- Writing to feature:
- Portrait photo: yes/no (path):
- Never mention:

### 1. The idea: DARKROOM

A developer is also the chemical that makes a hidden image appear on paper. The site plays on that. Pages arrive dark and develop into focus. The projects index is a contact sheet. Hovering a frame brings up a loupe. Sections are numbered like film frames (`▷ 03`). Case studies follow Develop → Stop → Fix: what was built, how it was broken and tested, what shipped and what it measured.

Use the metaphor in: load and page transitions; the projects index; the cursor on frames; frame counters; the case-study spine; the 404; the light/dark switch (an iris ‘exposure’ wipe).

Never use it as: textures, sepia filters, torn film borders, camera clip-art, shutter sounds, fake lens flare. If a metaphor element does not help scanning, navigation or the feeling of craft — delete it.

### 2. Principles

1. Proof before poetry. In five seconds a visitor knows who you are, what you do for whom, one proof point, and how to reach you.
2. One idea per viewport. One focal point, one action.
3. Motion explains; it never decorates. If removing an animation loses no meaning, remove it.
4. Fast is a feature. A site about engineering must be engineered: budgets in section 10 are gates.
5. Every claim links to evidence — a project, a post, a repo, a number with a source.
6. Quiet confidence: big type, generous space, one accent colour, one joke per page at most.

### 3. Information architecture

Routes: `/` Home · `/projects` contact-sheet index · `/projects/[slug]` case study · `/experience` · `/about` · `/resume` · `/writing` · `/writing/[slug]` · `/contact` · `/colophon` (optional, small) · 404.

Map every legacy URL to its new home with a 301 redirect; keep a redirect table in the plan.

Global elements: header, footer, ⌘K command palette (also `/`), theme toggle, availability pill.

### 4. Visual system

**Colour** — CSS variable tokens. Starting values; validate every text/background pair (body ≥ 4.5:1, large text and UI ≥ 3:1) with `npm run check:contrast`.

- Darkroom (default dark): bg `#0A0908`, surface `#14110F`, surface-2 `#1D1916`, line `rgba(237,232,223,.12)`, text `#EDE8DF`, text-dim `#A39B8F`, safelight (accent) `#FF5B2E`.
- Lightbox (light): bg `#F1EDE4`, surface `#FAF8F3`, surface-2 `#E8E2D6`, line `rgba(20,17,15,.14)`, text `#14110F`, text-dim `#5E574E`, safelight `#C22E09`.
- Follow the system preference by default; toggle persists; an inline script sets `data-theme` before first paint so there is no flash.
- Safelight covers at most 5% of any viewport. Use it only for focus/active states, the live-availability dot, one key number per screen, and the primary button fill/hover. Body links stay text colour with an underline.
- No gradients except one soft radial ‘safelight glow’ behind the hero name (≤ 8% opacity). Grain is a pre-rendered 128 px noise tile at 4–6% opacity — static, and off under reduced motion.

**Type**

- Display: Archivo (variable: weight 100–900, width 62–125). Hero name at width 125 / weight 800, tracking −0.03em. Section titles at width 100 / weight 700. Animate the `wdth` axis for kinetic effects (real variable-font animation, never scaled text).
- Text: Geist 400/500, 17–19 px, line-height 1.6. Essays 19–20 px at 66–70ch.
- Meta: Geist Mono 11–12 px, uppercase, +0.08em tracking — only for frame counters, dates, tags.
- Fluid scale with `clamp()` (hero up to about 17rem, h1 about 7rem, h2 about 3.5rem). `text-wrap: balance` on headings, `pretty` on paragraphs.
- Self-host (next/font or equivalent), latin subset, at most 4 font files and 160 KB total, zero layout shift.

**Grid and space**

- 12 columns, 24 px gutters (16 on mobile), content max 1440 px, outer margin `clamp(20px, 4vw, 64px)`. 4 px base unit; spacing scale 4 / 8 / 12 / 16 / 24 / 32 / 48 / 72 / 112 / 168 / 240.
- Break the grid on purpose, at most one element per section (the name, a frame, a quote).
- Radius 2 px on UI, 0 on frames and images (prints have square corners); pill shape only for the availability chip. Hairline 1 px borders instead of shadows. No drop shadows except the focus ring and the palette overlay.

**Imagery**

- Project frames are 3:2 or 4:5 real product screenshots with a 1 px keyline. Each featured project needs a 3:2 hero plus 3–6 detail shots. If an image is missing, render a typographic placeholder frame (title + frame number) — never stock imagery.
- Portrait: one high-quality photo that ‘develops’ in. No photo → a typographic monogram, never a stock avatar.

### 5. Motion system

- Durations 120 / 240 / 480 / 800 / 1200 ms. Easings: `out` cubic-bezier(0.16, 1, 0.3, 1); `inOut` cubic-bezier(0.65, 0, 0.35, 1); `snap` cubic-bezier(0.34, 1.56, 0.64, 1) for tiny hover moments only. Animate transform, opacity, small-area filter and variable-font axes — never layout properties.
- Smooth scroll: Lenis (lerp about 0.1) synced to GSAP’s ticker; native scroll on touch; never interferes with keyboard scrolling, find-in-page, anchor links or text selection.
- `<Develop>` primitive: blur 12px → 0, brightness .2 → 1, contrast 1.4 → 1, opacity 0 → 1, 900 ms `out`, fired once at 15% visibility. Use it on images, the portrait and the hero name only. Body text uses a plain masked line reveal (600 ms, 50 ms stagger). Nothing else animates in by default.
- Page transitions (450–600 ms): the outgoing page dims like an exposure dropping, the shared element (project frame) morphs to its destination, the incoming page develops. Use the View Transitions API with feature detection and a 200 ms crossfade fallback. Back/forward restores scroll and never replays intros.
- Loupe cursor: only under `(hover: hover) and (pointer: fine)` and only over project frames. A 96 → 120 px ring with a magnified crop of the hi-res image inside, driven by one rAF loop (`gsap.quickTo`). It never hides the system cursor over text, prose links or inputs.
- Magnetic buttons: max 8 px pull, keyboard parity, off under reduced motion.
- Choreography: at most 2 things animating at once per viewport. Every pinned section is ≤ 3 viewport heights and degrades to a normal stack on mobile.
- Reduced motion (`prefers-reduced-motion: reduce`) and Save-Data: no pinning, scrubbing, parallax or Lenis; reveals become 150 ms opacity fades; grain static; intro skipped.

### 6. Components

Wordmark · NavLink (underline slide) · AvailabilityPill (dot pulses slowly; static under reduced motion) · Button (primary = safelight fill; secondary = outline; magnetic) · FrameCard (contact-sheet tile: image, frame number, title, year, role) · StatTile · DecisionCard · StackMatrix · Timeline · CopyEmail (click copies, toast ‘Copied. Say hi.’) · CommandPalette (cmdk, focus-trapped) · ThemeToggle (iris wipe via View Transitions, clip-path from the toggle) · Toast · Footer · ProseMDX (callouts, Shiki code blocks with copy button, figures with captions, sticky TOC, sidenotes) · ProgressRail · Lightbox (focus-trapped).

### 7. Page specifications

#### 7.1 Home — `/`

Goal: in five seconds a visitor knows who you are, what you do for whom, one proof point, and how to reach you.

1. **Hero (100svh).** Name set huge in Archivo; each letter’s width axis reacts to pointer proximity (clamped, off on touch). Beneath it: the positioning sentence (≤ 22 words, from the Profile), two CTAs (primary: See selected work; secondary: Get in touch) and the availability pill. A portrait or hero frame develops in at the side. A proof strip sits on the bottom edge: three StatTiles with real numbers, each linking to its evidence. A faint safelight glow sits behind the name. The intro ‘develop’ lasts ≤ 1.4 s, plays once per session, any key or click skips it, and the LCP element is in the DOM from first paint — the animation is an overlay, never a gate.
2. **Selected work (pinned on desktop).** The contact-sheet camera (section 14, M3): all featured frames sit on one sheet and scrolling moves a camera from frame to frame; each stop shows the title, one-line outcome, role, year, one stat and an Open case study link. A vertical counter (▷ 01 / 04) and a hairline progress rail track position. Mobile and reduced motion: stacked cards, no pinning. Every frame is keyboard-reachable, focusing a frame moves the camera, and the pin never traps focus.
3. **Work with me.** Three or four ways to engage (for example: build an MVP, add AI/agent features, ongoing engineering, a full-time role). Each has a ‘good fit if…’ line, a typical duration, and a link to the matching case study. This replaces generic skill cards.
4. **Stack matrix.** No logo wall, no marquee. Tools grouped by confidence — Daily · Weekly · Can ramp up. Hover or focus on a tool highlights the projects that used it, and the reverse.
5. **Writing.** Latest two posts as large typographic rows (title, date, reading time, one-line hook). Hide the section if there are no posts.
6. **Trust (optional).** Testimonials or client marks only if real. The module hides itself when empty.
7. **Closing CTA.** A giant line (editable; default: Let’s develop something.), click-to-copy email, calendar link, stated reply time. Footer below.

#### 7.2 Projects — `/projects`

Goal: a busy reviewer finds the right project in under ten seconds, and browsing itself feels good.

- Header: title, project count, one-line intro, filters derived from data (All · Product · Client · Open source · Experiments) and a view toggle (Contact sheet · List).
- Contact sheet: 12-column, mixed spans like a real sheet (feature frames span 6, the rest 3 or 4). Each frame shows image, frame number, title, year, role. Hover/focus brings up the loupe with a magnified detail crop, and the title’s width axis opens slightly. Filtering reflows frames with GSAP Flip — they move, they don’t blink.
- List view: dense rows (year, title, role, stack chips, outcome) with a floating preview image on hover; sortable by year.
- Click: shared-element transition from frame to case-study hero (section 14, M6). Each frame also has a Mark button that circles it in red grease pencil and adds it to Picks (M5).
- Zero results: friendly message plus a reset button.
- Mobile: single-column sheet, stacked list rows, no loupe.

#### 7.3 Case study — `/projects/[slug]` (the page that wins interviews)

In order:

1. **Hero:** title, one-sentence outcome, meta (role · timeline · team · stack), links (Live, Repo, Docs). The hero frame develops in.
2. **The 10-second version:** three tiles — Problem · Approach · Result, with one real metric.
3. **Context and constraints:** who it was for and what made it hard (time, budget, scale, compliance). ≤ 120 words.
4. **Develop → Stop → Fix:** three chapters. *Develop* — what was built, with an interactive SVG architecture diagram (hoverable nodes). *Stop* — how it was tested and broken: load, edge cases, failures, what went wrong. *Fix* — what shipped, what it measured, what changed afterwards.
5. **Decision log:** three or four DecisionCards (decision · options considered · chosen · why · trade-off). This is the senior-engineer signal; hiring is shifting from ‘can you build it’ to ‘why is it like this’.
6. **Screens:** a scrubbed horizontal gallery with captions (pinned on desktop, swipe on mobile); click opens a focus-trapped lightbox.
7. **Results:** metrics, each with a source; a testimonial only if real.
8. **What I’d change next:** two or three honest bullets.
9. **Next project:** a large link, with the next frame developing in.

Sticky left rail at ≥ 1280 px: chapter index with scroll-spy (becomes a top progress bar on mobile). Small projects use a short variant: hero + 10-second version + stack + links.

#### 7.4 Experience — `/experience`

- Header with totals (roles, years) computed from data, and a ‘Currently’ summary.
- Vertical timeline: each role = company, title, period, location/mode, a two-sentence story, two or three outcomes, linked projects. Sticky role headings; the active role’s mark develops in. Older roles collapse.
- Education and certifications as a compact strip.

#### 7.5 About — `/about`

A real first-person page: portrait, three short paragraphs (what drives you, how you work, life outside the editor), a five-item ‘How I work’ list, a small Uses/Setup section, and a dated ‘Currently’ (building, reading, learning). Personality is allowed here — this is where the site’s one joke lives.

#### 7.6 Résumé — `/resume`

- Semantic HTML rendered from the same structured data as /experience — no iframe, no Drive embed. Indexable, accessible, ATS-friendly.
- Sticky actions: Download PDF · Print · Copy link. A print stylesheet gives a clean one-page A4/Letter; the PDF is generated at build from the same data. Show a ‘Last updated’ date from the data.

#### 7.7 Writing — `/writing` and `/writing/[slug]`

- Index: the latest post as a large cover row, the rest as a typographic list (number, title, date, reading time, topic). Topic filter. RSS link.
- Post: single column at 66–70ch, 19–20 px. Sticky TOC with scroll-spy at ≥ 1280 px (collapsible on mobile), a reading-progress hairline in the header, footnotes as sidenotes at ≥ 1280 px, Shiki code blocks with copy buttons and filename labels, callouts, captioned figures, pull quotes, ‘Last updated’, copy-link on headings, next/previous, print-friendly. End with a soft CTA (RSS or contact).

#### 7.8 Contact — `/contact`

Goal: more good enquiries, fewer vague ones.

- Left: big statement, click-to-copy email, calendar link, reply-time promise, availability. Right: the form.
- Form fields: name, email, What are you looking for? (chips: Build a product · AI/agent work · Join a team · Just saying hi), optional budget range and timeline, and a message with a helper placeholder (what, for whom, by when). Inline validation, accessible error messages, loading/success/failure states, no page reload. If the visitor marked Picks (section 14, M5), pre-fill the message with their project names and pre-select the matching chip.
- Success state: the form ‘develops’ into a confirmation that says what happens next.
- Spam and delivery: honeypot + Cloudflare Turnstile + server-side rate limiting; send via a mail API (for example Resend); if the API fails, show the direct email link prominently.

#### 7.9 Global: header, footer, ⌘K, 404

- Header: wordmark (left), five links, availability pill, ⌘K hint, theme toggle. Hides on scroll-down, returns on scroll-up. Mobile: full-screen menu with large type, staggered, focus-trapped.
- ⌘K palette (also `/`): pages, projects, posts; actions (copy email, toggle theme, download résumé, open GitHub/LinkedIn, book a call); fuzzy search over a content index generated at build.
- Footer: sitemap, socials, back-to-top, a one-line colophon linking /colophon. No giant empty footer.
- 404: ‘Frame not found — this link was overexposed.’ with a search box and three suggested pages.

### 8. Voice and copy

- Outcome-first, specific, plain. Verbs over adjectives. Numbers over claims. Hero sentences ≤ 22 words.
- Banned words: passionate, crafting, seamless, cutting-edge, innovative, leverage, synergy, world-class, ‘not your average’, quick learner, tech enthusiast, ninja, rockstar, digital experiences.
- Hero formula: what you build + for whom + proof. Scaffold (do not reuse literally): I build \_\_\_ for \_\_\_. \_\_\_ in production.
- One wry line per page at most, never at the cost of clarity.
- Microcopy: buttons start with verbs; empty states are friendly; the copy-email toast is ‘Copied. Say hi.’
- Every image has meaningful alt text; link text is never ‘click here’.

### 9. Content model

- `content/projects/<slug>.mdx`, frontmatter: title, slug, year, role, type (product | client | oss | experiment), status, summary, outcome, metrics\[{label, value, source}\], stack\[\], links{live, repo, docs}, cover, gallery\[{src, alt, caption}\], featured, order, decisions\[{title, options\[\], chosen, why, tradeoff}\].
- `content/posts/<slug>.mdx`: title, slug, date, updated, topic, summary, cover, draft (reading time is computed).
- `content/profile.json` and `content/experience.json` feed Home, About, Experience and Résumé from a single source.
- Validate with Zod at build. `npm run check:content` fails the build on: any `TODO(content)`, metrics without a `source`, images without `alt`, a missing OG image, broken internal links, stack names missing from the tool index.

### 10. Engineering, performance, accessibility, SEO

- **Stack:** detect first; keep the existing framework unless the plan proves a migration pays off. Default target: Next.js (App Router, latest stable) · TypeScript strict · Tailwind v4 driven by the CSS-variable tokens · MDX content · GSAP (ScrollTrigger, SplitText, Flip — now free) + Lenis · cmdk · Zod. Optional: OGL or Three.js for one lazy hero effect.
- **Budgets (hard gates)** — mobile, Slow 4G, mid-tier Android profile: Lighthouse Performance ≥ 95 and Accessibility, Best Practices and SEO all 100 on every route; LCP ≤ 2.0 s; INP ≤ 200 ms; CLS ≤ 0.05; initial JS ≤ 170 KB gzip on `/`; total transfer on `/` ≤ 900 KB and ≤ 40 requests; scroll interactions hold about 60 fps under 4× CPU throttle.
- **Images:** AVIF/WebP, correct `sizes`, blur placeholders, hero eager and the rest lazy, zero layout shift.
- **WebGL (only if used):** lazy-loaded after LCP, paused off-screen, DPR capped at 1.5, disabled for reduced motion, Save-Data or low-end devices, with a static fallback.
- **Accessibility — WCAG 2.2 AA:** landmarks, skip link, visible focus (2 px safelight ring, 2 px offset), focus traps in dialogs, 44 px touch targets (24 px absolute floor), a reduced-motion path for every effect, no meaning carried by motion or colour alone, and smooth scroll that never breaks keyboard scrolling, find-in-page or anchors. Run axe plus a manual keyboard pass on every page.
- **SEO and sharing:** unique title and description per route, canonical URLs, sitemap, robots, RSS, JSON-LD (Person, CreativeWork, BlogPosting), dynamic OG images in the brand style (`next/og`), 301s from every legacy URL.
- **Privacy and security:** privacy-friendly analytics only (no cookie banner needed); server-side validation, rate limiting, secrets in env, security headers (CSP, Referrer-Policy, X-Content-Type-Options).

### 11. Do-not-copy list

This brief was informed by a well-known reference portfolio (harshilmistry.com). The goal is to beat it, not resemble it. Do not reproduce:

- a multi-theme ‘vibe’ switcher or any skins;
- bracketed section markers such as ( About — 01 ), ‘Vol. 2026’ editions, or ‘Fig. 01’ captions;
- the cream-and-serif editorial look, the Japandi ramen illustration, the neo-brutalist sticker style, Swiss red-circle posters, or the view-source stats bar;
- a rotating circular text badge, or an infinite marquee of tech names separated by stars;
- a live clock or latitude/longitude strip;
- a five-card ‘superpowers’ section;
- a résumé page that is a Google Drive iframe, or any third-party embed carrying core content.

Also observed in the full recording — do not reproduce these either:

- a custom cursor that turns into a ‘View’ label over projects, and a project list whose rows reveal a tilted preview card that follows the pointer;
- an About paragraph whose words brighten one by one on scroll;
- a pinned horizontal Stack of full-screen panels with giant ghost numerals and alternating dark and light backgrounds;
- sticker, tape, stamp and confetti toys (‘fling the sticker’, ‘click to stamp’), hanging-menu cards, arch-shaped project frames;
- a five-poster pinned sequence, a column/row cursor read-out, a grid-toggle key, a type field that scatters away from the cursor, stepped geometric wipes;
- a live page-stats bar, a view-source toggle, caution-tape marquees;
- a grey ‘channel change’ curtain with a small label between looks;
- an oversized footer wordmark with a live clock.

Generic patterns (navigation, grids, filters, case studies) are fine; their visual and verbal treatment must be original.

### 12. Definition of done — all true

1. Five-second test: a stranger can say who you are, what you do, one proof, and how to contact you.
2. Static test: freeze all motion; every page still looks designed.
3. Squint test: one focal point per viewport.
4. Throttle test: budgets pass on a 4× CPU, Slow 4G profile.
5. Keyboard-only test: every feature reachable, focus always visible.
6. Reduced-motion test: nothing is lost, nothing jars.
7. 375 px test: no horizontal scroll, no cramped tap targets.
8. Content-honesty test: `check:content` passes; nothing invented.
9. Tokens only: no stray hex, px or easing values in components.
10. Each page has one screenshot-worthy moment, and none has more than three competing animations.
11. Every legacy URL redirects correctly.
12. Final walkthrough artifact: screenshots (4 widths × 2 themes), Lighthouse before/after, and a list of every deviation from this brief.

Also required: every signature moment in section 14 matches its choreography sheet (trigger, timeline, easing, reduced-motion and mobile behaviour, performance note), the seven bars in section 13 are met, and the CI gates in section 19 are green.

### 13. What the full recording revealed (the benchmark to beat)

The recording (2:26, home page only, all five skins) shows a site that wins on delight density and loses on coherence and conversion. Darkroom has to beat it on both.

**What it does well**

- Home order (Editorial skin): hero → tech marquee → an About paragraph that lights up word by word on scroll → a pinned horizontal Stack (five full-screen panels, ghost numerals, alternating dark and light) → a project list with a tilted preview card that follows the cursor → five capability cards → contact call-to-action → footer with an oversized wordmark and a live clock.
- Each skin has its own layout, not just its own colours: a sticker-and-tape collage with confetti and a ‘fling the sticker’ toy; a Japandi hanging-menu layout with a click-to-stamp toy; a five-poster pinned Swiss sequence with a column/row cursor read-out, a grid-toggle key and a type field that scatters away from the cursor; a brutalist page with live DOM, weight and request stats and a view-source toggle.
- Detail work: a custom cursor that becomes a ‘View’ label over projects, letter-by-letter reveals, stepped geometric wipes, per-skin entrance choreography.

**Where it loses (all visible in the recording)**

- The floating ‘Vibe’ pill sits on top of content in nearly every frame, including hero copy and project cards.
- Switching skins puts up a neutral grey curtain with a tiny label: it fades in, holds for roughly 0.8–1.2 s, then the new skin staggers in over about 0.5 s. A second of nothing reads as loading, not delight.
- Five skins, one identical hero sentence, no proof above the fold: the strongest claim (answers in under 700 ms) sits further down the page.
- The pinned horizontal Stack took about six seconds of continuous scrolling to show a tool list a reader could scan in two.
- Nothing helps a visitor shortlist or compare projects, and tools are shown as inventory rather than as evidence tied to the work that used them.
- Most of the cleverest interactions serve the site itself (skin switching, toys), not the visitor’s decision.

**Bars Darkroom must clear**

1. Proof and a contact action are visible without scrolling at 1280×631 (the viewport in the reference’s own screenshot) and at 1918×944 (the recording).
2. No neutral holding screen longer than 250 ms anywhere; transitions always show the destination.
3. No persistent overlay on content. The only fixed UI is the header; the Picks tray appears only when it has items and can be dismissed.
4. Every pinned or scrubbed scene is ≤ 3 viewport heights, has a visible skip, and has a stacked fallback.
5. At least half of the signature moments help a visitor decide or reach out (Picks, loupe, decision log, contact prefill). Pure toys are capped at two site-wide.
6. Tools are shown as evidence: each links to the projects that used it.
7. Hover and focus feedback in under 100 ms; 60 fps at 4× CPU throttle.

### 14. Signature moments (choreography sheets)

These twelve moments are the only places pinning, camera moves, cursor effects and page transitions are allowed. Each must ship exactly as written: trigger, timeline, easing, reduced-motion behaviour, mobile behaviour, performance note. Build and tune each one in `/dev/moments` before wiring it into a page. A new effect must be added to this section first.

**M1 · Develop intro** — first visit per session, on Home.

- Timeline: 0–150 ms grain and a black veil at 100% (the real page is already painted underneath); 150–950 ms the veil opens with a radial `clip-path` from the centre of the name while `filter` settles from brightness .25 / contrast 1.5 to 1; in parallel the name’s `wdth` axis eases 62 → 125 with a 22 ms per-letter stagger; 950–1400 ms the CTAs and availability pill rise 24 px and fade in. Easing `out`.
- Skip: any key, click, scroll or touch ends it instantly.
- Reduced motion: no intro. Mobile: same, without the per-letter stagger.
- Performance: one fixed veil layer; the LCP element is the real hero text, painted on the first frame.

**M2 · Name response and exit** — Home hero.

- Pointer proximity (fine pointers only): within 240 px of the pointer each letter’s `wdth` moves toward 125 (far letters rest at 100), driven by `gsap.quickTo` at 0.35 s.
- Scroll exit (first 100vh, scrubbed): `wdth` 125 → 62, opacity 1 → .2, `yPercent` 0 → −8, like a stop bath dimming the print. The proof strip stays.
- Touch and reduced motion: static name, plain fade on scroll.

**M3 · Contact-sheet camera** — Home, selected work (replaces any plain pinned slider).

- Layout: all featured frames sit on one contact sheet (3 columns, 8 px gaps, N = 3–5 frames; a fifth empty cell reads ‘Frame 06 — unexposed’). The sheet starts scaled to fit the viewport at 90%.
- Pin length: `min(300vh, N × 70vh)`. One `ScrollTrigger` timeline with a label per frame and `snap: 'labels'`, `scrub: 0.6`.
- Each step: the sheet tweens `x`, `y`, `scale` until frame i fills about 72% of the viewport width (900 ms, `inOut`); the caption (title, one-line outcome, role, year, one stat, Open case study link) rises 24 px over 450 ms starting 55% through the move; other frames dim to 25%. Between steps the camera pulls back to scale .55 over 500 ms so the whole sheet is visible again.
- Keyboard: every frame is a link; focusing one moves the camera there via `tl.scrollTrigger.labelToScroll('f'+i)`; Tab leaves the section normally; a ‘Skip to Writing’ link appears on focus.
- Mobile (< 1024 px), reduced motion, Save-Data or `deviceMemory` < 4: no pin; a vertical list of frames with captions.
- Performance: one transformed layer (`will-change` only while animating); sheet thumbnails ≤ 480 px wide; the hi-res image decodes only when its frame is within one step of the camera; initial image bytes in this section ≤ 350 KB.

**M4 · Loupe** — Projects index and the Home camera.

- Fine pointers only. A 140 px lens magnifies the hi-res image 2.2× and follows the pointer (`quickTo`, 0.18 s) with a 2 px ring in the text colour. Hi-res loads after an 80 ms hover-intent delay. The system cursor is hidden only over the frame itself; the lens is decorative and `aria-hidden`.
- Touch: no lens; tap navigates. Reduced motion: lens follows without easing.
- Performance: one rAF loop; the lens reuses the decoded bitmap.

**M5 · Picks (grease-pencil marks)** — every FrameCard.

- Each frame has a Mark button (24 px circle, bottom right, `aria-pressed`, label ‘Mark \<project> as a pick’). Pressing it draws a hand-drawn red ellipse around the frame (SVG path, two irregular variants, `stroke-dashoffset` over 420 ms `out`, 3 px `--safelight`, round caps, ±2° rotation); the button fills.
- A Picks chip appears in the header (count 1–5) and opens a tray (focus-trapped dialog; bottom sheet on mobile) listing picks with remove buttons and one action: Talk about these → `/contact?picks=a,b`. The contact form pre-fills its message.
- Persist in `sessionStorage` only (no cookies, no PII). Maximum 5; a sixth press shakes the chip and shows a toast.
- Reduced motion: marks appear instantly.
- Why it exists: it lets a busy reviewer shortlist work and carry it straight into a conversation — a feature that serves the visitor’s decision.

**M6 · Shared-element transition** — frame → case-study hero.

- 560 ms. `view-transition-name: frame-<slug>` on the image. The old page dims to 35% brightness over 240 ms; the image morphs (`inOut`); the title’s `wdth` goes 62 → 100 over 480 ms; incoming sections develop on arrival.
- Prefetch on hover or focus after 100 ms intent. Navigation is never delayed more than 100 ms beyond network time; no neutral holding screen. Fallback: 200 ms crossfade. Back reverses the morph if the frame is on screen, otherwise crossfades.

**M7 · Chapter stamps** — case studies.

- On entering each chapter (Develop, Stop, Fix) the label types on in Geist Mono at 30 ms per character (`▷ 04A · DEVELOP`) while the chapter’s first image develops; the rail marker updates. Reduced motion: instant.

**M8 · Iris theme toggle** — header.

- A circular `clip-path` wipe from the toggle’s centre, 600 ms `out`, via the View Transitions API (code in section 18). Unsupported or reduced motion: instant swap.

**M9 · Contact success**

- Fields fade to 0 over 240 ms, the container height animates to the confirmation (FLIP), and the confirmation text develops (blur 8 → 0, 600 ms). On failure: inline error, focus moves to the first invalid field, nothing is cleared.

**M10 · 404 and empty states**

- The 404 is a contact sheet with one blank frame circled by a grease-pencil X and the line ‘Frame not found.’ Empty filters reuse the blank frame.

**M11 · Console hello**

- `console.info` with a small ASCII banner, one line on who you are and what you are open to, and your email. No tracking.

**M12 · Keyboard layer**

- `?` opens a shortcuts sheet: `⌘K` palette, `/` search, `g h` · `g p` · `g w` · `g c` to go Home, Projects, Writing, Contact, `j` / `k` previous and next frame or post, `t` theme, `m` mark the focused frame. Single-key shortcuts need an off switch in the sheet (WCAG 2.1.4), never fire while typing, and are listed in the palette footer.

### 15. Visitors, journeys, conversion and analytics

Design for three visitors and measure whether each reaches a decision.

- **Recruiter or hiring manager** (about 90 seconds): needs role fit, proof, seniority signals, résumé, contact. Path: Home hero proof → selected work → one case study’s 10-second version → Résumé → Contact. Success: opens the résumé or contact within two minutes.
- **Founder or client** (3–5 minutes): needs to know whether you can ship their thing, how you work, how fast you reply. Path: Home → Work with me → case-study Results → Contact form. Success: form submitted or call booked.
- **Peer engineer** (long read): needs depth and honesty. Path: Writing → case-study Decision log → repo. Success: reads 60% of a post or follows a repo link.

Rules that follow from the journeys:

- Every page ends with one next action. The header has one persistent action, Contact, which never changes label.
- Navigation labels are unambiguous. The reference splits ‘Projects’ and ‘Work’, which visitors confuse; here Projects = things built, Experience = jobs held.
- The first screen of every page answers ‘where am I and what can I do here’ within three seconds.

Analytics — privacy-friendly, no PII, off when Do Not Track is set, one typed `track()` wrapper: `cta_contact_click{location}` · `email_copied` · `resume_open` · `resume_download` · `project_open{slug, from}` · `pick_add{slug}` · `picks_send{count}` · `case_study_depth{slug, 25|50|75|100}` · `palette_open` · `palette_action{id}` · `form_start` · `form_submit{ok}` · `theme_toggle` · `outbound_click{host}`.

Review ritual: for four weeks after launch, check weekly the top entry pages, the share of visits that reach Contact, form completion, and which projects get picked. Adjust the hero proof and the project order from that data.

### 16. Mobile and touch

- Design phone-first at 390×844. Verify 360×740, 430×932, landscape 844×390, tablets at 768 and 1024, and desktops at 1280×631, 1440×900 and 1918×944.
- Header: wordmark, Picks chip (when non-empty), Menu, Contact. The menu is a full-screen sheet with 56 px rows and a thumb-reachable close button. The Picks tray is a bottom sheet (drag handle, ≤ 70svh).
- Hero: `100svh` with safe-area insets; the name fits on two lines at 390 px (tune the clamp until the longest word never overflows); the proof strip becomes a horizontal snap row of three tiles.
- Hover equivalents: loupe → tap navigates; hover previews → an always-visible one-line outcome; tooltips → visible text.
- Targets 44×44 px with at least 8 px between them; no gesture-only actions; no pinned scenes below 1024 px; videos autoplay muted and inline only while in view, and never on Save-Data.
- Test on iOS Safari (dynamic toolbar, `svh`, overscroll), Chrome on a mid-tier Android, Firefox and Samsung Internet.

### 17. Worksheets: case-study interview and asset capture

**Case-study interview** — answer in bullets for your two strongest projects; the agent turns them into Develop → Stop → Fix, decision cards and metrics.

1. Who was it for, and what was broken or missing before?
2. What was the deadline, budget or scale constraint?
3. What did you build, in one paragraph a non-engineer would follow?
4. What is the architecture in five boxes? List the boxes and the arrows.
5. Name the three hardest decisions. For each: options considered, what you chose, why, what it cost.
6. What broke, in testing or in production, and how did you find it?
7. Which numbers moved — latency, cost, conversion, time saved? How were they measured, and where can a reader verify them?
8. What did you cut, and why?
9. What would you change if you rebuilt it today?
10. Who else worked on it, and what exactly was your part?
11. What is still unfinished or fragile?
12. One sentence someone said about it (only if real, with their permission).

**Asset capture**

- Screenshots at 2× from a clean browser profile (no bookmarks bar, no extensions), cropped 3:2 at 2400×1600, same OS theme. Apply one shared tone curve (a small contrast lift, slightly warm shadows) so every frame reads as one print series. Export AVIF and WebP plus a 1200 px fallback.
- One silent 6–8 s screen recording per featured project (1280×800, 24 fps, ≤ 1.5 MB WebM and MP4, looping) for the loupe preview and the case-study hero. Alt text describes what the screen shows, never the file name.
- Portrait: natural light, shoulder-up, plain background, eye level; deliver 4:5 and 1:1 crops, plus one duotone-ready version for dark mode.
- Keep originals in `/assets-src`, outside the build (git-lfs or storage).

### 18. Starter code

Copy these into the repo and let the agent adapt names, paths and imports to the chosen stack. They encode the tokens and motion rules so every later prompt builds on the same primitives.

**styles/tokens.css**

```css
:root {
  /* type: tune --step-hero so the longest word of the name fits at 390 px */
  --font-display: 'Archivo', system-ui, sans-serif;
  --font-text: 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
  --step-hero: clamp(4.5rem, 2rem + 14vw, 17rem);
  --step-h1: clamp(3rem, 1.5rem + 6vw, 7rem);
  --step-h2: clamp(2rem, 1.2rem + 3vw, 3.5rem);
  --step-body: clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem);
  --step-meta: 0.72rem;

  /* space: 4 px base */
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px; --s-5: 24px; --s-6: 32px;
  --s-7: 48px; --s-8: 72px; --s-9: 112px; --s-10: 168px; --s-11: 240px;
  --gutter: clamp(16px, 2vw, 24px);
  --margin: clamp(20px, 4vw, 64px);
  --radius-ui: 2px;

  /* motion */
  --d-1: 120ms; --d-2: 240ms; --d-3: 480ms; --d-4: 800ms; --d-5: 1200ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-snap: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* layers */
  --z-header: 50; --z-tray: 60; --z-palette: 70; --z-veil: 80; --z-toast: 90;
}

/* Darkroom (default) */
:root, [data-theme='dark'] {
  --bg: #0A0908; --surface: #14110F; --surface-2: #1D1916;
  --line: rgb(237 232 223 / 0.12);
  --text: #EDE8DF; --text-dim: #A39B8F;
  --safelight: #FF5B2E; --on-safelight: #0A0908;
}

/* Lightbox */
[data-theme='light'] {
  --bg: #F1EDE4; --surface: #FAF8F3; --surface-2: #E8E2D6;
  --line: rgb(20 17 15 / 0.14);
  --text: #14110F; --text-dim: #5E574E;
  --safelight: #C22E09; --on-safelight: #FAF8F3;
}

/* Develop primitive: visible without JS, pre-hidden only when JS is present */
html.js [data-develop]:not([data-developed]) { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  html.js [data-develop]:not([data-developed]) { opacity: 1; }
}

/* Theme iris (View Transitions) */
::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
::view-transition-old(root) { z-index: 1; }
::view-transition-new(root) { z-index: 2; }
```

**Inline script in the document head, before first paint**

```html
<script>
  (function () {
    var d = document.documentElement;
    d.classList.add('js');
    var t = null;
    try { t = localStorage.getItem('theme'); } catch (e) {}
    if (!t) t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    d.setAttribute('data-theme', t);
  })();
</script>
```

**lib/motion.ts**

```ts
export const D = { xs: 0.12, sm: 0.24, md: 0.48, lg: 0.8, xl: 1.2 } as const; // seconds
export const EASE = { out: 'expo.out', inOut: 'power3.inOut', snap: 'back.out(1.6)' } as const;

interface NavigatorHints extends Navigator {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
}

export const reduced = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const saveData = (): boolean =>
  typeof navigator !== 'undefined' && (navigator as NavigatorHints).connection?.saveData === true;

/** Pinned and camera scenes run only when every condition holds. */
export const canPin = (): boolean =>
  typeof window !== 'undefined' &&
  !reduced() &&
  !saveData() &&
  window.matchMedia('(min-width: 1024px)').matches &&
  ((navigator as NavigatorHints).deviceMemory ?? 8) >= 4;
```

**components/SmoothScroll.tsx**

```tsx
'use client';
import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduced } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
```

**components/Develop.tsx**

```tsx
'use client';
import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { D, EASE, reduced } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Never wrap the LCP element. Content stays visible without JS. */
export function Develop({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const done = () => el.setAttribute('data-developed', '');
      if (reduced()) return done();
      gsap.fromTo(
        el,
        { opacity: 0, filter: 'blur(12px) brightness(0.2) contrast(1.4)' },
        {
          opacity: 1,
          filter: 'blur(0px) brightness(1) contrast(1)',
          duration: D.lg + 0.1,
          ease: EASE.out,
          onStart: done,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} data-develop className={className}>
      {children}
    </div>
  );
}
```

**lib/theme.ts** — `apply` must change the DOM synchronously (set `data-theme` and persist), then sync React state.

```ts
import { reduced } from '@/lib/motion';

type Theme = 'dark' | 'light';

export async function setThemeWithIris(next: Theme, origin: HTMLElement, apply: (t: Theme) => void) {
  if (!document.startViewTransition || reduced()) return apply(next);
  const { left, top, width, height } = origin.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const transition = document.startViewTransition(() => apply(next));
  await transition.ready;
  document.documentElement.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
    { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
  );
}
```

### 19. CI gates

- On every pull request, in this order: install → typecheck → lint → `check:content` → `check:contrast` → build → Playwright → axe → Lighthouse CI against the preview deployment. Merges are blocked on red.
- Playwright screenshots at 375, 768, 1280 and 1728 px × light and dark for `/`, `/projects`, one case study, `/writing` and `/contact`; fail on more than 0.2% pixel difference once a baseline is approved. Run with reduced motion on for determinism, plus one smoke run with it off.
- `@axe-core/playwright` on every route: zero serious or critical violations.
- Lighthouse CI, mobile defaults, three runs per URL. If a gate is genuinely infeasible, the agent proposes the change and waits for approval; it never loosens a budget silently.

```js
// lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: ['http://localhost:3000/', 'http://localhost:3000/projects', 'http://localhost:3000/contact'],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'total-byte-weight': ['error', { maxNumericValue: 900000 }],
      },
    },
  },
};
```

END OF BRIEF

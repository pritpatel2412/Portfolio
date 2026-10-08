# AGENTS.md — standing rules for every agent in this repo

## Mission
Rebuild this portfolio into an award-calibre site. The single source of truth for design is /DESIGN_BRIEF.md. Read it fully before planning or editing anything UI-related.

## Non-negotiables
1. Content integrity: never invent projects, metrics, clients, quotes, dates or links. Use only what exists in this repo or in section 0 of DESIGN_BRIEF.md. Missing facts become `TODO(content): ...` entries, never lorem ipsum, never made-up numbers.
2. Originality: the result must not resemble harshilmistry.com or any single existing site. Obey the Do-not-copy list (brief section 11).
3. One art direction. No theme switchers, no skins. Light/dark is the only theming.
4. The performance and accessibility budgets (brief section 10) and the CI gates (section 19) are hard gates, not goals.
5. Motion: transform/opacity/filter/variable-font axes only; honour prefers-reduced-motion; never block content or input; never hide content behind an animation.
6. Signature moments: only the twelve moments in brief section 14 may pin a scene, move a camera, replace the cursor or run page transitions. A new effect must be written into section 14 first (trigger, timeline, easing, reduced-motion, mobile, performance) and approved by me.
7. Primary actions (email, contact form, résumé, Contact link) must stay readable and operable at all times. No effect may delay, move or cover them.
8. No persistent overlay on content. The only fixed UI is the header, plus the Picks tray while it has items.

## Workflow
- Work on branch `redesign/darkroom`. Small commits, conventional messages.
- Use Planning mode for any task touching more than 3 files. Produce an implementation plan and wait for my approval before executing.
- Build and tune every signature moment in /dev/moments before wiring it into a page. Record a short clip of each in the walkthrough artifact.
- After every task, verify with the browser agent at 375, 768, 1280 and 1728 px, in light and dark, with reduced motion on and off. Attach screenshots to the walkthrough artifact.
- Before declaring done: typecheck, lint, build, `npm run check:content`, `npm run check:contrast`, and the CI gates.
- Ask before adding any dependency that is paid, over 30 KB gzipped, or unmaintained.
- If the brief and the code conflict, stop and ask. Do not silently choose.

## Code style
- TypeScript strict, no `any`. Server components by default; client components only for interaction.
- Design tokens only (CSS variables). No raw hex, ad-hoc px spacing or one-off easings inside components.
- Every interactive element: visible focus state, 44 px touch target, full keyboard operation.
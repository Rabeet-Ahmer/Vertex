# Vertex Home Page — Implement from design/vertex-home.png

## Goal
Replace the current design-system demo page (`app/page.tsx`) with the Vertex home page shown in `design/vertex-home.png`. Keep the design-system content available separately or remove it; the user explicitly asked for the home page.

## Design reference
`design/vertex-home.png` shows:
- Header: Vertex wordmark + nav links (Courses, My Learning) + notification/user icons + "Get Started" CTA button
- Hero: "INTELLIGENT LEARNING" pill label, "Search your learning in plain English." (large Playfair Display heading), subtitle, "Explore Courses" orange button with arrow
- Search input bar with magnifying glass icon, placeholder "Ask anything about your learning...", ⌘ K shortcut hint
- "All Courses" section with 3 course cards (Next.js for Production, Docker Essentials, TypeScript Deep Dive) — each with cover/icon, title, description, meta row (level, duration, module count)
- "View all courses" link
- Bottom banner: star icon + "New courses and lessons added every week." + decorative gradient blocks

## Skills inspected
- AGENTS.md (loop, no overbuild, server/client boundary, never invent data)
- `node_modules/next/dist/docs/01-app/index.md` (App Router, Server Components)
- `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `package.json`

## Decisions / assumptions
- This is presentational only (no backend data writes); no auth gate needed for browsing per AGENTS.md.
- Course cards use placeholder data matching the design exactly (names, descriptions, meta from image).
- Search bar is presentational (no backend search on this page; search page will be separate per AGENTS.md).
- We reuse existing Tailwind tokens and CSS variables (primary #E8672D, background #F5F5F0, display font Playfair, body Inter).
- Responsive: stack hero/search vertically on mobile; cards go 1-col; header collapses nav gracefully.
- Keep footer/navigation patterns already present in the design-system page if useful, but match the home design first.

## Files to touch
- `app/page.tsx` — replace with home page content
- `app/layout.tsx` — update metadata title/description for Vertex (optional but good)

## Requirements
- Reproduce desktop design exactly; make responsive down to mobile (stack, shrink typography, keep spacing ratios).
- Use existing component patterns (lucide-react icons, CSS vars, Tailwind utility classes).
- No invented data beyond what's in the image; cards carry exactly the 3 shown courses.

## Security considerations
- None for presentational page; no tokens exposed, no auth writes.

## Acceptance criteria
- Page loads at `/` showing the hero, search bar, 3 course cards, and bottom banner.
- Typography uses Playfair Display for headings; colors match design tokens.
- No build errors, type errors, or lint errors.

## Checks to run
- `npm run lint`
- `npm run build` (if routes/config changed — they didn't significantly, but safe)
- Visual check: open `/` and compare to `design/vertex-home.png`

## Manual test steps
1. Open `http://localhost:3000/`
2. Confirm header, hero text, search bar, 3 course cards, bottom banner visible
3. Resize browser to narrow width; confirm responsive stacking

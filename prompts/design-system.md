# Vertex design system — implement design mockup

Skills: AGENTS.md loop; next/dist/docs/ (read, heed deprecations).
Inspect: design/vertex-design-system.png (screenshot captured); app/globals.css, layout.tsx, page.tsx, package.json.
Design captured: logo "Vertex", primary #E8672D, neutrals (#0A0A0A, #F5F5F0, #FFFFFF), typography Playfair Display (headings) + Inter (body), spacing 4/8/12/16/24/32/40/48/64, radius 4/8/12/16/24/32, buttons (primary/secondary/ghost), badges, cards, navigation, icon set.
Decisions: apply tokens via CSS variables in globals.css; build a design-system demo page rendering tokens + components; reuse Tailwind; no mobile redesign needed (responsive stack); keep server/client boundary (no token in browser besides CSS vars).
Files: app/globals.css, app/layout.tsx, app/page.tsx (design-system demo); maybe components/ui/ if needed.
Requirements: match colors/spacing/typography exactly; buttons with states; cards with shadow; badges; nav with icon links.
Security: none (design only, no auth/data writes).
Checks: typecheck `npx tsc --noEmit`, lint `npm run lint`, build `npm run build`.
Manual: open /, compare to screenshot.

Extended details from screenshot:
- Header: Vertex logo (triangle + wordmark) + nav icons (search, bookmark, bell, user) + primary CTA button
- Hero section: "Design System" heading (Playfair Display ~48px), subtitle, version/date line
- Colors section: 10 swatches with hex labels (primary, secondary, neutral scale)
- Typography section: Playfair Display (Ag/Ag large display) and Inter (body/label) with weights and sizes (Hero 48, Display 32, Heading 1 24, Heading 2 20, Heading 3 16, Body 16/14, Small 12, Caption 11)
- Spacing scale: 4, 8, 12, 16, 24, 32, 40, 48, 64 with labels
- Radius & Shadows: 4/8/12/16/24/32; shadows 2/4/8/16
- Icons: outline icons (search, bookmark, bell, user, check, x, chevron, etc.) — use lucide-react if installed or inline SVG
- Buttons: primary (solid orange), secondary (outline orange), ghost (text only), sizes (SM, MD, LG), states (hover/focus/disabled)
- Badges/Tags: small rounded labels (primary, success, warning, error, neutral)
- Cards: image card with category tag, title, meta; content card with header + body
- Inputs: text field + dropdown + search with icon + checkbox + switch
- Status indicators: progress bars; status badges (In Progress, Completed, Locked)
- Navigation: breadcrumb + pagination + bottom nav with icon links
- Footer: logo + links + social icons

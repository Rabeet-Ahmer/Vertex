# Vertex — Sanity Content Model + Standalone Studio + Server Data Layer

## Goal

Replace the embedded Sanity scaffold with a standalone `studio/` workspace, model the full Vertex content schema (course, module, lesson, instructor, category, video, agent context, progress), and build the server-only read data layer (client, live, GROQ queries, TypeGen). Deliver in three phases, each verifiable on its own:

1. **Schema** — all document and object types in `studio/schemaTypes/`.
2. **Standalone Studio migration** — create `studio/`, delete the embedded Studio.
3. **Server data layer** — tokened client, live setup, typed GROQ queries, seed import.

Out of scope (later prompts): search API route, video ingestion pipeline, progress API routes, Clerk middleware, PostHog, page UI work.

## Skills read

- `AGENTS.md` — the loop, workspace split (§5), data shape (§8), search config (§10), pitfalls (§12), checks (§13)
- `sanity-best-practices/references/nextjs.md` — standalone Studio rationale, embedded→standalone migration steps, `defineLive` + tokens, `<SanityLive />` in layout
- `sanity-best-practices/references/project-structure.md` — `studio/` + web layout, kebab-case filenames, `schemaTypes/{documents,objects}` subfolders
- `sanity-best-practices/references/schema.md` — `defineType`/`defineField`/`defineArrayMember`, data-over-presentation
- `sanity-best-practices/references/typegen.md` — typegen config in `sanity.cli.ts`, generated `sanity.types.ts`, commit strategy
- `dial-your-context` + `create-agent-with-sanity-context` SKILL.mds — agent context doc shape (`sanity.agentContext`: `slug`, `instructions`, `groqFilter`)
- `node_modules/next/dist/docs/` — read before touching `app/layout.tsx` or deleting `app/studio/` (this Next.js version has breaking changes vs. training data)

## Code inspected

- Root is the web workspace: Next.js App Router at repo root, no `src/`, no workspace tooling (we keep it that way).
- `sanity.config.ts` (root) — embedded Studio config, `basePath: '/studio'`, `structureTool` + `visionTool`.
- `sanity.cli.ts` (root) — `api` only, reads `NEXT_PUBLIC_SANITY_*`.
- `sanity/env.ts` — `apiVersion`/`dataset`/`projectId` with `assertValue`.
- `sanity/lib/client.ts` — `createClient`, `useCdn: true`, **no token**.
- `sanity/lib/live.ts` — `defineLive({ client })`, **no tokens**.
- `sanity/structure.ts` — plain `documentTypeListItems()`.
- `sanity/schemaTypes/index.ts` — **empty** `types: []`.
- `app/studio/[[...tool]]/page.tsx` — embedded `<NextStudio />` route.
- `package.json` — next 16.3.4, sanity ^5.31.2, next-sanity ^13.3.4, @sanity/vision, @sanity/image-url, react 19.2.8, @clerk/nextjs ^7.9.2, lucide-react; scripts: `dev`/`build`/`start`/`lint` only.
- `.env.local` — Clerk vars + `NEXT_PUBLIC_SANITY_PROJECT_ID`/`NEXT_PUBLIC_SANITY_DATASET` present; **no `SANITY_API_READ_TOKEN`**; no `.env.example` exists.
- `app/page.tsx` — hardcoded mock content: lucide icons, levels "Beginner"/"Intermediate", durations "10h 12m", "9 modules" (all become derived or field-backed later; no UI changes in this prompt).

## Decisions (user-confirmed)

1. **One prompt, three phases** — schema, migration, data layer.
2. **Minimal layout** — the Next.js app stays at repo root (root = web workspace); the standalone Studio is a new `studio/` folder. No restructure into `web/`.
3. **Embedded Studio fully removed** — `app/studio/` route, root `sanity.config.ts`, root `sanity.cli.ts` all deleted. Two configs would drift.
4. **Progress in the same dataset** — own `progress` doc type, hidden from Studio structure, `_id = progress.<clerkUserId>`, written later only via server routes (routes are out of scope here).
5. **Seed content imported** — 2 courses, 6 lessons, 2 instructors, 3 categories, plus stub `video` docs and a stub agent context doc.
6. **Agent context: type now, content later** — define `sanity.agentContext`, import a stub doc; real instructions are authored later via `dial-your-context`.
7. **Outcome icons** — `learningOutcome.icon` is a `string` with a fixed `list` of lucide icon names; web maps name → component with a fallback.
8. **Level** — `course.level` is a `string` with `list`: `Beginner` / `Intermediate` / `Advanced`.
9. **Price** — a `number` only; `0`/empty renders as "Free" in UI. No `isFree` flag.
10. **Live tokens** — `serverToken` only; **no `browserToken`** (AGENTS.md forbids tokens in the browser). The client-side live socket degrades gracefully; pages still update via server fetch.
11. **Derived, never stored** — course total duration (sum of lesson durations), module/lesson numbers (from array order), module count. Lesson duration is stored in **seconds** (`durationSeconds`) for seek math.
12. **Generated types committed** — `sanity.types.ts` is committed to git (skill option A, small team); the intermediate `schema.json` is gitignored.
13. **Video provider stored** — `video.provider` is a `string` with `list`: `youtube` / `vimeo` / `bunny` (ingestion and playback are provider-specific).
14. **Structure hides internal types** — Studio structure shows Course, Lesson, Instructor, Category, Agent Context; `video` and `progress` are hidden (internal lookup / app state).
15. **Agent context content filter** — stub `groqFilter` scopes to the visible content types only: `_type in ["course", "lesson", "instructor", "category"]`. Video docs stay out of the MCP scope; the search route (later prompt) resolves timestamps against `video` docs with its own server-side client.

## Files to touch / create

**Phase 2 — new `studio/` workspace:**

- `studio/package.json` — deps: `sanity ^5.31.2`, `@sanity/vision ^5.31.2`, `react 19.2.8`, `react-dom 19.2.8`, `styled-components ^6.5.3`; devDeps: `typescript ^5`, `@types/react`, `@types/react-dom`. Scripts: `dev` (`sanity dev`), `build` (`sanity build`), `deploy` (`sanity deploy`), `typegen` (`sanity schemas extract --force && sanity typegen generate`).
- `studio/tsconfig.json`
- `studio/env.ts` — mirrors root `sanity/env.ts` (same assertValue pattern, same env var names).
- `studio/sanity.config.ts` — projectId/dataset from `studio/env.ts`; plugins `structureTool({ structure })` + `visionTool`. No `basePath` (standalone).
- `studio/sanity.cli.ts` — `defineCliConfig({ api: { projectId, dataset }, typegen: { enabled: true, path: "../{app,sanity}/**/*.{ts,tsx}", schema: "schema.json", generates: "../sanity.types.ts" } })`.
- `studio/.env` — **gitignored**; carries `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET` (same values as root `.env.local`; the Sanity CLI loads `.env` from the studio directory).
- `studio/structure.ts` — per decision 14.
- `studio/schemaTypes/index.ts`, `studio/schemaTypes/documents/{course,lesson,instructor,category,video,agent-context,progress}.ts`, `studio/schemaTypes/objects/{module,learning-outcome,resource,chapter,transcript-chunk,resume-position}.ts` (kebab-case, named exports matching filename).
- `studio/seed/vertex-seed.ndjson`

**Phase 2 — deletions:** `app/studio/` (whole route folder), root `sanity.config.ts`, root `sanity.cli.ts`. Keep root `sanity/` (web lib) and `next-sanity`.

**Phase 3 — web (root):**

- `sanity/lib/client.ts` — keep base `client` (no token); add `serverClient` with `token` + `useCdn: false` + `perspective: 'published'`.
- `sanity/lib/live.ts` — `defineLive({ client: client.withConfig({ apiVersion }), serverToken: process.env.SANITY_API_READ_TOKEN })`. No `browserToken`.
- `sanity/lib/queries.ts` — typed GROQ queries (list below).
- `app/layout.tsx` — render `<SanityLive />`.
- `package.json` — add `"typecheck": "tsc --noEmit"`; add `"studio:dev": "npm run dev --prefix studio"`.
- `.env.example` — canonical list (below).
- `.gitignore` — add `studio/.env`, `studio/schema.json`, `studio/dist/`.

**Generated & committed:** `sanity.types.ts` (repo root, via studio typegen).

## Phase 1 — Schema requirements

All types via `defineType`, fields via `defineField`, array members via `defineArrayMember`. Validation with `rule.required()`/`min()` where noted. Data-over-presentation naming. `index.ts` exports in AGENTS.md §8 order: course, lesson, instructor, category, video, agent context, progress (+ objects).

**course** (document)
- `title` string, required · `slug` slug (source: title), required
- `summary` text, required — one-line marketing copy
- `cover` image (with `alt`), required
- `level` string, required, `list: [Beginner, Intermediate, Advanced]`
- `price` number, `min: 0` — 0/empty = free
- `popular` boolean, initial false · `studentCount` number, initial 0 (display only)
- `learningOutcomes` array of `learningOutcome` (`icon` string with lucide list `[BarChart3, Clock, BookOpen, Star, Search, PlayCircle, Layers, Code, Zap, CheckCircle]`, `title` string required, `description` string required), min 3
- `instructor` reference → instructor, required · `category` reference → category, required
- `modules` array of `module`, required, min 1

**module** (object, `_type: 'module'`): `title` string required · `summary` text · `lessons` array of reference → lesson, required, min 1 (order is the display order).

**lesson** (document)
- `title` string required · `slug` slug required
- `videoUrl` url, required · `provider` string, required, `list: [youtube, vimeo, bunny]`
- `poster` image (with `alt`)
- `durationSeconds` number, required, `min: 1`
- `freePreview` boolean, initial false · `studentCount` number, initial 0
- `notes` array of `block` (Portable Text)
- `keyPoints` array of string, min 1 — the "in this lesson you will" list
- `proTip` text, optional
- `resources` array of `resource` (`type` string list `[article, download, repository, video, other]`, `title`, `description`, `url`)

**instructor** (document): `name` string required · `slug` · `photo` image (alt) · `expertise` array of string · `bio` array of `block`.

**category** (document): `title` · `slug` · `description` text.

**video** (document — internal, built by the future ingestion pipeline; mark fields read-only-ish via descriptions)
- `videoId` string, required — derived from the URL with datastore-unsafe characters stripped
- `url` url, required · `provider` string list as above, required
- `chapters` array of `chapter` (`startSeconds` number ≥ 0 required, `label` string required)
- `chunks` array of `transcriptChunk` (`startSeconds` number required, `text` string required) — field description: "internal; never return wholesale to an LLM or the client"

**agent-context** (document, name **`sanity.agentContext`**, title "Agent Context (Search)")
- `slug` slug required (MCP URL segment) · `instructions` text (rows ~10) · `groqFilter` text (single GROQ expression)

**progress** (document — app state, hidden)
- `clerkUserId` string, required
- `completedLessons` array of reference → lesson
- `lastPositions` array of `resumePosition` (`lesson` reference → lesson required, `seconds` number required)
- `updatedAt` datetime
- Type description documents the `_id = progress.<clerkUserId>` convention (one doc per learner, upsert via `createOrReplace`).

## Phase 3 — Data layer requirements

**`sanity/lib/client.ts`**: keep `client` (base config, `useCdn: true`, no token — used by `defineLive`); add:

```ts
export const serverClient = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
  perspective: 'published',
})
```

**`sanity/lib/live.ts`**: per decision 10, `serverToken` only.

**`sanity/lib/queries.ts`** — every query wrapped in `defineQuery` from `groq` so TypeGen types `fetch` calls:

- `COURSE_LIST_QUERY` — `_id, title, slug, summary, cover, level, price, popular, studentCount`, `instructor->{name, slug, photo}`, `category->{title, slug}`, `moduleCount: count(modules)`, `lessonCount: count(modules[].lessons[])`, `totalDurationSeconds: math::sum(modules[].lessons[]->durationSeconds)`
- `COURSE_BY_SLUG_QUERY` — full tree: modules `{_key, title, summary, lessons[]->{...}}`, instructor, category, outcomes
- `LESSON_BY_SLUG_QUERY` — lesson fields + the parent course and module derived by reverse lookup (`*[_type == "course" && ^._id in modules[].lessons[]._ref]`) with careful `^` scoping; verify the module-title projection in Vision
- `COURSE_SLUGS_QUERY`, `LESSON_SLUGS_QUERY` — for `generateStaticParams` (published only)
- `INSTRUCTOR_BY_SLUG_QUERY` — instructor + their courses
- `CATEGORY_LIST_QUERY` — categories with course counts

**`app/layout.tsx`**: render `<SanityLive />` (required by `nextjs.md`).

**`.env.example`** (names only, empty values): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION=2026-09-10`, `SANITY_API_READ_TOKEN`, the six Clerk vars, plus a comment that `studio/.env` needs the two `NEXT_PUBLIC_SANITY_*` values too.

## Seed content

`studio/seed/vertex-seed.ndjson` with stable published `_id`s (e.g. `course.react-foundations`) and strong references:

- 2 instructors, 3 categories
- 2 courses × 3 modules × 3 lessons (= 6 lessons) — realistic dev topics, levels Beginner/Intermediate, one course `price: 0`, sensible `freePreview` flags
- Lessons use public YouTube URLs (placeholders; real ingestion is a later prompt); each lesson gets a matching stub `video` doc (`videoId` derived, `provider: "youtube"`, empty `chapters`/`chunks`)
- 1 `sanity.agentContext` doc: slug `vertex-search`, `groqFilter: _type in ["course", "lesson", "instructor", "category"]`, `instructions: "Placeholder — author via dial-your-context."`

Import from `studio/`: `npx sanity dataset import seed/vertex-seed.ndjson $NEXT_PUBLIC_SANITY_DATASET`.

## Security considerations

- `SANITY_API_READ_TOKEN` is server-only: never imported by a client component, never `NEXT_PUBLIC_*`. Dataset stays private, so every content fetch happens server side.
- No `browserToken` in `defineLive` (decision 10).
- Progress is never written from the browser; write routes (later prompt) will hold the write token server-side.
- `studio/.env` is gitignored; `.env.example` carries names/empty values only; no real ids, tokens, or keys committed.
- No Sanity token in `app/layout.tsx` or any file reachable from client components.

## Acceptance criteria

1. `npm run dev` in `studio/` serves the Studio at `localhost:3333` with all 7 document types + objects, and the structure hides `video` and `progress`.
2. `app/studio/`, root `sanity.config.ts`, root `sanity.cli.ts` no longer exist; `npm run build` at root succeeds without them.
3. Every schema file uses `defineType`/`defineField`/`defineArrayMember`; no `any`; kebab-case filenames.
4. `npm run typegen` in `studio/` runs extract + generate cleanly; `sanity.types.ts` exists at root and is committed; queries are typed through `defineQuery`.
5. `sanity/lib/queries.ts` exports the 8 named queries above.
6. `sanity/lib/live.ts` sets `serverToken` and no `browserToken`; `<SanityLive />` renders in `app/layout.tsx`.
7. `.env.example` exists with `SANITY_API_READ_TOKEN` and the full var list; `.gitignore` covers `studio/.env`, `studio/schema.json`, `studio/dist/`.
8. Seed import completes with 0 errors; `COURSE_LIST_QUERY` returns both courses with derived `moduleCount`/`lessonCount`/`totalDurationSeconds` when run in Vision.
9. Root workspace: `npm run lint`, `npm run typecheck`, `npm run build` all pass.
10. `studio`: `npm run build` passes.

## Checks to run

- **Root (web):** `npm run lint` · `npm run typecheck` · `npm run build` · `npm run dev` (home page renders unchanged; `/studio` now 404s)
- **Studio:** `npm run typegen` · `npm run build` · `npx sanity dataset import seed/vertex-seed.ndjson <dataset>` · Vision: run `COURSE_LIST_QUERY` and `LESSON_BY_SLUG_QUERY` against the seeded dataset

## Manual test steps

1. In `studio/`: `npm run dev` → open `http://localhost:3333` → create/edit a course: reorder modules, reference lessons, pick an outcome icon from the list; verify validation (required fields, level list, min outcomes).
2. In Vision (inside the Studio): run `COURSE_LIST_QUERY` → both seeded courses with derived counts; run `LESSON_BY_SLUG_QUERY` for a seeded lesson → course + module resolved.
3. At root: `npm run dev` → home page renders exactly as before; navigate to `/studio` → 404.
4. At root: `npm run build` → passes.
5. `npx sanity deploy` in `studio/` → Studio app deployed (required before the Context MCP can serve this dataset later).
6. Open the repo in an editor → confirm `sanity.types.ts` exists at root and `COURSE_LIST_QUERY` results are inferred as typed.

## Needs from you (user actions)

- `npx sanity login` if not authenticated
- Create a **viewer** read token (`npx sanity tokens add "web-read" --role viewer --yes` or sanity.io/manage) → paste into root `.env.local` as `SANITY_API_READ_TOKEN`
- `npx sanity cors add http://localhost:3000 --credentials` (and production URL later)
- `npx sanity deploy` for the Studio application (CLI will prompt interactively)
- Confirm the dataset is private in sanity.io/manage

# Vertex seed

Rich demo content for the Vertex dataset: **10 courses** (programming, web,
AI/ML, data, developer craft) with **20 modules / 90 lessons**, plus
5 instructors, 6 categories, real transcript/chapter `video` documents and the
search agent context — so the catalog and cross-course search have real data.

Everything is derived from one authored file, and relationships stay
consistent by construction: a module *is* its lessons (references), a course
*is* its modules (embedded objects) — so "a module equals the sum of its
lessons and a course equals the sum of its modules" holds automatically, and
`build-ndjson.mjs` validates the totals and every reference before emitting.

## Files

| File | Role |
| --- | --- |
| `content.mjs` | **Source of truth.** Instructors, categories, and all 10 courses with modules, lessons, Portable-Text notes, key points, pro tips, resources, and learning outcomes. Each lesson carries a `query` used to find its video. |
| `resolve-videos.mjs` | Finds a real YouTube video per lesson query (search + scoring, exact duration from the watch page, English captions → transcript chunks, chapters from the video's own timestamps). Writes `videos.json`. |
| `videos.json` | Resolved video data, keyed by lesson key — committed so builds are offline-reproducible. |
| `build-ndjson.mjs` | Turns `content.mjs` + `videos.json` into `seed.ndjson`. Validates keys, slugs, refs, durations, and module/course totals; refuses to emit on any error. |
| `seed.ndjson` | The import artifact: 90 lessons, 90 videos, 10 courses, 5 instructors, 6 categories, 1 agent context. |

## Regenerate & import

```bash
cd studio

# 1. (optional — only if you edit content.mjs) re-resolve new/missing lessons
node seed/resolve-videos.mjs

# 2. build the NDJSON + validation
node seed/build-ndjson.mjs

# 3. wipe every content doc (ids are all published-style), then import
#    (remote thumbnails are uploaded as assets automatically)
node seed/delete-all.mjs
npx sanity datasets import seed/seed.ndjson --replace --asset-concurrency 5

# 4. refresh web types (queries unchanged, but cheap insurance)
npm run typegen
```

The `--replace` flag overwrites same-`_id` docs, so in practice step 3's
delete only matters for ids the new seed no longer contains (e.g. the old
`lesson.rf-*` docs from the first prototype seed).

## Consistency rules enforced

- Published-style `_id`s: `course.<key>`, `lesson.<key>`,
  `video.youtube-<videoId>`, `instructor.<key>`, `category.<key>` — stable and
  reimportable.
- Every lesson's `videoUrl` matches its `video` document's `url`, and
  `durationSeconds` is that video's real length (from YouTube).
- `video` docs hold at most 60 transcript chunks (cap for context-window
  safety, per AGENTS.md §12) and chapters derived from the source's own
  timestamps when available.
- Course `studentCount` ≥ every lesson's derived count (funnel), module and
  course totals verified at build time and printed.

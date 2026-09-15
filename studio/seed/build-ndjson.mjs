#!/usr/bin/env node
/**
 * build-ndjson.mjs — turns content.mjs (+ videos.json from resolve-videos.mjs)
 * into seed.ndjson, ready for:
 *
 *   cd studio && npx sanity datasets import seed/seed.ndjson --replace
 *
 * Documents use published _ids (type.key), so a reimport with --replace
 * overwrites in place. Image fields reference remote URLs (YouTube
 * thumbnails); `sanity datasets import` uploads them into the project's asset
 * pool automatically (that is what --asset-concurrency / --allow-failing-assets
 * are for).
 *
 * Consistency (AGENTS.md §8): a module equals the sum of its lessons and a
 * course equals the sum of its modules. That holds by construction because
 * lessons are references — but the builder still validates that every lesson
 * has a resolved video and a duration, and that keys/slugs are unique, and
 * prints the derived totals so a human can eyeball them.
 */

import {readFileSync, writeFileSync, existsSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import path from 'node:path'

import {courses, instructors, categories, agentContext} from './content.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const VIDEOS = path.join(__dirname, 'videos.json')
const OUT = path.join(__dirname, 'seed.ndjson')

// —──────────────────────── helpers —─────────────────────────────────────────

function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function shortHash(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(36).slice(0, 8)
}

/** One Portable Text block per paragraph. */
function ptBlocks(paragraphs, prefix) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `${prefix}b${i}`,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `${prefix}s${i}`, text, marks: []}],
  }))
}

function remoteImage(url, alt) {
  // @sanity/import's remote-asset convention: it downloads the URL, uploads
  // it to the dataset's asset store, and rewrites the reference for us.
  return {
    _type: 'image',
    alt,
    _sanityAsset: `image@${url}`,
  }
}

function thumbnail(videoId) {
  // hqdefault always exists on YouTube; maxres 404s on older uploads.
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

/** Deterministic lesson enrollment: a funnel down the course. */
function lessonStudents(courseStudents, idx, total) {
  const share = 1 - 0.55 * (idx / Math.max(1, total - 1))
  return Math.round((courseStudents / total) * (0.7 + 0.6 * share))
}

// —──────────────────────── build —───────────────────────────────────────────

if (!existsSync(VIDEOS)) {
  console.error('videos.json missing — run `node seed/resolve-videos.mjs` first.')
  process.exit(1)
}
const videos = JSON.parse(readFileSync(VIDEOS, 'utf8'))

const docs = []
const lessonIndex = new Map() // key -> global order for the funnel
{
  let n = 0
  for (const course of courses) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) lessonIndex.set(lesson.key, n++)
    }
  }
}

const seenKeys = new Set()
const errors = []

// instructors
for (const i of instructors) {
  docs.push({
    _id: `instructor.${i.key}`,
    _type: 'instructor',
    name: i.name,
    slug: {current: slugify(i.name)},
    expertise: i.expertise,
    bio: ptBlocks([i.bio], `i-${i.key}`),
  })
}

// categories
for (const c of categories) {
  docs.push({
    _id: `category.${c.key}`,
    _type: 'category',
    title: c.title,
    slug: {current: slugify(c.title)},
    description: c.description,
  })
}

// lessons + video docs + courses
for (const course of courses) {
  const allLessons = course.modules.flatMap((m) => m.lessons)

  allLessons.forEach((lesson, localIdx) => {
    if (seenKeys.has(lesson.key)) errors.push(`duplicate lesson key: ${lesson.key}`)
    seenKeys.add(lesson.key)
    const video = videos[lesson.key]
    if (!video) {
      errors.push(`no resolved video for lesson: ${lesson.key} (query: ${lesson.query})`)
      return
    }
    if (!video.durationSeconds || video.durationSeconds < 1) {
      errors.push(`bad duration for lesson: ${lesson.key}`)
      return
    }

    docs.push({
      _id: `lesson.${lesson.key}`,
      _type: 'lesson',
      title: lesson.title,
      slug: {current: slugify(lesson.title)},
      videoUrl: video.url,
      provider: 'youtube',
      poster: remoteImage(thumbnail(video.videoId), `Thumbnail for ${lesson.title}`),
      durationSeconds: video.durationSeconds,
      freePreview: Boolean(lesson.freePreview),
      studentCount: lessonStudents(course.studentCount, lessonIndex.get(lesson.key), lessonIndex.size),
      notes: ptBlocks(lesson.notes, `l-${lesson.key}`),
      keyPoints: lesson.keyPoints,
      ...(lesson.proTip ? {proTip: lesson.proTip} : {}),
      ...(lesson.resources
        ? {
            resources: lesson.resources.map((r, ri) => ({
              _key: `r-${shortHash(lesson.key + ri)}`,
              type: r.type,
              title: r.title,
              description: r.description || '',
              url: r.url,
            })),
          }
        : {}),
    })

    // video document — internal lookup, one per UNIQUE video (AGENTS.md §8).
    // Two lessons may resolve to the same YouTube video; emit it only once.
    const videoDocId = `video.youtube-${video.videoId}`
    if (!docs.some((d) => d._id === videoDocId)) {
      docs.push({
        _id: videoDocId,
        _type: 'video',
        videoId: `youtube-${video.videoId}`,
        url: video.url,
        provider: 'youtube',
        chapters: (video.chapters || []).map((c, ci) => ({
          _key: `c-${shortHash(video.videoId + ci)}`,
          startSeconds: c.startSeconds,
          label: c.label,
        })),
        chunks: (video.chunks || []).map((c, ci) => ({
          _key: `k-${shortHash(video.videoId + ci)}`,
          startSeconds: c.startSeconds,
          text: c.text,
        })),
      })
    }
  })

  const totalDuration = allLessons.reduce((sum, l) => sum + (videos[l.key]?.durationSeconds || 0), 0)
  docs.push({
    _id: `course.${course.key}`,
    _type: 'course',
    title: course.title,
    slug: {current: slugify(course.title)},
    summary: course.summary,
    cover: remoteImage(thumbnail(videos[allLessons[0].key]?.videoId || 'placeholder'), `Cover for ${course.title}`),
    level: course.level,
    price: course.price,
    popular: course.popular,
    studentCount: course.studentCount,
    learningOutcomes: course.outcomes.map((o, oi) => ({
      _key: `o-${shortHash(course.key + oi)}`,
      icon: o.icon,
      title: o.title,
      description: o.description,
    })),
    instructor: {_type: 'reference', _ref: `instructor.${course.instructor}`},
    category: {_type: 'reference', _ref: `category.${course.category}`},
    modules: course.modules.map((mod, mi) => ({
      _key: `m-${shortHash(course.key + mi)}`,
      title: mod.title,
      summary: mod.summary,
      lessons: mod.lessons.map((l, li) => ({
        _key: `ml-${shortHash(course.key + mi + '' + li)}`,
        _type: 'reference',
        _ref: `lesson.${l.key}`,
      })),
    })),
  })

  console.log(
    `course ${course.key}: ${course.modules.length} modules, ${allLessons.length} lessons, ` +
      `${totalDuration}s total duration (sum of lessons)`,
  )
}

// agent context (search config) — scoped to content types only.
docs.push({
  _id: `sanity.agentContext.${agentContext.slug}`,
  _type: 'sanity.agentContext',
  slug: {current: agentContext.slug},
  instructions: agentContext.instructions,
  groqFilter: agentContext.groqFilter,
})

// —──────────────────────── validate —────────────────────────────────────────

// cross-check instructor/category references exist
const instructorIds = new Set(instructors.map((i) => i.key))
const categoryIds = new Set(categories.map((c) => c.key))
for (const course of courses) {
  if (!instructorIds.has(course.instructor)) errors.push(`course ${course.key} → unknown instructor ${course.instructor}`)
  if (!categoryIds.has(course.category)) errors.push(`course ${course.key} → unknown category ${course.category}`)
}

// every _ref in the output resolves to a doc in the output
const ids = new Set(docs.map((d) => d._id))
for (const d of docs) {
  const json = JSON.stringify(d)
  for (const m of json.matchAll(/"_ref":"([^"]+)"/g)) {
    if (m[1].startsWith('https://')) continue // remote asset refs resolve at import
    if (!ids.has(m[1])) errors.push(`dangling ref ${m[1]} in ${d._id}`)
  }
}

// slugs unique per type
for (const type of ['course', 'lesson', 'instructor', 'category']) {
  const slugs = docs.filter((d) => d._type === type).map((d) => d.slug.current)
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i)
  for (const s of new Set(dupes)) errors.push(`duplicate ${type} slug: ${s}`)
}

if (errors.length) {
  console.error(`\n${errors.length} error(s):`)
  for (const e of errors) console.error(' - ' + e)
  process.exit(1)
}

writeFileSync(OUT, docs.map((d) => JSON.stringify(d)).join('\n') + '\n')

const counts = {}
for (const d of docs) counts[d._type] = (counts[d._type] || 0) + 1
const chunked = docs.filter((d) => d._type === 'video' && d.chunks?.length).length
console.log(`\nwrote ${docs.length} docs → ${path.relative(process.cwd(), OUT)}`)
console.log(Object.entries(counts).map(([t, n]) => `  ${t}: ${n}`).join('\n'))
console.log(`  videos with real transcript chunks: ${chunked}`)

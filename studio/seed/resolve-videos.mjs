#!/usr/bin/env node
/**
 * resolve-videos.mjs — fills videos.json with real YouTube data for every
 * lesson in content.mjs.
 *
 * For each lesson `query`:
 *   1. Search YouTube (parse ytInitialData from the results page — no API key).
 *   2. Score candidates by title overlap with the query, English, length, and
 *      trusted-channel bonus.
 *   3. One InnerTube player-API call for the winner: exact duration, title,
 *      author, description, and caption tracks (the watch-page baseUrl is
 *      gated; InnerTube ANDROID client exposes working ones).
 *   4. Captions → transcript chunks grouped to ~180 chars, then even-sampled
 *      to ≤ 60 so coverage spans the whole video (AGENTS.md §12: never keep
 *      a whole transcript in one queryable field).
 *   5. Chapters from the description's timestamp list ("12:03 Label"), else
 *      evenly spaced clock markers.
 *
 * Output videos.json, keyed by lesson key:
 *   { "<key>": { videoId, url, title, author, durationSeconds,
 *                chapters: [{startSeconds,label}], chunks: [{startSeconds,text}] } }
 *
 * Usage:
 *   node seed/resolve-videos.mjs          # only resolve keys missing from videos.json
 *   node seed/resolve-videos.mjs --force  # re-resolve all
 *
 * build-ndjson.mjs reads videos.json offline, so once this runs the seed is
 * reproducible with no network.
 */

import {readFileSync, writeFileSync, existsSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import path from 'node:path'

import {courses} from './content.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, 'videos.json')
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.537'
// Public web-client key shipped in every YouTube page — not a secret, just an app id.
const PLAYER_URL =
  'https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'

const FORCE = process.argv.includes('--force')
const MAX_CHUNKS = 60

// Channels whose tutorial content is reliably on-topic and in English.
const TRUSTED = [
  'freecodecamp',
  'traversymedia',
  'programmingwithmosh',
  'javascriptmastery',
  'netninja',
  'fireship',
  'webdev',
  'simplilearn',
  'codedamn',
  'theprimeagen',
  'kevinpowell',
  'pedtech',
  'akash',
  'campusx',
  'codebasics',
]

/** Flatten every lesson with its key + query. */
function allLessons() {
  const out = []
  for (const course of courses) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        out.push({key: lesson.key, query: lesson.query, title: lesson.title})
      }
    }
  }
  return out
}

function stripTags(s) {
  return String(s || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

async function get(url) {
  const res = await fetch(url, {
    headers: {'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9'},
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.text()
}

/** InnerTube ANDROID client: metadata + caption tracks in one call. */
async function player(videoId) {
  const res = await fetch(PLAYER_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      context: {client: {clientName: 'ANDROID', clientVersion: '20.10.38', androidSdkVersion: 30, hl: 'en'}},
      videoId,
    }),
  })
  if (!res.ok) throw new Error(`player HTTP ${res.status}`)
  return res.json()
}

/** Parse a YouTube "MM:SS" / "H:MM:SS" into seconds. */
function toSeconds(ts) {
  const parts = ts.split(':').map((n) => parseInt(n, 10))
  if (parts.some((n) => Number.isNaN(n))) return null
  return parts.reduce((acc, s) => acc * 60 + s, 0)
}

/** Tokenize a title/query into a lowercase word set, dropping stopwords. */
const STOP = new Set(['a', 'an', 'the', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'with', 'is', 'your', 'you'])
function words(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w))
}

/** Search YouTube and return the best-matching candidate. */
async function searchBest(query) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
  const html = await get(url)
  const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/)
  if (!m) return null
  let data
  try {
    data = JSON.parse(m[1])
  } catch {
    return null
  }
  const vids = []
  ;(function walk(o) {
    if (o && typeof o === 'object') {
      if (o.videoRenderer) {
        const v = o.videoRenderer
        try {
          vids.push({
            videoId: v.videoId,
            title: stripTags(
              (v.title && v.title.runs && v.title.runs.map((r) => r.text).join('')) || '',
            ),
            author: stripTags(
              (v.ownerText && v.ownerText.runs && v.ownerText.runs[0].text) || '',
            ),
            length: v.lengthText && v.lengthText.simpleText,
          })
        } catch {
          /* skip malformed */
        }
      }
      for (const k in o) walk(o[k])
    } else if (Array.isArray(o)) o.forEach(walk)
  })(data)

  const qWords = new Set(words(query))
  let best = null
  let bestScore = -1
  for (const v of vids) {
    if (!v.videoId) continue
    // Skip Shorts/live noise: anything under 2 minutes can't anchor a lesson.
    const secs = v.length ? toSeconds(v.length) : null
    if (secs !== null && secs < 120) continue
    let score = 0
    for (const w of words(v.title)) if (qWords.has(w)) score += 2
    const aLower = v.author.toLowerCase().replace(/[^a-z0-9]/g, '')
    if (TRUSTED.some((t) => aLower.includes(t))) score += 4
    if (/shorts|short\b/i.test(v.title)) score -= 6
    if (score > bestScore) {
      bestScore = score
      best = v
    }
  }
  return best
}

/** Caption events → ≤ MAX_CHUNKS even-sampled {startSeconds,text} chunks. */
async function fetchChunks(videoId) {
  let j
  try {
    j = await player(videoId)
  } catch {
    return []
  }
  const tracks =
    j.captions?.playerCaptionsTracklistRenderer?.captionTracks || []
  const track =
    tracks.find((t) => (t.languageCode || '').startsWith('en') && t.kind !== 'asr') ||
    tracks.find((t) => (t.languageCode || '').startsWith('en')) ||
    tracks[0]
  if (!track?.baseUrl) return []
  let url = track.baseUrl.replace(/fmt=[^&]*/, 'fmt=json3')
  if (!url.includes('fmt=')) url += '&fmt=json3'
  let events
  try {
    const body = await get(url)
    const json = JSON.parse(body)
    events = (json.events || []).filter((e) => e.segs && e.tStartMs != null)
  } catch {
    return []
  }
  // Group consecutive caption segments into ~180-char pieces.
  const grouped = []
  let buf = {startSeconds: null, text: ''}
  for (const e of events) {
    const text = e.segs
      .map((s) => (s.utf8 || '').replace(/\s+/g, ' '))
      .join('')
      .trim()
    if (!text) continue
    if (buf.startSeconds === null) buf.startSeconds = Math.round(e.tStartMs / 1000)
    if ((buf.text + ' ' + text).trim().length > 180 && buf.text) {
      grouped.push({startSeconds: buf.startSeconds, text: buf.text.trim()})
      buf = {startSeconds: Math.round(e.tStartMs / 1000), text}
    } else {
      buf.text = (buf.text + ' ' + text).trim()
    }
  }
  if (buf.text) grouped.push({startSeconds: buf.startSeconds, text: buf.text.trim()})
  // Even-sample so chunks cover the whole video, not just the first minutes.
  if (grouped.length <= MAX_CHUNKS) return grouped
  const stride = grouped.length / MAX_CHUNKS
  const out = []
  for (let i = 0; i < MAX_CHUNKS; i++) out.push(grouped[Math.floor(i * stride)])
  return out
}

/** Chapters from description timestamps, else evenly spaced by outline. */
function deriveChapters(description, duration, lessonTitle) {
  const marks = []
  const re = /(?:^|\s)(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–.)\]]?\s*([^\n]{2,60})/g
  let mm
  while ((mm = re.exec(description)) !== null) {
    const sec = toSeconds(mm[1])
    const label = mm[2].trim()
    if (sec !== null && label) marks.push({startSeconds: sec, label})
  }
  const cleaned = marks
    .filter((m) => m.startSeconds < (duration || Infinity))
    .sort((a, b) => a.startSeconds - b.startSeconds)
  // Dedupe: description timestamps restart (0:00 twice etc.)
  const seen = new Set()
  const uniq = cleaned.filter((m) => {
    const k = `${m.startSeconds}|${m.label.toLowerCase()}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
  if (uniq.length >= 3) return uniq.slice(0, 24)
  if (!duration) return [{startSeconds: 0, label: lessonTitle}]
  const step = Math.max(60, Math.floor(duration / 6))
  const out = []
  for (let t = 0; t < duration; t += step) {
    out.push({startSeconds: t, label: t === 0 ? lessonTitle : `Part at ${fmtClock(t)}`})
  }
  return out.slice(0, 24)
}

function fmtClock(sec) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  return h
    ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${m}:${String(s).padStart(2, '0')}`
}

async function main() {
  const lessons = allLessons()
  const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {}
  const videos = FORCE ? {} : {...existing}
  let done = 0
  let skipped = 0
  let failed = 0

  for (const lesson of lessons) {
    if (videos[lesson.key] && !FORCE) {
      skipped++
      continue
    }
    process.stdout.write(`· ${lesson.key} — "${lesson.query}" … `)
    try {
      const best = await searchBest(lesson.query)
      if (!best) {
        console.log('NO RESULT')
        failed++
        continue
      }
      const j = await player(best.videoId)
      const vd = j.videoDetails || {}
      const duration = parseInt(vd.lengthSeconds, 10) || toSeconds(best.length) || 600
      const chunks = await fetchChunks(best.videoId)
      const chapters = deriveChapters(vd.shortDescription || '', duration, lesson.title)
      videos[lesson.key] = {
        videoId: best.videoId,
        url: `https://www.youtube.com/watch?v=${best.videoId}`,
        title: vd.title || best.title,
        author: vd.author || best.author,
        durationSeconds: duration,
        chapters,
        chunks,
      }
      done++
      console.log(
        `✓ ${best.videoId} ${fmtClock(duration)} · ${chunks.length} chunks · ${chapters.length} ch · ${vd.author || best.author}`,
      )
    } catch (e) {
      failed++
      console.log(`ERR ${e.message}`)
    }
    // Be polite to the endpoints.
    await new Promise((r) => setTimeout(r, 250))
  }

  writeFileSync(OUT, JSON.stringify(videos, null, 2))
  console.log(`\nresolved ${done}, kept ${skipped}, failed ${failed} → ${path.relative(process.cwd(), OUT)}`)
  const missing = lessons.filter((l) => !videos[l.key]).map((l) => l.key)
  if (missing.length) console.log(`missing ${missing.length}: ${missing.join(', ')}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

#!/usr/bin/env node
/**
 * delete-all.mjs — wipes every seeded content document from the configured
 * dataset so `datasets import --replace` starts from a clean slate.
 *
 * Old prototype ids (e.g. lesson.rf-*, video.youtube-rf1aa000001) are not in
 * the new seed's _id set, so --replace alone would leave them behind; this
 * removes them.
 *
 * Usage: node seed/delete-all.mjs
 */

import {execFileSync} from 'node:child_process'

const TYPES = ['course', 'lesson', 'video', 'instructor', 'category', 'sanity.agentContext']
const query = `*[_type in [${TYPES.map((t) => `"${t}"`).join(', ')}] && !startswith(_id, "drafts.")]._id`

function run(args) {
  // shell:true on Windows so npx.cmd resolves; quotes are baked into args.
  return execFileSync('npx', args, {encoding: 'utf8', shell: process.platform === 'win32', maxBuffer: 64 * 1024 * 1024})
}

const out = run(['sanity', 'documents', 'query', query]).trim()
const ids = JSON.parse(out)
if (!Array.isArray(ids) || ids.length === 0) {
  console.log('nothing to delete')
  process.exit(0)
}
console.log(`deleting ${ids.length} documents…`)
run(['sanity', 'documents', 'delete', ...ids])
console.log('done.')

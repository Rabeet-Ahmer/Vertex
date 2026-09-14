import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schema} from './schemaTypes'
import {structure} from './structure'

/**
 * A standalone Studio is a static bundle — it cannot read environment
 * variables at runtime in the browser or after `sanity deploy`, so the
 * Sanity CLI template hardcodes these values (unlike the web workspace,
 * where Next.js inlines NEXT_PUBLIC_* at build time).
 *
 * Project id and dataset name are public identifiers — they appear in
 * every API URL. Only tokens are secret, and none live in this workspace.
 * Update here if the project or dataset changes; CLI commands
 * (deploy/import/typegen) still read studio/.env.local for auth.
 */
const projectId = 'h3w8xa67'
const dataset = 'production'
const apiVersion = '2026-09-10'

export default defineConfig({
  name: 'default',
  title: 'Vertex',
  projectId,
  dataset,
  // Add and edit the content schema in the './schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})

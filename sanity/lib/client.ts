import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

/**
 * Server-only client for the private dataset. Reads drafts-free published
 * content straight from the API (no CDN). Never import from a client
 * component — the token must stay on the server.
 */
export const serverClient = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
  perspective: 'published',
})

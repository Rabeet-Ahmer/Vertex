import {defineField, defineType} from 'sanity'
import {VideoIcon} from '@sanity/icons'

/**
 * Internal lookup, one document per unique video URL. Built by the offline
 * ingestion pipeline — authors should not edit these by hand. Hidden from
 * Studio structure (see structure.ts) and from the search agent's scope.
 */
export const video = defineType({
  name: 'video',
  title: 'Video (internal)',
  type: 'document',
  icon: VideoIcon,
  description:
    'Transcript and chapter data for one video. Written by the ingestion pipeline; not shown to learners.',
  fields: [
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description:
        'Derived from the URL with datastore-unsafe characters stripped. Ingestion-managed.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'provider',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'Bunny', value: 'bunny'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'chapters',
      title: 'Chapters (table of contents)',
      type: 'array',
      of: [{type: 'chapter'}],
      description: 'Ingestion-managed.',
    }),
    defineField({
      name: 'chunks',
      title: 'Transcript chunks',
      type: 'array',
      of: [{type: 'transcriptChunk'}],
      description:
        'internal; never return wholesale to an LLM or the client. Fetch only filtered matches, a few per video.',
    }),
  ],
})

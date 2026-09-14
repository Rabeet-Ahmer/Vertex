import {defineField, defineType} from 'sanity'

/** One short timestamped piece of transcript inside a video document. */
export const transcriptChunk = defineType({
  name: 'transcriptChunk',
  title: 'Transcript Chunk',
  type: 'object',
  fields: [
    defineField({
      name: 'startSeconds',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})

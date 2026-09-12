import {defineField, defineType} from 'sanity'

/** Embedded inside a course — not its own document. */
export const module = defineType({
  name: 'module',
  title: 'Module',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'lessons',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'lesson'}]}],
      description: 'Order is display order — "Lesson 1.2" is derived, never stored.',
      validation: (rule) => rule.required().min(1),
    }),
  ],
})

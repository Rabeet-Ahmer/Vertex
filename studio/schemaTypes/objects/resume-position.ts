import {defineField, defineType} from 'sanity'

/** Where a learner left off in a lesson. */
export const resumePosition = defineType({
  name: 'resumePosition',
  title: 'Resume Position',
  type: 'object',
  fields: [
    defineField({
      name: 'lesson',
      type: 'reference',
      to: [{type: 'lesson'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seconds',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
  ],
})

import {defineField, defineType} from 'sanity'
import {SyncIcon} from '@sanity/icons'

/**
 * Per-learner app state. One document per learner, _id = progress.<clerkUserId>,
 * written via server routes only (createOrReplace upsert). The browser never
 * writes this. Hidden from Studio structure.
 */
export const progress = defineType({
  name: 'progress',
  title: 'Progress (app state)',
  type: 'document',
  icon: SyncIcon,
  description:
    'Learner state keyed by Clerk user id. Convention: _id = progress.<clerkUserId>, upserted with createOrReplace from server routes.',
  fields: [
    defineField({
      name: 'clerkUserId',
      title: 'Clerk user id',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'completedLessons',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'lesson'}]}],
    }),
    defineField({
      name: 'lastPositions',
      title: 'Resume positions',
      type: 'array',
      of: [{type: 'resumePosition'}],
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
    }),
  ],
})

import {defineArrayMember, defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['https'], allowRelative: false})
          .error('Must be a valid https:// video URL'),
    }),
    defineField({
      name: 'provider',
      title: 'Video provider',
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
      name: 'poster',
      title: 'Poster image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string'})],
    }),
    defineField({
      name: 'durationSeconds',
      title: 'Duration (seconds)',
      type: 'number',
      description: 'Total lesson length in seconds. Display time is derived from this.',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'freePreview',
      title: 'Free preview',
      type: 'boolean',
      initialValue: false,
      description: 'Display label only — not access control.',
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      type: 'number',
      description: 'Display only.',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'notes',
      title: 'Lesson notes',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'keyPoints',
      title: 'In this lesson you will',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'proTip',
      title: 'Pro tip',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'resources',
      type: 'array',
      of: [{type: 'resource'}],
    }),
  ],
})

import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: DocumentsIcon,
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
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      description: 'One-line marketing copy shown on catalog cards.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'Beginner'},
          {title: 'Intermediate', value: 'Intermediate'},
          {title: 'Advanced', value: 'Advanced'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      type: 'number',
      description: '0 or empty renders as "Free" in the UI.',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'popular',
      type: 'boolean',
      initialValue: false,
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
      name: 'learningOutcomes',
      title: 'What you\'ll learn',
      type: 'array',
      of: [{type: 'learningOutcome'}],
      validation: (rule) => rule.min(3),
    }),
    defineField({
      name: 'instructor',
      type: 'reference',
      to: [{type: 'instructor'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [{type: 'module'}],
      description: 'Order is display order — "Module 1", "Module 2" are derived, never stored.',
      validation: (rule) => rule.required().min(1),
    }),
  ],
})

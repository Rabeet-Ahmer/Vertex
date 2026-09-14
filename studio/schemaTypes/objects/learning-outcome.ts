import {defineField, defineType} from 'sanity'

export const learningOutcome = defineType({
  name: 'learningOutcome',
  title: 'Learning Outcome',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      description: 'Lucide icon name; the web app maps this to a component.',
      options: {
        list: [
          'BarChart3',
          'Clock',
          'BookOpen',
          'Star',
          'Search',
          'PlayCircle',
          'Layers',
          'Code',
          'Zap',
          'CheckCircle',
        ],
      },
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})

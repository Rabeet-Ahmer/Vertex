import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

/**
 * Sanity Context document — configures the search agent (content scope +
 * instructions). Name must stay "sanity.agentContext" for the Context MCP.
 * Edit content via import / the Sanity MCP until the Studio plugin catches up.
 */
export const agentContext = defineType({
  name: 'sanity.agentContext',
  title: 'Agent Context (Search)',
  type: 'document',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'URL segment the Context MCP exposes this agent on.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instructions',
      type: 'text',
      rows: 10,
      description:
        'Query guidance for the search agent — short deltas the schema does not already make obvious.',
    }),
    defineField({
      name: 'groqFilter',
      type: 'text',
      rows: 3,
      description: 'Single GROQ expression scoping which documents the agent can see.',
    }),
  ],
})

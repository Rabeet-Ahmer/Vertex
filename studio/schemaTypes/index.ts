import {type SchemaTypeDefinition} from 'sanity'

import {course} from './documents/course'
import {lesson} from './documents/lesson'
import {instructor} from './documents/instructor'
import {category} from './documents/category'
import {video} from './documents/video'
import {agentContext} from './documents/agent-context'
import {progress} from './documents/progress'
import {module} from './objects/module'
import {learningOutcome} from './objects/learning-outcome'
import {resource} from './objects/resource'
import {chapter} from './objects/chapter'
import {transcriptChunk} from './objects/transcript-chunk'
import {resumePosition} from './objects/resume-position'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Documents (AGENTS.md §8 order)
    course,
    lesson,
    instructor,
    category,
    video,
    agentContext,
    progress,
    // Embedded objects
    module,
    learningOutcome,
    resource,
    chapter,
    transcriptChunk,
    resumePosition,
  ],
}

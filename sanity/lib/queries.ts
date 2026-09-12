import { defineQuery } from 'groq'

/**
 * All queries are wrapped in defineQuery so studio/ TypeGen generates the
 * result types into ../sanity.types.ts. Keep query names globally unique.
 */

export const COURSE_LIST_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(popular desc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    cover,
    level,
    price,
    popular,
    studentCount,
    "instructor": instructor->{
      "name": name,
      "slug": slug.current,
      photo
    },
    "category": category->{
      "title": title,
      "slug": slug.current
    },
    "moduleCount": count(modules),
    "lessonCount": count(modules[].lessons[]),
    "totalDurationSeconds": math::sum(modules[].lessons[]->durationSeconds)
  }
`)

export const POPULAR_COURSES_QUERY = defineQuery(`
  *[_type == "course" && popular == true && defined(slug.current)] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    cover,
    level,
    price,
    studentCount,
    "instructor": instructor->{
      "name": name,
      "slug": slug.current,
      photo
    },
    "category": category->{
      "title": title,
      "slug": slug.current
    },
    "moduleCount": count(modules),
    "lessonCount": count(modules[].lessons[]),
    "totalDurationSeconds": math::sum(modules[].lessons[]->durationSeconds)
  }
`)

export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    cover,
    level,
    price,
    popular,
    studentCount,
    "learningOutcomes": learningOutcomes[] {
      _key,
      icon,
      title,
      description
    },
    "instructor": instructor->{
      "name": name,
      "slug": slug.current,
      photo,
      expertise
    },
    "category": category->{
      "title": title,
      "slug": slug.current
    },
    "modules": modules[] {
      _key,
      title,
      summary,
      "lessons": lessons[]->{
        _id,
        title,
        "slug": slug.current,
        videoUrl,
        provider,
        poster,
        durationSeconds,
        freePreview,
        studentCount
      }
    }
  }
`)

export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    provider,
    poster,
    durationSeconds,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    "resources": resources[] {
      _key,
      type,
      title,
      description,
      url
    },
    "course": (
      *[_type == "course" && ^._id in modules[].lessons[]._ref][0] {
        _id,
        title,
        "slug": slug.current,
        "instructor": instructor->{
          "name": name,
          "slug": slug.current
        },
        "modules": modules[] {
          _key,
          title,
          "lessonIds": lessons[]._ref
        }
      }
    )
  }
`)

export const COURSE_SLUGS_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)].slug.current
`)

export const LESSON_SLUGS_QUERY = defineQuery(`
  *[_type == "lesson" && defined(slug.current)].slug.current
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio,
    "courses": *[_type == "course" && references(^._id)] {
      _id,
      title,
      "slug": slug.current,
      summary,
      cover,
      level,
      price,
      studentCount
    }
  }
`)

export const CATEGORY_LIST_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "courseCount": count(*[_type == "course" && references(^._id)])
  }
`)

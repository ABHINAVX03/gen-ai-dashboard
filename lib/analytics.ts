import type { Course } from '@/types'

export function getAverageProgress(courses: Course[]) {
  if (courses.length === 0) {
    return 0
  }

  return Math.round(
    courses.reduce((total, course) => total + course.progress, 0) / courses.length
  )
}

export function getStrongestCourse(courses: Course[]) {
  return courses.reduce<Course | null>((strongest, course) => {
    if (!strongest || course.progress > strongest.progress) {
      return course
    }

    return strongest
  }, null)
}

export function getFocusCourse(courses: Course[]) {
  return courses.reduce<Course | null>((focus, course) => {
    if (!focus || course.progress < focus.progress) {
      return course
    }

    return focus
  }, null)
}

export function getWeeklyHours(studentSlug: string) {
  const seed = studentSlug
    .split('')
    .reduce((total, char) => total + char.charCodeAt(0), 0)

  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => ({
    day,
    hours: 1 + ((seed + index * 3) % 6),
  }))
}

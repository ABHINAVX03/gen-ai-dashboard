import { createClient } from './supabase'
import { AppError } from '@/lib/errors'
import type { Course, Student } from '@/types'

let hasWarnedMissingStudentSlug = false

export async function getCourses(studentSlug: string): Promise<Course[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('student_slug', studentSlug.toLowerCase())
    .order('created_at', { ascending: true })

  if (error) {
    if (error.code === '42703' || error.message.includes('student_slug')) {
      if (!hasWarnedMissingStudentSlug) {
        hasWarnedMissingStudentSlug = true
        console.warn(
          'Supabase courses.student_slug is missing. Falling back to global courses.'
        )
      }
      return getLegacyCourses(studentSlug)
    }

    console.error('Supabase error:', error.message)
    throw new AppError('Failed to fetch courses', 'COURSES_FETCH_FAILED', error)
  }

  return data ?? []
}

async function getLegacyCourses(studentSlug: string): Promise<Course[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Supabase legacy courses error:', error.message)
    throw new AppError('Failed to fetch courses', 'COURSES_FETCH_FAILED', error)
  }

  return (data ?? []).map((course) => ({
    ...course,
    student_slug: course.student_slug ?? studentSlug.toLowerCase(),
  }))
}

export async function getStudentBySlug(slug: string): Promise<Student | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('students')
    .select('id, name, slug, streak, avatar_url, created_at')
    .eq('slug', slug.toLowerCase())
    .maybeSingle()

  if (error) {
    console.error('Supabase student error:', error.message)
    throw new AppError('Failed to fetch student', 'STUDENT_FETCH_FAILED', error)
  }

  return data
}

import { HeroTile } from '@/components/dashboard/HeroTile'
import { CourseGrid } from '@/components/dashboard/CourseGrid'
import { ActivityTile } from '@/components/dashboard/ActivityTile'
import { getCourses, getStudentBySlug } from '@/lib/data'
import { formatStudentName } from '@/lib/students'
import { getErrorMessage } from '@/lib/errors'
import type { Course, Student } from '@/types'

interface StudentDashboardPageProps {
  params: {
    student: string
  }
}

export default async function StudentDashboardPage({
  params,
}: StudentDashboardPageProps) {
  const { courses, student, error } = await loadDashboard(params.student)

  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-[1400px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <HeroTile
            name={student.name}
            streak={student.streak}
            activeCourses={courses.length}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <ActivityTile studentSlug={params.student} />
        </div>
        <CourseGrid courses={courses} error={error} />
      </div>
    </section>
  )
}

async function loadDashboard(slug: string): Promise<{
  courses: Course[]
  student: Pick<Student, 'name' | 'streak'>
  error: string | null
}> {
  let courses: Course[] = []
  let student: Pick<Student, 'name' | 'streak'> = {
    name: formatStudentName(slug) || 'Student',
    streak: 0,
  }
  let error: string | null = null

  const [studentResult, coursesResult] = await Promise.allSettled([
    getStudentBySlug(slug),
    getCourses(slug),
  ])

  if (studentResult.status === 'fulfilled' && studentResult.value) {
    student = studentResult.value
  }

  if (studentResult.status === 'rejected') {
    error = getErrorMessage(
      studentResult.reason,
      'Could not load student profile. Showing the URL name instead.'
    )
  }

  if (coursesResult.status === 'fulfilled') {
    courses = coursesResult.value
  }

  if (coursesResult.status === 'rejected') {
    error = getErrorMessage(
      coursesResult.reason,
      'Could not load courses. Check your Supabase connection.'
    )
  }

  return { courses, student, error }
}

import { CourseGrid } from '@/components/dashboard/CourseGrid'
import { MetricTile } from '@/components/ui/Bento'
import { PageHeader } from '@/components/ui/PageHeader'
import { getCourses, getStudentBySlug } from '@/lib/data'
import { formatStudentName } from '@/lib/students'
import { getAverageProgress } from '@/lib/analytics'
import { getErrorMessage } from '@/lib/errors'
import { pageSectionClass } from '@/lib/styles'
import type { Course } from '@/types'

interface CoursesStudentPageProps {
  params: {
    student: string
  }
}

export default async function CoursesStudentPage({
  params,
}: CoursesStudentPageProps) {
  const { courses, name, error } = await loadCoursesPage(params.student)
  const completed = courses.filter((course) => course.progress >= 90).length
  const average = getAverageProgress(courses)

  return (
    <section className={pageSectionClass}>
      <PageHeader eyebrow="Course workspace" title={`${name}'s courses`} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <MetricTile
          iconName="BookOpen"
          label="Active courses"
          value={courses.length}
          accentClassName="text-accent-cyan"
          custom={0}
        />
        <MetricTile
          iconName="CheckCircle2"
          label="Near completion"
          value={completed}
          accentClassName="text-accent-emerald"
          custom={1}
        />
        <MetricTile
          iconName="Clock3"
          label="Average progress"
          value={`${average}%`}
          accentClassName="text-accent-amber"
          custom={2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CourseGrid courses={courses} error={error} />
      </div>
    </section>
  )
}

async function loadCoursesPage(slug: string): Promise<{
  courses: Course[]
  name: string
  error: string | null
}> {
  let courses: Course[] = []
  let name = formatStudentName(slug) || 'Student'
  let error: string | null = null

  const [studentResult, coursesResult] = await Promise.allSettled([
    getStudentBySlug(slug),
    getCourses(slug),
  ])

  if (studentResult.status === 'fulfilled' && studentResult.value) {
    name = studentResult.value.name
  }

  if (studentResult.status === 'rejected') {
    error = getErrorMessage(studentResult.reason, 'Could not load student profile.')
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

  return { courses, name, error }
}

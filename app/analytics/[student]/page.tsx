import { ActivityTile } from '@/components/dashboard/ActivityTile'
import { BentoCard, MetricTile } from '@/components/ui/Bento'
import { PageHeader } from '@/components/ui/PageHeader'
import { getCourses, getStudentBySlug } from '@/lib/data'
import { formatStudentName } from '@/lib/students'
import {
  getAverageProgress,
  getFocusCourse,
  getStrongestCourse,
  getWeeklyHours,
} from '@/lib/analytics'
import { getErrorMessage } from '@/lib/errors'
import { pageSectionClass } from '@/lib/styles'
import type { Course } from '@/types'

interface AnalyticsStudentPageProps {
  params: {
    student: string
  }
}

export default async function AnalyticsStudentPage({
  params,
}: AnalyticsStudentPageProps) {
  const { courses, name, streak, error } = await loadAnalytics(params.student)
  const average = getAverageProgress(courses)
  const strongestCourse = getStrongestCourse(courses)
  const focusCourse = getFocusCourse(courses)
  const weeklyHours = getWeeklyHours(params.student)
  const maxHours = Math.max(...weeklyHours.map((entry) => entry.hours))

  return (
    <section className={pageSectionClass}>
      <PageHeader eyebrow="Learning analytics" title={`${name}'s progress`} />
      {error && (
        <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <MetricTile iconName="Flame" label="Day streak" value={streak} accentClassName="text-accent-amber" custom={0} />
        <MetricTile iconName="Target" label="Average completion" value={`${average}%`} accentClassName="text-accent-cyan" custom={1} />
        <MetricTile iconName="TrendingUp" label="Weekly momentum" value="+12%" accentClassName="text-accent-emerald" custom={2} />
        <MetricTile iconName="BarChart2" label="Tracked courses" value={courses.length} accentClassName="text-accent-violet" custom={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ActivityTile studentSlug={params.student} />
        </div>
        <BentoCard custom={4}>
          <p className="text-sm font-medium text-white mb-4">Course signals</p>
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#8b949e]">{course.title}</span>
                  <span className="text-white">{course.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-bg-base overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent-cyan"
                    style={{ width: `${Math.min(100, Math.max(0, course.progress))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <BentoCard className="lg:col-span-2 min-h-[220px]" custom={5}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-medium text-white">Weekly learning hours</p>
              <p className="text-xs text-[#8b949e]">Generated per student for the demo</p>
            </div>
            <span className="text-xs text-accent-cyan">{weeklyHours.reduce((total, entry) => total + entry.hours, 0)}h</span>
          </div>
          <div className="flex items-end gap-3 h-32">
            {weeklyHours.map((entry) => (
              <div key={entry.day} className="flex-1">
                <div className="h-24 flex items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-accent-cyan/30 to-accent-cyan"
                    style={{ height: `${(entry.hours / maxHours) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#8b949e] text-center mt-2">{entry.day}</p>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard custom={6}>
          <p className="text-sm font-medium text-white mb-4">Completion trend</p>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#8b949e]">Strongest course</p>
              <p className="text-sm text-white mt-1">{strongestCourse?.title ?? 'No courses yet'}</p>
            </div>
            <div>
              <p className="text-xs text-[#8b949e]">Needs focus</p>
              <p className="text-sm text-white mt-1">{focusCourse?.title ?? 'No courses yet'}</p>
            </div>
            <div className="rounded-xl bg-bg-base border border-border-subtle p-3">
              <p className="text-xs text-[#8b949e]">Next action</p>
              <p className="text-sm text-white mt-1">
                Spend 25 minutes on {focusCourse?.title ?? 'a new course'} today.
              </p>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  )
}

async function loadAnalytics(slug: string): Promise<{
  courses: Course[]
  name: string
  streak: number
  error: string | null
}> {
  let name = formatStudentName(slug) || 'Student'
  let streak = 0
  let courses: Course[] = []
  let error: string | null = null

  const [studentResult, coursesResult] = await Promise.allSettled([
    getStudentBySlug(slug),
    getCourses(slug),
  ])

  if (studentResult.status === 'fulfilled' && studentResult.value) {
    name = studentResult.value.name
    streak = studentResult.value.streak
  }

  if (studentResult.status === 'rejected') {
    error = getErrorMessage(studentResult.reason, 'Could not load student profile.')
  }

  if (coursesResult.status === 'fulfilled') {
    courses = coursesResult.value
  }

  if (coursesResult.status === 'rejected') {
    error = getErrorMessage(coursesResult.reason, 'Could not load courses.')
  }

  return { courses, name, streak, error }
}

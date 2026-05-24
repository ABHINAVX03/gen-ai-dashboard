import { CourseCard } from './CourseCard'
import { AlertCircle } from 'lucide-react'
import type { Course } from '@/types'

interface CourseGridProps {
  courses: Course[]
  error: string | null
}

export function CourseGrid({ courses, error }: CourseGridProps) {
  if (error) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
        <AlertCircle size={18} />
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 p-6 rounded-2xl bg-bg-elevated border border-border-subtle text-center">
        <p className="text-[#8b949e] text-sm">No courses found. Add some to your Supabase table.</p>
      </div>
    )
  }

  return (
    <>
      {courses.map((course, i) => (
        <div key={course.id} className="col-span-1">
          <CourseCard course={course} index={i} />
        </div>
      ))}
    </>
  )
}
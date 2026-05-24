import { CourseGridSkeleton } from '@/components/ui/Skeleton'

export default function DashboardLoading() {
  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-[1400px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 h-48 rounded-2xl bg-bg-elevated animate-pulse-subtle" />
        <div className="col-span-1 h-48 rounded-2xl bg-bg-elevated animate-pulse-subtle" />
        <CourseGridSkeleton />
      </div>
    </section>
  )
}
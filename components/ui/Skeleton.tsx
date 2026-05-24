export function CourseGridSkeleton() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div key={i} className="col-span-1">
          <div className="rounded-2xl bg-bg-elevated border border-border-subtle p-5 h-[160px] animate-pulse-subtle">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-bg-hover" />
              <div className="w-10 h-5 rounded-full bg-bg-hover" />
            </div>
            <div className="h-4 bg-bg-hover rounded mb-2 w-3/4" />
            <div className="h-3 bg-bg-hover rounded mb-4 w-1/2" />
            <div className="h-1.5 bg-bg-hover rounded-full" />
          </div>
        </div>
      ))}
    </>
  )
}

export function SectionSkeleton() {
  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-[1400px] w-full">
      <div className="mb-5">
        <div className="h-4 w-32 rounded bg-bg-hover animate-pulse-subtle mb-2" />
        <div className="h-8 w-56 rounded bg-bg-elevated animate-pulse-subtle" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl bg-bg-elevated border border-border-subtle p-5 h-32 animate-pulse-subtle"
          >
            <div className="h-5 w-5 rounded bg-bg-hover mb-4" />
            <div className="h-7 w-16 rounded bg-bg-hover mb-2" />
            <div className="h-4 w-28 rounded bg-bg-hover" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-56 rounded-2xl bg-bg-elevated border border-border-subtle animate-pulse-subtle" />
        <div className="h-56 rounded-2xl bg-bg-elevated border border-border-subtle animate-pulse-subtle" />
      </div>
    </section>
  )
}

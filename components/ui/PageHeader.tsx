interface PageHeaderProps {
  eyebrow: string
  title: string
}

export function PageHeader({ eyebrow, title }: PageHeaderProps) {
  return (
    <div className="mb-5">
      <p className="text-sm text-[#8b949e]">{eyebrow}</p>
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
    </div>
  )
}

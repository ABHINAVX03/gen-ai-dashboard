'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { fadeUpVariants } from '@/lib/variants'
import type { Course } from '@/types'

interface CourseCardProps {
  course: Course
  index: number
}

const ACCENTS = [
  { from: '#22d3ee', to: '#3b82f6', border: 'rgba(34,211,238,0.2)', glow: 'rgba(34,211,238,0.08)' },
  { from: '#8b5cf6', to: '#ec4899', border: 'rgba(139,92,246,0.2)', glow: 'rgba(139,92,246,0.08)' },
  { from: '#10b981', to: '#22d3ee', border: 'rgba(16,185,129,0.2)', glow: 'rgba(16,185,129,0.08)' },
  { from: '#f59e0b', to: '#ef4444', border: 'rgba(245,158,11,0.2)', glow: 'rgba(245,158,11,0.08)' },
]

export function CourseCard({ course, index }: CourseCardProps) {
  const accent = ACCENTS[index % ACCENTS.length]
  const progress = Math.min(100, Math.max(0, course.progress))
  const progressRef = useRef(null)
  const isInView = useInView(progressRef, { once: true })

  const iconName = course.icon_name as keyof typeof Icons
  const Icon = (Icons[iconName] ?? Icons.BookOpen) as LucideIcon

  return (
    <motion.article
      custom={index + 2}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.015,
        borderColor: accent.from,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="relative overflow-hidden rounded-2xl border p-5 h-full min-h-[160px] noise cursor-pointer"
      style={{
        background: `radial-gradient(120% 100% at 80% 0%, ${accent.glow} 0%, transparent 60%), #161b22`,
        borderColor: accent.border,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${accent.from}22, ${accent.to}22)` }}
        >
          <Icon size={18} style={{ color: accent.from }} />
        </div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${accent.from}18`, color: accent.from }}
        >
          {progress}%
        </span>
      </div>

      <h3 className="text-sm font-semibold text-white leading-snug mb-4 line-clamp-2">
        {course.title}
      </h3>

      <div ref={progressRef}>
        <span className="text-[11px] text-[#8b949e] block mb-1.5">Progress</span>
        <div className="h-1.5 bg-bg-base rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
            initial={{ width: 0 }}
            animate={{ width: isInView ? `${progress}%` : 0 }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        </div>
      </div>
    </motion.article>
  )
}

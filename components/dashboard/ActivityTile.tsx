'use client'

import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { fadeUpVariants } from '@/lib/variants'

const LEVELS = [
  'bg-bg-hover',
  'bg-accent-cyan/20',
  'bg-accent-cyan/40',
  'bg-accent-cyan/70',
  'bg-accent-cyan',
]

interface ActivityTileProps {
  studentSlug: string
}

function getSeed(value: string) {
  return value.split('').reduce((seed, char) => seed + char.charCodeAt(0), 0)
}

function generateActivity(studentSlug: string) {
  const seed = getSeed(studentSlug)

  return Array.from({ length: 70 }, (_, i) => {
    const wave = Math.sin((i + seed) * 0.55) + Math.cos((i * seed) % 17)
    const value = Math.abs(Math.floor((wave + 2) * 1.35 + ((seed + i) % 3)))

    return Math.min(LEVELS.length - 1, value)
  })
}

export function ActivityTile({ studentSlug }: ActivityTileProps) {
  const activityData = generateActivity(studentSlug)

  return (
    <motion.article
      custom={1}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.012,
        borderColor: 'rgba(16, 185, 129, 0.3)',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="relative overflow-hidden rounded-2xl bg-bg-elevated border border-border-subtle p-5 h-full min-h-[180px] noise"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity size={15} className="text-accent-cyan" />
          <span className="text-sm font-medium text-white">Activity</span>
        </div>
        <span className="text-xs text-[#8b949e]">Last 10 weeks</span>
      </div>

      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}
      >
        {activityData.map((level, i) => (
          <div key={i} className={`aspect-square rounded-[2px] ${LEVELS[level]}`} />
        ))}
      </div>

      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-[10px] text-[#8b949e]">Less</span>
        {LEVELS.map((cls, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${cls}`} />
        ))}
        <span className="text-[10px] text-[#8b949e]">More</span>
      </div>
    </motion.article>
  )
}

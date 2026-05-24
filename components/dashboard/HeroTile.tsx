'use client'

import { motion } from 'framer-motion'
import { Flame, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { fadeUpVariants } from '@/lib/variants'

interface HeroTileProps {
  name: string
  streak: number
  activeCourses: number
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function HeroTile({ name, streak, activeCourses }: HeroTileProps) {
  const [dateLabel, setDateLabel] = useState('Today')
  const [greeting, setGreeting] = useState('Welcome back')

  useEffect(() => {
    setDateLabel(getFormattedDate())
    setGreeting(getGreeting())
  }, [])

  return (
    <motion.article
      custom={0}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.012,
        borderColor: 'rgba(34, 211, 238, 0.35)',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="relative overflow-hidden rounded-2xl border border-border-subtle p-6 h-full min-h-[180px] noise"
      style={{
        background:
          'radial-gradient(120% 100% at 85% 0%, rgba(34, 211, 238, 0.08) 0%, transparent 58%), linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1825 100%)',
      }}
    >
      <div
        className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full gap-4">
        <div>
          <p className="text-[#8b949e] text-sm font-medium mb-1">
            {dateLabel}
          </p>
          <h1 className="text-2xl font-semibold text-white leading-tight">
            {greeting},{' '}
            <span className="bg-gradient-to-r from-accent-cyan to-accent-blue bg-clip-text text-transparent">
              {name}
            </span>
          </h1>
          <p className="text-[#8b949e] text-sm mt-2">
            You have {activeCourses} active {activeCourses === 1 ? 'course' : 'courses'}. Keep it up!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-bg-surface border border-border-subtle rounded-full px-4 py-2">
            <Flame size={16} className="text-amber-400" />
            <span className="text-sm font-semibold text-white">{streak} day streak</span>
          </div>
          <div className="flex items-center gap-2 text-[#8b949e] text-sm">
            <Clock size={14} />
            <span>2.4h today</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

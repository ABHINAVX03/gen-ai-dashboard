'use client'

import type { CSSProperties, ReactNode } from 'react'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { bentoCardClass, bentoCardStyle } from '@/lib/styles'
import { fadeUpVariants } from '@/lib/variants'

interface BentoCardProps {
  children: ReactNode
  className?: string
  custom?: number
  style?: CSSProperties
}

interface MetricTileProps {
  iconName: keyof typeof Icons
  label: string
  value: string | number
  accentClassName: string
  custom?: number
}

export function BentoCard({
  children,
  className = '',
  custom = 0,
  style,
}: BentoCardProps) {
  return (
    <motion.article
      custom={custom}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.012,
        borderColor: 'rgba(34, 211, 238, 0.28)',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className={`${bentoCardClass} ${className}`}
      style={{ ...bentoCardStyle, ...style }}
    >
      {children}
    </motion.article>
  )
}

export function MetricTile({
  iconName,
  label,
  value,
  accentClassName,
  custom,
}: MetricTileProps) {
  const Icon = (Icons[iconName] ?? Icons.Circle) as LucideIcon

  return (
    <BentoCard custom={custom}>
      <Icon size={18} className={`${accentClassName} mb-3`} />
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="text-sm text-[#8b949e]">{label}</p>
    </BentoCard>
  )
}
